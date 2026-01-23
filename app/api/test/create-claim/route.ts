import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * TEST ENDPOINT - Maak snel test claims aan
 * 
 * Usage: GET /api/test/create-claim
 * 
 * ⚠️  ALLEEN VOOR DEVELOPMENT/TESTING
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - login first' },
        { status: 401 }
      )
    }

    // Use service role for inserting
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

    // Generate random test data
    const randomNum = Math.floor(Math.random() * 1000)
    const testClaim = {
      user_id: user.id,
      naam: `Test User ${randomNum}`,
      email: `test${randomNum}@autoschadebureau.nl`,
      telefoon: '0612345678',
      kenteken_tegenpartij: `AA-${randomNum.toString().padStart(3, '0')}-BB`,
      datum_ongeval: new Date().toISOString().split('T')[0],
      plaats_ongeval: 'Amsterdam',
      beschrijving: `Test claim ${randomNum} voor audit logging. De tegenpartij reed door rood en botste tegen mijn auto.`,
      naam_tegenpartij: 'Jan Jansen',
      verzekeraar_tegenpartij: 'Allianz',
      polisnummer_tegenpartij: `TEST${randomNum}`,
      status: 'nieuw',
      ocr_data: {},
      ocr_confidence: 0,
    }

    // Insert claim
    const { data: claim, error: insertError } = await supabaseAdmin
      .from('claims')
      .insert(testClaim)
      .select()
      .single()

    if (insertError) {
      console.error('❌ Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to create test claim', details: insertError.message },
        { status: 500 }
      )
    }

    console.log('✅ Test claim created:', claim.id)

    // Trigger AI agent
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
      || (process.env.NODE_ENV === 'production' ? 'https://www.autoschadebureau.nl' : null)
      || 'http://localhost:3000'
    
    console.log('🤖 Triggering AI agent...')
    
    // Fire and forget - don't wait
    fetch(`${baseUrl}/api/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claimId: claim.id }),
    }).catch(err => console.error('Agent trigger failed:', err))

    return NextResponse.json({
      success: true,
      message: '✅ Test claim created!',
      claim: {
        id: claim.id,
        kenteken: claim.kenteken_tegenpartij,
        naam: claim.naam,
        email: claim.email,
        status: claim.status,
      },
      adminLink: `/dashboard/admin/claims/${claim.id}`,
      note: '🤖 AI Agent is triggered in background - check audit logs in ~10 seconds',
    })

  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
