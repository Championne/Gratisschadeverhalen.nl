import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { sendEmail } from '@/lib/email/resend'
import { claimReceivedEmail, letselschadeDetectedEmail, adminNewClaimEmail, adminEscalationEmail } from '@/lib/email/templates'
import { logAuditAction, escalateClaim, shouldEscalateOnConfidence } from '@/lib/audit/logger'
import { getVerzekeEvent } from '@/lib/verzekeraar/lookup'
import { insuranceLiabilityEmail } from '@/lib/email/templates'
import { generateAansprakelijkheidsbrief } from '@/lib/pdf/letter-generator'

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
    
    // Extract AI confidence (parse from response, support ranges like "90-95%")
    let aiConfidence: number | null = null
    const confidenceMatch = text.match(/aansprakelijkheid[:\s]+(\d+)(?:-\d+)?%/i)
    if (confidenceMatch) {
      aiConfidence = parseInt(confidenceMatch[1])
    }

    // Letselschade heeft PRIORITEIT - als gedetecteerd, GEEN escalatie voor confidence issues!
    // Escalatie alleen voor ECHTE problemen (geen tegenpartij info, AI zegt expliciet niet mogelijk)
    const shouldEscalate = !heeftLetsel && (
      text.toLowerCase().includes('niet mogelijk') ||          // AI zegt automatisch niet mogelijk
      text.toLowerCase().includes('escalatie nodig') ||        // Expliciet door AI
      (!claim.verzekeraar_tegenpartij && !claim.naam_tegenpartij) // Geen tegenpartij info
    )

    let escalatieReden = ''
    if (shouldEscalate) {
      // Bepaal specifieke reden (confidence check verwijderd - niet meer relevant)
      if (!claim.verzekeraar_tegenpartij && !claim.naam_tegenpartij) {
        escalatieReden = 'Onvolledige tegenpartij gegevens (geen naam of verzekeraar)'
      } else if (text.toLowerCase().includes('niet mogelijk')) {
        escalatieReden = 'Automatische verwerking niet mogelijk (AI beoordeling)'
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
      const adminEmail = process.env.RESEND_ADMIN_EMAIL || claim.email // TODO: Replace with real admin email
      let emailSuccess = false
      let emailError = null
      
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
        
        console.log('📧 Versturen escalatie email naar admin:', adminEmail)
        await sendEmail({
          to: adminEmail,
          subject: escalationEmailTemplate.subject,
          html: escalationEmailTemplate.html,
        })
        console.log('✅ Escalatie email verzonden')
        emailSuccess = true
      } catch (escalationEmailError: any) {
        console.error('❌ Escalatie email failed:', escalationEmailError)
        emailError = escalationEmailError.message || 'Unknown error'
      }
      
      // Log email attempt (success or failure)
      await logAuditAction({
        claimId: claim.id,
        actionType: 'email_sent',
        performedBy: 'SYSTEM',
        details: {
          email_type: 'escalation',
          recipient: adminEmail,
          reden: escalatieReden,
          success: emailSuccess,
          error: emailError,
        },
        severity: 'critical',
      })
    }

    // Update claim with AI notes and status - direct database update
    // Letselschade = aparte positieve flow (GEEN escalatie!)
    const newStatus = heeftLetsel ? 'letselschade_gedetecteerd' : (shouldEscalate ? 'escalated' : 'in_behandeling')
    
    // Use service role for direct database update (bypasses RLS and RPC issues)
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

    const { error: updateError } = await supabaseAdmin
      .from('claims')
      .update({
        status: newStatus,
        ai_notes: text,
        mogelijk_letselschade: heeftLetsel,
        updated_at: new Date().toISOString(),
      })
      .eq('id', claimId)

    if (updateError) {
      console.error('❌ Failed to update claim:', updateError)
      console.error('Error details:', JSON.stringify(updateError, null, 2))
    } else {
      console.log('✅✅✅ AI notes + status succesvol opgeslagen!')
      console.log('New status:', newStatus)
      console.log('Letselschade:', heeftLetsel)
      
      // Log status change (always log, even if update fails for audit trail completeness)
      await logAuditAction({
        claimId: claim.id,
        actionType: 'status_change',
        performedBy: 'AI',
        details: {
          oude_status: claim.status,
          nieuwe_status: newStatus,
          ai_confidence: aiConfidence,
          mogelijk_letselschade: heeftLetsel,
          escalated: shouldEscalate,
          letselschade_flow: heeftLetsel,
        },
        severity: heeftLetsel ? 'warning' : (shouldEscalate ? 'critical' : 'info'),
      })
    }

    // Send emails (each with individual error handling and logging)
    
    // Email to claimer (altijd versturen, behalve bij echte escalatie)
    // Bij letselschade WEL email (positieve boodschap!)
    if (!shouldEscalate) {
      let claimerEmailSuccess = false
      let claimerEmailError = null
      
      try {
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
        claimerEmailSuccess = true
      } catch (claimerEmailError_: any) {
        console.error('❌ Claimer email failed:', claimerEmailError_)
        claimerEmailError = claimerEmailError_.message || 'Unknown error'
      }

      // Log claimer email attempt (success or failure)
      await logAuditAction({
        claimId: claim.id,
        actionType: 'email_sent',
        performedBy: 'SYSTEM',
        details: {
          email_type: heeftLetsel ? 'letselschade_detected' : 'claim_received',
          recipient: claim.email,
          success: claimerEmailSuccess,
          error: claimerEmailError,
        },
        severity: 'info',
      })
    } else {
      console.log('⏭️ Skip claimer email (claim is escalated)')
    }

    // Email to admin (nieuwe claim notificatie - alleen als NIET escalated)
    if (!shouldEscalate) {
      let adminEmailSuccess = false
      let adminEmailError = null
      const adminEmail = process.env.RESEND_ADMIN_EMAIL || claim.email // TODO: Replace with real admin email
      
      try {
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

        console.log('📧 Versturen email naar admin:', adminEmail)
        await sendEmail({
          to: adminEmail,
          subject: adminEmailTemplate.subject,
          html: adminEmailTemplate.html,
        })
        console.log('✅ Email verzonden naar admin')
        adminEmailSuccess = true
      } catch (adminEmailError_: any) {
        console.error('❌ Admin email failed:', adminEmailError_)
        adminEmailError = adminEmailError_.message || 'Unknown error'
      }

      // Log admin email attempt (success or failure)
      await logAuditAction({
        claimId: claim.id,
        actionType: 'email_sent',
        performedBy: 'SYSTEM',
        details: {
          email_type: 'admin_new_claim',
          recipient: adminEmail,
          success: adminEmailSuccess,
          error: adminEmailError,
        },
        severity: 'info',
      })
    }

      // =============================================
      // AUTOMATISCH VERSTUREN NAAR VERZEKERAAR
      // =============================================
      
      // 🚨 FEATURE FLAG: Zet op 'true' om auto-send te activeren
      const AUTO_SEND_TO_VERZEKERAAR = process.env.ENABLE_AUTO_SEND_TO_VERZEKERAAR === 'true'
      
      // Alleen versturen als:
      // - Feature flag enabled
      // - NIET escalated (alles OK)
      // - GEEN letselschade (alleen materiële schade)
      if (AUTO_SEND_TO_VERZEKERAAR && !shouldEscalate && !heeftLetsel && claim.verzekeraar_tegenpartij) {
        console.log('🔍 Opzoeken verzekeraar email:', claim.verzekeraar_tegenpartij)
        
        // Zoek verzekeraar email op in database
        const verzekeraar = await getVerzekeEvent(claim.verzekeraar_tegenpartij)
        
        if (verzekeraar?.email_schade) {
          // ✅ Email gevonden - Verstuur aansprakelijkheidsbrief
          console.log(`✅ Verzekeraar email gevonden: ${verzekeraar.email_schade}`)
          
          try {
            // Genereer PDF aansprakelijkheidsbrief
            console.log('📄 Genereren PDF aansprakelijkheidsbrief...')
            const pdfBytes = await generateAansprakelijkheidsbrief({
              claimId: claim.id,
              datum_ongeval: claim.datum_ongeval,
              plaats_ongeval: claim.plaats_ongeval || 'Niet opgegeven',
              naam_claimer: claim.naam,
              telefoon_claimer: claim.telefoon,
              email_claimer: claim.email,
              kenteken_claimer: claim.kenteken_claimer,
              naam_tegenpartij: claim.naam_tegenpartij || 'Onbekend',
              kenteken_tegenpartij: claim.kenteken_tegenpartij,
              verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij,
              polisnummer_tegenpartij: claim.polisnummer_tegenpartij,
              beschrijving: claim.beschrijving,
              geschatte_schade: claim.geschatte_schade,
              ai_analyse: text.substring(0, 1000), // First 1000 chars van AI analyse
            })
            
            const pdfBase64 = Buffer.from(pdfBytes).toString('base64')
            console.log(`✅ PDF gegenereerd (${Math.round(pdfBytes.length / 1024)} KB)`)

            // Bereid email voor verzekeraar
            const verzekeraEvent = insuranceLiabilityEmail({
              claimId: claim.id,
              datum_ongeval: claim.datum_ongeval,
              plaats_ongeval: claim.plaats_ongeval || 'Niet opgegeven',
              naam_claimer: claim.naam,
              telefoon_claimer: claim.telefoon,
              email_claimer: claim.email,
              kenteken_claimer: claim.kenteken_claimer,
              naam_tegenpartij: claim.naam_tegenpartij || 'Onbekend',
              kenteken_tegenpartij: claim.kenteken_tegenpartij,
              verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij,
              polisnummer_tegenpartij: claim.polisnummer_tegenpartij,
              beschrijving: claim.beschrijving,
              geschatte_schade: claim.geschatte_schade,
            })

            // Verstuur email naar verzekeraar met PDF bijlage
            console.log(`📧 Versturen aansprakelijkheidsbrief naar verzekeraar: ${verzekeraar.email_schade}`)
            await sendEmail({
              to: verzekeraar.email_schade,
              cc: claim.email, // CC naar claimer zodat zij op de hoogte zijn
              subject: verzekeraEvent.subject,
              html: verzekeraEvent.html,
              attachments: [{
                filename: `Aansprakelijkheidsbrief_${claim.kenteken_tegenpartij}_${new Date(claim.datum_ongeval).toISOString().split('T')[0]}.pdf`,
                content: pdfBase64,
                encoding: 'base64',
                contentType: 'application/pdf',
              }],
            })
            
            console.log('✅ Aansprakelijkheidsbrief verzonden naar verzekeraar!')

            // Update claim status
            await supabase
              .from('claims')
              .update({ status: 'aansprakelijkheidsbrief_verzonden' })
              .eq('id', claim.id)

            // Log verzending
            await logAuditAction({
              claimId: claim.id,
              actionType: 'email_sent',
              performedBy: 'SYSTEM',
              details: {
                email_type: 'aansprakelijkheidsbrief_verzekeraar',
                recipient: verzekeraar.email_schade,
                verzekeraar: verzekeraar.naam,
                cc: claim.email,
                pdf_size_kb: Math.round(pdfBytes.length / 1024),
                automated: true,
              },
              severity: 'info',
            })

            console.log('🎉 Volledige flow compleet: Email + PDF naar verzekeraar verzonden!')
            
          } catch (pdfError: any) {
            console.error('❌ PDF generatie of verzending naar verzekeraar failed:', pdfError)
            
            // Log failed email attempt
            await logAuditAction({
              claimId: claim.id,
              actionType: 'email_sent',
              performedBy: 'SYSTEM',
              details: {
                email_type: 'aansprakelijkheidsbrief_verzekeraar',
                recipient: verzekeraar.email_schade,
                verzekeraar: verzekeraar.naam,
                success: false,
                error: pdfError.message || 'Unknown error',
                automated: true,
              },
              severity: 'critical',
            })
            
            // Escaleer als PDF/email faalt
            await escalateClaim({
              claimId: claim.id,
              reden: `Fout bij versturen naar verzekeraar: ${pdfError instanceof Error ? pdfError.message : 'Onbekende fout'}`,
              performedBy: 'SYSTEM',
            })

            // Email admin over fout
            const adminEmail = process.env.RESEND_ADMIN_EMAIL
            if (adminEmail) {
              try {
                await sendEmail({
                  to: adminEmail,
                  subject: `🚨 FOUT: Automatische verzending naar verzekeraar mislukt`,
                  html: `
                    <h2>Automatische verzending mislukt</h2>
                    <p><strong>Claim ID:</strong> ${claim.id}</p>
                    <p><strong>Verzekeraar:</strong> ${claim.verzekeraar_tegenpartij}</p>
                    <p><strong>Email:</strong> ${verzekeraar.email_schade}</p>
                    <p><strong>Fout:</strong> ${pdfError instanceof Error ? pdfError.message : 'Onbekende fout'}</p>
                    <p>De claim is geëscaleerd voor handmatige afhandeling.</p>
                  `,
                })
              } catch (adminEmailError) {
                console.error('❌ Failed to send admin error notification:', adminEmailError)
              }
            }
          }
          
        } else {
          // ❌ Email NIET gevonden - Escaleer naar admin
          console.log(`⚠️  Verzekeraar email niet gevonden voor: "${claim.verzekeraar_tegenpartij}"`)
          console.log('🚨 Escaleren naar admin: Verzekeraar email onbekend')
          
          await escalateClaim({
            claimId: claim.id,
            reden: `Verzekeraar email niet gevonden in database: "${claim.verzekeraar_tegenpartij}"`,
            performedBy: 'SYSTEM',
          })

          // Email admin over ontbrekende verzekeraar
          const adminEmail = process.env.RESEND_ADMIN_EMAIL
          if (adminEmail) {
            await sendEmail({
              to: adminEmail,
              subject: `🚨 ESCALATIE: Verzekeraar email onbekend - ${claim.verzekeraar_tegenpartij}`,
              html: `
                <h2>Verzekeraar Email Niet Gevonden</h2>
                <p><strong>Claim ID:</strong> ${claim.id}</p>
                <p><strong>Claimer:</strong> ${claim.naam} (${claim.email})</p>
                <p><strong>Verzekeraar (ingevoerd):</strong> "${claim.verzekeraar_tegenpartij}"</p>
                <p><strong>Actie vereist:</strong></p>
                <ul>
                  <li>Zoek het correcte email adres van de verzekeraar</li>
                  <li>Voeg toe aan database (tabel: verzekeraars)</li>
                  <li>Verstuur aansprakelijkheidsbrief handmatig via dashboard</li>
                </ul>
                <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard/claim/${claim.id}">Bekijk Claim in Dashboard →</a></p>
              `,
            })
          }

          // Log escalatie
          await logAuditAction({
            claimId: claim.id,
            actionType: 'escalatie',
            performedBy: 'SYSTEM',
            details: {
              reden: 'Verzekeraar email niet gevonden',
              verzekeraar_naam: claim.verzekeraar_tegenpartij,
              automated_check: true,
            },
            severity: 'critical',
          })
        }
      } else if (!AUTO_SEND_TO_VERZEKERAAR) {
        console.log('⏭️ Skip verzending naar verzekeraar (feature flag disabled)')
        console.log('💡 Tip: Zet ENABLE_AUTO_SEND_TO_VERZEKERAAR=true om auto-send te activeren')
      } else if (!shouldEscalate && heeftLetsel) {
        console.log('⏭️ Skip verzending naar verzekeraar (mogelijk letselschade)')
      } else if (shouldEscalate) {
        console.log('⏭️ Skip verzending naar verzekeraar (claim is geëscaleerd)')
      } else if (!claim.verzekeraar_tegenpartij) {
        console.log('⚠️  Verzekeraar naam ontbreekt - kan niet versturen')
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
