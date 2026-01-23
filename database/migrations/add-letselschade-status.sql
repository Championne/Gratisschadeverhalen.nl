-- Migration: Add 'letselschade_gedetecteerd' to claims status check constraint
-- Date: 2026-01-23
-- Description: Enable letselschade_gedetecteerd as a valid status for claims

-- Drop old constraint
ALTER TABLE claims DROP CONSTRAINT IF EXISTS claims_status_check;

-- Add new constraint WITH letselschade_gedetecteerd
ALTER TABLE claims ADD CONSTRAINT claims_status_check 
CHECK (status IN (
  'nieuw',
  'in_behandeling',
  'afgerond',
  'geannuleerd',
  'escalated',
  'afgewezen',
  'letselschade_gedetecteerd'
));

-- Verify constraint
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'claims_status_check';
