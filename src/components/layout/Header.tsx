'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { DAMAGE_PAGES } from '@/data/damagePages'
import { LOCATION_PAGES } from '@/data/locationPages'

const SERVICES_MENU = [
  { label: 'All Services', href: '/services' },
  ...Object.values(DAMAGE_PAGES).map((d) => ({ label: d.title, href: `/services/${d.slug}` })),
]

const LOCATIONS_MENU = [
  { label: 'All Locations', href: '/locations' },
  ...Object.values(LOCATION_PAGES).map((s) => ({ label: s.state, href: `/locations/${s.slug}` })),
]

const RESOURCES_MENU = [
  { label: 'All Questions', href: '/questions' },
  { label: 'What Is a Public Adjuster?', href: '/questions/what-does-a-public-adjuster-do' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'When to Hire a Public Adjuster', href: '/questions/when-should-i-hire-a-public-adjuster' },
  { label: 'Public Adjuster vs. Insurance Adjuster', href: '/questions/public-adjuster-vs-insurance-adjuster' },
  { label: 'Insurance Claim Guide', href: '/guides/insurance-claim-guide' },
  { label: 'Denied Insurance Claims', href: '/services/denied-insurance-claims' },
  { label: 'Underpaid Insurance Claims', href: '/services/underpaid-insurance-claims' },
  { label: 'Insurance Claim Disputes', href: '/services/disputed-insurance-claims' },
  { label: 'Claim Documentation Guide', href: '/questions/how-do-i-document-insurance-damage' },
  { label: 'Insurance Claim Checklist', href: '/questions/what-should-i-do-after-property-damage' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Claim Results', href: '/results' },
  { label: 'Partner With Us', href: '/partners' },
  { label: 'Restoration Partners', href: '/restoration' },
]

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Services', menu: SERVICES_MENU },
  { label: 'Locations', menu: LOCATIONS_MENU },
  { label: 'About Us', href: '/about' },
  { label: 'Resources', menu: RESOURCES_MENU },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-forest-100/70 bg-[#fffdf8]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo1.png"
            alt={BRAND.name}
            width={216}
            height={144}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            link.menu ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(link.label)}
                onMouseLeave={() => setOpenMenu((cur) => (cur === link.label ? null : cur))}
              >
                <button
                  onClick={() => setOpenMenu((cur) => (cur === link.label ? null : link.label))}
                  className="flex items-center gap-1 text-xs font-bold text-ink transition-colors duration-150 hover:text-forest-500"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`text-ink-muted transition-transform duration-150 ${openMenu === link.label ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {openMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-full z-50 mt-3 w-[30rem] -translate-x-1/2 rounded-[8px] border border-forest-100/70 bg-forest-50/90 p-3 shadow-floating backdrop-blur"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {link.menu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-[6px] px-3 py-2 text-sm font-medium text-ink transition-all duration-200 hover:bg-gradient-to-r hover:from-forest-100 hover:to-forest-50 hover:text-forest-600"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-xs font-bold text-ink transition-colors duration-150 hover:text-forest-500"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={BRAND.phone.href} className="flex items-center gap-2 text-right">
            <Phone size={16} className="text-forest-500" />
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-ink">{BRAND.phone.display}</span>
              <span className="block text-[11px] text-ink-muted">Available 24/7</span>
            </span>
          </a>
          <a
            href="#inspection-form"
            className="flex items-center gap-3 rounded-[7px] bg-forest-900 px-5 py-3 text-xs font-extrabold text-white transition-colors duration-150 hover:bg-forest-600"
          >
            Free Inspection
            <ArrowRight size={15} />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-forest-100 text-forest-600 lg:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-forest-100 bg-white p-3 lg:hidden">
          {NAV_LINKS.map((link) =>
            link.menu ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileSubmenu((cur) => (cur === link.label ? null : link.label))}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-forest-50"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`text-ink-muted transition-transform duration-150 ${mobileSubmenu === link.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileSubmenu === link.label && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-forest-100 pl-3">
                    {link.menu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setMobileOpen(false); setMobileSubmenu(null) }}
                        className="rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-forest-50 hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-forest-50"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="#inspection-form"
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-forest-500 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Free Inspection
            <ArrowRight size={15} />
          </a>
        </div>
      )}
    </header>
  )
}
