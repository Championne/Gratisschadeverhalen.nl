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
import { ClaimEdit } from "./claim-edit"

interface AdminClaimDetailProps {
  claim: any
  auditLogs: any[]
  emails: any[]
}

const statusColors = {
  nieuw: "bg-blue-500",
  in_behandeling: "bg-orange-500",
  letselschade_gedetecteerd: "bg-purple-500",
  escalated: "bg-red-600",
  afgerond: "bg-green-500",
  afgewezen: "bg-red-500",
  geannuleerd: "bg-gray-500",
}

const statusLabels = {
  nieuw: "Nieuw",
  in_behandeling: "In Behandeling",
  letselschade_gedetecteerd: "Letselschade → Unitas",
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
              <ClaimEdit claim={claim} onUpdate={refreshAuditLogs} />
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
                          } else if (log.action_type === 'manual_edit') {
                            icon = "✏️"
                            borderColor = "border-orange-500"
                            bgColor = "bg-orange-50"
                            actionLabel = "Handmatig Aangepast"
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
                                
                                {/* Timestamp, performer, and metadata */}
                                <div className="text-xs text-muted-foreground mb-2 space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-mono">{new Date(log.created_at).toLocaleString('nl-NL', { 
                                      day: '2-digit', 
                                      month: '2-digit', 
                                      year: 'numeric',
                                      hour: '2-digit', 
                                      minute: '2-digit',
                                      second: '2-digit'
                                    })}</span>
                                    {/* Severity Badge */}
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${
                                      log.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                      log.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-blue-100 text-blue-800'
                                    }`}>
                                      {log.severity === 'critical' ? '🔴' : log.severity === 'warning' ? '🟡' : '🔵'} {log.severity}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span className="font-medium">{log.performed_by}</span>
                                  </div>
                                  {log.ip_address && (
                                    <div className="flex items-center gap-1 text-xs">
                                      <span>📍</span>
                                      <span className="font-mono">{log.ip_address}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Details */}
                                {log.details && (
                                  <div className="text-sm space-y-2 mt-2 pt-2 border-t border-muted/30">
                                    {log.action_type === 'claim_submit' && (
                                      <div className="space-y-3">
                                        {/* Claimer Info */}
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {log.details.naam && (
                                            <div className="p-2 bg-blue-50 rounded">
                                              <div className="text-muted-foreground">Naam Claimer</div>
                                              <div className="font-semibold">{log.details.naam}</div>
                                            </div>
                                          )}
                                          {log.details.email && (
                                            <div className="p-2 bg-blue-50 rounded">
                                              <div className="text-muted-foreground">Email</div>
                                              <div className="font-semibold">{log.details.email}</div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Tegenpartij Info */}
                                        <div className="border-t pt-2">
                                          <div className="text-xs font-semibold mb-2">Tegenpartij Gegevens</div>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            {log.details.kenteken_tegenpartij && (
                                              <div className="p-2 bg-orange-50 rounded">
                                                <div className="text-muted-foreground">Kenteken</div>
                                                <div className="font-semibold text-orange-700">{log.details.kenteken_tegenpartij}</div>
                                              </div>
                                            )}
                                            {log.details.verzekeraar_tegenpartij && (
                                              <div className="p-2 bg-orange-50 rounded">
                                                <div className="text-muted-foreground">Verzekeraar</div>
                                                <div className="font-semibold">{log.details.verzekeraar_tegenpartij}</div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Ongeval Info */}
                                        {log.details.datum_ongeval && (
                                          <div className="border-t pt-2">
                                            <div className="text-xs">
                                              <strong>Datum ongeval:</strong> {new Date(log.details.datum_ongeval).toLocaleDateString('nl-NL', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                              })}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* OCR Info */}
                                        <div className="border-t pt-2">
                                          <div className="text-xs font-semibold mb-2">OCR Informatie</div>
                                          <div className="flex gap-2">
                                            {log.details.has_ocr !== undefined && (
                                              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                                log.details.has_ocr ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                              }`}>
                                                {log.details.has_ocr ? '✅ OCR gebruikt' : '📝 Handmatig ingevoerd'}
                                              </div>
                                            )}
                                            {log.details.ocr_confidence !== undefined && (
                                              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                                log.details.ocr_confidence >= 80 ? 'bg-green-100 text-green-800' :
                                                log.details.ocr_confidence >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                              }`}>
                                                🎯 Betrouwbaarheid: {log.details.ocr_confidence}%
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Flags */}
                                        <div className="flex flex-wrap gap-2">
                                          {log.details.test_claim && (
                                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                              🧪 Test Claim
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'ai_analyse' && (
                                      <div className="space-y-3">
                                        {/* Model Info */}
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {log.details.model && (
                                            <div className="p-2 bg-purple-50 rounded">
                                              <div className="text-muted-foreground">AI Model</div>
                                              <div className="font-semibold font-mono">{log.details.model}</div>
                                            </div>
                                          )}
                                          {log.details.timestamp && (
                                            <div className="p-2 bg-purple-50 rounded">
                                              <div className="text-muted-foreground">Analyse Tijdstip</div>
                                              <div className="font-semibold">{new Date(log.details.timestamp).toLocaleString('nl-NL', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                              })}</div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* AI Confidence */}
                                        {log.details.ai_confidence !== undefined && log.details.ai_confidence !== null && (
                                          <div className="border-t pt-2">
                                            <div className="text-xs font-semibold mb-1">Aansprakelijkheid Beoordeling</div>
                                            <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-bold ${
                                              log.details.ai_confidence >= 80 ? 'bg-green-100 text-green-800' :
                                              log.details.ai_confidence >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-red-100 text-red-800'
                                            }`}>
                                              📊 AI Confidence: {log.details.ai_confidence}%
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Letselschade Detectie */}
                                        {log.details.mogelijk_letselschade !== undefined && (
                                          <div className="border-t pt-2">
                                            <div className={`p-2 rounded text-xs ${
                                              log.details.mogelijk_letselschade 
                                                ? 'bg-orange-100 text-orange-900 border border-orange-300' 
                                                : 'bg-green-100 text-green-900 border border-green-300'
                                            }`}>
                                              <div className="font-semibold mb-1">
                                                {log.details.mogelijk_letselschade ? '⚠️ Letselschade Gedetecteerd' : '✅ Geen Letselschade'}
                                              </div>
                                              {log.details.mogelijk_letselschade && (
                                                <div>Claim wordt doorverwezen naar letselschade specialist (Unitas)</div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Escalatie Info */}
                                        {log.details.escalated !== undefined && (
                                          <div className="border-t pt-2">
                                            <div className={`p-2 rounded text-xs ${
                                              log.details.escalated 
                                                ? 'bg-red-100 text-red-900 border border-red-300' 
                                                : 'bg-green-100 text-green-900 border border-green-300'
                                            }`}>
                                              <div className="font-semibold">
                                                {log.details.escalated ? '🚨 Handmatige Controle Vereist' : '✅ Automatische Verwerking Mogelijk'}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'status_change' && (
                                      <div className="space-y-3">
                                        {/* Status Transition */}
                                        {(log.details.oude_status || log.details.old_status) && (
                                          <div>
                                            <div className="text-xs font-semibold mb-2">Status Transitie</div>
                                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                              <span className="px-3 py-1.5 bg-gray-300 text-gray-800 rounded text-sm font-semibold">
                                                {log.details.oude_status || log.details.old_status}
                                              </span>
                                              <span className="text-muted-foreground">→</span>
                                              <span className="px-3 py-1.5 bg-green-500 text-white rounded text-sm font-semibold">
                                                {log.details.nieuwe_status || log.details.new_status}
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Update Success/Error */}
                                        {log.details.update_success !== undefined && (
                                          <div className={`p-2 rounded text-xs font-medium ${
                                            log.details.update_success 
                                              ? 'bg-green-100 text-green-800 border border-green-300' 
                                              : 'bg-red-100 text-red-800 border border-red-300'
                                          }`}>
                                            {log.details.update_success ? '✅ Database Update Succesvol' : '❌ Database Update Mislukt'}
                                            {log.details.update_error && (
                                              <div className="mt-1 text-xs font-normal">
                                                <strong>Error:</strong> {log.details.update_error}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                        
                                        {/* Confidence Metrics */}
                                        {(log.details.ai_confidence !== undefined || log.details.ocr_confidence !== undefined) && (
                                          <div className="border-t pt-2">
                                            <div className="text-xs font-semibold mb-2">Confidence Metrics</div>
                                            <div className="grid grid-cols-2 gap-2">
                                              {log.details.ai_confidence !== undefined && (
                                                <div className={`p-2 rounded text-xs ${
                                                  log.details.ai_confidence >= 80 ? 'bg-green-100 text-green-800' :
                                                  log.details.ai_confidence >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                  'bg-red-100 text-red-800'
                                                }`}>
                                                  <div className="text-muted-foreground text-xs">AI Confidence</div>
                                                  <div className="font-bold text-sm">{log.details.ai_confidence}%</div>
                                                </div>
                                              )}
                                              {log.details.ocr_confidence !== undefined && (
                                                <div className={`p-2 rounded text-xs ${
                                                  log.details.ocr_confidence >= 80 ? 'bg-green-100 text-green-800' :
                                                  log.details.ocr_confidence >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                                  'bg-red-100 text-red-800'
                                                }`}>
                                                  <div className="text-muted-foreground text-xs">OCR Confidence</div>
                                                  <div className="font-bold text-sm">{log.details.ocr_confidence}%</div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Flags */}
                                        <div className="flex flex-wrap gap-2">
                                          {log.details.mogelijk_letselschade && (
                                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                                              ⚠️ Mogelijk Letselschade
                                            </div>
                                          )}
                                          {log.details.escalated && (
                                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                                              🚨 Geëscaleerd
                                            </div>
                                          )}
                                          {log.details.letselschade_flow && (
                                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                                              🏥 Letselschade Flow
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Admin Note */}
                                        {log.details.note && (
                                          <div className="border-t pt-2">
                                            <div className="text-xs font-semibold mb-1">Notitie van Admin</div>
                                            <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm italic">
                                              "{log.details.note}"
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'escalatie' && (
                                      <div className="space-y-3">
                                        {/* Escalatie Reden */}
                                        {log.details.reden && (
                                          <div className="p-3 bg-red-100 border-2 border-red-300 rounded text-red-900">
                                            <div className="text-xs font-semibold mb-1">🚨 Escalatie Reden</div>
                                            <div className="text-sm font-medium">{log.details.reden}</div>
                                          </div>
                                        )}
                                        
                                        {/* Timestamp */}
                                        {log.details.timestamp && (
                                          <div className="text-xs text-muted-foreground">
                                            <strong>Escalatie tijdstip:</strong> {new Date(log.details.timestamp).toLocaleString('nl-NL', {
                                              day: '2-digit',
                                              month: 'short',
                                              year: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                              second: '2-digit'
                                            })}
                                          </div>
                                        )}
                                        
                                        {/* Action Required */}
                                        <div className="p-2 bg-yellow-50 border border-yellow-300 rounded text-xs">
                                          <strong>⚠️ Actie Vereist:</strong> Medewerker moet contact opnemen met claimer binnen 2 werkdagen
                                        </div>
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'comment_added' && (
                                      <div className="space-y-2">
                                        {log.details.comment && (
                                          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                                            <div className="text-xs font-semibold text-blue-900 mb-1">💬 Interne Opmerking</div>
                                            <div className="text-sm italic text-blue-900">"{log.details.comment}"</div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'manual_edit' && (
                                      <div className="space-y-3">
                                        {/* Edit Summary */}
                                        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                                          <div className="text-xs font-semibold text-orange-900 mb-1">✏️ Handmatige Aanpassing</div>
                                          <div className="text-sm text-orange-800">
                                            {log.details.edited_by && <span>Door: <strong>{log.details.edited_by}</strong></span>}
                                            {log.details.edited_fields && log.details.edited_fields.length > 0 && (
                                              <span className="ml-2">• {log.details.edited_fields.length} veld(en) gewijzigd</span>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Field Changes */}
                                        {log.details.changes && Object.keys(log.details.changes).length > 0 && (
                                          <div className="border-t pt-2">
                                            <div className="text-xs font-semibold mb-2">Gewijzigde Velden</div>
                                            <div className="space-y-2">
                                              {Object.entries(log.details.changes).map(([field, change]: [string, any]) => (
                                                <div key={field} className="p-2 bg-white border border-gray-200 rounded text-xs">
                                                  <div className="font-semibold text-gray-700 mb-1">
                                                    {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded font-mono text-xs">
                                                      {change.old || '(leeg)'}
                                                    </span>
                                                    <span>→</span>
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-mono text-xs">
                                                      {change.new || '(leeg)'}
                                                    </span>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Timestamp */}
                                        {log.details.timestamp && (
                                          <div className="text-xs text-muted-foreground">
                                            <strong>Tijdstip:</strong> {new Date(log.details.timestamp).toLocaleString('nl-NL', {
                                              day: '2-digit',
                                              month: 'short',
                                              year: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                              second: '2-digit'
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {log.action_type === 'email_sent' && (
                                      <div className="space-y-3">
                                        {/* Success/Error Status - Prominent */}
                                        {log.details.success !== undefined && (
                                          <div className={`p-3 rounded font-medium ${
                                            log.details.success 
                                              ? 'bg-green-100 text-green-900 border-2 border-green-300' 
                                              : 'bg-red-100 text-red-900 border-2 border-red-300'
                                          }`}>
                                            <div className="flex items-center gap-2 text-sm">
                                              {log.details.success ? '✅ Email Succesvol Verzonden' : '❌ Email Verzending Mislukt'}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Email Details */}
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {log.details.email_type && (
                                            <div className="p-2 bg-blue-50 rounded">
                                              <div className="text-muted-foreground">Email Type</div>
                                              <div className="font-semibold">{log.details.email_type.replace(/_/g, ' ')}</div>
                                            </div>
                                          )}
                                          {log.details.recipient && (
                                            <div className="p-2 bg-blue-50 rounded">
                                              <div className="text-muted-foreground">Ontvanger</div>
                                              <div className="font-semibold font-mono text-xs">{log.details.recipient}</div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Additional Recipients */}
                                        {log.details.cc && (
                                          <div className="text-xs">
                                            <strong>CC:</strong> <span className="font-mono">{log.details.cc}</span>
                                          </div>
                                        )}
                                        
                                        {/* Email Context */}
                                        {(log.details.verzekeraar || log.details.reden || log.details.pdf_size_kb) && (
                                          <div className="border-t pt-2 space-y-1 text-xs">
                                            {log.details.verzekeraar && (
                                              <div><strong>Verzekeraar:</strong> {log.details.verzekeraar}</div>
                                            )}
                                            {log.details.pdf_size_kb && (
                                              <div><strong>PDF Grootte:</strong> {log.details.pdf_size_kb} KB</div>
                                            )}
                                            {log.details.reden && (
                                              <div className="p-2 bg-orange-50 border border-orange-200 rounded mt-2">
                                                <strong>Reden:</strong> {log.details.reden}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                        
                                        {/* Error Details - Full Stack */}
                                        {log.details.error && (
                                          <div className="border-t pt-2">
                                            <div className="text-xs font-semibold mb-1 text-red-800">❌ Error Details</div>
                                            <div className="p-2 bg-red-50 border border-red-200 rounded text-red-900 text-xs font-mono">
                                              <div className="whitespace-pre-wrap break-all">{log.details.error}</div>
                                            </div>
                                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-300 rounded text-xs">
                                              <strong>💡 Tip:</strong> Check Resend dashboard en domain verificatie status
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Flags */}
                                        <div className="flex flex-wrap gap-2">
                                          {log.details.automated && (
                                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                                              🤖 Automatisch verzonden
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Fallback for any other details */}
                                    {!['claim_submit', 'ai_analyse', 'status_change', 'escalatie', 'comment_added', 'manual_edit', 'email_sent'].includes(log.action_type) && (
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
