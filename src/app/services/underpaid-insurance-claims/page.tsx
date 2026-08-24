import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, X, Check } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `Insurance Settlement Too Low? What to Do | ${BRAND.name}`,
  description:
    'If your insurance company underpaid your property damage claim, you may still have options. Common causes of underpayment and how to pursue the full amount you\'re owed.',
}

const REASONS = [
  'The insurer’s inspection missed hidden or secondary damage',
  'Depreciation was applied more aggressively than the policy allows',
  'The repair scope was written for a repair when replacement was warranted',
  'Code-upgrade requirements weren’t included in the estimate',
  'Contents, landscaping, or ancillary structures were left out',
  'The claim was rushed to close during a high-volume catastrophe event',
]

const NEXT_STEPS = [
  'Compare the insurer’s scope of damage against your own documentation',
  'Get an independent inspection to identify anything left out of the estimate',
  'Request the full itemized estimate, not just the settlement total',
  'Ask whether the payout used replacement cost or actual cash value',
  'File a supplemental claim for anything missing before accepting a final payment',
]

const FAQS = [
  {
    question: 'What does it mean if my insurance claim was underpaid?',
    answer:
      'An underpaid claim means the settlement doesn’t cover the full, properly documented cost of the covered damage — often because the insurer’s inspection missed items, applied excessive depreciation, or scoped a repair instead of a replacement.',
  },
  {
    question: 'Can I still get more money after accepting a settlement?',
    answer:
      'It depends on your policy and whether the payment was final. Many policies allow supplemental claims for damage discovered after the initial settlement. The sooner you raise it, the more options you typically have — get an independent review before accepting a final check if you have any doubt.',
  },
  {
    question: 'What is a supplemental insurance claim?',
    answer:
      'A supplemental claim is a request for additional payment on a claim that’s already been settled, based on damage, costs, or code requirements that weren’t included in the original scope. We document and file supplemental claims regularly.',
  },
]

export default function UnderpaidClaimsPage() {
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Underpaid Insurance Claims', path: '/services/underpaid-insurance-claims' }]),
          faqPageSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="Underpaid Claims"
        title="Insurance settlement too low? You may still have options."
        subtitle="Underpayment usually comes down to what the insurer's inspection missed — not what your policy actually covers. Here's how to find the gap and pursue the rest."
      />

      <CTARow ctaLabel="Get a Free Second Opinion" />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Common Causes</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Why property insurance claims get underpaid</h2>
          <ul className="mt-6 space-y-2.5">
            {REASONS.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[6px] border border-forest-100 bg-white px-4 py-3 text-sm text-ink-muted">
                <X size={14} className="mt-0.5 shrink-0 text-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">What to Do Next</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Steps to take about a low settlement</h2>
          <ul className="mt-6 space-y-2.5">
            {NEXT_STEPS.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[6px] border border-forest-100 bg-white px-4 py-3 text-sm text-ink-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-forest-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold text-ink">
            Our clients average {BRAND.stats.avgIncreasePct} more than their initial insurer offer.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Related</span>
          <h2 className="font-display mt-3 text-xl font-black text-ink">Claim denied outright instead of underpaid?</h2>
          <Link href="/services/denied-insurance-claims" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            Denied Insurance Claims <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">Underpaid Claims — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
