-- =============================================
-- FOLLOW-UP SYSTEEM
-- =============================================
-- Doel: Automatische herinneringen naar verzekeraars
-- Trigger: Claims in_behandeling > 14 dagen
-- =============================================

-- Voeg follow-up kolommen toe aan claims tabel
ALTER TABLE public.claims
ADD COLUMN IF NOT EXISTS follow_up_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS follow_up_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_follow_up_date TIMESTAMP WITH TIME ZONE;

-- Index voor snelle cron queries
CREATE INDEX IF NOT EXISTS idx_claims_follow_up 
ON public.claims(status, follow_up_sent, created_at)
WHERE status = 'in_behandeling' AND follow_up_sent = FALSE;

-- =============================================
-- RPC FUNCTION: Haal claims op die herinnering nodig hebben
-- =============================================

CREATE OR REPLACE FUNCTION public.get_claims_needing_followup()
RETURNS TABLE (
    id UUID,
    naam VARCHAR(255),
    email VARCHAR(255),
    telefoon VARCHAR(20),
    kenteken_tegenpartij VARCHAR(20),
    verzekeraar_tegenpartij VARCHAR(255),
    verzekeraar_email VARCHAR(255),
    datum_ongeval DATE,
    plaats_ongeval VARCHAR(255),
    beschrijving TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    dagen_wachttijd INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.naam,
        c.email,
        c.telefoon,
        c.kenteken_tegenpartij,
        c.verzekeraar_tegenpartij,
        v.email_schade as verzekeraar_email,
        c.datum_ongeval,
        c.plaats_ongeval,
        c.beschrijving,
        c.created_at,
        EXTRACT(DAY FROM (NOW() - c.created_at))::INTEGER as dagen_wachttijd
    FROM public.claims c
    LEFT JOIN public.verzekeraars v 
        ON LOWER(c.verzekeraar_tegenpartij) = LOWER(v.naam)
        OR v.naam_normalized = LOWER(REGEXP_REPLACE(c.verzekeraar_tegenpartij, '\s+', '', 'g'))
    WHERE 
        c.status = 'in_behandeling'
        AND c.follow_up_sent = FALSE
        AND c.created_at < NOW() - INTERVAL '14 days'
        AND v.email_schade IS NOT NULL  -- Alleen als verzekeraar email bekend is
    ORDER BY c.created_at ASC;  -- Oudste eerst
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- RPC FUNCTION: Markeer follow-up als verzonden
-- =============================================

CREATE OR REPLACE FUNCTION public.mark_followup_sent(
    p_claim_id UUID
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.claims
    SET 
        follow_up_sent = TRUE,
        follow_up_date = NOW(),
        follow_up_count = follow_up_count + 1,
        last_follow_up_date = NOW(),
        updated_at = NOW()
    WHERE id = p_claim_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- VIEW: Follow-up overzicht (voor dashboard)
-- =============================================

CREATE OR REPLACE VIEW public.followup_overview AS
SELECT 
    c.id,
    c.naam,
    c.email,
    c.verzekeraar_tegenpartij,
    c.status,
    c.created_at,
    c.follow_up_sent,
    c.follow_up_date,
    c.follow_up_count,
    EXTRACT(DAY FROM (NOW() - c.created_at))::INTEGER as dagen_sinds_aangemaakt,
    CASE 
        WHEN c.follow_up_sent THEN 'Verzonden'
        WHEN c.created_at < NOW() - INTERVAL '14 days' THEN 'Actie vereist'
        ELSE 'Binnen termijn'
    END as follow_up_status
FROM public.claims c
WHERE c.status IN ('in_behandeling', 'aansprakelijkheidsbrief_verzonden')
ORDER BY c.created_at ASC;

-- =============================================
-- VERIFICATIE QUERIES
-- =============================================

-- Test: Hoeveel claims hebben follow-up nodig?
-- SELECT COUNT(*) FROM public.get_claims_needing_followup();

-- Test: Overzicht follow-up status
-- SELECT * FROM public.followup_overview LIMIT 10;

-- Test: Mark follow-up sent (vervang met echte UUID)
-- SELECT public.mark_followup_sent('your-claim-uuid-here'::uuid);

-- =============================================
-- READY! 🚀
-- =============================================
