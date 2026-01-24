import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Clock } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Logo & Description */}
          <div className="space-y-3 lg:col-span-1 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold">Autoschade</span>
                <span className="text-base font-bold">Bureau.nl</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gratis autoschade verhalen op de WA-verzekeraar van de tegenpartij. 
              U betaalt niets - alle kosten worden door de tegenpartij vergoed.
            </p>
          </div>

          {/* Diensten */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Diensten</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/diensten" className="text-muted-foreground hover:text-primary transition-colors">
                  Alle Diensten
                </Link>
              </li>
              <li>
                <Link href="/claim-indienen" className="text-muted-foreground hover:text-primary transition-colors">
                  Claim Indienen
                </Link>
              </li>
              <li>
                <Link href="/diensten#ocr" className="text-muted-foreground hover:text-primary transition-colors">
                  OCR Verwerking
                </Link>
              </li>
              <li>
                <Link href="/diensten#tracking" className="text-muted-foreground hover:text-primary transition-colors">
                  Online Tracking
                </Link>
              </li>
              <li>
                <Link href="/diensten#expertise" className="text-muted-foreground hover:text-primary transition-colors">
                  Expertise & Taxatie
                </Link>
              </li>
            </ul>
          </div>

          {/* Informatie */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Informatie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/veelgestelde-vragen" className="text-muted-foreground hover:text-primary transition-colors">
                  Veelgestelde Vragen
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog & Tips
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
                  Mijn Dossier
                </Link>
              </li>
            </ul>
          </div>

          {/* Juridisch */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Juridisch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy & Cookies
                </Link>
              </li>
              <li>
                <Link href="/algemene-voorwaarden" className="text-muted-foreground hover:text-primary transition-colors">
                  Algemene Voorwaarden
                </Link>
              </li>
            </ul>
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3">Partner</h4>
              <p className="text-xs text-muted-foreground mb-3">Partner voor Letselschade</p>
              <a 
                href="https://www.unitasletselschade.nl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white border-2 border-purple-100 rounded-lg p-3 hover:border-purple-300 transition-all hover:shadow-md">
                  {/* Unitas Letselschade Logo Placeholder */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">U</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-purple-900 group-hover:text-purple-700 transition-colors">
                        Unitas Letselschade
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Gespecialiseerd in letselschade claims met jarenlange ervaring
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2.5 text-sm">
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
                  ma - za<br />
                  09:00 - 17:30
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground w-full md:w-auto">
              &copy; {currentYear} Autoschadebureau.nl. Alle rechten voorbehouden.
            </p>
            <p className="text-xs text-muted-foreground w-full md:w-auto">
              <span className="font-medium">Populaire zoektermen:</span> autoschade verhalen • voertuigschade verhalen • gratis autoschade verhalen • WA schade verhalen
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
