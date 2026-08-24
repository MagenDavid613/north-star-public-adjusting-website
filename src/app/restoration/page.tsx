import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Phone, ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Restoration Company Partners | ${BRAND.name}`,
  description: `${BRAND.name} partners with restoration companies. We document full damage scopes so restoration teams get approved for the work the property actually needs.`,
}

const PROBLEMS = [
  'Insurance scopes that miss affected materials entirely',
  "Drying and remediation limits that don't match actual conditions",
  'Denied supplemental claims when mid-project damage is discovered',
  "Low line-item pricing that doesn't reflect real restoration costs",
  'Scope disputes that delay project start and payment',
]

const BENEFITS = [
  'Full damage documentation before any work begins — supporting your full scope',
  'Supplemental claims filed when insurers cut your approved scope mid-project',
  'Faster insurer approvals backed by professional adjuster documentation',
  'We refer settled clients who need quality restoration work',
  'No cost to your client — we work on contingency',
  'Experience across water, fire, smoke, mold, and storm restoration claims',
]

const SCENARIOS = [
  {
    title: 'Water & Mold Restoration',
    body: 'Insurers frequently dispute drying scopes, limit affected materials, or deny mold remediation entirely. We document moisture intrusion, affected structural components, and mold propagation properly — so your full remediation scope gets approved.',
  },
  {
    title: 'Fire & Smoke Restoration',
    body: 'Smoke travels further than any visible burn damage. HVAC contamination, soot migration, and odor remediation throughout the full structure are routinely underdocumented. We capture everything your restoration team needs to do the job right.',
  },
  {
    title: 'Storm & Wind Restoration',
    body: 'High-volume storm events mean insurers deploy streamlined inspection strategies designed to minimize scope. We counter that with thorough documentation of every damaged surface, component, and structural element — so your estimate reflects reality.',
  },
  {
    title: 'Structural & Rebuild',
    body: 'Code upgrade requirements, load-bearing component damage, and secondary structural failures are common points of dispute. We bring in the documentation needed to support full rebuild scopes including code-mandated upgrades triggered by the damage.',
  },
]

export default function RestorationPage() {
  return (
    <>
      <PageHero
        eyebrow="Restoration Partners"
        title={<>Get paid for the <span className="text-forest-500">full scope of your work</span></>}
        subtitle={`Insurance companies routinely underscope restoration projects. We fix that. ${BRAND.name} documents every inch of damage before your team goes in — so your estimate gets approved, not argued over.`}
      />

      <div className="flex flex-col items-center gap-3 px-4 pb-4 pt-8 sm:flex-row sm:justify-center">
        <Link
          href="/partners"
          className="flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
        >
          View All Partner Types
          <ArrowRight size={16} />
        </Link>
        <a
          href={BRAND.phone.href}
          className="flex items-center justify-center gap-2 rounded-[7px] border border-forest-100 bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-forest-50"
        >
          <Phone size={16} /> {BRAND.phone.display}
        </a>
      </div>

      <section className="bg-forest-900 px-4 py-16 text-white lg:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold">The gap that costs restoration companies</h2>
            <ul className="space-y-2.5">
              {PROBLEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="mt-0.5 shrink-0 font-bold text-red-400">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">What partnering with us changes</h2>
            <ul className="space-y-2.5">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                  <Check size={14} className="mt-0.5 shrink-0 text-forest-100" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-black text-ink">Restoration Types We Support</h2>
            <p className="mt-2 text-sm text-ink-muted">We&apos;ve documented claims across every major restoration category.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {SCENARIOS.map((s) => (
              <div key={s.title} className="rounded-[8px] border border-forest-100 bg-white p-6 shadow-card">
                <h3 className="text-base font-black text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 px-4 py-16 text-center text-white lg:px-6">
        <div className="mx-auto max-w-2xl">
          <span className="eyebrow justify-center text-white/60">How It Works</span>
          <h2 className="font-display mt-3 text-3xl font-black">Simple mutual referral relationship</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            We refer property owners who need quality restoration work. You refer clients with damage claims
            that need professional advocacy. Both businesses grow — and the property owner gets a better
            outcome on both the claim and the repair.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={BRAND.phone.href}
              className="flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-400"
            >
              <Phone size={16} /> Call to Discuss
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center justify-center gap-2 rounded-[7px] border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              {BRAND.email}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
