"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Privacy & Cookies</CardTitle>
          <CardDescription>
            Wij gebruiken cookies om je ervaring te verbeteren en onze diensten te optimaliseren.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Door op &quot;Accepteren&quot; te klikken, ga je akkoord met het gebruik van cookies voor analytische doeleinden en verbeteringen van de website. 
            We delen geen persoonlijke gegevens met derden zonder je toestemming.
          </p>
          <p className="mt-2">
            Lees ons <a href="/privacy" className="underline hover:text-primary">privacybeleid</a> voor meer informatie.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={acceptCookies} className="flex-1">
            Accepteren
          </Button>
          <Button onClick={declineCookies} variant="outline" className="flex-1">
            Weigeren
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
