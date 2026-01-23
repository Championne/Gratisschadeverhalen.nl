"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Plus } from "lucide-react"

interface Note {
  id: string
  details: {
    comment?: string
  }
  created_at: string
  performed_by: string
}

interface AdminNotesProps {
  claimId: string
  onNoteAdded?: () => void
}

export function AdminNotes({ claimId, onNoteAdded }: AdminNotesProps) {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [claimId])

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/admin/claims/${claimId}/notes`)
      if (response.ok) {
        const data = await response.json()
        setNotes(data.notes || [])
      }
    } catch (error) {
      console.error("Error fetching notes:", error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) {
      toast.error("Notitie kan niet leeg zijn")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/claims/${claimId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      })

      if (!response.ok) {
        throw new Error("Failed to add note")
      }

      const data = await response.json()
      setNotes([data.note, ...notes])
      setNewNote("")
      toast.success("Notitie toegevoegd")
      
      // Refresh the page to update server components
      router.refresh()
      
      // Call the callback to refresh audit logs (with small delay to ensure refresh completes)
      if (onNoteAdded) {
        setTimeout(() => {
          onNoteAdded()
        }, 500)
      }
    } catch (error) {
      console.error("Error adding note:", error)
      toast.error("Fout bij toevoegen notitie")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interne Notities</CardTitle>
        <CardDescription>
          Voeg notities toe zichtbaar voor admins
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Nieuwe notitie..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
          />
          <Button 
            onClick={handleAddNote} 
            disabled={isLoading || !newNote.trim()}
            className="w-full"
            size="sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opslaan...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Notitie Toevoegen
              </>
            )}
          </Button>
        </div>

        {isFetching ? (
          <div className="text-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          </div>
        ) : notes.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">
            Nog geen notities
          </p>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="text-sm border-l-2 border-primary pl-3 py-2">
                  <p className="whitespace-pre-wrap">
                    {typeof note.details === 'object' && note.details.comment 
                      ? note.details.comment 
                      : typeof note.details === 'string' 
                        ? note.details 
                        : 'Geen notitie tekst'
                    }
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(new Date(note.created_at), {
                      addSuffix: true,
                      locale: nl
                    })} • {note.performed_by}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
