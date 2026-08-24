// Service states: Florida, Texas, Georgia, North Carolina, Louisiana.
// Georgia and Florida regulatory/context content is adapted from Country
// Public Adjusters' real Georgia/South Florida pages. Texas, North
// Carolina, and Louisiana have no Country source content, so their context
// is written fresh and kept general — no fabricated city-specific claim stats.

export interface LocationPageData {
  slug: string
  state: string
  metaTitle: string
  metaDescription: string
  heroHeadline: string
  heroSub: string
  primaryCities: string[]
  extraCities: string[]
  regulatorNote: string
  stormContext: string[]
  faqs: { question: string; answer: string }[]
}

export const LOCATION_PAGES: Record<string, LocationPageData> = {
  florida: {
    slug: 'florida',
    state: 'Florida',
    metaTitle: 'Florida Public Adjuster | Hurricane, Wind & Water Damage Claims',
    metaDescription:
      'Licensed Florida public adjusters serving Miami, Tampa, Orlando, Jacksonville and all of FL. Hurricane, wind & water damage claims on contingency. Free inspection.',
    heroHeadline: "Florida's property damage insurance advocate",
    heroSub:
      'We handle hurricane, wind, water, and storm damage insurance claims across Florida on contingency. Free inspection, no upfront cost.',
    primaryCities: ['Orlando', 'Tampa', 'Miami', 'Jacksonville'],
    extraCities: ['St. Petersburg', 'Clearwater', 'Cape Coral', 'Fort Myers', 'Naples', 'Sarasota', 'Tallahassee'],
    regulatorNote:
      'Public adjusters are licensed and regulated by the Florida Department of Financial Services under Chapter 626 of the Florida Statutes. You have a fully protected legal right to hire a licensed public adjuster to represent you, and your insurer cannot penalize, cancel, or discriminate against you for doing so.',
    stormContext: [
      "Florida faces annual hurricane seasons that bring wind, storm surge, and heavy rain intrusion across the state, along with hail and severe thunderstorm activity further inland.",
      'Most Florida homeowners policies include a separate hurricane deductible — typically 2–5% of the insured dwelling value — which is much higher than a standard deductible. We ensure every dollar of covered damage above this threshold is fully documented and recovered.',
    ],
    faqs: [
      {
        question: 'Is hiring a public adjuster in Florida legal?',
        answer:
          'Yes. Public adjusters are licensed and regulated by the Florida Department of Financial Services under Chapter 626 of the Florida Statutes. Your insurer cannot penalize, cancel, or discriminate against you for hiring one.',
      },
      {
        question: 'What is a hurricane deductible and how does it affect my claim?',
        answer:
          'Most Florida homeowners policies include a separate hurricane deductible — typically 2–5% of the insured dwelling value. This applies whenever a storm is officially named a hurricane. We make sure every dollar of covered damage above this threshold is properly documented and recovered.',
      },
    ],
  },

  texas: {
    slug: 'texas',
    state: 'Texas',
    metaTitle: 'Texas Public Adjuster | Hail, Wind & Storm Damage Claims',
    metaDescription:
      'Licensed Texas public adjusters serving Houston, Dallas, Austin, San Antonio and all of TX. Hail, wind & storm damage claims on contingency. Free inspection.',
    heroHeadline: "Texas's property damage insurance advocate",
    heroSub:
      'We handle hail, wind, storm, and water damage insurance claims across Texas on contingency. Free inspection, no upfront cost.',
    primaryCities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    extraCities: ['Fort Worth', 'El Paso', 'Corpus Christi', 'Plano', 'Arlington'],
    regulatorNote:
      'Public adjusters are licensed and regulated by the Texas Department of Insurance. You have a protected legal right to hire a licensed public adjuster to represent you in your claim.',
    stormContext: [
      'Texas sits in one of the most active severe-weather corridors in the country — frequent hailstorms, tornadoes, and straight-line winds inland, and hurricane exposure along the Gulf Coast.',
      'Large-scale storm events bring coordinated insurer claim-management strategies designed to limit payouts. We represent you, not the insurance company.',
    ],
    faqs: [
      {
        question: 'Is hiring a public adjuster in Texas legal?',
        answer:
          'Yes. Public adjusters are licensed and regulated by the Texas Department of Insurance. Your insurer cannot penalize or cancel your policy simply because you hired one.',
      },
      {
        question: 'What types of storm damage are most common in Texas?',
        answer:
          'Texas sees frequent hailstorms, tornadoes, and severe straight-line wind events, plus hurricane exposure along the Gulf Coast. We handle all of these damage types statewide.',
      },
    ],
  },

  georgia: {
    slug: 'georgia',
    state: 'Georgia',
    metaTitle: 'Georgia Public Adjuster | Storm, Hail & Wind Damage Claims',
    metaDescription:
      'Licensed Georgia public adjusters serving Atlanta, Savannah, Augusta, Macon and all of GA. Storm, hail, wind & water damage claims on contingency. Free inspection.',
    heroHeadline: "Georgia's property damage insurance advocate",
    heroSub:
      'We handle storm, hail, tornado, wind, and water damage insurance claims across Georgia on contingency. Free inspection, no upfront cost.',
    primaryCities: ['Atlanta', 'Savannah', 'Augusta', 'Macon'],
    extraCities: ['Columbus', 'Albany', 'Athens', 'Warner Robins', 'Roswell', 'Marietta', 'Valdosta'],
    regulatorNote:
      'Public adjusters are licensed and regulated by the Georgia Office of Insurance and Safety Fire Commissioner under O.C.G.A. § 33-23-1 et seq. You have a fully protected legal right to hire a licensed public adjuster to represent you in an insurance claim, and your insurer cannot penalize, cancel, or discriminate against you for doing so.',
    stormContext: [
      'Georgia sits in one of the most active severe weather corridors in the Southeast. The Atlanta metro regularly sees hailstorms, tornadoes, and severe thunderstorm events, while coastal Georgia faces tropical weather systems from both the Gulf and Atlantic coasts.',
      'Insurance companies respond to large-scale storm events with coordinated claim management strategies designed to limit payouts. We represent you — not your insurer.',
    ],
    faqs: [
      {
        question: 'Is hiring a public adjuster in Georgia legal?',
        answer:
          'Yes. Public adjusters are licensed and regulated by the Georgia Office of Insurance and Safety Fire Commissioner under O.C.G.A. § 33-23-1 et seq. Your insurer cannot penalize, cancel, or discriminate against you for hiring one.',
      },
      {
        question: 'What types of storm damage are most common in Georgia?',
        answer:
          'The Atlanta metro regularly experiences hailstorms, tornadoes, and straight-line wind events, particularly in spring. Coastal Georgia faces tropical weather from both Gulf and Atlantic systems, while North Georgia sees significant flash flooding.',
      },
    ],
  },

  'north-carolina': {
    slug: 'north-carolina',
    state: 'North Carolina',
    metaTitle: 'North Carolina Public Adjuster | Hurricane & Storm Damage Claims',
    metaDescription:
      'Licensed North Carolina public adjusters serving Charlotte, Raleigh, Greensboro, Wilmington and all of NC. Hurricane, wind & storm damage claims on contingency. Free inspection.',
    heroHeadline: "North Carolina's property damage insurance advocate",
    heroSub:
      'We handle hurricane, wind, storm, and water damage insurance claims across North Carolina on contingency. Free inspection, no upfront cost.',
    primaryCities: ['Charlotte', 'Raleigh', 'Greensboro', 'Wilmington'],
    extraCities: ['Durham', 'Winston-Salem', 'Fayetteville', 'Asheville', 'Cary'],
    regulatorNote:
      'Public adjusters are licensed and regulated by the North Carolina Department of Insurance. You have a protected legal right to hire a licensed public adjuster to represent you in your claim.',
    stormContext: [
      'North Carolina faces hurricane and tropical storm exposure along the coast, along with inland flooding, tornadoes, and severe thunderstorm activity across the Piedmont region.',
      'Large storm events bring coordinated insurer claim-management strategies designed to limit payouts. We represent you, not the insurance company.',
    ],
    faqs: [
      {
        question: 'Is hiring a public adjuster in North Carolina legal?',
        answer:
          'Yes. Public adjusters are licensed and regulated by the North Carolina Department of Insurance. Your insurer cannot penalize or cancel your policy simply because you hired one.',
      },
      {
        question: 'What types of storm damage are most common in North Carolina?',
        answer:
          'Coastal North Carolina faces hurricane and tropical storm exposure, while the Piedmont and inland regions see tornadoes, severe thunderstorms, and inland flooding. We handle all of these damage types statewide.',
      },
    ],
  },

  louisiana: {
    slug: 'louisiana',
    state: 'Louisiana',
    metaTitle: 'Louisiana Public Adjuster | Hurricane, Wind & Flood-Adjacent Damage Claims',
    metaDescription:
      'Licensed Louisiana public adjusters serving New Orleans, Baton Rouge, Lafayette, Shreveport and all of LA. Hurricane, wind & storm damage claims on contingency. Free inspection.',
    heroHeadline: "Louisiana's property damage insurance advocate",
    heroSub:
      'We handle hurricane, wind, storm, and water damage insurance claims across Louisiana on contingency. Free inspection, no upfront cost.',
    primaryCities: ['New Orleans', 'Baton Rouge', 'Lafayette', 'Shreveport'],
    extraCities: ['Lake Charles', 'Metairie', 'Kenner', 'Bossier City', 'Monroe'],
    regulatorNote:
      'Public adjusters are licensed and regulated by the Louisiana Department of Insurance. You have a protected legal right to hire a licensed public adjuster to represent you in your claim.',
    stormContext: [
      'Louisiana faces some of the most active hurricane and tropical storm exposure in the country, along with heavy inland flooding and severe thunderstorm activity.',
      'Large storm events bring coordinated insurer claim-management strategies designed to limit payouts. We represent you, not the insurance company.',
    ],
    faqs: [
      {
        question: 'Is hiring a public adjuster in Louisiana legal?',
        answer:
          'Yes. Public adjusters are licensed and regulated by the Louisiana Department of Insurance. Your insurer cannot penalize or cancel your policy simply because you hired one.',
      },
      {
        question: 'What types of storm damage are most common in Louisiana?',
        answer:
          'Louisiana sees frequent hurricane and tropical storm exposure along the Gulf Coast, plus inland flooding and severe thunderstorm activity statewide. We handle all of these damage types.',
      },
    ],
  },
}
