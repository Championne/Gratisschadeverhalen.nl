"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import { 
  FileText, 
  Mail, 
  Zap, 
  AlertTriangle, 
  Upload, 
  Edit, 
  Eye,
  User,
  Bot,
  Shield,
  Trash2,
  History
} from "lucide-react"

interface AuditLog {
  id: string
  action_type: string
  performed_by: string
  details: Record<string, any>
  severity: 'info' | 'warning' | 'critical'
  created_at: string
}

interface AuditLogViewerProps {
  claimId: string
}

// Helper function to get user-friendly status names
function getStatusDisplayName(status: string): string {
  const statusNames: Record<string, string> = {
    'nieuw': 'Nieuw',
    'in_behandeling': 'In Behandeling',
    'afgerond': 'Afgerond',
    'geannuleerd': 'Geannuleerd',
    'escalated': 'In Review',
    'afgewezen': 'Afgewezen',
    'letselschade_gedetecteerd': 'Letselschade Specialist'
  }
  return statusNames[status] || status
}

// Helper function to explain what a status means
function getStatusExplanation(status: string): string {
  const explanations: Record<string, string> = {
    'nieuw': 'Je claim is ontvangen en wordt binnenkort automatisch beoordeeld.',
    'in_behandeling': 'We zijn actief bezig met het verwerken van jouw claim. We sturen een aansprakelijkheidsbrief naar de verzekeraar.',
    'afgerond': 'Je claim is succesvol afgehandeld! De schadevergoeding is uitgekeerd.',
    'geannuleerd': 'Deze claim is geannuleerd op jouw verzoek.',
    'escalated': 'Een medewerker bekijkt jouw claim persoonlijk. We nemen binnen 2 werkdagen contact op.',
    'afgewezen': 'Helaas kunnen we deze claim niet in behandeling nemen. Je ontvangt een email met uitleg.',
    'letselschade_gedetecteerd': 'Je claim wordt behandeld door onze letselschade specialist (Unitas). Zij nemen binnen 2 werkdagen contact op.'
  }
  return explanations[status] || 'Je claim status is gewijzigd.'
}

export function AuditLogViewer({ claimId }: AuditLogViewerProps) {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuditLogs()
  }, [claimId])

  async function fetchAuditLogs() {
    try {
      setLoading(true)
      const response = await fetch(`/api/audit-logs?claimId=${claimId}`)
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
    } finally {
      setLoading(false)
    }
  }

  function getActionIcon(actionType: string) {
    switch (actionType) {
      case 'claim_submit': return <FileText className="h-4 w-4" />
      case 'ocr_run': return <Zap className="h-4 w-4" />
      case 'ai_analyse': return <Bot className="h-4 w-4" />
      case 'email_sent': return <Mail className="h-4 w-4" />
      case 'status_change': return <Zap className="h-4 w-4" />
      case 'escalatie': return <AlertTriangle className="h-4 w-4" />
      case 'manual_edit': return <Edit className="h-4 w-4" />
      case 'file_upload': return <Upload className="h-4 w-4" />
      case 'file_delete': return <Trash2 className="h-4 w-4" />
      case 'view_claim': return <Eye className="h-4 w-4" />
      case 'login': return <User className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  function getActionLabel(actionType: string) {
    const labels: Record<string, string> = {
      claim_submit: 'Claim Ingediend',
      ocr_run: 'OCR Verwerking',
      ai_analyse: 'AI Analyse',
      email_sent: 'Email Verzonden',
      status_change: 'Status Gewijzigd',
      escalatie: 'Claim Geëscaleerd',
      manual_edit: 'Handmatig Aangepast',
      file_upload: 'Bestand Geüpload',
      file_delete: 'Bestand Verwijderd',
      view_claim: 'Claim Bekeken',
      login: 'Ingelogd',
    }
    return labels[actionType] || actionType
  }

  function getPerformedByIcon(performedBy: string) {
    if (performedBy === 'AI') return <Bot className="h-3 w-3" />
    if (performedBy === 'SYSTEM') return <Shield className="h-3 w-3" />
    if (performedBy.startsWith('USER:')) return <User className="h-3 w-3" />
    if (performedBy.startsWith('ADMIN:')) return <Shield className="h-3 w-3" />
    return null
  }

  function getSeverityColor(severity: string) {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      case 'info': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audit Trail</CardTitle>
          <CardDescription>Laden...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Filter out admin-only actions for user view
  const userFriendlyLogs = logs.filter(log => 
    !['comment_added', 'manual_edit'].includes(log.action_type)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Claim Tijdlijn
        </CardTitle>
        <CardDescription>
          Alle belangrijke updates en acties voor jouw claim ({userFriendlyLogs.length} {userFriendlyLogs.length === 1 ? 'gebeurtenis' : 'gebeurtenissen'})
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userFriendlyLogs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nog geen gebeurtenissen
          </p>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {userFriendlyLogs.map((log, index) => {
                // Determine icon, color, and border based on action type
                let icon = "📝"
                let borderColor = "border-muted"
                let bgColor = "bg-muted/5"
                let actionLabel = getActionLabel(log.action_type)
                let userFriendlyPerformer = ""
                
                // Map action types to user-friendly icons and labels
                if (log.action_type === 'claim_submit') {
                  icon = "📤"
                  borderColor = "border-blue-500"
                  bgColor = "bg-blue-50"
                  actionLabel = "Claim Ingediend"
                  userFriendlyPerformer = "Door jou"
                } else if (log.action_type === 'ai_analyse') {
                  icon = "🤖"
                  borderColor = "border-purple-500"
                  bgColor = "bg-purple-50"
                  actionLabel = "Automatische Beoordeling"
                  userFriendlyPerformer = "Door ons systeem"
                } else if (log.action_type === 'status_change') {
                  icon = "🔄"
                  borderColor = log.severity === 'critical' ? "border-red-500" : "border-green-500"
                  bgColor = log.severity === 'critical' ? "bg-red-50" : "bg-green-50"
                  actionLabel = "Status Update"
                  userFriendlyPerformer = log.performed_by.startsWith('ADMIN:') ? "Door onze medewerker" : "Door ons systeem"
                } else if (log.action_type === 'escalatie') {
                  icon = "🚨"
                  borderColor = "border-red-500"
                  bgColor = "bg-red-50"
                  actionLabel = "Handmatige Controle Vereist"
                  userFriendlyPerformer = "Door ons systeem"
                } else if (log.action_type === 'email_sent') {
                  icon = "📧"
                  borderColor = "border-green-500"
                  bgColor = "bg-green-50"
                  actionLabel = "Email Verzonden"
                  userFriendlyPerformer = "Door ons systeem"
                }
                
                return (
                  <div 
                    key={log.id} 
                    className={`relative flex gap-3 p-4 rounded-lg border-l-4 ${borderColor} ${bgColor} hover:shadow-md transition-shadow`}
                  >
                    {/* Timeline connector */}
                    {index < userFriendlyLogs.length - 1 && (
                      <div className="absolute left-[22px] top-[56px] w-0.5 h-[calc(100%+1rem)] bg-muted -z-10" />
                    )}
                    
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="text-2xl leading-none">{icon}</div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-semibold text-base">{actionLabel}</div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: nl })}
                        </div>
                      </div>
                      
                      {/* Timestamp and performer */}
                      <div className="text-xs text-muted-foreground mb-2">
                        {new Date(log.created_at).toLocaleString('nl-NL', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit', 
                          minute: '2-digit'
                        })} • {userFriendlyPerformer}
                      </div>
                      
                      {/* User-friendly details */}
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="text-sm space-y-2 mt-2 pt-2 border-t border-muted/30">
                          {log.action_type === 'claim_submit' && (
                            <div className="space-y-2">
                              <div className="font-medium text-sm">📋 Ingediende gegevens:</div>
                              <div className="space-y-1.5 pl-2">
                                {log.details.naam && (
                                  <div className="text-sm">👤 Uw naam: <strong>{log.details.naam}</strong></div>
                                )}
                                {log.details.email && (
                                  <div className="text-sm">✉️ Email: <strong>{log.details.email}</strong></div>
                                )}
                                {log.details.kenteken_tegenpartij && (
                                  <div className="text-sm">🚗 Kenteken tegenpartij: <strong className="text-primary">{log.details.kenteken_tegenpartij}</strong></div>
                                )}
                                {log.details.verzekeraar_tegenpartij && (
                                  <div className="text-sm">🏢 Verzekeraar tegenpartij: <strong>{log.details.verzekeraar_tegenpartij}</strong></div>
                                )}
                                {log.details.datum_ongeval && (
                                  <div className="text-sm">📅 Datum ongeval: <strong>{new Date(log.details.datum_ongeval).toLocaleDateString('nl-NL')}</strong></div>
                                )}
                                {log.details.has_ocr !== undefined && (
                                  <div className="text-sm">
                                    {log.details.has_ocr 
                                      ? '✅ Europees Schadeformulier automatisch ingelezen' 
                                      : '📝 Handmatig ingevoerd'}
                                  </div>
                                )}
                                {log.details.ocr_confidence !== undefined && log.details.ocr_confidence > 0 && (
                                  <div className="text-sm">
                                    🎯 OCR betrouwbaarheid: <strong>{log.details.ocr_confidence}%</strong>
                                  </div>
                                )}
                              </div>
                              <div className="mt-3 pt-2 border-t border-muted/30">
                                <div className="text-sm text-muted-foreground">
                                  💡 <strong>Volgende stap:</strong> Onze AI analyseert nu automatisch jouw claim
                                </div>
                              </div>
                              {log.details.test_claim && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                  🧪 Test Claim
                                </div>
                              )}
                            </div>
                          )}
                          
                          {log.action_type === 'ai_analyse' && (
                            <div className="space-y-2">
                              <div className="text-sm">
                                🤖 Onze AI heeft jouw claim automatisch beoordeeld en geanalyseerd
                              </div>
                              <div className="space-y-1.5 pl-2">
                                {log.details.ai_confidence !== undefined && log.details.ai_confidence !== null && (
                                  <div className="text-sm">
                                    📊 Aansprakelijkheid tegenpartij: <strong className="text-primary">{log.details.ai_confidence}%</strong>
                                  </div>
                                )}
                                {log.details.mogelijk_letselschade && (
                                  <div className="text-sm">
                                    ⚠️ Mogelijke letselschade gedetecteerd - <strong className="text-orange-600">doorverwezen naar specialist</strong>
                                  </div>
                                )}
                                {log.details.escalated && (
                                  <div className="text-sm">
                                    🔍 Handmatige controle vereist - <strong className="text-blue-600">medewerker neemt contact op</strong>
                                  </div>
                                )}
                                {!log.details.mogelijk_letselschade && !log.details.escalated && (
                                  <div className="text-sm text-green-600">
                                    ✅ Claim kan automatisch verwerkt worden
                                  </div>
                                )}
                              </div>
                              <div className="mt-3 pt-2 border-t border-muted/30">
                                <div className="text-sm text-muted-foreground">
                                  💡 <strong>Volgende stap:</strong> {
                                    log.details.mogelijk_letselschade 
                                      ? 'Letselschade specialist neemt contact op'
                                      : log.details.escalated
                                      ? 'Medewerker bekijkt jouw claim'
                                      : 'Wij sturen een aansprakelijkheidsbrief naar de verzekeraar'
                                  }
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {log.action_type === 'status_change' && (
                            <div className="space-y-2">
                              {(log.details.oude_status || log.details.old_status) && (
                                <div>
                                  <div className="text-sm font-medium mb-2">Status veranderd:</div>
                                  <div className="flex items-center gap-2 pl-2">
                                    <span className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded text-sm font-medium">
                                      {getStatusDisplayName(log.details.oude_status || log.details.old_status)}
                                    </span>
                                    <span className="text-muted-foreground">→</span>
                                    <span className="px-2.5 py-1 bg-green-500 text-white rounded text-sm font-medium">
                                      {getStatusDisplayName(log.details.nieuwe_status || log.details.new_status)}
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              {/* AI Confidence */}
                              {log.details.ai_confidence !== undefined && log.details.ai_confidence !== null && (
                                <div className="text-sm pl-2">
                                  📊 Aansprakelijkheid: <strong>{log.details.ai_confidence}%</strong>
                                </div>
                              )}
                              
                              {/* Letselschade flow */}
                              {log.details.letselschade_flow && (
                                <div className="pl-2 space-y-1">
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                                    🏥 Letselschade Specialist Flow
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    Je claim wordt behandeld door onze letselschade specialist (Unitas)
                                  </div>
                                </div>
                              )}
                              
                              {/* Note from admin */}
                              {log.details.note && (
                                <div className="pl-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                                  <strong>💬 Opmerking:</strong> {log.details.note}
                                </div>
                              )}
                              
                              {/* Escalated */}
                              {log.details.escalated && !log.details.letselschade_flow && (
                                <div className="pl-2">
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                                    🔍 Handmatige controle
                                  </div>
                                </div>
                              )}
                              
                              {/* Next steps based on new status */}
                              <div className="mt-3 pt-2 border-t border-muted/30">
                                <div className="text-sm text-muted-foreground">
                                  💡 <strong>Wat betekent dit?</strong> {getStatusExplanation(log.details.nieuwe_status || log.details.new_status)}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {log.action_type === 'escalatie' && (
                            <div className="space-y-2">
                              <div className="text-sm">
                                🔍 Jouw claim vereist handmatige controle door een medewerker
                              </div>
                              {log.details.reden && (
                                <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                                  <div className="text-sm font-medium text-orange-900 mb-1">Waarom handmatige controle?</div>
                                  <div className="text-sm text-orange-800">{log.details.reden}</div>
                                </div>
                              )}
                              <div className="mt-3 pt-2 border-t border-muted/30">
                                <div className="space-y-1">
                                  <div className="text-sm font-medium">💡 Wat gebeurt er nu?</div>
                                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                                    <li className="list-disc">Een medewerker bekijkt jouw claim persoonlijk</li>
                                    <li className="list-disc">We nemen binnen <strong>2 werkdagen</strong> contact met je op</li>
                                    <li className="list-disc">Je kunt ons altijd bellen op <strong className="text-primary">085 060 5357</strong></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {log.action_type === 'email_sent' && (
                            <div className="space-y-2">
                              {/* Success/Error Status */}
                              {log.details.success !== undefined && (
                                <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-sm font-medium ${
                                  log.details.success 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {log.details.success ? '✅ Email succesvol verzonden' : '⏳ Email wordt verzonden'}
                                </div>
                              )}
                              
                              {/* Email Type with detailed description */}
                              {log.details.email_type && (
                                <div className="space-y-1 pl-2">
                                  <div className="text-sm font-medium">
                                    {log.details.email_type === 'claim_received' && '📬 Bevestigingsmail'}
                                    {log.details.email_type === 'escalation' && '🚨 Escalatie notificatie'}
                                    {log.details.email_type === 'letselschade_detected' && '🏥 Letselschade notificatie'}
                                    {log.details.email_type === 'aansprakelijkheidsbrief_verzekeraar' && '📄 Brief naar verzekeraar'}
                                    {log.details.email_type === 'admin_new_claim' && '📋 Interne notificatie'}
                                    {!['claim_received', 'escalation', 'letselschade_detected', 'aansprakelijkheidsbrief_verzekeraar', 'admin_new_claim'].includes(log.details.email_type) && `📧 ${log.details.email_type}`}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {log.details.email_type === 'claim_received' && 'Je ontvangt een bevestiging dat we jouw claim hebben ontvangen'}
                                    {log.details.email_type === 'escalation' && 'Onze medewerker is op de hoogte gebracht voor handmatige controle'}
                                    {log.details.email_type === 'letselschade_detected' && 'Je ontvangt informatie over de letselschade procedure en contactgegevens van onze partner Unitas'}
                                    {log.details.email_type === 'aansprakelijkheidsbrief_verzekeraar' && 'Aansprakelijkheidsbrief is verzonden naar de verzekeraar van de tegenpartij'}
                                    {log.details.email_type === 'admin_new_claim' && 'Ons team is op de hoogte gebracht van jouw nieuwe claim'}
                                  </div>
                                </div>
                              )}
                              
                              {/* Recipient (if relevant for user) */}
                              {log.details.recipient && log.details.email_type !== 'admin_new_claim' && (
                                <div className="text-xs text-muted-foreground pl-2">
                                  📧 Verzonden naar: <strong>{log.details.recipient}</strong>
                                </div>
                              )}
                              
                              {/* Automated flag */}
                              {log.details.automated && (
                                <div className="text-xs text-muted-foreground pl-2">
                                  🤖 Automatisch verzonden door ons systeem
                                </div>
                              )}
                              
                              {/* Error message (if failed) */}
                              {log.details.error && !log.details.success && (
                                <div className="text-xs text-orange-600 pl-2 mt-2">
                                  ⚠️ Email wordt nog verwerkt - geen zorgen, dit lost zich vanzelf op
                                </div>
                              )}
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
  )
}
