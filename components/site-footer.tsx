import Link from "next/link"
import { Shield } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Autoschadebureau.nl</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gratis autoschade en voertuigschade verhalen op de WA-verzekeraar van de tegenpartij. 
              100% no cure no pay. Wij regelen uw schade van A tot Z.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigatie</h3>
            <ul className="space-y-3 text-sm">
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
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Juridisch</h3>
            <ul className="space-y-3 text-sm">
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

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@autoschadebureau.nl" className="hover:text-primary transition-colors">
                  info@autoschadebureau.nl
                </a>
              </li>
              <li>
                <a href="tel:0850607905" className="hover:text-primary transition-colors">
                  085 060 7905
                </a>
              </li>
              <li className="pt-2">
                Einsteinlaan 28<br />
                2289 CC Rijswijk
              </li>
              <li className="pt-2">
                Maandag t/m vrijdag<br />
                09:00 - 17:00 uur
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} Autoschadebureau.nl. Alle rechten voorbehouden.
              </p>
            </div>
            
            {/* SEO Keywords */}
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="font-medium">Populaire zoektermen:</strong>{" "}
                autoschade verhalen • voertuigschade verhalen • gratis autoschade verhalen • 
                schade verhalen tegenpartij • WA schade verhalen
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
