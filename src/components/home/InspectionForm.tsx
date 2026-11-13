'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin, ChevronDown, ArrowRight, Check } from 'lucide-react'
import SmsConsentFields from '@/components/shared/SmsConsentFields'

const DAMAGE_TYPE_OPTIONS = [
  { value: '', label: 'What type of damage?' },
  { value: 'roof', label: 'Roof Damage' },
  { value: 'wind', label: 'Wind Damage' },
  { value: 'hail', label: 'Hail Damage' },
  { value: 'hurricane', label: 'Hurricane / Storm' },
  { value: 'water', label: 'Water / Flooding' },
  { value: 'fire', label: 'Fire / Smoke' },
  { value: 'mold', label: 'Mold Damage' },
  { value: 'structural', label: 'Structural Damage' },
  { value: 'lightning', label: 'Lightning Damage' },
  { value: 'theft-vandalism', label: 'Theft / Vandalism' },
  { value: 'other', label: 'Other / Not Sure' },
]

export default function InspectionForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyAddress: '',
    damageType: '',
  })
  const [consent, setConsent] = useState(false)
  const [consentTimestamp, setConsentTimestamp] = useState<string | null>(null)

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const updateConsent = (checked: boolean) => {
    setConsent(checked)
    setConsentTimestamp(checked ? new Date().toISOString() : null)
  }

  const formValid = form.fullName && form.phone.length >= 10 && form.email.includes('@') && form.propertyAddress

  const submit = async () => {
    if (!formValid) return
    setSubmitted(true)

    try {
      await fetch('/api/website-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceWidget: 'Hero Inspection Form',
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          propertyAddress: form.propertyAddress,
          damageTypes: form.damageType,
          consent,
          consentTimestamp,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      })
    } catch (err) {
      // Never block the visitor's "you're all set" confirmation on this.
      console.error('Failed to submit lead:', err)
    }
  }

  return (
    <motion.div
      id="inspection-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="w-[calc(100vw-2rem)] max-w-[24.5rem] rounded-[8px] border border-forest-100/70 bg-white/92 p-6 shadow-floating backdrop-blur"
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-500">
            <Check size={22} />
          </span>
          <h3 className="text-lg font-bold text-ink">You&apos;re all set.</h3>
          <p className="text-sm text-ink-muted">A member of the team will reach out shortly to schedule your free inspection.</p>
        </div>
      ) : (
        <>
          <h3 className="mb-4 text-center text-lg font-black leading-tight text-ink">
            Start Your Free Property Inspection
          </h3>

          <div className="space-y-2.5">
            <Field icon={<User size={15} />} placeholder="Full Name" value={form.fullName} onChange={update('fullName')} />
            <Field icon={<Phone size={15} />} placeholder="Phone Number" value={form.phone} onChange={update('phone')} />
            <Field icon={<Mail size={15} />} placeholder="Email Address" value={form.email} onChange={update('email')} />
            <Field icon={<MapPin size={15} />} placeholder="Property Address" value={form.propertyAddress} onChange={update('propertyAddress')} />
            <SelectField value={form.damageType} onChange={update('damageType')} options={DAMAGE_TYPE_OPTIONS} />
            <SmsConsentFields care={consent} onCareChange={updateConsent} />
          </div>

          <button
            onClick={submit}
            disabled={!formValid}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-4 py-3.5 text-xs font-extrabold text-white transition-colors duration-150 hover:bg-forest-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Get My Free Inspection
            <ArrowRight size={15} />
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white">
            100% Secure &amp; Confidential
          </p>
        </>
      )}
    </motion.div>
  )
}

function Field({
  icon,
  ...props
}: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2.5 rounded-[6px] border border-forest-100 bg-[#f9f8f4] px-4 py-3 transition-colors focus-within:border-forest-400">
      <span className="text-forest-400">{icon}</span>
      <input {...props} className="w-full bg-transparent text-sm text-ink placeholder-ink-muted focus:outline-none" />
    </div>
  )
}

function SelectField({
  options,
  ...props
}: { options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative flex items-center gap-2.5 rounded-[6px] border border-forest-100 bg-[#f9f8f4] px-4 py-3 transition-colors focus-within:border-forest-400">
      <select
        {...props}
        className="w-full appearance-none bg-transparent text-sm text-ink focus:outline-none [&:has(option:checked:first-child)]:text-ink-muted"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-4 text-forest-400" />
    </div>
  )
}
