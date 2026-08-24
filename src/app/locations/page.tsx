import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import { LOCATION_PAGES } from '@/data/locationPages'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Where We Serve | ${BRAND.name}`,
  description:
    'Northstar Public Adjusting represents property owners in Florida, Texas, Georgia, North Carolina, and Louisiana. Free inspection, no upfront cost.',
}

export default function LocationsPage() {
  const states = Object.values(LOCATION_PAGES)

  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Where we serve property owners"
        subtitle="Northstar Public Adjusting represents policyholders across the following states. If your property is outside these areas, call us — we'll confirm whether we can help."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {states.map((s) => (
            <Link
              key={s.slug}
              href={`/locations/${s.slug}`}
              className="group flex items-center justify-between rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6 transition-colors hover:border-forest-500/40 hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-forest-100 bg-white text-forest-500">
                  <MapPin size={16} />
                </span>
                <div>
                  <h2 className="text-base font-black text-ink">{s.state}</h2>
                  <p className="mt-1 text-xs text-ink-muted">{s.primaryCities.join(', ')}</p>
                </div>
              </div>
              <ArrowRight size={16} className="shrink-0 text-forest-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
