"use client"

import { useEffect } from "react"

export function BotpressChat() {
  useEffect(() => {
    // Check if scripts already exist
    if (document.getElementById("botpress-inject-script")) {
      return
    }

    // Load chatbot after delay to prioritize main content
    // Using requestIdleCallback for browsers that support it, fallback to setTimeout
    const loadChatbot = () => {
      // Load the Botpress inject script (v3.5)
      const injectScript = document.createElement("script")
      injectScript.id = "botpress-inject-script"
      injectScript.src = "https://cdn.botpress.cloud/webchat/v3.5/inject.js"
      injectScript.async = true
      document.body.appendChild(injectScript)

      // Load the Botpress config script after inject is loaded
      injectScript.onload = () => {
        const configScript = document.createElement("script")
        configScript.id = "botpress-config-script"
        configScript.src = "https://files.bpcontent.cloud/2026/01/24/16/20260124164751-DSHY3PJP.js"
        configScript.defer = true
        document.body.appendChild(configScript)
      }
    }

    // Delay loading by 3 seconds to prioritize main content rendering
    const timeoutId = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadChatbot, { timeout: 5000 })
      } else {
        loadChatbot()
      }
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return null
}
