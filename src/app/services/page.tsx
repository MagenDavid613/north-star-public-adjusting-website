import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import { DAMAGE_PAGES } from '@/data/damagePages'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Public Adjuster Services | ${BRAND.name}`,
  description:
    'Northstar Public Adjusting handles every type of property insurance claim — hail, wind, water, roof, storm, hurricane, fire, commercial, and residential. Free inspection, no upfront cost.',
}

export default function ServicesPage() {
  const services = Object.values(DAMAGE_PAGES)

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Public adjusting services for every type of property claim"
        subtitle="Whatever damaged your property, our process is the same: independent inspection, full documentation, and a claim built to recover everything you're owed — on contingency, with no upfront cost."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col justify-between rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-5 transition-colors hover:border-forest-500/40 hover:bg-white"
              >
                <div>
                  <h2 className="text-base font-black text-ink">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.heroSub}</p>
                </div>
                <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-forest-600">
                  Learn more
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow">Residential</span>
            <h2 className="font-display mt-3 text-xl font-black text-ink">Homeowner claims</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Most homeowners file a claim once or twice in a lifetime — against an insurer that handles thousands.
              We inspect, document, and negotiate residential claims of every size, from a single damaged roof to a
              total loss.
            </p>
            <Link href="/services/residential-property-claims" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
              Residential Property Claims <ArrowRight size={13} />
            </Link>
          </div>
          <div>
            <span className="eyebrow">Commercial</span>
            <h2 className="font-display mt-3 text-xl font-black text-ink">Business & commercial claims</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Commercial claims carry higher stakes and more complexity — multi-structure damage, tenant disputes,
              and business interruption. We build claims that account for the full financial impact on your
              business.
            </p>
            <Link href="/services/commercial-property-claims" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-600">
              Commercial Property Claims <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-2xl">
          <span className="eyebrow justify-center">Not sure where your claim fits?</span>
          <h2 className="font-display mt-3 text-2xl font-black text-ink">Read what a public adjuster actually does</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            If you&apos;re still deciding whether you need one, start with our overview of what a public adjuster
            is, when to hire one, and how the process works.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/questions/what-does-a-public-adjuster-do" className="rounded-[7px] border border-forest-100 bg-white px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-forest-50">
              What Is a Public Adjuster?
            </Link>
            <Link href="/how-it-works" className="rounded-[7px] border border-forest-100 bg-white px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-forest-50">
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
