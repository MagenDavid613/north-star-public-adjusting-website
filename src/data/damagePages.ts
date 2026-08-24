// Carried over from Country Public Adjusters' damage-type pages per the
// rebrand — not independently verified here. Location-specific references
// (Nashville/Tennessee) were generalized since Northstar's confirmed service
// areas differ; state-specific legal claims (filing deadlines, etc.) were
// softened to "varies by state" rather than asserting unverified specifics.

export interface DamagePageData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroHeadline: string
  heroSub: string
  whatItLooks: string[]
  whatInsurersUndervalue: string[]
  localContext: string
  faqs: { question: string; answer: string }[]
}

export const DAMAGE_PAGES: Record<string, DamagePageData> = {
  'hail-damage-claims': {
    slug: 'hail-damage-claims',
    title: 'Hail Damage Claims',
    metaTitle: 'Hail Damage Insurance Claims | Public Adjuster Help',
    metaDescription:
      'Underpaid on your hail damage claim? We document every strike — granule loss, bruising, structural impact — and fight for full replacement value. Free inspection.',
    heroHeadline: 'Hail damage looks small. The cost is not.',
    heroSub:
      "Insurance companies routinely classify hail damage as 'cosmetic only' to avoid full replacement claims. We know exactly how to document and prove replacement-threshold damage.",
    whatItLooks: [
      'Granule loss from asphalt shingles',
      'Bruised or cracked shingle substrate',
      'Dented metal flashing, gutters, and vents',
      'Broken or cracked skylights',
      'Damaged siding, window screens, and AC units',
      'Impact marks on wood fascia and soffits',
    ],
    whatInsurersUndervalue: [
      'Claiming damage is cosmetic when it is structurally significant',
      'Failing to document all affected surfaces and materials',
      'Using ACV (actual cash value) instead of replacement cost coverage',
      'Missing satellite, HVAC, and ancillary structure damage',
      'Not accounting for matching code requirements',
    ],
    localContext:
      'Our service areas see severe hail events on a regular basis, with insurers who regularly undervalue hail claims regardless of market.',
    faqs: [
      {
        question: 'Is hail damage always covered by homeowners insurance?',
        answer:
          'Most standard homeowners policies cover hail damage. The issue is often the amount — insurers frequently classify damage as cosmetic only, which changes how much they pay. We document all damage thoroughly to establish true replacement-cost value.',
      },
      {
        question: 'How long do I have to file a hail damage claim?',
        answer:
          'Filing deadlines vary by state and policy. The sooner you file, the better — evidence degrades and insurers are more skeptical of aged damage claims. Call us immediately after a hail event and we\'ll confirm your specific deadline.',
      },
      {
        question: 'The insurance company said my hail damage is cosmetic. What can I do?',
        answer:
          'This is the most common dispute in hail claims. "Cosmetic only" findings are often wrong. We conduct an independent inspection using the same methodology as forensic engineering firms and challenge cosmetic-only findings with documented evidence of functional damage.',
      },
    ],
  },

  'wind-damage-claims': {
    slug: 'wind-damage-claims',
    title: 'Wind Damage Claims',
    metaTitle: 'Wind Damage Insurance Claims | Public Adjuster',
    metaDescription:
      'Wind damage is massively undervalued by insurance adjusters. We document structural, roofing, and exterior damage for full settlement value. Free inspection.',
    heroHeadline: 'Wind damage goes deeper than you can see.',
    heroSub:
      'Structural movement, compromised roof systems, and interior water intrusion often follow high-wind events — and insurers routinely miss them.',
    whatItLooks: [
      'Missing, displaced, or lifted shingles',
      'Structural damage to roof framing and decking',
      'Displaced or damaged siding panels',
      'Damaged or failed window and door seals',
      'Blown-out fences, sheds, and outbuildings',
      'Interior water damage from wind-driven rain',
    ],
    whatInsurersUndervalue: [
      'Failing to connect interior water damage to wind-driven rain entry',
      'Undervaluing siding matching requirements',
      'Missing structural movement in roof systems',
      'Overlooking ancillary structure and landscaping damage',
      'Claiming pre-existing conditions on wind-damaged materials',
    ],
    localContext:
      'Our service areas experience powerful straight-line and tropical-force winds throughout the year. Wind claims are among the most disputed claim types we handle.',
    faqs: [
      {
        question: 'Does homeowners insurance cover all types of wind damage?',
        answer:
          'Most policies cover wind damage, but exclusions vary — particularly for flooding that accompanies wind events. We review your policy carefully and document what is clearly covered, which is often more than the insurer acknowledges.',
      },
      {
        question: 'The wind knocked down my fence and damaged my shed. Is that covered?',
        answer:
          'Ancillary structures — fences, sheds, garages, pools — are typically covered under "other structures" in a standard homeowners policy, usually at 10% of dwelling coverage. Insurers often overlook these items.',
      },
    ],
  },

  'water-damage-claims': {
    slug: 'water-damage-claims',
    title: 'Water Damage Claims',
    metaTitle: 'Water Damage Insurance Claims | Public Adjuster Help',
    metaDescription:
      'Water damage and flooding claims are among the most complex in insurance. We document mold, structural moisture, and hidden damage for full recovery. Free inspection.',
    heroHeadline: 'Water damage hides. We find all of it.',
    heroSub:
      'Moisture intrusion causes mold, structural rot, and HVAC contamination that insurers rarely document properly — and that compounds in cost every day it goes unaddressed.',
    whatItLooks: [
      'Water intrusion from storms, pipes, or foundation',
      'Mold growth behind walls and under floors',
      'Subfloor and structural framing damage',
      'HVAC and ductwork contamination',
      'Damaged insulation throughout structure',
      'Electrical and plumbing system compromise',
    ],
    whatInsurersUndervalue: [
      'Documenting only visible surface damage while missing structural moisture',
      'Failing to test for mold or scope remediation properly',
      'Underestimating drying, dehumidification, and remediation costs',
      'Missing secondary damage to personal property and contents',
      'Ignoring code upgrade requirements during repair',
    ],
    localContext:
      'Our service areas deal with hurricane flooding, tropical rain, and year-round humidity that accelerates mold growth. Water damage claims are frequently undervalued.',
    faqs: [
      {
        question: 'Does homeowners insurance cover all water damage?',
        answer:
          'Standard homeowners insurance covers sudden, accidental water damage — burst pipes, storm-driven rain intrusion, appliance failures. It does not typically cover flood damage from rising water (that requires separate flood insurance). We review your specific policy to identify all covered components.',
      },
      {
        question: 'How quickly does mold grow after water damage?',
        answer:
          'Mold can begin growing within 24–48 hours in humid conditions. This is why timing is critical after water damage. The longer the moisture sits unaddressed, the more extensive the remediation requirement — and the stronger your claim becomes.',
      },
    ],
  },

  'roof-damage-claims': {
    slug: 'roof-damage-claims',
    title: 'Roof Damage Claims',
    metaTitle: 'Roof Damage Insurance Claims | Public Adjuster',
    metaDescription:
      'Roof replacement vs. repair disputes are where insurance companies save the most money. We fight for full replacement value.',
    heroHeadline: "Repair vs. replacement — that's where you lose.",
    heroSub:
      'Insurance companies fight hardest on roof claims. The difference between a repair settlement and a replacement settlement can be tens of thousands of dollars.',
    whatItLooks: [
      'Storm-damaged shingles, underlayment, and decking',
      'Failed flashing, vents, and penetrations',
      'Gutters, fascia, and soffit damage',
      'Structural damage to roof framing',
      'Damaged ridge caps and valleys',
      'Interior attic damage from water intrusion',
    ],
    whatInsurersUndervalue: [
      'Approving spot repairs when full replacement is warranted',
      'Using depreciation to reduce RCV to ACV',
      'Not addressing matching requirements for partial replacements',
      'Missing underlying structural damage during surface inspection',
      'Ignoring code compliance requirements in the repair scope',
    ],
    localContext:
      'Roofs in our service areas face hurricane-force wind pressures, hail, and intense UV degradation. We see frequent insurer resistance to full roof replacement claims.',
    faqs: [
      {
        question: 'Can I get a full roof replacement from my insurance claim?',
        answer:
          "Yes — if the damage meets the threshold under your policy and local building code. Insurers often try to approve repairs when replacement is warranted. We document what's necessary to support a replacement scope and negotiate accordingly.",
      },
      {
        question: "My insurer approved repair but my contractor says I need replacement. Who's right?",
        answer:
          "This is one of the most common disputes we handle. A contractor's professional assessment of replacement necessity carries real weight. We document the damage independently, review your policy, and present a case for replacement scope.",
      },
    ],
  },

  'storm-damage-claims': {
    slug: 'storm-damage-claims',
    title: 'Storm Damage Claims',
    metaTitle: 'Storm Damage Insurance Claims | Public Adjuster Help',
    metaDescription:
      'Storm damage to your property? We handle the entire insurance claim from inspection to settlement. No upfront cost.',
    heroHeadline: 'The storm is over. The claim fight begins.',
    heroSub:
      'Major storm events trigger coordinated insurance company responses designed to manage their exposure — not protect yours. You need your own expert on the ground.',
    whatItLooks: [
      'Roof, siding, and structural damage from wind and debris',
      'Water intrusion from storm-driven rain',
      'Fallen tree damage to structures',
      'Hail damage across all exterior surfaces',
      'Electrical and mechanical damage',
      'Flooding from storm surge or runoff',
    ],
    whatInsurersUndervalue: [
      'Deploying high-volume, fast-close adjusting during catastrophe events',
      'Understating damage scope to accelerate claim closure',
      'Using independent adjusters unfamiliar with local building costs',
      'Offering quick settlements to close claims before full damage is known',
      'Missing property-wide damage when focusing on primary structure',
    ],
    localContext:
      'Our service areas face annual storm and hurricane seasons with multi-billion dollar storm events, and are well-practiced grounds for insurance companies managing large claim volumes.',
    faqs: [
      {
        question: "Should I accept the insurance company's first storm damage offer?",
        answer:
          'In most cases, no. Initial offers after major storm events are often made quickly and understate the full damage. We recommend calling us for a free inspection before accepting any settlement. Once you accept, it becomes significantly harder to negotiate additional recovery.',
      },
    ],
  },

  'hurricane-damage-claims': {
    slug: 'hurricane-damage-claims',
    title: 'Hurricane & Severe Weather Claims',
    metaTitle: 'Hurricane Damage Insurance Claims | Public Adjuster',
    metaDescription:
      'Hurricane damage claims are among the most complex in insurance. We handle full-scope hurricane claims — roof, structure, contents, and more. Free inspection.',
    heroHeadline: 'Hurricane claims are fought in the details.',
    heroSub:
      'After a major hurricane, every insurer in the state is managing exposure. Thorough documentation and professional negotiation are the difference between recovery and undercompensation.',
    whatItLooks: [
      'Wind-damaged roofing systems and roof structures',
      'Impact damage from hurricane-force debris',
      'Water intrusion throughout the structure',
      'Compromised windows, doors, and shutters',
      'Flooding damage to lower floors and contents',
      'Total or near-total loss of entire structures',
    ],
    whatInsurersUndervalue: [
      'Rapid-close adjusting programs that underestimate damage',
      'Splitting covered wind damage from non-covered flood damage',
      'Failing to document concurrent causation correctly',
      'Undervaluing contents, landscaping, and ancillary structures',
      'Missing code upgrade requirements under updated building codes',
    ],
    localContext:
      'Our service areas have been ground zero for multiple billion-dollar hurricane events. We understand the specific tactics used by large property insurers after catastrophe events.',
    faqs: [
      {
        question: 'How is hurricane damage covered by insurance?',
        answer:
          "Wind damage from hurricanes is typically covered under standard homeowners insurance. Storm surge and flooding require separate flood insurance through FEMA or a private carrier. Getting both coverages properly documented and applied requires expertise in concurrent causation analysis — which is part of what we do.",
      },
      {
        question: 'My insurer has a "hurricane deductible" — is that different from my regular deductible?',
        answer:
          "Yes. Many coastal policies have a separate hurricane deductible — often 2–5% of the dwelling's insured value. This can be significantly larger than the standard deductible. We work to ensure every covered dollar of damage above that deductible is fully recovered.",
      },
    ],
  },

  'commercial-property-claims': {
    slug: 'commercial-property-claims',
    title: 'Commercial Property Claims',
    metaTitle: 'Commercial Property Insurance Claims | Public Adjuster',
    metaDescription:
      'Commercial property damage claims require specialist expertise. We handle business property, business interruption, and complex commercial claims.',
    heroHeadline: "Your business can't afford an underpaid claim.",
    heroSub:
      'Commercial property claims are more complex, more contested, and have higher stakes than residential. You need a specialist who understands both the insurance and the business impact.',
    whatItLooks: [
      'Structural damage to commercial buildings',
      'Roof damage to large commercial roof systems',
      'Business interruption and income loss',
      'Inventory and equipment damage',
      'Tenant and landlord claim complexities',
      'Multi-structure and multi-location claims',
    ],
    whatInsurersUndervalue: [
      'Underestimating business interruption losses and period of restoration',
      'Missing extra expense and civil authority coverage',
      'Using residential repair cost data for commercial damage scopes',
      'Failing to account for code compliance requirements in older buildings',
      'Disputing covered causes of loss for complex commercial events',
    ],
    localContext:
      'Our service areas carry significant commercial exposure to storm and hurricane risk across retail, hospitality, and multi-family properties.',
    faqs: [
      {
        question: 'What is business interruption coverage and can you help with that?',
        answer:
          'Business interruption (BI) coverage pays for lost income and operating expenses during the period your business cannot operate due to covered property damage. BI claims are among the most complex and most disputed in commercial insurance. We document your revenue history, expenses, and the period of restoration to support the full BI recovery.',
      },
      {
        question: 'Does commercial insurance cover tenant-caused damage?',
        answer:
          'This depends on your policy, lease agreements, and the nature of the damage. We review all applicable policies and advise on the most effective recovery path.',
      },
    ],
  },

  'fire-damage-claims': {
    slug: 'fire-damage-claims',
    title: 'Fire & Smoke Damage Claims',
    metaTitle: 'Fire & Smoke Damage Insurance Claims | Public Adjuster Help',
    metaDescription:
      'Fire and smoke damage to your property? We handle the full insurance claim — visible fire damage, hidden smoke contamination, contents, and temporary housing.',
    heroHeadline: 'Fire damage claims are almost always undervalued.',
    heroSub:
      'Smoke travels further than fire. Insurers focus on what burned — we document everything that smoke, soot, and suppression water touched throughout your entire property.',
    whatItLooks: [
      'Direct fire damage to structure, roof, and interior finishes',
      'Smoke and soot contamination throughout HVAC system and all rooms',
      'Water damage from fire suppression and sprinkler systems',
      'Odor penetration into walls, flooring, insulation, and contents',
      'Electrical system damage from heat and suppression water',
      'Structural weakening from fire exposure',
      'Contents damage across all rooms affected by smoke',
      'Temporary housing costs while property is uninhabitable',
    ],
    whatInsurersUndervalue: [
      'Limiting the smoke damage scope to rooms with visible soot',
      'Missing HVAC contamination that spreads smoke throughout the structure',
      'Undervaluing contents replacement costs',
      'Ignoring attic insulation replacement requirements',
      'Applying cosmetic repair costs where full replacement is warranted',
      'Omitting odor remediation costs for affected materials',
      'Underestimating temporary housing and living expense recovery',
    ],
    localContext:
      'Fire and smoke damage claims regularly result in underpaid settlements when insurers focus only on visible burn damage. Our inspections consistently identify smoke spread through HVAC systems, soot in attic insulation, and water damage from suppression — items commonly missing from initial insurer assessments.',
    faqs: [
      {
        question: 'Does my insurance cover smoke damage that spread beyond the fire area?',
        answer:
          'In most cases, yes. Standard homeowners and commercial property policies cover smoke and soot damage that spreads throughout the structure — not just the room where the fire occurred. Smoke travels through HVAC systems and can affect every room. We document the full extent of smoke contamination to ensure the entire scope is covered.',
      },
      {
        question: 'Can I stay in my home after a fire?',
        answer:
          "If your home is uninhabitable due to fire or smoke damage, your policy's Additional Living Expenses (ALE) or Loss of Use coverage typically pays for temporary housing, meals, and related costs. We document and claim these losses in full as part of the claim.",
      },
      {
        question: 'The fire was small — why is my claim so complicated?',
        answer:
          'Even small fires can create large claims because smoke and soot spread throughout the entire structure via the HVAC system. Odor remediation, insulation replacement, ductwork cleaning, and contents cleaning can add up to tens of thousands of dollars beyond what the visible burn area suggests.',
      },
    ],
  },

  'residential-property-claims': {
    slug: 'residential-property-claims',
    title: 'Residential Property Claims',
    metaTitle: 'Residential Property Insurance Claims | Public Adjuster',
    metaDescription:
      'Residential homeowners deserve their own claims expert. We handle all residential property damage claims on contingency — no upfront cost.',
    heroHeadline: 'Your home is your most valuable asset. Protect your claim.',
    heroSub:
      'Most homeowners face the insurance claim process alone — negotiating against experienced professionals with a financial incentive to pay less. We level that playing field.',
    whatItLooks: [
      'Storm damage to roofing, exterior, and structure',
      'Water and mold damage throughout the home',
      'Fire and smoke damage to structure and contents',
      'Hail damage to all exterior surfaces',
      'Wind damage to roofing, siding, and windows',
      'Interior damage from any of the above',
    ],
    whatInsurersUndervalue: [
      'Failing to include all damaged materials in the repair scope',
      'Depreciating materials aggressively in ACV calculations',
      'Overlooking contents and personal property losses',
      'Missing code upgrade requirements during repair',
      'Splitting damage causes to avoid or reduce coverage',
    ],
    localContext:
      'Homeowners across our service areas face challenging storm and damage profiles that have produced large volumes of underpaid residential claims.',
    faqs: [
      {
        question: 'When should I call a public adjuster — before or after filing my claim?',
        answer:
          "Ideally before. We can help ensure your initial claim is filed correctly and completely. However, we also handle claims that are already filed, underway, or settled. It's rarely too late.",
      },
    ],
  },
}
