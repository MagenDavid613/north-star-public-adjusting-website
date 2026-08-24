'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id} className="overflow-hidden rounded-[8px] border border-forest-100 bg-white">
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-ink">{item.question}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-forest-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
