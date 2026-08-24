import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `How It Works | ${BRAND.name}`,
  description:
    'What happens when you hire Northstar Public Adjusting — from your first call to a resolved claim. Free inspection, no upfront cost, no fee unless we recover money for you.',
}

const STEPS = [
  {
    title: 'Free inspection',
    body: 'We inspect your property in person and document every area of damage — not just what’s immediately visible.',
  },
  {
    title: 'Full documentation',
    body: 'We photograph, measure, and record the complete scope of damage, including anything an insurer’s quick inspection is likely to miss.',
  },
  {
    title: 'Policy review',
    body: 'We review your policy line by line to identify every coverage that applies to your loss.',
  },
  {
    title: 'Claim preparation',
    body: 'We prepare a complete, properly valued claim package built to withstand scrutiny — not a rough estimate.',
  },
  {
    title: 'Negotiation',
    body: 'We deal directly with the insurance company so you don’t have to — presenting evidence, responding to pushback, and pressing for full value.',
  },
  {
    title: 'Resolution',
    body: 'Once a fair settlement is reached, we help coordinate next steps so repairs can move forward.',
  },
]

const FAQS = [
  {
    question: 'How does a public adjuster work?',
    answer:
      'A public adjuster inspects your damage independently, reviews your policy, prepares a complete claim, and negotiates directly with the insurance company on your behalf — from the first call through final settlement.',
  },
  {
    question: 'What happens after I request a free inspection?',
    answer:
      'We schedule an in-person inspection of your property, document the full scope of damage, and walk you through what we find and what your policy covers. There’s no obligation and no upfront cost.',
  },
  {
    question: 'How long does the process take?',
    answer:
      'It depends on the complexity of the damage and how the insurance company responds. Straightforward claims can move in weeks; larger or disputed claims can take longer. We keep you updated at every stage.',
  },
  {
    question: 'Do I have to do anything while you handle my claim?',
    answer:
      'Very little. We handle inspections, documentation, paperwork, and negotiation. We may occasionally need access to the property or a quick confirmation from you, but the process is designed to take the burden off your plate.',
  },
]

export default function HowItWorksPage() {
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <PageHero
        eyebrow="How It Works"
        title="What happens when you hire a public adjuster"
        subtitle="From your first call to a resolved claim — here's exactly what our process looks like, start to finish."
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
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-xl">
          <p className="text-sm font-semibold text-ink">
            No upfront cost. No recovery, no fee. Our clients average {BRAND.stats.avgIncreasePct} more than their
            initial insurer offer.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">How It Works — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
