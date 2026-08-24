import type { MetadataRoute } from 'next'
import { DAMAGE_PAGES } from '@/data/damagePages'
import { LOCATION_PAGES } from '@/data/locationPages'

const SITE_URL = 'https://northstarpublicadjusting.com'

const STATIC_ROUTES = [
  '',
  '/about',
  '/contact',
  '/faq',
  '/how-it-works',
  '/intake',
  '/results',
  '/partners',
  '/restoration',
  '/services',
  '/services/denied-insurance-claims',
  '/services/underpaid-insurance-claims',
  '/services/disputed-insurance-claims',
  '/locations',
  '/questions',
  '/questions/what-does-a-public-adjuster-do',
  '/questions/when-should-i-hire-a-public-adjuster',
  '/questions/public-adjuster-vs-insurance-adjuster',
  '/questions/how-do-i-document-insurance-damage',
  '/questions/what-should-i-do-after-property-damage',
  '/guides',
  '/guides/insurance-claim-guide',
  '/privacy',
  '/terms',
  '/sms-consent',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  const serviceEntries: MetadataRoute.Sitemap = Object.values(DAMAGE_PAGES).map((d) => ({
    url: `${SITE_URL}/services/${d.slug}`,
    lastModified: new Date(),
  }))

  const locationEntries: MetadataRoute.Sitemap = Object.values(LOCATION_PAGES).map((s) => ({
    url: `${SITE_URL}/locations/${s.slug}`,
    lastModified: new Date(),
  }))

  return [...staticEntries, ...serviceEntries, ...locationEntries]
}
