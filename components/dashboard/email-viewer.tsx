'use client'

/**
 * Email Viewer Component
 * 
 * Displays all received verzekeraar emails for a claim
 * with AI analysis, sentiment, and actions taken
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { nl } from 'date-fns/locale'

interface EmailData {
  id: string
  from_email: string
  from_name?: string
  subject: string
  body_text: string
  received_at: string
  processed: boolean
  match_confidence?: number
  analysis?: {
    email_type: string
    confidence_score: number
    sentiment: string
    sentiment_score: number
    priority: string
    urgency_score: number
    summary_nl: string
    key_points: string[]
    suggested_actions: string[]
    requires_admin_action: boolean
  }
}

export function EmailViewer({ claimId }: { claimId: string }) {
  const [emails, setEmails] = useState<EmailData[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null)

  useEffect(() => {
    fetchEmails()
  }, [claimId])

  async function fetchEmails() {
    try {
      const response = await fetch(`/api/claims/${claimId}/emails`)
      if (response.ok) {
        const data = await response.json()
        setEmails(data.emails || [])
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Verzekeraar Correspondentie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            <p className="mt-4">Emails laden...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (emails.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Verzekeraar Correspondentie
          </CardTitle>
          <CardDescription>
            Alle emails van de verzekeraar worden hier weergegeven
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Mail className="h-12 w-12 mx-auto opacity-20 mb-4" />
            <p>Nog geen emails ontvangen van verzekeraar</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Verzekeraar Correspondentie
          <Badge variant="secondary" className="ml-auto">
            {emails.length} {emails.length === 1 ? 'email' : 'emails'}
          </Badge>
        </CardTitle>
        <CardDescription>
          Alle emails worden automatisch geanalyseerd door AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {emails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                expanded={expandedEmailId === email.id}
                onToggle={() =>
                  setExpandedEmailId(expandedEmailId === email.id ? null : email.id)
                }
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function EmailCard({
  email,
  expanded,
  onToggle,
}: {
  email: EmailData
  expanded: boolean
  onToggle: () => void
}) {
  const { analysis } = email

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3 flex-1">
          {analysis ? (
            <EmailTypeIcon type={analysis.email_type} />
          ) : (
            <Mail className="h-5 w-5 text-muted-foreground mt-1" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold truncate">{email.subject}</h4>
              {analysis && (
                <Badge variant={getEmailTypeBadgeVariant(analysis.email_type)}>
                  {getEmailTypeLabel(analysis.email_type)}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Van: {email.from_name || email.from_email}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(email.received_at), {
                addSuffix: true,
                locale: nl,
              })}
            </p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={onToggle}>
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* AI Analysis Summary (Always visible) */}
      {analysis && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">AI Analyse</span>
            <Badge variant="outline" className="ml-auto">
              {analysis.confidence_score}% zekerheid
            </Badge>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <p className="text-sm">{analysis.summary_nl}</p>
          </div>

          {/* Sentiment & Priority */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm">
              <SentimentIcon sentiment={analysis.sentiment} />
              <span className="text-muted-foreground">
                {getSentimentLabel(analysis.sentiment)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <AlertCircle
                className={`h-4 w-4 ${getPriorityColor(analysis.priority)}`}
              />
              <span className="text-muted-foreground">
                {getPriorityLabel(analysis.priority)}
              </span>
            </div>
            {email.match_confidence && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Match: {email.match_confidence}%
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {expanded && (
        <>
          <Separator className="my-3" />

          {/* Email Body */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold mb-2">Email Inhoud</h5>
            <div className="bg-muted/30 rounded-md p-3 text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
              {email.body_text}
            </div>
          </div>

          {/* AI Details */}
          {analysis && (
            <>
              {/* Key Points */}
              {analysis.key_points && analysis.key_points.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold mb-2">Belangrijkste Punten</h5>
                  <ul className="space-y-1">
                    {analysis.key_points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Actions */}
              {analysis.suggested_actions && analysis.suggested_actions.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold mb-2">Aanbevolen Acties</h5>
                  <ul className="space-y-1">
                    {analysis.suggested_actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Admin Action Required */}
              {analysis.requires_admin_action && (
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-md p-3">
                  <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      Admin actie vereist
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" asChild>
              <a href={`mailto:${email.from_email}`} target="_blank" rel="noopener noreferrer">
                <Mail className="h-4 w-4 mr-2" />
                Beantwoorden
              </a>
            </Button>
            <Button size="sm" variant="outline" onClick={() => window.open(`/dashboard/emails/${email.id}`, '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Details
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

// Helper Components & Functions

function EmailTypeIcon({ type }: { type: string }) {
  const iconProps = { className: 'h-5 w-5 mt-1' }

  switch (type) {
    case 'liability_acceptance':
      return <CheckCircle2 {...iconProps} className="h-5 w-5 text-green-500 mt-1" />
    case 'rejection':
      return <XCircle {...iconProps} className="h-5 w-5 text-red-500 mt-1" />
    case 'information_request':
      return <MessageSquare {...iconProps} className="h-5 w-5 text-blue-500 mt-1" />
    case 'settlement_offer':
      return <DollarSign {...iconProps} className="h-5 w-5 text-green-600 mt-1" />
    case 'acknowledgment':
      return <Clock {...iconProps} className="h-5 w-5 text-gray-500 mt-1" />
    default:
      return <Mail {...iconProps} className="h-5 w-5 text-muted-foreground mt-1" />
  }
}

function SentimentIcon({ sentiment }: { sentiment: string }) {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case 'negative':
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <Minus className="h-4 w-4 text-gray-500" />
  }
}

function getEmailTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    liability_acceptance: 'Aansprakelijk',
    rejection: 'Afwijzing',
    information_request: 'Info Verzoek',
    settlement_offer: 'Schikking',
    acknowledgment: 'Ontvangst',
    other: 'Anders',
  }
  return labels[type] || type
}

function getEmailTypeBadgeVariant(type: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'liability_acceptance':
      return 'default'
    case 'rejection':
      return 'destructive'
    case 'settlement_offer':
      return 'default'
    default:
      return 'secondary'
  }
}

function getSentimentLabel(sentiment: string): string {
  const labels: Record<string, string> = {
    positive: 'Positief',
    negative: 'Negatief',
    neutral: 'Neutraal',
  }
  return labels[sentiment] || sentiment
}

function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    urgent: 'Urgent',
    high: 'Hoog',
    normal: 'Normaal',
    low: 'Laag',
  }
  return labels[priority] || priority
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent':
      return 'text-red-500'
    case 'high':
      return 'text-orange-500'
    case 'normal':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}
