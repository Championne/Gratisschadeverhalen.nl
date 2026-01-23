/**
 * Audit Logger Utilities
 * 
 * Juridisch verantwoorde logging van alle belangrijke acties.
 * GDPR compliant: geen gevoelige persoonlijke data.
 * 
 * Gebruik:
 * ```ts
 * await logAuditAction({
 *   claimId: '...',
 *   actionType: 'claim_submit',
 *   performedBy: 'USER:email@example.com',
 *   details: { metadata: 'any data' },
 * })
 * ```
 */

import { createClient } from '@/lib/supabase/server'

export type AuditActionType =
  | 'claim_submit'
  | 'ocr_run'
  | 'ai_analyse'
  | 'email_sent'
  | 'email_received'
  | 'status_change'
  | 'escalatie'
  | 'manual_edit'
  | 'file_upload'
  | 'file_delete'
  | 'document_uploaded'
  | 'document_deleted'
  | 'login'
  | 'view_claim'
  | 'comment_added'

export type AuditSeverity = 'info' | 'warning' | 'critical'

export interface LogAuditActionParams {
  claimId: string | null
  actionType: AuditActionType
  performedBy: string // 'AI', 'SYSTEM', 'USER:email@example.com', 'ADMIN:email'
  details?: Record<string, any>
  severity?: AuditSeverity
  ipAddress?: string
}

/**
 * Log een actie naar audit_logs tabel
 * Uses service role to bypass RLS policies
 */
export async function logAuditAction(params: LogAuditActionParams): Promise<string | null> {
  try {
    console.log('🔍 [AUDIT DEBUG] Starting logAuditAction:', {
      claimId: params.claimId,
      actionType: params.actionType,
      performedBy: params.performedBy,
    })

    // Use service role to bypass RLS
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const supabaseAdmin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('🔍 [AUDIT DEBUG] Supabase Admin client created')

    const insertData = {
      claim_id: params.claimId,
      action_type: params.actionType,
      performed_by: params.performedBy,
      details: params.details || {},
      severity: params.severity || 'info',
      ip_address: params.ipAddress || null,
    }

    console.log('🔍 [AUDIT DEBUG] Insert data:', JSON.stringify(insertData, null, 2))

    const { data, error } = await supabaseAdmin
      .from('audit_logs')
      .insert(insertData)
      .select('id')
      .single()

    if (error) {
      console.error('❌ [AUDIT DEBUG] Insert failed:', error)
      console.error('❌ [AUDIT DEBUG] Error code:', error.code)
      console.error('❌ [AUDIT DEBUG] Error message:', error.message)
      console.error('❌ [AUDIT DEBUG] Error details:', JSON.stringify(error, null, 2))
      return null
    }

    console.log(`✅ [AUDIT DEBUG] Audit logged successfully: ${params.actionType} by ${params.performedBy}`)
    console.log(`✅ [AUDIT DEBUG] Inserted ID: ${data.id}`)
    return data.id as string
  } catch (error: any) {
    console.error('❌ [AUDIT DEBUG] Exception:', error)
    console.error('❌ [AUDIT DEBUG] Exception message:', error.message)
    console.error('❌ [AUDIT DEBUG] Exception stack:', error.stack)
    return null
  }
}

/**
 * Haal audit logs op voor een claim (voor admin dashboard)
 */
export async function getClaimAuditLogs(claimId: string) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.rpc('get_claim_audit_logs', {
      p_claim_id: claimId,
    })

    if (error) {
      console.error('❌ Failed to fetch audit logs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('❌ Audit logs fetch exception:', error)
    return []
  }
}

/**
 * Escaleer een claim (automatisch of handmatig)
 */
export async function escalateClaim(params: {
  claimId: string
  reden: string
  performedBy: string
}): Promise<boolean> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase.rpc('escalate_claim', {
      p_claim_id: params.claimId,
      p_reden: params.reden,
      p_performed_by: params.performedBy,
    })

    if (error) {
      console.error('❌ Escalatie failed:', error)
      return false
    }

    console.log(`🚨 Claim geëscaleerd: ${params.claimId} | Reden: ${params.reden}`)
    return true
  } catch (error) {
    console.error('❌ Escalatie exception:', error)
    return false
  }
}

/**
 * Markeer escalatie als opgelost
 */
export async function resolveEscalation(params: {
  claimId: string
  performedBy: string
  nieuweStatus: string
}): Promise<boolean> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase.rpc('resolve_escalation', {
      p_claim_id: params.claimId,
      p_performed_by: params.performedBy,
      p_nieuwe_status: params.nieuweStatus,
    })

    if (error) {
      console.error('❌ Resolve escalation failed:', error)
      return false
    }

    console.log(`✅ Escalatie opgelost: ${params.claimId}`)
    return true
  } catch (error) {
    console.error('❌ Resolve escalation exception:', error)
    return false
  }
}

/**
 * Helper: Check of een claim moet escaleren op basis van confidence
 */
export function shouldEscalateOnConfidence(confidence: number | null, threshold: number = 70): boolean {
  if (confidence === null) return true // Geen confidence = escaleren
  return confidence < threshold
}

/**
 * Helper: Genereer performedBy string vanuit user context
 */
export function getPerformedByString(type: 'AI' | 'SYSTEM' | 'USER' | 'ADMIN', email?: string): string {
  if (type === 'AI' || type === 'SYSTEM') {
    return type
  }
  
  if (!email) {
    return 'UNKNOWN'
  }
  
  return `${type}:${email}`
}

/**
 * Batch logging: Log meerdere acties tegelijk (voor performance)
 */
export async function logBatchAuditActions(actions: LogAuditActionParams[]): Promise<void> {
  const promises = actions.map(action => logAuditAction(action))
  await Promise.allSettled(promises) // Continue zelfs als enkele logs falen
}

/**
 * GDPR Helpers: Anonimiseer oude data
 */
export async function cleanupOldAuditLogs(): Promise<number> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.rpc('cleanup_old_audit_logs')

    if (error) {
      console.error('❌ Cleanup failed:', error)
      return 0
    }

    console.log(`🧹 Cleaned up ${data} old audit logs (>2 years)`)
    return data as number
  } catch (error) {
    console.error('❌ Cleanup exception:', error)
    return 0
  }
}

export async function anonymizeOldIpAddresses(): Promise<number> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.rpc('anonymize_old_ip_addresses')

    if (error) {
      console.error('❌ Anonymize failed:', error)
      return 0
    }

    console.log(`🧹 Anonymized ${data} old IP addresses (>30 days)`)
    return data as number
  } catch (error) {
    console.error('❌ Anonymize exception:', error)
    return 0
  }
}
