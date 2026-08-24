import type { Metadata } from 'next'
import { Shield, Clock, DollarSign } from 'lucide-react'
import ClaimIntake from '@/components/intake/ClaimIntake'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Free Property Damage Inspection | ${BRAND.name}`,
  description: `Start your free property damage inspection request. ${BRAND.name} handles your entire insurance claim on contingency — no upfront cost. Takes under 3 minutes.`,
  robots: { index: false, follow: false }, // don't index form pages
}

const TRUST_CHIPS = [
  { icon: Shield, text: 'No upfront cost — contingency only' },
  { icon: Clock, text: 'Response within 1–2 hours' },
  { icon: DollarSign, text: `Average ${BRAND.stats.avgIncreasePct} settlement increase` },
]

export default function IntakePage() {
  return (
    <section className="min-h-screen bg-[#fffdf8] px-4 py-14 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="eyebrow justify-center">Free Inspection · No Commitment</span>
          <h1 className="font-display mt-3 text-4xl font-black leading-[0.98] text-ink sm:text-5xl">
            Start your free <span className="text-forest-500">claim review</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
            Takes under 3 minutes. A member of our team reviews your details and contacts you
            prepared to help.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {TRUST_CHIPS.map((chip) => (
              <div
                key={chip.text}
                className="flex items-center gap-2 rounded-pill border border-forest-100 bg-white px-3 py-1.5 text-xs font-medium text-ink-muted"
              >
                <chip.icon size={12} className="text-forest-500" />
                {chip.text}
              </div>
            ))}
          </div>
        </div>

        <ClaimIntake />
      </div>
    </section>
  )
}
