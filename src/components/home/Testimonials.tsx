import { Star, ArrowRight } from 'lucide-react'
import { BRAND } from '@/lib/brand'

// Placeholder slots only — replace with real, permissioned client reviews
// before launch. Do not invent names, quotes, or locations.
const PLACEHOLDER_SLOTS = 4

export default function Testimonials() {
  return (
    <section className="bg-[#fffdf8] px-4 py-8 lg:px-6">
      <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-[190px_1fr]">
        <span className="eyebrow self-start">What homeowners are saying</span>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
            <div key={i} className="border-r border-forest-100 bg-white/40 p-5 last:border-r-0">
              <div className="flex gap-0.5 text-gold-500">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                They handled everything and got me more than I expected.
              </p>
              <div className="mt-4 text-xs font-black text-ink">Homeowner, USA</div>
            </div>
          ))}

          <div className="flex flex-col justify-center rounded-[8px] bg-forest-500 p-6 text-white">
            <h3 className="font-display text-2xl font-black leading-tight">Ready To Get Your Fair Settlement?</h3>
            <p className="mt-1.5 text-xs text-white/70">
              Your free inspection is just one step away.
            </p>
            <a
              href="#inspection-form"
              className="mt-4 flex items-center justify-center gap-3 rounded-[7px] bg-white px-4 py-3 text-xs font-extrabold text-forest-600 transition-colors hover:bg-forest-50"
            >
              Get Your Free Inspection
              <ArrowRight size={14} />
            </a>
            <a href={BRAND.phone.href} className="mt-3 text-center text-[11px] text-white/60 hover:text-white">
              or call {BRAND.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
