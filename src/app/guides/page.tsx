import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CTARow from '@/components/shared/CTARow'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Insurance Claim Guides | ${BRAND.name}`,
  description:
    'In-depth guides to the property insurance claim process — how claims work, what to document, and how to handle disputes.',
}

const GUIDES = [
  {
    title: 'Insurance Claim Guide',
    body: 'The full property insurance claim process, from damage to resolution, and where things typically go wrong.',
    href: '/guides/insurance-claim-guide',
  },
]

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="In-depth guides to the insurance claim process"
        subtitle="Comprehensive resources for understanding how property insurance claims actually work."
      />

      <CTARow />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group block rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6 transition-colors hover:border-forest-500/40 hover:bg-white"
            >
              <h2 className="text-base font-black text-ink">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{g.body}</p>
              <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-forest-600">
                Read the guide
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
