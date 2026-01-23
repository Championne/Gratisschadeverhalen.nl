"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  User,
  Car,
  Building2,
  Calendar,
  Euro,
  FileText,
  Mail,
  History,
  Edit,
} from "lucide-react"
import { AdminStatusUpdate } from "./status-update"
import { AdminNotes } from "./notes"

interface AdminClaimDetailProps {
  claim: any
  auditLogs: any[]
  emails: any[]
}

const statusColors = {
  nieuw: "bg-blue-500",
  in_behandeling: "bg-orange-500",
  afgerond: "bg-green-500",
  geannuleerd: "bg-gray-500",
}

const statusLabels = {
  nieuw: "Nieuw",
  in_behandeling: "In Behandeling",
  afgerond: "Afgerond",
  geannuleerd: "Geannuleerd",
}

export function AdminClaimDetail({ claim, auditLogs, emails }: AdminClaimDetailProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/admin")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Claim {claim.id.substring(0, 8)}</h1>
            <p className="text-muted-foreground">
              Aangemaakt {formatDistanceToNow(new Date(claim.created_at), {
                addSuffix: true,
                locale: nl
              })}
            </p>
          </div>
        </div>

        <Badge className={statusColors[claim.status as keyof typeof statusColors]}>
          {statusLabels[claim.status as keyof typeof statusLabels]}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="emails">
                Emails ({emails.length})
              </TabsTrigger>
              <TabsTrigger value="documents">Documenten</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4">
              {/* Klant Informatie */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Klant Informatie
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Naam</p>
                      <p className="font-medium">{claim.naam || 'Niet ingevuld'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{claim.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefoon</p>
                      <p className="font-medium">{claim.telefoon || 'Niet ingevuld'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plaats Ongeval</p>
                      <p className="font-medium">{claim.plaats_ongeval || 'Niet ingevuld'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voertuig Informatie */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Voertuig Informatie
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Kenteken Tegenpartij</p>
                      <p className="font-mono font-medium text-lg">{claim.kenteken_tegenpartij}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Naam Tegenpartij</p>
                      <p className="font-medium">{claim.naam_tegenpartij || 'Niet ingevuld'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Verzekeraar Tegenpartij</p>
                      <p className="font-medium">{claim.verzekeraar_tegenpartij || 'Niet ingevuld'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Polisnummer</p>
                      <p className="font-medium">{claim.polisnummer_tegenpartij || 'Niet ingevuld'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schade Informatie */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Schade Informatie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Datum Ongeval</p>
                      <p className="font-medium">
                        {claim.datum_ongeval 
                          ? new Date(claim.datum_ongeval).toLocaleDateString('nl-NL')
                          : 'Niet ingevuld'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Locatie</p>
                      <p className="font-medium">{claim.plaats_ongeval || 'Niet ingevuld'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Geschat Bedrag</p>
                      <p className="font-medium text-lg">
                        {claim.geschatte_schade 
                          ? `€${Number(claim.geschatte_schade).toLocaleString('nl-NL')}`
                          : 'Niet ingevuld'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reparatie Offerte</p>
                      <p className="font-medium">
                        {claim.reparatie_offerte 
                          ? `€${Number(claim.reparatie_offerte).toLocaleString('nl-NL')}`
                          : 'Niet ingevuld'
                        }
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Beschrijving</p>
                    <p className="text-sm whitespace-pre-wrap">
                      {claim.beschrijving || 'Geen beschrijving opgegeven'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emails Tab */}
            <TabsContent value="emails" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Correspondentie</CardTitle>
                  <CardDescription>
                    Alle emails gerelateerd aan deze claim
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {emails.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nog geen emails ontvangen voor deze claim
                    </p>
                  ) : (
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {emails.map((email: any) => (
                          <Card key={email.id}>
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">{email.subject}</CardTitle>
                                  <CardDescription>
                                    Van: {email.from_email} • {formatDistanceToNow(new Date(email.received_at), {
                                      addSuffix: true,
                                      locale: nl
                                    })}
                                  </CardDescription>
                                </div>
                                {email.email_analysis?.[0] && (
                                  <Badge>
                                    {email.email_analysis[0].email_type}
                                  </Badge>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm whitespace-pre-wrap">
                                {email.text_body?.substring(0, 300)}
                                {email.text_body?.length > 300 && '...'}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documenten</CardTitle>
                  <CardDescription>
                    Geüploade bestanden en gegenereerde documenten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Documenten viewer komt binnenkort
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Log Tab */}
            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Audit Log
                  </CardTitle>
                  <CardDescription>
                    Alle acties en wijzigingen op deze claim
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Debug info */}
                  <div className="mb-4 p-3 bg-muted rounded text-xs">
                    <strong>Debug:</strong> {auditLogs.length} audit logs gevonden
                    {auditLogs.length > 0 && (
                      <pre className="mt-2 overflow-auto">
                        {JSON.stringify(auditLogs[0], null, 2)}
                      </pre>
                    )}
                  </div>

                  {auditLogs.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nog geen audit logs
                    </p>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {auditLogs.map((log: any) => {
                          const details = typeof log.details === 'string' 
                            ? log.details 
                            : JSON.stringify(log.details)
                          
                          return (
                            <div key={log.id} className="flex gap-3 text-sm border-l-2 border-muted pl-3 py-2">
                              <div className="flex-shrink-0">
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                  {new Date(log.created_at).toLocaleString('nl-NL')}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {log.performed_by}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{log.action_type}</div>
                                {log.details && (
                                  <div className="text-muted-foreground mt-1">
                                    {typeof log.details === 'object' ? (
                                      <div className="space-y-1">
                                        {log.details.old_status && (
                                          <div>Status: {log.details.old_status} → {log.details.new_status}</div>
                                        )}
                                        {log.details.note && (
                                          <div>Notitie: {log.details.note}</div>
                                        )}
                                        {log.details.comment && (
                                          <div>{log.details.comment}</div>
                                        )}
                                      </div>
                                    ) : (
                                      <div>{details}</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Update */}
          <AdminStatusUpdate claimId={claim.id} currentStatus={claim.status} />

          {/* Notes */}
          <AdminNotes claimId={claim.id} />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email Verzenden
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Document Genereren
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Claim Bewerken
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
