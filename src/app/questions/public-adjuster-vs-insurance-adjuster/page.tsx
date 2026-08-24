import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `Public Adjuster vs. Insurance Adjuster | ${BRAND.name}`,
  description:
    "What's the difference between a public adjuster and your insurance company's adjuster? Who they represent, how they're paid, and what that means for your claim.",
}

const ROWS: { label: string; publicAdjuster: string; insurerAdjuster: string }[] = [
  { label: 'Who they work for', publicAdjuster: 'You, the property owner', insurerAdjuster: 'The insurance company' },
  { label: 'Who pays them', publicAdjuster: 'A contingency fee, paid only if you recover money', insurerAdjuster: 'A salary from the insurance company' },
  { label: 'Their incentive', publicAdjuster: 'Maximize your claim recovery', insurerAdjuster: 'Manage the insurer’s payout costs' },
  { label: 'Who they represent in a dispute', publicAdjuster: 'You, the policyholder', insurerAdjuster: 'The insurance company' },
  { label: 'Inspection depth', publicAdjuster: 'Full, independent scope of all damage', insurerAdjuster: 'Often limited by time and claim volume' },
  { label: 'License requirement', publicAdjuster: 'Licensed by the state to represent policyholders', insurerAdjuster: 'Licensed by the state to represent insurers' },
]

const FAQS = [
  {
    question: "What's the difference between a public adjuster and my insurance company's adjuster?",
    answer:
      'A public adjuster is hired by and represents you, the property owner, and is paid on contingency from your claim recovery. Your insurance company’s adjuster is a company employee (or contracted on the insurer’s behalf) whose job is to manage the insurer’s payout costs.',
  },
  {
    question: 'Is it legal to hire a public adjuster if my insurer already sent an adjuster?',
    answer:
      'Yes. Hiring a public adjuster is your legal right as a policyholder, and it doesn’t replace or conflict with the insurer’s own adjuster process — it gives you independent representation alongside it.',
  },
  {
    question: 'Will hiring a public adjuster upset my insurance company?',
    answer:
      'No — it’s a normal, legally protected part of the claims process. Insurers cannot penalize, cancel, or discriminate against you for hiring a public adjuster to represent your side of the claim.',
  },
]

export default function PAvsIAPage() {
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Questions', path: '/questions' }, { name: 'Public Adjuster vs. Insurance Adjuster', path: '/questions/public-adjuster-vs-insurance-adjuster' }]),
          faqPageSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="Public Adjuster vs. Insurance Adjuster"
        title="Who's actually representing you in your claim?"
        subtitle="Both a public adjuster and your insurance company's adjuster inspect and evaluate your damage — but they work for different people, with very different incentives."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl overflow-x-auto">
          <table className="w-full min-w-[560px] overflow-hidden rounded-[8px] border border-forest-100 text-left text-sm">
            <thead>
              <tr className="bg-forest-900 text-white">
                <th className="px-4 py-3 font-bold">&nbsp;</th>
                <th className="px-4 py-3 font-bold">Public Adjuster</th>
                <th className="px-4 py-3 font-bold">Insurance Adjuster</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f1e9]'}>
                  <td className="border-t border-forest-100 px-4 py-3 font-bold text-ink">{row.label}</td>
                  <td className="border-t border-forest-100 px-4 py-3 text-ink-muted">
                    <span className="flex items-start gap-2">
                      <Check size={14} className="mt-0.5 shrink-0 text-forest-500" /> {row.publicAdjuster}
                    </span>
                  </td>
                  <td className="border-t border-forest-100 px-4 py-3 text-ink-muted">
                    <span className="flex items-start gap-2">
                      <X size={14} className="mt-0.5 shrink-0 text-red-400" /> {row.insurerAdjuster}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            Exact licensing rules and fee limits vary by state — see your state page for local details, or ask us
            directly.
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-forest-600">
            <Link href="/locations/florida" className="inline-flex items-center gap-1">Florida <ArrowRight size={12} /></Link>
            <Link href="/locations/texas" className="inline-flex items-center gap-1">Texas <ArrowRight size={12} /></Link>
            <Link href="/locations/georgia" className="inline-flex items-center gap-1">Georgia <ArrowRight size={12} /></Link>
            <Link href="/locations/north-carolina" className="inline-flex items-center gap-1">North Carolina <ArrowRight size={12} /></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-xl">
          <p className="text-sm leading-relaxed text-ink-muted">Want the fuller picture of what a public adjuster does?</p>
          <Link href="/questions/what-does-a-public-adjuster-do" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest-600">
            What Is a Public Adjuster? <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">Public Adjuster vs. Insurance Adjuster — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
