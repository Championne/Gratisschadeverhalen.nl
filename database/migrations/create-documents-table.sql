-- Migration: Create documents table for claim attachments
-- Date: 2026-01-23
-- Description: Store document metadata for claims (photos, PDFs, invoices, etc.)

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  
  -- File metadata
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL, -- 'image/jpeg', 'application/pdf', etc.
  file_size INTEGER NOT NULL, -- in bytes
  file_url TEXT NOT NULL, -- Vercel Blob URL
  
  -- Document categorization
  document_type VARCHAR(50) NOT NULL, -- 'schadeformulier', 'foto_schade', 'offerte', 'factuur', 'brief', 'overig'
  description TEXT,
  
  -- Upload metadata
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_by_email VARCHAR(255),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Soft delete
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_documents_claim_id ON public.documents(claim_id);
CREATE INDEX idx_documents_uploaded_at ON public.documents(uploaded_at DESC);
CREATE INDEX idx_documents_document_type ON public.documents(document_type);
CREATE INDEX idx_documents_deleted_at ON public.documents(deleted_at) WHERE deleted_at IS NULL;

-- RLS Policies
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Users can view documents for their own claims
CREATE POLICY "Users can view own claim documents"
  ON public.documents
  FOR SELECT
  USING (
    claim_id IN (
      SELECT id FROM public.claims WHERE user_id = auth.uid()
    )
  );

-- Admins can view all documents (handled via service role in app)

-- Add comment
COMMENT ON TABLE public.documents IS 'Stores document metadata for claim attachments (photos, PDFs, invoices, etc.)';
