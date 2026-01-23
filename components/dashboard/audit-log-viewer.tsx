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
                            <div className="space-y-1">
                              {log.details.kenteken_tegenpartij && (
                                <div>📋 Kenteken tegenpartij: <strong>{log.details.kenteken_tegenpartij}</strong></div>
                              )}
                              {log.details.test_claim && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                  🧪 Test Claim
                                </div>
                              )}
                            </div>
                          )}
                          
                          {log.action_type === 'ai_analyse' && (
                            <div className="text-muted-foreground">
                              ✓ Jouw claim is automatisch beoordeeld voor verwerking
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
                              {log.details.note && (
                                <div className="text-muted-foreground">💬 {log.details.note}</div>
                              )}
                              {log.details.mogelijk_letselschade && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                                  ⚠️ Mogelijke letselschade gedetecteerd
                                </div>
                              )}
                            </div>
                          )}
                          
                          {log.action_type === 'escalatie' && (
                            <div className="space-y-1">
                              {log.details.reden && (
                                <div className="p-2 bg-red-100 border border-red-200 rounded text-red-900">
                                  <strong>Reden:</strong> {log.details.reden}
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground">
                                💡 Een medewerker neemt contact met je op
                              </div>
                            </div>
                          )}
                          
                          {log.action_type === 'email_sent' && (
                            <div className="space-y-1">
                              {/* Success/Error Status */}
                              {log.details.success !== undefined && (
                                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                                  log.details.success 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {log.details.success ? '✅ Email verzonden' : '⏳ Email wordt verzonden'}
                                </div>
                              )}
                              {log.details.email_type && (
                                <div className="text-muted-foreground text-xs">
                                  {log.details.email_type === 'claim_received' && '📬 Bevestigingsmail'}
                                  {log.details.email_type === 'escalation' && '🚨 Escalatie notificatie'}
                                  {log.details.email_type === 'letselschade_detected' && '⚠️ Letselschade notificatie'}
                                  {log.details.email_type === 'aansprakelijkheidsbrief_verzekeraar' && '📄 Brief naar verzekeraar'}
                                </div>
                              )}
                              {log.details.automated && (
                                <div className="text-xs text-muted-foreground">
                                  🤖 Automatisch verzonden
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
