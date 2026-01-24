-- =============================================
-- AI AUTOMATION SCHEMA UPDATES
-- 24 januari 2026
-- =============================================

-- Nieuwe kolommen voor AI schade-inschatting
ALTER TABLE claims ADD COLUMN IF NOT EXISTS estimated_damage_min numeric(10,2);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS estimated_damage_max numeric(10,2);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS damage_estimate_confidence integer CHECK (damage_estimate_confidence >= 0 AND damage_estimate_confidence <= 100);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS damage_type text; -- 'bumper', 'deur', 'motorkap', 'total_loss', etc.
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

-- Nieuwe kolommen voor inbound emails
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS auto_reply_sent boolean DEFAULT false;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS auto_reply_content text;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS auto_reply_sent_at timestamptz;
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS attachment_analysis jsonb DEFAULT '[]';
ALTER TABLE inbound_emails ADD COLUMN IF NOT EXISTS triggered_reanalysis boolean DEFAULT false;

-- Tabel voor document uploads (extra documenten na initiële claim)
CREATE TABLE IF NOT EXISTS claim_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE,
  uploaded_by text NOT NULL, -- 'claimer', 'admin', 'verzekeraar'
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL, -- 'image', 'pdf', 'document'
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

-- Tabel voor auto-reply templates
CREATE TABLE IF NOT EXISTS auto_reply_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email_type text NOT NULL, -- 'information_request', 'acknowledgment', etc.
  template_name text NOT NULL,
  subject_template text NOT NULL,
  body_template text NOT NULL,
  is_active boolean DEFAULT true,
  use_ai_generation boolean DEFAULT false, -- Als true, gebruik AI om content te genereren
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert standaard auto-reply templates
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

-- Function om claims te vinden die heranalyse nodig hebben
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

-- Trigger om reanalysis_needed te zetten bij nieuwe documenten
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

-- Comments voor documentatie
COMMENT ON COLUMN claims.estimated_damage_min IS 'AI geschatte minimum schadebedrag in euros';
COMMENT ON COLUMN claims.estimated_damage_max IS 'AI geschatte maximum schadebedrag in euros';
COMMENT ON COLUMN claims.damage_estimate_confidence IS 'Confidence score van schade-inschatting (0-100)';
COMMENT ON COLUMN claims.expert_needed IS 'Of een fysieke expert nodig is voor taxatie';
COMMENT ON COLUMN claims.expert_reason IS 'Reden waarom expert wel/niet nodig is';
COMMENT ON COLUMN claims.reanalysis_needed IS 'Flag voor AI om claim opnieuw te analyseren';
