"use client"

import { useEffect } from "react"

export function BotpressChat() {
  useEffect(() => {
    // Check if scripts already exist
    if (document.getElementById("botpress-inject-script")) {
      return
    }

    // Load the Botpress inject script (v3.5)
    const injectScript = document.createElement("script")
    injectScript.id = "botpress-inject-script"
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.5/inject.js"
    document.body.appendChild(injectScript)

    // Load the Botpress config script
    const configScript = document.createElement("script")
    configScript.id = "botpress-config-script"
    configScript.src = "https://files.bpcontent.cloud/2026/01/24/16/20260124164751-DSHY3PJP.js"
    configScript.defer = true
    document.body.appendChild(configScript)

    return () => {
      // Don't remove on unmount to prevent re-loading issues
    }
  }, [])

  return null
}
