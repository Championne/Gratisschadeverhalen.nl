'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { logAuditAction } from '@/lib/audit/logger'

interface ClaimSubmission {
  naam: string
  email: string
  telefoon: string
  kenteken_tegenpartij: string
  datum_ongeval: string
  plaats_ongeval: string  // Verplicht
  beschrijving: string
  naam_tegenpartij: string
  verzekeraar_tegenpartij: string
  polisnummer_tegenpartij?: string  // Enige optionele veld
  ocrData?: any
}

export async function submitClaim(data: ClaimSubmission) {
  try {
    console.log('🚀 === SUBMIT CLAIM START ===')
    console.log('Data:', data.naam, data.email)
    const supabase = await createClient()

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    console.log('User ID:', user?.id || 'ANONYMOUS')

    // Insert claim into database
    console.log('⏳ Inserting into database...')
    const { data: claim, error: insertError } = await supabase
      .from('claims')
      .insert({
        user_id: user?.id || null, // null voor guest submissions
        naam: data.naam,
        email: data.email,
        telefoon: data.telefoon,
        kenteken_tegenpartij: data.kenteken_tegenpartij,
        datum_ongeval: data.datum_ongeval,
        plaats_ongeval: data.plaats_ongeval,
        beschrijving: data.beschrijving,
        naam_tegenpartij: data.naam_tegenpartij,
        verzekeraar_tegenpartij: data.verzekeraar_tegenpartij,
        polisnummer_tegenpartij: data.polisnummer_tegenpartij,
        ocr_data: data.ocrData || {},
        ocr_confidence: data.ocrData?.confidence || 0,
        status: 'nieuw',
        mogelijk_letselschade: false, // AI agent zal dit updaten
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌❌❌ DATABASE ERROR ❌❌❌')
      console.error('Error message:', insertError.message)
      console.error('Error code:', insertError.code)
      console.error('Error details:', insertError.details)
      console.error('Full error:', JSON.stringify(insertError, null, 2))
      return {
        success: false,
        error: 'Kon claim niet opslaan in database',
        details: insertError.message,
      }
    }

    console.log('✅✅✅ Claim opgeslagen:', claim.id)

    // Log claim submission to audit trail
    try {
      await logAuditAction({
        claimId: claim.id,
        actionType: 'claim_submit',
        performedBy: user?.id ? `USER:${user.id}` : 'ANONYMOUS',
        details: {
          naam: data.naam,
          email: data.email,
          kenteken_tegenpartij: data.kenteken_tegenpartij,
          has_ocr: !!data.ocrData,
          ocr_confidence: data.ocrData?.confidence || 0,
        },
        severity: 'info',
      })
      console.log('✅ Audit log created for claim submission')
    } catch (auditError) {
      console.error('⚠️ Failed to create audit log:', auditError)
      // Continue anyway - audit logging should not block claim submission
    }

    // Trigger AI agent processing (fire and forget)
    triggerAgentProcessing(claim.id).catch(err => {
      console.error('Agent processing failed:', err)
    })

    revalidatePath('/dashboard')

    return {
      success: true,
      claimId: claim.id,
      message: 'Claim succesvol ingediend!',
    }

  } catch (error: any) {
    console.error('❌ Submit claim error:', error)
    return {
      success: false,
      error: error.message || 'Er ging iets mis bij het indienen van de claim',
    }
  }
}

/**
 * Trigger AI agent processing in background
 */
async function triggerAgentProcessing(claimId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    console.log('🤖 Triggering AI agent for claim:', claimId)
    
    const response = await fetch(`${baseUrl}/api/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claimId }),
    })

    if (!response.ok) {
      throw new Error(`Agent API returned ${response.status}`)
    }

    const result = await response.json()
    console.log('🤖 AI Agent verwerking gestart voor claim:', claimId)
    console.log('Agent response:', result.agent_response)

    return result

  } catch (error) {
    console.error('Failed to trigger agent processing:', error)
    throw error
  }
}
