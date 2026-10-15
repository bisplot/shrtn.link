# Shrtn — Build plan

**Status: closed, 15 October 2026.** This is the agreed plan for Phase 1, the anonymous
Free tier on `nofollow.shrtnfree.link`. It was opened on 12 October 2026 and is aligned
with `claude/strategy.md`, `claude/economics.md`, `claude/legale.md` and the internal
compliance docs in `docs/legal/interno/`. Nothing in this document is edited after
closure: later changes go into dated step reports or a new document. Day estimates are
judgement and mean Gabriel working with Claude, review and testing included.

## Decisions taken

| # | Decision | Source |
| ---: | --- | --- |
| 1 | **Phase 1 is the Free tier with no account**, on `nofollow.shrtnfree.link`. Phase 2 starts with accounts (2a), then Premium (2b), then the subdomain plan (2c). | Gabriel, 15 Oct |
| 2 | **No QR on anonymous links.** QR is for registered users only, so it moves to Phase 2a. | Gabriel, Oct |
| 3 | The Free tier is open to private individuals; paid plans stay business-only. | Gabriel, Oct |
| 4 | The new platform replaces the contents of the `shrtn` folder, **except `docs/`**, following the safe sequence in §2. | Gabriel, 12 Oct; sequence per finding 1 |
| 5 | Stack as in §1: Node/TypeScript, SQLite, 2× Hetzner. | Default adopted |
| 6 | Extra anonymous safeguards: a ceiling of **20 creations a day per IP** across all destinations (IPv6 counted per /64, tunable), plus ALTCHA. | Default adopted |
| 7 | **URLhaus is off at launch.** Web Risk and the internal denylist only; URLhaus is added if it gets licensed. | Default adopted |

Defaults 5–7 stand unless Gabriel overrides them before the step that uses them.

## Verdict

**Phase 1 takes about 27–36 working days. The public launch date depends on the
compliance gates in §6, not on code.** Building the anonymous tier first is right for
engineering, because the redirector, screening, caps, kill switch and abuse desk are
needed by every tier. It is the weakest choice commercially: it ships the riskiest line
(`legale.md` risk 1, *Alto*), which earns nothing and has no upgrade path. Build it first,
but open public anonymous creation only once every gate is green.

## Findings that changed the plan

| # | Finding | Consequence |
| ---: | --- | --- |
| 1 | `docs/legal/interno/` is gitignored, so the only copy is on Gabriel's disk. The `.tgz` files in `Cowork/_to_delete/` are partial transfers marked for deletion. The repo also had 3 uncommitted edits and 3 untracked docs. | The folder is not wiped wholesale: back up first and keep `docs/` (§2). |
| 2 | Four links are live on `shrtn.link` (`rqeAG`, `webinar`, `workshop`, `lnkdn`), some probably on printed QR codes. `webinar`, `workshop` and `lnkdn` contain letters that are not in Crockford Base32. | Keep them as reserved legacy routes outside the code space. |
| 3 | The platform code holds the abuse-detection logic, and the scoring spec says it must never be published. The repo is public. GitHub Pages on GitHub Free needs a public repo, and its terms rule out sites "primarily directed at … providing commercial software as a service" ([GitHub Pages limits](https://docs.github.com/pages/getting-started-with-github-pages/github-pages-limits), checked Oct 2026). | `shrtn.link` moves to its own VPS **in Phase 1**, so Phase 1 runs two servers. The repo goes private after the DNS cutover. |
| 4 | Under abuse.ch terms effective 4 Nov 2025, free use is for not-for-profit purposes only; commercial use "may require a paid subscription, which will be managed by Spamhaus" ([abuse.ch terms](https://abuse.ch/terms-of-use/)). | Strategy rule 8's "free second source" no longer exists. Decision 7. |
| 5 | Web Risk Lookup is free up to 100,000 calls a month, then $0.50 per 1,000 ([Web Risk pricing](https://cloud.google.com/web-risk/pricing), checked Oct 2026). Anonymous creation can drain about 3,300 lookups a day. | Decision 6, plus a GCP budget alert. Stay on the Lookup API. |
| 6 | TAR Lazio judgment 13201/2026 (published 17 Jul 2026) upheld AGCOM's ~€14.25M fine on Cloudflare ([diritto.it, 10 Sep 2026](https://www.diritto.it/?p=251702)). | The Piracy Shield gate stands, and the AGCOM PEC is on the week-1 critical path. |
| 7 | Software belongs to the employer automatically only when an employee writes it (art. 12-bis L. 633/1941). | If Gabriel is not an employee of the S.r.l., ask counsel to add his own assignment to the IP deeds. |
| 8 | The cost model has no second VPS, no `shrtnfree.link` renewal and no URLhaus licence. | Phase 1 infrastructure costs ≈ **€170 a year**: 2× CX23 with IPv4 at €5.99/mo ([costgoat, Sep 2026](https://costgoat.com/pricing/hetzner)) plus 20% for backups. That fits the model's €353 budget. Add the domain renewal line. |

## 1. Architecture

| Server | Hosts | Role | Public surface |
| --- | --- | --- | --- |
| **M** (main) | `shrtn.link` | Website, create form, legal pages, `/segnalazioni`, suggest-a-platform, control API, admin panel | Website, plus POST for create, report and suggest |
| **F** (free) | `nofollow.shrtnfree.link` (Phase 2 adds `shrtnfree.link/{4+}`); the apex returns 301 to `shrtn.link` | Redirector, transition page, F10, free-link database, screening worker, caps | **GET only** |

- M talks to F over a Hetzner private network through an internal API (create, disable,
  bulk-disable, lookup). F has no public write endpoint.
- The kill switch reaches F from M, as the compliance guide requires.
- The shared per-destination cap is enforced on F, the single owner of all free links.
- The free host is a configuration value, so a blocked domain is swapped in an
  afternoon (strategy rule 2).

| Layer | Choice | Why |
| --- | --- | --- |
| Runtime | Node.js LTS + TypeScript | The current repo is already Node; one language on both servers |
| HTTP | Hono or Fastify | Small and fast, no framework lock-in |
| Database | SQLite (WAL), one per server, created and migrated by the code, continuously backed up to Hetzner Object Storage | No database server to buy or run, and F stays self-contained |
| Proxy/TLS | Caddy | Automatic HTTPS |
| Registrable domain | `tldts` (Public Suffix List, private section on) | `alice.github.io` and `bob.github.io` count separately |
| Bot challenge | ALTCHA (self-hosted proof-of-work) | No third-party processor and no cookie |
| Email | EU transactional provider | F5 acknowledgements and alerts |
| Admin access | Tailscale-only panel with strong auth | Reachable from a phone, never on the public internet |
| Hosting | Hetzner, 2× CX23, EU, separate IPv4 | Strategy rule 3: own server and IP |

QR is not in Phase 1 (decision 2). In Phase 2a the existing self-hosted `qrcode`
library is reused, client-side.

## 2. Replacing the repo safely

1. Copy `docs/legal/interno/` to two places outside the repo.
2. Commit the pending docs work, tag current `main` as `static-v1`, and push.
3. Sync the repo's `docs/` with the current project docs.
4. Replace everything **except `docs/`** with the layout below.
5. Rebuild the four legacy links, including their `/qr` and OG pages, as static routes on M.
6. Point `shrtn.link` DNS at M and check the legacy links. Then disable Pages and make
   the repo private.
7. Remove the old workflows (`deploy`, `validate`, `health-check`).

```
shrtn/
  apps/
    site/       shrtn.link — homepage + create form, legal pages, segnalazioni, bot page, legacy routes   (M)
    control/    M API — create proxy, reports, suggest-platform, admin panel, Piracy Shield adapter    (M)
    free/       redirector — transition page, F10, internal API, screening worker, caps              (F)
  packages/
    core/       codes (Crockford Base32), URL validation, PSL, allowed list, denylist, cap counters
    screening/  Web Risk client, denylist, URLhaus adapter (off)
  infra/        Caddy, systemd units, provisioning, backups, retention jobs, CI
  docs/         kept (strategy, economics, legal; legal/interno stays gitignored)
```

## 3. Work packages

| WP | Scope | Days | Done when |
| --- | --- | ---: | --- |
| 0 | Repo reset (§2) | 1–2 | Backup verified, `static-v1` tagged, legacy links resolve from M |
| 1 | Infrastructure: 2 VPS, private network, Caddy, firewall (80/443 only, SSH via Tailscale), DNS, server backups | 2–3 | Both hosts serve TLS, the free apex returns 301, SSH is not publicly exposed |
| 2 | Core library: 7-character Crockford codes from a CSPRNG, never reused, case-insensitive decoding, length grows at half occupancy. URL validation: HTTPS only; reject userinfo, IP literals and internal hosts; length cap. PSL registrable domain. Ban on `shrtn.link`, `*.shrtn.link` and every free host. Shortener and link-in-bio denylist. | 3–4 | A test table of more than 100 URLs passes every rule |
| 3 | Screening and caps: Web Risk Lookup with a quota counter. Internal denylist. Allowed-platform list changed only by logged human decisions. 10/day per destination across all creators (calendar day, Europe/Rome). 10/day per platform per creator. Per-IP ceiling (decision 6). Cap-reached message with suggest-a-platform. Fail-closed at creation; fail-open with logging at the daily check. | 3–4 | Concurrent requests cannot exceed a cap; quota exhaustion is simulated |
| 4 | Redirector (F): 5-second transition page in IT/EN with the full destination and its registrable domain highlighted (IDN also shown as `xn--`). Safety alert, no-guarantee line, "Segnala questo link", F13 footer. Daily first-visit check runs asynchronously during the 5 seconds. `/{code}/go` redirects only if the verdict is not unsafe. F10 is identical for every non-active state. `noindex, nofollow`, no cookies, strict CSP. Visitor log kept 90 days. | 3 | No-JS fallback works; F10 states cannot be told apart; p95 under 50 ms |
| 5 | `shrtn.link` site (M): create form with the no-guarantee notice next to the button and "Segnala un link" above the fold. ALTCHA. Terms acceptance line. Result screen with the link and a copy button (no QR). Legal pages (IT + EN), `/segnalazioni`, `/bot`, suggest-a-platform, legacy routes. | 3–4 | End-to-end create works; the report form works without JS |
| 6 | Abuse desk and kill switch: search by code, destination or domain. Disable one link, a list or a whole destination domain. Automation endpoint. Hash-chained kill log shipped off-box daily. Registro unico (5 years). Report queue with deduplication, rate limit, P0–P4 triage, T5b immediate review, F5 acknowledgement and push. Templates F1, F5–F8, F10, F11, F13. | 5–7 | 100 codes plus one domain disabled from a phone in under 2 minutes, all logged |
| 7 | Piracy Shield adapter: manual import of FQDN/IP lists now, API polling once credentials exist. Auto-disable, block future creation, record the order reference. | 2 (+ API spec) | A simulated order is executed unattended in under 30 minutes |
| 8 | Operations: uptime alerts, GSC for both domains, restore test, retention jobs (visitor IP 90 days, creation IP 12 months, daily-check log reset at midnight), secrets handling | 2 | Restore under 1 hour; free-domain swap drill completed |
| 9 | Testing and closed beta: unit and integration tests, load test, header and rate-limit review, creation behind an invite flag for 1–2 weeks | 3–5 | Launch checklist green |
| | **Total** | **27–36** | |

**Not in Phase 1:** accounts, QR, registered Free, Premium, billing, verification,
subdomains, scoring F1–F9, traffic signals T1–T6, back-button refinement, sponsorship.

## 4. Development steps (Claude)

Every step ends with a commit, a short report of what was verified and what was not,
and Gabriel's review before the next step that depends on it. Tests come before code
wherever a rule can be stated as a test.

| Step | What Claude does | WP | Needs from Gabriel | Week |
| ---: | --- | --- | --- | --- |
| 0 | Back up `interno` (with checksums), commit pending docs, tag `static-v1`, scaffold the monorepo, sync `docs/`, rebuild the legacy routes. The live site is not touched. | 0 | G1, G2 | 1 |
| 1 | Write the URL and code test table, then the core library until it passes | 2 | — | 1–2 |
| 2 | Screening and caps against a Web Risk mock, then against the real key | 3 | G8 for the live test | 2 |
| 3 | Redirector running locally; Gabriel reviews the pages in a browser | 4 | G19 copy review | 2–3 |
| 4 | Infrastructure as code and CI; first deploy of F with creation disabled (walking skeleton) | 1, 8 | G3–G7, G11 | 3 |
| 5 | Website on M and the create flow M → F, end to end | 5 | G13, G19 | 3–4 |
| 6 | Abuse desk, kill switch, logs, registro, report queue, email | 6 | G9 | 4–5 |
| 7 | Piracy Shield adapter with manual import and a simulated order | 7 | G15 (credentials when granted) | 5 |
| 8 | Cut `shrtn.link` over to M and verify the legacy links; Gabriel then disables Pages and makes the repo private | 2, 1 | G7, G11 | 5–6 |
| 9 | Drills with Gabriel, monitoring, load test, security review; closed beta behind the invite flag | 8, 9 | G10, G12, G21 | 6–7 |
| 10 | Public switch (one configuration flag) | — | All gates in §6 | 8+ |

Whether Claude can reach the servers and GitHub directly from this setup depends on
network and access permissions. Where it cannot, Gabriel runs one prepared command or
approves one access prompt.

## 5. Manual tasks (Gabriel)

Secrets (API keys, tokens, passwords) never go into chat. They go into the server
environment files or the GitHub secrets, at the step that needs them.

**Before Step 0**

| # | Task | Where |
| --- | --- | --- |
| G1 | Reconnect the `shrtn` folder to the session (it was disconnected on 15 Oct), then approve the delete-permission prompt (needed to replace files and for git) | Claude desktop app |
| G2 | Move the second backup copy of `docs/legal/interno/` to iCloud Drive or an external disk | Mac |

**Accounts and infrastructure (weeks 1–3)**

| # | Task | Where |
| --- | --- | --- |
| G3 | Tell Claude which registrar holds each domain; enable the registrar lock; check the registrar's abuse contact and suspension policy | Registrar |
| G4 | Open a Hetzner Cloud company account and project; create 2× CX23 to Claude's spec (Ubuntu LTS, same network zone, IPv4 + IPv6, backups on, your SSH key, private network, firewall). Send the two public IPs. | Hetzner |
| G5 | Create one Hetzner Object Storage bucket (database backups, kill-log copies) and its access keys. This is the only manual part of "the database": SQLite itself is created and managed by the code. | Hetzner |
| G6 | Open a Tailscale account; install it on your Mac and phone; create an auth key for the servers | Tailscale |
| G7 | DNS: lower TTL to 300 a day before each change; add the records Claude gives for `nofollow.shrtnfree.link` and the `shrtnfree.link` apex (Step 4), then `shrtn.link` and `www` (Step 8) | Registrar |
| G8 | Google Cloud: create a project with billing in the S.r.l.'s name, enable the Web Risk API, create an API key restricted to Web Risk and F's IP, set a budget alert (e.g. €10/month), accept the Cloud Data Processing Addendum | Google Cloud |
| G9 | Email: create `abuse@`, `legal@`, `privacy@` and `supporto@` on `shrtn.link` with push to your phone. Open an EU transactional-email account (e.g. Brevo, Mailjet, Scaleway) and add its SPF/DKIM/DMARC records. | Mail host, registrar |
| G10 | Create an external uptime monitor with phone push; Claude supplies the URLs to watch | Monitor service |
| G11 | GitHub: add the deploy secrets Claude specifies; at Step 8, disable Pages and switch the repo to private | GitHub |
| G12 | Google Search Console: add domain properties for `shrtn.link` and `shrtnfree.link` (DNS TXT), turn on email alerts, add the second on-call person | GSC |

**Legal and compliance (start in week 1; these gate the public launch)**

| # | Task | Where |
| --- | --- | --- |
| G13 | Choose the operating S.r.l. and send its ragione sociale and P.IVA (F13 footer, Terms) | — |
| G14 | Set up the company PEC with forwarding to a monitored inbox and push | PEC provider |
| G15 | **Piracy Shield.** Claude builds the adapter; accreditation is yours. (1) Send the PEC to `tavoloantipirateria@agcom.it` asking whether Shrtn is an obligated subject and how to accredit (Claude drafts it). (2) Register on `aps.agcom.it` and read the *Guida all'Accreditamento*. (3) Name a technical and a legal referent. (4) When granted, put the API credentials in F's environment. | AGCOM |
| G16 | Lawyer: review the Terms, Privacy, AUP, Cookie policy and Procedure (IT + EN). Ask about a separate art. 1341 acceptance for anonymous creation, the Free withdrawal clause, whether a DPIA is needed, and the IP deeds (Davide, Matteo, and you) | Lawyer |
| G17 | Name the second on-call person; give them Tailscale and admin access; sign the written handover (Claude drafts it) | — |
| G18 | Get an insurance quote (cyber + RC) and bind it before the public launch | Broker |
| G19 | Approve the IT/EN copy (transition page, F10, F13, homepage notice, report form) and the visual direction (logo, colours, type), or supply your own | — |
| G20 | Set the six-month keep/kill thresholds for anonymous creation (proposed: blocklisted at most once; compliance work no more than 8 founder-hours a month) | — |

**Drills (before the public launch)**

| # | Task |
| --- | --- |
| G21 | From your phone: kill-switch drill (100 codes plus one domain in under 2 minutes), 30-minute Piracy Shield drill, backup restore drill. Calendar a weekly test message to `abuse@` and `legal@`. |

**Not manual (Claude builds):** database schema, migrations and backup jobs; the Piracy
Shield adapter code; screening and caps; redirector; website; admin panel; kill switch;
logs and registro; retention jobs; server configuration; CI.

## 6. Gates before public anonymous creation

1. AGCOM answer and Piracy Shield accreditation (G15). Kill criterion 4: if accreditation
   is refused, decide within 30 days.
2. Lawyer review done (G16).
3. PEC and the four mailboxes live with push (G9, G14).
4. Two named on-call people with a written handover (G17).
5. Operating S.r.l. name and P.IVA in F13 and the Terms (G13).
6. Google Cloud DPA accepted and budget alert set; US transfer stated in the privacy
   notice (G8).
7. IP assignment deeds signed (G16).
8. Drills passed (G21).
9. Registrar abuse contact verified (G3).

## 7. Phase 2 — outline

| Step | Scope | Days |
| --- | --- | ---: |
| 2a | Accounts (email, Google, Apple, LinkedIn). Registered Free on `shrtnfree.link/{4+}` with delete-own-links. **Standard QR (PNG/SVG) for registered users.** DSA art. 17 communications (F2–F4). | 10–12 |
| 2b | Premium on `shrtn.link`: verification, Stripe with two checkout outcomes, art. 1341 approval, monthly/yearly billing rules. Edit, pause, reactivate, retire, reserve, with every edit re-screened. Instant redirect. Freeze after cancellation. Migrate the four legacy links. Agency line on the pricing page. | 20–25 |
| 2c | Premium with subdomain: certified documents, manual approval with charge on approval, DNS TXT check, reserved labels, brand review, 90-day re-verification, wildcard TLS, Brand Index, branded QR, optional branded transition | 12–15 |

Optional fast path to cash: provision the four group companies' subdomains by admin and
invoice them manually before Stripe exists.

## 8. Follow-ups in other documents

- `claude/strategy.md`, "What each tier includes": the Anonymous column still shows
  Standard QR. Change it per decision 2.
- `claude/strategy.md` rule 8 still calls URLhaus a free source. Align it with finding 4.
- `shrtn-economic-model.xlsx`: add the second VPS, the `shrtnfree.link` renewal and, if it
  is ever adopted, the URLhaus licence.
