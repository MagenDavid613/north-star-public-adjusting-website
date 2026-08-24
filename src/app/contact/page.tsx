import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Clock, MessageCircle, Bot, ArrowRight, MapPin } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Contact Us | ${BRAND.name}`,
  description: `Start your free claim review online, call ${BRAND.name} directly, or chat with our team.`,
}

const CONTACT_CARDS = [
  {
    icon: MessageCircle,
    title: 'Start claim intake online',
    body: 'Answer a few short questions. We review your details and call you prepared and ready to help. Takes under 3 minutes.',
    action: { label: 'Start Free Inspection', href: '/#inspection-form' },
    featured: true,
  },
  {
    icon: Phone,
    title: 'Call us directly',
    body: 'Talk to a real team member. For urgent or emergency situations — call now.',
    action: { label: BRAND.phone.display, href: BRAND.phone.href },
    featured: false,
  },
  {
    icon: Mail,
    title: 'Email us',
    body: 'For non-urgent inquiries, document sharing, or follow-up on an existing claim.',
    action: { label: BRAND.email, href: `mailto:${BRAND.email}` },
    featured: false,
  },
  {
    icon: Bot,
    title: 'After hours?',
    body: 'Start the claim intake now. Our AI assistant captures your details and we respond first thing in the morning.',
    action: null,
    sub: 'Office hours: Mon–Fri 8am–6pm', // TODO: confirm real hours
    featured: false,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch"
        subtitle="Start your free claim review online, call us directly, or chat with our team. We respond quickly — because timing matters."
      />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            {CONTACT_CARDS.map((card) => (
              <div
                key={card.title}
                className={`rounded-[8px] border p-6 shadow-card ${
                  card.featured ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white'
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-[6px] ${
                    card.featured ? 'bg-forest-500 text-white' : 'border border-forest-100 text-forest-500'
                  }`}
                >
                  <card.icon size={18} />
                </span>
                <h2 className="mt-4 text-base font-black leading-snug text-ink">{card.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{card.body}</p>

                {card.action && (
                  card.action.href.startsWith('/') ? (
                    <Link
                      href={card.action.href}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-[7px] bg-forest-500 px-4 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-forest-600"
                    >
                      {card.action.label}
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <a href={card.action.href} className="mt-4 inline-block text-sm font-bold text-forest-600 hover:text-forest-500">
                      {card.action.label}
                    </a>
                  )
                )}

                {card.sub && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                    <Clock size={12} />
                    {card.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* TODO: confirm real office address before publishing */}
          <div className="flex items-start gap-4 rounded-[8px] border border-forest-100 bg-[#f4f1e9] px-6 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-forest-100 bg-white text-forest-500">
              <MapPin size={16} />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Office Address</p>
              <p className="text-sm text-ink-muted">Address to be confirmed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
