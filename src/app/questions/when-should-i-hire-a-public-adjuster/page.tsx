import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `When to Hire a Public Adjuster | ${BRAND.name}`,
  description:
    'When should you contact a public adjuster? Before filing, after a low offer, after a denial, or after delay — here are the moments that matter most.',
}

const SCENARIOS = [
  { title: 'Right after damage happens', body: 'Before you file anything. An independent inspection up front means your claim starts with the full scope of damage documented.' },
  { title: 'Before you file a claim', body: 'A public adjuster can help make sure your initial filing is complete and accurate — first impressions matter with insurers.' },
  { title: 'After the insurer has already inspected', body: 'It’s not too late. We can review what was found, identify what was missed, and request a second look.' },
  { title: 'After you receive a settlement offer that seems low', body: 'You’re not required to accept the first number. We compare it against a full, independent scope of damage.' },
  { title: 'After a claim is delayed', body: 'If your insurer has gone quiet or kept pushing your claim back, we can escalate and keep pressure on the process.' },
  { title: 'After a claim is denied', body: 'Denials are frequently based on incomplete information. We review the denial and, where warranted, formally challenge it.' },
  { title: 'For a large or complex commercial loss', body: 'Multi-structure damage, business interruption, and tenant disputes benefit from specialized documentation from the start.' },
]

const FAQS = [
  {
    question: 'Should I hire a public adjuster before or after filing my claim?',
    answer:
      'Either works. Hiring before you file means your initial claim is built correctly from the start. Hiring after filing — even after a denial or low offer — is still effective; it’s rarely too late to get an independent review.',
  },
  {
    question: 'Is it too late to hire a public adjuster if my insurer already inspected?',
    answer:
      'No. We can review the insurer’s findings, conduct our own independent inspection, and identify anything that was missed or undervalued.',
  },
  {
    question: 'What if my claim was already denied — can a public adjuster still help?',
    answer:
      'Yes. We review the denial letter and policy language, re-document the damage where needed, and formally challenge denials that don’t hold up.',
  },
]

export default function WhenToHirePage() {
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Questions', path: '/questions' }, { name: 'When to Hire a Public Adjuster', path: '/questions/when-should-i-hire-a-public-adjuster' }]),
          faqPageSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="When to Hire"
        title="When should you contact a public adjuster?"
        subtitle="There's no single right moment — but some situations make hiring one especially valuable. Here's how to know if now is the time."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-3">
            {SCENARIOS.map((s) => (
              <li key={s.title} className="flex items-start gap-3 rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-5">
                <Check size={16} className="mt-0.5 shrink-0 text-forest-500" />
                <div>
                  <h2 className="text-sm font-black text-ink">{s.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-xl">
          <p className="text-sm leading-relaxed text-ink-muted">Still deciding? Start with the basics.</p>
          <Link href="/questions/what-does-a-public-adjuster-do" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest-600">
            What Is a Public Adjuster? <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">When to Hire — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
