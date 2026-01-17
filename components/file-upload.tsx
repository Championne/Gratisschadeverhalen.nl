"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
}

export function FileUpload({ onFilesSelected, accept = "image/*", multiple = true, maxFiles = 10 }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }, [files, maxFiles, onFilesSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple,
    maxFiles,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop de bestanden hier...</p>
        ) : (
          <div>
            <p className="text-lg font-medium mb-2">
              Sleep bestanden hierheen of klik om te uploaden
            </p>
            <p className="text-sm text-muted-foreground">
              {multiple ? `Maximaal ${maxFiles} bestanden` : "1 bestand"}
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg border bg-muted overflow-hidden">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
