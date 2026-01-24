'use client'

import { usePathname } from 'next/navigation'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { StickyCTA } from './sticky-cta'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <SiteHeader />}
      {!isDashboard && <StickyCTA />}
      <main className={isDashboard ? '' : 'min-h-screen'}>
        {children}
      </main>
      {!isDashboard && <SiteFooter />}
    </>
  )
}
