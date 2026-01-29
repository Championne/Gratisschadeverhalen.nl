-- =============================================
-- REVIEW REQUEST SYSTEEM
-- =============================================
-- Doel: Automatisch Google Review vragen na succesvolle claim
-- Trigger: Claims met status 'uitbetaald' of 'afgerond'
-- Timing: 24-48 uur na afronden
-- =============================================

-- Voeg review request kolommen toe aan claims tabel
ALTER TABLE public.claims
ADD COLUMN IF NOT EXISTS review_email_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS review_email_clicked_at TIMESTAMP WITH TIME ZONE;

-- Index voor snelle cron queries
CREATE INDEX IF NOT EXISTS idx_claims_review_request 
ON public.claims(status, review_email_sent_at, updated_at)
WHERE status IN ('uitbetaald', 'afgerond') AND review_email_sent_at IS NULL;

-- =============================================
-- RPC FUNCTION: Haal claims op die review request nodig hebben
-- =============================================
-- Criteria:
-- 1. Status = 'uitbetaald' of 'afgerond'
-- 2. Nog geen review email verzonden
-- 3. Status gewijzigd 24-48 uur geleden (niet te snel, niet te laat)
-- 4. Email adres bekend

CREATE OR REPLACE FUNCTION public.get_claims_needing_review_request()
RETURNS TABLE (
    id UUID,
    naam VARCHAR(255),
    email VARCHAR(255),
    kenteken VARCHAR(20),
    verzekeraar_tegenpartij VARCHAR(255),
    status VARCHAR(50),
    updated_at TIMESTAMP WITH TIME ZONE,
    uren_sinds_afronding INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.naam,
        c.email,
        c.kenteken,
        c.verzekeraar_tegenpartij,
        c.status,
        c.updated_at,
        EXTRACT(HOUR FROM (NOW() - c.updated_at))::INTEGER as uren_sinds_afronding
    FROM public.claims c
    WHERE 
        c.status IN ('uitbetaald', 'afgerond')
        AND c.review_email_sent_at IS NULL
        AND c.email IS NOT NULL
        AND c.email != ''
        -- Tussen 24 en 72 uur na afronden (sweet spot voor review requests)
        AND c.updated_at > NOW() - INTERVAL '72 hours'
        AND c.updated_at < NOW() - INTERVAL '24 hours'
    ORDER BY c.updated_at ASC;  -- Oudste eerst
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- RPC FUNCTION: Markeer review email als verzonden
-- =============================================

CREATE OR REPLACE FUNCTION public.mark_review_request_sent(
    p_claim_id UUID
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.claims
    SET 
        review_email_sent_at = NOW(),
        updated_at = NOW()
    WHERE id = p_claim_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- RPC FUNCTION: Track review link click (optioneel)
-- =============================================

CREATE OR REPLACE FUNCTION public.mark_review_clicked(
    p_claim_id UUID
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.claims
    SET 
        review_email_clicked_at = NOW()
    WHERE id = p_claim_id
    AND review_email_clicked_at IS NULL;  -- Alleen eerste klik tellen
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- VERIFICATIE QUERIES
-- =============================================

-- Test: Hoeveel claims hebben review request nodig?
-- SELECT COUNT(*) FROM public.get_claims_needing_review_request();

-- Test: Bekijk claims die review nodig hebben
-- SELECT * FROM public.get_claims_needing_review_request();

-- Test: Mark review sent (vervang met echte UUID)
-- SELECT public.mark_review_request_sent('your-claim-uuid-here'::uuid);

-- =============================================
-- READY! 🚀
-- =============================================
