-- Add 'comment_added' to audit_logs action_type constraint
-- Run this in Supabase SQL Editor

-- Drop existing constraint
ALTER TABLE public.audit_logs 
  DROP CONSTRAINT IF EXISTS audit_logs_action_type_check;

-- Add new constraint with comment_added
ALTER TABLE public.audit_logs 
  ADD CONSTRAINT audit_logs_action_type_check 
  CHECK (action_type IN (
    'claim_submit',
    'ocr_run',
    'ai_analyse',
    'email_sent',
    'email_received',
    'status_change',
    'escalatie',
    'manual_edit',
    'file_upload',
    'file_delete',
    'login',
    'view_claim',
    'comment_added'
  ));

-- Verify
SELECT 
  'Constraint updated successfully!' as message,
  COUNT(*) as existing_logs
FROM public.audit_logs;
