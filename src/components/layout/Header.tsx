'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { BRAND } from '@/lib/brand'

const NAV_LINKS = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Services', href: '/#services', dropdown: true },
  { label: 'Claim Results', href: '/#results' },
  { label: 'About Us', href: '/about' },
  { label: 'Resources', href: '/#faq', dropdown: true },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
            className="flex items-center gap-1 text-xs font-bold text-ink transition-colors duration-150 hover:text-forest-500"
            >
              {link.label}
              {link.dropdown && <ChevronDown size={14} className="text-ink-muted" />}
            </a>
          ))}
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-forest-50"
            >
              {link.label}
            </a>
          ))}
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
