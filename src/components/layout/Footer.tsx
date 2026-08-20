import Image from 'next/image'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { BRAND } from '@/lib/brand'

// Footer links are intentionally non-navigating (disabled) until these
// pages/sections actually exist — avoids linking out to 404s.
const COLUMNS = [
  {
    title: 'Company',
    links: ['About Us', 'Our Team', 'Contact Us'],
  },
  {
    title: 'Services',
    links: ['Residential Claims', 'Commercial Claims', 'Storm Damage'],
  },
  {
    title: 'Resources',
    links: ['How It Works', 'Claim Process', 'FAQ'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-forest-900 px-4 pb-8 pt-8 text-white">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <span className="inline-flex rounded-[6px] bg-white px-3 py-2">
              <Image src="/logo1.png" alt={BRAND.name} width={216} height={144} className="h-12 w-auto" />
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              We fight for policyholders and maximize claim settlements. You don&apos;t pay unless we win.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-forest-100">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((label) => (
                  <li key={label}>
                    <span className="cursor-not-allowed select-none text-sm text-white/40">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-forest-100">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-forest-100" />
                <a href={BRAND.phone.href} className="hover:text-white">{BRAND.phone.display}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-forest-100" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-forest-100" />
                <span>24/7 Availability</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-forest-100" />
                <span>Free Consultation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <div className="flex gap-5">
            <span className="cursor-not-allowed select-none">Privacy Policy</span>
            <span className="cursor-not-allowed select-none">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
