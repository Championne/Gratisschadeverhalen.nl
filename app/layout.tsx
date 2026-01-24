import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StructuredData } from "@/components/structured-data"
import { GoogleAnalytics, MicrosoftClarity } from "@/components/analytics"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "Autoschade Verhalen | Gratis Voertuigschade Claimen - U Betaalt Niets",
    template: "%s | Autoschadebureau.nl"
  },
  description: "Upload uw Europees Schadeformulier en verhaal uw autoschade gratis op de tegenpartij. Automatische OCR-verwerking, u betaalt niets. Wij regelen uw voertuigschade van A tot Z. Gemiddeld binnen 6 weken uitbetaald.",
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
    google: "verification_token",
  },
  alternates: {
    canonical: "https://autoschadebureau.nl"
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  
  // Don't show SiteHeader/Footer on dashboard pages (they have their own DashboardHeader)
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <StructuredData />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </head>
      <body className={inter.className}>
        {!isDashboard && <SiteHeader />}
        <main className={isDashboard ? "" : "min-h-screen"}>
          {children}
        </main>
        {!isDashboard && <SiteFooter />}
        <Toaster richColors position="top-center" />
        <CookieConsent />
      </body>
    </html>
  )
}
