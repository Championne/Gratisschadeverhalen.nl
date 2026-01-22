-- =============================================
-- AUDIT SYSTEEM TEST SCRIPT
-- =============================================
-- Gebruik: Kopieer en plak in Supabase SQL Editor
-- Doel: Volledige test van audit logging & escalatie
-- =============================================

-- ✅ TEST 1: Verificatie dat alle tabellen/functies bestaan
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '🧪 TEST 1: Verificatie Database Setup';
    RAISE NOTICE '=====================================';
END $$;

-- Check audit_logs tabel
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'audit_logs')
        THEN '✅ audit_logs tabel bestaat'
        ELSE '❌ audit_logs tabel ONTBREEKT'
    END as status;

-- Check RPC functions
SELECT 
    CASE 
        WHEN COUNT(*) >= 6
        THEN '✅ Alle ' || COUNT(*) || ' RPC functions aanwezig'
        ELSE '❌ Sommige RPC functions ONTBREKEN (verwacht: 6, gevonden: ' || COUNT(*) || ')'
    END as status
FROM pg_proc 
WHERE proname IN (
    'log_audit_action',
    'get_claim_audit_logs',
    'escalate_claim',
    'resolve_escalation',
    'cleanup_old_audit_logs',
    'anonymize_old_ip_addresses'
);

-- Check escalated_claims view
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.views WHERE table_name = 'escalated_claims')
        THEN '✅ escalated_claims view bestaat'
        ELSE '❌ escalated_claims view ONTBREEKT'
    END as status;

-- Check claims tabel heeft escalatie kolommen
SELECT 
    CASE 
        WHEN COUNT(*) >= 3
        THEN '✅ Claims tabel heeft escalatie kolommen'
        ELSE '❌ Claims tabel MIST escalatie kolommen'
    END as status
FROM information_schema.columns
WHERE table_name = 'claims' 
  AND column_name IN ('escalatie_reden', 'escalatie_datum', 'escalatie_opgelost');

-- =============================================
-- ✅ TEST 2: Log Audit Action (Basis Functionaliteit)
-- =============================================
DO $$
DECLARE
    log_id UUID;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 2: Log Audit Action';
    RAISE NOTICE '===========================';
    
    -- Test logging
    log_id := public.log_audit_action(
        NULL::uuid,
        'manual_edit',
        'SYSTEM:test',
        '{"test": "audit_test_2", "timestamp": "2026-01-20T12:00:00Z"}'::jsonb,
        'info',
        '127.0.0.1'::inet
    );
    
    IF log_id IS NOT NULL THEN
        RAISE NOTICE '✅ Log succesvol aangemaakt: %', log_id;
    ELSE
        RAISE NOTICE '❌ Log NIET aangemaakt';
    END IF;
END $$;

-- Verificatie
SELECT 
    CASE 
        WHEN COUNT(*) = 1
        THEN '✅ Test log aanwezig in database'
        ELSE '❌ Test log NIET gevonden'
    END as status,
    COUNT(*) as aantal_test_logs
FROM public.audit_logs 
WHERE details->>'test' = 'audit_test_2';

-- =============================================
-- ✅ TEST 3: Escalatie Flow (Met Test Claim)
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 3: Escalatie Flow';
    RAISE NOTICE '=========================';
END $$;

-- Maak test claim
INSERT INTO public.claims (
    naam, email, telefoon, 
    kenteken_tegenpartij, datum_ongeval, plaats_ongeval,
    beschrijving, naam_tegenpartij, verzekeraar_tegenpartij,
    ocr_confidence, status
) VALUES (
    'Test Audit Systeem', 
    'audit-test@gratisschadeverhalen.nl', 
    '0612345678',
    'TEST-01', 
    '2026-01-20', 
    'Amsterdam',
    'Test claim voor audit systeem verificatie', 
    'Test Tegenpartij', 
    'Test Verzekering',
    65,  -- Lage confidence
    'nieuw'
);

-- Haal test claim ID op
DO $$
DECLARE
    test_claim_id UUID;
BEGIN
    SELECT id INTO test_claim_id
    FROM public.claims
    WHERE email = 'audit-test@gratisschadeverhalen.nl'
    ORDER BY created_at DESC
    LIMIT 1;
    
    RAISE NOTICE 'Test claim ID: %', test_claim_id;
    
    -- Escaleer claim
    PERFORM public.escalate_claim(
        test_claim_id,
        'Test escalatie - OCR confidence te laag (65%)',
        'SYSTEM:test'
    );
    
    RAISE NOTICE '✅ Escalatie functie uitgevoerd';
END $$;

-- Verificatie
SELECT 
    id,
    naam,
    status,
    escalatie_reden,
    TO_CHAR(escalatie_datum, 'YYYY-MM-DD HH24:MI') as escalatie_datum,
    escalatie_opgelost,
    CASE 
        WHEN status = 'escalated' AND escalatie_reden IS NOT NULL
        THEN '✅ ESCALATIE OK'
        ELSE '❌ ESCALATIE MISLUKT'
    END as test_resultaat
FROM public.claims
WHERE email = 'audit-test@gratisschadeverhalen.nl';

-- =============================================
-- ✅ TEST 4: Get Claim Audit Logs
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 4: Ophalen Audit Logs';
    RAISE NOTICE '==============================';
END $$;

-- Ophalen via RPC function
DO $$
DECLARE
    test_claim_id UUID;
    log_count INTEGER;
BEGIN
    SELECT id INTO test_claim_id
    FROM public.claims
    WHERE email = 'audit-test@gratisschadeverhalen.nl'
    LIMIT 1;
    
    SELECT COUNT(*) INTO log_count
    FROM public.get_claim_audit_logs(test_claim_id);
    
    IF log_count >= 1 THEN
        RAISE NOTICE '✅ Logs succesvol opgehaald: % logs gevonden', log_count;
    ELSE
        RAISE NOTICE '⚠️  Geen logs gevonden (mogelijk OK als claim net aangemaakt)';
    END IF;
END $$;

-- Toon logs voor test claim
SELECT 
    action_type,
    performed_by,
    severity,
    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as timestamp,
    details->>'reden' as reden
FROM public.get_claim_audit_logs(
    (SELECT id FROM public.claims WHERE email = 'audit-test@gratisschadeverhalen.nl' LIMIT 1)
)
ORDER BY created_at;

-- =============================================
-- ✅ TEST 5: Resolve Escalation
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 5: Resolve Escalation';
    RAISE NOTICE '==============================';
END $$;

DO $$
DECLARE
    test_claim_id UUID;
BEGIN
    SELECT id INTO test_claim_id
    FROM public.claims
    WHERE email = 'audit-test@gratisschadeverhalen.nl'
    LIMIT 1;
    
    -- Resolve escalatie
    PERFORM public.resolve_escalation(
        test_claim_id,
        'ADMIN:test@admin.nl',
        'in_behandeling'
    );
    
    RAISE NOTICE '✅ Resolve functie uitgevoerd';
END $$;

-- Verificatie
SELECT 
    status,
    escalatie_opgelost,
    CASE 
        WHEN status = 'in_behandeling' AND escalatie_opgelost = TRUE
        THEN '✅ RESOLVE OK'
        ELSE '❌ RESOLVE MISLUKT'
    END as test_resultaat
FROM public.claims
WHERE email = 'audit-test@gratisschadeverhalen.nl';

-- =============================================
-- ✅ TEST 6: GDPR Compliance (IP Anonymization)
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 6: GDPR IP Anonymization';
    RAISE NOTICE '=================================';
END $$;

-- Maak oude log met IP
INSERT INTO public.audit_logs (
    action_type, performed_by, details, 
    ip_address, created_at
) VALUES (
    'manual_edit',  -- Valid action type
    'GDPR_TEST', 
    '{"test": "gdpr_ip_test"}'::jsonb,
    '192.168.1.100'::inet,
    NOW() - INTERVAL '31 days'  -- 31 dagen oud
);

-- Check voor anonymization
SELECT 
    ip_address,
    TO_CHAR(created_at, 'YYYY-MM-DD') as created_date,
    CASE 
        WHEN ip_address IS NOT NULL
        THEN '✅ IP nog aanwezig (voor test)'
        ELSE '❌ IP al NULL (niet verwacht)'
    END as status
FROM public.audit_logs
WHERE details->>'test' = 'gdpr_ip_test';

-- Run anonymize functie
SELECT public.anonymize_old_ip_addresses() as aantal_geanonimiseerd;

-- Verificatie
SELECT 
    ip_address,
    CASE 
        WHEN ip_address IS NULL
        THEN '✅ IP succesvol geanonimiseerd'
        ELSE '❌ IP NIET geanonimiseerd'
    END as test_resultaat
FROM public.audit_logs
WHERE details->>'test' = 'gdpr_ip_test';

-- =============================================
-- ✅ TEST 7: GDPR Cleanup (Oude Logs)
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 7: GDPR Cleanup Oude Logs';
    RAISE NOTICE '==================================';
END $$;

-- Maak zeer oude log
INSERT INTO public.audit_logs (
    action_type, performed_by, details, created_at
) VALUES (
    'manual_edit',  -- Valid action type
    'GDPR_TEST', 
    '{"test": "gdpr_cleanup_test"}'::jsonb,
    NOW() - INTERVAL '3 years'  -- 3 jaar oud
);

-- Check voor cleanup
SELECT 
    TO_CHAR(created_at, 'YYYY-MM-DD') as created_date,
    NOW() - created_at as leeftijd,
    '✅ Oude log aanwezig (voor test)' as status
FROM public.audit_logs
WHERE details->>'test' = 'gdpr_cleanup_test';

-- Run cleanup functie
SELECT public.cleanup_old_audit_logs() as aantal_verwijderd;

-- Verificatie
SELECT 
    CASE 
        WHEN COUNT(*) = 0
        THEN '✅ Oude log succesvol verwijderd'
        ELSE '❌ Oude log NIET verwijderd (aantal: ' || COUNT(*) || ')'
    END as test_resultaat
FROM public.audit_logs
WHERE details->>'test' = 'gdpr_cleanup_test';

-- =============================================
-- ✅ TEST 8: Escalated Claims View
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TEST 8: Escalated Claims View';
    RAISE NOTICE '=================================';
END $$;

-- Re-escaleer test claim voor view test
DO $$
DECLARE
    test_claim_id UUID;
BEGIN
    SELECT id INTO test_claim_id
    FROM public.claims
    WHERE email = 'audit-test@gratisschadeverhalen.nl'
    LIMIT 1;
    
    -- Update status terug naar escalated voor view test
    UPDATE public.claims
    SET status = 'escalated', escalatie_opgelost = FALSE
    WHERE id = test_claim_id;
END $$;

-- Check view
SELECT 
    naam,
    email,
    escalatie_reden,
    TO_CHAR(escalatie_datum, 'YYYY-MM-DD HH24:MI') as escalatie_datum,
    '✅ Zichtbaar in escalated_claims view' as status
FROM public.escalated_claims
WHERE email = 'audit-test@gratisschadeverhalen.nl';

-- =============================================
-- 🧹 CLEANUP: Verwijder test data
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🧹 CLEANUP: Test Data Verwijderen';
    RAISE NOTICE '==================================';
END $$;

-- Verwijder test claim (cascade verwijdert ook audit logs)
DELETE FROM public.claims 
WHERE email = 'audit-test@gratisschadeverhalen.nl';

-- Verwijder andere test logs
DELETE FROM public.audit_logs 
WHERE details->>'test' IN ('audit_test_2', 'gdpr_ip_test', 'gdpr_cleanup_test')
   OR performed_by IN ('SYSTEM:test', 'GDPR_TEST');

SELECT '✅ Test data verwijderd' as status;

-- =============================================
-- 📊 FINAL REPORT: Huidige Database Stats
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '📊 DATABASE STATISTIEKEN';
    RAISE NOTICE '========================';
END $$;

-- Totaal aantal logs
SELECT 
    '📈 Totaal audit logs' as metric,
    COUNT(*) as waarde
FROM public.audit_logs;

-- Logs per action type (top 5)
SELECT 
    '📋 Top 5 Action Types' as report,
    action_type,
    COUNT(*) as aantal
FROM public.audit_logs
GROUP BY action_type
ORDER BY aantal DESC
LIMIT 5;

-- Aantal escalaties (actief)
SELECT 
    '🚨 Actieve Escalaties' as metric,
    COUNT(*) as waarde
FROM public.claims
WHERE status = 'escalated' AND escalatie_opgelost = FALSE;

-- Logs laatste 24 uur
SELECT 
    '⏰ Logs (laatste 24u)' as metric,
    COUNT(*) as waarde
FROM public.audit_logs
WHERE created_at > NOW() - INTERVAL '24 hours';

-- IP addresses nog aanwezig (privacy check)
SELECT 
    '🔒 IP Addresses (GDPR check)' as metric,
    COUNT(*) as aantal_met_ip,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as binnen_30_dagen
FROM public.audit_logs
WHERE ip_address IS NOT NULL;

-- =============================================
-- ✅ TEST VOLTOOID
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '✅ ALLE TESTS VOLTOOID!';
    RAISE NOTICE '========================';
    RAISE NOTICE '';
    RAISE NOTICE 'Als alle tests ✅ tonen, is het audit systeem correct geconfigureerd.';
    RAISE NOTICE '';
    RAISE NOTICE 'Volgende stappen:';
    RAISE NOTICE '1. Test frontend: http://localhost:3000/dashboard';
    RAISE NOTICE '2. Dien test claim in via /claim-indienen';
    RAISE NOTICE '3. Check audit logs in claim detail pagina';
    RAISE NOTICE '4. Verifieer escalatie emails in inbox';
    RAISE NOTICE '';
END $$;
