"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2, FileText, Image, FileCheck } from "lucide-react"
import { toast } from "sonner"

interface DocumentUploadProps {
  claimId: string
  onUploadComplete?: () => void
}

const DOCUMENT_TYPES = [
  { value: 'schadeformulier', label: '📋 Europees Schadeformulier' },
  { value: 'foto_schade', label: '📸 Foto Schade' },
  { value: 'offerte', label: '💰 Reparatie Offerte' },
  { value: 'factuur', label: '🧾 Factuur' },
  { value: 'brief', label: '✉️ Correspondentie' },
  { value: 'overig', label: '📎 Overig' },
]

export function DocumentUpload({ claimId, onUploadComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<string>('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
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
      setFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error("Selecteer een bestand")
      return
    }

    if (!documentType) {
      toast.error("Selecteer een document type")
      return
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      toast.error("Ongeldig bestandstype. Gebruik JPG, PNG, WEBP of PDF")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Bestand te groot. Maximum is 10MB")
      return
    }

    try {
      setIsUploading(true)
      toast.loading("Bestand uploaden...", { id: "upload" })

      const formData = new FormData()
      formData.append('file', file)
      formData.append('claimId', claimId)
      formData.append('documentType', documentType)
      formData.append('description', description)

      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      toast.dismiss("upload")

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload mislukt')
      }

      toast.success("✅ Document succesvol geüpload!")
      
      // Reset form
      setFile(null)
      setDocumentType('')
      setDescription('')
      
      // Notify parent
      onUploadComplete?.()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Fout bij uploaden van document')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Uploaden
        </CardTitle>
        <CardDescription>
          Upload foto's, offertes, facturen of andere documenten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="space-y-2">
              {file ? (
                <>
                  <FileCheck className="h-12 w-12 mx-auto text-green-600" />
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium">
                    Sleep een bestand hierheen of klik om te selecteren
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, WEBP of PDF (max 10MB)
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Document Type */}
        <div className="space-y-2">
          <Label htmlFor="document-type">Document Type *</Label>
          <Select 
            value={documentType} 
            onValueChange={setDocumentType}
            disabled={isUploading}
          >
            <SelectTrigger id="document-type">
              <SelectValue placeholder="Selecteer type document..." />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Beschrijving (optioneel)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Bijv: Schade linkervoor, Offerte van Garage Jansen, etc."
            rows={3}
            disabled={isUploading}
          />
        </div>

        {/* Upload Button */}
        <Button 
          onClick={handleUpload} 
          disabled={!file || !documentType || isUploading}
          className="w-full"
          size="lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploaden...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Document Uploaden
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
