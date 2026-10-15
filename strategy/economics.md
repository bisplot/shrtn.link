# Shrtn — Economic assessment (revised 11 October 2026)

Rebuilt against `claude/strategy.md` (October) and `claude/legale.md` (10 October),
then updated for two decisions taken on 11 October: verified Premium raised to
**€6.99**, and verification broadened beyond VIES.
Full workings: `shrtn-economic-model.xlsx`. Live version: the Break-Even Console artifact.

## Verdict

**The bar is now "cover its own expenses", and on that bar Shrtn clears comfortably.**
Maximum cash at risk over three years is €12,692 if nothing ever sells. Break-even is
**nine companies on the subdomain plan, or 37 Premium customers** — and if the four
group companies take subdomain plans, the external target falls to **five companies**.

This is not a business plan any more, and it should stop being written as one. It is
an internal tool that is being asked to pay its own bills, with outside customers as
an upside rather than a requirement. Every number below is framed that way.

## The two decisions of 11 October

### Verified Premium: €4.99 → €6.99

| | €4.99 | **€6.99** |
| --- | ---: | ---: |
| Yearly price | €49.99 | **€69.99** |
| Net per customer per year | €50.43 | **€71.23** (+41%) |
| Premium needed to cover the year alone | 52 | **37** |
| One company is worth | 6.1 Premium | **4.4 Premium** |
| Base case: margin at month 36 | €7,674 | **€9,222** |
| Base case: cash positive | month 29 | **month 26** |
| Slow case: margin at month 36 | €214 | **€670** |

The decision survives its own worst case. **€6.99 only stops beating €4.99 once
Premium churn reaches 4.6% a month** — more than double the modelled 2.2%, meaning
the average customer would have to last 22 months instead of 45. Any realistic amount
of churn caused by a €2 rise leaves €6.99 well ahead.

One thing the reasoning behind the rise gets wrong, and it is worth correcting
because it changes who you are talking to. At roughly $7.6, €6.99 sits **above**
Short.io Hobby ($5) and **below** Bitly's entry paid plan (~$10, annual only). So
price-sensitive buyers do not move up to Bitly — they move to Short.io, or they stay
on Shrtn Free, where they still consume a server and abuse exposure and pay nothing.
What the rise actually separates is *needs a link they can change* from *doesn't*.
That is a cleaner filter than the one intended, and a better story.

Against the comparison that matters it is not a rise at all. The strategy already
says *"sell into the second comparison"*: against MENU TIGER at $17–119 or Flipdish
from €49, the difference between €4.99 and €6.99 is noise.

### Verification: VIES **or** VAT number **or** any registration number proving the company is real and active

This removes what was the single largest risk in the plan. Italian VAT numbers appear
in VIES only with the intra-EU option, which artisans, restaurateurs and forfettari
typically have not taken — and those are exactly the print buyers on the list of
thirty. They can now reach the verified price.

**One consequence for the commercialista: admission and invoicing have come apart.**
VIES is no longer the gate to buy, but it still governs VAT treatment. An EU business
outside Italy without a VIES-valid number cannot take reverse charge, so the invoice
carries Italian VAT and Shrtn remits it. Net revenue is unchanged — prices are quoted
net — but checkout now needs two facts about a customer where it previously needed
one: *may they buy* and *how is this invoiced*.

## The cost base

| | Lean | **Base** | Prudent |
| --- | ---: | ---: | ---: |
| One-off setup | €2,050 | **€4,850** | €10,750 |
| Recurring, per year | €712 | **€2,614** | €7,201 |
| Three-year cash at risk | €4,186 | **€12,692** | €32,353 |

Insurance is the largest recurring line at €900, against roughly €490 of servers,
domains and email combined. The infrastructure is not where the money goes.

## The ladder

| Tier | Monthly | Yearly | Net per year | Break-even alone |
| --- | ---: | ---: | ---: | ---: |
| Premium, unverified | €17.99 | €179.99 | €185.33 | 15 |
| Premium, verified | **€6.99** | **€69.99** | **€71.23** | **37** |
| Premium with subdomain | €29.99 | €299.99 | €309.79 | **9** |

## Covering the expenses: the real target

The strategy is right that the group's own companies "should never be counted as if
they had paid" — they prove nothing about demand. But the bar has changed, and for
**cost coverage** the cash is entirely real: it leaves one group entity and arrives at
the one paying the Hetzner bill.

| | |
| --- | ---: |
| Four group companies on subdomain plans | €1,239 |
| Share of the annual cost base that covers | **47%** |
| Remaining to cover | €1,375 |
| …as external companies | **5** |
| …or as Premium customers at €6.99 | **20** |

So the number to carry into sales conversations is **five companies, not nine** —
provided HelioH2, DieciMaggio, Kopernik and Domify actually subscribe rather than
being given free accounts. That is a decision worth making explicitly, because giving
them free accounts turns a 47% cost offset into zero and puts the target back at nine.

Keep the two uses apart and both stay honest: **count the group in the budget, never
in the validation.**

## The verification discount, repriced

Pricing a verified customer at €6.99 instead of €17.99 forgoes **€132 a year gross**,
€114 net, per customer. Smaller than before — the rise closed a sixth of the gap.

| Verified Premium customers | Forgone net revenue / year | vs the whole cost base |
| ---: | ---: | ---: |
| 20 | €2,282 | 0.9× |
| 37 (break-even) | €4,222 | 1.6× |
| 75 (base case, month 36) | €8,557 | **3.3×** |
| 136 (base steady state) | €15,517 | 5.9× |

The September version of this note asked why the gap was €13 rather than €8. That now
has an answer and it should go in the strategy: **€17.99 is not a tier, it is a risk
premium** — compensation for carrying an unidentified account on a domain whose whole
value is that it cannot be blocklisted. Framed that way the number is justified by
exposure, not by willingness to pay, and 2.6× is a defensible load.

## If some buyers never verify

Now that almost any real company can verify, this tier should be rare. If it is not,
that is upside rather than leakage:

| Non-verification rate | Blended Premium net/yr | Margin at m36 | Cash positive | Break-even |
| ---: | ---: | ---: | --- | ---: |
| 0% | €71.23 | €9,222 | month 26 | 37 |
| 10% | €82.64 | €10,072 | month 24 | 32 |
| 20% | €94.05 | €10,921 | month 23 | 28 |
| 33% | €108.88 | €12,025 | month 22 | 25 |

## Three years

Base cost case, no non-verification, group companies excluded.

| | Slow | **Base** | Fast |
| --- | --- | --- | --- |
| New Premium / companies per month | 1 / 0.2 | 3 / 0.7 | 8 / 2.0 |
| Customers at month 36 | 22 / 6 | 75 / 21 | 224 / 65 |
| Net revenue, month 36 | €3,284 | **€11,836** | €35,781 |
| Annual margin, month 36 | €670 | **€9,222** | €33,167 |
| Deepest cash trough | −€7,814 | **−€5,473** | −€5,019 |
| Cash turns positive | after m36 | **month 26** | month 13 |

The `shr.mp` reconsideration trigger of €5,000 trailing margin arrives in **month 21**
in the base case — ten months earlier than before the price rise.

**Supersedes the strategy's "Economics in brief".** That section was written for the
€4.99 ladder and said cash turns positive in month 27; at €4.99 the correct figure was
29, and at €6.99 it is **26**. The cost figures (€2,614, €4,850, €12,692), the
subdomain economics (€310, nine companies) and the slow-case conclusion are unchanged.

## Still open, and still costing something

**The trade mark is costed as pre-launch and decided as post-launch.** One-off setup
carries €1,050 of EUIPO fees less the €700 rebate plus €600 of consultancy, and
recurring carries €105 of amortised renewal — but the October risk table defers filing
behind a clearance opinion, because "Shrtn" may read as descriptive. Deferring
consistently gives **€3,900 one-off and €2,509 recurring**. Pick one and make both
documents say it.

**The Web Risk privacy upgrade is not free.** Strategy rule 8 specifies the Lookup API;
`legale.md` risk 4 recommends the hash-based Update API because Lookup sends full URLs
to Google in clear. `computeDiff` costs nothing, but confirming a hit through
`hashes.search` is **$50 per 1,000 — a hundred times the Lookup unit price**. Roughly
€280 a year at plausible volume, against €0 today under the free quota. Stay on Lookup
while the quota holds; price Update before volume forces the choice.

**Re-verification every 90 days is a churn trigger.** A lapse reprices €6.99 to €17.99
at renewal — now a 2.6× jump rather than 3.6×, which is less punitive but still enough
that customers leave rather than pay. Either soften the repricing rule or budget the
churn.

**Anonymous creation is the only line with cost and risk but no revenue.** Its own
server and domain, the highest abuse vector in `legale.md`, and no account means no
upgrade path. Decide in advance what evidence would justify keeping it past six months.

## The constraint that is not money

Unchanged: the thirty-minute Piracy Shield obligation does not scale with revenue, and
the €100k hiring trigger sits years above break-even — further above it now that the
bar is cost coverage rather than profit. Two named people with credentials and a
written handover, before launch.

## Two exposures the model cannot price

1. **Unsigned IP assignment.** Still the only item with a real deadline. €600, before
   a line of backend code.
2. **Piracy Shield accreditation refused.** A formal kill criterion. Note that one of
   its three stated responses — operating the free tier from outside Italy — is the
   one `legale.md` risk 8 says to remove, because it escapes neither the antipiracy
   obligations nor the DSA.

## Open questions

1. **Do the four group companies subscribe or get free accounts?** The difference is
   47% of the cost base and moves the external target between five companies and nine.
2. **Trade mark before or after launch?** Costed as before, decided as after.
3. **Does anonymous creation earn its keep?** Define the evidence now, while dropping
   it is still cheap.

*Answered since September:* why the verification gap is what it is (a risk premium,
not a price), and whether VIES gates the go-to-market (it no longer does).

## Sources

Hetzner Cloud pricing, September 2026 — [costgoat.com](https://costgoat.com/pricing/hetzner) ·
Google Web Risk pricing — [cloud.google.com](https://cloud.google.com/web-risk/pricing) ·
EUIPO fees and SME Fund, 2026 — [sgbinnovation.it](https://www.sgbinnovation.it/post/marchio-europeo-per-startup-costi-tempi-e-procedura-euipo-2026) ·
Italian cyber-insurance premium bands, 2026 — [economia-italia.com](https://www.economia-italia.com/quanto-costa-una-polizza-cyber-risk-2026) ·
Competitor pricing, Sep–Oct 2026 — [Bitly via Replug](https://replug.io/blog/bitly-pricing), [Short.io via Linkly](https://linklyhq.com/review/shortio)
