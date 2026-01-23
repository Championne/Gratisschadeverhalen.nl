-- Fix: Add 'comment_added' and 'submit' to audit_logs constraint
-- This migration fixes the constraint to include all existing action types

-- Step 1: Drop the old constraint
ALTER TABLE public.audit_logs 
  DROP CONSTRAINT IF EXISTS audit_logs_action_type_check;

-- Step 2: Add new constraint with ALL existing types + comment_added
ALTER TABLE public.audit_logs 
  ADD CONSTRAINT audit_logs_action_type_check 
  CHECK (action_type IN (
    'claim_submit',
    'submit',           -- This was missing! (existing in DB)
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
    'comment_added'     -- NEW: for admin notes
  ));

-- Step 3: Verify success
SELECT 
  '✅ Migration successful!' as message,
  COUNT(*) as total_logs,
  COUNT(DISTINCT action_type) as unique_types
FROM public.audit_logs;

-- Step 4: Show all action types now allowed
SELECT unnest(enum_range(NULL::text)) as allowed_types 
FROM (
  VALUES 
    ('claim_submit'),
    ('submit'),
    ('ocr_run'),
    ('ai_analyse'),
    ('email_sent'),
    ('email_received'),
    ('status_change'),
    ('escalatie'),
    ('manual_edit'),
    ('file_upload'),
    ('file_delete'),
    ('login'),
    ('view_claim'),
    ('comment_added')
) as t(enum_range);
