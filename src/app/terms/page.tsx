import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND.name}`,
  description: `Terms of Service for ${BRAND.name}. Understand your rights and our obligations when you engage our public adjuster services.`,
}

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Effective Date: TBD · Last Updated: TBD" />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-ink [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:text-forest-600">
          <p>
            Please read these Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) carefully before using the
            website or services of {BRAND.name} (&ldquo;<strong>Company</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;,
            &ldquo;<strong>us</strong>&rdquo;, or &ldquo;<strong>our</strong>&rdquo;). By accessing our website or
            engaging our services, you agree to be bound by these Terms.
          </p>

          <h2>1. Services</h2>
          <p>
            {/* TODO: confirm actual licensed operating state(s) before publishing */}
            {BRAND.name} is a public adjusting firm representing property owners — not insurance companies —
            in the preparation, documentation, and negotiation of insurance claims for property damage.
          </p>
          <p>
            Our services include claim assessment, documentation, policy review, and negotiation with your
            insurance carrier on your behalf. We are not attorneys and do not provide legal advice.
          </p>

          <h2>2. No Guarantee of Outcomes</h2>
          <p>
            We make no guarantee, warranty, or representation regarding the outcome of any insurance claim,
            including any specific settlement amount, timeline, or coverage determination. Past results
            referenced on our website are provided for informational purposes only and are not indicative of
            future outcomes.
          </p>

          <h2>3. Contingency Fee Basis</h2>
          <p>
            Our services are provided on a contingency-fee basis. Our fee is a percentage of the settlement
            recovered on your behalf. No fee is earned unless we recover funds for you. The specific fee
            percentage will be set out in your signed public adjuster agreement.
          </p>

          <h2>4. Client Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information about your property, damage, and insurance policy;</li>
            <li>Cooperate with our team and your insurance carrier throughout the claims process;</li>
            <li>Notify us promptly of any communications you receive from your insurance carrier;</li>
            <li>Take reasonable steps to protect your property from further damage after a loss event.</li>
          </ul>

          <h2>5. Communications and SMS</h2>
          <p>
            By providing your phone number and consenting to SMS communications, you agree to receive text
            messages from {BRAND.name} regarding your claim, appointments, and related matters. Message and
            data rates may apply. Reply <strong>STOP</strong> at any time to opt out. See our{' '}
            <a href="/sms-consent">SMS Consent Policy</a> for full details.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and design — is the property of{' '}
            {BRAND.name} and may not be reproduced, distributed, or used without our express written permission.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {BRAND.name} shall not be liable for any indirect,
            incidental, consequential, or punitive damages arising from your use of our website or services,
            or from any decision made by your insurance carrier.
          </p>
          <p>
            Our total liability to you for any claim arising out of these Terms or our services shall not
            exceed the fees actually paid by you to us.
          </p>

          <h2>8. Disclaimer</h2>
          <p>
            Our website is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We
            do not warrant that the website will be uninterrupted, error-free, or free of harmful components.
          </p>

          <h2>9. Governing Law</h2>
          {/* TODO: confirm actual governing-law jurisdiction before publishing */}
          <p>These Terms are governed by the laws of the state in which {BRAND.name} is registered to do business.</p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Changes will be posted on this page with
            an updated effective date.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have questions about these Terms, please contact us:</p>
          <p>
            <strong>{BRAND.name}</strong><br />
            Address to be confirmed<br />
            Phone: <a href={BRAND.phone.href}>{BRAND.phone.display}</a><br />
            Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
        </div>
      </section>
    </>
  )
}
