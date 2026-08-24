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
  title: `Insurance Claim Denied? What to Do Next | ${BRAND.name}`,
  description:
    'Your property insurance claim was denied — that isn’t always the final answer. Common denial reasons, what to do next, and how a public adjuster can help you challenge it.',
}

const REASONS = [
  'The insurer classified damage as pre-existing or wear and tear',
  'The policy exclusion cited doesn’t actually apply to your loss',
  'Documentation was incomplete when the claim was filed',
  'The cause of loss was disputed (e.g., wind vs. flood)',
  'A deadline or notice requirement was missed or disputed',
  'The insurer’s inspection missed damage that supports coverage',
]

const NEXT_STEPS = [
  'Request the denial letter in writing with the specific policy language cited',
  'Get an independent inspection to document what the insurer may have missed',
  'Review your policy for coverage the denial letter didn’t address',
  'Respond in writing before any appeal deadline in your policy',
  'Consider a public adjuster to build and present a formal challenge',
]

const FAQS = [
  {
    question: 'Can I still get paid after my insurance claim is denied?',
    answer:
      'Often, yes. A denial is not always the final word — many denials are based on an incomplete inspection or an exclusion that doesn’t actually apply. A public adjuster can review the denial, re-inspect the damage, and formally challenge the decision.',
  },
  {
    question: 'How long do I have to appeal a denied claim?',
    answer:
      'Appeal windows vary by policy and state. Check your denial letter and policy for the specific deadline, and act quickly — the sooner you respond, the more options you have.',
  },
  {
    question: 'Do I need a lawyer to fight a denied claim?',
    answer:
      'Not necessarily. A public adjuster can review the denial, re-document the damage, and negotiate directly with the insurer. If the dispute escalates into a legal matter, we can work alongside an attorney when needed.',
  },
]

export default function DeniedClaimsPage() {
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Denied Insurance Claims', path: '/services/denied-insurance-claims' }]),
          faqPageSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="Denied Claims"
        title="Your insurance claim was denied. That's not always the final answer."
        subtitle="Denials are often based on an incomplete inspection, a misapplied exclusion, or a documentation gap — not because the damage isn't covered. Here's what to do next."
      />

      <CTARow ctaLabel="Get a Free Second Opinion" />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Common Reasons</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Why property insurance claims get denied</h2>
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
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Steps to take after a denial</h2>
          <ul className="mt-6 space-y-2.5">
            {NEXT_STEPS.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[6px] border border-forest-100 bg-white px-4 py-3 text-sm text-ink-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-forest-500" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/questions/how-do-i-document-insurance-damage" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            What to document for an appeal <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Related</span>
          <h2 className="font-display mt-3 text-xl font-black text-ink">Also dealing with a low offer instead of a denial?</h2>
          <Link href="/services/underpaid-insurance-claims" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            Underpaid Insurance Claims <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">Denied Claims — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
