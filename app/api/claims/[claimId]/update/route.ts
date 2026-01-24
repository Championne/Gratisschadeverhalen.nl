/**
 * User Claim Update API
 * 
 * Allows users to update their own claims
 * Automatically triggers AI reanalysis for relevant changes
 */

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logAuditAction } from "@/lib/audit/logger"

// Velden die gebruikers mogen wijzigen
const USER_EDITABLE_FIELDS = [
  'beschrijving',
  'plaats_ongeval',
  'kenteken_tegenpartij',
  'naam_tegenpartij',
  'verzekeraar_tegenpartij',
  'polisnummer_tegenpartij',
  'geschatte_schade',
]

// Velden die AI heranalyse triggeren
const AI_RELEVANT_FIELDS = [
  'beschrijving',
  'kenteken_tegenpartij',
  'naam_tegenpartij',
  'verzekeraar_tegenpartij',
  'geschatte_schade',
]

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { claimId } = await params
    const body = await request.json()

    // Verify claim ownership
    const { data: claim, error: fetchError } = await supabase
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !claim) {
      return NextResponse.json({ error: 'Claim not found or access denied' }, { status: 404 })
    }

    // Check if claim can still be edited (not finalized)
    const finalStatuses = ['afgerond', 'geweigerd', 'geannuleerd']
    if (finalStatuses.includes(claim.status)) {
      return NextResponse.json({ 
        error: 'Claim cannot be edited',
        message: 'Deze claim is al afgerond en kan niet meer worden gewijzigd.'
      }, { status: 400 })
    }

    // Filter only allowed fields
    const allowedUpdates: Record<string, any> = {}
    const changes: Record<string, { old: any, new: any }> = {}

    for (const field of USER_EDITABLE_FIELDS) {
      if (body[field] !== undefined && body[field] !== claim[field]) {
        allowedUpdates[field] = body[field]
        changes[field] = { old: claim[field], new: body[field] }
      }
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Geen wijzigingen gedetecteerd',
        changesCount: 0 
      })
    }

    // Bepaal of AI-relevante velden zijn gewijzigd
    const changedFields = Object.keys(changes)
    const aiRelevantChanges = changedFields.filter(field => AI_RELEVANT_FIELDS.includes(field))
    const shouldTriggerReanalysis = aiRelevantChanges.length > 0

    // Add metadata
    allowedUpdates.updated_at = new Date().toISOString()
    
    if (shouldTriggerReanalysis) {
      allowedUpdates.reanalysis_needed = true
      allowedUpdates.reanalysis_reason = `Gebruiker wijziging: ${aiRelevantChanges.join(', ')}`
    }

    // Update claim
    const { data: updatedClaim, error: updateError } = await supabase
      .from('claims')
      .update(allowedUpdates)
      .eq('id', claimId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating claim:', updateError)
      return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 })
    }

    // Log audit action
    await logAuditAction({
      claimId,
      actionType: 'user_edit',
      performedBy: `USER:${user.email}`,
      details: {
        changes,
        edited_fields: changedFields,
        ai_relevant_changes: aiRelevantChanges,
        triggered_reanalysis: shouldTriggerReanalysis,
        edited_by: user.email,
        timestamp: new Date().toISOString(),
      },
      severity: 'info',
    })

    console.log(`[USER EDIT] ${user.email} updated claim ${claimId}:`, changedFields)

    // Trigger AI reanalyse als relevante velden zijn gewijzigd
    let reanalysisResult = null
    if (shouldTriggerReanalysis && process.env.ENABLE_AUTO_REANALYSIS === 'true') {
      console.log('🔄 Triggering AI reanalysis due to user edit...')
      
      try {
        // Fire and forget
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/agent/reanalyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimId,
            reason: `Gebruiker wijziging: ${aiRelevantChanges.join(', ')}`,
            triggeredBy: `user:${user.email}`,
            includePhotos: true,
          }),
        }).then(res => res.json()).then(result => {
          console.log('✅ Reanalysis triggered successfully')
        }).catch(err => {
          console.error('⚠️ Reanalysis trigger failed:', err)
        })
        
        reanalysisResult = { triggered: true }
      } catch (reanalysisError) {
        console.error('Error triggering reanalysis:', reanalysisError)
      }
    }

    return NextResponse.json({
      success: true,
      message: `${changedFields.length} veld(en) bijgewerkt`,
      claim: updatedClaim,
      changesCount: changedFields.length,
      aiReanalysis: reanalysisResult,
    })

  } catch (error) {
    console.error('[User Claim Update API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET: Fetch editable claim data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { claimId } = await params

    const { data: claim, error } = await supabase
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .eq('user_id', user.id)
      .single()

    if (error || !claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Check if editable
    const finalStatuses = ['afgerond', 'geweigerd', 'geannuleerd']
    const canEdit = !finalStatuses.includes(claim.status)

    return NextResponse.json({
      success: true,
      claim,
      canEdit,
      editableFields: canEdit ? USER_EDITABLE_FIELDS : [],
    })

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
