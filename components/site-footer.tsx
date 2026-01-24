import Link from "next/link"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  const regions = [
    { name: "Amsterdam", href: "/autoschade-verhalen-amsterdam" },
    { name: "Rotterdam", href: "/autoschade-verhalen-rotterdam" },
    { name: "Den Haag", href: "/autoschade-verhalen-den-haag" },
    { name: "Utrecht", href: "/autoschade-verhalen-utrecht" },
    { name: "Eindhoven", href: "/autoschade-verhalen-eindhoven" },
    { name: "Tilburg", href: "/autoschade-verhalen-tilburg" },
    { name: "Groningen", href: "/autoschade-verhalen-groningen" },
    { name: "Almere", href: "/autoschade-verhalen-almere" },
    { name: "Breda", href: "/autoschade-verhalen-breda" },
    { name: "Nijmegen", href: "/autoschade-verhalen-nijmegen" },
    { name: "Arnhem", href: "/autoschade-verhalen-arnhem" },
    { name: "Haarlem", href: "/autoschade-verhalen-haarlem" },
    { name: "Zaanstad", href: "/autoschade-verhalen-zaanstad" },
    { name: "Apeldoorn", href: "/autoschade-verhalen-apeldoorn" },
    { name: "Amersfoort", href: "/autoschade-verhalen-amersfoort" },
  ]

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-10 md:py-12">
        
        {/* Main Footer Content - Flexbox for even distribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:flex lg:justify-between lg:gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4 lg:w-56 lg:flex-shrink-0">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                Autoschadebureau.nl
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gratis autoschade verhalen tegenpartij. 
              U betaalt niets - alle kosten worden door de tegenpartij vergoed.
            </p>
          </div>

          {/* Column 2: Diensten */}
          <div className="space-y-4 lg:flex-shrink-0">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Diensten</h3>
            <ul className="space-y-2.5 text-sm">
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

          {/* Column 3: Informatie */}
          <div className="space-y-4 lg:flex-shrink-0">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Informatie</h3>
            <ul className="space-y-2.5 text-sm">
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
                  Blog
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

          {/* Column 4: Contact & Juridisch */}
          <div className="space-y-6 lg:flex-shrink-0">
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Contact</h3>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0 text-primary/70" />
                  <a href="mailto:info@autoschadebureau.nl" className="hover:text-primary transition-colors">
                    info@autoschadebureau.nl
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <Phone className="h-4 w-4 flex-shrink-0 text-primary/70" />
                  <a href="tel:0850605357" className="hover:text-primary transition-colors">
                    085 060 5357
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary/70" />
                  <span>Einsteinlaan 28, 2289 CC Rijswijk</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary/70" />
                  <span>Ma - Za: 09:00 - 17:30</span>
                </li>
              </ul>
            </div>

            {/* Juridisch */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Juridisch</h3>
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
            </div>
          </div>
        </div>

        {/* Regio's Section - Full width with justified spacing */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
            Autoschade verhalen in uw regio
          </h3>
          <div className="flex flex-wrap justify-between gap-y-2 text-sm">
            {regions.map((region, index) => (
              <span key={region.href} className="inline-flex items-center">
                <Link 
                  href={region.href} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {region.name}
                </Link>
                {index < regions.length - 1 && (
                  <span className="ml-3 text-gray-300">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Autoschadebureau.nl. Alle rechten voorbehouden.
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Populaire zoektermen:</span>{" "}
              <span className="hidden sm:inline">autoschade verhalen • voertuigschade verhalen • gratis autoschade verhalen • WA schade verhalen</span>
              <span className="sm:hidden">autoschade verhalen • gratis schade verhalen</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
