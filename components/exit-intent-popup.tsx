"use client"

import { useState, useEffect } from "react"
import { X, Gift, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem("exitPopupShown")) {
      setHasTriggered(true)
      return
    }

    // Don't show on claim-indienen or claim-success pages
    if (window.location.pathname.includes("claim")) {
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of viewport (exit intent)
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
        sessionStorage.setItem("exitPopupShown", "true")
      }
    }

    // Only add listener after a delay (don't show immediately)
    // Use requestIdleCallback to not block main thread
    const timeout = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => {
          document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
        })
      } else {
        document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
      }
    }, 5000)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasTriggered])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Sluiten"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Gift className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Wacht even!
          </h2>
          <p className="text-blue-100">
            Vergeet niet uw gratis schadeclaim in te dienen
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-700">100% gratis - u betaalt niets</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-700">Binnen 24 uur reactie</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-700">Gemiddeld €2.500 schadevergoeding</p>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Link href="/claim-indienen" className="block">
              <Button size="lg" className="w-full font-semibold">
                Claim Nu Indienen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <button
              onClick={handleClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              Nee bedankt, ik ga door
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
