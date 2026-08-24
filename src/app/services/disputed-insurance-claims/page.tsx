import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `Insurance Claim Disputes | ${BRAND.name}`,
  description:
    'Denied claims, underpaid settlements, disputed estimates, and scope disagreements — how property insurance claim disputes happen and how to resolve them.',
}

const DISPUTE_TYPES = [
  {
    title: 'Denied claims',
    body: 'The insurer refuses to pay, citing an exclusion, a coverage dispute, or a documentation gap.',
    href: '/services/denied-insurance-claims',
    cta: 'Denied Claims',
  },
  {
    title: 'Underpaid claims',
    body: 'The insurer pays, but the settlement doesn’t cover the full, documented cost of the damage.',
    href: '/services/underpaid-insurance-claims',
    cta: 'Underpaid Claims',
  },
  {
    title: 'Disputed estimates',
    body: 'You and the insurer disagree on the scope or cost of repairs — repair vs. replacement, materials, or labor rates.',
    href: '/questions/how-do-i-document-insurance-damage',
    cta: 'Documenting Your Damage',
  },
  {
    title: 'Scope disagreements',
    body: 'The insurer’s inspection covers less of the property, or fewer damage causes, than the claim actually involves.',
    href: '/questions/what-should-i-do-after-property-damage',
    cta: 'Claim Checklist',
  },
]

export default function InsuranceClaimDisputesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Insurance Claim Disputes', path: '/services/disputed-insurance-claims' },
        ])}
      />
      <PageHero
        eyebrow="Claim Disputes"
        title="When you and the insurance company don't agree"
        subtitle="Most insurance claim disputes fall into a few common patterns. Here's what they look like and where to start resolving each one."
      />

      <CTARow ctaLabel="Get a Free Second Opinion" />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {DISPUTE_TYPES.map((d) => (
            <div key={d.title} className="rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6">
              <h2 className="text-base font-black text-ink">{d.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
              <Link href={d.href} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
                {d.cta} <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-forest-900 px-4 py-16 text-center text-white lg:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-2xl font-black">Not sure which one describes your claim?</h2>
          <p className="mt-3 text-sm text-white/70">
            Call us or request a free inspection — we&apos;ll review your claim and tell you exactly where it
            stands.
          </p>
        </div>
      </section>
    </>
  )
}
