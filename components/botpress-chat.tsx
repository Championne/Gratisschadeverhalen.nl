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
    // Check if script already exists
    if (document.getElementById("botpress-webchat-script")) {
      return
    }

    // Load the Botpress script (v3.3 - latest version)
    const script = document.createElement("script")
    script.id = "botpress-webchat-script"
    script.src = "https://cdn.botpress.cloud/webchat/v3.3/inject.js"
    script.async = true
    
    script.onload = () => {
      // Wait a bit for botpress to initialize
      setTimeout(() => {
        if (window.botpress) {
          window.botpress.init({
            configUrl: "https://files.bpcontent.cloud/2026/01/24/16/20260124164752-PSUJJVBF.json"
          })
        } else {
          console.error("Botpress not available after script load")
        }
      }, 100)
    }

    script.onerror = () => {
      console.error("Failed to load Botpress script")
    }
    
    document.body.appendChild(script)
    
    return () => {
      // Don't remove on unmount to prevent re-loading issues
    }
  }, [])

  return null
}
