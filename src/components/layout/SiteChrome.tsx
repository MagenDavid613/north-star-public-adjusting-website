'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from './ChatWidget'

// Standalone pages (internal tools, future-rebuilt sections) render with no
// site Header/Footer/ChatWidget at all — they own their full page shell.
const STANDALONE_PREFIXES = ['/field-intake']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const standalone = STANDALONE_PREFIXES.some((p) => pathname?.startsWith(p))

  if (standalone) return <>{children}</>

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatWidget />
    </>
  )
}
