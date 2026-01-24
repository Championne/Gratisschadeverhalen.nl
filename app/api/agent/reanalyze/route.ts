/**
 * AI Agent Reanalyze Endpoint
 * 
 * Hertrigger AI analyse voor bestaande claims bij:
 * - Nieuwe document uploads
 * - Inbound email met bijlagen
 * - Handmatige trigger door admin
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { analyzeClaimFull } from '@/lib/ai/claim-analyzer'
import { logAuditAction } from '@/lib/audit/logger'
import { sendEmail } from '@/lib/email/resend'
import { claimReanalyzedEmail } from '@/lib/email/templates'

// Feature flag
const ENABLE_AUTO_REANALYSIS = process.env.ENABLE_AUTO_REANALYSIS === 'true'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { claimId, reason, triggeredBy, newDocumentIds, includePhotos } = body

    if (!claimId) {
      return NextResponse.json({ error: 'No claimId provided' }, { status: 400 })
    }

    console.log('🔄 === AI REANALYSIS START ===')
    console.log('   Claim ID:', claimId)
    console.log('   Reason:', reason)
    console.log('   Triggered by:', triggeredBy || 'system')

    if (!ENABLE_AUTO_REANALYSIS && triggeredBy !== 'admin') {
      console.log('⏭️ Auto-reanalysis disabled (feature flag)')
      return NextResponse.json({ 
        success: true, 
        message: 'Reanalysis disabled by feature flag',
        processed: false 
      })
    }

    const supabase = createServiceClient()

    // Haal claim op
    const { data: claim, error: fetchError } = await supabase
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .single()

    if (fetchError || !claim) {
      console.error('❌ Claim not found:', fetchError)
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Haal nieuwe documenten op (indien opgegeven)
    let photoUrls: string[] = claim.photo_urls || []
    let photoBase64: string[] = []

    if (newDocumentIds && newDocumentIds.length > 0) {
      const { data: documents } = await supabase
        .from('claim_documents')
        .select('*')
        .in('id', newDocumentIds)
        .eq('file_type', 'image')

      if (documents) {
        photoUrls = [...photoUrls, ...documents.map(d => d.file_url)]
      }
    }

    // Als includePhotos flag en er zijn documenten die nog niet geanalyseerd zijn
    if (includePhotos) {
      const { data: unanalyzedDocs } = await supabase
        .from('claim_documents')
        .select('*')
        .eq('claim_id', claimId)
        .eq('ai_analyzed', false)
        .eq('file_type', 'image')

      if (unanalyzedDocs) {
        photoUrls = [...photoUrls, ...unanalyzedDocs.map(d => d.file_url)]
      }
    }

    // Voer volledige heranalyse uit
    const analysisResult = await analyzeClaimFull({
      claimId: claim.id,
      naam: claim.naam,
      email: claim.email,
      telefoon: claim.telefoon,
      datum_ongeval: claim.datum_ongeval,
      plaats_ongeval: claim.plaats_ongeval,
      beschrijving: claim.beschrijving,
      kenteken_tegenpartij: claim.kenteken_tegenpartij,
      naam_tegenpartij: claim.naam_tegenpartij,
      verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij,
      polisnummer_tegenpartij: claim.polisnummer_tegenpartij,
      ocr_data: claim.ocr_data,
      ocr_confidence: claim.ocr_confidence,
      photo_urls: photoUrls,
      existing_ai_notes: claim.ai_notes,
      is_reanalysis: true,
      reanalysis_reason: reason,
    })

    // Update claim met nieuwe analyse
    const updateData: any = {
      ai_notes: analysisResult.ai_notes,
      mogelijk_letselschade: analysisResult.mogelijk_letselschade,
      liability_percentage: analysisResult.liability_percentage,
      liability_confidence: analysisResult.liability_confidence,
      expert_needed: analysisResult.expert_needed,
      expert_reason: analysisResult.expert_reason,
      reanalysis_needed: false,
      reanalysis_reason: null,
      last_ai_analysis_at: new Date().toISOString(),
      ai_analysis_count: (claim.ai_analysis_count || 0) + 1,
      updated_at: new Date().toISOString(),
    }

    // Update damage estimate if available
    if (analysisResult.damage_estimate) {
      updateData.estimated_damage_min = analysisResult.damage_estimate.estimated_min
      updateData.estimated_damage_max = analysisResult.damage_estimate.estimated_max
      updateData.damage_estimate_confidence = analysisResult.damage_estimate.confidence
      updateData.damage_type = analysisResult.damage_estimate.damage_type
      updateData.ai_damage_analysis = analysisResult.damage_estimate
      updateData.photo_analysis_done = true
    }

    // Update status if recommended
    if (analysisResult.should_escalate && claim.status !== 'escalated') {
      updateData.status = 'escalated'
      updateData.escalatie_reden = analysisResult.escalation_reason
      updateData.escalatie_datum = new Date().toISOString()
    } else if (analysisResult.mogelijk_letselschade && claim.status !== 'letselschade_gedetecteerd') {
      updateData.status = 'letselschade_gedetecteerd'
    }

    const { error: updateError } = await supabase
      .from('claims')
      .update(updateData)
      .eq('id', claimId)

    if (updateError) {
      console.error('❌ Failed to update claim:', updateError)
    } else {
      console.log('✅ Claim updated with reanalysis results')
    }

    // Mark documents as analyzed
    if (newDocumentIds && newDocumentIds.length > 0) {
      await supabase
        .from('claim_documents')
        .update({
          ai_analyzed: true,
          ai_analyzed_at: new Date().toISOString(),
          ai_analysis: analysisResult.damage_estimate || {},
          triggered_reanalysis: true,
        })
        .in('id', newDocumentIds)
    }

    // Log audit
    await logAuditAction({
      claimId: claim.id,
      actionType: 'ai_reanalyse',
      performedBy: triggeredBy || 'SYSTEM',
      details: {
        reason,
        new_documents: newDocumentIds?.length || 0,
        photos_analyzed: photoUrls.length,
        letselschade_detected: analysisResult.mogelijk_letselschade,
        liability_percentage: analysisResult.liability_percentage,
        expert_needed: analysisResult.expert_needed,
        damage_estimate_min: analysisResult.damage_estimate?.estimated_min,
        damage_estimate_max: analysisResult.damage_estimate?.estimated_max,
        processing_time_ms: analysisResult.processing_time_ms,
        can_auto_process: analysisResult.can_auto_process,
      },
      severity: analysisResult.should_escalate ? 'warning' : 'info',
    })

    // Stuur notificatie naar klant
    if (triggeredBy !== 'admin') { // Geen notificatie bij handmatige admin trigger
      try {
        const emailTemplate = claimReanalyzedEmail({
          naam: claim.naam,
          claimId: claim.id,
          reason: reason,
          newStatus: updateData.status || claim.status,
          damageEstimate: analysisResult.damage_estimate 
            ? `€${analysisResult.damage_estimate.estimated_min} - €${analysisResult.damage_estimate.estimated_max}`
            : undefined,
          expertNeeded: analysisResult.expert_needed,
        })

        await sendEmail({
          to: claim.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
        })

        console.log('✅ Reanalysis notification sent to claimer')
      } catch (emailError) {
        console.error('⚠️ Failed to send reanalysis notification:', emailError)
      }
    }

    console.log('✅ === AI REANALYSIS COMPLETE ===')

    return NextResponse.json({
      success: true,
      message: 'Reanalysis completed',
      result: {
        letselschade: analysisResult.mogelijk_letselschade,
        liability_percentage: analysisResult.liability_percentage,
        expert_needed: analysisResult.expert_needed,
        damage_estimate: analysisResult.damage_estimate ? {
          min: analysisResult.damage_estimate.estimated_min,
          max: analysisResult.damage_estimate.estimated_max,
          confidence: analysisResult.damage_estimate.confidence,
        } : null,
        can_auto_process: analysisResult.can_auto_process,
        new_status: updateData.status || claim.status,
        processing_time_ms: analysisResult.processing_time_ms,
      },
    })

  } catch (error: any) {
    console.error('❌ Reanalysis error:', error)
    return NextResponse.json(
      { error: 'Reanalysis failed', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * GET: Check reanalysis queue
 */
export async function GET() {
  try {
    const supabase = createServiceClient()
    
    const { data, error } = await supabase.rpc('get_claims_needing_reanalysis')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({
      status: 'online',
      queue_length: data?.length || 0,
      claims_needing_reanalysis: data || [],
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
