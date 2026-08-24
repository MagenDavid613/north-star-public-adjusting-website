import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/brand'

const STATE_SLUGS: Record<string, string> = {
  Florida: 'florida',
  Texas: 'texas',
  Georgia: 'georgia',
  'North Carolina': 'north-carolina',
  Louisiana: 'louisiana',
}

export default function ServiceAreas() {
  const areas = BRAND.serviceAreas.length > 0 ? BRAND.serviceAreas : [
    { state: 'Florida', cities: ['Orlando', 'Tampa', 'Miami', 'Jacksonville', '& More'] },
    { state: 'Texas', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', '& More'] },
    { state: 'Georgia', cities: ['Atlanta', 'Savannah', 'Augusta', 'Macon', '& More'] },
    { state: 'North Carolina', cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Wilmington', '& More'] },
    { state: 'Louisiana', cities: ['New Orleans', 'Baton Rouge', 'Lafayette', 'Shreveport', '& More'] },
  ]

  return (
    <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-8 lg:px-6">
      <div className="mx-auto grid max-w-container gap-8 lg:grid-cols-[220px_300px_1fr] lg:items-center">
        <div>
          <span className="eyebrow">We&apos;ve got you covered</span>
          <h2 className="font-display mt-3 text-[2.3rem] font-black leading-[0.95] text-ink">
            States &amp; Cities We Serve
          </h2>
        </div>

        <div className="relative mx-auto aspect-[16/10] w-full max-w-[300px]">
          <Image
            src="/us-map.png"
            alt="Map of states Northstar Public Adjusting serves"
            fill
            sizes="300px"
            className="object-contain"
          />
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
          {areas.map((area) => {
            const slug = STATE_SLUGS[area.state]
            return (
              <div key={area.state}>
                {slug ? (
                  <Link href={`/locations/${slug}`} className="mb-3 block text-xs font-black uppercase tracking-wide text-ink hover:text-forest-500">
                    {area.state}
                  </Link>
                ) : (
                  <h3 className="mb-3 text-xs font-black uppercase tracking-wide text-ink">{area.state}</h3>
                )}
                <ul className="space-y-2 text-xs font-semibold text-ink-muted">
                  {area.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
