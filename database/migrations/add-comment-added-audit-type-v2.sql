-- Fix: Add 'comment_added' to audit_logs action_type constraint
-- Run this in Supabase SQL Editor

-- Step 1: Check existing action types in the database
SELECT DISTINCT action_type 
FROM public.audit_logs 
ORDER BY action_type;

-- Step 2: Drop the constraint (this allows any value temporarily)
ALTER TABLE public.audit_logs 
  DROP CONSTRAINT IF EXISTS audit_logs_action_type_check;

-- Step 3: Add the new constraint with ALL known types
-- (Make sure to include any types found in Step 1)
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
    'comment_added',
    -- Common variations that might exist:
    'claim_created',
    'claim_updated',
    'user_registered',
    'document_uploaded'
  ));

-- Step 4: Verify the constraint was added
SELECT 
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname = 'audit_logs_action_type_check';

-- Step 5: Show summary
SELECT 
  'Migration completed successfully!' as status,
  COUNT(*) as total_audit_logs,
  COUNT(DISTINCT action_type) as unique_action_types
FROM public.audit_logs;
