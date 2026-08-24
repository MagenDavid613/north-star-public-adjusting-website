import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { LOCATION_PAGES } from '@/data/locationPages'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `What Is a Public Adjuster? | ${BRAND.name}`,
  description:
    'A public adjuster is a licensed insurance professional who represents property owners — not the insurance company — in the claims process. Learn what they do and when to hire one.',
}

const WHAT_THEY_DO = [
  'Inspect and document the full extent of property damage',
  'Interpret your policy to identify every coverage that applies',
  'Prepare and file a complete, properly valued claim',
  'Negotiate directly with the insurance company on your behalf',
  'Handle supplemental claims when new or hidden damage is found',
  'Manage the entire process so you don’t have to',
]

const FAQS = [
  {
    question: 'What is a public adjuster?',
    answer:
      'A public adjuster is a licensed insurance professional who represents the property owner in an insurance claim — not the insurance company. They inspect damage, interpret the policy, prepare the claim, and negotiate the settlement on the policyholder’s behalf.',
  },
  {
    question: 'Is a public adjuster the same as my insurance company’s adjuster?',
    answer:
      'No. The insurance company’s adjuster is paid by and represents the insurer. A public adjuster is hired by and represents you, the policyholder. See our full comparison for details.',
  },
  {
    question: 'How much does a public adjuster cost?',
    answer:
      'Public adjusters typically work on contingency — a percentage of the settlement, paid only if you recover money on your claim. There is no upfront cost. Fee structures vary by state and firm; ask directly before signing an agreement.',
  },
  {
    question: 'Can a public adjuster help if my claim was already filed, denied, or underpaid?',
    answer:
      'Yes. You can hire a public adjuster at any stage — before filing, while a claim is open, after a low offer, or after a denial. It’s rarely too late to get a second, independent review of your claim.',
  },
]

export default function PublicAdjusterPage() {
  const states = Object.values(LOCATION_PAGES)
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Questions', path: '/questions' },
            { name: 'What Is a Public Adjuster?', path: '/questions/what-does-a-public-adjuster-do' },
          ]),
          faqPageSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="Public Adjuster"
        title="What is a public adjuster, and what do they do?"
        subtitle="A public adjuster is a licensed insurance professional who works exclusively for you — the property owner — throughout the insurance claims process. Here's exactly what that means."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">The Short Answer</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Your insurance company has adjusters. Now you do too.</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            When you file a property damage claim, your insurance company sends its own adjuster to inspect the
            damage and determine what they’ll pay. That adjuster is a company employee — their job is to manage
            the insurer’s costs, not to maximize your recovery. A public adjuster is the property owner’s
            equivalent: an independent, licensed professional hired by you to inspect the damage, build the claim,
            and negotiate on your behalf.
          </p>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">What They Do</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">The public adjuster&apos;s job, step by step</h2>
          <ul className="mt-6 space-y-2.5">
            {WHAT_THEY_DO.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[6px] border border-forest-100 bg-white px-4 py-3 text-sm text-ink-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-forest-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">When to Hire One</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">You don&apos;t need to wait for a problem</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Some property owners call a public adjuster the day damage happens, before filing anything. Others call
            after the insurer’s offer feels low, after a claim is denied, or after months of delay. Both are the
            right time — a public adjuster can step in at any stage of the process.
          </p>
          <Link href="/questions/when-should-i-hire-a-public-adjuster" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            When to Hire a Public Adjuster <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Public Adjuster vs. Insurance Adjuster</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Who&apos;s actually on your side?</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            The insurance company’s adjuster and a public adjuster both evaluate your damage — but they work for
            different people, with different incentives.
          </p>
          <Link href="/questions/public-adjuster-vs-insurance-adjuster" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
            See the Full Comparison <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow justify-center block text-center">Types of Claims We Handle</span>
          <h2 className="font-display mt-3 text-center text-2xl font-black text-ink">Every type of property damage claim</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-ink-muted">
            Hail, wind, water, roof, storm, hurricane, fire, commercial, and residential — we handle the full range
            of property insurance claims.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/services" className="rounded-[7px] bg-forest-500 px-6 py-3 text-xs font-extrabold text-white transition-colors hover:bg-forest-600">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow justify-center block text-center">Who We Are</span>
          <h2 className="font-display mt-3 text-center text-2xl font-black text-ink">{BRAND.name}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-ink-muted">{BRAND.tagline}. We work for the property owner, not the insurance company — free inspection, no upfront cost, and no fee unless we recover money on your claim.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {states.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="rounded-pill border border-forest-500/30 bg-white px-4 py-2 text-xs font-semibold text-forest-600">
                {s.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">Public Adjuster — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
