import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Camera } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `What to Document After Property Damage | ${BRAND.name}`,
  description:
    'What photos, records, and documentation you need after property damage to support a strong insurance claim — before cleanup and before the insurer inspects.',
}

const CATEGORIES = [
  {
    title: 'Photos and video',
    items: [
      'Wide shots of every affected room, area, or structure',
      'Close-ups of specific damage — cracks, stains, breaks, char',
      'Multiple angles of exterior and roof damage',
      'Timestamps or a dated newspaper/phone screen in frame if possible',
    ],
  },
  {
    title: 'Records and receipts',
    items: [
      'Receipts for any emergency mitigation (tarps, water extraction, board-up)',
      'Repair estimates from licensed contractors',
      'Proof of ownership for damaged high-value items',
      'Any prior inspection or maintenance records for the property',
    ],
  },
  {
    title: 'Damaged property',
    items: [
      'Keep damaged items if it’s safe and practical to do so',
      'Don’t discard large damaged materials until documented and, if needed, inspected',
      'Log serial numbers and approximate value for damaged belongings',
    ],
  },
  {
    title: 'Communication with your insurer',
    items: [
      'Save all written correspondence, including claim numbers and adjuster names',
      'Note the date and summary of every phone call',
      'Get any verbal coverage decisions confirmed in writing',
    ],
  },
]

const FAQS = [
  {
    question: 'What photos should I take after property damage?',
    answer:
      'Take wide shots of every affected area plus close-ups of specific damage, from multiple angles, as soon as it’s safe to do so — ideally before any cleanup or temporary repairs.',
  },
  {
    question: 'Should I throw away damaged items before the adjuster sees them?',
    answer:
      'No — keep damaged items if it’s safe and practical. If something must be discarded for safety or health reasons, photograph and document it thoroughly first.',
  },
  {
    question: 'What records should I keep during an insurance claim?',
    answer:
      'Keep every receipt related to emergency repairs, all correspondence with your insurer, contractor estimates, and a log of dates and summaries for every phone call about your claim.',
  },
]

export default function DocumentationPage() {
  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Questions', path: '/questions' }, { name: 'What to Document After Property Damage', path: '/questions/how-do-i-document-insurance-damage' }]),
          faqPageSchema(FAQS),
        ]}
      />
      <PageHero
        eyebrow="Documentation"
        title="What to document after property damage"
        subtitle="The strength of your claim is decided before the insurer ever shows up — by what you document, and how thoroughly, in the first hours and days after damage."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-forest-100 bg-white text-forest-500">
                  <Camera size={16} />
                </span>
                <h2 className="text-base font-black leading-tight text-ink">{cat.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="rounded-[6px] border border-forest-100 bg-white px-4 py-2.5 text-sm text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-xl">
          <p className="text-sm leading-relaxed text-ink-muted">
            Want a step-by-step order to follow right after damage happens?
          </p>
          <Link href="/questions/what-should-i-do-after-property-damage" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest-600">
            See the Full Checklist <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display mb-6 text-2xl font-black text-ink">Documentation — FAQ</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
