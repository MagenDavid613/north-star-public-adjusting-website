'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const CASES = [
  { type: 'Hurricane Damage', pct: '856%', offer: '$18,732', settlement: '$179,156', location: 'Houston, TX', image: '/image1.png' },
  { type: 'Fire Damage', pct: '1,026%', offer: '$27,896', settlement: '$313,906', location: 'Orlando, FL', image: '/image2.png' },
  { type: 'Water Damage', pct: '603%', offer: '$14,650', settlement: '$102,983', location: 'Tampa, FL', image: '/image3.png' },
]

export default function ResultsShowcase() {
  return (
    <section id="results" className="bg-forest-900 px-4 py-8 text-white lg:px-6">
      <div className="mx-auto grid max-w-container gap-8 lg:grid-cols-[245px_1fr_72px] lg:items-center">
        <div>
          <span className="eyebrow text-white/60">Real people. Real results.</span>
          <h2 className="font-display mt-3 text-[2.45rem] font-black leading-[0.95]">
            Big Increases.
            <br />
            Real Impact.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/72">
            We don&apos;t just talk results. We deliver them.
          </p>
          <button className="mt-5 flex items-center gap-3 rounded-[7px] bg-forest-500 px-5 py-3 text-xs font-extrabold text-white transition-colors hover:bg-forest-400">
            View More Results
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.div
              key={c.type}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid min-h-[11rem] overflow-hidden rounded-[8px] bg-white text-ink shadow-card sm:grid-cols-[1fr_1.15fr]"
            >
              <div className="relative min-h-[10rem]">
                <Image src={c.image} alt={c.type} fill className="object-cover" />
              </div>
              <div className="p-5">
                <div className="inline-flex rounded-[4px] bg-cream-200 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-ink">
                  {c.type}
                </div>
                <div className="mt-2 text-4xl font-black leading-none text-ink">{c.pct}</div>
                <div className="text-xs font-black uppercase text-ink">Increase</div>
                <div className="mt-3 space-y-1 text-xs text-ink-muted">
                  <p>Insurance Offer <span className="block text-lg font-black text-ink">{c.offer}</span></p>
                  <p>Our Settlement <span className="block text-lg font-black text-ink">{c.settlement}</span></p>
                </div>
                <div className="mt-2 text-[10px] text-ink-muted">{c.location}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden flex-col gap-4 lg:flex">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 hover:bg-white/10">
            <ChevronLeft size={17} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-forest-900 hover:bg-forest-50">
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  )
}
