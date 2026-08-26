'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Shield, Home, Building, Layers, Key,
  Cloud, Wind, Droplets, Zap, Flame, AlertTriangle, HelpCircle,
  FileText, Send, TrendingDown, XCircle, Search, GitCompare,
  CheckCircle, Phone, Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'

const STEPS = ['Contact', 'Property', 'Damage', 'Location', 'Timing', 'Insurance', 'Details']

const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential Home', icon: Home, desc: 'Single-family home, townhouse, or condo' },
  { value: 'commercial', label: 'Commercial Property', icon: Building, desc: 'Business, office, warehouse, or retail' },
  { value: 'multi-unit', label: 'Multi-Unit / Apartment', icon: Layers, desc: 'Duplex, apartment complex, or multi-family' },
  { value: 'rental', label: 'Rental Property', icon: Key, desc: 'Investment or rental property you own' },
]

const DAMAGE_TYPES = [
  { value: 'hail', label: 'Hail Damage', icon: Cloud },
  { value: 'wind', label: 'Wind Damage', icon: Wind },
  { value: 'water', label: 'Water / Flooding', icon: Droplets },
  { value: 'roof', label: 'Roof Damage', icon: Home },
  { value: 'hurricane', label: 'Hurricane / Storm', icon: Zap },
  { value: 'fire', label: 'Fire / Smoke', icon: Flame },
  { value: 'structural', label: 'Structural Damage', icon: AlertTriangle },
  { value: 'other', label: 'Other / Not Sure', icon: HelpCircle },
]

const INSURANCE_STAGES = [
  { value: 'not-filed', label: "Haven't filed yet", sub: 'Damage occurred — no claim filed', icon: FileText },
  { value: 'filed', label: 'Claim filed, waiting', sub: 'Claim is open — awaiting assessment', icon: Send },
  { value: 'underpaid', label: 'Underpaid — offer received', sub: 'Received an offer that seems too low', icon: TrendingDown },
  { value: 'denied', label: 'Claim denied', sub: 'Insurance company denied the claim', icon: XCircle },
  { value: 'need-inspection', label: 'Need free inspection first', sub: 'Not sure of the extent of damage', icon: Search },
  { value: 'second-opinion', label: 'Want a second opinion', sub: "Have an offer but unsure if it's fair", icon: GitCompare },
]

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  consent: boolean
  consentTimestamp: string | null
  propertyType: string | null
  damageTypes: string[]
  address: string
  city: string
  state: string
  zip: string
  damageDate: string
  isUrgent: boolean
  urgencyDescription: string
  insuranceStage: string | null
  insurerName: string
  claimDescription: string
  claimNumber: string
}

const EMPTY_FORM: FormData = {
  firstName: '', lastName: '', phone: '', email: '', consent: false, consentTimestamp: null,
  propertyType: null, damageTypes: [],
  address: '', city: '', state: '', zip: '',
  damageDate: '', isUrgent: false, urgencyDescription: '',
  insuranceStage: null, insurerName: '',
  claimDescription: '', claimNumber: '',
}

function inputClass(hasError?: boolean) {
  return cn(
    'w-full rounded-[6px] border bg-[#f9f8f4] px-4 py-3 text-sm text-ink placeholder-ink-muted transition-colors focus:outline-none focus:border-forest-400',
    hasError ? 'border-red-300' : 'border-forest-100'
  )
}

export default function ClaimIntake() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const contactValid = form.firstName && form.lastName && form.phone.length >= 10 && form.email.includes('@') && form.consent

  const updateConsent = (checked: boolean) => {
    update('consent', checked)
    update('consentTimestamp', checked ? new Date().toISOString() : null)
  }

  const submit = () => {
    // Wired to the same lead-routing pattern as InspectionForm — swap in
    // real submit handling (e.g. /api/website-form) once that backend
    // route exists in this project.
    // `consent` + `consentTimestamp` should be stored with the lead record —
    // same idea as the CRM logging already used for verbal SMS consent — so
    // there's a record tied to this specific phone number and date.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-[8px] border border-forest-100 bg-white p-8 text-center shadow-card lg:p-10"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle size={32} />
        </span>
        <h2 className="font-display mt-5 text-2xl font-black text-ink">Your request has been received.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          A member of our team will review your details and contact you shortly. We come prepared and ready to help.
        </p>

        <div className="mx-auto mt-7 max-w-sm space-y-2.5 text-left">
          {[
            { icon: Clock, text: "We'll review your claim details", sub: 'Typically within 1–2 hours' },
            { icon: Phone, text: 'A team member will call you', sub: 'Prepared with your information' },
            { icon: CheckCircle, text: 'Free inspection scheduled', sub: 'At a time that works for you' },
          ].map((s) => (
            <div key={s.text} className="flex items-start gap-3 rounded-[6px] bg-[#f4f1e9] p-3">
              <s.icon size={16} className="mt-0.5 shrink-0 text-forest-500" />
              <div>
                <div className="text-sm font-semibold text-ink">{s.text}</div>
                <div className="text-xs text-ink-muted">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <a
          href={BRAND.phone.href}
          className="mt-7 flex items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
        >
          <Phone size={16} /> Call Now · {BRAND.phone.display}
        </a>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition-colors',
                i <= step ? 'bg-forest-500 text-white' : 'bg-forest-50 text-ink-muted'
              )}
            >
              {i + 1}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cn('h-px flex-1', i < step ? 'bg-forest-500' : 'bg-forest-100')} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[8px] border border-forest-100 bg-white p-6 shadow-card lg:p-8"
        >
          {/* Step 0 — Contact */}
          {step === 0 && (
            <>
              <h2 className="text-xl font-black text-ink">Let&apos;s start with your details</h2>
              <p className="mt-1 text-sm text-ink-muted">We&apos;ll save your spot so you can continue even if you get interrupted.</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input placeholder="First name *" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass()} />
                <input placeholder="Last name *" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass()} />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input type="tel" placeholder="Phone number *" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass()} />
                <input type="email" placeholder="Email address *" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass()} />
              </div>

              <label className="mt-4 flex items-start gap-3 rounded-[6px] bg-[#f4f1e9] p-4 text-xs leading-relaxed text-ink-muted">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-forest-500"
                />
                <span>
                  By checking this box, you agree to receive text messages from {BRAND.name} at the phone
                  number provided, including appointment confirmations, scheduling updates, claim status
                  updates, and responses to your inquiries. Message and data rates may apply. Message
                  frequency varies. Reply STOP to opt out at any time, HELP for help. Consent is not a
                  condition of purchase. See our{' '}
                  <a href="/privacy" className="font-semibold text-forest-600 underline">Privacy Policy</a> and{' '}
                  <a href="/sms-consent" className="font-semibold text-forest-600 underline">SMS Consent Policy</a>.
                </span>
              </label>

              <button
                onClick={next}
                disabled={!contactValid}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start My Claim Review
                <ArrowRight size={16} />
              </button>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-muted">
                <Shield size={12} className="text-forest-500" />
                No upfront cost · No commitment · Licensed professionals
              </div>
            </>
          )}

          {/* Step 1 — Property Type */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-black text-ink">What type of property was damaged?</h2>
              <p className="mt-1 text-sm text-ink-muted">This helps us route your claim to the right specialist.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => { update('propertyType', type.value); setTimeout(next, 250) }}
                    className={cn(
                      'flex items-start gap-3 rounded-[6px] border p-4 text-left transition-colors',
                      form.propertyType === type.value ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white hover:bg-forest-50/50'
                    )}
                  >
                    <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px]', form.propertyType === type.value ? 'bg-forest-500 text-white' : 'border border-forest-100 text-forest-500')}>
                      <type.icon size={18} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{type.label}</div>
                      <div className="mt-0.5 text-xs text-ink-muted">{type.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 2 — Damage Type */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-black text-ink">What type of damage occurred?</h2>
              <p className="mt-1 text-sm text-ink-muted">Select all that apply. You can choose more than one.</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {DAMAGE_TYPES.map((type) => {
                  const isSelected = form.damageTypes.includes(type.value)
                  return (
                    <button
                      key={type.value}
                      onClick={() => update('damageTypes', isSelected ? form.damageTypes.filter((v) => v !== type.value) : [...form.damageTypes, type.value])}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-[6px] border p-4 text-center transition-colors',
                        isSelected ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white hover:bg-forest-50/50'
                      )}
                    >
                      <span className={cn('flex h-9 w-9 items-center justify-center rounded-[6px]', isSelected ? 'bg-forest-500 text-white' : 'border border-forest-100 text-forest-500')}>
                        <type.icon size={16} />
                      </span>
                      <span className="text-xs font-semibold leading-tight text-ink">{type.label}</span>
                    </button>
                  )
                })}
              </div>
              <button
                onClick={next}
                disabled={form.damageTypes.length === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* Step 3 — Location */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-black text-ink">Where is the property located?</h2>
              <p className="mt-1 text-sm text-ink-muted">We&apos;ll confirm coverage for your specific area.</p>
              <div className="mt-6 space-y-3">
                <input placeholder="Street address (optional)" value={form.address} onChange={(e) => update('address', e.target.value)} className={inputClass()} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <input placeholder="City *" value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass()} />
                  <input placeholder="State *" value={form.state} onChange={(e) => update('state', e.target.value)} className={inputClass()} />
                  <input placeholder="ZIP *" value={form.zip} onChange={(e) => update('zip', e.target.value)} className={inputClass()} />
                </div>
              </div>
              <button
                onClick={next}
                disabled={!form.city || !form.state || form.zip.length < 5}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* Step 4 — Timing */}
          {step === 4 && (
            <>
              <h2 className="text-xl font-black text-ink">When did the damage happen?</h2>
              <p className="mt-1 text-sm text-ink-muted">An approximate date is fine.</p>
              <div className="mt-6 space-y-3">
                <input type="date" value={form.damageDate} onChange={(e) => update('damageDate', e.target.value)} className={inputClass()} />
                <label className="flex items-start gap-3 rounded-[6px] bg-[#f4f1e9] p-4 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.isUrgent}
                    onChange={(e) => update('isUrgent', e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-forest-500"
                  />
                  This is urgent — active leak, structural risk, or safety concern
                </label>
                {form.isUrgent && (
                  <textarea
                    placeholder="Briefly describe the urgent situation"
                    value={form.urgencyDescription}
                    onChange={(e) => update('urgencyDescription', e.target.value)}
                    rows={3}
                    className={inputClass()}
                  />
                )}
              </div>
              <button
                onClick={next}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* Step 5 — Insurance Stage */}
          {step === 5 && (
            <>
              <h2 className="text-xl font-black text-ink">Where are you in the claim process?</h2>
              <p className="mt-1 text-sm text-ink-muted">We help at every stage — before, during, and after filing.</p>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {INSURANCE_STAGES.map((stage) => (
                  <button
                    key={stage.value}
                    onClick={() => { update('insuranceStage', stage.value); setTimeout(next, 250) }}
                    className={cn(
                      'flex items-start gap-3 rounded-[6px] border p-3.5 text-left transition-colors',
                      form.insuranceStage === stage.value ? 'border-forest-500 bg-forest-50' : 'border-forest-100 bg-white hover:bg-forest-50/50'
                    )}
                  >
                    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px]', form.insuranceStage === stage.value ? 'bg-forest-500 text-white' : 'border border-forest-100 text-forest-500')}>
                      <stage.icon size={16} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{stage.label}</div>
                      <div className="mt-0.5 text-xs text-ink-muted">{stage.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-5 border-t border-forest-100 pt-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Insurance company name (optional)
                </label>
                <input placeholder="e.g. State Farm, Allstate, Citizens..." value={form.insurerName} onChange={(e) => update('insurerName', e.target.value)} className={inputClass()} />
              </div>
            </>
          )}

          {/* Step 6 — Claim Details */}
          {step === 6 && (
            <>
              <h2 className="text-xl font-black text-ink">Anything else we should know?</h2>
              <p className="mt-1 text-sm text-ink-muted">Optional, but it helps us prepare before we call.</p>
              <div className="mt-6 space-y-3">
                <textarea
                  placeholder="Briefly describe what happened"
                  value={form.claimDescription}
                  onChange={(e) => update('claimDescription', e.target.value)}
                  rows={4}
                  className={inputClass()}
                />
                <input placeholder="Claim number (optional)" value={form.claimNumber} onChange={(e) => update('claimNumber', e.target.value)} className={inputClass()} />
              </div>
              <button
                onClick={submit}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[7px] bg-forest-500 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-forest-600"
              >
                Submit My Claim Review
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <div className="mt-4 text-center">
          <button onClick={back} className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      )}
    </div>
  )
}
