'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, ShieldCheck, DollarSign, BadgeCheck, Users } from 'lucide-react'
import InspectionForm from './InspectionForm'
import { BRAND } from '@/lib/brand'

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: '35+ Years Combined Experience' },
  { icon: DollarSign, label: 'Zero Cost Until We Win' },
  { icon: BadgeCheck, label: 'Licensed & Certified' },
  { icon: Users, label: 'A Team That Fights For You' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[42rem] overflow-hidden border-b border-forest-100/70 px-4 pb-8 pt-12 lg:min-h-[48rem] lg:px-6">
      {/* Full-bleed hero photo */}
      <Image
        src="/hero-image.png"
        alt="Property damage inspection illustration"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_center]"
      />

      {/* Scrim so the headline stays legible over the photo */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#FAF8F3_0%,rgba(250,248,243,0.94)_38%,rgba(250,248,243,0.55)_58%,rgba(250,248,243,0.1)_78%,rgba(250,248,243,0)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-container items-start gap-8 lg:grid-cols-[0.84fr_1.16fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">We fight for what you&apos;re owed</span>
          <h1 className="font-display mt-4 text-5xl font-black leading-[0.9] text-ink sm:text-[4.35rem] lg:text-[4.7rem]">
            You&apos;ve Suffered
            <br />
            Enough.
            <br />
            <span className="text-forest-500">Let Us Fight</span>
            <br />
            <span className="text-forest-500">For You.</span>
          </h1>
          <p className="mt-5 max-w-[30rem] text-sm font-medium leading-relaxed text-ink">
            We help homeowners across the U.S. get the full compensation they deserve. Our average
            client receives <strong>{BRAND.stats.avgIncreasePct} more</strong> than the insurance company&apos;s initial offer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#inspection-form"
              className="flex items-center gap-3 rounded-[7px] bg-forest-500 px-6 py-3 text-xs font-extrabold text-white transition-colors duration-150 hover:bg-forest-600"
            >
              Get Your Free Inspection
              <ArrowRight size={16} />
            </a>
            <button className="flex items-center gap-2 rounded-[7px] border border-forest-100 bg-white px-5 py-3 text-xs font-extrabold text-ink transition-colors hover:bg-forest-50">
              <PlayCircle size={18} className="text-forest-500" />
              Watch Our Story
            </button>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon size={18} className="mt-0.5 shrink-0 text-forest-500" />
                <span className="text-[11px] font-semibold leading-tight text-ink">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[2rem] lg:min-h-[36rem]">
          <div className="lg:absolute lg:right-0 lg:top-5 xl:right-8">
            <InspectionForm />
          </div>
        </div>
      </div>
    </section>
  )
}
