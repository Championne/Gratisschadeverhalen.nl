import { NextRequest, NextResponse } from 'next/server'
import { getClaimAuditLogs } from '@/lib/audit/logger'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const claimId = searchParams.get('claimId')

    if (!claimId) {
      return NextResponse.json({ error: 'claimId is required' }, { status: 400 })
    }

    const logs = await getClaimAuditLogs(claimId)

    return NextResponse.json({ 
      success: true, 
      logs,
      count: logs.length 
    })

  } catch (error: any) {
    console.error('❌ Audit logs API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch audit logs', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}
