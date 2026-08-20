'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, Mail, MapPin, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = ['Contact', 'Claim Details', 'Review']

export default function InspectionForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyAddress: '',
    damageType: '',
  })

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    setSubmitted(true)
    // Wired to the same lead-routing pattern as the old site's /api/website-form.
    // Swap in real submit handling once the backend route exists in this project.
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
          <div className="mb-5">
            <h3 className="mx-auto max-w-[15rem] text-center text-lg font-black leading-tight text-ink">
              Start Your Free Property Inspection
            </h3>
            <div className="mt-3 flex items-center gap-2">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-200',
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
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {step === 0 && (
                <>
                  <Field icon={<User size={15} />} placeholder="Full Name" value={form.fullName} onChange={update('fullName')} />
                  <Field icon={<Phone size={15} />} placeholder="Phone Number" value={form.phone} onChange={update('phone')} />
                  <Field icon={<Mail size={15} />} placeholder="Email Address" value={form.email} onChange={update('email')} />
                  <Field icon={<MapPin size={15} />} placeholder="Property Address" value={form.propertyAddress} onChange={update('propertyAddress')} />
                </>
              )}
              {step === 1 && (
                <Field icon={<User size={15} />} placeholder="What type of damage? (storm, water, fire...)" value={form.damageType} onChange={update('damageType')} />
              )}
              {step === 2 && (
                <div className="space-y-2 rounded-xl bg-forest-50 p-4 text-sm text-ink">
                  <p><span className="text-ink-muted">Name:</span> {form.fullName || '—'}</p>
                  <p><span className="text-ink-muted">Phone:</span> {form.phone || '—'}</p>
                  <p><span className="text-ink-muted">Email:</span> {form.email || '—'}</p>
                  <p><span className="text-ink-muted">Address:</span> {form.propertyAddress || '—'}</p>
                  <p><span className="text-ink-muted">Damage:</span> {form.damageType || '—'}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={back}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest-100 text-forest-600 transition-colors hover:bg-forest-50"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <button
              onClick={step === STEPS.length - 1 ? submit : next}
              className="flex flex-1 items-center justify-center gap-3 rounded-[7px] bg-forest-500 px-4 py-3.5 text-xs font-extrabold text-white transition-colors duration-150 hover:bg-forest-600"
            >
              {step === STEPS.length - 1 ? 'Submit' : 'Next Step'}
              <ArrowRight size={15} />
            </button>
          </div>
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
