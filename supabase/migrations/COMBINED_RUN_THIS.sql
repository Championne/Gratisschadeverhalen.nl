-- =======================================================
-- GECOMBINEERDE MIGRATIE - AI AUTOMATISERING + ADMIN INBOX
-- Voer dit EENMALIG uit in Supabase SQL Editor
-- Datum: 24 januari 2026
-- =======================================================

-- =============================================
-- STAP 1: CLAIMS TABLE - AI KOLOMMEN
-- =============================================

ALTER TABLE claims ADD COLUMN IF NOT EXISTS estimated_damage_min numeric(10,2);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS estimated_damage_max numeric(10,2);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS damage_estimate_confidence integer CHECK (damage_estimate_confidence >= 0 AND damage_estimate_confidence <= 100);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS damage_type text;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS expert_needed boolean DEFAULT false;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS expert_reason text;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS ai_damage_analysis jsonb DEFAULT '{}';
ALTER TABLE claims ADD COLUMN IF NOT EXISTS photo_analysis_done boolean DEFAULT false;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS photo_urls text[] DEFAULT '{}';
ALTER TABLE claims ADD COLUMN IF NOT EXISTS reanalysis_needed boolean DEFAULT false;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS reanalysis_reason text;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS last_ai_analysis_at timestamptz;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS ai_analysis_count integer DEFAULT 0;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS liability_percentage integer CHECK (liability_percentage >= 0 AND liability_percentage <= 100);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS liability_confidence integer CHECK (liability_confidence >= 0 AND liability_confidence <= 100);

-- Index voor reanalysis queue
CREATE INDEX IF NOT EXISTS idx_claims_reanalysis_needed ON claims(reanalysis_needed) WHERE reanalysis_needed = true;
CREATE INDEX IF NOT EXISTS idx_claims_expert_needed ON claims(expert_needed) WHERE expert_needed = true;

-- =============================================
-- STAP 2: INBOUND_EMAILS - NIEUWE KOLOMMEN
-- =============================================

-- AI Automation kolommen
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS auto_reply_sent boolean DEFAULT false;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS auto_reply_content text;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS auto_reply_sent_at timestamptz;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS attachment_analysis jsonb DEFAULT '[]';
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS triggered_reanalysis boolean DEFAULT false;

-- Admin inbox kolommen
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS admin_reviewed BOOLEAN DEFAULT NULL;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS admin_reviewed_at TIMESTAMPTZ;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS admin_reviewed_by TEXT;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS is_spam BOOLEAN DEFAULT FALSE;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS spam_marked_at TIMESTAMPTZ;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS spam_marked_by TEXT;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inbound_emails_unmatched 
ON inbound_emails (claim_id, is_spam, admin_reviewed) 
WHERE claim_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_inbound_emails_spam 
ON inbound_emails (is_spam, spam_marked_at) 
WHERE is_spam = TRUE;

-- =============================================
-- STAP 3: CLAIM_DOCUMENTS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS claim_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE,
  uploaded_by text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size_bytes integer,
  ai_analysis jsonb DEFAULT '{}',
  ai_analyzed boolean DEFAULT false,
  ai_analyzed_at timestamptz,
  triggered_reanalysis boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_claim_documents_claim_id ON claim_documents(claim_id);
CREATE INDEX IF NOT EXISTS idx_claim_documents_not_analyzed ON claim_documents(ai_analyzed) WHERE ai_analyzed = false;

-- =============================================
-- STAP 4: AUTO_REPLY_TEMPLATES TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS auto_reply_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email_type text NOT NULL,
  template_name text NOT NULL,
  subject_template text NOT NULL,
  body_template text NOT NULL,
  is_active boolean DEFAULT true,
  use_ai_generation boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Standaard templates
INSERT INTO auto_reply_templates (email_type, template_name, subject_template, body_template, is_active, use_ai_generation)
VALUES 
  ('acknowledgment', 'Ontvangstbevestiging Reactie', 'Re: {{original_subject}} - Bevestiging Ontvangst', 
   'Geachte heer/mevrouw,

Wij bevestigen de goede ontvangst van uw bericht d.d. {{date}}.

Uw reactie is toegevoegd aan ons dossier (referentie: {{claim_id}}) en wordt momenteel beoordeeld door onze afdeling.

U ontvangt binnen 5 werkdagen een inhoudelijke reactie.

Met vriendelijke groet,
Autoschadebureau.nl
Namens {{claimer_name}}', true, false),

  ('information_request', 'Bevestiging Informatieverzoek', 'Re: {{original_subject}} - Informatieverzoek Ontvangen', 
   'Geachte heer/mevrouw,

Wij hebben uw verzoek om aanvullende informatie ontvangen.

Wij zullen de gevraagde informatie zo spoedig mogelijk verstrekken. Ons streefdoel is binnen 3 werkdagen te reageren.

Referentie: {{claim_id}}

Met vriendelijke groet,
Autoschadebureau.nl
Namens {{claimer_name}}', true, false),

  ('settlement_offer', 'Ontvangst Schikkingsvoorstel', 'Re: {{original_subject}} - Schikkingsvoorstel Ontvangen', 
   'Geachte heer/mevrouw,

Wij bevestigen de ontvangst van uw schikkingsvoorstel.

Dit voorstel wordt momenteel beoordeeld en besproken met onze cliënt. U ontvangt zo spoedig mogelijk een reactie.

Referentie: {{claim_id}}

Met vriendelijke groet,
Autoschadebureau.nl
Namens {{claimer_name}}', true, false)
ON CONFLICT DO NOTHING;

-- =============================================
-- STAP 5: FUNCTIONS
-- =============================================

-- Claims needing reanalysis
CREATE OR REPLACE FUNCTION get_claims_needing_reanalysis()
RETURNS TABLE (
  claim_id uuid,
  naam text,
  email text,
  reanalysis_reason text,
  last_analysis_at timestamptz,
  new_documents_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id as claim_id,
    c.naam,
    c.email,
    c.reanalysis_reason,
    c.last_ai_analysis_at,
    (SELECT COUNT(*) FROM claim_documents cd WHERE cd.claim_id = c.id AND cd.ai_analyzed = false) as new_documents_count
  FROM claims c
  WHERE c.reanalysis_needed = true
    AND c.status NOT IN ('afgerond', 'geweigerd', 'geannuleerd')
  ORDER BY c.updated_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Spam cleanup
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

-- =============================================
-- STAP 6: TRIGGER VOOR AUTO-REANALYSIS
-- =============================================

CREATE OR REPLACE FUNCTION trigger_claim_reanalysis()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE claims
  SET 
    reanalysis_needed = true,
    reanalysis_reason = COALESCE(reanalysis_reason, '') || 
      CASE WHEN reanalysis_reason IS NOT NULL AND reanalysis_reason != '' THEN ', ' ELSE '' END ||
      'Nieuw document: ' || NEW.file_name,
    updated_at = now()
  WHERE id = NEW.claim_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS claim_document_uploaded ON claim_documents;
CREATE TRIGGER claim_document_uploaded
  AFTER INSERT ON claim_documents
  FOR EACH ROW
  EXECUTE FUNCTION trigger_claim_reanalysis();

-- =============================================
-- STAP 7: PERMISSIONS
-- =============================================

GRANT EXECUTE ON FUNCTION cleanup_old_spam_emails() TO authenticated;
GRANT EXECUTE ON FUNCTION get_claims_needing_reanalysis() TO authenticated;

-- =============================================
-- VERIFICATIE QUERY - VOER UIT NA MIGRATIE
-- =============================================

-- Controleer of alle kolommen bestaan:
/*
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'claims' 
  AND column_name IN (
    'estimated_damage_min', 'estimated_damage_max', 
    'damage_estimate_confidence', 'damage_type',
    'expert_needed', 'expert_reason', 'reanalysis_needed',
    'liability_percentage', 'liability_confidence'
  )
ORDER BY column_name;
*/

SELECT 'Migratie succesvol voltooid!' as status;
