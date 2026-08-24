// JSON-LD builders. Every field here mirrors content already visible on the
// page it's attached to — per the SEO/AEO/GEO plan's rule that structured
// data must match visible content and never assert facts the page doesn't
// actually show.
import { BRAND } from './brand'

const SITE_URL = 'https://northstarpublicadjusting.com'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: SITE_URL,
    telephone: BRAND.phone.display,
    email: BRAND.email,
    description: BRAND.tagline,
  }
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function serviceSchema({ name, description, areaServed }: { name: string; description: string; areaServed: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    description,
    provider: {
      '@type': 'Organization',
      name: BRAND.name,
    },
    areaServed: areaServed.map((state) => ({ '@type': 'State', name: state })),
  }
}
