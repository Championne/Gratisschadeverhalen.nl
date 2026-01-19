"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Trash2
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Audit Trail
        </CardTitle>
        <CardDescription>
          Volledige geschiedenis van alle acties voor deze claim
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen audit logs beschikbaar</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityColor(log.severity)}`}
              >
                <div className="mt-0.5">
                  {getActionIcon(log.action_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {getActionLabel(log.action_type)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {getPerformedByIcon(log.performed_by)}
                      <span className="ml-1">
                        {log.performed_by.split(':')[0]}
                      </span>
                    </Badge>
                    {log.severity === 'critical' && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Kritiek
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.created_at).toLocaleString('nl-NL', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </div>
                  {Object.keys(log.details).length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                        Toon details
                      </summary>
                      <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto max-h-32">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
