"use client"

import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface DownloadLetterButtonProps {
  claimId: string
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

export function DownloadLetterButton({ claimId, variant = "default", size = "default" }: DownloadLetterButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      toast.loading("📄 PDF wordt gegenereerd...", {
        id: "pdf-download",
      })

      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claimId }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Download PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `aansprakelijkheidsbrief-${claimId.substring(0, 8)}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.dismiss("pdf-download")
      toast.success("✅ PDF gedownload!", {
        description: "De aansprakelijkheidsbrief is opgeslagen"
      })

    } catch (error) {
      console.error('Download error:', error)
      toast.dismiss("pdf-download")
      toast.error("❌ Download mislukt", {
        description: "Probeer het later opnieuw"
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant={variant}
      size={size}
    >
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Genereren...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Brief
        </>
      )}
    </Button>
  )
}
