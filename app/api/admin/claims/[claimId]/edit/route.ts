import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logAuditAction } from "@/lib/audit/logger"

// Velden die AI heranalyse triggeren bij wijziging
const AI_RELEVANT_FIELDS = [
  'beschrijving',
  'kenteken_tegenpartij',
  'naam_tegenpartij',
  'verzekeraar_tegenpartij',
  'datum_ongeval',
  'plaats_ongeval',
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
    const { changes, ...formData } = body

    // Use service role client for admin operations
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

    // Get current claim data for audit log
    const { data: currentClaim, error: fetchError } = await supabaseAdmin
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .single()

    if (fetchError || !currentClaim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Bepaal of AI-relevante velden zijn gewijzigd
    const changedFields = Object.keys(changes || {})
    const aiRelevantChanges = changedFields.filter(field => AI_RELEVANT_FIELDS.includes(field))
    const shouldTriggerReanalysis = aiRelevantChanges.length > 0

    // Update claim - voeg reanalysis flag toe indien nodig
    const updateData: any = {
      ...formData,
      updated_at: new Date().toISOString(),
    }

    if (shouldTriggerReanalysis) {
      updateData.reanalysis_needed = true
      updateData.reanalysis_reason = `Admin wijziging: ${aiRelevantChanges.join(', ')}`
    }

    const { data: updatedClaim, error: updateError } = await supabaseAdmin
      .from('claims')
      .update(updateData)
      .eq('id', claimId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating claim:', updateError)
      return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 })
    }

    // Log audit action with all changes
    await logAuditAction({
      claimId,
      actionType: 'manual_edit',
      performedBy: `ADMIN:${user.email}`,
      details: {
        changes: changes || {},
        edited_fields: changedFields,
        ai_relevant_changes: aiRelevantChanges,
        triggered_reanalysis: shouldTriggerReanalysis,
        edited_by: user.email,
        timestamp: new Date().toISOString(),
      },
      severity: 'info',
    })

    // Log each field change separately for better tracking
    if (changes && Object.keys(changes).length > 0) {
      for (const [field, change] of Object.entries(changes)) {
        console.log(`[ADMIN EDIT] ${user.email} changed ${field}: "${(change as any).old}" → "${(change as any).new}"`)
      }
    }

    // Trigger AI reanalyse als relevante velden zijn gewijzigd
    let reanalysisResult = null
    if (shouldTriggerReanalysis && process.env.ENABLE_AUTO_REANALYSIS === 'true') {
      console.log('🔄 Triggering AI reanalysis due to admin edit...')
      console.log('   Changed AI-relevant fields:', aiRelevantChanges)
      
      try {
        // Fire and forget - don't wait for reanalysis to complete
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/agent/reanalyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimId,
            reason: `Admin wijziging van: ${aiRelevantChanges.join(', ')}`,
            triggeredBy: `admin:${user.email}`,
            includePhotos: true,
          }),
        }).then(res => res.json()).then(result => {
          console.log('✅ Reanalysis triggered successfully')
        }).catch(err => {
          console.error('⚠️ Reanalysis trigger failed:', err)
        })
        
        reanalysisResult = { triggered: true, reason: `Changed fields: ${aiRelevantChanges.join(', ')}` }
      } catch (reanalysisError) {
        console.error('Error triggering reanalysis:', reanalysisError)
        reanalysisResult = { triggered: false, error: 'Failed to trigger' }
      }
    }

    return NextResponse.json({
      success: true,
      claim: updatedClaim,
      changesCount: changedFields.length,
      aiReanalysis: reanalysisResult,
    })
  } catch (error) {
    console.error('[Admin Edit API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
