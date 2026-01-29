/**
 * Review Request Cron Job
 * 
 * Stuurt automatisch een review verzoek naar klanten na succesvolle claim
 * Vercel Cron: 0 10 * * * (elke dag om 10:00 UTC = 11:00 Amsterdam)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { logAuditAction } from '@/lib/audit/logger'

export const runtime = 'nodejs'
export const maxDuration = 60

// Email template voor review request
function generateReviewRequestEmail(data: {
  naam: string
  claimId: string
  reviewUrl: string
}): { subject: string; html: string } {
  const firstName = data.naam.split(' ')[0]
  
  return {
    subject: `${firstName}, hoe was uw ervaring met Autoschadebureau.nl?`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #16a34a; margin: 0;">Autoschadebureau.nl</h1>
  </div>

  <p>Beste ${firstName},</p>

  <p>Goed nieuws! Uw schadeclaim is succesvol afgerond. Wij hopen dat u tevreden bent met onze service.</p>

  <p>Wij zouden het enorm waarderen als u een korte review wilt achterlaten over uw ervaring. Dit helpt andere automobilisten om ons te vinden én helpt ons om onze service te verbeteren.</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${data.reviewUrl}" 
       style="display: inline-block; background-color: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
      ⭐ Laat een review achter
    </a>
    <p style="color: #666; font-size: 14px; margin-top: 10px;">Duurt slechts 1 minuut</p>
  </div>

  <p>Alvast hartelijk dank!</p>

  <p>Met vriendelijke groet,<br>
  <strong>Team Autoschadebureau.nl</strong></p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
  <p style="color: #999; font-size: 12px;">
    U ontvangt deze email omdat uw schadeclaim bij ons is afgehandeld.
    <br>
    <a href="mailto:info@autoschadebureau.nl" style="color: #999;">Uitschrijven</a>
  </p>

</body>
</html>
    `.trim()
  }
}

export async function GET(request: NextRequest) {
  try {
    // 🔒 SECURITY: Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'dev-secret-change-in-production'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.log('❌ Unauthorized cron access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 🚨 FEATURE FLAG: Check of review request systeem enabled is
    const REVIEW_REQUEST_ENABLED = process.env.ENABLE_REVIEW_REQUEST_SYSTEM === 'true'
    
    if (!REVIEW_REQUEST_ENABLED) {
      console.log('⏭️ Review request systeem disabled (feature flag)')
      return NextResponse.json({ 
        success: true, 
        message: 'Review request systeem is disabled',
        processed: 0 
      })
    }

    // Check of Google Review URL geconfigureerd is
    const GOOGLE_REVIEW_URL = process.env.GOOGLE_REVIEW_URL
    if (!GOOGLE_REVIEW_URL) {
      console.log('❌ GOOGLE_REVIEW_URL niet geconfigureerd')
      return NextResponse.json({ 
        error: 'GOOGLE_REVIEW_URL environment variable not set' 
      }, { status: 500 })
    }

    console.log('🔄 === REVIEW REQUEST CRON JOB START ===')
    console.log('⏰ Tijd:', new Date().toLocaleString('nl-NL'))

    const supabase = await createClient()

    // Haal claims op die review request nodig hebben
    const { data: claims, error: fetchError } = await supabase.rpc('get_claims_needing_review_request')

    if (fetchError) {
      console.error('❌ Database query failed:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch claims', details: fetchError.message },
        { status: 500 }
      )
    }

    if (!claims || claims.length === 0) {
      console.log('✅ Geen claims gevonden die review request nodig hebben')
      return NextResponse.json({ 
        success: true, 
        message: 'No review requests needed',
        processed: 0 
      })
    }

    console.log(`📋 ${claims.length} claim(s) gevonden voor review request`)

    // Verwerk elke claim
    let processed = 0
    let errors = 0
    const results = []

    for (const claim of claims) {
      console.log(`\n🔄 Verwerken claim: ${claim.id} (${claim.naam})`)
      console.log(`   Status: ${claim.status}`)
      console.log(`   Uren sinds afronding: ${claim.uren_sinds_afronding}`)
      
      try {
        // Genereer email
        const emailContent = generateReviewRequestEmail({
          naam: claim.naam,
          claimId: claim.id,
          reviewUrl: GOOGLE_REVIEW_URL,
        })

        // Verstuur email
        console.log(`   📧 Versturen naar: ${claim.email}`)
        await sendEmail({
          to: claim.email,
          subject: emailContent.subject,
          html: emailContent.html,
        })
        console.log('   ✅ Review request email verzonden')

        // Update database
        const { error: updateError } = await supabase.rpc('mark_review_request_sent', {
          p_claim_id: claim.id,
        })

        if (updateError) {
          console.error('   ❌ Database update failed:', updateError)
          throw updateError
        }

        // Log in audit trail
        await logAuditAction({
          claimId: claim.id,
          actionType: 'email_sent',
          performedBy: 'SYSTEM:CRON',
          details: {
            email_type: 'review_request',
            recipient: claim.email,
            automated: true,
            cron_job: true,
          },
          severity: 'info',
        })

        console.log('   🎉 Review request succesvol verzonden!')
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
      }
    }

    // Samenvatting
    console.log(`\n✅ === REVIEW REQUEST CRON JOB COMPLEET ===`)
    console.log(`📊 Totaal: ${claims.length} claims`)
    console.log(`✅ Succesvol: ${processed}`)
    console.log(`❌ Errors: ${errors}`)

    return NextResponse.json({
      success: true,
      message: 'Review request cron job completed',
      stats: {
        total: claims.length,
        processed,
        errors,
      },
      results,
    })

  } catch (error: any) {
    console.error('❌ Cron job fatal error:', error)
    
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
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'POST only allowed in development' }, { status: 403 })
  }

  console.log('🧪 Manual review request trigger (development mode)')
  return GET(request)
}
