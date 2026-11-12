# Shrtn — Architecture

**Status: draft, 12 November 2026.** Drawn from zero for the whole product, both
`shrtn.link` and `shrtnfree.link`, every tier. It is the input to the decision session
with Davide and Matteo: §11 lists what that session decides, and nothing here is
decided before it. It supersedes `build-plan.md` §1–2 (architecture and repo reset) and
the pre-October `technical-brief-davide-matteo.md`. Phasing, work packages, manual
tasks and launch gates stay in `build-plan.md`.

The strategy documents cited here (`strategy.md`, `economics.md`, `legale.md`,
`build-plan.md`) live in `bisplot/ten_m` under
`strategy/venture-building/shrtn/strategy/`. The internal compliance documents
(`registro-trattamenti.md`, the scoring spec, the compliance guide) stay outside git.

**Starting point.** This repository already holds the pre-launch site: static pages
built with Node (`build.js`, `validate-links.js`), the four legacy links in
`links.json`, and a standard-library Python API (`apps/api/server.py`, signup and
ping on SQLite), staged on the Bisplot VPS under `/srv/shrtn`. That is the current
state, not this target: §8 shows where the legacy routes and the signup flow land, and
D2 and D9 decide where M and staging run.

Phase markers: **1** anonymous Free, **2a** accounts and registered Free, **2b**
Premium, **2c** Premium with subdomain.

## 1. Principles

These come from `strategy.md` and `legale.md`; the architecture enforces them, it does
not reopen them.

1. **Two trust zones, each with its own registrable domain, server and IP.** **M**
   (main) serves `shrtn.link` and `*.shrtn.link`. **F** (free) serves `shrtnfree.link`
   and `nofollow.shrtnfree.link`. F never holds account, identity or billing data.
2. **F is GET-only to the public.** Every write reaches F from M over a private,
   authenticated channel.
3. **Redirect, never proxy.** Destination HTML is never stored; at most fingerprints
   (scoring spec §2).
4. **Codes are never reused.** A spent code stays recorded forever as a tombstone.
5. **No visitor data reaches customers**, not even a click count.
6. **Every operator action is logged.** The kill log is hash-chained and shipped
   off-box daily.
7. **Screening fails closed at creation and fails open, with logging, on the daily
   re-check.**
8. **The free domain is one configuration value**, so a blocked domain is swapped in
   an afternoon.

## 2. Hosts and topology

```
       customers, creators, visitors                       visitors
                    │ HTTPS                                    │ HTTPS
                    ▼                                          ▼
┌─────────────── M · main ─────────────────┐   ┌─────────────── F · free ─────────────────┐
│ shrtn.link · www · {company}.shrtn.link  │   │ shrtnfree.link · nofollow.shrtnfree.link │
│                                          │   │                                          │
│ caddy ──► shrtn-web                      │   │ caddy ──► shrtn-free (public, GET only)  │
│           site · account · checkout      │   │           transition page · /go · F10    │
│           paid redirects                 │   │                                          │
│ shrtn-desk    admin, tailnet only        │   │ shrtn-free    internal API, tailnet only │
│ shrtn-worker  screening · email · jobs   │──►│ shrtn-free-worker  daily check · purge   │
│ main.db (SQLite) ──► litestream          │   │ free.db (SQLite) ──► litestream          │
└──────────────────────────────────────────┘   └──────────────────────────────────────────┘
          M ──► F only: internal API over the tailnet, plus a bearer token
```

| Host | Hostnames | Processes (systemd units) |
| --- | --- | --- |
| **M** | `shrtn.link` (site, account area, checkout, `/{code}` paid links); `{company}.shrtn.link/{path}`; `www` → 301 to the apex | `caddy`, `shrtn-web`, `shrtn-desk`, `shrtn-worker`, `litestream` |
| **F** | `nofollow.shrtnfree.link/{code}` (1), `shrtnfree.link/{code}` (2a); the `shrtnfree.link` apex → 301 to `shrtn.link` | `caddy`, `shrtn-free`, `shrtn-free-worker`, `litestream` |

- **Tailnet.** Both hosts and the operators' phones and Macs join one Tailscale
  network. It carries SSH, the admin desk and the M → F internal API, and it works
  across hosting providers, so the hosting decision (D2) does not change it. F's
  internal API binds only to F's tailnet address and also requires a token.
- **Certificates.** Caddy issues them automatically. Company subdomains use Caddy's
  on-demand TLS: before issuing for `{company}.shrtn.link`, Caddy asks an endpoint on
  M (localhost only) whether that label is approved. No wildcard certificate and no
  DNS API credentials are needed.
- **Redirect codes.** Paid links answer **302**, never 301: browsers cache a 301
  indefinitely, which would break "change destination". F's `/{code}/go` also answers
  302. Both send `Cache-Control: no-store`.
- **One codebase, two roles.** The same repository deploys to both hosts; the settings
  module decides which apps load (§3, §8).

## 3. Languages and frameworks

Davide and Matteo work in Python, so the stack is Python end to end.

| Layer | Recommended | Why |
| --- | --- | --- |
| Language | CPython, current stable, dependencies and virtualenvs managed with `uv` | The team's language; already runs on the Bisplot box |
| Framework | **Django** on both hosts, with separate settings modules (`settings.main`, `settings.free`) | M is an accounts, forms and back-office application. Django ships auth, sessions, CSRF, forms, IT/EN i18n, migrations and an admin. Under `settings.free`, F loads only `core` and `free`, so paid and identity code never runs on F. |
| Sign-in (2a) | `django-allauth` | Google, Apple and LinkedIn sign-in plus email login by code in one maintained library |
| App server | Gunicorn behind Caddy | Synchronous code is enough at this volume |
| Database | SQLite in WAL mode, one file per host, Django's SQLite option `transaction_mode="IMMEDIATE"` | No database server to run or pay for. SQLite's single writer makes "concurrent requests cannot exceed a cap" a property of the database rather than of the code. |
| Background work | Periodic jobs as Django management commands on systemd timers; one-off jobs in a database-backed queue drained by the worker | No Redis, no broker |
| HTML | Django templates, one stylesheet, minimal JavaScript (ALTCHA widget, copy button, optional htmx in the dashboard) | The transition page and report form must work without JavaScript; strict CSP, no third-party scripts |
| Backups | Litestream, continuous replication to EU S3-compatible object storage | Restore under one hour (WP8) |
| Quality | `pytest` + `pytest-django`, Playwright (Python) for end-to-end, `ruff`, `mypy` | |

Key libraries: `tldextract` (Public Suffix List with the private section on, using a
bundled snapshot that a job refreshes, never a live fetch at request time), `altcha`
(self-hosted proof-of-work), `segno` (QR as PNG and SVG, including branded QR in 2c),
`httpx` (Web Risk, fetcher), `stripe`.

**Alternatives the session can still choose (D1):**

- **FastAPI**, already used on the Bisplot box. Lighter and async-first, but sessions,
  CSRF, forms, OAuth, migrations and an admin would be assembled from separate
  libraries. Its strengths, async APIs and OpenAPI, buy little here.
- **TypeScript on Node**, the earlier recommendation. Sound technically, but it puts
  the code in a language the people who will maintain it do not use daily.

## 4. Data

Two databases, one per zone. Nothing is shared between them except what M sends F
through the internal API.

### `main.db` on M

| Group | Tables (indicative) | Phase |
| --- | --- | --- |
| Identity | accounts, sign-in identities, sessions, admin users with passkey or TOTP | 1 (admins), 2a |
| Verification | business profile, VIES result, register match, SMS one-time codes, email confirmations, company-document reviews (outcome only), domain TXT proofs | 2b, 2c |
| Billing | Stripe mirror (customer, subscription, plan, interval), *may buy* and *how invoiced*, Terms and art. 1341 acceptances with version, invoice and SdI references | 2b |
| Paid links | links, link history, tombstones, subdomains, subdomain paths, reserved labels, brand settings | 2b, 2c |
| Compliance | reports, registro unico, kill log, Piracy Shield orders, notices sent from the F templates, allowed platforms, denylist, their decision log, platform suggestions, screening results, scoring records (2+), admin audit | 1 |
| Operations | job queue, settings (public-creation flag, free-host value, closure banner), legacy links | 1 |

### `free.db` on F

| Table | Holds | Phase |
| --- | --- | --- |
| links | code, tier (anonymous or registered), opaque owner reference (never an email), destination, registrable domain, state, creation time, creation IP and user agent | 1, 2a |
| tombstones | spent codes | 1 |
| cap counters | per destination domain, per platform and creator, per IP (IPv6 per /64) | 1 |
| daily check | destination URLs checked today and their verdict | 1 |
| screening results | verdict, source, time | 1 |
| visitor log | time, code, visitor IP | 1 |
| lists | copy of the allowed platforms and denylist, pushed by M | 1 |
| Web Risk quota | lookups this month | 1 |

### Retention

Each rule comes from `registro-trattamenti.md` or the scoring spec; a purge job
enforces it.

| Data | Kept | Job |
| --- | --- | --- |
| Visitor IP on the transition page | 90 days; up to 12 months after closure of an abuse case or dispute | F nightly |
| Creation IP and user agent (anonymous) | 12 months, then erased while the link stays | F nightly |
| Per-IP counters | 24 hours | F nightly |
| Daily-check log | until midnight (Europe/Rome) | F, M at midnight |
| Screening outcomes | 12 months | F, M nightly |
| Paid link history | 12 months; spent codes forever | M nightly |
| Account data | life of the account, then a 30-day reactivation window | M nightly |
| SMS one-time codes | until used, at most 15 minutes | M hourly |
| Company documents | deleted when the review closes; outcome, date and document type kept for the relationship plus 5 years (12 months if rejected) | M on review |
| Registro unico, reports, orders | 5 years | M nightly |
| Admin audit log | 6 months | M nightly |
| Invoices | 10 years (accounting) | outside the app |
| Scoring fingerprints / signals | last 10 versions per link / 12 months | M, F nightly (2+) |

## 5. Interfaces

| Surface | Routes |
| --- | --- |
| **M public** | `/` and `POST /create` (1) · `/altcha/challenge` (1) · `/segnalazioni` GET and POST, works without JS (1) · `/suggest-platform` (1) · `/bot` (1) · legal pages IT/EN (1) · legacy routes `rqeAG`, `webinar`, `workshop`, `lnkdn` with `/qr` and OG pages (1) · `/auth/*`, `/account/*` (2a) · `/checkout`, `POST /webhooks/stripe` (2b) · `/{code}` paid redirect, after the reserved site paths (2b) · `{company}.shrtn.link/{path}` and its root (2c) |
| **M localhost only** | Caddy's on-demand TLS check (2c) |
| **M desk (tailnet only)** | search by code, destination or domain · disable one, a list or a whole destination domain · report queue · registro · lists and their decision log · verification and subdomain review (2b, 2c) · Piracy Shield import · `POST /desk/api/kill` automation endpoint (token) |
| **F public** | `GET /{code}` transition page or F10 · `GET /{code}/go` · `GET /` → 301 to `shrtn.link` · `robots.txt` (everything `noindex, nofollow`, no cookies) |
| **F internal (tailnet + token)** | `POST /v1/links` create · `GET /v1/links` search · `POST /v1/disable` codes or a destination domain · `DELETE /v1/owners/{ref}/links` on account deletion (2a) · `PUT /v1/lists` · `PUT /v1/settings` (creation flag, closure banner) · `GET /v1/health` |

## 6. Flows

**Anonymous create (1).** The browser posts to M with the ALTCHA solution and the
Terms acceptance. M verifies the proof-of-work and forwards the request, with the
creator's IP and user agent, to F `POST /v1/links`. F applies the URL rules (HTTPS
only; no userinfo, IP literals or internal hosts; length cap; none of Shrtn's own
domains; no other shortener or link-in-bio service), derives the registrable domain,
checks the denylist, then reserves the cap slots in one immediate transaction, before
any Web Risk call so a capped request never spends quota. Unless the domain is an
allowed platform, F calls Web Risk; any error refuses the link. F draws a 7-character
Crockford code from a CSPRNG, inserts the link and returns it. M shows the link and a
copy button, never a QR.

**Registered Free create (2a).** Same path, started from the account area. M sends an
opaque owner reference with the request. Caps are shared with anonymous creation. The
account can delete its links (F disables and tombstones them) and download a standard
QR, which M renders.

**Paid create and edit (2b).** Entirely on M. The same rules from `core`, plus the
reserved site paths and the code length floor of `shrtn.link`. Web Risk runs on
creation and on every edit and fails closed. Each change writes link history and the
audit log.

**Free visit (1).** F looks up the code. Every non-active state returns the same F10
page, with the same status and timing. An active link gets the 5-second transition
page in IT/EN: the full destination with its registrable domain highlighted (IDN also
as `xn--`), the safety alert, the no-guarantee line, "Segnala questo link" pointing to
`shrtn.link/segnalazioni`, and the F13 footer. A meta refresh leads to `/go`, so it
works without JavaScript. The visit is logged. If the destination has not been
checked today, the request enqueues the daily check and the worker completes it within
the 5 seconds. `/go` redirects unless today's verdict is unsafe; a failed check
redirects and is logged.

**Paid visit (2b, 2c).** M looks up the code or the company path, using an in-process
cache invalidated on every edit and kill, and answers 302 at once. The daily check is
enqueued after the redirect: a destination that turns malicious is caught the next day
it is used, as the strategy accepts.

**Kill switch (1).** From the desk, on a phone, an operator disables codes, a list or a
destination domain. M appends to the kill log (each entry hashes the previous one),
disables paid links locally, and calls F `POST /v1/disable` for free links. F answers
with the count applied, and M writes the registro entry. Target: 100 codes plus one
domain in under 2 minutes. A daily job copies the kill log off-box.

**Piracy Shield order (1).** Until API credentials exist, orders are imported by hand
on the desk; afterwards the worker polls the API. Either way the order disables every
matching link on both hosts, adds the targets to the denylist so they cannot be
created again, alerts the on-call people and records the order reference in the
registro. Target: executed unattended in under 30 minutes.

**Verification and checkout (2b).** The profile is verified field by field: VIES or
another registration source for the business identifier (provider API or a manual
check at launch), an SMS code for the mobile, confirmation links for both emails.
Checkout records two separate answers, *may buy* and *how invoiced*, plus the
professional-purpose declaration and the separate art. 1341 approval, then hands over
to Stripe Checkout. Monthly plans are anchored to the first of the next month (rule
6). Stripe webhooks keep the subscription mirror current. Each invoice is handed to
SdI (D7).

**Subdomain (2c).** The company uploads certified documents and publishes a DNS TXT
token. Reserved labels are refused; well-known marks go to manual review. Payment is
authorised at application and captured on approval (Stripe manual capture), so the
review must finish before the card authorisation lapses, typically 7 days, or the
payment is re-authorised. On approval the documents are deleted, the label goes live
and Caddy issues its certificate on the first request. A job re-checks the TXT record
every 90 days.

**Scoring fetcher (2+).** An isolated process with no database access, run by each
host's worker for that host's links. It downloads only the exact submitted URL, under
the fetch rules in the scoring spec §12, behind an SSRF guard (resolve first, reject
private and reserved ranges, connect to the resolved address). It returns
fingerprints and never stores page content.

## 7. External systems

| System | Role | Personal data sent | Phase |
| --- | --- | --- | --- |
| Google Cloud Web Risk (Lookup API) | Destination screening, ≤100,000 lookups a month free | Destination URL in clear; US transfer declared in the privacy notice | 1 |
| EU transactional email provider | F5 acknowledgements, alerts, account and closure emails | Recipient and content | 1 |
| Mail host and PEC | `abuse@`, `legal@`, `privacy@`, `supporto@`; authorities | Inbound messages | 1 |
| EU object storage (S3-compatible) | Litestream replicas, kill-log copies | Encrypted database pages | 1 |
| Tailscale | SSH, admin desk, M → F channel | Device metadata only; traffic is end-to-end encrypted | 1 |
| Let's Encrypt (via Caddy) | TLS certificates | Hostnames | 1 |
| External uptime monitor | Probes with phone alerts | None | 1 |
| Google Search Console | Security and blocklist alerts for both domains | None | 1 |
| GitHub | Repository, Actions CI/CD, deploy secrets | None | 1 |
| AGCOM Piracy Shield | Blocking orders | Order data | 1 |
| Google, Apple, LinkedIn sign-in | Authentication | Identity claims | 2a |
| Stripe | Checkout, subscriptions, manual capture | Billing data | 2b |
| EU SMS provider | One-time code to confirm the mobile | Mobile number | 2b |
| VIES | VAT validation | VAT number | 2b |
| Italian register lookup | Business identity without VIES | Company identifier | 2b |
| **SdI e-invoicing** | Electronic invoices | Billing data | 2b |

**Gap the strategy does not cover: SdI.** Every invoice Shrtn issues goes through the
Sistema di Interscambio, and Stripe does not transmit to it. Phase 2b needs either an
e-invoicing provider's API fed by the Stripe webhooks or the commercialista issuing
invoices by hand from a monthly export. Decision D7.

## 8. Repository layout

```
pyproject.toml  uv.lock
shrtn/                 Django project
  settings/            base.py · main.py · free.py · dev.py · test.py
  urls_main.py  urls_desk.py  urls_free.py
apps/
  core/          codes, URL rules, PSL, lists, caps, Web Risk client — no zone data   (1)
  site/      M   home, create proxy, legal pages, reports, suggest, legacy routes,
                 pre-launch signup (replaces apps/api/server.py)                     (1)
  desk/      M   abuse desk, kill switch, registro, Piracy Shield, notices            (1)
  free/      F   redirector, transition page, internal API, daily check              (1)
  accounts/  M   sign-in, profiles, verification                                     (2a, 2b)
  links/     M   paid links, history, tombstones                                     (2b)
  billing/   M   Stripe, Terms acceptance, SdI hand-off                              (2b)
  brands/    M   subdomains, DNS proof, Brand Index, branded QR                      (2c)
templates/  static/  locale/
tests/
infra/           caddy/ · systemd/ · litestream/ · provision/ · deploy/
docs/            this document; strategy stays in ten_m
```

`settings.free` installs only `core` and `free`. A test fails the build if anything
under `free` imports from an M app, so the F deployment never carries paid or identity
code. `docs/legal/interno/` stays out of git, as today.

## 9. Environments and deployment

| Environment | Where | Notes |
| --- | --- | --- |
| Local | Gabriel's Mac or any laptop | Both roles on one machine under `*.localhost`; Web Risk, Stripe and SMS mocked |
| Staging (optional, D9) | Bisplot box behind Cloudflare Access | Invite-only; never public anonymous creation |
| Production | M and F | §2 |

- **Pipeline.** GitHub Actions runs the tests, then copies the release to
  `/srv/shrtn/releases/<commit>` on the target host, runs migrations, moves the
  `/srv/shrtn/current` symlink and restarts the units. Rollback moves the symlink back.
- **On each host.** Data in `/srv/shrtn/data`, secrets in `/etc/shrtn/env` (mode
  0600), never in the repository or in chat.
- **Cost.** Two small EU VPS with backups come to about €170 a year (`build-plan.md`
  finding 8), inside the €353 infrastructure line of the economic model. Object
  storage and the `shrtnfree.link` renewal are still to be added to the model.

## 10. Security baseline

- Only ports 80 and 443 are public on either host. SSH and the internal API go over
  the tailnet only.
- The desk requires a passkey or TOTP on top of the tailnet ACL, and every desk action
  is written to the admin audit log.
- Session cookies are host-only on `shrtn.link` (no `Domain` attribute), so company
  subdomains never receive them (strategy rule 3).
- Strict Content Security Policy and no third-party scripts on any page.
- Only named people have `sudo` on M and F, each designated as *amministratore di
  sistema* and logged.
- Backups are encrypted, and the restore drill (G21) must pass before launch.

## 11. Decisions for the session with Davide and Matteo

| # | Decision | Options | Recommendation |
| --- | --- | --- | --- |
| D1 | Framework | Django · FastAPI · TypeScript/Node | **Django** (§3) |
| D2 | Where M runs | Dedicated EU VPS · Bisplot box under `/srv/shrtn` | **Dedicated VPS.** The Bisplot box carries known security debt (a service exposed on `:3000`, no firewall, `/root` secrets readable by any sudoer), had a three-day tunnel incident in August 2026, and would put Shrtn's identity, billing and registro data next to unrelated projects. The saving is about €85 a year. F needs its own server in any case. |
| D3 | CDN or proxy in front | None · Cloudflare on M only · Cloudflare on both | **None at launch.** Cloudflare would process every visitor's IP and destination in the US, change the privacy notice and the registro, and add another party that can act on the zone. |
| D4 | Private channel and admin access | Tailscale · WireGuard · Cloudflare Access | **Tailscale** |
| D5 | Operations | Who holds the two on-call roles, Piracy Shield access and server access | Names before the first deploy |
| D6 | IP assignment | Deeds signed before code (`legale.md` priority 1) | Prerequisite, not a technical choice |
| D7 | Electronic invoicing | Provider API · commercialista by hand | Decide before 2b |
| D8 | Providers | SMS, transactional email, Italian register lookup | EU providers, chosen on price and DPA |
| D9 | Staging | Bisplot box · none | Bisplot box, invite-only |
| D10 | Operating S.r.l. | Which company holds the hosting, Google Cloud and Stripe accounts (G13) | Before any account is opened |

## Appendix — legal requirements traced to components

Every product requirement listed in `legale.md` has a home.

| # | Requirement (`legale.md`) | Where |
| ---: | --- | --- |
| 1 | Piracy Shield with API linked to the kill switch | `desk` import, `shrtn-worker` poller |
| 2 | Kill switch with immutable log, bulk included | `desk`, hash-chained kill log, F `/v1/disable` |
| 3 | Automatic DSA art. 17 statement of reasons | `desk` notices F2–F4 to registered accounts (2a); not applicable to anonymous links (art. 17 par. 2) |
| 4 | Neutral unavailable page identical for every state | F10 on F and on M |
| 5 | Checkout with *may buy* and *how invoiced*, professional purpose | `billing` (2b) |
| 6 | Registro unico | `desk` |
| 7 | Destination screening and daily re-check at first use | `core` + workers; URLhaus off at launch (`build-plan.md` decision 7) |
| 8 | Public report form and "Segnala questo link" | `site` `/segnalazioni`, link on the transition page |
| 9 | Domain TXT re-verification every 90 days | `brands` + worker (2c) |
| 10 | Separate art. 1341 approval at checkout | `billing` (2b) |
| 11 | No-guarantee notice next to the create button | `site` create form |
| 12 | No links between the two domains or to other shorteners | `core` URL rules |
| 13 | Reserved labels and manual review of well-known marks | `brands` (2c) |
| 14 | Caps per destination domain and per platform; suggest-a-platform | `core` caps on F, `site` form |
| 15 | F13 footer on the transition page | `free` templates |
| 16 | Free closure notice: banner, email, 30 days, logged | settings flag, F `/v1/settings`, email job, registro |
