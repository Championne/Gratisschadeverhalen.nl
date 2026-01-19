import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { sendEmail } from '@/lib/email/resend'
import { claimReceivedEmail, letselschadeDetectedEmail, adminNewClaimEmail, adminEscalationEmail } from '@/lib/email/templates'
import { logAuditAction, escalateClaim, shouldEscalateOnConfidence } from '@/lib/audit/logger'

export async function POST(request: NextRequest) {
  try {
    const { claimId } = await request.json()

    if (!claimId) {
      return NextResponse.json({ error: 'No claimId provided' }, { status: 400 })
    }

    console.log('🤖 AI Agent start verwerking van claim:', claimId)

    // Fetch claim from database
    const supabase = await createClient()
    const { data: claim, error: fetchError } = await supabase
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .single()

    if (fetchError || !claim) {
      console.error('Failed to fetch claim:', fetchError)
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Log AI analyse start
    await logAuditAction({
      claimId: claim.id,
      actionType: 'ai_analyse',
      performedBy: 'AI',
      details: {
        model: 'claude-sonnet-4-20250514',
        timestamp: new Date().toISOString(),
      },
      severity: 'info',
    })

    // Prepare context for AI
    const context = `
Analyse deze autoschade claim:

CLAIMER:
- Naam: ${claim.naam}
- Email: ${claim.email}
- Telefoon: ${claim.telefoon}

ONGEVAL:
- Datum: ${claim.datum_ongeval}
- Plaats: ${claim.plaats_ongeval || 'Niet opgegeven'}
- Beschrijving: ${claim.beschrijving}

TEGENPARTIJ:
- Kenteken: ${claim.kenteken_tegenpartij}
- Naam: ${claim.naam_tegenpartij || 'Niet opgegeven'}
- Verzekeraar: ${claim.verzekeraar_tegenpartij || 'Niet opgegeven'}
- Polisnummer: ${claim.polisnummer_tegenpartij || 'Niet opgegeven'}

OCR DATA:
${claim.ocr_data ? JSON.stringify(claim.ocr_data, null, 2) : 'Geen OCR data beschikbaar'}

TAAK:
1. Screen op letselschade (keywords: pijn, whiplash, letsel, gewond, hoofdpijn, nekklachten, etc.)
   - Let op: Negeer tekst zoals "geen letselschade" of "geen pijn"
   - Zoek naar POSITIEVE indicaties van letsel
2. Beoordeel aansprakelijkheid tegenpartij (0-100%)
3. Bepaal of automatische verwerking mogelijk is
4. Geef aanbeveling voor vervolgstappen

FORMAT ANTWOORD PRECIES ALS:
# CLAIM ANALYSE RESULTAAT

## 1. Letselschade Screening
**RESULTAAT: [LETSELSCHADE GEDETECTEERD / GEEN LETSELSCHADE GEDETECTEERD]**
- [Lijst met gevonden keywords of "Geen letsel-gerelateerde keywords gevonden"]

## 2. Aansprakelijkheid Beoordeling
**RESULTAAT: [AANSPRAKELIJKHEID PERCENTAGE]**
- Aansprakelijkheid: [0-100]%
- Reden: [Korte uitleg]

## 3. Automatische Verwerking
**RESULTAAT: [MOGELIJK / NIET MOGELIJK]**
- [Lijst met punten waarom wel/niet automatisch te verwerken]

## AANBEVELING
**[Hoofdaanbeveling in hoofdletters]**
- [Concrete vervolgstappen]
`.trim()

    // Call AI
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      prompt: context,
      temperature: 0.3,
    })

    console.log('✅ AI Agent verwerking compleet')
    console.log('Response:', text)

    // Parse AI response for letselschade detection
    const letselKeywords = ['pijn', 'whiplash', 'letsel', 'gewond', 'hoofdpijn', 'nekklachten', 'rugklachten', 'ziekenhuis', 'ambulance']
    const beschrijvingLower = claim.beschrijving.toLowerCase()
    
    // Check for POSITIVE injury indicators while excluding negative phrases
    const negativeLeemtselPhrases = ['geen letselschade', 'geen pijn', 'geen letsel', 'geen gewond', 'zonder pijn', 'zonder letsel']
    const hasNegativePhrase = negativeLeemtselPhrases.some(phrase => beschrijvingLower.includes(phrase))
    
    const heeftLetsel = !hasNegativePhrase && (
      letselKeywords.some(keyword => beschrijvingLower.includes(keyword)) ||
      text.toLowerCase().includes('letselschade gedetecteerd')
    )

    // =============================================
    // ESCALATIE LOGICA
    // =============================================
    
    // Extract AI confidence (parse from response if available)
    let aiConfidence: number | null = null
    const confidenceMatch = text.match(/aansprakelijkheid[:\s]+(\d+)%/i)
    if (confidenceMatch) {
      aiConfidence = parseInt(confidenceMatch[1])
    }

    // Check escalatie triggers
    const shouldEscalate = 
      shouldEscalateOnConfidence(claim.ocr_confidence, 70) || // OCR confidence < 70%
      shouldEscalateOnConfidence(aiConfidence, 70) ||          // AI confidence < 70%
      text.toLowerCase().includes('niet mogelijk') ||          // AI zegt automatisch niet mogelijk
      text.toLowerCase().includes('escalatie nodig') ||        // Expliciet door AI
      (!claim.verzekeraar_tegenpartij && !claim.naam_tegenpartij) // Geen tegenpartij info

    let escalatieReden = ''
    if (shouldEscalate) {
      // Bepaal specifieke reden
      if (shouldEscalateOnConfidence(claim.ocr_confidence, 70)) {
        escalatieReden = `OCR confidence te laag: ${claim.ocr_confidence || 0}% (< 70%)`
      } else if (shouldEscalateOnConfidence(aiConfidence, 70)) {
        escalatieReden = `AI aansprakelijkheid confidence te laag: ${aiConfidence}% (< 70%)`
      } else if (!claim.verzekeraar_tegenpartij && !claim.naam_tegenpartij) {
        escalatieReden = 'Onvolledige tegenpartij gegevens (geen naam of verzekeraar)'
      } else {
        escalatieReden = 'AI heeft handmatige review aanbevolen'
      }

      console.log('🚨 ESCALATIE GEDETECTEERD:', escalatieReden)

      // Escaleer de claim
      await escalateClaim({
        claimId: claim.id,
        reden: escalatieReden,
        performedBy: 'AI',
      })

      // Verstuur escalatie email naar admin
      try {
        const escalationEmailTemplate = adminEscalationEmail({
          claimId: claim.id,
          naam: claim.naam,
          email: claim.email,
          reden: escalatieReden,
          confidence: aiConfidence || claim.ocr_confidence || undefined,
          datum_ongeval: claim.datum_ongeval,
          kenteken_tegenpartij: claim.kenteken_tegenpartij,
          beschrijving: claim.beschrijving,
        })

        const adminEmail = process.env.RESEND_ADMIN_EMAIL || claim.email // TODO: Replace with real admin email
        
        console.log('📧 Versturen escalatie email naar admin:', adminEmail)
        await sendEmail({
          to: adminEmail,
          subject: escalationEmailTemplate.subject,
          html: escalationEmailTemplate.html,
        })
        console.log('✅ Escalatie email verzonden')

        // Log escalatie email
        await logAuditAction({
          claimId: claim.id,
          actionType: 'email_sent',
          performedBy: 'SYSTEM',
          details: {
            email_type: 'escalation',
            recipient: adminEmail,
            reden: escalatieReden,
          },
          severity: 'critical',
        })
      } catch (escalationEmailError) {
        console.error('❌ Escalatie email failed:', escalationEmailError)
      }
    }

    // Update claim with AI notes using RPC to bypass cache
    const newStatus = shouldEscalate ? 'escalated' : (heeftLetsel ? 'in_behandeling' : 'nieuw')
    
    const { error: updateError } = await supabase.rpc('update_claim_with_ai_notes', {
      claim_id: claimId,
      notes: text,
      new_status: newStatus,
      letsel_flag: heeftLetsel,
      letsel_keywords: heeftLetsel ? letselKeywords.filter(k => beschrijvingLower.includes(k)) : [],
    })

    if (updateError) {
      console.error('❌ Failed to save AI notes:', updateError)
    } else {
      console.log('✅✅✅ AI notes + status succesvol opgeslagen!')
      
      // Log status change
      await logAuditAction({
        claimId: claim.id,
        actionType: 'status_change',
        performedBy: 'AI',
        details: {
          oude_status: claim.status,
          nieuwe_status: newStatus,
          ai_confidence: aiConfidence,
          ocr_confidence: claim.ocr_confidence,
          mogelijk_letselschade: heeftLetsel,
          escalated: shouldEscalate,
        },
        severity: shouldEscalate ? 'critical' : 'info',
      })
    }

    // Send emails
    try {
      // Email to claimer
      const claimerEmailTemplate = heeftLetsel 
        ? letselschadeDetectedEmail({
            naam: claim.naam,
            claimId: claim.id,
            datum_ongeval: claim.datum_ongeval,
            kenteken_tegenpartij: claim.kenteken_tegenpartij,
            status: newStatus,
            mogelijk_letselschade: heeftLetsel,
          })
        : claimReceivedEmail({
            naam: claim.naam,
            claimId: claim.id,
            datum_ongeval: claim.datum_ongeval,
            kenteken_tegenpartij: claim.kenteken_tegenpartij,
            status: newStatus,
            mogelijk_letselschade: heeftLetsel,
          })

      // Alleen email naar claimer als NIET geëscaleerd (escalaties gaan alleen naar admin)
      if (!shouldEscalate) {
        console.log('📧 Versturen email naar claimer:', claim.email)
        await sendEmail({
          to: claim.email,
          subject: claimerEmailTemplate.subject,
          html: claimerEmailTemplate.html,
        })
        console.log('✅ Email verzonden naar claimer')

        // Log claimer email
        await logAuditAction({
          claimId: claim.id,
          actionType: 'email_sent',
          performedBy: 'SYSTEM',
          details: {
            email_type: heeftLetsel ? 'letselschade_detected' : 'claim_received',
            recipient: claim.email,
          },
          severity: 'info',
        })
      } else {
        console.log('⏭️ Skip claimer email (claim is escalated)')
      }

      // Email to admin (nieuwe claim notificatie - alleen als NIET escalated)
      if (!shouldEscalate) {
        const adminEmailTemplate = adminNewClaimEmail({
          naam: claim.naam,
          email: claim.email,
          claimId: claim.id,
          datum_ongeval: claim.datum_ongeval,
          kenteken_tegenpartij: claim.kenteken_tegenpartij,
          beschrijving: claim.beschrijving,
          status: newStatus,
          mogelijk_letselschade: heeftLetsel,
        })

        const adminEmail = process.env.RESEND_ADMIN_EMAIL || claim.email // TODO: Replace with real admin email
        console.log('📧 Versturen email naar admin:', adminEmail)
        await sendEmail({
          to: adminEmail,
          subject: adminEmailTemplate.subject,
          html: adminEmailTemplate.html,
        })
        console.log('✅ Email verzonden naar admin')

        // Log admin email
        await logAuditAction({
          claimId: claim.id,
          actionType: 'email_sent',
          performedBy: 'SYSTEM',
          details: {
            email_type: 'admin_new_claim',
            recipient: adminEmail,
          },
          severity: 'info',
        })
      }

    } catch (emailError) {
      console.error('❌ Email send failed:', emailError)
      // Continue anyway - emails are not critical
    }

    return NextResponse.json({
      success: true,
      agent_response: {
        user_message: text,
        processed: true,
      },
    })

  } catch (error: any) {
    console.error('❌ Agent error:', error)
    return NextResponse.json(
      { 
        error: 'AI Agent processing failed', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    model: 'claude-sonnet-4-20250514',
    message: 'AI Agent is ready'
  })
}
