import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { put } from "@vercel/blob"
import { logAuditAction } from "@/lib/audit/logger"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const claimId = formData.get('claimId') as string
    const documentType = formData.get('documentType') as string
    const description = formData.get('description') as string | null

    if (!file || !claimId || !documentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
    }

    // Upload to Vercel Blob
    const buffer = Buffer.from(await file.arrayBuffer())
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const blobPath = `documents/${claimId}/${timestamp}-${safeName}`

    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: file.type,
    })

    console.log(`[Document Upload] File uploaded to Vercel Blob: ${blob.url}`)

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

    // Save document metadata to database
    const { data: document, error: dbError } = await supabaseAdmin
      .from('documents')
      .insert({
        claim_id: claimId,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_url: blob.url,
        document_type: documentType,
        description: description || null,
        uploaded_by: user.id,
        uploaded_by_email: user.email,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving document metadata:', dbError)
      return NextResponse.json({ error: 'Failed to save document metadata' }, { status: 500 })
    }

    // Log audit action
    await logAuditAction({
      claimId,
      actionType: 'document_uploaded',
      performedBy: `ADMIN:${user.email}`,
      details: {
        document_id: document.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        document_type: documentType,
        description: description || null,
      },
      severity: 'info',
    })

    console.log(`[Document Upload] Document saved: ${document.id}`)

    return NextResponse.json({
      success: true,
      document,
    })
  } catch (error) {
    console.error('[Document Upload API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
