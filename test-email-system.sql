-- =============================================
-- EMAIL SYSTEM VERIFICATIE QUERIES
-- =============================================
-- Voer deze queries uit in Supabase SQL Editor
-- om te testen of alles correct is opgezet
-- =============================================

-- TEST 1: Check of alle tabellen bestaan
-- =============================================
SELECT 
    '✅ Email Tabellen Check' as test_naam,
    COUNT(*) as aantal_tabellen
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'inbound_emails',
    'email_analysis',
    'email_attachments',
    'email_threads',
    'auto_actions'
);
-- Expected: aantal_tabellen = 5

-- TEST 2: Check of views bestaan
-- =============================================
SELECT 
    '✅ Views Check' as test_naam,
    table_name as view_naam
FROM information_schema.views
WHERE table_schema = 'public'
AND table_name IN (
    'recent_emails_overview',
    'emails_needing_review'
);
-- Expected: 2 rows

-- TEST 3: Check of RPC functions bestaan
-- =============================================
SELECT 
    '✅ RPC Functions Check' as test_naam,
    routine_name as function_naam
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
    'process_inbound_email',
    'link_email_to_claim',
    'get_unprocessed_emails',
    'get_claim_emails'
);
-- Expected: 4 rows

-- TEST 4: Check of claims tabel nieuwe kolommen heeft
-- =============================================
SELECT 
    '✅ Claims Kolommen Check' as test_naam,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'claims'
AND column_name IN (
    'last_verzekeraar_email_at',
    'verzekeraar_email_count',
    'latest_verzekeraar_response_type',
    'requires_manual_review',
    'manual_review_reason'
);
-- Expected: 5 rows

-- TEST 5: Test recent_emails_overview view (should work, maar leeg)
-- =============================================
SELECT 
    '✅ Recent Emails View' as test_naam,
    COUNT(*) as aantal_emails
FROM recent_emails_overview;
-- Expected: 0 (nog geen emails)

-- TEST 6: Test emails_needing_review view (should work, maar leeg)
-- =============================================
SELECT 
    '✅ Emails Needing Review View' as test_naam,
    COUNT(*) as aantal_emails
FROM emails_needing_review;
-- Expected: 0 (nog geen emails)

-- TEST 7: Test get_unprocessed_emails function
-- =============================================
SELECT 
    '✅ Get Unprocessed Emails Function' as test_naam,
    COUNT(*) as aantal_emails
FROM get_unprocessed_emails();
-- Expected: 0 (nog geen emails)

-- TEST 8: Test inbound_emails tabel (insert test)
-- =============================================
DO $$
DECLARE
    test_email_id UUID;
BEGIN
    -- Insert test email
    INSERT INTO public.inbound_emails (
        from_email,
        from_name,
        to_email,
        subject,
        body_text,
        processed
    ) VALUES (
        'test@example.com',
        'Test User',
        'schade@gratisschadeverhalen.nl',
        'Test Email',
        'This is a test email for verification.',
        false
    )
    RETURNING id INTO test_email_id;
    
    RAISE NOTICE '✅ Test email created with ID: %', test_email_id;
    
    -- Cleanup: Delete test email
    DELETE FROM public.inbound_emails WHERE id = test_email_id;
    
    RAISE NOTICE '✅ Test email deleted (cleanup)';
END $$;

-- TEST 9: Check indexes
-- =============================================
SELECT 
    '✅ Indexes Check' as test_naam,
    COUNT(*) as aantal_indexes
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('inbound_emails', 'email_analysis', 'email_attachments')
AND indexname LIKE 'idx_%';
-- Expected: 10+ indexes

-- =============================================
-- SAMENVATTING
-- =============================================
SELECT 
    '🎉 ALL TESTS PASSED' as status,
    'Email System is correct opgezet!' as bericht
WHERE (
    -- Check tabellen
    (SELECT COUNT(*) FROM information_schema.tables 
     WHERE table_schema = 'public' 
     AND table_name IN ('inbound_emails', 'email_analysis', 'email_attachments', 'email_threads', 'auto_actions')) = 5
    
    -- Check views
    AND (SELECT COUNT(*) FROM information_schema.views
         WHERE table_schema = 'public'
         AND table_name IN ('recent_emails_overview', 'emails_needing_review')) = 2
    
    -- Check RPC functions
    AND (SELECT COUNT(*) FROM information_schema.routines
         WHERE routine_schema = 'public'
         AND routine_name IN ('process_inbound_email', 'link_email_to_claim', 'get_unprocessed_emails', 'get_claim_emails')) = 4
);

-- Als je dit ziet: 🎉 ALL TESTS PASSED
-- Dan is de database setup compleet!

-- =============================================
-- QUICK DATA CHECK (voor later gebruik)
-- =============================================

-- Uncomment deze queries als je data wilt checken na productie gebruik:

-- SELECT COUNT(*) as total_emails FROM inbound_emails;
-- SELECT COUNT(*) as analyzed_emails FROM email_analysis;
-- SELECT COUNT(*) as auto_actions FROM auto_actions;
-- SELECT * FROM recent_emails_overview LIMIT 5;
-- SELECT * FROM emails_needing_review;
