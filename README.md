# Shrtn

Internal repository for **Shrtn** (`shrtn.link`): permanent, trustworthy short links
for businesses, and a free, no-guarantee shortener for everyone else. No click
analytics, no dashboards, no profiling at any tier.

Private. Not for distribution.

## Status — 15 October 2026

- **Strategy, economics and legal framework are settled.** Two decisions remain open:
  whether the group's four companies subscribe or take free accounts, and whether the
  trade mark is filed before or after launch.
- **The Phase 1 build plan is closed.** Phase 1 is the anonymous Free tier on
  `nofollow.shrtnfree.link`, about 27–36 working days of build.
- **Public launch is gated on compliance, not code**: Piracy Shield accreditation,
  lawyer review, PEC and mailboxes, two on-call people, IP assignment deeds, drills.
- The live `shrtn.link` is still the static GitHub Pages site in `occhinog/shrtn`.

## At a glance

| | |
| --- | --- |
| Paid links | `shrtn.link/{code}` — verified businesses only |
| Company address | `{company}.shrtn.link/{path}` |
| Free, with account | `shrtnfree.link/{code}` |
| Free, no account | `nofollow.shrtnfree.link/{code}` |
| Premium, verified | €6.99 / month or €69.99 / year |
| Premium, unverified | €17.99 / month or €179.99 / year |
| Premium with subdomain | €29.99 / month or €299.99 / year |
| Break-even | 9 companies on the subdomain plan, or 5 if the group's four subscribe |
| Recurring cost | €2,614 a year; €12,692 maximum cash at risk over three years |

Prices are net of VAT. Paid plans are sold to businesses only.

## Contents

| File | What it is |
| --- | --- |
| [`strategy/strategy.md`](strategy/strategy.md) | Product strategy, October 2026 — the guiding document: domains, tiers, rules, positioning, go-to-market, risks, kill criteria |
| [`strategy/economics.md`](strategy/economics.md) | Economic assessment, revised 11 October 2026 — cost base, ladder, break-even, three-year scenarios |
| [`strategy/shrtn-economic-model.xlsx`](strategy/shrtn-economic-model.xlsx) | Full workings behind the economic assessment |
| [`strategy/legale.md`](strategy/legale.md) | Legal framework (in Italian), 11–12 October 2026 — feasibility, residual risks, Terms clauses, pre-launch priorities |
| [`strategy/build-plan.md`](strategy/build-plan.md) | Phase 1 build plan, closed 15 October 2026 — architecture, work packages, manual tasks, launch gates |

`strategy.md` leads: where it has decided, the other documents explain how to comply
or what it costs, without changing the decision.

## Reading notes

- The documents refer to each other as `claude/…`. Here they live in `strategy/`.
- `docs/legal/` (public legal texts) and `docs/legal/interno/` (internal compliance
  docs) are not in this repository. `interno` must stay out of git.
- `build-plan.md` is closed: later changes go into dated step reports or a new
  document, not into the plan.
- Known follow-ups: `strategy.md` still shows QR on anonymous links and calls URLhaus a
  free source; the economic model lacks the second VPS and the `shrtnfree.link`
  renewal. See `build-plan.md` §8.
