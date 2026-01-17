import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Gratis Autoschade Verhalen | 100% No Cure No Pay",
    template: "%s | Gratisschadeverhalen.nl"
  },
  description: "Verhaal je autoschade gratis op de tegenpartij. 100% no cure no pay. Wij regelen alles voor je - van schademelding tot uitbetaling.",
  keywords: ["autoschade", "WA schade", "tegenpartij", "schade verhalen", "gratis", "no cure no pay", "aanrijding", "schadeclaim"],
  authors: [{ name: "Gratisschadeverhalen.nl" }],
  creator: "Gratisschadeverhalen.nl",
  publisher: "Gratisschadeverhalen.nl",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://gratisschadeverhalen.nl",
    siteName: "Gratisschadeverhalen.nl",
    title: "Gratis Autoschade Verhalen | 100% No Cure No Pay",
    description: "Verhaal je autoschade gratis op de tegenpartij. Wij regelen alles voor je.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gratisschadeverhalen.nl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis Autoschade Verhalen | 100% No Cure No Pay",
    description: "Verhaal je autoschade gratis op de tegenpartij.",
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
      </body>
    </html>
  )
}
