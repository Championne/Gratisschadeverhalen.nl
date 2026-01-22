/**
 * TEST ROUTE - Email System Mock Test
 * 
 * Deze route simuleert een inbound email van een verzekeraar
 * en test het volledige email automation systeem lokaal.
 * 
 * Gebruik: http://localhost:3000/api/test-email-system
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('🧪 Starting Email System Test...')

  // Maak een test claim eerst (optioneel - voor matching)
  // Of gebruik een bestaande claim ID

  // Mock email data (simuleert Resend webhook payload)
  const mockEmailPayload = {
    from: {
      email: 'schade@anwb.nl',
      name: 'ANWB Schadeafdeling',
    },
    to: 'schade@gratisschadeverhalen.nl',
    subject: 'RE: Aansprakelijkstelling - Kenteken AB-12-CD',
    text: `
Beste,

Naar aanleiding van uw brief betreffende het ongeval op 15 januari 2026 met 
kenteken AB-12-CD, willen wij u het volgende mededelen:

Wij erkennen de aansprakelijkheid voor dit ongeval. Onze verzekerde heeft 
aangegeven dat hij ten onrechte voorrang heeft genomen.

Graag ontvangen wij van u:
- Een herstelofferte van een erkend schadeherstelbedrijf
- Foto's van de schade
- Kopie van het kentekenbewijs

Wij zullen de schade direct afhandelen zodra we deze documenten hebben ontvangen.

Met vriendelijke groet,

Jan Jansen
ANWB Schadeafdeling
Tel: 088-269-7777
    `.trim(),
    html: `
      <p>Beste,</p>
      <p>Naar aanleiding van uw brief betreffende het ongeval op 15 januari 2026 met 
      kenteken AB-12-CD, willen wij u het volgende mededelen:</p>
      <p><strong>Wij erkennen de aansprakelijkheid voor dit ongeval.</strong> Onze verzekerde heeft 
      aangegeven dat hij ten onrechte voorrang heeft genomen.</p>
      <p>Graag ontvangen wij van u:</p>
      <ul>
        <li>Een herstelofferte van een erkend schadeherstelbedrijf</li>
        <li>Foto's van de schade</li>
        <li>Kopie van het kentekenbewijs</li>
      </ul>
      <p>Wij zullen de schade direct afhandelen zodra we deze documenten hebben ontvangen.</p>
      <p>Met vriendelijke groet,</p>
      <p><strong>Jan Jansen</strong><br>
      ANWB Schadeafdeling<br>
      Tel: 088-269-7777</p>
    `,
    message_id: '<test-' + Date.now() + '@anwb.nl>',
    headers: {
      'message-id': '<test-' + Date.now() + '@anwb.nl>',
      'from': 'schade@anwb.nl',
      'to': 'schade@gratisschadeverhalen.nl',
    },
  }

  try {
    // Call de webhook endpoint
    console.log('📧 Sending mock email to webhook...')
    
    // Get current host dynamically (works with any port)
    const protocol = req.headers.get('x-forwarded-proto') || 'http'
    const host = req.headers.get('host') || 'localhost:3000'
    const webhookUrl = `${protocol}://${host}/api/webhook/email-inbound`
    
    console.log('🌐 Webhook URL:', webhookUrl)
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockEmailPayload),
    })

    const result = await response.json()

    console.log('✅ Webhook response:', result)

    // Return test results
    return NextResponse.json({
      success: true,
      message: 'Mock email test completed',
      webhook_response: result,
      mock_email: {
        from: mockEmailPayload.from.email,
        subject: mockEmailPayload.subject,
        preview: mockEmailPayload.text.substring(0, 100) + '...',
      },
      next_steps: [
        '1. Check Supabase: SELECT * FROM inbound_emails ORDER BY received_at DESC LIMIT 1',
        '2. Check AI analysis: SELECT * FROM email_analysis ORDER BY created_at DESC LIMIT 1',
        '3. Check terminal logs voor detailed output',
        '4. Als ENABLE_EMAIL_PROCESSING=false, dan wordt email alleen opgeslagen (niet verwerkt)',
      ],
    })

  } catch (error) {
    console.error('❌ Test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Email system test failed',
    }, { status: 500 })
  }
}
