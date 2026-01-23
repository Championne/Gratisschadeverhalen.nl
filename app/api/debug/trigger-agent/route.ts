import { NextResponse } from 'next/server'

/**
 * DEBUG: Manually trigger AI agent with full error logging
 * 
 * Usage: GET /api/debug/trigger-agent?claimId=xxx
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const claimId = searchParams.get('claimId')

    if (!claimId) {
      return NextResponse.json(
        { error: 'Missing claimId parameter' },
        { status: 400 }
      )
    }

    console.log('🔍 DEBUG: Starting AI agent trigger for claim:', claimId)

    // Determine base URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      || (process.env.NODE_ENV === 'production' ? 'https://www.autoschadebureau.nl' : null)
      || 'http://localhost:3000'

    console.log('🔍 DEBUG: Base URL:', baseUrl)
    console.log('🔍 DEBUG: Full agent URL:', `${baseUrl}/api/agent`)

    // Call agent API with full error handling
    const response = await fetch(`${baseUrl}/api/agent`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claimId }),
    })

    console.log('🔍 DEBUG: Agent response status:', response.status)

    const responseText = await response.text()
    console.log('🔍 DEBUG: Agent response body:', responseText)

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { raw: responseText }
    }

    if (!response.ok) {
      return NextResponse.json({
        error: 'AI Agent API call failed',
        status: response.status,
        response: responseData,
        baseUrl,
        claimId,
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'AI Agent triggered successfully',
      agentResponse: responseData,
      baseUrl,
      claimId,
    })

  } catch (error: any) {
    console.error('❌ DEBUG: Exception:', error)
    return NextResponse.json({
      error: 'Exception while triggering agent',
      message: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
