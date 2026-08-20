import { DollarSign, Users, Star } from 'lucide-react'
import { BRAND } from '@/lib/brand'

// Carried over from Country Public Adjusters' figures per the rebrand —
// not independently verified here. Confirm accuracy before real launch.
const ITEMS: { icon?: typeof DollarSign; value: string | null; label: string; google?: boolean }[] = [
  { value: `${BRAND.stats.googleReviewCount} 5-Star Reviews`, label: 'Google', google: true },
  { icon: DollarSign, value: BRAND.stats.recoveredTotal, label: 'Recovered For Our Clients' },
  { icon: Users, value: 'Trusted By', label: 'Homeowners Nationwide' },
]

export default function TrustBar() {
  return (
    <section className="border-b border-forest-100/70 bg-white px-4 py-6 lg:px-6">
      <div className="mx-auto grid max-w-container gap-5 sm:grid-cols-3">
        {ITEMS.map(({ icon: Icon, value, label, google }) => (
          <div key={label} className="flex items-center justify-center gap-3 sm:justify-start sm:border-r sm:border-forest-100/70 last:sm:border-r-0">
            {google ? (
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span>
              </span>
            ) : Icon ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-100 text-forest-500">
                <Icon size={18} />
              </span>
            ) : null}
            <div className="leading-tight">
              {google && (
                <span className="flex gap-0.5 text-gold-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
              )}
              <div className="text-base font-black text-ink">{value}</div>
              {!google && <div className="text-xs font-semibold text-ink-muted">{label}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
