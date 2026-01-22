/**
 * Inbound Email Webhook - FULL AUTOMATION 🚀
 * 
 * Resend webhook endpoint that receives ALL inbound emails
 * from insurance companies and processes them automatically.
 * 
 * Flow:
 * 1. Receive email webhook from Resend
 * 2. Store raw email in database
 * 3. Analyze with Claude AI
 * 4. Match to claim(s)
 * 5. Auto-update status (if confidence > 85%)
 * 6. Send notifications
 * 7. Log everything to audit trail
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { analyzeEmail, shouldAutoUpdate } from '@/lib/email-processor/ai-analyzer'
import { matchEmailToClaim } from '@/lib/email-processor/claim-matcher'
import { logAuditAction } from '@/lib/audit/logger'
import { sendEmail } from '@/lib/email/resend'
import { emailReceivedNotification, adminEmailReviewNeeded } from '@/lib/email/templates'

// Feature flag
const ENABLE_EMAIL_PROCESSING = process.env.ENABLE_EMAIL_PROCESSING === 'true'
const AUTO_UPDATE_ENABLED = process.env.ENABLE_AUTO_STATUS_UPDATE === 'true'

export async function POST(req: NextRequest) {
  console.log('📧 Inbound email webhook triggered')

  // Verify webhook is from Resend (optional but recommended)
  const webhookSecret = req.headers.get('x-resend-signature')
  // TODO: Implement signature verification in production

  if (!ENABLE_EMAIL_PROCESSING) {
    console.log('⏭️  Email processing disabled (feature flag)')
    return NextResponse.json({ 
      success: true, 
      message: 'Email processing disabled' 
    })
  }

  try {
    // Parse webhook payload
    const payload = await req.json()
    console.log('📬 Email received from:', payload.from?.email || payload.from)
    console.log('   Subject:', payload.subject)

    // Extract email data
    const emailData = {
      from_email: extractEmail(payload.from),
      from_name: extractName(payload.from),
      to_email: extractEmail(payload.to),
      subject: payload.subject || '',
      body_text: payload.text || payload.html || '',
      body_html: payload.html,
      message_id: payload.message_id,
      in_reply_to: payload.in_reply_to,
      references: payload.references,
      headers: payload.headers || {},
      raw_webhook_data: payload,
      has_attachments: payload.attachments && payload.attachments.length > 0,
      attachment_count: payload.attachments?.length || 0,
    }

    // Store in database (use service client for webhook - no user session)
    const supabase = createServiceClient()
    const { data: emailRecord, error: insertError } = await supabase
      .from('inbound_emails')
      .insert({
        from_email: emailData.from_email,
        from_name: emailData.from_name,
        to_email: emailData.to_email,
        subject: emailData.subject,
        body_text: emailData.body_text,
        body_html: emailData.body_html,
      message_id: emailData.message_id,
      in_reply_to: emailData.in_reply_to,
      email_references: emailData.references,
        headers: emailData.headers,
        has_attachments: emailData.has_attachments,
        attachment_count: emailData.attachment_count,
        raw_webhook_data: emailData.raw_webhook_data,
        received_at: new Date().toISOString(),
        processed: false,
      })
      .select()
      .single()

    if (insertError || !emailRecord) {
      console.error('❌ Failed to store email:', insertError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to store email' 
      }, { status: 500 })
    }

    console.log('✅ Email stored with ID:', emailRecord.id)

    // Process asynchronously (don't block webhook response)
    processEmailAsync(emailRecord.id, emailData)

    return NextResponse.json({ 
      success: true, 
      email_id: emailRecord.id,
      message: 'Email received and processing started'
    })

  } catch (error) {
    console.error('❌ Email webhook error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

/**
 * Process email asynchronously (AI analysis + matching + actions)
 */
async function processEmailAsync(emailId: string, emailData: any) {
  console.log('🔄 Starting async processing for email:', emailId)
  
  const supabase = createServiceClient()

  try {
    // Update processing status
    await supabase
      .from('inbound_emails')
      .update({ 
        processing_started_at: new Date().toISOString() 
      })
      .eq('id', emailId)

    // Step 1: AI Analysis
    console.log('🤖 Step 1: AI Analysis')
    const analysis = await analyzeEmail({
      from_email: emailData.from_email,
      from_name: emailData.from_name,
      subject: emailData.subject,
      body_text: emailData.body_text,
      body_html: emailData.body_html,
      has_attachments: emailData.has_attachments,
      attachment_filenames: emailData.raw_webhook_data?.attachments?.map((a: any) => a.filename),
    })

    // Store analysis
    const { data: analysisRecord } = await supabase
      .from('email_analysis')
      .insert({
        email_id: emailId,
        email_type: analysis.email_type,
        confidence_score: analysis.confidence_score,
        sentiment: analysis.sentiment,
        sentiment_score: analysis.sentiment_score,
        priority: analysis.priority,
        urgency_score: analysis.urgency_score,
        detected_claim_references: analysis.detected_claim_references,
        mentioned_names: analysis.detected_names,
        mentioned_license_plates: analysis.detected_license_plates,
        mentioned_policy_numbers: analysis.detected_policy_numbers,
        mentioned_amount: analysis.detected_amounts[0] || null,
        mentioned_dates: analysis.detected_dates,
        requires_response: analysis.requires_response,
        requires_admin_action: analysis.requires_admin_action,
        suggested_actions: analysis.suggested_actions,
        summary_nl: analysis.summary_nl,
        key_points: analysis.key_points,
        detected_language: analysis.detected_language,
        raw_ai_response: analysis.raw_ai_response,
        processing_time_ms: analysis.processing_time_ms,
        tokens_used: analysis.tokens_used,
      })
      .select()
      .single()

    console.log('✅ Analysis stored')

    // Step 2: Claim Matching
    console.log('🔍 Step 2: Claim Matching')
    const matchResult = await matchEmailToClaim(
      {
        from_email: emailData.from_email,
        subject: emailData.subject,
        body_text: emailData.body_text,
      },
      analysis
    )

    let claimId: string | null = null
    let matchConfidence: number | null = null

    if (matchResult.best_match) {
      claimId = matchResult.best_match.claim_id
      matchConfidence = matchResult.best_match.confidence

      // Link email to claim
      await supabase
        .from('inbound_emails')
        .update({
          claim_id: claimId,
          match_confidence: matchConfidence,
          analysis_id: analysisRecord.id,
        })
        .eq('id', emailId)

      // Update claim stats
      // First fetch current count
      const { data: currentClaim } = await supabase
        .from('claims')
        .select('verzekeraar_email_count')
        .eq('id', claimId)
        .single()

      const newCount = (currentClaim?.verzekeraar_email_count || 0) + 1

      await supabase
        .from('claims')
        .update({
          last_verzekeraar_email_at: new Date().toISOString(),
          verzekeraar_email_count: newCount,
          latest_verzekeraar_response_type: analysis.email_type,
        })
        .eq('id', claimId)

      console.log('✅ Email linked to claim:', claimId)

      // Log audit
      await logAuditAction({
        claimId: claimId,
        actionType: 'email_received',
        details: {
          email_id: emailId,
          email_type: analysis.email_type,
          confidence: matchConfidence,
          summary: analysis.summary_nl,
        },
        severity: 'info',
        performedBy: 'SYSTEM',
      })
    } else {
      console.log('⚠️  No claim match found')
    }

    // Step 3: Auto Status Update (if enabled and confidence high enough)
    if (claimId && AUTO_UPDATE_ENABLED && shouldAutoUpdate(analysis)) {
      console.log('🚀 Step 3: Auto Status Update')
      
      const newStatus = analysis.suggested_status_change || getStatusFromEmailType(analysis.email_type)
      
      if (newStatus) {
        await supabase
          .from('claims')
          .update({
            status: newStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('id', claimId)

        console.log('✅ Status auto-updated to:', newStatus)

        // Log auto action
        await supabase
          .from('auto_actions')
          .insert({
            email_id: emailId,
            claim_id: claimId,
            action_type: 'status_update',
            action_description: `Status automatisch bijgewerkt naar '${newStatus}' op basis van verzekeraar email`,
            confidence_score: analysis.confidence_score,
            decision_factors: {
              email_type: analysis.email_type,
              sentiment: analysis.sentiment,
              ai_summary: analysis.summary_nl,
            },
            success: true,
          })

        // Log audit
        await logAuditAction({
          claimId: claimId,
          actionType: 'status_change',
          details: {
            oude_status: 'in_behandeling', // TODO: get actual old status
            nieuwe_status: newStatus,
            reden: `Automatisch bijgewerkt op basis van verzekeraar email: ${analysis.summary_nl}`,
            email_id: emailId,
          },
          severity: 'info',
          performedBy: 'SYSTEM',
        })
      }
    } else if (!AUTO_UPDATE_ENABLED) {
      console.log('⏭️  Auto status update disabled (feature flag)')
    }

    // Step 4: Notifications
    console.log('📬 Step 4: Notifications')
    
    if (claimId && matchConfidence && matchConfidence > 80) {
      // Notify claimer: "Nieuwe reactie van verzekeraar ontvangen"
      const { data: claim } = await supabase
        .from('claims')
        .select('email, naam, verzekeraar_tegenpartij')
        .eq('id', claimId)
        .single()

      if (claim && claim.email) {
        const notification = emailReceivedNotification({
          claimerName: claim.naam,
          verzekeraarName: claim.verzekeraar_tegenpartij || emailData.from_name || emailData.from_email,
          emailType: analysis.email_type,
          summary: analysis.summary_nl,
          dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/status/${claimId}`,
        })

        await sendEmail({
          to: claim.email,
          subject: notification.subject,
          html: notification.html,
        })

        console.log('✅ Claimer notified')
      }
    }

    // Notify admin if requires review
    if (matchResult.requires_manual_review || analysis.requires_admin_action) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@autoschadebureau.nl'
      
      const adminNotification = adminEmailReviewNeeded({
        emailId: emailId,
        from: emailData.from_email,
        subject: emailData.subject,
        emailType: analysis.email_type,
        confidence: matchConfidence || 0,
        summary: analysis.summary_nl,
        reason: matchResult.requires_manual_review ? 'Geen duidelijke claim match' : 'Admin actie vereist',
        dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/emails/${emailId}`,
      })

      await sendEmail({
        to: adminEmail,
        subject: adminNotification.subject,
        html: adminNotification.html,
      })

      console.log('✅ Admin notified for review')

      // Mark claim for manual review if matched
      if (claimId) {
        await supabase
          .from('claims')
          .update({
            requires_manual_review: true,
            manual_review_reason: matchResult.requires_manual_review 
              ? 'Email ontvangen maar match onzeker' 
              : 'Email vereist admin actie',
          })
          .eq('id', claimId)
      }
    }

    // Mark as processed
    await supabase
      .from('inbound_emails')
      .update({
        processed: true,
        processing_completed_at: new Date().toISOString(),
      })
      .eq('id', emailId)

    console.log('✅ Email processing completed successfully!')

  } catch (error) {
    console.error('❌ Email processing failed:', error)
    
    // Store error
    await supabase
      .from('inbound_emails')
      .update({
        processed: false,
        processing_completed_at: new Date().toISOString(),
        processing_error: error instanceof Error ? error.message : 'Unknown error',
      })
      .eq('id', emailId)

    // Notify admin about processing error
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@autoschadebureau.nl'
    await sendEmail({
      to: adminEmail,
      subject: `⚠️ Email Processing Error - ${emailId}`,
      html: `
        <h2>Email Processing Failed</h2>
        <p><strong>Email ID:</strong> ${emailId}</p>
        <p><strong>From:</strong> ${emailData.from_email}</p>
        <p><strong>Subject:</strong> ${emailData.subject}</p>
        <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/emails/${emailId}">View in Dashboard</a></p>
      `,
    })
  }
}

/**
 * Helpers
 */

function extractEmail(emailString: string | any): string {
  if (typeof emailString === 'string') {
    const match = emailString.match(/<(.+?)>/)
    return match ? match[1] : emailString
  }
  return emailString?.email || emailString?.address || ''
}

function extractName(emailString: string | any): string | undefined {
  if (typeof emailString === 'string') {
    const match = emailString.match(/^(.+?)\s*</)
    return match ? match[1].trim() : undefined
  }
  return emailString?.name
}

function getStatusFromEmailType(emailType: string): string | null {
  const statusMap: Record<string, string> = {
    liability_acceptance: 'in_onderhandeling',
    rejection: 'afgewezen',
    information_request: 'informatie_gevraagd',
    settlement_offer: 'in_onderhandeling',
    acknowledgment: 'in_behandeling',
  }
  return statusMap[emailType] || null
}
