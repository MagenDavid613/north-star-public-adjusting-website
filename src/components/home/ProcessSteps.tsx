'use client'

import { motion } from 'framer-motion'
import { Home, Camera, LineChart, MessageSquare, Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { icon: Home, title: 'Inspect', desc: 'We inspect every inch of damage.' },
  { icon: Camera, title: 'Document', desc: 'We create detailed reports and estimates.' },
  { icon: LineChart, title: 'Analyze', desc: 'We review your policy and coverages.' },
  { icon: MessageSquare, title: 'Negotiate', desc: 'We handle all talks with the insurer.' },
  { icon: Check, title: 'Maximize', desc: 'We secure the maximum settlement for you.', done: true },
]

export default function ProcessSteps() {
  return (
    <section id="how-it-works" className="border-y border-forest-100/60 bg-[#fffdf8] px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-container">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
          <div>
          <span className="eyebrow">Our proven process</span>
          <h2 className="font-display mt-3 text-[2.45rem] font-black leading-[0.95] text-ink">
            How We Win <span className="text-forest-500">For You.</span>
          </h2>
          </div>

        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-start sm:justify-between">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex flex-1 items-start gap-2 sm:items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center sm:w-full"
              >
                <span className="mb-1 text-[11px] font-bold text-ink">0{i + 1}</span>
                <span
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full border shadow-card',
                    s.done ? 'border-forest-500 bg-forest-500 text-white' : 'border-forest-100 bg-white text-forest-500'
                  )}
                >
                  <s.icon size={20} />
                </span>
                <h3 className="mt-3 text-sm font-black text-ink">{s.title}</h3>
                <p className="mt-1 max-w-[9rem] text-xs leading-relaxed text-ink-muted">{s.desc}</p>
              </motion.div>

              {i < STEPS.length - 1 && (
                <ChevronRight size={16} className="mt-5 hidden shrink-0 text-forest-100 sm:block" />
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
