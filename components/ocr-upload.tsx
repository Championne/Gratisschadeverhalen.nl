"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, Loader2, XCircle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"

interface OCRUploadProps {
  onOCRComplete: (data: any) => void
}

export function OCRUpload({ onOCRComplete }: OCRUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const handleFileSelect = async (selectedFile: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Ongeldig bestandstype", {
        description: "Upload een JPG, PNG, WEBP of PDF bestand"
      })
      return
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("Bestand te groot", {
        description: "Maximum bestandsgrootte is 10MB"
      })
      return
    }

    setFile(selectedFile)
    await processOCR(selectedFile)
  }

  const processOCR = async (fileToProcess: File) => {
    setIsProcessing(true)

    try {
      toast.loading("🔍 OCR verwerking gestart...", {
        id: "ocr-processing",
        description: "Dit kan 5-10 seconden duren"
      })

      const formData = new FormData()
      formData.append('file', fileToProcess)

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      toast.dismiss("ocr-processing")

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'OCR verwerking mislukt')
      }

      toast.success("✅ OCR succesvol!", {
        description: `Confidence: ${data.confidence}% - Gegevens zijn ingevuld`
      })

      // Pass extracted data to parent component
      onOCRComplete({
        ...data.extracted_data,
        raw_text: data.raw_text,
        confidence: data.confidence,
        file_url: data.file_url,
      })

    } catch (error: any) {
      console.error('OCR Error:', error)
      toast.dismiss("ocr-processing")
      toast.error("❌ OCR mislukt", {
        description: error.message || "Probeer het opnieuw of vul handmatig in"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setIsProcessing(false)
  }

  return (
    <Card className={`${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <CardContent className="p-6">
        {!file ? (
          <div className="space-y-4">
            {/* Grote klikbare upload area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer block"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 active:scale-[0.99]">
                  <div className="flex flex-col items-center gap-4 pointer-events-none">
                    <div className="rounded-full bg-blue-100 p-4">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Upload Europees Schadeformulier
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Klik overal in dit venster</strong> of sleep een bestand hiernaartoe
                      </p>
                      <p className="text-xs text-gray-500">
                        Ondersteunde formaten: JPG, PNG, WEBP, PDF (max 10MB)
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-600">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm font-medium">Klik om bestand te selecteren</span>
                    </div>
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              {isProcessing ? (
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600" />
              )}
            </div>

            {isProcessing && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  🔍 OCR verwerking bezig...
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Dit kan 5-10 seconden duren
                </p>
              </div>
            )}

            {!isProcessing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetUpload}
                className="w-full"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Ander Bestand Uploaden
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
