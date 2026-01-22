import Link from "next/link"
import { Shield } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Autoschadebureau.nl</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Gratis autoschade en voertuigschade verhalen op de WA-verzekeraar van de tegenpartij. 
              100% no cure no pay. Wij regelen uw schade van A tot Z.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/claim-indienen" className="text-muted-foreground hover:text-primary transition-colors">
                  Claim Indienen
                </Link>
              </li>
              <li>
                <Link href="/over-ons" className="text-muted-foreground hover:text-primary transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Juridisch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/algemene-voorwaarden" className="text-muted-foreground hover:text-primary transition-colors">
                  Algemene Voorwaarden
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Autoschadebureau.nl. Alle rechten voorbehouden.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Populaire zoektermen:</strong> autoschade verhalen • voertuigschade verhalen • 
              gratis autoschade verhalen • schade verhalen tegenpartij • WA schade verhalen
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
