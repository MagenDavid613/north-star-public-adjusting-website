import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/layout/ChatWidget'
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
        <Header />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
