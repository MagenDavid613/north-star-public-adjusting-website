import type { Metadata } from 'next'
import { Hammer, Building2, Home, Users, Shield, Wrench, Phone, Check } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Partners | ${BRAND.name}`,
  description: `Partner with ${BRAND.name}. We work with contractors, restoration companies, property managers, realtors, and more.`,
}

const PARTNER_TYPES = [
  {
    icon: Hammer,
    title: 'Contractors & Builders',
    body: 'Your clients need to get paid before you can get fully paid. Insurance companies routinely underscope repair projects, leaving contractors underpaid or fighting for supplemental approvals. When you partner with us, we document every inch of damage before a single tool goes on site — full scopes, approved faster, fewer disputes.',
    benefits: ['Documented scopes that support your full estimate', 'Supplemental claims when insurers cut your approved scope', 'Faster insurer approvals backed by professional documentation', 'Referrals from our settled clients who need quality contractors'],
  },
  {
    icon: Wrench,
    title: 'Restoration Companies',
    body: 'The gap between what insurance approves and what the damage actually requires is where restoration companies lose money. We document moisture intrusion, smoke migration, mold propagation, and structural damage properly — so your full remediation scope gets approved, not argued over.',
    benefits: ['Pre-work documentation that supports your full remediation scope', 'Supplemental claims filed when mid-project damage is discovered', 'Coverage for water, fire, smoke, mold, and structural restoration', 'Mutual referral relationship — we send you clients, you send us claims'],
  },
  {
    icon: Building2,
    title: 'Property Managers',
    body: "When managed properties take damage, you're caught between anxious tenants, frustrated owners, and a slow insurance process. We step in as the claim expert — handling every interaction with the insurer so you can focus on operations.",
    benefits: ['Single point of contact for the entire insurance claim', 'We coordinate directly with the insurer on your behalf', 'Regular progress updates so property owners stay informed', 'Commercial and multi-unit claim experience'],
  },
  {
    icon: Home,
    title: 'Realtors & Real Estate Professionals',
    body: "Property damage claims can kill deals, delay closings, or quietly reduce your client's net recovery. Whether a listing has unresolved storm damage or a buyer discovers damage during due diligence, we resolve it professionally and quickly.",
    benefits: ['Free claim evaluation at any stage of the transaction', 'Rapid inspection turnaround to protect deal timelines', 'Pre-listing damage claim resolution', 'You stay in control — we handle the insurance side'],
  },
  {
    icon: Users,
    title: 'Multi-Family & Commercial Property Owners',
    body: 'Multi-unit and commercial claims involve multiple damage scopes, business interruption components, code compliance requirements, and coordinated insurer strategies designed to minimize payouts. Our team has handled some of the largest multi-unit and commercial settlements in our service areas.',
    benefits: ['Business interruption loss recovery', 'Code upgrade and compliance scope documentation', 'Multi-unit damage documented by individual unit', 'Commercial claim specialist assigned to your account'],
  },
  {
    icon: Shield,
    title: 'Insurance Professionals & Agents',
    body: `When your clients feel their claim is being underpaid, delayed, or denied, the relationship is at risk — even when it's not your fault. Referring them to ${BRAND.name} means they get expert advocacy without you being caught in the middle.`,
    benefits: ['Independent advocacy that protects your position', 'No conflict with your carrier relationships', 'Transparent process — you can stay informed throughout', 'Clients thank you for the referral, not blame you for the outcome'],
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Make the Introduction', body: 'Connect us with a property owner with a damage claim — a quick email or call is all it takes.' },
  { step: '02', title: 'We Take It From There', body: 'We contact them within 24 hours, conduct a free inspection, and begin documenting the claim professionally.' },
  { step: '03', title: 'Full Claim Management', body: 'We handle every insurer interaction — documentation, negotiation, supplemental claims — from start to settlement.' },
  { step: '04', title: 'Everyone Wins', body: "Your client gets the settlement they deserve. You've added real value to the relationship." },
]

const STATS: [string, string][] = [
  [BRAND.stats.avgIncreasePct, 'Average settlement increase'],
  [BRAND.stats.yearsExperience, 'Combined experience'],
  ['1,000s', 'Claims negotiated'],
  ['$0', 'Upfront cost to clients'],
]

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner Programme"
        title={<>Your clients deserve full compensation. <span className="text-forest-500">So do you.</span></>}
        subtitle={`Partner with ${BRAND.name} and add a powerful resource to your professional network — one that helps your clients win their insurance claims and rewards the relationship you've built.`}
      />

      <div className="flex flex-col items-center gap-3 px-4 pb-4 pt-8 sm:flex-row sm:justify-center">
        <a
          href={BRAND.phone.href}
          className="flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
        >
          <Phone size={16} /> Call to Discuss a Partnership
        </a>
        <a
          href={`mailto:${BRAND.email}`}
          className="flex items-center justify-center gap-2 rounded-[7px] border border-forest-100 bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-forest-50"
        >
          Email Us
        </a>
      </div>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-black text-ink">Who We Partner With</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">
              We work with professionals across construction, restoration, real estate, and property
              management who want to add genuine value to their client relationships.
            </p>
          </div>

          <div className="space-y-4">
            {PARTNER_TYPES.map((p) => (
              <div key={p.title} className="rounded-[8px] border border-forest-100 bg-white p-6 shadow-card lg:p-7">
                <div className="grid gap-6 lg:grid-cols-[1fr_260px] lg:items-start">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-forest-100 text-forest-500">
                        <p.icon size={19} />
                      </span>
                      <h3 className="text-lg font-black text-ink">{p.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                  <div className="rounded-[8px] border border-forest-100 bg-[#f4f1e9] p-5">
                    <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-forest-500">What You Get</div>
                    <ul className="space-y-2.5">
                      {p.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-ink-muted">
                          <Check size={12} className="mt-0.5 shrink-0 text-forest-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 px-4 py-16 text-white lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-black">How a Referral Works</h2>
            <p className="mt-2 text-sm text-white/60">Simple, professional, and zero friction on your end.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((h) => (
              <div key={h.step} className="rounded-[8px] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-3xl font-black leading-none text-forest-100/40">{h.step}</div>
                <h3 className="text-sm font-bold text-white">{h.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 px-4 pb-16 text-center text-white lg:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-black">Why Refer to {BRAND.shortName}?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
            Our results speak for themselves. When you refer a client to us, you&apos;re connecting them with
            a team that consistently delivers.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map(([val, label]) => (
              <div key={label} className="rounded-[8px] border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-black text-forest-100">{val}</div>
                <div className="mt-1 text-xs text-white/60">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={BRAND.phone.href}
              className="flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-400"
            >
              <Phone size={16} /> {BRAND.phone.display}
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
