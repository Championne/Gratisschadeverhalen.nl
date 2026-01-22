/**
 * Follow-up Cron Job
 * 
 * Draait dagelijks om claims te checken die een herinnering nodig hebben
 * Vercel Cron: 0 9 * * * (elke dag om 09:00 UTC)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { generateFollowUpEmail, generateClaimerNotificationEmail } from '@/lib/follow-up/email-generator'
import { logAuditAction } from '@/lib/audit/logger'

export const runtime = 'nodejs'
export const maxDuration = 60 // Max 60 seconden voor cron job

export async function GET(request: NextRequest) {
  try {
    // 🔒 SECURITY: Verify cron secret (Vercel Cron geheime token)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'dev-secret-change-in-production'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.log('❌ Unauthorized cron access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 🚨 FEATURE FLAG: Check of follow-up systeem enabled is
    const FOLLOW_UP_ENABLED = process.env.ENABLE_FOLLOW_UP_SYSTEM === 'true'
    
    if (!FOLLOW_UP_ENABLED) {
      console.log('⏭️ Follow-up systeem disabled (feature flag)')
      return NextResponse.json({ 
        success: true, 
        message: 'Follow-up systeem is disabled',
        processed: 0 
      })
    }

    console.log('🔄 === FOLLOW-UP CRON JOB START ===')
    console.log('⏰ Tijd:', new Date().toLocaleString('nl-NL'))

    const supabase = await createClient()

    // Haal claims op die herinnering nodig hebben
    const { data: claims, error: fetchError } = await supabase.rpc('get_claims_needing_followup')

    if (fetchError) {
      console.error('❌ Database query failed:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch claims', details: fetchError.message },
        { status: 500 }
      )
    }

    if (!claims || claims.length === 0) {
      console.log('✅ Geen claims gevonden die herinnering nodig hebben')
      return NextResponse.json({ 
        success: true, 
        message: 'No follow-ups needed',
        processed: 0 
      })
    }

    console.log(`📋 ${claims.length} claim(s) gevonden die herinnering nodig hebben`)

    // Verwerk elke claim
    let processed = 0
    let errors = 0
    const results = []

    for (const claim of claims) {
      console.log(`\n🔄 Verwerken claim: ${claim.id} (${claim.naam})`)
      console.log(`   Verzekeraar: ${claim.verzekeraar_tegenpartij}`)
      console.log(`   Wachttijd: ${claim.dagen_wachttijd} dagen`)
      
      try {
        // Check of verzekeraar email bekend is
        if (!claim.verzekeraar_email) {
          console.log(`   ⚠️  Geen verzekeraar email - skip`)
          results.push({ claimId: claim.id, status: 'skipped', reason: 'No verzekeraar email' })
          continue
        }

        // 1. Genereer email via Claude AI
        console.log('   🤖 Genereren email via Claude AI...')
        const emailContent = await generateFollowUpEmail({
          claimId: claim.id,
          naam_claimer: claim.naam,
          email_claimer: claim.email,
          telefoon_claimer: claim.telefoon,
          kenteken_tegenpartij: claim.kenteken_tegenpartij,
          verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij,
          datum_ongeval: claim.datum_ongeval,
          plaats_ongeval: claim.plaats_ongeval || 'Niet opgegeven',
          beschrijving: claim.beschrijving,
          dagen_wachttijd: claim.dagen_wachttijd,
        })

        // 2. Verstuur naar verzekeraar
        console.log(`   📧 Versturen naar: ${claim.verzekeraar_email}`)
        await sendEmail({
          to: claim.verzekeraar_email,
          cc: claim.email, // CC naar claimer
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.plainText,
        })
        console.log('   ✅ Email verzonden naar verzekeraar')

        // 3. Update database
        console.log('   💾 Updaten database...')
        const { error: updateError } = await supabase.rpc('mark_followup_sent', {
          p_claim_id: claim.id,
        })

        if (updateError) {
          console.error('   ❌ Database update failed:', updateError)
          throw updateError
        }

        // 4. Verstuur notificatie naar claimer
        console.log('   📧 Notificeren claimer...')
        const claimerNotification = generateClaimerNotificationEmail({
          naam: claim.naam,
          claimId: claim.id,
          verzekeraar: claim.verzekeraar_tegenpartij,
          dagen_wachttijd: claim.dagen_wachttijd,
        })

        await sendEmail({
          to: claim.email,
          subject: claimerNotification.subject,
          html: claimerNotification.html,
        })
        console.log('   ✅ Notificatie verzonden naar claimer')

        // 5. Log in audit trail
        await logAuditAction({
          claimId: claim.id,
          actionType: 'email_sent',
          performedBy: 'SYSTEM:CRON',
          details: {
            email_type: 'follow_up_reminder',
            recipient: claim.verzekeraar_email,
            cc: claim.email,
            dagen_wachttijd: claim.dagen_wachttijd,
            verzekeraar: claim.verzekeraar_tegenpartij,
            automated: true,
            cron_job: true,
          },
          severity: 'info',
        })

        console.log('   🎉 Claim succesvol verwerkt!')
        processed++
        results.push({ claimId: claim.id, status: 'success' })

      } catch (error: any) {
        console.error(`   ❌ Error bij verwerken claim ${claim.id}:`, error)
        errors++
        results.push({ 
          claimId: claim.id, 
          status: 'error', 
          error: error.message 
        })

        // Log error in audit trail
        await logAuditAction({
          claimId: claim.id,
          actionType: 'escalatie',
          performedBy: 'SYSTEM:CRON',
          details: {
            error: 'Follow-up email failed',
            error_message: error.message,
            verzekeraar: claim.verzekeraar_tegenpartij,
          },
          severity: 'critical',
        })
      }
    }

    // Samenvating
    console.log(`\n✅ === FOLLOW-UP CRON JOB COMPLEET ===`)
    console.log(`📊 Totaal: ${claims.length} claims`)
    console.log(`✅ Succesvol: ${processed}`)
    console.log(`❌ Errors: ${errors}`)

    // Stuur samenvattende email naar admin als er errors zijn
    if (errors > 0) {
      const adminEmail = process.env.RESEND_ADMIN_EMAIL
      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `⚠️ Follow-up Cron Job: ${errors} error(s)`,
          html: `
            <h2>Follow-up Cron Job Resultaten</h2>
            <p><strong>Datum:</strong> ${new Date().toLocaleString('nl-NL')}</p>
            <p><strong>Totaal verwerkt:</strong> ${claims.length}</p>
            <p><strong>Succesvol:</strong> ${processed}</p>
            <p><strong>Errors:</strong> ${errors}</p>
            <h3>Details:</h3>
            <pre>${JSON.stringify(results, null, 2)}</pre>
          `,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Follow-up cron job completed',
      stats: {
        total: claims.length,
        processed,
        errors,
      },
      results,
    })

  } catch (error: any) {
    console.error('❌ Cron job fatal error:', error)
    
    // Notificeer admin bij fatale error
    const adminEmail = process.env.RESEND_ADMIN_EMAIL
    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: '🚨 KRITIEK: Follow-up Cron Job Failed',
          html: `
            <h2>Follow-up Cron Job Crash</h2>
            <p><strong>Error:</strong> ${error.message}</p>
            <p><strong>Stack:</strong></p>
            <pre>${error.stack}</pre>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send admin notification:', emailError)
      }
    }

    return NextResponse.json(
      { 
        error: 'Cron job failed', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// POST endpoint voor handmatig triggeren (development/testing)
export async function POST(request: NextRequest) {
  // Alleen in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'POST only allowed in development' }, { status: 403 })
  }

  console.log('🧪 Manual follow-up trigger (development mode)')
  
  // Call GET handler
  return GET(request)
}
