"use client"

import { useState, useEffect } from "react"
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
  escalated: "bg-red-600",
  afgerond: "bg-green-500",
  afgewezen: "bg-red-500",
  geannuleerd: "bg-gray-500",
}

const statusLabels = {
  nieuw: "Nieuw",
  in_behandeling: "In Behandeling",
  escalated: "Geëscaleerd",
  afgerond: "Afgerond",
  afgewezen: "Afgewezen",
  geannuleerd: "Geannuleerd",
}

export function AdminClaimDetail({ claim, auditLogs: initialAuditLogs, emails }: AdminClaimDetailProps) {
  const router = useRouter()
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs)

  const refreshAuditLogs = async () => {
    try {
      const response = await fetch(`/api/admin/claims/${claim.id}/audit-logs`)
      if (response.ok) {
        const data = await response.json()
        setAuditLogs(data.auditLogs || [])
      }
    } catch (error) {
      console.error("Error refreshing audit logs:", error)
    }
  }

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
                    Alle acties en wijzigingen op deze claim ({auditLogs.length} {auditLogs.length === 1 ? 'entry' : 'entries'})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {auditLogs.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nog geen audit logs
                    </p>
                  ) : (
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        {auditLogs.map((log: any, index: number) => {
                          // Determine icon, color, and border based on action type and severity
                          let icon = "📝"
                          let borderColor = "border-muted"
                          let bgColor = "bg-muted/5"
                          let actionLabel = log.action_type
                          
                          // Map action types to icons and labels
                          if (log.action_type === 'claim_submit') {
                            icon = "📤"
                            borderColor = "border-blue-500"
                            bgColor = "bg-blue-50"
                            actionLabel = "Claim Ingediend"
                          } else if (log.action_type === 'ai_analyse') {
                            icon = "🤖"
                            borderColor = "border-purple-500"
                            bgColor = "bg-purple-50"
                            actionLabel = "AI Analyse"
                          } else if (log.action_type === 'status_change') {
                            icon = "🔄"
                            borderColor = log.severity === 'critical' ? "border-red-500" : "border-green-500"
                            bgColor = log.severity === 'critical' ? "bg-red-50" : "bg-green-50"
                            actionLabel = "Status Wijziging"
                          } else if (log.action_type === 'escalatie') {
                            icon = "🚨"
                            borderColor = "border-red-500"
                            bgColor = "bg-red-50"
                            actionLabel = "Escalatie"
                          } else if (log.action_type === 'comment_added') {
                            icon = "💬"
                            borderColor = "border-blue-400"
                            bgColor = "bg-blue-50"
                            actionLabel = "Opmerking Toegevoegd"
                          } else if (log.action_type === 'email_sent') {
                            icon = "📧"
                            borderColor = "border-green-500"
                            bgColor = "bg-green-50"
                            actionLabel = "Email Verzonden"
                          } else if (log.action_type === 'document_uploaded') {
                            icon = "📎"
                            borderColor = "border-blue-500"
                            bgColor = "bg-blue-50"
                            actionLabel = "Document Geüpload"
                          }
                          
                          return (
                            <div 
                              key={log.id} 
                              className={`relative flex gap-3 p-3 rounded-lg border-l-4 ${borderColor} ${bgColor} hover:shadow-md transition-shadow`}
                            >
                              {/* Timeline connector */}
                              {index < auditLogs.length - 1 && (
                                <div className="absolute left-[22px] top-[48px] w-0.5 h-[calc(100%+1rem)] bg-muted -z-10" />
                              )}
                              
                              {/* Icon */}
                              <div className="flex-shrink-0">
                                <div className="text-2xl leading-none">{icon}</div>
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div className="font-semibold text-sm">{actionLabel}</div>
                                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: nl })}
                                  </div>
                                </div>
                                
                                {/* Timestamp and performer */}
                                <div className="text-xs text-muted-foreground mb-2 space-y-0.5">
                                  <div>{new Date(log.created_at).toLocaleString('nl-NL', { 
                                    day: '2-digit', 
                                    month: '2-digit', 
                                    year: 'numeric',
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    second: '2-digit'
                                  })}</div>
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{log.performed_by}</span>
                                  </div>
                                </div>
                                
                                {/* Details */}
                                {log.details && (
                                  <div className="text-sm space-y-2 mt-2 pt-2 border-t border-muted/30">
                                    {log.action_type === 'claim_submit' && (
                                      <div className="space-y-1">
                                        {log.details.naam && <div><strong>Naam:</strong> {log.details.naam}</div>}
                                        {log.details.email && <div><strong>Email:</strong> {log.details.email}</div>}
                                        {log.details.kenteken_tegenpartij && <div><strong>Kenteken:</strong> {log.details.kenteken_tegenpartij}</div>}
                                        {log.details.test_claim && (
                                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                            🧪 Test Claim
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'ai_analyse' && (
                                      <div className="space-y-1">
                                        {log.details.model && <div><strong>Model:</strong> {log.details.model}</div>}
                                        {log.details.timestamp && <div><strong>Analyse tijdstip:</strong> {new Date(log.details.timestamp).toLocaleString('nl-NL')}</div>}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'status_change' && (
                                      <div className="space-y-1">
                                        {(log.details.oude_status || log.details.old_status) && (
                                          <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-gray-200 rounded text-xs font-medium">
                                              {log.details.oude_status || log.details.old_status}
                                            </span>
                                            <span>→</span>
                                            <span className="px-2 py-0.5 bg-green-200 rounded text-xs font-medium">
                                              {log.details.nieuwe_status || log.details.new_status}
                                            </span>
                                          </div>
                                        )}
                                        {log.details.note && <div><strong>Notitie:</strong> {log.details.note}</div>}
                                        {log.details.ai_confidence !== undefined && (
                                          <div><strong>AI Vertrouwen:</strong> {log.details.ai_confidence}%</div>
                                        )}
                                        {log.details.ocr_confidence !== undefined && (
                                          <div><strong>OCR Vertrouwen:</strong> {log.details.ocr_confidence}%</div>
                                        )}
                                        {log.details.mogelijk_letselschade !== undefined && (
                                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                                            log.details.mogelijk_letselschade 
                                              ? 'bg-orange-100 text-orange-800' 
                                              : 'bg-green-100 text-green-800'
                                          }`}>
                                            {log.details.mogelijk_letselschade ? '⚠️ Mogelijk Letselschade' : '✅ Geen Letselschade'}
                                          </div>
                                        )}
                                        {log.details.escalated && (
                                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                                            🚨 Geëscaleerd
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'escalatie' && (
                                      <div className="space-y-1">
                                        {log.details.reden && (
                                          <div className="p-2 bg-red-100 border border-red-300 rounded text-red-900">
                                            <strong>Reden:</strong> {log.details.reden}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'comment_added' && (
                                      <div className="space-y-1">
                                        {log.details.comment && (
                                          <div className="italic text-muted-foreground">"{log.details.comment}"</div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'email_sent' && (
                                      <div className="space-y-1">
                                        {log.details.email_type && (
                                          <div><strong>Type:</strong> {log.details.email_type.replace(/_/g, ' ')}</div>
                                        )}
                                        {log.details.recipient && (
                                          <div><strong>Ontvanger:</strong> {log.details.recipient}</div>
                                        )}
                                        {log.details.cc && <div><strong>CC:</strong> {log.details.cc}</div>}
                                        {log.details.verzekeraar && <div><strong>Verzekeraar:</strong> {log.details.verzekeraar}</div>}
                                        {log.details.pdf_size_kb && <div><strong>PDF Grootte:</strong> {log.details.pdf_size_kb} KB</div>}
                                        {log.details.automated && (
                                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                                            🤖 Automatisch verzonden
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {/* Fallback for any other details */}
                                    {!['claim_submit', 'ai_analyse', 'status_change', 'escalatie', 'comment_added', 'email_sent'].includes(log.action_type) && (
                                      <div className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                                        {JSON.stringify(log.details, null, 2)}
                                      </div>
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
          <AdminStatusUpdate 
            claimId={claim.id} 
            currentStatus={claim.status} 
            onStatusUpdated={refreshAuditLogs}
          />

          {/* Notes */}
          <AdminNotes 
            claimId={claim.id}
            onNoteAdded={refreshAuditLogs}
          />

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
