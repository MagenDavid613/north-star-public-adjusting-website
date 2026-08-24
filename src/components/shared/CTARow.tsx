import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { BRAND } from '@/lib/brand'

export default function CTARow({ ctaLabel = 'Get Free Inspection' }: { ctaLabel?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 pb-4 pt-8 sm:flex-row sm:justify-center">
      <Link
        href="/#inspection-form"
        className="flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
      >
        {ctaLabel}
        <ArrowRight size={16} />
      </Link>
      <a
        href={BRAND.phone.href}
        className="flex items-center justify-center gap-2 rounded-[7px] border border-forest-100 bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-forest-50"
      >
        <Phone size={16} /> {BRAND.phone.display}
      </a>
    </div>
  )
}
