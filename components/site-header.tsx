"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Contact Bar */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-6 text-sm">
          <a 
            href="tel:0850605357" 
            className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium"
          >
            <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
            085 060 5357
          </a>
          <a 
            href="mailto:info@autoschadebureau.nl" 
            className="flex items-center gap-2 hover:text-white/80 transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
            info@autoschadebureau.nl
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b">
        <div className="container mx-auto flex h-24 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Autoschadebureau.nl Logo" 
              width={320}
              height={90}
              priority
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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
              FAQ
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link href="/over-ons" className="text-sm font-medium transition-colors hover:text-primary">
              Over Ons
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Mijn Dossier
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2"
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
        <div className="md:hidden border-t bg-background">
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
              FAQ
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
              href="/contact" 
              className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
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
