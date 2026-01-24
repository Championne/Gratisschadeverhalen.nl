'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 400px down
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 hidden md:block">
          <p className="text-sm font-semibold">
            🎯 Start nu gratis met autoschade verhalen • U betaalt niets
          </p>
        </div>

        <Link href="/claim-indienen" className="flex-shrink-0">
          <Button
            size="sm"
            variant="secondary"
            className="font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Upload className="mr-2 h-4 w-4" />
            Start Nu
          </Button>
        </Link>

        <button
          onClick={() => setIsDismissed(true)}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Sluit sticky banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
