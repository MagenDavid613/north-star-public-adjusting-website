import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, MapPin, ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Real Claim Results | ${BRAND.name}`,
  description: `Real claim outcomes from ${BRAND.name} — actual settlements vs. the insurer's initial offer.`,
}

// Carried over from Country Public Adjusters' results page per the rebrand —
// not independently verified here. Confirm accuracy/consent before publishing.
const CASE_STUDIES = [
  {
    id: 1,
    tag: 'Hurricane / Wind Damage',
    location: 'South Florida',
    propertyType: 'Residential',
    insurerOffer: 12000,
    settlement: 127000,
    multiplier: '10.6×',
    title: 'Hurricane wind damage — roof, structure, and water intrusion',
    narrative:
      "The insurer's adjuster documented only cosmetic roof damage and issued an offer of $12,000. Our full inspection revealed structural truss damage, compromised roof decking, water intrusion throughout the attic insulation, and interior damage to three rooms the insurer's report completely omitted. After documentation and negotiation, the final settlement was $127,000 — full replacement cost including all missed items.",
    result: 'Full replacement coverage secured',
  },
  {
    id: 2,
    tag: 'Water Damage / Flooding',
    location: 'South Florida',
    propertyType: 'Residential',
    insurerOffer: 8500,
    settlement: 94000,
    multiplier: '11×',
    title: 'Flooding caused foundation moisture, mold, and subfloor damage',
    narrative:
      "The homeowner filed a water damage claim independently and received an $8,500 offer. Our inspection identified foundation moisture intrusion, active mold propagation behind interior walls, compromised subfloor framing, and damaged HVAC components — none of which appeared in the insurer's report. The supplemental claim resulted in a $94,000 settlement.",
    result: 'Mold remediation and full structural repair funded',
  },
  {
    id: 3,
    tag: 'Fire & Smoke Damage',
    location: 'South Florida',
    propertyType: 'Residential',
    insurerOffer: 15000,
    settlement: 165000,
    multiplier: '11×',
    title: 'Kitchen fire with smoke distributed through HVAC throughout entire home',
    narrative:
      "The fire was limited in scope, but smoke was distributed through the entire HVAC system to every room in the house. The insurer's offer addressed only the visible fire damage. We documented contaminated insulation, ductwork replacement requirements, complete odor remediation, and contents replacement — producing a final settlement of $165,000.",
    result: 'Complete home restoration funded',
  },
  {
    id: 4,
    tag: 'Hail / Roof Damage',
    location: 'South Florida',
    propertyType: 'Residential',
    insurerOffer: 4200,
    settlement: 41000,
    multiplier: '9.8×',
    title: 'Insurer denied full roof replacement after major hail event',
    narrative:
      'Following a severe hailstorm, the insurer concluded the roof damage was purely cosmetic and offered $4,200 for spot repairs. We documented granule loss patterns, shingle bruising, compromised flashing, and evidence that multiple areas met the threshold for full replacement under the policy terms. The final settlement of $41,000 covered complete roof replacement.',
    result: 'Full roof replacement covered',
  },
  {
    id: 5,
    tag: 'Hurricane Commercial Damage',
    location: 'South Florida',
    propertyType: 'Commercial',
    insurerOffer: 35000,
    settlement: 310000,
    multiplier: '8.9×',
    title: 'Commercial warehouse damage from hurricane winds',
    narrative:
      'A commercial property owner received a $35,000 offer on a warehouse with significant roof panel damage, structural compromise to the loading dock, damaged inventory, and business interruption losses. Our commercial claim specialist documented all physical damage plus business income loss components, resulting in a $310,000 final settlement.',
    result: 'Full structural and BI losses recovered',
  },
  {
    id: 6,
    tag: 'Commercial Property / Storm',
    location: 'South Florida',
    propertyType: 'Commercial',
    insurerOffer: 80000,
    settlement: 900000,
    multiplier: '11.25×',
    title: 'Commercial property — widespread structural damage and business interruption overlooked',
    narrative:
      "The insurer's initial offer of $80,000 covered only surface-level repairs. A full structural assessment identified widespread damage to load-bearing elements, code compliance upgrade requirements triggered by the damage, and significant business interruption losses the insurer had entirely overlooked. After documentation and negotiation, the final settlement reached $900,000.",
    result: 'Full structural, compliance, and BI losses recovered',
  },
  {
    id: 7,
    tag: 'Wind / Roof Damage',
    location: 'South Florida',
    propertyType: 'Multi-Unit',
    insurerOffer: 22000,
    settlement: 198000,
    multiplier: '9.0×',
    title: 'Multi-unit property with undervalued wind and roof damage across all units',
    narrative:
      "A duplex owner received a $22,000 offer after high-wind damage. Each unit had independent roof, window, and interior damage that the insurer's single-adjuster visit failed to fully capture. We documented damage by unit and negotiated a final settlement of $198,000 covering full repair to both units.",
    result: 'Full multi-unit repair funded',
  },
]

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Real Results"
        title={<>What we&apos;ve recovered <span className="text-forest-500">for property owners</span></>}
        subtitle="These are real claim outcomes. Numbers represent actual settlements vs. the insurer's initial position. All handled on contingency — no upfront cost."
      />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {CASE_STUDIES.map((c) => (
            <div
              key={c.id}
              className="rounded-[8px] border border-forest-100 bg-white p-6 shadow-card transition-shadow hover:shadow-floating lg:p-7"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-[4px] bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-600">
                      {c.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#f4f1e9] px-2.5 py-1 text-xs font-medium text-ink-muted">
                      <MapPin size={10} />{c.location}
                    </span>
                    <span className="inline-flex items-center rounded-[4px] bg-[#f4f1e9] px-2.5 py-1 text-xs font-medium text-ink-muted">
                      {c.propertyType}
                    </span>
                  </div>

                  <h2 className="text-base font-black leading-snug text-ink">{c.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.narrative}</p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <TrendingUp size={12} />{c.result}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 lg:min-w-[140px] lg:flex-col lg:items-end lg:gap-2">
                  <div className="text-center lg:text-right">
                    <div className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted">Insurer offer</div>
                    <div className="text-xl font-black text-red-400">${c.insurerOffer.toLocaleString()}</div>
                  </div>
                  <ArrowRight size={16} className="rotate-90 text-ink-muted lg:rotate-0" />
                  <div className="text-center lg:text-right">
                    <div className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted">Final settlement</div>
                    <div className="text-xl font-black text-forest-500">${c.settlement.toLocaleString()}</div>
                    <div className="mt-0.5 text-xs font-bold text-forest-500/70">{c.multiplier} increase</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6 text-center">
            <p className="mb-6 text-xs text-ink-muted">
              All results represent actual claim outcomes. Individual results vary by claim complexity, damage extent, and insurer.
            </p>
            <Link
              href="/#inspection-form"
              className="inline-flex items-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
            >
              Get Free Inspection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
