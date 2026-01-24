"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    botpress?: {
      init: (config: { configUrl: string }) => void
    }
  }
}

export function BotpressChat() {
  useEffect(() => {
    // Load the Botpress script
    const script = document.createElement("script")
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js"
    script.async = true
    
    script.onload = () => {
      // Initialize once script is loaded
      if (window.botpress) {
        window.botpress.init({
          configUrl: "https://files.bpcontent.cloud/2026/01/24/16/20260124164752-PSUJJVBF.json"
        })
      }
    }
    
    document.body.appendChild(script)
    
    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
