"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import confetti from "canvas-confetti"
import { submitClaim } from "@/app/actions/submit-claim"
import { FileUpload } from "@/components/file-upload"
import { VoiceInput } from "@/components/voice-input"
import { OCRUpload } from "@/components/ocr-upload"

interface ClaimFormData {
  naam: string
  email: string
  telefoon: string
  kenteken_tegenpartij: string
  datum_ongeval: string
  plaats_ongeval: string  // Verplicht
  beschrijving: string
  naam_tegenpartij: string
  verzekeraar_tegenpartij: string
  polisnummer_tegenpartij?: string  // Enige optionele veld
}

export function ClaimForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [ocrCompleted, setOcrCompleted] = useState(false)
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
    polisnummer_tegenpartij: "",
  })
  const [fotos, setFotos] = useState<File[]>([])
  const [schadeformulier, setSchadeformulier] = useState<File | null>(null)
  const [ocrData, setOcrData] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOCRComplete = (data: any) => {
    console.log('OCR Data ontvangen:', data)
    setOcrData(data)
    setOcrCompleted(true)
    
    // Apply OCR data to form (overschrijft alles)
    const updates: Partial<ClaimFormData> = {}
    
    if (data.datum && data.datum.trim()) {
      console.log('Datum gevonden:', data.datum)
      // Validate and potentially fix date format
      const dateStr = data.datum.trim()
      const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/
      
      if (dateRegex.test(dateStr)) {
        const [_, year, month, day] = dateStr.match(dateRegex)!
        const monthNum = parseInt(month)
        const dayNum = parseInt(day)
        
        // Check if month/day are swapped (common OCR error)
        if (monthNum > 12 && dayNum <= 12) {
          // Swap them
          updates.datum_ongeval = `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`
          toast.info("📅 Datum gecorrigeerd", {
            description: `${dateStr} → ${updates.datum_ongeval} (maand en dag omgewisseld)`
          })
        } else {
          updates.datum_ongeval = dateStr
        }
      } else {
        console.log('Invalid date format:', dateStr)
      }
    }
    
    if (data.kenteken_tegenpartij && data.kenteken_tegenpartij.trim()) {
      updates.kenteken_tegenpartij = data.kenteken_tegenpartij.toUpperCase()
    }
    
    if (data.plaats && data.plaats.trim()) {
      updates.plaats_ongeval = data.plaats
    }
    
    if (data.bestuurder_naam && data.bestuurder_naam.trim()) {
      updates.naam_tegenpartij = data.bestuurder_naam
    }
    
    if (data.verzekeraar && data.verzekeraar.trim()) {
      updates.verzekeraar_tegenpartij = data.verzekeraar
    }
    
    if (data.raw_text && data.raw_text.trim()) {
      const prefix = "OCR geëxtraheerde tekst:\n"
      updates.beschrijving = prefix + data.raw_text.substring(0, 500)
    }
    
    console.log('Updates die toegepast worden:', updates)
    setFormData(prev => ({ ...prev, ...updates }))
    setCurrentStep(2) // Ga naar stap 2

    toast.success("🔍 OCR voltooid!", {
      description: "Vul nu de ontbrekende velden aan"
    })
  }
  
  const handleSkipOCR = () => {
    setCurrentStep(2)
    toast.info("OCR overgeslagen", {
      description: "Vul alle velden handmatig in"
    })
  }

  const handleVoiceInput = (text: string) => {
    setFormData(prev => ({ ...prev, beschrijving: prev.beschrijving + " " + text }))
    checkForLetselschade(formData.beschrijving + " " + text)
  }

  const validateForm = (): boolean => {
    const missingFields: string[] = []
    
    // Check alle verplichte velden
    if (!formData.naam?.trim()) missingFields.push('Naam')
    if (!formData.email?.trim()) missingFields.push('Email')
    if (!formData.telefoon?.trim()) missingFields.push('Telefoonnummer')
    if (!formData.kenteken_tegenpartij?.trim()) missingFields.push('Kenteken tegenpartij')
    if (!formData.datum_ongeval?.trim()) missingFields.push('Datum ongeval')
    if (!formData.beschrijving?.trim()) missingFields.push('Beschrijving')

    if (missingFields.length > 0) {
      toast.error("⚠️ Vul alle verplichte velden in", {
        description: `Ontbreekt: ${missingFields.join(', ')}`,
        duration: 5000,
      })
      
      // Scroll naar eerste lege veld
      const firstMissingField = 
        !formData.naam ? 'naam' :
        !formData.email ? 'email' :
        !formData.telefoon ? 'telefoon' :
        !formData.kenteken_tegenpartij ? 'kenteken_tegenpartij' :
        !formData.datum_ongeval ? 'datum_ongeval' :
        'beschrijving'
      
      const element = document.getElementById(firstMissingField)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      }
      
      return false
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("❌ Ongeldig email adres", {
        description: "Vul een geldig email adres in"
      })
      document.getElementById('email')?.focus()
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Show AI processing toast
      toast.loading("🤖 AI Agent verwerkt je claim...", {
        id: "ai-processing",
        description: "Dit duurt ongeveer 5-10 seconden"
      })

      // Submit claim via server action
      const result = await submitClaim({
        naam: formData.naam,
        email: formData.email,
        telefoon: formData.telefoon,
        kenteken_tegenpartij: formData.kenteken_tegenpartij,
        datum_ongeval: formData.datum_ongeval,
        plaats_ongeval: formData.plaats_ongeval,
        beschrijving: formData.beschrijving,
        naam_tegenpartij: formData.naam_tegenpartij,
        verzekeraar_tegenpartij: formData.verzekeraar_tegenpartij,
        polisnummer_tegenpartij: formData.polisnummer_tegenpartij,
        ocrData: ocrData,
      })

      // Dismiss loading toast
      toast.dismiss("ai-processing")

      if (!result.success) {
        throw new Error(result.error || 'Submission failed')
      }

      // Success!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      toast.success("✅ Claim succesvol ingediend!", {
        description: "Onze AI agent heeft je claim geanalyseerd. Check je email voor updates!"
      })

      // Redirect naar success page
      setTimeout(() => {
        router.push(`/claim-success?claimId=${result.claimId}`)
      }, 2000)

    } catch (error: any) {
      console.error("Error submitting claim:", error)
      toast.dismiss("ai-processing")
      toast.error("❌ Er ging iets mis", {
        description: error.message || "Probeer het later opnieuw of neem contact met ons op."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Progress Bar - Top */}
      <div className="pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${
              currentStep === 1 ? 'bg-blue-600 text-white scale-110' : 'bg-green-600 text-white'
            }`}>
              {currentStep === 1 ? '1' : '✓'}
            </div>
            <div>
              <p className={`font-semibold ${currentStep === 1 ? 'text-blue-600' : 'text-green-600'}`}>
                Stap 1
              </p>
              <p className="text-sm text-gray-600">Upload Formulier</p>
            </div>
          </div>

          {/* Animated Progress Line */}
          <div className="flex-1 mx-6 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 transition-all duration-1000 ease-in-out ${
              currentStep === 2 ? 'w-full' : 'w-0'
            }`}></div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p className={`font-semibold text-right ${currentStep === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                Stap 2
              </p>
              <p className="text-sm text-gray-600 text-right">Controleer Gegevens</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${
              currentStep === 2 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-300 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>
      </div>

      {/* STAP 1: OCR Upload */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <OCRUpload onOCRComplete={handleOCRComplete} />
          
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleSkipOCR}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Overslaan en handmatig invullen
          </Button>
        </div>
      )}

      {/* STAP 2: Formulier Velden */}
      {currentStep === 2 && (
        <>
          {/* OCR Resultaat Info */}
          {ocrCompleted && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="text-green-600">✓</div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">OCR Voltooid!</p>
                    <p className="text-sm text-green-700">
                      Controleer de gegevens en vul eventuele <span className="text-orange-600 font-semibold">verplichte velden (*)</span> aan. Alleen polisnummer is optioneel.
                    </p>
                  </div>
                </div>
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
              <div className="space-y-2">
                <Label htmlFor="naam">Naam *</Label>
                <Input
                  id="naam"
                  name="naam"
                  value={formData.naam}
                  onChange={handleInputChange}
                  placeholder="Jan Jansen"
                  required
                  className={ocrCompleted && !formData.naam ? 'border-orange-400 bg-orange-50' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jan@email.nl"
                  required
                  className={ocrCompleted && !formData.email ? 'border-orange-400 bg-orange-50' : ''}
                />
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
                  className={ocrCompleted && !formData.telefoon ? 'border-orange-400 bg-orange-50' : ''}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ongeval Details */}
          <Card>
            <CardHeader>
              <CardTitle>Ongeval Gegevens</CardTitle>
              <CardDescription>Wat, waar en wanneer gebeurde het ongeval?</CardDescription>
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
                    className={ocrCompleted && !formData.datum_ongeval ? 'border-orange-400 bg-orange-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plaats_ongeval">Plaats Ongeval *</Label>
                  <Input
                    id="plaats_ongeval"
                    name="plaats_ongeval"
                    value={formData.plaats_ongeval}
                    onChange={handleInputChange}
                    placeholder="Amsterdam, Damrak"
                    required
                    className={ocrCompleted && !formData.plaats_ongeval ? 'border-orange-400 bg-orange-50' : ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beschrijving">Beschrijving Ongeval *</Label>
                <div className="flex gap-2">
                  <Textarea
                    id="beschrijving"
                    name="beschrijving"
                    value={formData.beschrijving}
                    onChange={handleInputChange}
                    placeholder="Beschrijf wat er gebeurde..."
                    rows={5}
                    required
                    className={ocrCompleted && !formData.beschrijving ? 'border-orange-400 bg-orange-50' : ''}
                  />
                  <VoiceInput onTranscript={handleVoiceInput} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Beschrijf zo gedetailleerd mogelijk wat er gebeurde
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Tegenpartij Gegevens */}
          <Card>
            <CardHeader>
              <CardTitle>Tegenpartij Gegevens</CardTitle>
              <CardDescription>Gegevens van de andere partij</CardDescription>
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
                  className={`uppercase ${ocrCompleted && !formData.kenteken_tegenpartij ? 'border-orange-400 bg-orange-50' : ''}`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="naam_tegenpartij">Naam Bestuurder *</Label>
                  <Input
                    id="naam_tegenpartij"
                    name="naam_tegenpartij"
                    value={formData.naam_tegenpartij}
                    onChange={handleInputChange}
                    placeholder="Naam bestuurder"
                    required
                    className={ocrCompleted && !formData.naam_tegenpartij ? 'border-orange-400 bg-orange-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verzekeraar_tegenpartij">Verzekeraar Tegenpartij *</Label>
                  <Input
                    id="verzekeraar_tegenpartij"
                    name="verzekeraar_tegenpartij"
                    value={formData.verzekeraar_tegenpartij}
                    onChange={handleInputChange}
                    placeholder="Aegon, Centraal Beheer, etc."
                    required
                    className={ocrCompleted && !formData.verzekeraar_tegenpartij ? 'border-orange-400 bg-orange-50' : ''}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="polisnummer_tegenpartij">Polisnummer Tegenpartij (optioneel)</Label>
                <Input
                  id="polisnummer_tegenpartij"
                  name="polisnummer_tegenpartij"
                  value={formData.polisnummer_tegenpartij}
                  onChange={handleInputChange}
                  placeholder="Bijv. 123456789"
                />
                <p className="text-sm text-muted-foreground">
                  Optioneel: staat vaak op het Europees schadeformulier
                </p>
              </div>
            </CardContent>
          </Card>

          {/* File Uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Foto&apos;s van de Schade</CardTitle>
              <CardDescription>Upload foto&apos;s van de beschadigde auto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Foto&apos;s van de Schade (optioneel)</Label>
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
            </CardContent>
          </Card>

          {/* AI Processing Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="text-blue-600">🤖</div>
                <div>
                  <p className="font-semibold text-blue-900">AI Agent Verwerking</p>
                  <p className="text-sm text-blue-700">
                    Na het indienen analyseert onze AI agent automatisch je claim op letselschade, 
                    aansprakelijkheid en vervolgstappen. Je ontvangt direct een email met de resultaten.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? "Claim wordt ingediend..." : "Claim Indienen"}
          </Button>
        </>
      )}
    </form>
  )
}
