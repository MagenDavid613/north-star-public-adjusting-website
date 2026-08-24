import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `SMS Consent Policy | ${BRAND.name}`,
  description: `SMS verbal consent policy for ${BRAND.name}. Learn how we collect, record, and honor SMS consent for claim-related communications.`,
}

export default function SMSConsentPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="SMS Verbal Consent Policy" subtitle="Effective Date: TBD · Last Updated: TBD" />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-ink [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:text-forest-600 [&_blockquote]:rounded-[8px] [&_blockquote]:border [&_blockquote]:border-forest-100 [&_blockquote]:bg-[#f4f1e9] [&_blockquote]:p-4 [&_blockquote]:italic">
          <h2>1. Business Name</h2>
          <p>
            {BRAND.name}<br />
            DBA: {BRAND.shortName}
          </p>

          <h2>2. Messaging Use Case</h2>
          <p>{BRAND.name} uses SMS messages for customer care and claim-related communication only.</p>
          <p>Messages may include:</p>
          <ul>
            <li>Appointment confirmations</li>
            <li>Inspection scheduling updates</li>
            <li>Document requests</li>
            <li>Claim status updates</li>
            <li>Responses to customer questions</li>
            <li>Follow-up communication related to an active or potential insurance claim</li>
          </ul>
          <p>{BRAND.name} does not use SMS messages for cold outreach, purchased lead lists, spam, or mass marketing campaigns.</p>
          <p>SMS messages are sent only to customers, potential customers, or referral partners who have given permission to receive text messages.</p>

          <h2>3. Opt-In Type</h2>
          <p><strong>Verbal Opt-In</strong></p>
          <p>Consent is collected verbally during a phone call, in-person intake, onboarding call, or claim intake conversation.</p>

          <h2>4. Full Verbal Consent Script</h2>
          <p>When speaking with a customer, potential customer, or referral partner, our staff uses the following script before sending any SMS messages:</p>
          <blockquote>
            &ldquo;Would you like to receive text messages from {BRAND.name} at this mobile number regarding
            your claim or inquiry? These messages may include appointment confirmations, claim status
            updates, document requests, and responses to your questions. Message and data rates may apply.
            You can reply STOP at any time to opt out. Do we have your permission to send you these text
            messages?&rdquo;
          </blockquote>
          <p>If the customer says <strong>yes</strong>, our staff records the consent in the customer&apos;s CRM profile.</p>
          <p>If the customer says <strong>no</strong>, our staff marks SMS consent as <em>No</em> and no SMS messages are sent.</p>

          <h2>5. How Consent Is Recorded</h2>
          <p>When verbal SMS consent is received, our team records the consent in the customer&apos;s CRM contact profile.</p>
          <p>The following information is stored:</p>
          <ul>
            <li><strong>SMS Consent:</strong> Yes</li>
            <li><strong>Consent Date:</strong> Date when consent was received</li>
            <li><strong>Consent Source:</strong> Phone call or in-person intake</li>
            <li><strong>Phone Number:</strong> Mobile number approved by the customer for SMS communication</li>
          </ul>

          <h2>6. STOP Opt-Out Handling</h2>
          <p>Customers can opt out of SMS messages at any time by replying <strong>STOP</strong>.</p>
          <p>When a customer replies STOP, SMS messaging to that customer is stopped, unless they provide new consent in the future.</p>
          <ul>
            <li>Update SMS Consent to <em>No</em></li>
            <li>Stop all SMS communication to that phone number</li>
            <li>Use phone calls or email for future communication unless the customer gives new SMS consent</li>
          </ul>

          <h2>7. Internal Compliance Statement</h2>
          <p>
            {BRAND.name} sends SMS messages only to individuals who have provided consent. Consent is
            documented in the customer&apos;s CRM profile and opt-out requests are honored immediately.
          </p>

          <p className="mt-8 border-t border-forest-100 pt-6 text-xs text-ink-muted">
            <a href="/privacy" className="mr-4">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </p>
        </div>
      </section>
    </>
  )
}
