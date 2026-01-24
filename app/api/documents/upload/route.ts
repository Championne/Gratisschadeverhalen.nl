/**
 * Document Upload API
 * 
 * Handles file uploads for claims and stores metadata in database
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { put } from '@vercel/blob'
import { logAuditAction } from '@/lib/audit/logger'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const claimId = formData.get('claimId') as string
    const uploadedBy = formData.get('uploadedBy') as string || 'claimer'

    if (!file || !claimId) {
      return NextResponse.json(
        { error: 'File and claimId are required' },
        { status: 400 }
      )
    }

    console.log('📤 Document upload started')
    console.log('   Claim ID:', claimId)
    console.log('   File:', file.name, '(' + (file.size / 1024 / 1024).toFixed(2) + ' MB)')
    console.log('   Uploaded by:', uploadedBy)

    const supabase = await createClient()

    // Verify claim exists and user has access
    const { data: { user } } = await supabase.auth.getUser()
    
    if (uploadedBy === 'claimer' && !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify claim ownership (for claimer uploads)
    if (uploadedBy === 'claimer') {
      const { data: claim, error: claimError } = await supabase
        .from('claims')
        .select('id, user_id')
        .eq('id', claimId)
        .single()

      if (claimError || !claim) {
        return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
      }

      if (claim.user_id !== user?.id) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 })
      }
    }

    // Determine file type
    let fileType = 'document'
    if (file.type.startsWith('image/')) {
      fileType = 'image'
    } else if (file.type === 'application/pdf') {
      fileType = 'pdf'
    }

    // Upload to Vercel Blob
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const blobPath = `claims/${claimId}/${Date.now()}-${sanitizedFileName}`

    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: file.type,
    })

    console.log('✅ File uploaded to blob:', blob.url)

    // Save to database
    const { data: document, error: insertError } = await supabase
      .from('claim_documents')
      .insert({
        claim_id: claimId,
        uploaded_by: uploadedBy,
        file_name: file.name,
        file_url: blob.url,
        file_type: fileType,
        file_size_bytes: file.size,
        ai_analyzed: false,
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌ Database insert failed:', insertError)
      return NextResponse.json(
        { error: 'Failed to save document metadata' },
        { status: 500 }
      )
    }

    console.log('✅ Document saved to database:', document.id)

    // Update claim photo_urls if it's an image
    if (fileType === 'image') {
      const { data: claim } = await supabase
        .from('claims')
        .select('photo_urls')
        .eq('id', claimId)
        .single()

      const existingUrls = claim?.photo_urls || []
      await supabase
        .from('claims')
        .update({
          photo_urls: [...existingUrls, blob.url],
          updated_at: new Date().toISOString(),
        })
        .eq('id', claimId)
    }

    // Log audit
    await logAuditAction({
      claimId: claimId,
      actionType: 'document_upload',
      performedBy: user?.email || uploadedBy,
      details: {
        document_id: document.id,
        file_name: file.name,
        file_type: fileType,
        file_size_bytes: file.size,
        file_url: blob.url,
        uploaded_by: uploadedBy,
      },
      severity: 'info',
    })

    return NextResponse.json({
      success: true,
      documentId: document.id,
      fileUrl: blob.url,
      fileType: fileType,
      message: 'Document uploaded successfully',
    })

  } catch (error: any) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * GET: List documents for a claim
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const claimId = searchParams.get('claimId')

    if (!claimId) {
      return NextResponse.json({ error: 'claimId is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify user has access
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get documents
    const { data: documents, error } = await supabase
      .from('claim_documents')
      .select('*')
      .eq('claim_id', claimId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      documents: documents || [],
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch documents', details: error.message },
      { status: 500 }
    )
  }
}
