// Central place for business facts the site displays. Everything here is a
// PLACEHOLDER pending real Northstar Public Adjusting details — do not treat
// these numbers as verified claims. Swap in real values, then this comment
// can go.
export const BRAND = {
  name: 'Northstar Public Adjusting',
  shortName: 'Northstar',
  tagline: 'Your insurance company has adjusters. Now you do too.',
  chatAssistantName: 'Nova', // TODO: confirm real assistant name / founder names to reference
  founders: [] as string[], // TODO: e.g. ['David', 'Manny'] — who the assistant escalates to
  phone: {
    display: '(972) 904-6137',
    href: 'tel:+19729046137',
  },
  email: 'David@northstarpublicadjusting.com',
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
