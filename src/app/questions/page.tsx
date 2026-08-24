import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Public Adjuster Questions Answered | ${BRAND.name}`,
  description:
    'Direct answers to the most common questions about public adjusters, insurance claims, and when to hire representation for your property damage claim.',
}

const QUESTIONS = [
  { q: 'What does a public adjuster do?', href: '/questions/what-does-a-public-adjuster-do' },
  { q: 'When should I hire a public adjuster?', href: '/questions/when-should-i-hire-a-public-adjuster' },
  { q: "What's the difference between a public adjuster and my insurance company's adjuster?", href: '/questions/public-adjuster-vs-insurance-adjuster' },
  { q: 'How do I document insurance damage?', href: '/questions/how-do-i-document-insurance-damage' },
  { q: 'What should I do after property damage?', href: '/questions/what-should-i-do-after-property-damage' },
]

export default function QuestionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Public adjuster questions, answered directly"
        subtitle="Straight answers to the questions property owners ask most before, during, and after an insurance claim."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-3">
            {QUESTIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-4 rounded-[8px] border border-forest-100 bg-[#f4f1e9] px-5 py-4 text-sm font-bold text-ink transition-colors hover:border-forest-500/40 hover:bg-white"
                >
                  {item.q}
                  <ArrowRight size={15} className="shrink-0 text-forest-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-xl">
          <p className="text-sm leading-relaxed text-ink-muted">Have a different question about your claim?</p>
          <Link href="/faq" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest-600">
            See the Full FAQ <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  )
}
