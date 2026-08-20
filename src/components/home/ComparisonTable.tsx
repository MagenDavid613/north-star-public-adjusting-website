'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const WITH_US = [
  'Maximum Settlement',
  'Experts Working For You',
  'Thorough Damage Inspection',
  'All Damages Identified',
  'Aggressive Negotiation',
  'Zero Out-of-Pocket Cost',
]

const WITHOUT_US = [
  'Lowball Insurance Offers',
  'Insurance Adjusters Work For Them',
  'Surface-Level Inspections',
  'Hidden Damage Missed',
  'Minimal Negotiation',
  'Stress & Frustration',
]

export default function ComparisonTable() {
  return (
    <section className="bg-[#fffdf8] px-4 py-9 lg:px-6">
      <div className="mx-auto grid max-w-container gap-8 lg:grid-cols-[220px_1fr_320px] lg:items-center">
        <div>
          <span className="eyebrow">The difference is clear</span>
          <h2 className="font-display mt-3 text-[2.45rem] font-black leading-[0.95] text-ink">
            With Us vs. Without Us
          </h2>
        </div>

        <div className="relative grid gap-5 md:grid-cols-[1fr_170px_1fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-[8px] border border-forest-100 bg-white text-ink shadow-card"
          >
            <h3 className="bg-forest-500 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white">
              With Northstar Public Adjusting
            </h3>
            <ul className="space-y-3 p-5">
              {WITH_US.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-xs font-semibold">
                  <Check size={15} className="shrink-0 text-forest-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="flex justify-center">
            <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border border-forest-100 bg-[radial-gradient(circle,#fff_0%,#f4f1e9_68%,#ede8dc_100%)] text-center shadow-card">
              <span className="text-5xl font-black text-forest-500">747%</span>
              <span className="mt-1 px-5 text-[10px] font-black uppercase leading-tight tracking-wide text-ink">
                Average Increase In Claim Payouts
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-[8px] border border-forest-100 bg-white shadow-card"
          >
            <h3 className="bg-cream-200 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-ink">
              Without a Public Adjuster
            </h3>
            <ul className="space-y-3 p-5">
              {WITHOUT_US.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-ink-muted">
                  <X size={15} className="shrink-0 text-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="relative hidden min-h-[14rem] overflow-hidden rounded-[8px] lg:block">
          <Image src="/image4.png" alt="Family looking at their home" fill className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/80 to-transparent p-6 text-white">
            <p className="font-display text-2xl font-black leading-tight">
              You focus on your family. We&apos;ll handle the insurance company.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
