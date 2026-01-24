"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Upload } from "lucide-react"

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Don't show on claim pages
    if (window.location.pathname.includes("claim")) {
      return
    }

    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Gradient fade effect at top */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent" />
      
      {/* CTA Bar */}
      <div className="bg-white border-t shadow-lg px-4 py-3 safe-area-inset-bottom">
        <div className="flex gap-3">
          {/* Call Button */}
          <a href="tel:0850605357" className="flex-1">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full font-semibold border-primary text-primary hover:bg-primary/5"
            >
              <Phone className="mr-2 h-4 w-4" />
              Bel Direct
            </Button>
          </a>
          
          {/* Claim Button */}
          <Link href="/claim-indienen" className="flex-1">
            <Button 
              size="lg" 
              className="w-full font-semibold"
            >
              <Upload className="mr-2 h-4 w-4" />
              Schade Melden
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
