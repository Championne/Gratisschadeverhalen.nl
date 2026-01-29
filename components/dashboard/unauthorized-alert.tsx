"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

/**
 * Client component to show toast when redirected due to unauthorized admin access
 */
export function UnauthorizedAlert() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const error = searchParams.get('error')
    
    if (error === 'unauthorized') {
      toast.error("Geen toegang", {
        description: "Je hebt geen admin rechten om deze pagina te bekijken.",
        duration: 5000,
      })
      
      // Clean up URL without reload
      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams])
  
  return null
}
