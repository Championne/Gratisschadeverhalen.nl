import Link from "next/link"
import { Shield, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between pl-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <div className="flex flex-col leading-tight text-center">
            <span className="text-lg font-bold">Autoschade</span>
            <span className="text-lg font-bold">Bureau.nl</span>
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
              Dashboard
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}
