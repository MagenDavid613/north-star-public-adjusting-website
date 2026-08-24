import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
}) {
  return (
    <section className="border-b border-forest-100/70 bg-[#fffdf8] px-4 py-14 text-center lg:px-6 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <span className="eyebrow justify-center">{eyebrow}</span>
        <h1 className="font-display mt-3 text-[2.6rem] font-black leading-[0.98] text-ink sm:text-[3.1rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-muted">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
