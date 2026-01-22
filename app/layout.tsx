import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Autoschade Verhalen | Gratis Voertuigschade Claimen - 100% No Cure No Pay",
    template: "%s | Autoschadebureau.nl"
  },
  description: "Upload uw Europees Schadeformulier en verhaal uw autoschade gratis op de tegenpartij. Automatische OCR-verwerking, 100% no cure no pay. Wij regelen uw voertuigschade van A tot Z. Gemiddeld binnen 6 weken uitbetaald.",
  keywords: [
    "autoschade verhalen",
    "voertuigschade verhalen", 
    "gratis autoschade verhalen",
    "schade verhalen tegenpartij",
    "autoschade claimen",
    "voertuigschade claimen",
    "europees schadeformulier",
    "WA schade tegenpartij",
    "gratis schadeafhandeling",
    "no cure no pay autoschade",
    "aansprakelijkheidsbrief",
    "schade verhaal indienen"
  ],
  authors: [{ name: "Autoschadebureau.nl" }],
  creator: "Autoschadebureau.nl",
  publisher: "Autoschadebureau.nl",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://autoschadebureau.nl",
    siteName: "Autoschadebureau.nl - Autoschade Verhalen Zonder Eigen Risico",
    title: "Autoschade Verhalen | Zonder Eigen Risico, Zonder Premieverhoging",
    description: "Verhaal uw autoschade direct bij de tegenpartij - zonder eigen risico, zonder premieverhoging. Ook met eigen verzekering voordelig! Upload schadeformulier en wij regelen alles gratis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autoschadebureau.nl - Gratis autoschade en voertuigschade verhalen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoschade Verhalen | Gratis Voertuigschade Claimen",
    description: "Upload uw schadeformulier en verhaal uw autoschade gratis op de tegenpartij. 100% no cure no pay.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
  alternates: {
    canonical: "https://autoschadebureau.nl"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        <SiteHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
        <Toaster richColors position="top-center" />
        <CookieConsent />
        <WhatsAppButton />
      </body>
    </html>
  )
}
