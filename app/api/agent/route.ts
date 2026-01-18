import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { sendEmail } from '@/lib/email/resend'
import { claimReceivedEmail, letselschadeDetectedEmail, adminNewClaimEmail } from '@/lib/email/templates'

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

    // Update claim with AI notes using RPC to bypass cache
    const newStatus = heeftLetsel ? 'in_behandeling' : 'nieuw'
    
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

      console.log('📧 Versturen email naar claimer:', claim.email)
      await sendEmail({
        to: claim.email,
        subject: claimerEmailTemplate.subject,
        html: claimerEmailTemplate.html,
      })
      console.log('✅ Email verzonden naar claimer')

      // Email to admin
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

      console.log('📧 Versturen email naar admin:', claim.email) // Change to actual admin email
      await sendEmail({
        to: claim.email, // TODO: Change to actual admin email
        subject: adminEmailTemplate.subject,
        html: adminEmailTemplate.html,
      })
      console.log('✅ Email verzonden naar admin')

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
