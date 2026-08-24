import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Users, DollarSign, Clock } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `About Us | ${BRAND.name}`,
  description: `${BRAND.name} works for the property owner, not the insurance company. Learn who we are and how we fight for fair settlements.`,
}

// TODO: confirm the full team roster — only David is confirmed so far
// (src/lib/brand.ts founders). Add real bios once provided; don't assume
// Country Public Adjusters' other founders carried over to Northstar.
const TEAM = [
  {
    initial: 'D',
    name: 'David',
    title: 'Founder',
    body: 'David leads Northstar Public Adjusting with a focus on maximizing settlements and making sure every client is treated like a person, not a case number.',
  },
]

const STATS = [
  { num: BRAND.stats.avgIncreasePct, label: 'Avg. Settlement Increase' },
  { num: BRAND.stats.yearsExperience, label: 'Combined Experience' },
  { num: BRAND.stats.recoveredTotal, label: 'Recovered For Clients' },
  { num: '$0', label: 'Upfront Cost — Ever' },
]

const VALUES = [
  {
    icon: Shield,
    title: 'We work for you — not the insurance company',
    body: "The insurer's adjuster works to protect their bottom line. We exist to protect yours.",
  },
  {
    icon: Users,
    title: 'Founders handle every claim personally',
    body: 'Your case never gets handed off to a junior or a pipeline. A partner is on it from day one.',
  },
  {
    icon: DollarSign,
    title: 'No win, no fee — ever',
    body: "We are 100% contingency. If we don't get you more, you owe us nothing.",
  },
  {
    icon: Clock,
    title: 'Transparent at every step',
    body: 'We communicate every update, every development — because you deserve to know exactly where your claim stands.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>We built this firm so property owners never stand alone.</>}
        subtitle="One mission: get you paid what your policy truly owes."
      />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-container gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-[8px] border border-forest-100 bg-white p-5 text-center shadow-card">
              <div className="text-2xl font-black text-forest-500">{s.num}</div>
              <div className="mt-1 text-xs font-semibold text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-ink">
          <span className="eyebrow">How We Started</span>
          <h2 className="font-display mt-2 text-3xl font-black leading-tight text-ink">
            One shared purpose.
          </h2>
          <p className="pt-2">
            At {BRAND.name}, we bring real expertise in insurance claim advocacy to every property owner we
            represent. When a storm hits your property — hail on your roof, wind damage to your structure,
            flooding in your basement — we&apos;re the team that stands between you and an insurance company
            already working against you.
          </p>
          <p>
            We know this process is never just about the money. Our clients need a steady hand during one of
            the most stressful experiences of their lives, which is why we bring both expert claim guidance
            and genuine, patient support.
          </p>
          <p>
            We don&apos;t just handle your claim and disappear — we stand by our clients before the storm,
            during the claim, and long after the settlement check clears.
          </p>
          <blockquote className="rounded-[8px] border-l-4 border-forest-500 bg-white px-6 py-5 text-base font-semibold italic text-ink shadow-card">
            &ldquo;We communicate every update, every step of the way — because you deserve to know exactly
            where your claim stands.&rdquo;
          </blockquote>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-container">
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center">The Team</span>
            <h2 className="font-display mt-3 text-3xl font-black text-ink">
              Every claim, handled personally.
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Every claim is handled personally by a founder — not passed to a junior or sales pipeline.
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-[8px] border border-forest-100 bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-forest-500 text-lg font-black text-white">
                    {m.initial}
                  </span>
                  <div>
                    <h3 className="text-base font-black text-ink">{m.name}</h3>
                    <div className="text-xs font-bold uppercase tracking-wide text-forest-500">{m.title}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-forest-100/60 bg-[#f4f1e9] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-container">
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center">How We Operate</span>
            <h2 className="font-display mt-3 text-3xl font-black text-ink">What you can expect from us</h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-[8px] border border-forest-100 bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-forest-100 text-forest-500">
                  <v.icon size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-black leading-snug text-ink">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center lg:px-6">
        <h2 className="font-display text-3xl font-black text-ink">Ready to find out what your claim is worth?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          No upfront cost. No commitment. A founder will personally review your claim.
        </p>
        <Link
          href="/#inspection-form"
          className="mt-6 inline-flex items-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
        >
          Get Free Inspection
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  )
}
