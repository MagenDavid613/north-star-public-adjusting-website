import { BRAND } from '@/lib/brand'

export const SMS_CARE_TEXT = `I agree to receive informational text messages from ${BRAND.smsName} at the number provided about my claim or inquiry, including appointment confirmations, scheduling updates, document requests, and claim status updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase.`

interface Props {
  care: boolean
  onCareChange: (checked: boolean) => void
  className?: string
}

// One separate, unchecked-by-default, optional SMS consent box. Informational
// only — no promotional/marketing consent. Not bundled with Terms or Privacy
// and does not gate form submission.
export default function SmsConsentFields({ care, onCareChange, className = '' }: Props) {
  const box = 'flex items-start gap-2.5 rounded-[6px] bg-forest-50 p-3 text-[11px] leading-relaxed text-ink-muted'
  const input = 'mt-0.5 h-4 w-4 shrink-0 accent-forest-500'
  return (
    <div className={`space-y-2 ${className}`}>
      <label className={box}>
        <input type="checkbox" name="smsCareConsent" checked={care} onChange={(e) => onCareChange(e.target.checked)} className={input} />
        <span>{SMS_CARE_TEXT}</span>
      </label>
      <p className="px-1 text-[11px] leading-relaxed text-ink-muted">
        See our{' '}
        <a href="/terms" className="font-semibold text-forest-600 underline">Terms of Service</a>,{' '}
        <a href="/privacy" className="font-semibold text-forest-600 underline">Privacy Policy</a>, and{' '}
        <a href="/sms-consent" className="font-semibold text-forest-600 underline">SMS Consent Policy</a>.
      </p>
    </div>
  )
}
