"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import { OCRUpload } from "@/components/ocr-upload"
import { VoiceInput } from "@/components/voice-input"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

interface ClaimFormData {
  naam: string
  email: string
  telefoon: string
  kenteken_tegenpartij: string
  datum_ongeval: string
  plaats_ongeval: string
  beschrijving: string
  naam_tegenpartij?: string
  verzekeraar_tegenpartij?: string
}

export function ClaimForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ClaimFormData>({
    naam: "",
    email: "",
    telefoon: "",
    kenteken_tegenpartij: "",
    datum_ongeval: "",
    plaats_ongeval: "",
    beschrijving: "",
    naam_tegenpartij: "",
    verzekeraar_tegenpartij: "",
  })
  const [fotos, setFotos] = useState<File[]>([])
  const [schadeformulier, setSchadeformulier] = useState<File | null>(null)
  const [ocrData, setOcrData] = useState<any>(null)
  const [letselWarning, setLetselWarning] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Check voor letselschade keywords in beschrijving
    if (name === "beschrijving") {
      checkForLetselschade(value)
    }
  }

  const checkForLetselschade = (text: string) => {
    const letselKeywords = [
      "pijn", "whiplash", "letsel", "hoofdpijn", "ziekenhuis", 
      "arts", "dokter", "nekklachten", "rugklachten", "gewond",
      "ambulance", "medisch", "verwonding", "bloeding"
    ]
    
    const lowerText = text.toLowerCase()
    const hasLetselKeyword = letselKeywords.some(keyword => lowerText.includes(keyword))
    setLetselWarning(hasLetselKeyword)
  }

  const handleOCRComplete = (data: any) => {
    setOcrData(data)
    
    // Pre-fill formulier met OCR data
    if (data.datum) {
      setFormData(prev => ({ ...prev, datum_ongeval: data.datum }))
    }
    if (data.plaats) {
      setFormData(prev => ({ ...prev, plaats_ongeval: data.plaats }))
    }
    if (data.kenteken_tegenpartij) {
      setFormData(prev => ({ ...prev, kenteken_tegenpartij: data.kenteken_tegenpartij }))
    }
    if (data.naam_tegenpartij) {
      setFormData(prev => ({ ...prev, naam_tegenpartij: data.naam_tegenpartij }))
    }
    if (data.beschrijving) {
      const newDescription = formData.beschrijving + "\n\n" + data.beschrijving
      setFormData(prev => ({ ...prev, beschrijving: newDescription }))
      checkForLetselschade(newDescription)
    }

    toast.success("OCR succesvol! Formulier is vooraf ingevuld.", {
      description: "Controleer en pas de gegevens aan indien nodig."
    })
  }

  const handleVoiceInput = (text: string) => {
    setFormData(prev => ({ ...prev, beschrijving: prev.beschrijving + " " + text }))
    checkForLetselschade(formData.beschrijving + " " + text)
  }

  const validateForm = (): boolean => {
    if (!formData.naam || !formData.email || !formData.telefoon) {
      toast.error("Vul alle verplichte velden in", {
        description: "Naam, email en telefoon zijn verplicht."
      })
      return false
    }

    if (!formData.kenteken_tegenpartij || !formData.datum_ongeval || !formData.beschrijving) {
      toast.error("Vul alle verplichte velden in", {
        description: "Kenteken tegenpartij, datum ongeval en beschrijving zijn verplicht."
      })
      return false
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Ongeldig email adres")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // TODO: Upload files naar Supabase Storage
      // TODO: Save claim naar database
      
      // Simuleer API call (vervang dit later met echte Supabase call)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Success!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      toast.success("Claim succesvol ingediend!", {
        description: "We nemen binnen 24 uur contact met je op."
      })

      // Redirect naar success page of login prompt
      setTimeout(() => {
        router.push("/claim-success")
      }, 2000)

    } catch (error) {
      console.error("Error submitting claim:", error)
      toast.error("Er ging iets mis", {
        description: "Probeer het later opnieuw of neem contact met ons op."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Letselschade Warning */}
      {letselWarning && (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Mogelijk Letselschade Gedetecteerd
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Je beschrijving bevat keywords die wijzen op letselschade (zoals pijn, whiplash, ziekenhuis).
              Voor letselschade claims moet je een aparte melding doen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a 
              href="https://unitasletsenschade.nl" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button type="button" variant="default" className="bg-yellow-600 hover:bg-yellow-700">
                Meld Letselschade bij Unitas Letselschade →
              </Button>
            </a>
          </CardContent>
        </Card>
      )}

      {/* Persoonlijke Gegevens */}
      <Card>
        <CardHeader>
          <CardTitle>Jouw Gegevens</CardTitle>
          <CardDescription>Vul je contactgegevens in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="naam">Volledige Naam *</Label>
              <Input
                id="naam"
                name="naam"
                value={formData.naam}
                onChange={handleInputChange}
                placeholder="Jan de Vries"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Adres *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jan@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefoon">Telefoonnummer *</Label>
            <Input
              id="telefoon"
              name="telefoon"
              type="tel"
              value={formData.telefoon}
              onChange={handleInputChange}
              placeholder="06-12345678"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Ongeval Details */}
      <Card>
        <CardHeader>
          <CardTitle>Ongeval Gegevens</CardTitle>
          <CardDescription>Vertel ons wat er gebeurd is</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="datum_ongeval">Datum Ongeval *</Label>
              <Input
                id="datum_ongeval"
                name="datum_ongeval"
                type="date"
                value={formData.datum_ongeval}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plaats_ongeval">Plaats Ongeval</Label>
              <Input
                id="plaats_ongeval"
                name="plaats_ongeval"
                value={formData.plaats_ongeval}
                onChange={handleInputChange}
                placeholder="Amsterdam, Damrak"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="beschrijving">
              Beschrijving van het Ongeval *
              <span className="text-sm text-muted-foreground ml-2">(voice input beschikbaar)</span>
            </Label>
            <div className="relative">
              <Textarea
                id="beschrijving"
                name="beschrijving"
                value={formData.beschrijving}
                onChange={handleInputChange}
                placeholder="Beschrijf wat er precies gebeurd is: hoe werd je aangereden, waar, hoe hard, etc."
                rows={6}
                required
              />
              <div className="absolute bottom-2 right-2">
                <VoiceInput onTranscript={handleVoiceInput} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tegenpartij Gegevens */}
      <Card>
        <CardHeader>
          <CardTitle>Tegenpartij Gegevens</CardTitle>
          <CardDescription>Informatie over de andere partij</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kenteken_tegenpartij">Kenteken Tegenpartij *</Label>
            <Input
              id="kenteken_tegenpartij"
              name="kenteken_tegenpartij"
              value={formData.kenteken_tegenpartij}
              onChange={handleInputChange}
              placeholder="AB-123-CD"
              required
              className="uppercase"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="naam_tegenpartij">Naam Tegenpartij (optioneel)</Label>
              <Input
                id="naam_tegenpartij"
                name="naam_tegenpartij"
                value={formData.naam_tegenpartij}
                onChange={handleInputChange}
                placeholder="Marie Jansen"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verzekeraar_tegenpartij">Verzekeraar Tegenpartij (optioneel)</Label>
              <Input
                id="verzekeraar_tegenpartij"
                name="verzekeraar_tegenpartij"
                value={formData.verzekeraar_tegenpartij}
                onChange={handleInputChange}
                placeholder="Aegon, Centraal Beheer, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Documenten Uploaden</CardTitle>
          <CardDescription>Upload foto&apos;s van de schade en het schadeformulier</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Foto&apos;s van de Schade</Label>
            <FileUpload
              onFilesSelected={setFotos}
              accept="image/*"
              multiple
              maxFiles={10}
            />
            <p className="text-sm text-muted-foreground">
              Upload maximaal 10 foto&apos;s van de schade (voor, achter, zijkant, details)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Europees Schadeformulier (OCR beschikbaar)</Label>
            <OCRUpload
              onFileSelected={setSchadeformulier}
              onOCRComplete={handleOCRComplete}
            />
            <p className="text-sm text-muted-foreground">
              Upload een scan of foto van het Europees Schadeformulier. Ons OCR-systeem vult automatisch velden in.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto px-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Claim wordt ingediend...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-5 w-5" />
              Claim Indienen
            </>
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Door op &quot;Claim Indienen&quot; te klikken, ga je akkoord met onze{" "}
        <a href="/privacy" className="underline hover:text-primary">privacyvoorwaarden</a>.
      </p>
    </form>
  )
}
