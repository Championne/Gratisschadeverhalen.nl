/**
 * Email templates voor verschillende claim statuses
 */

interface ClaimData {
  naam: string
  claimId: string
  datum_ongeval: string
  kenteken_tegenpartij: string
  status: string
  mogelijk_letselschade?: boolean
}

/**
 * Email naar claimer: Claim ontvangen
 */
export function claimReceivedEmail(data: ClaimData) {
  const { naam, claimId, datum_ongeval, kenteken_tegenpartij } = data

  return {
    subject: '✅ Je autoschade claim is ontvangen',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claim Ontvangen</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
    .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 10px; }
    .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .button { display: inline-block; background: #667eea; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #667eea; font-size: 18px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ Je Claim is Ontvangen!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Wij gaan direct voor je aan de slag</p>
  </div>
  
  <div class="content">
    <p>Beste ${naam},</p>
    
    <p>Bedankt voor het indienen van je autoschade claim. Onze AI heeft je claim geanalyseerd en in behandeling genomen.</p>
    
    <div class="highlight">
      <strong>📋 Claim Gegevens:</strong><br>
      • Claim ID: <code>${claimId}</code><br>
      • Datum ongeval: ${new Date(datum_ongeval).toLocaleDateString('nl-NL')}<br>
      • Kenteken tegenpartij: ${kenteken_tegenpartij}<br>
      • Status: In behandeling
    </div>
    
    <h2>⏭️ Wat gebeurt er nu?</h2>
    <p>Onze AI agent heeft je claim automatisch gescreend op:</p>
    <ul>
      <li>✅ Mogelijke letselschade</li>
      <li>✅ Aansprakelijkheid tegenpartij</li>
      <li>✅ Benodigde vervolgstappen</li>
    </ul>
    
    <p>Je ontvangt binnen <strong>1-2 werkdagen</strong> een update over de voortgang.</p>
    
    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login" class="button">
      Volg je Claim Status
    </a>
    
    <h2>📞 Vragen?</h2>
    <p>Neem gerust contact met ons op via info@gratisschadeverhalen.nl</p>
  </div>
  
  <div class="footer">
    <p>Gratis Schadeverhalen<br>
    100% No Cure No Pay | Geen vooruitbetaling</p>
    <p style="font-size: 10px; color: #999; margin-top: 10px;">
      Deze email is automatisch gegenereerd door ons AI systeem.
    </p>
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email naar claimer: Letselschade gedetecteerd
 */
export function letselschadeDetectedEmail(data: ClaimData) {
  const { naam, claimId } = data

  return {
    subject: '⚠️ Mogelijke letselschade gedetecteerd - Belangrijke informatie',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Letselschade Gedetecteerd</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
    .content { background: #fff3cd; padding: 30px; margin-top: 20px; border-radius: 10px; border: 2px solid #ffc107; }
    .warning-box { background: #ffe5e5; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0; }
    .button { display: inline-block; background: #dc2626; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #dc2626; font-size: 18px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>⚠️ Letselschade Gedetecteerd</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Belangrijke informatie over je claim</p>
  </div>
  
  <div class="content">
    <p>Beste ${naam},</p>
    
    <div class="warning-box">
      <strong>🏥 Onze AI heeft mogelijke letselschade gedetecteerd in je claim.</strong><br>
      Voor letselschade claims heb je een gespecialiseerd letselschade team nodig.
    </div>
    
    <h2>📋 Wat betekent dit?</h2>
    <p>Bij letselschade (whiplash, nekklachten, hoofdpijn, etc.) zijn andere regels en procedures van toepassing. Deze claims vereisen:</p>
    <ul>
      <li>Medische documentatie</li>
      <li>Juridische expertise</li>
      <li>Langere behandeltijd</li>
      <li>Hogere vergoedingen (smartengeld)</li>
    </ul>
    
    <h2>✅ Onze Aanbeveling:</h2>
    <p><strong>Meld je letselschade apart aan bij Unitas Letselschade</strong></p>
    <p>Zij zijn gespecialiseerd in letselschade claims en kunnen je beter helpen dan wij.</p>
    
    <a href="https://www.unitasletselschade.nl" class="button">
      Ga naar Unitas Letselschade →
    </a>
    
    <h2>💡 Wat doen wij?</h2>
    <p>Wij blijven de <strong>materiële schade</strong> aan je auto afhandelen. De letselschade behandel je apart via Unitas.</p>
    
    <p style="margin-top: 30px;">
      <strong>Claim ID:</strong> ${claimId}<br>
      <strong>Status:</strong> Wacht op actie
    </p>
  </div>
  
  <div class="footer">
    <p>Gratis Schadeverhalen<br>
    100% No Cure No Pay | Geen vooruitbetaling</p>
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email naar admin: Escalatie notificatie
 */
export function adminEscalationEmail(data: {
  claimId: string
  naam: string
  email: string
  reden: string
  confidence?: number
  datum_ongeval: string
  kenteken_tegenpartij: string
  beschrijving: string
}) {
  const { claimId, naam, email, reden, confidence, datum_ongeval, kenteken_tegenpartij, beschrijving } = data

  return {
    subject: `🚨 ESCALATIE VEREIST: ${naam} | Confidence: ${confidence ? `${confidence}%` : 'N/A'}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Escalatie Vereist</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 25px; border-radius: 10px 10px 0 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .alert-box { background: #fef2f2; border-left: 5px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 15px; margin: 20px 0; }
    .info-label { font-weight: bold; color: #666; }
    .info-value { color: #333; }
    .confidence-bar { width: 100%; height: 30px; background: #e5e7eb; border-radius: 15px; overflow: hidden; margin: 10px 0; }
    .confidence-fill { height: 100%; background: ${confidence && confidence < 50 ? '#dc2626' : confidence && confidence < 70 ? '#f59e0b' : '#10b981'}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; }
    .reason-box { background: #fffbeb; border: 2px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .button { display: inline-block; background: #dc2626; color: white !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .button:hover { background: #991b1b; }
    .description-box { background: #f9fafb; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; white-space: pre-wrap; font-size: 14px; max-height: 200px; overflow-y: auto; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #dc2626; font-size: 18px; margin-top: 25px; margin-bottom: 10px; }
    .priority-badge { display: inline-block; background: #dc2626; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚨 ESCALATIE VEREIST</h1>
    <span class="priority-badge">⚡ HOGE PRIORITEIT</span>
  </div>
  
  <div class="content">
    <div class="alert-box">
      <strong style="font-size: 16px; color: #dc2626;">⚠️ Deze claim vereist handmatige aandacht</strong><br>
      <span style="font-size: 14px; color: #666;">Automatische verwerking niet mogelijk - Directe actie noodzakelijk</span>
    </div>

    ${confidence !== undefined ? `
    <h2>📊 Confidence Score</h2>
    <div class="confidence-bar">
      <div class="confidence-fill" style="width: ${confidence}%;">
        ${confidence}%
      </div>
    </div>
    <p style="font-size: 13px; color: #666; margin-top: 5px;">
      ${confidence < 50 ? '🔴 Zeer laag - Onmiddellijke actie vereist' : confidence < 70 ? '🟡 Laag - Handmatige review nodig' : '🟢 Acceptabel - Preventieve check'}
    </p>
    ` : ''}

    <div class="reason-box">
      <strong>🎯 Escalatie Reden:</strong><br>
      <span style="font-size: 15px; color: #92400e;">${reden}</span>
    </div>

    <h2>👤 Claimer Informatie</h2>
    <div class="info-grid">
      <div class="info-label">Claim ID:</div>
      <div class="info-value"><code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${claimId}</code></div>
      
      <div class="info-label">Naam:</div>
      <div class="info-value"><strong>${naam}</strong></div>
      
      <div class="info-label">Email:</div>
      <div class="info-value"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></div>
      
      <div class="info-label">Datum ongeval:</div>
      <div class="info-value">${new Date(datum_ongeval).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      
      <div class="info-label">Kenteken TP:</div>
      <div class="info-value"><strong style="font-size: 16px;">${kenteken_tegenpartij}</strong></div>
    </div>

    <h2>📝 Beschrijving Ongeval</h2>
    <div class="description-box">${beschrijving}</div>

    <h2>⚡ Aanbevolen Acties</h2>
    <ul style="line-height: 1.8; color: #374151;">
      <li><strong>Beoordeel</strong> de claim handmatig in het dashboard</li>
      <li><strong>Controleer</strong> OCR extractie op fouten</li>
      <li><strong>Verifieer</strong> tegenpartij gegevens (RDW check)</li>
      <li><strong>Beslis</strong> of claim acceptabel is of moet worden afgewezen</li>
      <li><strong>Neem contact op</strong> met claimer bij onduidelijkheden</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard/claim/${claimId}" class="button">
        🔍 Bekijk Claim in Dashboard →
      </a>
    </div>

    <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 15px; border-radius: 5px; margin-top: 20px;">
      <strong style="color: #0369a1;">💡 Tip:</strong> 
      <span style="color: #075985; font-size: 14px;">
        Claims met lage confidence zijn vaak incomplete uploads of complexe gevallen. 
        Controleer of alle velden correct zijn ingevuld en of er voldoende bewijs is.
      </span>
    </div>
  </div>
  
  <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    <p><strong>Gratisschadeverhalen.nl - Admin Notificatie</strong></p>
    <p>Automatisch gegenereerd door Audit & Escalatie Systeem</p>
    <p style="font-size: 10px; color: #9ca3af; margin-top: 10px;">
      ⏰ Verzonden: ${new Date().toLocaleString('nl-NL', { dateStyle: 'full', timeStyle: 'short' })}
    </p>
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email naar admin: Nieuwe claim notificatie
 */
export function adminNewClaimEmail(data: ClaimData & { beschrijving: string; email: string }) {
  const { naam, email, claimId, datum_ongeval, kenteken_tegenpartij, beschrijving, mogelijk_letselschade } = data as any

  return {
    subject: `🔔 Nieuwe Claim: ${naam} | ${mogelijk_letselschade ? '⚠️ LETSEL' : '✅ MATERIEEL'}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe Claim</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${mogelijk_letselschade ? '#dc2626' : '#10b981'}; color: white; padding: 20px; border-radius: 10px; }
    .content { background: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 10px; }
    .info-row { display: flex; padding: 10px; border-bottom: 1px solid #ddd; }
    .label { font-weight: bold; width: 150px; }
    .badge { display: inline-block; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: bold; }
    .badge-letsel { background: #fee2e2; color: #dc2626; }
    .badge-materieel { background: #d1fae5; color: #059669; }
    h1 { margin: 0; font-size: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔔 Nieuwe Claim Binnengekomen</h1>
    ${mogelijk_letselschade ? '<span class="badge badge-letsel">⚠️ LETSELSCHADE</span>' : '<span class="badge badge-materieel">✅ MATERIEEL</span>'}
  </div>
  
  <div class="content">
    <div class="info-row">
      <div class="label">Claim ID:</div>
      <div><code>${claimId}</code></div>
    </div>
    <div class="info-row">
      <div class="label">Naam:</div>
      <div>${naam}</div>
    </div>
    <div class="info-row">
      <div class="label">Email:</div>
      <div><a href="mailto:${email}">${email}</a></div>
    </div>
    <div class="info-row">
      <div class="label">Datum ongeval:</div>
      <div>${new Date(datum_ongeval).toLocaleDateString('nl-NL')}</div>
    </div>
    <div class="info-row">
      <div class="label">Kenteken TP:</div>
      <div><strong>${kenteken_tegenpartij}</strong></div>
    </div>
    <div class="info-row">
      <div class="label">Letselschade:</div>
      <div>${mogelijk_letselschade ? '⚠️ JA - Handmatig behandelen!' : '✅ Nee'}</div>
    </div>
    
    <h2>📝 Beschrijving:</h2>
    <p style="background: white; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${beschrijving}</p>
    
    <p style="margin-top: 20px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard" 
         style="display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Bekijk in Dashboard →
      </a>
    </p>
  </div>
  
  <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
    Automatisch gegenereerd door AI Agent
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email naar verzekeraar tegenpartij: Aansprakelijkstelling
 */
export function insuranceLiabilityEmail(data: {
  claimId: string
  datum_ongeval: string
  plaats_ongeval: string
  naam_claimer: string
  telefoon_claimer: string
  email_claimer: string
  kenteken_claimer?: string
  naam_tegenpartij: string
  kenteken_tegenpartij: string
  verzekeraar_tegenpartij: string
  polisnummer_tegenpartij?: string
  beschrijving: string
  geschatte_schade?: number
}) {
  const { 
    claimId,
    datum_ongeval, 
    plaats_ongeval,
    naam_claimer, 
    telefoon_claimer, 
    email_claimer,
    kenteken_claimer,
    naam_tegenpartij, 
    kenteken_tegenpartij, 
    verzekeraar_tegenpartij,
    polisnummer_tegenpartij,
    beschrijving,
    geschatte_schade
  } = data

  return {
    subject: `Aansprakelijkstelling schade d.d. ${new Date(datum_ongeval).toLocaleDateString('nl-NL')} | Kenteken: ${kenteken_tegenpartij}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aansprakelijkstelling</title>
  <style>
    body { font-family: 'Calibri', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 700px; margin: 0 auto; padding: 40px 20px; background: #ffffff; }
    .header { border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 20px; font-weight: bold; color: #1e40af; }
    .reference { background: #f0f4ff; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0; }
    .content { font-size: 14px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
    .info-table td:first-child { font-weight: bold; width: 200px; color: #4b5563; }
    .section-title { font-size: 16px; font-weight: bold; color: #1e40af; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
    .highlight-box { background: #fffbeb; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
    .signature { margin-top: 40px; }
    .attachment-notice { background: #f0f4ff; padding: 15px; border-radius: 5px; margin: 20px 0; font-size: 13px; }
    strong { color: #1a1a1a; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Gratis Schadeverhalen</div>
    <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
      ${process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Postbus 12345, 1000 AA Amsterdam'}<br>
      Email: info@gratisschadeverhalen.nl | Tel: ${process.env.NEXT_PUBLIC_COMPANY_PHONE || '088-000-0000'}
    </div>
  </div>

  <div class="reference">
    <strong>Betreft:</strong> Aansprakelijkstelling materiële schade verkeersongeval<br>
    <strong>Datum ongeval:</strong> ${new Date(datum_ongeval).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}<br>
    <strong>Plaats ongeval:</strong> ${plaats_ongeval}<br>
    <strong>Uw verzekerde:</strong> ${naam_tegenpartij}<br>
    <strong>Kenteken:</strong> ${kenteken_tegenpartij}<br>
    ${polisnummer_tegenpartij ? `<strong>Polisnummer:</strong> ${polisnummer_tegenpartij}<br>` : ''}
    <strong>Referentie:</strong> ${claimId}<br>
    <strong>Datum:</strong> ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
  </div>

  <div class="content">
    <p><strong>Geachte heer/mevrouw,</strong></p>

    <p>Namens onze cliënt, ondergetekende ${naam_claimer}, stellen wij u hierbij aansprakelijk voor de schade die is ontstaan als gevolg van een verkeersongeval op <strong>${new Date(datum_ongeval).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong> te <strong>${plaats_ongeval}</strong>.</p>

    <div class="section-title">📋 Gegevens Benadeelde Partij (Onze Cliënt)</div>
    <table class="info-table">
      <tr>
        <td>Naam</td>
        <td>${naam_claimer}</td>
      </tr>
      <tr>
        <td>Telefoonnummer</td>
        <td>${telefoon_claimer}</td>
      </tr>
      <tr>
        <td>E-mailadres</td>
        <td><a href="mailto:${email_claimer}" style="color: #1e40af;">${email_claimer}</a></td>
      </tr>
      ${kenteken_claimer ? `
      <tr>
        <td>Kenteken voertuig</td>
        <td><strong>${kenteken_claimer}</strong></td>
      </tr>
      ` : ''}
    </table>

    <div class="section-title">🚗 Gegevens Aansprakelijke Partij (Uw Verzekerde)</div>
    <table class="info-table">
      <tr>
        <td>Naam verzekerde</td>
        <td>${naam_tegenpartij}</td>
      </tr>
      <tr>
        <td>Kenteken voertuig</td>
        <td><strong>${kenteken_tegenpartij}</strong></td>
      </tr>
      <tr>
        <td>Verzekeraar</td>
        <td>${verzekeraar_tegenpartij}</td>
      </tr>
      ${polisnummer_tegenpartij ? `
      <tr>
        <td>Polisnummer</td>
        <td>${polisnummer_tegenpartij}</td>
      </tr>
      ` : ''}
    </table>

    <div class="section-title">📝 Toedracht Ongeval</div>
    <p style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.8;">${beschrijving}</p>

    ${geschatte_schade ? `
    <div class="section-title">💰 Geschatte Schade</div>
    <div class="highlight-box">
      <strong style="font-size: 18px;">€ ${geschatte_schade.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
      <p style="margin: 10px 0 0 0; font-size: 13px; color: #92400e;">
        Dit betreft een initiële schatting. De definitieve schade wordt vastgesteld na taxatie door een erkend schadebedrijf.
      </p>
    </div>
    ` : ''}

    <div class="section-title">⚖️ Aansprakelijkheid</div>
    <p>Op grond van artikel 6:162 BW (Burgerlijk Wetboek) is uw verzekerde aansprakelijk voor de ontstane schade. Wij verzoeken u dan ook om binnen <strong>4 weken</strong> na dagtekening van deze brief te reageren met:</p>
    
    <ul style="line-height: 2;">
      <li>Erkenning van aansprakelijkheid, of</li>
      <li>Een gemotiveerde afwijzing met onderbouwing</li>
    </ul>

    <div class="attachment-notice">
      <strong>📎 Bijlage:</strong> Aansprakelijkheidsbrief (PDF)<br>
      De formele aansprakelijkheidsbrief met alle details en juridische grondslag treft u aan als bijlage bij deze email.
    </div>

    <div class="section-title">📞 Vervolgstappen</div>
    <p>Wij verzoeken u vriendelijk om:</p>
    <ol style="line-height: 2;">
      <li>Een schadeclaim te registreren onder bovenstaand polisnummer</li>
      <li>Binnen 4 weken schriftelijk te reageren op deze aansprakelijkstelling</li>
      <li>Bij erkenning: een schade-expert te laten langskomen voor taxatie</li>
      <li>Contact op te nemen met onze cliënt voor het maken van afspraken</li>
    </ol>

    <p><strong>Correspondentie:</strong> Alle correspondentie verloopt via ondergetekende. U kunt reageren op dit e-mailadres of telefonisch contact opnemen.</p>

    <div class="signature">
      <p>Met vriendelijke groet,</p>
      <p>
        <strong>Gratis Schadeverhalen</strong><br>
        <em>Namens ${naam_claimer}</em>
      </p>
      <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
        Deze email en bijbehorende aansprakelijkheidsbrief zijn gegenereerd door ons geautomatiseerde systeem.<br>
        Alle informatie is geverifieerd door de claimer en heeft dezelfde juridische waarde als een handmatig opgestelde brief.
      </p>
    </div>
  </div>

  <div class="footer">
    <p><strong>Gratis Schadeverhalen</strong> | 100% No Cure No Pay | KVK: ${process.env.NEXT_PUBLIC_COMPANY_KVK || 'XXXXXXXX'}</p>
    <p>${process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Postbus 12345, 1000 AA Amsterdam'}</p>
    <p>Email: info@gratisschadeverhalen.nl | Web: www.gratisschadeverhalen.nl</p>
    <p style="margin-top: 15px; font-size: 10px; color: #9ca3af;">
      Deze email kan vertrouwelijke informatie bevatten. Indien u niet de geadresseerde bent, verzoeken wij u de afzender direct te informeren en deze email te verwijderen.
    </p>
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email naar claimer: Status update
 */
export function claimStatusUpdateEmail(data: ClaimData & { aiNotes?: string }) {
  const { naam, claimId, status, aiNotes } = data

  const statusText = {
    nieuw: 'Nieuw - In behandeling genomen',
    in_behandeling: 'In Behandeling - Wordt verwerkt',
    aansprakelijkheidsbrief_verzonden: 'Brief Verzonden naar Tegenpartij',
    in_onderhandeling: 'In Onderhandeling met Verzekeraar',
    afgerond: 'Afgerond - Schade Vergoed',
    geweigerd: 'Afgewezen',
    geannuleerd: 'Geannuleerd',
  }[status] || status

  return {
    subject: `🔄 Status Update: ${statusText}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status Update</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
    .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 10px; }
    .status-badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
    .ai-notes { background: white; padding: 15px; border-left: 4px solid #3b82f6; margin: 15px 0; }
    .button { display: inline-block; background: #3b82f6; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #3b82f6; font-size: 18px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔄 Status Update</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Je claim is bijgewerkt</p>
  </div>
  
  <div class="content">
    <p>Beste ${naam},</p>
    
    <p>Er is een update voor je claim:</p>
    
    <p><strong>Nieuwe Status:</strong> <span class="status-badge">${statusText}</span></p>
    
    ${aiNotes ? `
    <div class="ai-notes">
      <strong>🤖 AI Agent Analyse:</strong><br>
      <div style="white-space: pre-wrap; margin-top: 10px;">${aiNotes.substring(0, 500)}${aiNotes.length > 500 ? '...' : ''}</div>
    </div>
    ` : ''}
    
    <p><strong>Claim ID:</strong> <code>${claimId}</code></p>
    
    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login" class="button">
      Bekijk Volledige Details →
    </a>
    
    <p style="margin-top: 30px; font-size: 14px; color: #666;">
      We houden je op de hoogte van alle ontwikkelingen.
    </p>
  </div>
  
  <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
    Gratis Schadeverhalen | 100% No Cure No Pay
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email template: Notify claimer about received verzekeraar email
 */
export function emailReceivedNotification(data: {
  claimerName: string
  verzekeraarName: string
  emailType: string
  summary: string
  dashboardUrl: string
}) {
  const typeLabels: Record<string, string> = {
    liability_acceptance: '✅ Aansprakelijkheid Erkend',
    rejection: '❌ Afwijzing',
    information_request: '📋 Informatieverzoek',
    settlement_offer: '💰 Schikkingsvoorstel',
    acknowledgment: '📬 Ontvangstbevestiging',
    other: '📧 Bericht',
  }

  const typeLabel = typeLabels[data.emailType] || '📧 Nieuw Bericht'

  return {
    subject: `${typeLabel} van ${data.verzekeraarName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
    .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 10px; }
    .summary { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; margin: 15px 0; border-radius: 4px; }
    .button { display: inline-block; background: #667eea; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Nieuwe Reactie Ontvangen</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">${data.verzekeraarName}</p>
    </div>

    <div class="content">
      <p>Beste ${data.claimerName},</p>

      <p>
        Goed nieuws! We hebben een reactie ontvangen van <strong>${data.verzekeraarName}</strong> 
        over jouw claim.
      </p>

      <h3>${typeLabel}</h3>

      <div class="summary">
        <strong>Samenvatting:</strong>
        <p style="margin: 10px 0 0 0;">${data.summary}</p>
      </div>

      <p>
        Je kunt de volledige details bekijken in je persoonlijke dashboard. 
        Wij houden je op de hoogte van alle ontwikkelingen.
      </p>

      <div style="text-align: center;">
        <a href="${data.dashboardUrl}" class="button">Bekijk in Dashboard</a>
      </div>

      <p>
        Heb je vragen? Neem gerust contact met ons op.
      </p>

      <p>
        Met vriendelijke groet,<br>
        <strong>Team GratisSchadeVerhalen.nl</strong>
      </p>
    </div>

    <div class="footer">
      <p>GratisSchadeVerhalen.nl | info@gratisschadeverhalen.nl</p>
      <p>Dit is een geautomatiseerde notificatie. De verzekeraar email is automatisch verwerkt door ons systeem.</p>
    </div>
  </div>
</body>
</html>
    `,
  }
}

/**
 * Email template: Admin notification for email that needs review
 */
export function adminEmailReviewNeeded(data: {
  emailId: string
  from: string
  subject: string
  emailType: string
  confidence: number
  summary: string
  reason: string
  dashboardUrl: string
}) {
  return {
    subject: `⚠️ Email Review Vereist - ${data.from}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #ff9800; color: white; padding: 20px; border-radius: 10px; }
    .content { background: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 10px; }
    .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #ff9800; }
    .button { display: inline-block; background: #ff9800; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { text-align: left; padding: 8px; background: #f4f4f4; }
    td { padding: 8px; border-bottom: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ Email Vereist Handmatige Review</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Automatische verwerking onzeker</p>
    </div>

    <div class="content">
      <h3>Email Details</h3>
      <table>
        <tr>
          <th>Van</th>
          <td>${data.from}</td>
        </tr>
        <tr>
          <th>Onderwerp</th>
          <td>${data.subject}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td>${data.emailType}</td>
        </tr>
        <tr>
          <th>Match Confidence</th>
          <td>${data.confidence}%</td>
        </tr>
        <tr>
          <th>Review Reden</th>
          <td><strong>${data.reason}</strong></td>
        </tr>
      </table>

      <div class="info-box">
        <strong>AI Samenvatting:</strong>
        <p style="margin: 10px 0 0 0;">${data.summary}</p>
      </div>

      <p>
        Deze email kon niet met voldoende zekerheid automatisch verwerkt worden. 
        Controleer de email en match deze handmatig aan een claim indien nodig.
      </p>

      <div style="text-align: center;">
        <a href="${dashboardUrl}" class="button">Review in Dashboard</a>
      </div>

      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        Email ID: ${data.emailId}
      </p>
    </div>
  </div>
</body>
</html>
    `,
  }
}
