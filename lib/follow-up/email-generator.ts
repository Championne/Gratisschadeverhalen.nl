/**
 * Follow-up Email Generator
 * 
 * Genereert originele, gepersonaliseerde herinnering emails
 * via Claude AI voor verzekeraars die niet hebben gereageerd
 */

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

export interface FollowUpEmailData {
  claimId: string
  naam_claimer: string
  email_claimer: string
  telefoon_claimer: string
  kenteken_tegenpartij: string
  verzekeraar_tegenpartij: string
  datum_ongeval: string
  plaats_ongeval: string
  beschrijving: string
  dagen_wachttijd: number
}

/**
 * Genereer originele herinnering email via Claude AI
 */
export async function generateFollowUpEmail(data: FollowUpEmailData): Promise<{
  subject: string
  html: string
  plainText: string
}> {
  const {
    claimId,
    naam_claimer,
    email_claimer,
    telefoon_claimer,
    kenteken_tegenpartij,
    verzekeraar_tegenpartij,
    datum_ongeval,
    plaats_ongeval,
    beschrijving,
    dagen_wachttijd,
  } = data

  // Prompt voor Claude om originele email te genereren
  const prompt = `
Je bent een professionele schaderegelaar die namens Gratis Schadeverhalen een herinnering stuurt naar een verzekeraar.

CONTEXT:
- We hebben ${dagen_wachttijd} dagen geleden een aansprakelijkheidsbrief verstuurd
- De standaard reactietermijn is 4 weken (28 dagen)
- We hebben nog GEEN reactie ontvangen
- Dit is een vriendelijke maar zakelijke herinnering

CLAIM GEGEVENS:
- Claim referentie: ${claimId}
- Claimer: ${naam_claimer}
- Kenteken tegenpartij: ${kenteken_tegenpartij}
- Datum ongeval: ${new Date(datum_ongeval).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
- Plaats ongeval: ${plaats_ongeval}
- Verzekeraar: ${verzekeraar_tegenpartij}

SCHRIJF:
1. Een professionele, zakelijke herinnering email
2. Gebruik een vriendelijke maar duidelijke toon
3. Verwijs naar de eerdere aansprakelijkheidsbrief
4. Geef aan dat reactie nu wenselijk is (termijn verstreken)
5. Bied aan om telefonisch contact op te nemen indien gewenst
6. Sluit af met duidelijke vervolgstappen

FORMAT:
Geef alleen de email body tekst, zonder "Subject:" of metadata.
Begin met "Geachte heer/mevrouw," en eindig met een professionele afsluiting.
Gebruik Nederlandse juridische taal maar houd het begrijpelijk.
Maximaal 300 woorden.
`.trim()

  try {
    // Genereer email via Claude
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      prompt: prompt,
      temperature: 0.7, // Iets meer creativiteit voor originele tekst
    })

    // Email subject
    const subject = `Herinnering aansprakelijkstelling | Claim ${claimId.substring(0, 8)} | Kenteken ${kenteken_tegenpartij}`

    // HTML versie (met styling)
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Herinnering Aansprakelijkstelling</title>
  <style>
    body { font-family: 'Calibri', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 700px; margin: 0 auto; padding: 40px 20px; background: #ffffff; }
    .header { border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 20px; font-weight: bold; color: #dc2626; }
    .reminder-badge { background: #fee2e2; color: #dc2626; padding: 12px 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
    .reference { background: #f0f4ff; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0; }
    .content { font-size: 14px; white-space: pre-wrap; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
    .info-table td:first-child { font-weight: bold; width: 200px; color: #4b5563; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
    .cta-box { background: #fffbeb; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Gratis Schadeverhalen</div>
    <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
      Postbus 12345, 1000 AA Amsterdam<br>
      Email: info@gratisschadeverhalen.nl | Tel: 088-000-0000
    </div>
  </div>

  <div class="reminder-badge">
    <strong>⏰ HERINNERING</strong> - ${dagen_wachttijd} dagen na verzending aansprakelijkheidsbrief
  </div>

  <div class="reference">
    <strong>Betreft:</strong> Herinnering aansprakelijkstelling schade<br>
    <strong>Claim referentie:</strong> ${claimId}<br>
    <strong>Kenteken:</strong> ${kenteken_tegenpartij}<br>
    <strong>Datum ongeval:</strong> ${new Date(datum_ongeval).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}<br>
    <strong>Datum:</strong> ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
  </div>

  <div class="content">${text}</div>

  <div class="cta-box">
    <strong>📞 Contact Opnemen?</strong><br>
    U kunt ons bereiken op:<br>
    • Email: info@gratisschadeverhalen.nl<br>
    • Telefoon: 088-000-0000<br>
    • Of rechtstreeks onze cliënt: ${naam_claimer} (${telefoon_claimer})
  </div>

  <div class="info-table">
    <table style="width: 100%;">
      <tr>
        <td><strong>Cliënt:</strong></td>
        <td>${naam_claimer}</td>
      </tr>
      <tr>
        <td><strong>Contactgegevens:</strong></td>
        <td>${email_claimer} | ${telefoon_claimer}</td>
      </tr>
      <tr>
        <td><strong>Uw verzekerde:</strong></td>
        <td>Bestuurder kenteken ${kenteken_tegenpartij}</td>
      </tr>
    </table>
  </div>

  <div class="footer">
    <p><strong>Gratis Schadeverhalen</strong> | 100% No Cure No Pay</p>
    <p>Deze herinnering is automatisch gegenereerd door ons AI-systeem en geverifieerd door onze schaderegelaars.</p>
    <p style="margin-top: 15px; font-size: 10px; color: #9ca3af;">
      Deze email kan vertrouwelijke informatie bevatten. Indien u niet de geadresseerde bent, 
      verzoeken wij u de afzender direct te informeren en deze email te verwijderen.
    </p>
  </div>
</body>
</html>
    `.trim()

    // Plain text versie (voor email clients zonder HTML)
    const plainText = `
HERINNERING - ${dagen_wachttijd} dagen na verzending

${text}

---
Claim referentie: ${claimId}
Kenteken: ${kenteken_tegenpartij}
Datum ongeval: ${new Date(datum_ongeval).toLocaleDateString('nl-NL')}

Contact:
${naam_claimer}
${email_claimer}
${telefoon_claimer}

---
Gratis Schadeverhalen
info@gratisschadeverhalen.nl
088-000-0000
    `.trim()

    console.log('✅ Follow-up email gegenereerd via Claude AI')
    return { subject, html, plainText }

  } catch (error) {
    console.error('❌ Claude AI email generatie failed:', error)
    
    // Fallback: handmatig template als AI faalt
    const fallbackHtml = generateFallbackEmail(data)
    const fallbackSubject = `Herinnering aansprakelijkstelling | Claim ${claimId.substring(0, 8)}`
    const fallbackText = `Herinnering: We hebben ${dagen_wachttijd} dagen geleden een aansprakelijkheidsbrief verstuurd...`
    
    return { subject: fallbackSubject, html: fallbackHtml, plainText: fallbackText }
  }
}

/**
 * Fallback email template (als AI faalt)
 */
function generateFallbackEmail(data: FollowUpEmailData): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #dc2626;">Herinnering Aansprakelijkstelling</h2>
  
  <p>Geachte heer/mevrouw,</p>
  
  <p>
    We hebben ${data.dagen_wachttijd} dagen geleden een aansprakelijkheidsbrief verstuurd 
    met betrekking tot de schade die onze cliënt, ${data.naam_claimer}, heeft geleden 
    op ${new Date(data.datum_ongeval).toLocaleDateString('nl-NL')}.
  </p>
  
  <p>
    Tot op heden hebben wij nog geen reactie van u ontvangen. 
    Wij verzoeken u vriendelijk om binnen 7 werkdagen te reageren.
  </p>
  
  <p>
    <strong>Claim referentie:</strong> ${data.claimId}<br>
    <strong>Kenteken:</strong> ${data.kenteken_tegenpartij}
  </p>
  
  <p>Met vriendelijke groet,<br>
  Gratis Schadeverhalen</p>
</body>
</html>
  `.trim()
}

/**
 * Genereer notificatie email voor claimer
 */
export function generateClaimerNotificationEmail(data: {
  naam: string
  claimId: string
  verzekeraar: string
  dagen_wachttijd: number
}): { subject: string; html: string } {
  return {
    subject: `✅ Herinnering verstuurd naar ${data.verzekeraar}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; border-radius: 10px; }
    .content { background: #f9fafb; padding: 20px; margin-top: 20px; border-radius: 10px; }
    .highlight { background: #d1fae5; padding: 15px; border-radius: 5px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 20px;">✅ Herinnering Verstuurd</h1>
  </div>
  
  <div class="content">
    <p>Beste ${data.naam},</p>
    
    <p>We hebben zojuist een herinnering gestuurd naar <strong>${data.verzekeraar}</strong> 
    over je claim.</p>
    
    <div class="highlight">
      <strong>📋 Status Update:</strong><br>
      • Claim referentie: ${data.claimId}<br>
      • Dagen sinds aansprakelijkheidsbrief: ${data.dagen_wachttijd}<br>
      • Actie: Herinnering verzonden<br>
      • Volgende stap: Wachten op reactie verzekeraar
    </div>
    
    <p><strong>Wat betekent dit?</strong></p>
    <p>
      Verzekeraars hebben wettelijk 4 weken de tijd om te reageren op een aansprakelijkheidsbrief. 
      Deze termijn is verstreken, dus we hebben een vriendelijke herinnering gestuurd.
    </p>
    
    <p><strong>Wat gebeurt er nu?</strong></p>
    <ul>
      <li>De verzekeraar krijgt onze herinnering</li>
      <li>We verwachten binnen 1-2 weken een reactie</li>
      <li>Wij houden je op de hoogte van ontwikkelingen</li>
    </ul>
    
    <p style="margin-top: 30px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard" 
         style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 5px;">
        Bekijk je Claim Status →
      </a>
    </p>
    
    <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
      Vragen? Bel ons op 088-000-0000 of reply op deze email.
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
    Gratis Schadeverhalen | 100% No Cure No Pay
  </div>
</body>
</html>
    `,
  }
}
