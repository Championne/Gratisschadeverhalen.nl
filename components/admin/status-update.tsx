"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface AdminStatusUpdateProps {
  claimId: string
  currentStatus: string
  onStatusUpdated?: () => void
}

const statusOptions = [
  { value: "nieuw", label: "Nieuw" },
  { value: "in_behandeling", label: "In Behandeling" },
  { value: "afgerond", label: "Afgerond" },
  { value: "geannuleerd", label: "Geannuleerd" },
]

export function AdminStatusUpdate({ claimId, currentStatus }: AdminStatusUpdateProps) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusUpdate = async () => {
    if (status === currentStatus && !note) {
      toast.error("Geen wijzigingen om op te slaan")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/claims/${claimId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      toast.success("Status succesvol bijgewerkt")
      setNote("")
      router.refresh()
      
      // Call the callback to refresh audit logs
      if (onStatusUpdated) {
        onStatusUpdated()
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Fout bij bijwerken status")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Wijzigen</CardTitle>
        <CardDescription>
          Update de status van deze claim
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status">Nieuwe Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecteer status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Notitie (optioneel)</Label>
          <Textarea
            id="note"
            placeholder="Reden voor statuswijziging..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>

        <Button 
          onClick={handleStatusUpdate} 
          disabled={isLoading || (status === currentStatus && !note)}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Opslaan...
            </>
          ) : (
            "Status Bijwerken"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
