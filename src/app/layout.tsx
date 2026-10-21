import type { Metadata } from 'next'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'
import JsonLd from '@/components/shared/JsonLd'
import { BRAND } from '@/lib/brand'
import { organizationSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `${BRAND.name} | Public Adjusters`,
  description: BRAND.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <JsonLd data={organizationSchema()} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
