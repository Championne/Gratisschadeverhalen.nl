"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Trash2, 
  ExternalLink,
  Loader2,
  File
} from "lucide-react"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Document {
  id: string
  file_name: string
  file_type: string
  file_size: number
  file_url: string
  document_type: string
  description: string | null
  uploaded_by_email: string | null
  uploaded_at: string
}

interface DocumentListProps {
  documents: Document[]
  onDelete?: () => void
}

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  schadeformulier: '📋 Schadeformulier',
  foto_schade: '📸 Foto Schade',
  offerte: '💰 Offerte',
  factuur: '🧾 Factuur',
  brief: '✉️ Brief',
  overig: '📎 Overig',
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  const handleDownload = async (doc: Document) => {
    try {
      setDownloadingId(doc.id)
      toast.loading("Bestand downloaden...", { id: "download" })

      // Fetch the file from Vercel Blob
      const response = await fetch(doc.file_url)
      const blob = await response.blob()

      // Create a temporary URL and trigger download
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = doc.file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.dismiss("download")
      toast.success("Download gestart")
    } catch (error) {
      console.error('Download error:', error)
      toast.dismiss("download")
      toast.error('Fout bij downloaden van document')
    } finally {
      setDownloadingId(null)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleDeleteClick = (doc: Document) => {
    setDocumentToDelete(doc)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return

    try {
      setDeletingId(documentToDelete.id)
      toast.loading("Document verwijderen...", { id: "delete" })

      const response = await fetch(`/api/admin/documents/${documentToDelete.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      toast.dismiss("delete")

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Verwijderen mislukt')
      }

      toast.success("Document verwijderd")
      onDelete?.()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Fout bij verwijderen van document')
    } finally {
      setDeletingId(null)
      setDeleteDialogOpen(false)
      setDocumentToDelete(null)
    }
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Nog geen documenten geüpload voor deze claim
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Documenten ({documents.length})</CardTitle>
          <CardDescription>
            Alle geüploade documenten voor deze claim
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getFileIcon(doc.file_type)}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">
                        {doc.file_name}
                      </p>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {DOCUMENT_TYPE_LABELS[doc.document_type] || doc.document_type}
                      </Badge>
                    </div>
                    
                    {doc.description && (
                      <p className="text-sm text-muted-foreground mb-1">
                        {doc.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(new Date(doc.uploaded_at), {
                          addSuffix: true,
                          locale: nl
                        })}
                      </span>
                      {doc.uploaded_by_email && (
                        <>
                          <span>•</span>
                          <span>{doc.uploaded_by_email}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                  >
                    <a 
                      href={doc.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(doc)}
                    disabled={downloadingId === doc.id}
                  >
                    {downloadingId === doc.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Download className="h-3 w-3" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteClick(doc)}
                    disabled={deletingId === doc.id}
                  >
                    {deletingId === doc.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3 text-destructive" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Document verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je <strong>{documentToDelete?.file_name}</strong> wilt verwijderen? 
              Deze actie kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
