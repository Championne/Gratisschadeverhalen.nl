"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText, Calendar, User, Car, MapPin } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { generateAansprakelijkheidsbrief, downloadPDF } from "@/lib/pdf-generator"
import { toast } from "sonner"

interface ClaimDetailProps {
  claim: any
  statusUpdates: any[]
}

export function ClaimDetail({ claim, statusUpdates }: ClaimDetailProps) {
  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      nieuw: "Nieuw",
      in_behandeling: "In behandeling",
      aansprakelijkheidsbrief_verzonden: "Brief verzonden",
      in_onderhandeling: "In onderhandeling",
      afgerond: "Afgerond",
      geweigerd: "Geweigerd",
      geannuleerd: "Geannuleerd",
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
    }
    return variants[status] || "default"
  }

  const handleDownloadPDF = () => {
    try {
      const pdf = generateAansprakelijkheidsbrief({
        naam: claim.naam,
        email: claim.email,
        telefoon: claim.telefoon,
        kenteken_tegenpartij: claim.kenteken_tegenpartij,
        naam_tegenpartij: claim.naam_tegenpartij,
        verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij,
        datum_ongeval: claim.datum_ongeval,
        plaats_ongeval: claim.plaats_ongeval,
        beschrijving: claim.beschrijving,
      })

      downloadPDF(pdf, `aansprakelijkheidsbrief-${claim.id.substring(0, 8)}.pdf`)
      toast.success("PDF gedownload!", {
        description: "De aansprakelijkheidsbrief is gedownload"
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast.error("PDF download mislukt")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar overzicht
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Claim Details</h1>
          <p className="text-muted-foreground">
            Claim #{claim.id.substring(0, 8)}
          </p>
        </div>
        <Badge variant={getStatusBadgeVariant(claim.status)} className="text-lg px-4 py-2">
          {getStatusLabel(claim.status)}
        </Badge>
      </div>

      {/* Main Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Jouw Gegevens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Naam</p>
              <p className="font-medium">{claim.naam}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{claim.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefoon</p>
              <p className="font-medium">{claim.telefoon}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Tegenpartij Gegevens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Kenteken</p>
              <p className="font-medium">{claim.kenteken_tegenpartij}</p>
            </div>
            {claim.naam_tegenpartij && (
              <div>
                <p className="text-sm text-muted-foreground">Naam</p>
                <p className="font-medium">{claim.naam_tegenpartij}</p>
              </div>
            )}
            {claim.verzekeraar_tegenpartij && (
              <div>
                <p className="text-sm text-muted-foreground">Verzekeraar</p>
                <p className="font-medium">{claim.verzekeraar_tegenpartij}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ongeval Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ongeval Informatie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Datum Ongeval</p>
              <p className="font-medium">{formatDate(claim.datum_ongeval)}</p>
            </div>
            {claim.plaats_ongeval && (
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Plaats
                </p>
                <p className="font-medium">{claim.plaats_ongeval}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Beschrijving</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{claim.beschrijving}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline / Status Updates */}
      {statusUpdates && statusUpdates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Status Geschiedenis</CardTitle>
            <CardDescription>Chronologisch overzicht van status wijzigingen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusUpdates.map((update, index) => (
                <div key={update.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {index !== statusUpdates.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getStatusBadgeVariant(update.nieuwe_status)} className="text-xs">
                        {getStatusLabel(update.nieuwe_status)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(update.created_at)}
                      </span>
                    </div>
                    {update.notitie && (
                      <p className="text-sm text-muted-foreground">{update.notitie}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acties</CardTitle>
          <CardDescription>Download documenten en bekijk details</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download Aansprakelijkheidsbrief
          </Button>
          {claim.schadeformulier_url && (
            <Button variant="outline" asChild>
              <a href={claim.schadeformulier_url} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Bekijk Schadeformulier
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p>Claim ingediend op:</p>
              <p className="font-medium text-foreground">{formatDate(claim.created_at)}</p>
            </div>
            <div>
              <p>Laatst bijgewerkt:</p>
              <p className="font-medium text-foreground">{formatDate(claim.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
