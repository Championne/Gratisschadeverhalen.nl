import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"
import { ConditionalLayout } from "@/components/conditional-layout"
import { StructuredData } from "@/components/structured-data"
import { GoogleAnalytics, MicrosoftClarity, PreconnectHints } from "@/components/analytics"
import { BotpressChat } from "@/components/botpress-chat"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

// Font Awesome config
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "Autoschade Verhalen | Gratis Voertuigschade Claimen - U Betaalt Niets",
    template: "%s | 112autoschade.nl"
  },
  description: "Upload uw Europees Schadeformulier en verhaal uw autoschade gratis op de tegenpartij. Automatische formulierverwerking, u betaalt niets. Wij regelen uw voertuigschade van A tot Z. Gemiddeld binnen 6 weken uitbetaald.",
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
    "gratis autoschade afhandeling",
    "aansprakelijkheidsbrief",
    "schade verhaal indienen"
  ],
  authors: [{ name: "112autoschade.nl" }],
  creator: "112autoschade.nl",
  publisher: "112autoschade.nl",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.112autoschade.nl",
    siteName: "112autoschade.nl - Autoschade Verhalen Zonder Eigen Risico",
    title: "Autoschade Verhalen | Zonder Eigen Risico, Zonder Premieverhoging",
    description: "Verhaal uw autoschade direct bij de tegenpartij - zonder eigen risico, zonder premieverhoging. Ook met eigen verzekering voordelig! Upload schadeformulier en wij regelen alles gratis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "112autoschade.nl - Gratis autoschade en voertuigschade verhalen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoschade Verhalen | Gratis Voertuigschade Claimen",
    description: "Upload uw schadeformulier en verhaal uw autoschade gratis op de tegenpartij. U betaalt niets.",
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
    google: "4711ef4432d27e30",
  },
  alternates: {
    canonical: "https://www.112autoschade.nl"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <StructuredData />
        <PreconnectHints />
      </head>
      <body className={inter.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster richColors position="top-center" />
        <CookieConsent />
        
        {/* Analytics - loads after interactive */}
        <GoogleAnalytics />
        <MicrosoftClarity />
        
        {/* Botpress Chatbot - loads after 3s delay */}
        <BotpressChat />
        
        {/* Conversion Optimization */}
        <ExitIntentPopup />
        <MobileStickyCTA />
      </body>
    </html>
  )
}
