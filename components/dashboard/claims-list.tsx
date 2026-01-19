"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Plus } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { EscalationBadgeCompact } from "./escalation-badge"

interface Claim {
  id: string
  naam: string
  kenteken_tegenpartij: string
  datum_ongeval: string
  status: string
  escalatie_reden?: string | null
  escalatie_opgelost?: boolean
  created_at: string
  updated_at: string
}

interface ClaimsListProps {
  claims: Claim[]
}

export function ClaimsList({ claims: initialClaims }: ClaimsListProps) {
  const [claims, setClaims] = useState<Claim[]>(initialClaims)

  useEffect(() => {
    const supabase = createClient()

    // Real-time subscription voor status updates
    const channel = supabase
      .channel('claims-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'claims',
        },
        (payload) => {
          console.log('Real-time update:', payload)
          
          if (payload.eventType === 'UPDATE') {
            // Update de claim in de lijst
            setClaims(prev => 
              prev.map(claim => 
                claim.id === payload.new.id 
                  ? { ...claim, ...payload.new }
                  : claim
              )
            )
            
            // Toon notificatie bij status wijziging
            if (payload.old && payload.old.status !== payload.new.status) {
              toast.info("Claim status gewijzigd", {
                description: `Status: ${getStatusLabel(payload.new.status)}`
              })
            }
          } else if (payload.eventType === 'INSERT') {
            // Voeg nieuwe claim toe
            setClaims(prev => [payload.new as Claim, ...prev])
            toast.success("Nieuwe claim toegevoegd")
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      nieuw: "Nieuw",
      in_behandeling: "🤖 AI in behandeling",
      wacht_op_info: "⏳ Wacht op info",
      aansprakelijkheidsbrief_verzonden: "✉️ Brief verzonden",
      in_onderhandeling: "💬 In onderhandeling",
      afgerond: "✅ Afgerond",
      geweigerd: "❌ Geweigerd",
      geannuleerd: "🚫 Geannuleerd",
      escalated: "⚠️ Handmatige aandacht",
    }
    return labels[status] || status
  }

  const getStatusBadgeVariant = (status: string) => {
    const variants: { [key: string]: any } = {
      nieuw: "default",
      in_behandeling: "secondary",
      wacht_op_info: "warning",
      aansprakelijkheidsbrief_verzonden: "secondary",
      in_onderhandeling: "warning",
      afgerond: "success",
      geweigerd: "destructive",
      geannuleerd: "outline",
      escalated: "destructive",
    }
    return variants[status] || "default"
  }

  if (claims.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="rounded-full bg-muted p-4 inline-block">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Nog geen claims</h3>
              <p className="text-muted-foreground mb-4">
                Je hebt nog geen schade claims ingediend.
              </p>
              <Link href="/claim-indienen">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Eerste Claim Indienen
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {claims.map((claim) => (
        <Card key={claim.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex items-center gap-2">
                <CardTitle className="text-lg">
                  Claim #{claim.id.substring(0, 8)}
                </CardTitle>
                <EscalationBadgeCompact 
                  status={claim.status}
                  escalatieReden={claim.escalatie_reden}
                />
              </div>
              <div className="flex items-center gap-2">
                <CardDescription className="text-right mr-3">
                  Ingediend op {formatDate(claim.created_at)}
                </CardDescription>
                <Badge variant={getStatusBadgeVariant(claim.status)}>
                  {getStatusLabel(claim.status)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Naam</p>
                <p className="font-medium">{claim.naam}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kenteken Tegenpartij</p>
                <p className="font-medium">{claim.kenteken_tegenpartij}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Datum Ongeval</p>
                <p className="font-medium">{formatDate(claim.datum_ongeval)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/claim/${claim.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Details Bekijken
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
