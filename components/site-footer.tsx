import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Clock } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          
          {/* Logo & Description */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold">Autoschadebureau.nl</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed pr-2">
              Gratis autoschade en voertuigschade verhalen op de WA-verzekeraar van de tegenpartij. 
              100% no cure no pay.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Navigatie</h3>
            <ul className="space-y-1.5 text-sm">
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

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Juridisch</h3>
            <ul className="space-y-1.5 text-sm">
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
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@autoschadebureau.nl" className="hover:text-primary transition-colors">
                  info@autoschadebureau.nl
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:0850607905" className="hover:text-primary transition-colors">
                  085 060 7905
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  Einsteinlaan 28<br />
                  2289 CC Rijswijk
                </span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  maandag - zaterdag: 09:00 - 17:30
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-center md:text-left">
            <p className="text-sm text-muted-foreground w-full md:w-auto">
              &copy; {currentYear} Autoschadebureau.nl. Alle rechten voorbehouden.
            </p>
            <p className="text-xs text-muted-foreground w-full md:w-auto">
              <span className="font-medium">Populaire zoektermen:</span> autoschade verhalen • voertuigschade verhalen • gratis autoschade verhalen
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
