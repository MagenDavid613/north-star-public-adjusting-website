// Central place for business facts the site displays. Everything here is a
// PLACEHOLDER pending real North Star Public Adjusting details — do not treat
// these numbers as verified claims. Swap in real values, then this comment
// can go.
export const BRAND = {
  name: 'North Star Public Adjusting',
  legalName: 'North Star Public Adjusting LLC',
  smsName: 'North Star Public Adjusting',
  address: { street: '4111 Stirling Road', cityStateZip: 'Davie, FL 33314' },
  // Each legal document tracks its own effective/updated dates — they
  // diverge whenever only one document's terms actually change.
  legalDates: {
    terms: { effective: 'October 30, 2026', updated: 'November 13, 2026' },
    privacy: { effective: 'October 30, 2026', updated: 'November 13, 2026' },
    // SMS Consent Policy's terms materially changed (promotional option
    // removed) on November 13, 2026, so that's also its effective date.
    smsConsent: { effective: 'November 13, 2026', updated: 'November 13, 2026' },
  },
  shortName: 'North Star',
  tagline: 'Your insurance company has adjusters. Now you do too.',
  chatAssistantName: 'Nova', // TODO: confirm real assistant name / founder names to reference
  founders: [] as string[], // TODO: e.g. ['David', 'Manny'] — who the assistant escalates to
  phone: {
    display: '(866) 782-7577',
    href: 'tel:+18667827577',
  },
  email: 'claims@northstarpublicadjusting.com',
  // Carried over from Country Public Adjusters' figures per the rebrand —
  // not independently verified here. Confirm accuracy before real launch.
  stats: {
    avgIncreasePct: '747%',
    yearsExperience: '35+ years combined',
    recoveredTotal: '$250M+',
    googleReviewCount: '12,500+',
    successRatePct: '90%',
  },
  serviceAreas: [
    // TODO: confirm real states/cities served
  ] as { state: string; cities: string[] }[],
}
