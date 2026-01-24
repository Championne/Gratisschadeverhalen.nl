import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Calendar, MapPin, Car, FileText, User, Shield } from "lucide-react"
import { EscalationBadge } from "./escalation-badge"
import { AuditLogViewer } from "./audit-log-viewer"
import { ClaimEditUser } from "./claim-edit-user"
import { DocumentUpload } from "./document-upload"

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
      letselschade_gedetecteerd: "Letselschade Specialist Ingeschakeld",
      aansprakelijkheidsbrief_verzonden: "Brief Verzonden",
      in_onderhandeling: "In Onderhandeling",
      afgerond: "Afgerond",
      geweigerd: "Geweigerd",
      geannuleerd: "Geannuleerd",
      escalated: "In Review",
    }
    return labels[status] || status
  }

  const getStatusBadgeVariant = (status: string) => {
    const variants: { [key: string]: any } = {
      nieuw: "default",
      in_behandeling: "secondary",
      letselschade_gedetecteerd: "default",
      aansprakelijkheidsbrief_verzonden: "secondary",
      in_onderhandeling: "warning",
      afgerond: "success",
      geweigerd: "destructive",
      geannuleerd: "outline",
      escalated: "warning",
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

      {/* Escalatie Waarschuwing (alleen bij echte problemen, NIET bij letselschade) */}
      {claim.status === 'escalated' && !claim.escalatie_opgelost && claim.escalatie_reden && 
       !claim.escalatie_reden.toLowerCase().includes('letsel') && (
        <Card className="border-orange-300 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900">🔍 In Review</p>
                <p className="text-sm text-orange-700 mt-1">
                  Onze medewerkers bekijken je claim persoonlijk om de beste afhandeling te garanderen.
                </p>
                <p className="text-xs text-orange-600 mt-2">
                  💬 Je hoort binnen 1-2 werkdagen van ons.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Letselschade - Positieve Melding */}
      {(claim.mogelijk_letselschade || claim.status === 'letselschade_gedetecteerd') && (
        <Card className="border-purple-300 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-900 text-lg">✅ Letselschade Specialist Ingeschakeld</p>
                <p className="text-sm text-purple-800 mt-2">
                  We hebben mogelijk letselschade gedetecteerd en schakelen automatisch onze gespecialiseerde partner <strong>Unitas Letselschade</strong> in.
                </p>
                <div className="mt-3 p-3 bg-white/50 rounded-md border border-purple-200">
                  <p className="text-sm text-purple-900 font-medium mb-1">📞 Wat gebeurt er nu?</p>
                  <ul className="text-sm text-purple-800 space-y-1 ml-4 list-disc">
                    <li>Een specialist van Unitas neemt <strong>binnen 24 uur</strong> contact met je op</li>
                    <li>Zij begeleiden je gratis door het hele letselschade traject</li>
                    <li>Wij blijven je schade claim afhandelen</li>
                  </ul>
                </div>
                <p className="text-xs text-purple-600 mt-2 italic">
                  💡 Dit is een extra service - je betaalt hier niets voor!
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

      {/* Gegevens Aanvullen */}
      <ClaimEditUser claim={claim} />

      {/* Extra Documenten Uploaden */}
      <DocumentUpload claimId={claim.id} />

      {/* Audit Trail (Juridische Traceerbaarheid) */}
      <AuditLogViewer claimId={claim.id} />
    </div>
  )
}
