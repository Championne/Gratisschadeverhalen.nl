"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { trackConversion } from "@/components/analytics"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handlePhoneClick = () => {
    trackConversion('phone_clicked')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Main Header */}
      <div className="border-b">
        {/* Desktop Header */}
        <div className="container mx-auto hidden lg:flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Autoschadebureau.nl Logo" 
              width={280}
              height={80}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-5">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/diensten" className="text-sm font-medium transition-colors hover:text-primary">
              Diensten
            </Link>
            <Link href="/claim-indienen" className="text-sm font-medium transition-colors hover:text-primary">
              Claim Indienen
            </Link>
            <Link href="/veelgestelde-vragen" className="text-sm font-medium transition-colors hover:text-primary">
              Vragen
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link href="/over-ons" className="text-sm font-medium transition-colors hover:text-primary">
              Over Ons
            </Link>
            <Link href="/intermediairs" className="text-sm font-medium transition-colors hover:text-primary">
              Intermediair
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
            
            {/* Divider */}
            <div className="h-6 w-px bg-border" />
            
            {/* Phone */}
            <a 
              href="tel:0850605357" 
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={handlePhoneClick}
            >
              <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
              085 060 5357
            </a>
            
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Mijn Dossier
              </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile Header: Phone Left | Logo Center | Menu Right */}
        <div className="container mx-auto flex lg:hidden h-16 items-center justify-between px-4">
          {/* Phone Icon - Left */}
          <a 
            href="tel:0850605357" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            onClick={handlePhoneClick}
            aria-label="Bel ons"
          >
            <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
          </a>

          {/* Logo - Center */}
          <Link href="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <Image 
              src="/logo.png" 
              alt="Autoschadebureau.nl Logo" 
              width={200}
              height={56}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Mobile Menu Button - Right */}
          <button 
            className="p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/diensten" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Diensten
            </Link>
            <Link 
              href="/claim-indienen" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Claim Indienen
            </Link>
            <Link 
              href="/veelgestelde-vragen" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vragen
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/over-ons" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Over Ons
            </Link>
            <Link 
              href="/intermediairs" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Intermediair
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Phone Info Mobile */}
            <div className="border-t pt-3 mt-2 px-4">
              <a 
                href="tel:0850605357" 
                className="flex items-center gap-2 text-sm font-medium text-primary"
                onClick={handlePhoneClick}
              >
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                085 060 5357
              </a>
            </div>
            
            <Link 
              href="/dashboard"
              className="px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="default" size="sm" className="w-full">
                Mijn Dossier
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
