'use client'

import { motion } from 'framer-motion'
import { Search, BookOpen, FileText, Scale, Trophy } from 'lucide-react'

const FEATURES = [
  { icon: Search, title: 'Hidden Damage Experts', desc: 'We find damage others overlook.' },
  { icon: BookOpen, title: 'Policy Knowledge', desc: 'We know your policy inside and out.' },
  { icon: FileText, title: 'Expert Documentation', desc: 'We build stronger claims with precision.' },
  { icon: Scale, title: 'Aggressive Negotiation', desc: "We don't settle for less than you deserve." },
  { icon: Trophy, title: 'No Risk, All Reward', desc: 'You pay only when we win.' },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-[#f4f1e9] px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-start">
          <div>
            <span className="eyebrow">Why homeowners choose us</span>
            <h2 className="font-display mt-3 text-[2.45rem] font-black leading-[0.95] text-ink">
              We Level The Playing Field.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Insurance companies have teams of adjusters working for them. We have a team working
              for you — uncovering what they miss and maximizing what you&apos;re entitled to.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-[9.5rem] rounded-[8px] border border-forest-100/60 bg-white p-5 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-forest-100 text-forest-500">
                  <f.icon size={17} />
                </span>
                <h3 className="mt-4 text-sm font-black leading-tight text-ink">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
