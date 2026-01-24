-- ============================================
-- Email Inbox Admin Features Migration
-- Voegt kolommen toe voor admin email beheer
-- ============================================

-- Add admin review tracking columns to inbound_emails
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS admin_reviewed BOOLEAN DEFAULT NULL;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS admin_reviewed_at TIMESTAMPTZ;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS admin_reviewed_by TEXT;

-- Add spam tracking columns
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS is_spam BOOLEAN DEFAULT FALSE;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS spam_marked_at TIMESTAMPTZ;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS spam_marked_by TEXT;

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_inbound_emails_unmatched 
ON inbound_emails (claim_id, is_spam, admin_reviewed) 
WHERE claim_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_inbound_emails_spam 
ON inbound_emails (is_spam, spam_marked_at) 
WHERE is_spam = TRUE;

-- Function to auto-cleanup old spam (can be called by cron)
CREATE OR REPLACE FUNCTION cleanup_old_spam_emails()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM inbound_emails
  WHERE is_spam = TRUE
    AND spam_marked_at < NOW() - INTERVAL '7 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users (admin check happens in API)
GRANT EXECUTE ON FUNCTION cleanup_old_spam_emails() TO authenticated;

COMMENT ON COLUMN inbound_emails.admin_reviewed IS 'True wanneer admin de email heeft bekeken/verwerkt';
COMMENT ON COLUMN inbound_emails.is_spam IS 'True wanneer email is gemarkeerd als spam';
COMMENT ON FUNCTION cleanup_old_spam_emails() IS 'Verwijdert spam emails ouder dan 7 dagen';
