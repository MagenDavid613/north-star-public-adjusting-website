import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import DamageInfoSection from '@/components/damage/DamageInfoSection'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/shared/JsonLd'
import { DAMAGE_PAGES } from '@/data/damagePages'
import { LOCATION_PAGES } from '@/data/locationPages'
import { BRAND } from '@/lib/brand'
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/schema'

export function generateStaticParams() {
  return Object.keys(DAMAGE_PAGES).map((slug) => ({ type: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  const page = DAMAGE_PAGES[type]
  if (!page) return {}
  return { title: page.metaTitle, description: page.metaDescription }
}

export default async function DamageTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const page = DAMAGE_PAGES[type]
  if (!page) notFound()

  const faqItems = page.faqs.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))
  const states = Object.values(LOCATION_PAGES).map((s) => s.state)

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: page.title, description: page.metaDescription, areaServed: states }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: page.title, path: `/services/${page.slug}` },
          ]),
          ...(faqItems.length > 0 ? [faqPageSchema(page.faqs)] : []),
        ]}
      />
      <PageHero eyebrow={page.title} title={page.heroHeadline} subtitle={page.heroSub} />

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

      <DamageInfoSection title={page.title} whatItLooks={page.whatItLooks} whatInsurersUndervalue={page.whatInsurersUndervalue} />

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-2xl">
          <span className="eyebrow justify-center">Local Context</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Where We Work</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{page.localContext}</p>
        </div>
      </section>

      {faqItems.length > 0 && (
        <section className="px-4 py-16 lg:px-6">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display mb-6 text-2xl font-black text-ink">{page.title} — FAQ</h2>
            <FAQAccordion items={faqItems} />
          </div>
        </section>
      )}
    </>
  )
}
