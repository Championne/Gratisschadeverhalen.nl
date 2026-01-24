"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-28 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Autoschadebureau.nl Logo" 
            width={360}
            height={100}
            priority
            className="h-24 w-auto"
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
