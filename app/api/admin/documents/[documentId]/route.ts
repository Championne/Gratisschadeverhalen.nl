import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { del } from "@vercel/blob"
import { logAuditAction } from "@/lib/audit/logger"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await params

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

    // Get document details before deleting
    const { data: document, error: fetchError } = await supabaseAdmin
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single()

    if (fetchError || !document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Soft delete in database (set deleted_at timestamp)
    const { error: deleteError } = await supabaseAdmin
      .from('documents')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user.id,
      })
      .eq('id', documentId)

    if (deleteError) {
      console.error('Error deleting document:', deleteError)
      return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
    }

    // Delete from Vercel Blob storage
    try {
      await del(document.file_url)
      console.log(`[Document Delete] Blob deleted: ${document.file_url}`)
    } catch (blobError) {
      // Log but don't fail the request if blob deletion fails
      console.error('Error deleting blob:', blobError)
    }

    // Log audit action
    await logAuditAction({
      claimId: document.claim_id,
      actionType: 'document_deleted',
      performedBy: `ADMIN:${user.email}`,
      details: {
        document_id: document.id,
        file_name: document.file_name,
        file_type: document.file_type,
        document_type: document.document_type,
        deleted_by: user.email,
      },
      severity: 'warning',
    })

    return NextResponse.json({
      success: true,
      message: 'Document deleted',
    })
  } catch (error) {
    console.error('[Document Delete API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
