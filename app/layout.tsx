import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"
import { WhatsAppButton } from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Autoschade Verhalen | Gratis Voertuigschade Claimen - 100% No Cure No Pay",
    template: "%s | Gratisschadeverhalen.nl"
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
  authors: [{ name: "Gratisschadeverhalen.nl" }],
  creator: "Gratisschadeverhalen.nl",
  publisher: "Gratisschadeverhalen.nl",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://gratisschadeverhalen.nl",
    siteName: "Gratisschadeverhalen.nl - Autoschade Verhalen Zonder Eigen Risico",
    title: "Autoschade Verhalen | Zonder Eigen Risico, Zonder Premieverhoging",
    description: "Verhaal uw autoschade direct bij de tegenpartij - zonder eigen risico, zonder premieverhoging. Ook met eigen verzekering voordelig! Upload schadeformulier en wij regelen alles gratis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gratisschadeverhalen.nl - Gratis autoschade en voertuigschade verhalen",
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
    canonical: "https://gratisschadeverhalen.nl"
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
        {children}
        <Toaster richColors position="top-center" />
        <CookieConsent />
        <WhatsAppButton />
      </body>
    </html>
  )
}
