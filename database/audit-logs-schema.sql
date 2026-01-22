-- =============================================
-- AUDIT LOGS & ESCALATIE SYSTEEM
-- =============================================
-- Versie: 1.0
-- Doel: Juridische traceerbaarheid + Escalatie triggers
-- GDPR Compliant: Geen gevoelige persoonlijke data in logs
-- =============================================

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE,
    
    -- Action tracking
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN (
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
        'view_claim'
    )),
    
    -- Actor tracking (wie heeft actie uitgevoerd)
    performed_by VARCHAR(255) NOT NULL,
    -- Format: 'AI', 'SYSTEM', 'USER:email@example.com', 'ADMIN:admin@example.com'
    
    -- Flexible metadata (JSONB voor any extra info)
    details JSONB DEFAULT '{}'::jsonb,
    
    -- Severity level
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
    
    -- Optional IP tracking (GDPR: only for security audit, auto-delete after 30 days)
    ip_address INET,
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes voor snelle queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_claim_id ON public.audit_logs(claim_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_type ON public.audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON public.audit_logs(severity);
CREATE INDEX IF NOT EXISTS idx_audit_logs_performed_by ON public.audit_logs(performed_by);

-- =============================================
-- UPDATE CLAIMS TABLE: Voeg escalatie status toe
-- =============================================

-- Voeg 'escalated' status toe aan bestaande CHECK constraint
ALTER TABLE public.claims 
DROP CONSTRAINT IF EXISTS claims_status_check;

ALTER TABLE public.claims 
ADD CONSTRAINT claims_status_check 
CHECK (status IN (
    'nieuw', 
    'in_behandeling', 
    'aansprakelijkheidsbrief_verzonden', 
    'in_onderhandeling', 
    'afgerond', 
    'geweigerd', 
    'geannuleerd',
    'escalated'  -- NIEUW: Voor zaken die handmatige aandacht nodig hebben
));

-- Voeg escalatie velden toe aan claims tabel
ALTER TABLE public.claims 
ADD COLUMN IF NOT EXISTS escalatie_reden TEXT,
ADD COLUMN IF NOT EXISTS escalatie_datum TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS escalatie_opgelost BOOLEAN DEFAULT FALSE;

-- =============================================
-- ROW LEVEL SECURITY (RLS) VOOR AUDIT_LOGS
-- =============================================

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Admin kan alles zien (TODO: implementeer admin role check)
-- Voor nu: alleen SYSTEM kan audit logs lezen via RPC functions
CREATE POLICY "Only system can read audit_logs" 
    ON public.audit_logs 
    FOR SELECT 
    USING (false);  -- Niemand kan direct selecteren (alleen via RPC functions met SECURITY DEFINER)

-- Alleen SYSTEM kan audit logs schrijven (via RPC functions)
CREATE POLICY "Only system can insert audit_logs" 
    ON public.audit_logs 
    FOR INSERT 
    WITH CHECK (false);  -- Niemand kan direct inserten (alleen via RPC functions)

-- =============================================
-- RPC FUNCTIONS voor Audit Logging
-- =============================================

-- Function: Log een actie
CREATE OR REPLACE FUNCTION public.log_audit_action(
    p_claim_id UUID,
    p_action_type VARCHAR(50),
    p_performed_by VARCHAR(255),
    p_details JSONB DEFAULT '{}'::jsonb,
    p_severity VARCHAR(20) DEFAULT 'info',
    p_ip_address INET DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO public.audit_logs (
        claim_id,
        action_type,
        performed_by,
        details,
        severity,
        ip_address
    ) VALUES (
        p_claim_id,
        p_action_type,
        p_performed_by,
        p_details,
        p_severity,
        p_ip_address
    ) RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Haal audit logs op voor een claim (voor admins)
CREATE OR REPLACE FUNCTION public.get_claim_audit_logs(
    p_claim_id UUID
)
RETURNS TABLE (
    id UUID,
    action_type VARCHAR(50),
    performed_by VARCHAR(255),
    details JSONB,
    severity VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        al.id,
        al.action_type,
        al.performed_by,
        al.details,
        al.severity,
        al.created_at
    FROM public.audit_logs al
    WHERE al.claim_id = p_claim_id
    ORDER BY al.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- ESCALATIE FUNCTIONS
-- =============================================

-- Function: Escaleer een claim
CREATE OR REPLACE FUNCTION public.escalate_claim(
    p_claim_id UUID,
    p_reden TEXT,
    p_performed_by VARCHAR(255)
)
RETURNS VOID AS $$
BEGIN
    -- Update claim status
    UPDATE public.claims
    SET 
        status = 'escalated',
        escalatie_reden = p_reden,
        escalatie_datum = NOW(),
        escalatie_opgelost = FALSE,
        updated_at = NOW()
    WHERE id = p_claim_id;
    
    -- Log escalatie
    PERFORM public.log_audit_action(
        p_claim_id,
        'escalatie',
        p_performed_by,
        jsonb_build_object(
            'reden', p_reden,
            'timestamp', NOW()
        ),
        'critical'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Markeer escalatie als opgelost
CREATE OR REPLACE FUNCTION public.resolve_escalation(
    p_claim_id UUID,
    p_performed_by VARCHAR(255),
    p_nieuwe_status VARCHAR(50)
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.claims
    SET 
        status = p_nieuwe_status,
        escalatie_opgelost = TRUE,
        updated_at = NOW()
    WHERE id = p_claim_id;
    
    -- Log oplossing
    PERFORM public.log_audit_action(
        p_claim_id,
        'status_change',
        p_performed_by,
        jsonb_build_object(
            'oude_status', 'escalated',
            'nieuwe_status', p_nieuwe_status,
            'escalatie_opgelost', TRUE
        ),
        'info'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- VIEW: Escalaties overzicht (voor admin dashboard)
-- =============================================

CREATE OR REPLACE VIEW public.escalated_claims AS
SELECT 
    c.id,
    c.naam,
    c.email,
    c.datum_ongeval,
    c.kenteken_tegenpartij,
    c.escalatie_reden,
    c.escalatie_datum,
    c.escalatie_opgelost,
    c.ocr_confidence,
    c.created_at
FROM public.claims c
WHERE c.status = 'escalated' 
  AND c.escalatie_opgelost = FALSE
ORDER BY c.escalatie_datum DESC;

-- =============================================
-- GDPR COMPLIANCE: Auto-cleanup oude logs
-- =============================================

-- Function: Verwijder logs ouder dan 2 jaar (AVG verplichting)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.audit_logs
    WHERE created_at < NOW() - INTERVAL '2 years';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Verwijder IP addresses ouder dan 30 dagen (GDPR minimalisatie)
CREATE OR REPLACE FUNCTION public.anonymize_old_ip_addresses()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE public.audit_logs
    SET ip_address = NULL
    WHERE created_at < NOW() - INTERVAL '30 days'
      AND ip_address IS NOT NULL;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- VERIFICATIE QUERIES
-- =============================================

-- Check audit_logs tabel
-- SELECT * FROM public.audit_logs ORDER BY created_at DESC LIMIT 10;

-- Check escalaties
-- SELECT * FROM public.escalated_claims;

-- Test log functie
-- SELECT public.log_audit_action(
--     'your-claim-uuid'::uuid,
--     'test_action',
--     'SYSTEM',
--     '{"test": "data"}'::jsonb,
--     'info',
--     '127.0.0.1'::inet
-- );

-- =============================================
-- READY! 🚀
-- =============================================

-- Deployment instructies:
-- 1. Run dit script in Supabase SQL Editor
-- 2. Verifieer met: SELECT * FROM public.audit_logs;
-- 3. Test escalatie: SELECT * FROM public.escalated_claims;
-- 4. Setup cron job voor cleanup (optioneel):
--    - Weekly: SELECT public.anonymize_old_ip_addresses();
--    - Monthly: SELECT public.cleanup_old_audit_logs();
