"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, Mail } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"

interface ChecklistDownloadProps {
  title: string
  description: string
  checklistItems: string[]
}

export function ChecklistDownload({ title, description, checklistItems }: ChecklistDownloadProps) {
  const [email, setEmail] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Vul een geldig e-mailadres in")
      return
    }

    setIsDownloading(true)

    try {
      // Generate printable checklist page
      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        toast.error("Popup geblokkeerd. Sta popups toe voor deze site.")
        setIsDownloading(false)
        return
      }

      // Create printable HTML
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20mm; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
              line-height: 1.6;
            }
            h1 {
              color: #2563eb;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .checklist-item {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              padding: 12px;
              margin-bottom: 8px;
              background: #f8fafc;
              border-left: 4px solid #2563eb;
              border-radius: 4px;
            }
            .checkbox {
              width: 20px;
              height: 20px;
              border: 2px solid #2563eb;
              border-radius: 4px;
              margin-top: 2px;
              flex-shrink: 0;
            }
            .item-text {
              flex: 1;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #64748b;
              font-size: 14px;
            }
            .print-button {
              display: inline-block;
              background: #2563eb;
              color: white;
              padding: 12px 24px;
              border-radius: 6px;
              text-decoration: none;
              margin: 20px 0;
              border: none;
              cursor: pointer;
              font-size: 16px;
            }
            .print-button:hover {
              background: #1d4ed8;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p style="font-size: 18px; color: #475569; margin-bottom: 30px;">${description}</p>
          
          <div class="checklist">
            ${checklistItems.map(item => `
              <div class="checklist-item">
                <div class="checkbox"></div>
                <div class="item-text">${item}</div>
              </div>
            `).join('')}
          </div>

          <div class="no-print" style="text-align: center;">
            <button class="print-button" onclick="window.print()">
              Print Checklist
            </button>
          </div>

          <div class="footer">
            <p><strong>Autoschadebureau.nl</strong> | Gratis Autoschade Verhalen</p>
            <p>info@autoschadebureau.nl | 085 060 5357</p>
            <p style="margin-top: 10px; font-size: 12px;">
              Deze checklist is gratis te gebruiken. Voor vragen of hulp bij uw autoschade claim, neem contact met ons op.
            </p>
          </div>
        </body>
        </html>
      `

      printWindow.document.write(html)
      printWindow.document.close()

      toast.success("Checklist geopend! Klik op 'Print' of sla op als PDF.", {
        duration: 5000
      })

      // In production: send email to backend for lead capture
      console.log("Lead captured:", email)

    } catch (error) {
      console.error("Download error:", error)
      toast.error("Er ging iets mis. Probeer het opnieuw.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview van checklist items */}
        <div className="bg-white rounded-lg p-4 border max-h-60 overflow-y-auto">
          <p className="text-sm font-semibold mb-3 text-muted-foreground">Preview:</p>
          <ul className="space-y-2">
            {checklistItems.slice(0, 5).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            {checklistItems.length > 5 && (
              <li className="text-sm text-muted-foreground italic">
                ... en {checklistItems.length - 5} meer items
              </li>
            )}
          </ul>
        </div>

        {/* Email input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Vul uw e-mail in voor de gratis download:
          </label>
          <Input
            id="email"
            type="email"
            placeholder="uw@email.nl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
          />
        </div>

        {/* Download button */}
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className="w-full"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5" />
          {isDownloading ? "Bezig..." : "Download Gratis Checklist (PDF)"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          ✅ 100% Gratis • ✅ Geen spam • ✅ Direct beschikbaar
        </p>
      </CardContent>
    </Card>
  )
}
