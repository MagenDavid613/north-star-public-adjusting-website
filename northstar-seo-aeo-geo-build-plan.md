# North Star Public Adjusting — SEO / AEO / GEO Website Build Plan

> **Status note (2026-08-24):** This document is Version 1 — the original
> target architecture. Actual build has diverged from it in ways worth
> knowing before reading further:
> - URL nesting follows this doc (`/services/`, `/locations/`, `/questions/`,
>   `/guides/`), decided and executed after the fact — the site briefly used
>   flat URLs before this doc was rediscovered and the nesting was applied.
> - Service states are **Florida, Texas, Georgia, North Carolina, Louisiana**
>   — this doc's Section 1/6/7 mention Louisiana but not Georgia/North
>   Carolina; the live site keeps all five rather than replacing any.
> - Service/claim-type pages don't use this doc's exact slugs
>   (`/services/storm-damage-claims/` etc. — those match) but also include
>   `hail-damage-claims`, `commercial-property-claims`, and
>   `residential-property-claims`, which this doc's Section 1 list omits.
>   Mold and vandalism claim pages (Section 4) have NOT been built — unconfirmed
>   whether the company actually handles those claim types.
> - Current phase: **Phase 0 (migration) and Phase 1 (45-page architecture)
>   are complete.** Phase 2 (technical/semantic validation) is current —
>   `sitemap.ts`, `robots.ts`, and JSON-LD (Organization, Service, FAQPage,
>   BreadcrumbList) now exist across all pages that have matching visible
>   content. OpenSEO has not yet been connected (Phase 3).
> - `/about/alberto-perdomo/` (Section 14) is still blocked on real
>   biography/credentials — never fabricate this from a template.
> - `/claim-evaluation/`, `/case-studies/`, `/blog/` are intentionally not
>   built yet, per this doc's own phased rollout.
> - The Louisiana location page currently uses generic regulator language
>   (no verified Country Public Adjusters source content exists for it,
>   same as Texas/North Carolina) — treat it as a draft pending real
>   verification, not a final SEO version.

## Objective

Transform `https://northstarpublicadjusting.com/` from its current one-page website into a structured, authoritative, lead-generation website designed for:

- SEO — traditional Google/Bing organic search
- AEO — Answer Engine Optimization for question-based search and answer extraction
- GEO — Generative Engine Optimization for AI systems such as ChatGPT, Copilot, Perplexity, Gemini, and Google AI experiences
- Local SEO — city/town/service-area visibility
- Long-tail search capture
- Future paid-search landing pages
- Future backlink and digital PR campaigns
- Future automated SEO monitoring through OpenSEO

### Current situation

- The website currently has essentially one main page.
- Google Search Console is not yet configured.
- Google Analytics/GA4 is not yet configured.
- OpenSEO will be added later, after the initial site architecture and page build.
- The immediate priority is to build the website's information architecture and core pages correctly before beginning large-scale content production.
- The company is a public adjusting business and content involving insurance claims, state-specific rules, legal/coverage questions, licensing, deadlines, or financial outcomes must be factually accurate and reviewed before publication.

---

# 1. Overall Website Architecture

The target architecture is:

```text
NORTH STAR PUBLIC ADJUSTING
│
├── Core Business
│   ├── About
│   ├── How It Works
│   ├── Contact
│   └── Claim Evaluation
│
├── Services / Claim Types
│   ├── Storm Damage
│   ├── Hurricane Damage
│   ├── Wind Damage
│   ├── Roof Damage
│   ├── Water Damage
│   ├── Fire Damage
│   ├── Mold Damage
│   ├── Vandalism
│   ├── Denied Claims
│   ├── Underpaid Claims
│   └── Disputed Claims
│
├── Locations
│   ├── Florida
│   ├── Louisiana
│   └── Texas
│
├── Questions / AEO
│   ├── Public Adjuster Questions
│   ├── Insurance Claim Questions
│   ├── Damage Questions
│   └── Claim Dispute Questions
│
├── Guides
│   ├── Insurance Claim Guide
│   ├── Storm Damage Guide
│   ├── Hurricane Claim Guide
│   ├── Roof Claim Guide
│   ├── Water Damage Claim Guide
│   └── Fire Damage Claim Guide
│
├── Blog
│
└── Authority
    ├── Case Studies
    ├── Reviews
    ├── Team / Alberto Perdomo
    └── Media / Industry
```

The website should become a structured knowledge base and local lead-generation system, not just a marketing brochure.

---

# 2. Phase 1 — Core Business Pages

Build these first.

## `/`

Homepage

The homepage should remain the primary brand/conversion page.

It should communicate:

- What North Star Public Adjusting does
- Who it helps
- Main claim types
- Primary service areas
- Why choose North Star
- Trust/credentials
- Testimonials/reviews where legitimate
- Clear calls to action
- Phone number
- Lead form
- Links to service pages
- Links to major location pages
- Links to useful resources

The homepage should link clearly into the rest of the site.

---

## `/about/`

### Purpose

Establish the company's identity and authority.

Include:

- Company story
- Founder/team
- Experience
- Licensing/credentials where applicable
- Areas served
- Expertise
- Professional philosophy
- What makes North Star different
- Relevant associations/affiliations
- Links to services and locations

This page contributes to trust, entity understanding, and GEO/AEO.

---

## `/services/`

Main service hub.

Explain:

- What a public adjuster does
- How North Star helps policyholders
- Types of claims handled
- General claim process
- Residential/commercial capabilities if applicable
- Links to individual service pages

---

## `/how-it-works/`

Explain the process clearly:

```text
Damage occurs
    ↓
Initial evaluation
    ↓
Documentation
    ↓
Claim preparation
    ↓
Insurance inspection / adjustment
    ↓
Negotiation / claim management
    ↓
Resolution
```

Do not make unsupported promises about claim outcomes.

---

## `/claim-evaluation/`

A conversion-oriented page for users who are unsure what to do.

Possible CTA:

> Request a Claim Evaluation

Include:

- Who should use it
- What information is needed
- What happens after submission
- Clear expectations
- Phone/contact option

---

## `/contact/`

Include:

- Phone
- Email
- Contact form
- Service area
- Business information
- Hours where accurate
- Map/location information where appropriate

---

# 3. Phase 2 — Service / Claim-Type Pages

These are high-priority commercial pages.

Build:

```text
/services/storm-damage-claims/
/services/hurricane-damage-claims/
/services/wind-damage-claims/
/services/roof-damage-claims/
/services/water-damage-claims/
/services/fire-damage-claims/
/services/mold-damage-claims/
/services/vandalism-claims/
/services/denied-insurance-claims/
/services/underpaid-insurance-claims/
/services/disputed-insurance-claims/
```

## Required structure for service pages

Every important service page should include:

1. Clear H1
2. Direct explanation of the problem/service
3. Who this service is for
4. Common causes/scenarios
5. What the policyholder should do
6. Documentation considerations
7. How North Star can help
8. What the process looks like
9. Relevant FAQs
10. Relevant locations
11. Internal links to related services
12. Strong CTA
13. Phone number
14. Lead form
15. Appropriate structured data
16. Links to authoritative external sources where needed

Avoid keyword stuffing.

The pages must provide real value.

---

# 4. High-Priority Service Pages

## `/services/storm-damage-claims/`

Cover:

- Storm damage
- Property damage
- Roof damage
- Wind-related damage
- Water intrusion
- Documentation
- Claim process
- When professional claim assistance may be appropriate

---

## `/services/hurricane-damage-claims/`

Important for Florida/Louisiana/Texas.

Potential topics:

- Wind damage
- Roof damage
- Water intrusion
- Structural damage
- Contents
- Additional living expenses where applicable
- Business interruption where applicable
- Documentation
- Claim process

State-specific information must be verified.

---

## `/services/wind-damage-claims/`

Cover:

- Wind damage
- Roof damage
- Exterior/interior damage
- Documentation
- Claim evaluation
- Common insurance disputes

---

## `/services/roof-damage-claims/`

Potential topics:

- Storm roof damage
- Wind damage
- Hail damage where relevant
- Leaks
- Roof inspections
- Insurance estimates
- Documentation
- Claim disputes

---

## `/services/water-damage-claims/`

Potential topics:

- Burst pipes
- Water leaks
- Storm-related water intrusion
- Interior damage
- Contents
- Mold following water damage
- Documentation

---

## `/services/fire-damage-claims/`

Potential topics:

- Structural damage
- Smoke damage
- Contents
- Additional living expenses where applicable
- Business interruption where applicable
- Documentation
- Claim preparation

---

## `/services/mold-damage-claims/`

Build as a specialized service page only where the company actually handles these claims.

---

## `/services/vandalism-claims/`

Specialized service page.

---

# 5. High-Intent Problem Pages

These pages are especially valuable because the user is already experiencing a problem.

## `/services/denied-insurance-claims/`

Target concepts such as:

- Insurance claim denied
- What to do after an insurance claim denial
- Denied property insurance claim
- Help with denied insurance claim

Content must distinguish general information from state-specific legal/coverage advice.

---

## `/services/underpaid-insurance-claims/`

Target concepts such as:

- Insurance company underpaid my claim
- Insurance settlement too low
- Underpaid property damage claim
- Disagreement with insurance estimate

---

## `/services/disputed-insurance-claims/`

Broader claim dispute page.

Explain possible situations without making unsupported legal claims.

---

# 6. Phase 3 — Location Architecture

Create:

```text
/locations/
/locations/florida/
/locations/louisiana/
/locations/texas/
```

Then create city/town pages based on:

- Actual service availability
- Licensing requirements
- Search demand
- Competition
- Commercial intent
- Local relevance

Do NOT create hundreds of pages simply by changing the city name.

---

# 7. Initial Florida Location Pages

The existing website has identified several Florida service areas. These should be verified against the company's current actual service area before publication.

Potential initial pages to investigate:

```text
/locations/miami/
/locations/palm-beach-gardens/
/locations/jupiter/
/locations/wellington/
/locations/fort-pierce/
/locations/tampa/
/locations/fort-myers/
/locations/sarasota/
/locations/clearwater/
```

These are starting candidates, not a final keyword-driven list.

After OpenSEO research, expand into smaller towns.

---

# 8. Small-Town / Long-Tail Strategy

This is a major part of the SEO plan.

The objective is not to compete immediately for only broad terms such as:

> public adjuster Florida

Instead identify combinations such as:

```text
public adjuster + town
public adjuster + county
storm damage claim + town
roof damage insurance claim + town
water damage insurance claim + town
hurricane damage claim + town
insurance claim help + town
denied insurance claim + town
underpaid insurance claim + town
```

Prioritize opportunities using:

- Search demand
- Keyword difficulty
- SERP competition
- Commercial intent
- Actual service coverage
- Local relevance

A location page should contain genuine local value.

Potential sections:

- Area served
- Local communities
- Relevant claim types
- Local storm/disaster context where factual
- Common property issues
- Services available
- Local FAQs
- Testimonials/reviews where legitimate
- Contact information
- Related service pages
- Related guides

Avoid doorway pages.

---

# 9. Phase 4 — AEO Architecture

Create:

## `/questions/`

This becomes the answer/FAQ knowledge base.

Initial question pages:

```text
/questions/what-does-a-public-adjuster-do/
/questions/when-should-i-hire-a-public-adjuster/
/questions/can-a-public-adjuster-help-with-a-denied-claim/
/questions/can-i-hire-a-public-adjuster-after-filing-a-claim/
/questions/what-should-i-do-after-property-damage/
/questions/how-do-i-document-insurance-damage/
/questions/how-long-does-an-insurance-claim-take/
/questions/what-if-my-insurance-company-underpays-my-claim/
```

Additional questions should be discovered through keyword/SERP research later.

---

# 10. AEO Content Structure

Important pages should answer questions directly.

Recommended pattern:

```text
Question / H2
    ↓
Short direct answer
    ↓
Detailed explanation
    ↓
Steps / considerations
    ↓
Related questions
    ↓
Relevant service
    ↓
Relevant location
    ↓
CTA
```

Examples:

- What does a public adjuster do?
- Should I hire a public adjuster after a denied claim?
- Can a public adjuster help with an underpaid claim?
- What should I do immediately after storm damage?
- What documents should I keep?
- What happens after I file an insurance claim?

Do not write answers solely for search engines. They must be useful to humans.

---

# 11. Phase 5 — Guides

Create:

## `/guides/`

First guide:

```text
/guides/insurance-claim-guide/
```

Then:

```text
/guides/storm-damage-insurance-claim/
/guides/hurricane-insurance-claim/
/guides/roof-insurance-claim/
/guides/water-damage-insurance-claim/
/guides/fire-insurance-claim/
```

These should be substantial resources.

They can become:

- SEO pillar content
- AEO resources
- GEO source material
- Internal-link hubs
- Linkable assets for future backlink campaigns

---

# 12. Insurance Claim Guide Structure

A comprehensive guide could explain:

```text
Damage occurs
    ↓
Document damage
    ↓
Review relevant policy information
    ↓
Notify insurer
    ↓
Inspection
    ↓
Estimate
    ↓
Claim evaluation
    ↓
Negotiation / adjustment
    ↓
Resolution
```

State-specific requirements must be independently verified.

Do not give legal advice unless the content is reviewed by an appropriately qualified professional.

---

# 13. Phase 6 — Case Studies

Create:

## `/case-studies/`

Then individual real cases:

```text
/case-studies/storm-damage-claim/
/case-studies/water-damage-claim/
/case-studies/fire-damage-claim/
```

Only use real, verifiable cases.

Recommended structure:

```text
Situation
    ↓
Damage
    ↓
Initial insurance position
    ↓
North Star's work
    ↓
Resolution
    ↓
Outcome
```

Do not fabricate claim amounts, results, timelines, or customer experiences.

Case studies are useful for:

- SEO
- Conversion
- Trust
- GEO/entity authority
- Demonstrating expertise

---

# 14. Phase 7 — Expert / Team Entity

Create:

## `/about/alberto-perdomo/`

Where accurate, include:

- Professional background
- Licensing
- Experience
- Expertise
- Service areas
- Professional affiliations
- Publications
- Media appearances
- Expert commentary
- Relevant credentials

The purpose is to clearly establish the people behind the company.

---

# 15. Phase 8 — Blog

Create:

## `/blog/`

Do not publish generic articles simply to increase article count.

The blog should be a demand-capture system.

Organize content into clusters.

---

# 16. Example Content Clusters

## Storm Damage

```text
What to do after storm damage
How to document storm damage
How to file a storm damage claim
What if insurance denies storm damage
How roof storm damage is evaluated
```

## Water Damage

```text
What to do after water damage
Water damage insurance claim
Burst pipe insurance claim
Insurance denied water damage
Mold after water damage
```

## Claim Disputes

```text
Why insurance claims get denied
Insurance company underpaid my claim
What to do after an insurance claim denial
How to dispute an insurance settlement
```

Each article should link to:

- Relevant guide
- Relevant service page
- Relevant location page where appropriate
- Related questions
- Contact/claim evaluation

---

# 17. Internal Linking Architecture

Do not build isolated pages.

Example:

```text
Storm Damage Claims
        │
        ├── Hurricane Damage
        ├── Roof Damage
        └── Wind Damage
                │
                ↓
          Florida Locations
                │
        ┌───────┼────────┐
        ↓       ↓        ↓
      Miami   Sarasota  Fort Myers
```

Another example:

```text
Blog Article
      ↓
Comprehensive Guide
      ↓
Service Page
      ↓
Location Page
      ↓
Claim Evaluation / Contact
```

Internal links should be contextual and useful.

---

# 18. SEO + AEO + GEO Entity Structure

The website should make the relationship between these entities obvious:

```text
North Star Public Adjusting
        │
        ├── Public Adjuster
        ├── Insurance Claims
        ├── Florida
        ├── Louisiana
        ├── Texas
        ├── Storm Damage
        ├── Hurricane Damage
        ├── Wind Damage
        ├── Roof Damage
        ├── Water Damage
        ├── Fire Damage
        ├── Denied Claims
        └── Underpaid Claims
```

The website should consistently and accurately communicate:

- Company name
- Services
- Service areas
- People
- Credentials
- Contact information
- Expertise

This should also be reflected across legitimate external profiles and mentions.

---

# 19. Structured Data

Implement appropriate structured data based on actual page content.

Potential types include:

- `Organization`
- Appropriate `LocalBusiness` subtype
- `Service`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `Article`
- `Person`
- `FAQPage` where appropriate and supported

Rules:

- Structured data must match visible page content.
- Never use schema as hidden keyword stuffing.
- Do not mark up information that is not actually present.
- Validate structured data before deployment.

---

# 20. GEO Strategy

GEO should not be treated as a separate replacement for SEO.

The goal is to make North Star a clear, authoritative entity that AI systems can understand and potentially mention when users ask relevant questions.

Target systems include:

- ChatGPT
- Google AI experiences
- Microsoft Copilot
- Perplexity
- Gemini
- Other generative search interfaces

Focus on:

### Entity clarity

Clearly establish:

```text
North Star Public Adjusting
    ↓
Public adjusting company
    ↓
Services
    ↓
Locations
    ↓
Experts
```

### Authoritative content

Create reliable content around:

- Insurance claims
- Claim documentation
- Damage types
- Claim processes
- State-specific information
- Local disaster information
- Claim disputes
- Public adjusting

### Third-party corroboration

Build legitimate mentions through:

- Local publications
- Industry publications
- Relevant directories
- Professional organizations
- Community organizations
- Interviews
- Podcasts
- Expert commentary
- Partner websites
- News coverage

Do not manufacture mentions.

---

# 21. GEO Monitoring

Once OpenSEO is connected, create an AI prompt monitoring set.

Example prompts:

```text
Who is a reputable public adjuster in [city]?

Who can help with a denied insurance claim in [city]?

What should I do after hurricane damage in [city]?

Who are reputable public adjusters in [state]?

What companies help homeowners with underpaid insurance claims?

Who should I contact after storm damage?
```

Monitor:

- Was North Star mentioned?
- Which competitors were mentioned?
- Which sources were cited?
- What facts were used?
- Was the correct location recognized?
- Was the correct service recognized?
- What sources appear repeatedly?

The objective is not to promise a specific AI ranking. The objective is to improve the likelihood that North Star is discoverable, understood, and cited/recommended in relevant AI answers.

---

# 22. Backlink Strategy Comes After the Content Foundation

Do not make backlinks the first activity.

First create assets worth linking to:

- Comprehensive insurance claim guides
- Local resources
- Original data where available
- Checklists
- Disaster resources
- Helpful tools/calculators where appropriate
- Expert content
- Case studies

Then pursue legitimate links and mentions.

Potential sources:

- Local news
- Industry publications
- Community organizations
- Relevant business partners
- Professional organizations
- Local resource websites
- Journalists
- Podcasts
- Interviews

The objective is not simply to increase backlink count.

Prioritize:

- Relevance
- Authority
- Local relevance
- Editorial context
- Natural placement

---

# 23. Paid Search + Organic Search Feedback Loop

Eventually paid search data should feed SEO.

Example:

```text
Google Ads
    ↓
Real search terms
    ↓
Conversions
    ↓
High-performing query discovered
    ↓
SEO opportunity
    ↓
Create / improve organic page
    ↓
Organic ranking
    ↓
Organic leads
```

This allows paid search to function as a source of market intelligence for organic search.

---

# 24. Future Autonomous SEO/GEO Agent

Once the website is structured and OpenSEO is connected, build toward:

```text
Google Search Console
Google Analytics
OpenSEO
Google Ads
CRM
Call tracking
Website data
        │
        ↓
Data / Monitoring Layer
        │
        ↓
Claude Agent
        │
        ↓
Opportunity Detection
        │
        ├── SEO
        ├── AEO
        ├── GEO
        ├── Content
        ├── Local SEO
        ├── Backlinks / PR
        └── Paid Search
```

The agent can eventually identify:

- New keyword opportunities
- Ranking losses
- New competitors
- Content gaps
- Cannibalization
- Local opportunities
- AI visibility changes
- Backlink opportunities
- Pages that need optimization
- New content opportunities

The agent should recommend actions first. Do not allow fully autonomous publishing of sensitive insurance/legal content without human review.

---

# 25. Initial Page Build — Recommended Order

Do not build everything simultaneously.

## Stage 1 — Foundation

Build:

1. Home
2. About
3. Services
4. How It Works
5. Claim Evaluation
6. Contact

## Stage 2 — Commercial Service Pages

Build:

7. Storm Damage Claims
8. Hurricane Damage Claims
9. Wind Damage Claims
10. Roof Damage Claims
11. Water Damage Claims
12. Fire Damage Claims
13. Mold Damage Claims
14. Vandalism Claims
15. Denied Insurance Claims
16. Underpaid Insurance Claims
17. Disputed Insurance Claims

## Stage 3 — Location Infrastructure

Build:

18. Locations
19. Florida
20. Louisiana
21. Texas
22–27. First priority verified cities

Do not choose all city pages until keyword and SERP research is performed.

## Stage 4 — AEO

Build:

28. Questions
29–38. Initial high-value question pages

## Stage 5 — Authority

Build:

39. Case Studies
40. First case study
41. Alberto Perdomo / Expert page

## Stage 6 — Resources

Build:

42. Guides
43. Insurance Claim Guide
44. Storm Damage Guide
45. Hurricane Claim Guide
46. Roof Claim Guide

## Stage 7 — Blog

Start long-tail content clusters after the foundational architecture exists.

The exact final page count can change based on keyword/SERP research.

---

# 26. What NOT to Do

Avoid:

- Publishing hundreds of AI-generated location pages
- Creating duplicate city pages with only the city name changed
- Publishing generic blog posts without search intent
- Keyword stuffing
- Fake reviews
- Fake testimonials
- Fake case studies
- Fake statistics
- Unsupported claims about insurance coverage
- Unsupported legal advice
- Mass low-quality directory submissions
- Buying spammy backlinks
- Trying to "hack ChatGPT"
- Creating pages that do not correspond to real services or locations
- Publishing content without fact checking

---

# 27. OpenSEO Phase

After the initial website architecture and core pages are built:

Connect the site to OpenSEO.

Use it for:

### Keyword research

Research:

- Core commercial keywords
- Claim/problem keywords
- Location keywords
- Long-tail questions
- Competitor keywords
- Low-competition opportunities

### SERP analysis

Inspect:

- Search intent
- Ranking competitors
- Content formats
- Local results
- Featured snippets
- AI results where available
- Content gaps

### Rank tracking

Track priority keywords.

### Site audit

Monitor:

- Indexability
- Status codes
- Titles
- Meta descriptions
- Headings
- Internal links
- Images
- Performance
- Technical issues

### Backlinks

Monitor:

- New backlinks
- Lost backlinks
- Competitor backlinks
- Link opportunities

### AI visibility

Track:

- Brand mentions
- Competitor mentions
- AI prompts
- Sources cited
- AI visibility changes

---

# 28. Keyword-to-URL Mapping

Before publishing large amounts of content, maintain a keyword map.

Example:

| Keyword cluster | Intent | Target URL |
|---|---|---|
| public adjuster | Commercial | `/services/` |
| storm damage claim | Commercial | `/services/storm-damage-claims/` |
| hurricane insurance claim | Commercial/Informational | `/services/hurricane-damage-claims/` |
| denied insurance claim | Commercial | `/services/denied-insurance-claims/` |
| underpaid insurance claim | Commercial | `/services/underpaid-insurance-claims/` |
| public adjuster [city] | Local Commercial | `/locations/[city]/` |
| what does a public adjuster do | Informational/AEO | `/questions/what-does-a-public-adjuster-do/` |
| how to document storm damage | Informational | `/guides/` or relevant guide |
| insurance company underpaid my claim | Commercial/Informational | `/services/underpaid-insurance-claims/` |

Every important keyword cluster should have a clear canonical page.

This reduces keyword cannibalization.

---

# 29. Content Decision Process

Use this process for every new page:

```text
Keyword / Question
        ↓
Search intent
        ↓
SERP analysis
        ↓
Existing relevant page?
        │
     ┌──┴──┐
    YES     NO
     │       │
 Optimize   Create page
     │       │
     └──┬────┘
        ↓
Internal linking
        ↓
Publish / Update
        ↓
Monitor
        ↓
Improve
```

---

# 30. Final Strategic Model

The complete North Star acquisition system should eventually look like:

```text
                         NORTH STAR
                              │
              ┌───────────────┼────────────────┐
              ↓               ↓                ↓
             SEO             AEO              GEO
              │               │                │
         Google/Bing      Questions        AI systems
              │               │                │
              └───────────────┼────────────────┘
                              ↓
                      Local Search
                              │
                  ┌───────────┼───────────┐
                  ↓           ↓           ↓
               Services    Locations    Guides
                  │           │           │
                  └───────────┼───────────┘
                              ↓
                       Website Visitors
                              ↓
                  Claim Evaluation / Call
                              ↓
                            Lead
                              ↓
                            CRM
                              ↓
                           Client
```

The long-term expansion loop is:

```text
OpenSEO
   ↓
Keyword / SERP / AI data
   ↓
Opportunity detection
   ↓
New service page
New location page
New question
New guide
Content update
Backlink opportunity
AI visibility improvement
   ↓
Publish / Optimize
   ↓
Monitor
   ↓
Leads
   ↓
Repeat
```

---

# 31. Immediate Next Steps

Before adding the website to OpenSEO:

### Build the website foundation

1. Create the new URL structure.
2. Build the core business pages.
3. Build the service pages.
4. Build the location infrastructure.
5. Build the first verified location pages.
6. Build the Questions/AEO section.
7. Build the first comprehensive guides.
8. Build the expert/team page.
9. Build the case-study structure.
10. Implement clean internal linking.
11. Implement appropriate structured data.
12. Ensure every page has a clear conversion path.

### Then:

13. Connect OpenSEO.
14. Perform keyword research.
15. Perform SERP analysis.
16. Build the keyword-to-URL map.
17. Identify smaller-town opportunities.
18. Identify long-tail content opportunities.
19. Establish baseline rankings.
20. Establish AI visibility prompts.
21. Begin content expansion.
22. Begin backlink/digital PR strategy.
23. Begin continuous SEO/AEO/GEO monitoring.

---

# Core Principle

The goal is NOT:

> "Create lots of SEO pages."

The goal is:

> **Build a highly structured, authoritative information ecosystem around North Star Public Adjusting's services, claim types, locations, experts, and customer questions.**

That ecosystem should allow:

- Search engines to understand the company.
- Users to find the exact service/problem page they need.
- Answer engines to extract clear answers.
- AI systems to understand and potentially recommend the company.
- Local search systems to associate North Star with real service areas.
- Paid search to discover new demand.
- Backlinks and PR to strengthen authority.
- OpenSEO to continuously identify the next opportunity.

The website architecture comes first. The scalable SEO/AEO/GEO machine comes after it.
