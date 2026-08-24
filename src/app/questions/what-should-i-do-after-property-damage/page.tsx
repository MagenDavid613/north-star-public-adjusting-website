import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `Property Damage Insurance Claim Checklist | ${BRAND.name}`,
  description:
    'A step-by-step checklist for what to do immediately after property damage — from safety and documentation through filing your insurance claim.',
}

const STEPS = [
  { title: 'Make sure everyone is safe', body: 'Address any immediate safety hazards first — this always comes before documentation or claims.' },
  { title: 'Prevent further damage', body: 'Take reasonable steps to stop damage from getting worse — a tarp on a roof, water shut-off — while keeping receipts for anything you spend.' },
  { title: 'Photograph and video everything', body: 'Document all affected areas before any cleanup or repairs begin, from multiple angles.' },
  { title: 'Keep damaged items when safe to do so', body: "Don't discard damaged property until it's been documented, unless it's a health or safety risk." },
  { title: 'Collect receipts', body: 'Save every receipt tied to emergency mitigation, temporary repairs, or additional living expenses.' },
  { title: 'Contact the appropriate parties', body: 'Notify your insurer, and consider a public adjuster before your claim is filed if you want an independent review from the start.' },
  { title: 'Keep detailed claim records', body: 'Log every call, save every letter, and track your claim number and adjuster contact information.' },
  { title: 'Prepare for the inspection', body: "Walk the property yourself first so you can point out anything that isn't immediately visible." },
]

export default function ChecklistPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Questions', path: '/questions' },
          { name: 'What Should I Do After Property Damage?', path: '/questions/what-should-i-do-after-property-damage' },
        ])}
      />
      <PageHero
        eyebrow="Checklist"
        title="Property damage insurance claim checklist"
        subtitle="A step-by-step order to follow after property damage — from immediate safety through filing a well-documented claim."
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
          <Link href="/questions/how-do-i-document-insurance-damage" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            Full documentation guide <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-forest-900 px-4 py-16 text-center text-white lg:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-2xl font-black">Want us to walk through this with you?</h2>
          <p className="mt-3 text-sm text-white/70">
            Request a free inspection and we&apos;ll handle documentation, claim preparation, and negotiation from
            here.
          </p>
        </div>
      </section>
    </>
  )
}
