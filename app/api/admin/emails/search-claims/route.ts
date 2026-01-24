/**
 * Admin API: Search Claims for Email Linking
 * 
 * Zoek claims om te koppelen aan een email
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use service role for admin operations
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

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        claims: [],
        message: 'Search query too short (min 2 characters)',
      })
    }

    // Search claims by multiple fields
    const searchPattern = `%${query}%`
    
    const { data: claims, error } = await supabaseAdmin
      .from('claims')
      .select('id, naam, email, kenteken_tegenpartij, verzekeraar_tegenpartij, status, created_at')
      .or(`naam.ilike.${searchPattern},email.ilike.${searchPattern},kenteken_tegenpartij.ilike.${searchPattern},verzekeraar_tegenpartij.ilike.${searchPattern}`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error searching claims:', error)
      return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      claims: claims || [],
      count: claims?.length || 0,
    })

  } catch (error) {
    console.error('[Admin Search Claims API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
