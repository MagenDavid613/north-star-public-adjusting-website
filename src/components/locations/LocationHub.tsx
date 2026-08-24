import Link from 'next/link'
import { Phone, ArrowRight, Globe } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import type { LocationPageData } from '@/data/locationPages'

export default function LocationHub({ data }: { data: LocationPageData }) {
  const faqItems = data.faqs.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Locations', path: '/locations' },
            { name: data.state, path: `/locations/${data.slug}` },
          ]),
          ...(faqItems.length > 0 ? [faqPageSchema(data.faqs)] : []),
        ]}
      />
      <PageHero eyebrow={`${data.state} Public Adjuster`} title={data.heroHeadline} subtitle={data.heroSub} />

      <div className="flex flex-col items-center gap-3 px-4 pb-4 pt-8 sm:flex-row sm:justify-center">
        <Link
          href="/#inspection-form"
          className="flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
        >
          Get Free Inspection
          <ArrowRight size={16} />
        </Link>
        <a
          href={BRAND.phone.href}
          className="flex items-center justify-center gap-2 rounded-[7px] border border-forest-100 bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-forest-50"
        >
          <Phone size={16} /> {BRAND.phone.display}
        </a>
      </div>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{data.state} Storm Context</span>
            <h2 className="font-display mt-3 text-2xl font-black leading-tight text-ink">
              {data.state}&apos;s storm season demands an expert in your corner
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
              {data.stormContext.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="font-semibold text-ink">
                No upfront cost. No recovery, no fee. Our clients average {BRAND.stats.avgIncreasePct} more than
                their initial insurer offer.
              </p>
            </div>
          </div>

          <div className="rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6">
            <h3 className="text-base font-black text-ink">{data.state} cities we serve</h3>
            <p className="mt-1 text-sm text-ink-muted">And everywhere in between.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.primaryCities.map((city) => (
                <span key={city} className="rounded-pill border border-forest-500/30 bg-forest-50 px-3 py-1.5 text-xs font-semibold text-forest-600">
                  {city}
                </span>
              ))}
              {data.extraCities.map((city) => (
                <span key={city} className="rounded-pill border border-forest-100 bg-white px-3 py-1.5 text-xs font-medium text-ink-muted">
                  {city}
                </span>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs text-ink-muted">
              <Globe size={13} className="mt-0.5 shrink-0 text-forest-500" />
              If your property is in {data.state}, call us — we&apos;ll confirm coverage for your specific location.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-forest-900 px-4 py-16 text-white lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-black">
            {data.state} public adjuster — frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-white/60">Everything you need to know about hiring a public adjuster in {data.state}.</p>
          <div className="mt-6">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  )
}
