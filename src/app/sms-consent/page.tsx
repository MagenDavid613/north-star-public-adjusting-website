import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'
import { SMS_CARE_TEXT } from '@/components/shared/SmsConsentFields'

export const metadata: Metadata = {
  title: `SMS Consent Policy | ${BRAND.name}`,
  description: `SMS Consent Policy for ${BRAND.legalName}. Learn how we collect, record, and honor SMS consent for informational text messages.`,
}

export default function SMSConsentPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="SMS Consent Policy" subtitle={`Effective Date: ${BRAND.legalDates.effective} · Last Updated: ${BRAND.legalDates.updated}`} />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-ink [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:text-forest-600 [&_blockquote]:rounded-[8px] [&_blockquote]:border [&_blockquote]:border-forest-100 [&_blockquote]:bg-[#f4f1e9] [&_blockquote]:p-4 [&_blockquote]:italic">
          <h2>1. Business Name</h2>
          <p>
            {BRAND.legalName}, doing business as {BRAND.smsName}.
          </p>

          <h2>2. Messaging Use Cases</h2>
          <p>{BRAND.smsName} sends informational messages only:</p>
          <ul>
            <li>Appointment confirmations</li>
            <li>Inspection scheduling</li>
            <li>Document requests</li>
            <li>Claim status updates</li>
            <li>Replies to questions and missed calls</li>
          </ul>
          <p>We do not send promotional or marketing messages. We do not text purchased lists or do cold outreach.</p>

          <h2>3. How People Opt In</h2>
          <p><strong>Web form.</strong> Through the checkbox on our website forms. The box is unchecked by default and is not required to submit the form. The exact text shown next to the checkbox is:</p>
          <blockquote>&ldquo;{SMS_CARE_TEXT}&rdquo;</blockquote>
          <p>
            Directly under it: &ldquo;See our <a href="/terms">Terms of Service</a>,{' '}
            <a href="/privacy">Privacy Policy</a>, and <a href="/sms-consent">SMS Consent Policy</a>.&rdquo;
          </p>

          <p><strong>Verbal.</strong> During a phone call or intake, our staff uses the following script before sending any SMS messages:</p>
          <blockquote>
            &ldquo;Would you like to receive text messages from {BRAND.smsName} at this mobile number regarding
            your claim or inquiry? These messages may include appointment confirmations, claim status
            updates, document requests, and responses to your questions. Message frequency varies. Message
            and data rates may apply. You can reply STOP at any time to opt out. Do we have your
            permission?&rdquo;
          </blockquote>
          <p>If the customer says <strong>yes</strong>, our staff records the consent in the customer&apos;s CRM profile.</p>
          <p>If the customer says <strong>no</strong>, our staff marks SMS consent as <em>No</em> and no SMS messages are sent.</p>

          <h2>4. How Consent Is Recorded</h2>
          <p>When verbal SMS consent is received, our team records the consent in the customer&apos;s CRM contact profile.</p>
          <p>The following information is stored:</p>
          <ul>
            <li><strong>SMS Consent:</strong> Yes</li>
            <li><strong>Consent Date:</strong> Date when consent was received</li>
            <li><strong>Consent Timestamp:</strong> Exact time consent was received</li>
            <li><strong>Consent Source:</strong> Website form checkbox, phone call, or in-person intake</li>
            <li><strong>Page URL:</strong> The page where web form consent was given</li>
            <li><strong>Phone Number:</strong> Mobile number approved by the customer for SMS communication</li>
          </ul>

          <h2>5. Message Frequency</h2>
          <p>Message frequency varies.</p>

          <h2>6. Rates</h2>
          <p>Message and data rates may apply.</p>

          <h2>7. Opt-Out and Help</h2>
          <p>
            Reply <strong>STOP</strong> at any time to opt out. Reply <strong>HELP</strong> for help, or contact
            us at <a href={BRAND.phone.href}>{BRAND.phone.display}</a> or{' '}
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
          </p>

          <h2>8. Data Sharing</h2>
          <p>
            We do not sell, rent, or share mobile phone numbers or SMS opt-in data with third parties or
            affiliates for their marketing purposes. Opt-in data is shared only with service providers that
            help us deliver messages.
          </p>

          <h2>9. Links</h2>
          <p>
            <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a>
          </p>
        </div>
      </section>
    </>
  )
}
