"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileImage, FileText, Loader2, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface DocumentUploadProps {
  claimId: string
  onUploadComplete?: (documentIds: string[]) => void
}

interface UploadedFile {
  id?: string
  file: File
  status: 'pending' | 'uploading' | 'analyzing' | 'complete' | 'error'
  progress: number
  error?: string
  aiAnalysis?: any
}

export function DocumentUpload({ claimId, onUploadComplete }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: 'pending' as const,
      progress: 0,
    }))
    setFiles(prev => [...prev, ...newFiles])
    setAnalysisComplete(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadAndAnalyze = async () => {
    if (files.length === 0) return

    const documentIds: string[] = []
    
    // Upload each file
    for (let i = 0; i < files.length; i++) {
      const uploadFile = files[i]
      if (uploadFile.status === 'complete') continue

      try {
        // Update status to uploading
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'uploading', progress: 0 } : f
        ))

        // Create form data
        const formData = new FormData()
        formData.append('file', uploadFile.file)
        formData.append('claimId', claimId)
        formData.append('uploadedBy', 'claimer')

        // Upload to API
        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const result = await response.json()
        documentIds.push(result.documentId)

        // Update progress
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, id: result.documentId, status: 'analyzing', progress: 50 } : f
        ))

      } catch (error) {
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'error', error: 'Upload mislukt' } : f
        ))
        console.error('Upload error:', error)
      }
    }

    // Trigger AI reanalysis if we have uploaded documents
    if (documentIds.length > 0) {
      setIsAnalyzing(true)
      
      try {
        const reanalysisResponse = await fetch('/api/agent/reanalyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimId,
            reason: `${documentIds.length} nieuwe document(en) toegevoegd`,
            triggeredBy: 'claimer_upload',
            newDocumentIds: documentIds,
            includePhotos: true,
          }),
        })

        if (reanalysisResponse.ok) {
          const result = await reanalysisResponse.json()
          
          // Update all files to complete
          setFiles(prev => prev.map(f => 
            f.id && documentIds.includes(f.id) 
              ? { ...f, status: 'complete', progress: 100, aiAnalysis: result.result }
              : f
          ))

          toast.success('📊 Documenten verwerkt!', {
            description: `${documentIds.length} document(en) geanalyseerd en toegevoegd aan uw dossier.`,
          })

          // Show damage estimate if available
          if (result.result?.damage_estimate) {
            toast.info('💰 Schade-inschatting bijgewerkt', {
              description: `€${result.result.damage_estimate.min} - €${result.result.damage_estimate.max}`,
            })
          }

          setAnalysisComplete(true)
          onUploadComplete?.(documentIds)
        } else {
          throw new Error('Reanalysis failed')
        }
      } catch (error) {
        console.error('Reanalysis error:', error)
        toast.error('Analyse mislukt', {
          description: 'Documenten zijn geüpload maar analyse is mislukt. Probeer later opnieuw.',
        })
        
        // Mark files as complete (uploaded but not analyzed)
        setFiles(prev => prev.map(f => 
          f.id && documentIds.includes(f.id) 
            ? { ...f, status: 'complete', progress: 100 }
            : f
        ))
      } finally {
        setIsAnalyzing(false)
      }
    }
  }

  const pendingCount = files.filter(f => f.status === 'pending').length
  const uploadingCount = files.filter(f => f.status === 'uploading' || f.status === 'analyzing').length
  const completeCount = files.filter(f => f.status === 'complete').length

  return (
    <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Extra Documenten Toevoegen
        </CardTitle>
        <CardDescription>
          Upload extra foto's of documenten voor uw claim. Ons AI-systeem analyseert deze automatisch.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop de bestanden hier...</p>
          ) : (
            <div>
              <p className="font-medium mb-1">Sleep bestanden hierheen of klik om te uploaden</p>
              <p className="text-sm text-muted-foreground">
                Foto's (JPG, PNG) of PDF documenten • Maximaal 10 bestanden • 10MB per bestand
              </p>
            </div>
          )}
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border",
                  file.status === 'complete' && "bg-green-50 border-green-200",
                  file.status === 'error' && "bg-red-50 border-red-200",
                  file.status === 'analyzing' && "bg-blue-50 border-blue-200",
                )}
              >
                {/* Icon */}
                {file.file.type.startsWith('image/') ? (
                  <FileImage className="h-5 w-5 text-blue-500 flex-shrink-0" />
                ) : (
                  <FileText className="h-5 w-5 text-orange-500 flex-shrink-0" />
                )}
                
                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    {file.status === 'analyzing' && ' • AI analyseert...'}
                    {file.status === 'complete' && ' • ✓ Verwerkt'}
                    {file.status === 'error' && ` • ❌ ${file.error}`}
                  </p>
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
                  {file.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {(file.status === 'uploading' || file.status === 'analyzing') && (
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                  )}
                  {file.status === 'complete' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar during analysis */}
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                AI analyseert documenten...
              </span>
              <span className="text-muted-foreground">Even geduld a.u.b.</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>
        )}

        {/* Analysis complete message */}
        {analysisComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Analyse voltooid!</p>
                <p className="text-sm text-green-700">
                  Uw documenten zijn verwerkt en uw dossier is bijgewerkt. U ontvangt een 
                  bevestigingsmail met de details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload button */}
        {pendingCount > 0 && (
          <Button 
            onClick={uploadAndAnalyze} 
            className="w-full"
            disabled={isAnalyzing || uploadingCount > 0}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyseren...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {pendingCount} {pendingCount === 1 ? 'document' : 'documenten'} uploaden & analyseren
              </>
            )}
          </Button>
        )}

        {/* Help text */}
        <p className="text-xs text-muted-foreground text-center">
          💡 Tip: Voeg foto's toe van de schade voor een snellere en nauwkeurigere inschatting
        </p>
      </CardContent>
    </Card>
  )
}
