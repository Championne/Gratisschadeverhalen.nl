-- ============================================================
-- CRITICAL SECURITY FIX: Row Level Security Policies
-- Run this IMMEDIATELY in Supabase SQL Editor
-- ============================================================
-- Generated: 2026-01-29
-- Issue: Anonymous users can read claims and inbound_emails
-- ============================================================

-- ============================================================
-- 1. CLAIMS TABLE - Protect customer data
-- ============================================================

-- Enable RLS (if not already enabled)
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view own claims" ON claims;
DROP POLICY IF EXISTS "Users can insert own claims" ON claims;
DROP POLICY IF EXISTS "Users can update own claims" ON claims;
DROP POLICY IF EXISTS "Service role full access" ON claims;
DROP POLICY IF EXISTS "Anon can insert claims" ON claims;

-- Policy: Users can only view their own claims
CREATE POLICY "Users can view own claims" ON claims
FOR SELECT USING (
  auth.uid() = user_id
);

-- Policy: Users can insert claims (user_id set to their own)
CREATE POLICY "Users can insert own claims" ON claims
FOR INSERT WITH CHECK (
  auth.uid() = user_id OR user_id IS NULL
);

-- Policy: Users can update their own claims
CREATE POLICY "Users can update own claims" ON claims
FOR UPDATE USING (
  auth.uid() = user_id
);

-- Policy: Service role has full access (for admin operations)
CREATE POLICY "Service role full access" ON claims
FOR ALL USING (
  auth.jwt()->>'role' = 'service_role'
);

-- Policy: Allow anonymous claim submission (user_id will be NULL)
-- This allows non-logged-in users to submit claims
CREATE POLICY "Anon can insert claims" ON claims
FOR INSERT WITH CHECK (
  user_id IS NULL
);


-- ============================================================
-- 2. CLAIM_DOCUMENTS TABLE - Protect uploaded files
-- ============================================================

ALTER TABLE claim_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own documents" ON claim_documents;
DROP POLICY IF EXISTS "Users can insert own documents" ON claim_documents;
DROP POLICY IF EXISTS "Service role full access docs" ON claim_documents;

-- Users can view documents for their claims
CREATE POLICY "Users can view own documents" ON claim_documents
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM claims 
    WHERE claims.id = claim_documents.claim_id 
    AND claims.user_id = auth.uid()
  )
);

-- Users can insert documents for their claims
CREATE POLICY "Users can insert own documents" ON claim_documents
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM claims 
    WHERE claims.id = claim_documents.claim_id 
    AND (claims.user_id = auth.uid() OR claims.user_id IS NULL)
  )
);

-- Service role full access
CREATE POLICY "Service role full access docs" ON claim_documents
FOR ALL USING (
  auth.jwt()->>'role' = 'service_role'
);


-- ============================================================
-- 3. AUDIT_LOGS TABLE - Admin only
-- ============================================================

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only audit" ON audit_logs;

-- Only service role can access audit logs
CREATE POLICY "Service role only audit" ON audit_logs
FOR ALL USING (
  auth.jwt()->>'role' = 'service_role'
);


-- ============================================================
-- 4. INBOUND_EMAILS TABLE - Admin only
-- ============================================================

ALTER TABLE inbound_emails ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only emails" ON inbound_emails;

-- Only service role can access inbound emails
CREATE POLICY "Service role only emails" ON inbound_emails
FOR ALL USING (
  auth.jwt()->>'role' = 'service_role'
);


-- ============================================================
-- 5. VERZEKERAARS TABLE - Public read, admin write
-- ============================================================

ALTER TABLE verzekeraars ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read verzekeraars" ON verzekeraars;
DROP POLICY IF EXISTS "Service role write verzekeraars" ON verzekeraars;

-- Anyone can read insurance company data
CREATE POLICY "Public read verzekeraars" ON verzekeraars
FOR SELECT USING (true);

-- Only service role can modify
CREATE POLICY "Service role write verzekeraars" ON verzekeraars
FOR ALL USING (
  auth.jwt()->>'role' = 'service_role'
);


-- ============================================================
-- VERIFICATION: Run this to confirm RLS is enabled
-- ============================================================

SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('claims', 'claim_documents', 'audit_logs', 'inbound_emails', 'verzekeraars');

-- Expected output: All tables should show rowsecurity = true
