import type { Metadata } from 'next'
import LocationHub from '@/components/locations/LocationHub'
import { LOCATION_PAGES } from '@/data/locationPages'

const data = LOCATION_PAGES.florida

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription }

export default function FloridaPage() {
  return <LocationHub data={data} />
}
