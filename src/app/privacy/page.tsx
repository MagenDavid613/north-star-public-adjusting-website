import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
  description: `Privacy Policy for ${BRAND.name}. Learn how we collect, use, and protect your personal information.`,
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Effective Date: TBD · Last Updated: TBD" />

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-ink [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:text-forest-600">
          <p>
            {/* TODO: confirm legal entity name/type (LLC, Inc., etc.) before publishing */}
            {BRAND.name} (&ldquo;<strong>Company</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;,
            &ldquo;<strong>us</strong>&rdquo;, or &ldquo;<strong>our</strong>&rdquo;) is committed to protecting
            the privacy of our clients and website visitors. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website or engage our services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following categories of personal information:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
            <li><strong>Property Information:</strong> Property address, type of damage, insurance carrier, and policy details you provide.</li>
            <li><strong>Communication Records:</strong> Records of phone calls, emails, chat messages, and SMS exchanges with our team.</li>
            <li><strong>Usage Data:</strong> Pages visited, time on site, browser type, and IP address collected automatically via cookies and analytics tools.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide public adjuster services and manage your insurance claim;</li>
            <li>Contact you regarding your claim, inspection, or inquiry;</li>
            <li>Send appointment confirmations, claim status updates, and document requests via phone, email, or SMS (with your consent);</li>
            <li>Improve our website and services;</li>
            <li>Comply with applicable laws and regulations.</li>
          </ul>

          <h2>3. SMS Communications</h2>
          <p>
            We send SMS messages only to individuals who have provided explicit consent. Consent is obtained
            verbally during a phone call or in-person intake. You may opt out at any time by replying{' '}
            <strong>STOP</strong> to any text message. Message and data rates may apply.
          </p>
          <p>
            We do not use SMS for cold outreach, purchased lead lists, or unsolicited marketing. For full
            details, see our <a href="/sms-consent">SMS Consent Policy</a>.
          </p>

          <h2>4. Sharing of Information</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li><strong>Insurance Companies:</strong> As necessary to process and negotiate your claim;</li>
            <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our business (CRM platforms, scheduling tools, communication software), each bound by confidentiality obligations;</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and meet our
            legal obligations. Claim-related records are typically retained for a minimum of seven (7) years
            in compliance with industry standards.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your state of residence, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you;</li>
            <li>Request correction of inaccurate information;</li>
            <li>Request deletion of your information, subject to legal retention requirements;</li>
            <li>Opt out of SMS communications at any time by replying STOP.</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>

          <h2>7. Cookies and Analytics</h2>
          <p>
            Our website uses cookies and third-party analytics tools to understand how visitors use our site.
            You can disable cookies in your browser settings; however, some features of the website may not
            function properly.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect
            personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
            updated effective date.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <p>
            <strong>{BRAND.name}</strong><br />
            {/* TODO: add real office address */}
            Address to be confirmed<br />
            Phone: <a href={BRAND.phone.href}>{BRAND.phone.display}</a><br />
            Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
        </div>
      </section>
    </>
  )
}
