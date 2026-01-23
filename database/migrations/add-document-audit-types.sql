-- Migration: Add document audit log action types
-- Date: 2026-01-23
-- Description: Add 'document_uploaded' and 'document_deleted' to audit_logs action_type check constraint

-- Drop old constraint
ALTER TABLE audit_logs DROP CONSTRAINT IF EXISTS audit_logs_action_type_check;

-- Add new constraint with document types
ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_action_type_check 
CHECK (action_type IN (
  'claim_submit',
  'submit',
  'ocr_run',
  'ai_analyse',
  'email_sent',
  'status_change',
  'escalatie',
  'manual_edit',
  'comment_added',
  'document_uploaded',
  'document_deleted'
));
