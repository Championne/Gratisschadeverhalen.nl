"use client"

import { useState } from "react"
import Link from "next/link"
import { Car, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between pl-8 pr-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-7 w-7 text-primary" />
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold leading-tight">Autoschade</span>
              <span className="text-lg font-bold leading-tight">Bureau</span>
            </div>
            <span className="text-lg font-bold text-primary self-center">.nl</span>
          </div>
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
            Blog & Tips
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
              Blog & Tips
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
