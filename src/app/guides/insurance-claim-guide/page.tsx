import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import JsonLd from '@/components/shared/JsonLd'
import { DAMAGE_PAGES } from '@/data/damagePages'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `Property Insurance Claims Explained | ${BRAND.name}`,
  description:
    'How property insurance claims work, why they get denied or underpaid, and what property owners can do about it — a full guide to the claims process.',
}

const STEPS = [
  { title: 'Damage occurs', body: 'Storm, fire, water, or another covered event damages your property.' },
  { title: 'The claim is filed', body: 'You or your representative notify the insurer and open a claim file.' },
  { title: 'The insurer inspects', body: 'The insurance company sends its own adjuster to assess the damage.' },
  { title: 'An offer is made', body: 'The insurer proposes a settlement based on its own inspection and scope.' },
  { title: 'You accept, negotiate, or dispute', body: 'You can accept the offer, negotiate for more, or dispute it if it’s incomplete.' },
  { title: 'The claim is resolved', body: 'Once a settlement is agreed, funds are released and repairs can proceed.' },
]

export default function InsuranceClaimsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Insurance Claim Guide', path: '/guides/insurance-claim-guide' },
        ])}
      />
      <PageHero
        eyebrow="Insurance Claims"
        title="How property insurance claims actually work"
        subtitle="Every property insurance claim follows the same basic path — but the outcome depends heavily on how well the damage is documented and who's representing your side of it."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4 rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-500 text-sm font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-sm font-black text-ink">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/how-it-works" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            See how our process fits into this <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-forest-900 px-4 py-16 text-white lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow text-forest-100">Where Claims Go Wrong</span>
          <h2 className="font-display mt-3 text-2xl font-black">Why claims get denied or underpaid</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            The insurance company’s inspection is not designed to find every dollar of covered damage — it’s
            designed to manage the insurer’s payout. That gap is where most denials and underpayments happen: an
            incomplete scope, a missed cause of loss, or a documentation gap the policyholder didn’t know to fill.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services/denied-insurance-claims" className="rounded-[7px] bg-white px-5 py-2.5 text-xs font-bold text-ink">
              Denied Claims
            </Link>
            <Link href="/services/underpaid-insurance-claims" className="rounded-[7px] bg-white px-5 py-2.5 text-xs font-bold text-ink">
              Underpaid Claims
            </Link>
            <Link href="/services/disputed-insurance-claims" className="rounded-[7px] border border-white/30 px-5 py-2.5 text-xs font-bold text-white">
              Claim Disputes
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Do It Right the First Time</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Documentation is the whole game</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            The single biggest factor in how much a claim recovers is how well the damage was documented — before
            cleanup, before repairs, and before the insurer’s inspection. We built a checklist and a documentation
            guide to help you get this right from day one.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/questions/what-should-i-do-after-property-damage" className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
              Insurance Claim Checklist <ArrowRight size={13} />
            </Link>
            <Link href="/questions/how-do-i-document-insurance-damage" className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
              What to Document <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-5xl">
          <span className="eyebrow justify-center block text-center">By Damage Type</span>
          <h2 className="font-display mt-3 text-center text-2xl font-black text-ink">Claims we handle</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {Object.values(DAMAGE_PAGES).map((d) => (
              <Link key={d.slug} href={`/services/${d.slug}`} className="rounded-pill border border-forest-100 bg-white px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-forest-500/40">
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
