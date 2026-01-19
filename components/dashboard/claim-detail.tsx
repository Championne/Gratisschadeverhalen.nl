import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Calendar, MapPin, Car, FileText, User, Shield } from "lucide-react"
import { EscalationBadge } from "./escalation-badge"
import { AuditLogViewer } from "./audit-log-viewer"

interface Claim {
  id: string
  naam: string
  email: string
  telefoon?: string
  datum_ongeval: string
  plaats_ongeval?: string
  beschrijving: string
  kenteken_tegenpartij: string
  naam_tegenpartij?: string
  verzekeraar_tegenpartij?: string
  polisnummer_tegenpartij?: string
  status: string
  mogelijk_letselschade: boolean
  escalatie_reden?: string | null
  escalatie_opgelost?: boolean
  ocr_confidence?: number | null
  ai_notes?: string
  created_at: string
  updated_at: string
}

interface ClaimDetailProps {
  claim: Claim
}

export function ClaimDetail({ claim }: ClaimDetailProps) {
  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      nieuw: "Nieuw",
      in_behandeling: "In Behandeling",
      aansprakelijkheidsbrief_verzonden: "Brief Verzonden",
      in_onderhandeling: "In Onderhandeling",
      afgerond: "Afgerond",
      geweigerd: "Geweigerd",
      geannuleerd: "Geannuleerd",
      escalated: "Escalatie Vereist",
    }
    return labels[status] || status
  }

  const getStatusBadgeVariant = (status: string) => {
    const variants: { [key: string]: any } = {
      nieuw: "default",
      in_behandeling: "secondary",
      aansprakelijkheidsbrief_verzonden: "secondary",
      in_onderhandeling: "warning",
      afgerond: "success",
      geweigerd: "destructive",
      geannuleerd: "outline",
      escalated: "destructive",
    }
    return variants[status] || "default"
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Claim #{claim.id.substring(0, 8)}</CardTitle>
              <CardDescription>
                Ingediend op {formatDate(claim.created_at)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusBadgeVariant(claim.status)}>
                {getStatusLabel(claim.status)}
              </Badge>
              <EscalationBadge 
                status={claim.status}
                escalatieReden={claim.escalatie_reden}
                escalatieOpgelost={claim.escalatie_opgelost}
                size="md"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Escalatie Waarschuwing */}
      {claim.status === 'escalated' && !claim.escalatie_opgelost && claim.escalatie_reden && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">⚠️ Handmatige Aandacht Vereist</p>
                <p className="text-sm text-red-700 mt-1">
                  {claim.escalatie_reden}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Onze medewerkers nemen contact met je op voor verdere afhandeling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Letselschade Warning */}
      {claim.mogelijk_letselschade && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Mogelijke Letselschade</p>
                <p className="text-sm text-red-700 mt-1">
                  We hebben indicaties van letselschade gevonden. Overweeg contact op te nemen met een letselschade specialist.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ongeval Details */}
      <Card>
        <CardHeader>
          <CardTitle>Ongeval Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Datum Ongeval</p>
                <p className="font-medium">{formatDate(claim.datum_ongeval)}</p>
              </div>
            </div>
            {claim.plaats_ongeval && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Plaats</p>
                  <p className="font-medium">{claim.plaats_ongeval}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Beschrijving</p>
              <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">
                {claim.beschrijving}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tegenpartij Details */}
      <Card>
        <CardHeader>
          <CardTitle>Tegenpartij Gegevens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Kenteken</p>
              <p className="font-medium text-lg">{claim.kenteken_tegenpartij}</p>
            </div>
          </div>

          {claim.naam_tegenpartij && (
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Naam Bestuurder</p>
                <p className="font-medium">{claim.naam_tegenpartij}</p>
              </div>
            </div>
          )}

          {claim.verzekeraar_tegenpartij && (
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Verzekeraar</p>
                <p className="font-medium">{claim.verzekeraar_tegenpartij}</p>
                {claim.polisnummer_tegenpartij && (
                  <p className="text-sm text-muted-foreground">
                    Polis: {claim.polisnummer_tegenpartij}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analyse */}
      {claim.ai_notes && (
        <Card>
          <CardHeader>
            <CardTitle>🤖 AI Agent Analyse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
                {claim.ai_notes}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Gegevens */}
      <Card>
        <CardHeader>
          <CardTitle>Jouw Contactgegevens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Naam</p>
            <p className="font-medium">{claim.naam}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{claim.email}</p>
          </div>
          {claim.telefoon && (
            <div>
              <p className="text-sm text-muted-foreground">Telefoon</p>
              <p className="font-medium">{claim.telefoon}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Trail (Juridische Traceerbaarheid) */}
      <AuditLogViewer claimId={claim.id} />
    </div>
  )
}
