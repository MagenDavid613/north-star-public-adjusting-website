'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function DamageInfoSection({
  title,
  whatItLooks,
  whatInsurersUndervalue,
}: {
  title: string
  whatItLooks: string[]
  whatInsurersUndervalue: string[]
}) {
  return (
    <section className="px-4 py-16 lg:px-6">
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        <div className="rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-forest-100 bg-white text-forest-500">
              <Check size={16} />
            </span>
            <h2 className="text-base font-black leading-tight text-ink">What {title.toLowerCase()} look like</h2>
          </div>
          <ul className="space-y-2.5">
            {whatItLooks.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-[6px] border border-forest-100 bg-white px-4 py-2.5 text-sm text-ink-muted"
              >
                <Check size={13} className="mt-0.5 shrink-0 text-forest-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-red-200 bg-white text-red-400">
              <X size={16} />
            </span>
            <h2 className="text-base font-black leading-tight text-ink">What insurers routinely undervalue</h2>
          </div>
          <ul className="space-y-2.5">
            {whatInsurersUndervalue.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-[6px] border border-forest-100 bg-white px-4 py-2.5 text-sm text-ink-muted"
              >
                <X size={13} className="mt-0.5 shrink-0 text-red-400" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
