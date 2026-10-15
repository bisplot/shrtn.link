# Shrtn — Strategy

October 2026

## The product

**Shrtn sells permanent, trustworthy short links to businesses — and gives a free,
no-guarantee shortener to everyone else.**

It is deliberately simple. There are no click analytics, no campaign dashboards and
no audience profiling at any tier. A customer pays for three things only: a link that
keeps working, the right to change where it points, and an address that carries the
company's own name.

The buyer is any business that commits a link to something it cannot reprint — menus,
labels, packaging, signage, vehicles, catalogues, event material, business cards.
For that buyer a Shrtn link is not marketing software. It is insurance on a print run.

## Domains

| Address | Role | Who writes to it |
| --- | --- | --- |
| `shrtn.link` | Main website, account area, and all paid links | Only verified business customers |
| `{company}.shrtn.link` | A company's own address | Only that verified company |
| `shrtnfree.link` | Free links for registered users | Anyone with an account |
| `nofollow.shrtnfree.link` | Free links created without an account | Anyone |

The two registrable domains are a trust boundary. Browser blocklists, mail filters
and corporate firewalls act on the registrable domain, so abuse on the free domain
cannot take down a paid link. `shrtnfree.link` is not promoted: it exists only as the
address free links are issued on.

That separation is the core sales line:

> **Free links live on shrtnfree.link. Paid links live on shrtn.link — a domain only
> identified businesses can write to.**

## Tiers and prices

Prices net of VAT. Every paid customer is a business with a verifiable identifier;
consumers use Free only. Verified Premium was raised from €4.99 on 11 October 2026.

| Tier | Who | Address | Monthly | Yearly |
| --- | --- | --- | ---: | ---: |
| **Anonymous** | No account | `nofollow.shrtnfree.link/{code}` | €0 | — |
| **Free** | Account via email, Google, Apple or LinkedIn sign-in, no subscription | `shrtnfree.link/{code}` | €0 | — |
| **Premium** | Business account, identity not verified | `shrtn.link/{code}` | **€17.99** | **€179.99** |
| **Premium, verified** | Account with a verified business identity | `shrtn.link/{code}` | **€6.99** | **€69.99** |
| **Premium with subdomain** | Verified company with certified documents and its own domain | `{company}.shrtn.link/{path}` and `shrtn.link/{code}` | **€29.99** | **€299.99** |

The subdomain is included in its plan, not sold as an add-on, and only verified
customers can buy it. Yearly prices cost about ten months of the monthly price.

### How a customer reaches each price

**€17.99 — a business that has not verified.** Any user who signs in with email,
Google, Apple or LinkedIn and supplies a business identifier can subscribe. This price
is **not a tier meant to be bought**: it is a risk premium, the compensation for
carrying an unidentified account on the domain whose entire value is that it cannot be
blocklisted.

**€6.99 — verified profile.** The same user completes a profile, and every field is
verified rather than declared:

| Field | Verified by |
| --- | --- |
| Name and surname, or company name | Matched against the business register record |
| Business identifier | **VIES, a VAT number, or any registration number that shows the company is real and active** |
| Mobile number | One-time code by SMS — used only to confirm the number, never to sign in |
| Personal email | Confirmation link |
| Company email | Confirmation link |

Verification deliberately does **not** depend on VIES alone. An Italian VAT number
appears in VIES only if the holder opted into intra-EU operations, which artisans,
restaurateurs and forfettari usually have not — and those are exactly the print buyers
this product is for.

**VIES still governs the invoice, not the sale.** An EU business outside Italy without
a VIES-valid number cannot take reverse charge, so its invoice carries Italian VAT.
Checkout needs two answers about a customer, not one: *may they buy* and *how is this
invoiced*.

**€29.99 — Premium with subdomain.** A verified company uploads certified company
documents (for example a visura camerale) and proves control of its own domain with a
DNS TXT record. Unverified accounts cannot buy this plan.

The principle is one sentence: **the more Shrtn knows about a customer, the less the
customer pays.** The €11 gap between the two Premium prices pays for verification many
times over and pushes almost every rational buyer to complete it.

## What each tier includes

| | Anonymous | Free | Premium | Premium with subdomain |
| --- | :---: | :---: | :---: | :---: |
| Random short code | ✓ | ✓ | ✓ | ✓ |
| Standard QR (PNG, SVG) | — | ✓ | ✓ | ✓ |
| Delete own links | — | ✓ | ✓ | ✓ |
| Change destination | — | — | ✓ | ✓ |
| Pause, reactivate, retire, reserve | — | — | ✓ | ✓ |
| Instant redirect, no transition page | — | — | ✓ | ✓ |
| Chosen paths under the company's own name | — | — | — | ✓ |
| Branded QR, optional branded transition, Brand Index at the root | — | — | — | ✓ |

**QR codes are for registered users only.** Anonymous links are text links: Shrtn
never generates a QR code for them. A printable code with no account behind it is the
cheapest tool for QR phishing — stickers over real codes on parking meters, menus and
posters. Anyone can still feed an anonymous link to an outside QR generator, but Shrtn
will not be the one-click source, and every QR it issues traces back to an account.
It is also an honest reason to sign up: printing is what accounts are for.

**Free links** show a 5-second transition page with minimal content:

- **the full destination address**, with the domain highlighted so it is the first
  thing the eye reads;
- **a safety alert:** *"Check the address above before you continue. Scams and
  phishing pages often imitate real brands. Never enter passwords, card details or
  personal data unless you are sure the site is genuine."*;
- a statement that this is a free shortener that does not vouch for the destination
  or guarantee the link;
- a "Report this link" button.
- **a small footer**: company name and VAT number; one line of privacy notice for
  visitors (the IP address is recorded for security only, kept 90 days, never shared
  with the link's creator); links to the Terms, Privacy Policy and abuse reporting on
  `shrtn.link`. The approved wording is template F13 in the compliance guide.

Free destinations cannot be changed after creation, so a link cannot pass screening
and then be pointed somewhere else.

## Rules

**1. Free carries no guarantee.** Free links may stop working at any time, including
permanently, if the free domain is blocked by third parties — or, after 30 days'
notice, if Shrtn closes the free service or replaces its domain (rule 9). This is said
on the transition page, next to the create button and in the Terms. It is also the
honest upsell: links that must last belong on Premium.

**2. The free domain is replaceable.** The domain free links are issued on is a single
configuration value, so a blocked domain is swapped for new links in an afternoon.
Existing links on a blocked domain are not migrated.

**3. The separation must be real.** Four conditions make the two domains genuinely
independent:

- the free domain runs on its own server and IP address;
- no link may point from one domain to the other, in either direction;
- the account area sets cookies only on its own host;
- both domains are monitored in Google Search Console, with security issues checked
  weekly.

**4. Company identity is delegated to registries.** The subdomain label is the
verified domain's own name — `helioh2.com` becomes `helioh2.shrtn.link`. No
abbreviations or invented names. Across top-level domains the first company to
complete verification wins. Domains must be at least twelve months old, resolving and
in real use, and are re-verified every 90 days. Two kinds of label never go through
automatically:

- **Reserved labels** cannot be assigned at all: system names (`www`, `app`, `api`,
  `mail`, `admin`, `free`, `nofollow` and similar) and words typical of fraud
  (`login`, `signin`, `account`, `pay`, `payment`, `verify`, `secure`, `support`,
  `bank`, `wallet` and similar).
- **Well-known brands** go to manual review even when domain proof succeeds. A
  verified domain proves control of the domain, not the right to the name: a
  well-known mark gets its subdomain only once Shrtn has confirmed the applicant is
  its holder.

**5. Codes are never reused.** A recycled code on a printed QR is a redirect to a
stranger. Every code issued is spent for good.

**6. Billing defends against the fixed card fee.** Stripe charges €0.25 per charge
regardless of amount. So: every customer has one plan and one charge, with the
subdomain inside the higher plan; yearly terms cost about ten months, to encourage
annual billing; no monthly price falls below €4. Monthly plans are free until the end
of the month they are bought in; yearly plans are charged in full at purchase, with no
free period.

**7. Free links are capped per destination domain, across all users.** The free tier
creates at most **ten links a day to any single destination domain, counted across
every creator together** — anonymous and registered alike. Switching accounts or IP
addresses does not help: to make more links an abuser needs more domains, and every
new domain costs money and starts with no reputation. It also stops the classic bulk
pattern of hundreds of short links to one phishing page.

"Destination domain" means the registrable domain, per the Public Suffix List:
`a.example.com` and `b.example.com` count as one domain, while separate users of a
shared host such as `alice.github.io` and `bob.github.io` count separately.

**Allowed platforms.** A list of large, well-known platforms — YouTube, Instagram and
similar — works differently:

- links to them **skip the Google Web Risk lookup**, so they do not consume the daily
  quota;
- the shared cap does not apply; instead each creator can make **ten links a day per
  allowed platform** (per account, or per IP address without an account).

The list works by **whole registrable domain** (`youtube.com`, `google.com`). This is a
deliberate trade: phishing hosted on allowed platforms — Google Forms, Sites or Drive,
for instance — is not checked by Web Risk, and a short link in front of it can still
get the free domain blocklisted, because blocklists list the address the victim
clicked. That exposure falls only on `shrtnfree.link`, which is designed to be
replaced; `shrtn.link` is unaffected. Allowed links still go through the internal
denylist, and any reported link is removed promptly.

**The starting list** is the major social and messaging platforms:

| Platform | Domains |
| --- | --- |
| YouTube | `youtube.com`, `youtu.be` |
| Instagram | `instagram.com` |
| Facebook | `facebook.com`, `fb.com`, `fb.me` |
| TikTok | `tiktok.com` |
| X | `x.com`, `twitter.com` |
| LinkedIn | `linkedin.com` |
| Threads | `threads.com`, `threads.net` |
| Pinterest | `pinterest.com`, `pin.it` |
| Reddit | `reddit.com` |
| Snapchat | `snapchat.com` |
| Twitch | `twitch.tv` |
| Discord | `discord.com`, `discord.gg` |
| Telegram | `telegram.org`, `t.me` |
| WhatsApp | `whatsapp.com`, `wa.me` |
| Spotify | `spotify.com` |
| Vimeo | `vimeo.com` |
| Google | `google.com` |

Other link shorteners and link-in-bio services are never on the list: a short link
pointing to another short link hides its real destination.

**Users can propose platforms.** A "suggest a platform" button — on the free creation
form and on the cap-reached message — lets anyone ask for a domain to be added. Shrtn
reviews each request; nothing is added automatically.

**8. Every destination is screened.** Destinations not on the allowed-platform list
are checked against **Google Web Risk** (Lookup API) when a link is created and again on a schedule, and every paid
edit is re-checked. Web Risk is Google's commercial service: the first 100,000 lookups
a month are free, then $0.50 per 1,000. Google's Safe Browsing API cannot be used — it
is licensed for non-commercial use only — and Brave offers no URL-reputation API of
its own: its browser relies on Google Safe Browsing. A free second source (URLhaus
from abuse.ch, subject to its current terms) and an internal denylist complete the
check.

**Links are re-checked when they are used, at most once a day.** The first time a
link is opened on a given day, its destination is checked against Web Risk and the
link is written to a daily log; for the rest of that day the check is skipped. The
log empties at midnight. Links nobody opens cost nothing, and a destination that turns
malicious is caught the next day it is used. On free links the check runs during the
5-second transition page, so visitors never wait for it. Each distinct destination
URL is checked once a day however many links point to it. The log records only that a
link was checked today — never who opened it.

The free quota is about 3,300 lookups a day, shared between new links and these daily
checks. Above 100,000 a month the cost is $0.50 per 1,000.

**9. Shrtn may end any service, with notice.** If Shrtn chooses to close the free
service — with or without an account — or to replace a free domain that has not been
blocked, it gives **30 days' notice** on the transition page, on the create form and by
email to registered users. No compensation is due. Free users include consumers, and
under Italian consumer law a clause letting the provider walk away without reasonable
notice is presumed unfair: the 30 days are what keep the clause enforceable. No notice
applies when a link is removed for abuse or by an authority's order, or when the free
domain is blocked by third parties: those are not closures but the no-guarantee of
rule 1. Paid plans end with **90 days' written notice** and a refund of any prepaid
period not yet delivered. Anonymous links do not expire on their own.

## Code space

Codes use the Crockford Base32 alphabet — 32 symbols, case-insensitive, without the
easily confused I, L, O and U — because they are read off paper and typed by hand.

| Address | Minimum length | Codes at minimum length |
| --- | ---: | ---: |
| `nofollow.shrtnfree.link` | 7 | 34,359,738,368 |
| `shrtnfree.link` | 4 | 1,048,576 |
| `shrtn.link` | 4 | 1,048,576 |
| `{company}.shrtn.link` | chosen path | separate namespace per company |

Minimum length is a floor, not a constant. When a domain's code space passes half
occupancy, new codes are issued one character longer; existing codes never change.
On `shrtn.link`, the paths used by the website itself are reserved.

Short codes can be enumerated. **Nothing confidential goes behind a short link**, at
any tier, and the Terms say so.

## Positioning

| Compared against | Shrtn Premium with subdomain at €29.99 reads as |
| --- | --- |
| Bitly Growth ($35, one custom domain plus analytics) | Cheaper, and deliberately selling less |
| Rebrandly Professional ($39, three domains) | Cheaper, one verified identity |
| Hospitality QR tools — MENU TIGER ($17–119), Flipdish (from €49), UpMenu ($49–149) | Cheap, and it does the one thing that matters |

Against generic link tools Shrtn is a simpler Bitly. Against the print buyer's real
alternatives it is cheap insurance. **Sell into the second comparison.** Premium at
€6.99 sits above Short.io Hobby ($5) and below Bitly's entry paid plan (~$10, annual
only) — so a buyer who leaves over price goes to Short.io or back to Free, not to
Bitly. Against a €49 hospitality tool the difference between €4.99 and €6.99 is noise.

Three arguments carry the pitch:

1. **The QR outlives the campaign.** The code on the poster keeps working when the
   page behind it moves.
2. **Verified identity in the address.** `helioh2.shrtn.link` can only belong to a
   verified company that controls a domain named `helioh2`, with its certified
   documents on file.
3. **No data processing agreement to sign.** Because no visitor data is ever exposed
   to customers, Shrtn is an independent controller, not a processor: no DPA, no
   sub-processor list, no audit clause. For a small business buying from a small
   vendor, that removes the most common procurement blocker. It holds only as long as
   Shrtn never shows customers even a click count.

## Go to market

Break-even is nine companies — or five, if the group's own four subscribe. There is no
market to size: there is a list of about thirty names to work through.

1. **The group's own companies first** — HelioH2, DieciMaggio, Kopernik, Domify. They
   prove the product works under real print use. They do not prove anyone will pay,
   and should never be counted as if they did. If they subscribe rather than taking
   free accounts, they cover 47% of the year's costs — count that in the budget,
   never in the evidence.
2. **Thirty named businesses that already print.** One qualifying question: *is there
   a QR code on anything you had printed?*
3. **Agencies by conversation, not by plan.** There is no agency plan at launch. The
   pricing page carries one line — *"Agency managing several clients? Contact us."* —
   and terms are set case by case. Each client subdomain still needs that client's own
   certified documents and domain proof.
4. **Nothing else until break-even** — no sponsorship, no compact domain, no hiring.

The most useful evidence from the first ten company conversations: whether they stall
on the price or on the identity story. Each failure needs a different fix.

## Economics in brief

The bar is **covering expenses, not earning**. Recurring cost is **€2,614 a year**,
one-off setup **€4,850**, maximum three-year cash at risk **€12,692** if nothing ever
sells. Insurance, not infrastructure, is the largest recurring line.

| Customer | Net revenue per year | Needed to cover the year alone |
| --- | ---: | ---: |
| Premium, verified (€6.99 / €69.99) | €71 | 37 |
| Premium with subdomain (€29.99 / €299.99) | €310 | **9** |
| Premium, unverified (€17.99 / €179.99) | €185 | 15 |

One company is worth about **4.4** verified Premium customers.

**If the four group companies subscribe on the subdomain plan they cover €1,239 — 47%
of the year.** The remainder is **five external companies, or twenty verified
Premium.** Those subscriptions prove nothing about demand and must never be counted as
validation, but the cash is real and it pays the bills. Count the group in the budget,
never in the evidence. If they are given free accounts instead, the external target
goes back to nine companies.

At base adoption (three Premium and 0.7 companies a month) cash turns positive in
**month 26** and the margin at month 36 is about **€9,200 a year**. In the slow case
the business covers its running costs but does not realistically repay the setup.
Verification costs about $0.05 per SMS code — cents per customer; company-document
checks are reviewed by hand at launch. Full workings are in the economic model.

## Risks

| Risk | Severity | Response |
| --- | --- | --- |
| Abuse on a paid account gets `shrtn.link` blocklisted | Medium | Every paid account is identity-verified; paid edits are re-screened; kill switch with immutable log |
| The free domain is blocklisted | Expected | No guarantee on Free; domain swappable in an afternoon |
| IP in the backend not assigned to the company | **High** | NDA and assignment deeds with Davide and Matteo signed before any code is written |
| Piracy Shield accreditation not available to a micro S.r.l. | **High** | Ask counsel before launch; if refused, decide within thirty days |
| One person carries the 30-minute takedown obligation | Medium-High | Two named people with Piracy Shield access and a written handover before launch |
| Identity data held for verification | Low | Only verified contact details; company documents checked, outcome and date kept |
| "Shrtn" cannot be registered as a word mark | Medium | After launch: clearance opinion before filing; figurative mark as fallback |

## Kill criteria

1. **Fewer than five companies with a subdomain twelve months after launch.** The
   identity thesis is the business. Below about half of break-even, stop investing founder
   time in it and keep Shrtn as an internal tool for the group's own QR use.
2. **Fewer than 2% of free accounts that supplied a business identifier on Premium
   after six months.** Only those accounts can buy; counting consumers would hide the
   signal. Below that, the paid pitch is not landing.
3. **More than eight founder-hours of compliance work in any month while under thirty
   paying customers.** The labour model does not scale.
4. **Piracy Shield accreditation refused.** Decide within thirty days whether to close
   anonymous creation or accept the exposure in writing. *Operating the free tier from
   outside Italy is not an option — `legale.md` risk 8: it escapes neither the
   antipiracy obligations (the Cloudflare precedent) nor the DSA.*

## Future developments

**Compact domain.** `shr.mp` would give paid links a shorter address, but costs
$2,500 in the first year on a registry judged unstable. It waits until trailing
twelve-month operating margin reaches €5,000 and paying customers have asked for a
shorter address. The decision at that point is "a compact domain", not necessarily
that name. At the current base case that trigger arrives in month 21.

**Sponsorship.** Free transition pages could later carry a direct, non-clickable,
clearly labelled sponsor — never on paid links, never chosen by the link creator.
Only once free volume is large enough to sell.

## Open decisions

1. **Do the four group companies subscribe, or take free accounts?** The difference is
   47% of the cost base, and it moves the external target between five companies and
   nine.
2. **Trade mark before or after launch?** The cost base assumes before; the risk table
   says after, behind a clearance opinion. Deferring gives €3,900 one-off and €2,509
   recurring.

All other launch decisions are settled.

## After launch

- **SPID and CIE sign-in.** Strongest identity with no documents to hold, but it
  requires an accreditation request to the Italian authorities. When available, a
  SPID/CIE login plus a business identifier will qualify for the verified price on its
  own.
- **Word-mark clearance** for "Shrtn" before any EU trade-mark filing.
