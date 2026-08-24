import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import FAQAccordion, { type FAQItem } from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `FAQ | Public Adjuster Questions Answered | ${BRAND.name}`,
  description: 'Common questions about public adjusters, insurance claims, fees, timelines, and your rights as a policyholder.',
}

const CATEGORIES: { id: string; label: string; items: FAQItem[] }[] = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        id: 'what-is-pa',
        question: 'What exactly does a public adjuster do?',
        answer:
          "A public adjuster is a licensed insurance claims professional who works exclusively for you — the property owner — not the insurance company. We inspect your damage, document everything thoroughly, prepare your claim, file all paperwork, and negotiate directly with your insurer to maximize your settlement. We're your expert, your advocate, and your claim manager from start to finish.",
      },
      {
        id: 'different-from-insurer',
        question: "How is a public adjuster different from the insurance company's adjuster?",
        answer:
          "The insurer's adjuster works for the insurance company. They are trained, paid, and incentivized to minimize what gets paid out on your claim. A public adjuster works exclusively for you — we have no financial relationship with the insurer, and our incentive is to maximize your settlement, not minimize it.",
      },
    ],
  },
  {
    id: 'fees',
    label: 'Fees & Cost',
    items: [
      {
        id: 'cost',
        question: 'How much does a public adjuster cost?',
        answer:
          "Nothing upfront. Our fee is a contingency percentage of the settlement we recover for you. We only get paid when you get paid — and only from what we recover. The percentage is disclosed upfront and agreed in writing before any work begins.",
      },
      {
        id: 'worth-it',
        question: "Is it worth it to hire a public adjuster if I'm paying a percentage?",
        answer:
          `In most cases, yes. Our clients typically see a significant increase over the insurer's initial offer. Even after our contingency fee, policyholders usually walk away with meaningfully more money than they would have accepted alone.`,
      },
    ],
  },
  {
    id: 'process',
    label: 'Process',
    items: [
      {
        id: 'too-late',
        question: 'My insurance company already sent their adjuster. Is it too late?',
        answer:
          "Not necessarily. Most people who call us have already received an initial offer — and that's often where our most impactful work happens. We review their assessment, document damage they missed or undervalued, and file a supplemental claim.",
      },
      {
        id: 'already-settled',
        question: 'Can you help me if I already accepted a settlement?',
        answer:
          "Potentially, yes. In some circumstances, especially when new damage is discovered or additional items were missed, it's possible to reopen a claim or file a supplemental claim. Contact us and we'll review your specific situation at no charge.",
      },
      {
        id: 'what-we-do',
        question: 'What exactly do you handle in the claim process?',
        answer:
          'Everything. We conduct a thorough property inspection, document all visible and hidden damage, prepare the claim package, file all required paperwork with the insurer, manage all correspondence and calls, attend adjuster meetings on your behalf, and negotiate until we reach a fair settlement.',
      },
    ],
  },
  {
    id: 'timeline',
    label: 'Timeline',
    items: [
      {
        id: 'timeline',
        question: 'How long does the process take?',
        answer:
          'Simple residential claims are often resolved within a few weeks. More complex claims — commercial properties, hurricane damage, disputed claims, supplemental filings — can take 30–90 days or longer in contested cases. We keep you informed throughout.',
      },
    ],
  },
  {
    id: 'claims',
    label: 'Claims',
    items: [
      {
        id: 'damage-types',
        question: 'What types of damage do you handle?',
        answer:
          'We handle all types of storm and property damage: hail, wind, water intrusion, flooding, roof damage, hurricane and tropical storm damage, fire and smoke damage, and structural damage. We work with residential homes, commercial buildings, and rental properties.',
      },
      {
        id: 'worth-filing',
        question: "I'm not sure my damage is worth filing a claim. Should I still call?",
        answer:
          "Yes — always. Our inspection is completely free. You'd be surprised how much hidden damage storms cause behind walls, in attics, or in the structure. The inspection costs you nothing and gives you clarity.",
      },
      {
        id: 'denied-claim',
        question: 'My claim was denied. Can you still help?',
        answer:
          'Yes. Claim denials are not always final. We review the denial reason, gather additional documentation, and can file an appeal or demand letter on your behalf.',
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal Rights',
    items: [
      {
        id: 'insurer-angry',
        question: 'Will my insurance company get angry or cancel my policy?',
        answer:
          // TODO: confirm applicable state(s) before publishing — this
          // generalizes rather than naming specific states like Country's did.
          "In most states, your right to hire a public adjuster is protected by law — insurance companies generally cannot penalize you, raise your rates, or cancel your policy simply because you hired one. Confirm the specifics for your state with our team.",
      },
      {
        id: 'sue-insurer',
        question: 'Should I sue my insurance company instead of hiring a public adjuster?',
        answer:
          "Litigation is expensive, time-consuming, and adversarial. Most disputes are resolved far more efficiently through professional claim management and negotiation. If your claim legitimately requires litigation, we'll advise you on that path.",
      },
    ],
  },
]

export default function FAQPage() {
  const allFaqs = CATEGORIES.flatMap((cat) => cat.items.map((item) => ({ question: item.question, answer: item.answer })))

  return (
    <>
      <JsonLd data={faqPageSchema(allFaqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Questions honestly answered"
        subtitle="Everything you need to know before you call — clear, direct answers about how this works, what it costs, and what your rights are."
      />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="mb-10">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-forest-500">{cat.label}</h2>
              <FAQAccordion items={cat.items} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
