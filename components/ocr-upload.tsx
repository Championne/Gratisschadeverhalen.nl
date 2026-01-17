"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Loader2, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Tesseract from "tesseract.js"

interface OCRUploadProps {
  onFileSelected: (file: File | null) => void
  onOCRComplete: (data: any) => void
}

export function OCRUpload({ onFileSelected, onOCRComplete }: OCRUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [ocrResult, setOcrResult] = useState<any>(null)

  const processOCR = async (file: File) => {
    setIsProcessing(true)
    setOcrProgress(0)

    try {
      const result = await Tesseract.recognize(
        file,
        'nld', // Nederlands
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100))
            }
          },
        }
      )

      const text = result.data.text
      
      // Parse relevante informatie uit de OCR tekst
      const extractedData = extractDataFromOCR(text)
      
      setOcrResult(extractedData)
      onOCRComplete(extractedData)

      toast.success("OCR voltooid!", {
        description: `${Object.keys(extractedData).length} velden gevonden`
      })

    } catch (error) {
      console.error("OCR Error:", error)
      toast.error("OCR mislukt", {
        description: "Probeer een betere kwaliteit scan of foto"
      })
    } finally {
      setIsProcessing(false)
      setOcrProgress(0)
    }
  }

  const extractDataFromOCR = (text: string): any => {
    const data: any = {}
    
    // Datum extractie (verschillende formaten)
    const datePatterns = [
      /datum[:\s]+(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i,
      /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/,
    ]
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern)
      if (match) {
        data.datum = match[1]
        break
      }
    }

    // Kenteken extractie (Nederlands formaat)
    const kentekenPattern = /([A-Z]{1,3}[-\s]?\d{1,3}[-\s]?[A-Z]{1,3})/gi
    const kentekens = text.match(kentekenPattern)
    if (kentekens && kentekens.length > 0) {
      data.kenteken_tegenpartij = kentekens[0].replace(/\s/g, '-')
    }

    // Plaats extractie
    const plaatsPattern = /plaats[:\s]+([a-zA-Z\s]+)/i
    const plaatsMatch = text.match(plaatsPattern)
    if (plaatsMatch) {
      data.plaats = plaatsMatch[1].trim()
    }

    // Naam extractie (simpel, kan verbeterd worden)
    const naamPattern = /naam[:\s]+([A-Z][a-z]+\s+[A-Z][a-z]+)/i
    const naamMatch = text.match(naamPattern)
    if (naamMatch) {
      data.naam_tegenpartij = naamMatch[1].trim()
    }

    // Confidence score berekenen
    const fieldsFound = Object.keys(data).length
    data.confidence = Math.min(95, fieldsFound * 25)

    // Volledige tekst ook toevoegen voor handmatige review
    data.raw_text = text
    data.beschrijving = `OCR geëxtraheerde tekst:\n${text.substring(0, 500)}`

    return data
  }

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      onFileSelected(selectedFile)
      
      // Start OCR automatisch
      await processOCR(selectedFile)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'application/pdf': [] },
    multiple: false,
    maxFiles: 1,
  })

  const removeFile = () => {
    setFile(null)
    setOcrResult(null)
    onFileSelected(null)
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <FileText className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg font-medium">Drop het schadeformulier hier...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">
                Upload Europees Schadeformulier
              </p>
              <p className="text-sm text-muted-foreground">
                Sleep het bestand hierheen of klik om te uploaden
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                OCR zal automatisch gegevens extraheren
              </p>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {isProcessing ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : ocrResult ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
                <div>
                  <CardTitle className="text-base">{file.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {(file.size / 1024).toFixed(2)} KB
                  </CardDescription>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removeFile}
                disabled={isProcessing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {isProcessing && (
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">OCR verwerking...</span>
                  <span className="font-medium">{ocrProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${ocrProgress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          )}

          {ocrResult && (
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  OCR Succesvol
                </p>
                <div className="bg-muted p-3 rounded text-sm space-y-1">
                  <p><strong>Gevonden velden:</strong></p>
                  {Object.entries(ocrResult).map(([key, value]) => {
                    if (key === 'raw_text' || key === 'beschrijving') return null
                    return (
                      <p key={key} className="text-muted-foreground">
                        • {key}: {String(value)}
                      </p>
                    )
                  })}
                  {ocrResult.confidence && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Betrouwbaarheid: {ocrResult.confidence}%
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Het formulier is automatisch vooringevuld. Controleer de gegevens.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}
