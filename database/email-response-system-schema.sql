-- =============================================
-- EMAIL RESPONSE SYSTEM - FULL AUTOMATION
-- =============================================
-- Maximale automatisering van inkomende verzekeraar emails
-- AI-powered analysis, claim matching, auto status updates
-- =============================================

-- =============================================
-- TABLE: Inbound Emails (Raw storage)
-- =============================================

CREATE TABLE IF NOT EXISTS public.inbound_emails (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Email metadata
    from_email VARCHAR(255) NOT NULL,
    from_name VARCHAR(255),
    to_email VARCHAR(255) NOT NULL,
    subject TEXT NOT NULL,
    
    -- Content
    body_text TEXT,
    body_html TEXT,
    
    -- Email headers (JSONB for flexibility)
    headers JSONB DEFAULT '{}'::jsonb,
    
    -- Thread tracking
    message_id VARCHAR(500),
    in_reply_to VARCHAR(500),
    email_references TEXT, -- Space-separated message IDs (renamed from 'references' - reserved keyword)
    thread_id UUID, -- Links to email_threads table
    
    -- Attachments (stored separately but referenced here)
    has_attachments BOOLEAN DEFAULT FALSE,
    attachment_count INTEGER DEFAULT 0,
    
    -- Processing status
    processed BOOLEAN DEFAULT FALSE,
    processing_started_at TIMESTAMP WITH TIME ZONE,
    processing_completed_at TIMESTAMP WITH TIME ZONE,
    processing_error TEXT,
    
    -- AI Analysis (link to analysis table)
    analysis_id UUID,
    
    -- Matched claim (if found)
    claim_id UUID REFERENCES public.claims(id) ON DELETE SET NULL,
    match_confidence FLOAT, -- 0-100
    
    -- Raw webhook data (for debugging)
    raw_webhook_data JSONB,
    
    -- Timestamps
    received_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes voor snelle queries
CREATE INDEX IF NOT EXISTS idx_inbound_emails_from ON public.inbound_emails(from_email);
CREATE INDEX IF NOT EXISTS idx_inbound_emails_claim ON public.inbound_emails(claim_id);
CREATE INDEX IF NOT EXISTS idx_inbound_emails_processed ON public.inbound_emails(processed);
CREATE INDEX IF NOT EXISTS idx_inbound_emails_thread ON public.inbound_emails(thread_id);
CREATE INDEX IF NOT EXISTS idx_inbound_emails_received ON public.inbound_emails(received_at DESC);

-- =============================================
-- TABLE: Email Attachments
-- =============================================

CREATE TABLE IF NOT EXISTS public.email_attachments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_id UUID REFERENCES public.inbound_emails(id) ON DELETE CASCADE NOT NULL,
    
    -- File info
    filename VARCHAR(500) NOT NULL,
    content_type VARCHAR(200),
    size_bytes INTEGER,
    
    -- Storage
    storage_url TEXT, -- URL naar Supabase Storage of S3
    storage_path TEXT,
    
    -- OCR/Processing
    ocr_processed BOOLEAN DEFAULT FALSE,
    ocr_text TEXT,
    ocr_confidence FLOAT,
    
    -- Content analysis
    document_type VARCHAR(100), -- 'invoice', 'estimate', 'policy', 'photo', etc.
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email_attachments_email ON public.email_attachments(email_id);

-- =============================================
-- TABLE: Email AI Analysis
-- =============================================

CREATE TABLE IF NOT EXISTS public.email_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_id UUID REFERENCES public.inbound_emails(id) ON DELETE CASCADE NOT NULL,
    
    -- AI Model info
    model VARCHAR(100) DEFAULT 'claude-sonnet-4-20250514',
    analysis_version VARCHAR(20) DEFAULT '1.0',
    
    -- Classification
    email_type VARCHAR(100), -- 'liability_acceptance', 'rejection', 'information_request', 'settlement_offer', 'other'
    confidence_score FLOAT, -- 0-100
    
    -- Sentiment
    sentiment VARCHAR(50), -- 'positive', 'negative', 'neutral'
    sentiment_score FLOAT, -- -1 to 1
    
    -- Priority
    priority VARCHAR(50), -- 'urgent', 'high', 'normal', 'low'
    urgency_score FLOAT, -- 0-100
    
    -- Claim matching
    detected_claim_references TEXT[], -- Array van gevonden referenties
    detected_claim_ids UUID[], -- Array van gematchte claim UUIDs
    match_method VARCHAR(100), -- 'exact_reference', 'kenteken', 'naam', 'fuzzy', 'context'
    
    -- Extracted entities
    mentioned_amount DECIMAL(10,2), -- Bedrag (indien genoemd)
    mentioned_dates DATE[], -- Belangrijke data
    mentioned_names TEXT[], -- Genoemde namen
    mentioned_policy_numbers TEXT[], -- Polisnummers
    mentioned_license_plates TEXT[], -- Kentekens
    
    -- Action items
    requires_response BOOLEAN DEFAULT FALSE,
    requires_admin_action BOOLEAN DEFAULT FALSE,
    suggested_actions TEXT[], -- Array van aanbevolen acties
    
    -- Summary (Nederlandse samenvatting)
    summary_nl TEXT,
    summary_en TEXT,
    key_points TEXT[], -- Belangrijkste punten
    
    -- Language detection
    detected_language VARCHAR(10), -- 'nl', 'en', etc.
    
    -- Full AI response (raw)
    raw_ai_response TEXT,
    
    -- Processing
    processing_time_ms INTEGER,
    tokens_used INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email_analysis_email ON public.email_analysis(email_id);
CREATE INDEX IF NOT EXISTS idx_email_analysis_type ON public.email_analysis(email_type);
CREATE INDEX IF NOT EXISTS idx_email_analysis_confidence ON public.email_analysis(confidence_score DESC);

-- =============================================
-- TABLE: Email Threads (Conversation tracking)
-- =============================================

CREATE TABLE IF NOT EXISTS public.email_threads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Thread info
    subject VARCHAR(500),
    participants TEXT[], -- Array van email adressen
    
    -- Related claim
    claim_id UUID REFERENCES public.claims(id) ON DELETE SET NULL,
    
    -- Thread stats
    email_count INTEGER DEFAULT 0,
    last_email_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email_threads_claim ON public.email_threads(claim_id);
CREATE INDEX IF NOT EXISTS idx_email_threads_active ON public.email_threads(is_active);

-- =============================================
-- TABLE: Auto Actions Log (Wat systeem automatisch deed)
-- =============================================

CREATE TABLE IF NOT EXISTS public.auto_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Related entities
    email_id UUID REFERENCES public.inbound_emails(id) ON DELETE CASCADE,
    claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE,
    
    -- Action info
    action_type VARCHAR(100) NOT NULL, -- 'status_update', 'notification_sent', 'auto_response', etc.
    action_description TEXT,
    
    -- Decision making
    confidence_score FLOAT,
    decision_factors JSONB, -- Waarom deze actie?
    
    -- Result
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    
    -- Undo/rollback support
    can_undo BOOLEAN DEFAULT FALSE,
    undo_data JSONB,
    undone BOOLEAN DEFAULT FALSE,
    undone_at TIMESTAMP WITH TIME ZONE,
    undone_by VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auto_actions_email ON public.auto_actions(email_id);
CREATE INDEX IF NOT EXISTS idx_auto_actions_claim ON public.auto_actions(claim_id);
CREATE INDEX IF NOT EXISTS idx_auto_actions_type ON public.auto_actions(action_type);

-- =============================================
-- UPDATE: Claims table (add email tracking)
-- =============================================

ALTER TABLE public.claims
ADD COLUMN IF NOT EXISTS last_verzekeraar_email_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verzekeraar_email_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS latest_verzekeraar_response_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS requires_manual_review BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS manual_review_reason TEXT;

-- =============================================
-- RPC FUNCTIONS
-- =============================================

-- Function: Process incoming email (called by webhook)
CREATE OR REPLACE FUNCTION public.process_inbound_email(
    p_email_id UUID
)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    -- This function triggers the full processing pipeline
    -- Actual processing happens in API route, this is just a trigger
    
    UPDATE public.inbound_emails
    SET 
        processing_started_at = NOW(),
        processed = FALSE
    WHERE id = p_email_id;
    
    result := jsonb_build_object(
        'success', TRUE,
        'email_id', p_email_id,
        'message', 'Processing started'
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Link email to claim
CREATE OR REPLACE FUNCTION public.link_email_to_claim(
    p_email_id UUID,
    p_claim_id UUID,
    p_confidence FLOAT
)
RETURNS VOID AS $$
BEGIN
    -- Update email
    UPDATE public.inbound_emails
    SET 
        claim_id = p_claim_id,
        match_confidence = p_confidence,
        processed = TRUE,
        processing_completed_at = NOW()
    WHERE id = p_email_id;
    
    -- Update claim stats
    UPDATE public.claims
    SET 
        last_verzekeraar_email_at = NOW(),
        verzekeraar_email_count = verzekeraar_email_count + 1,
        updated_at = NOW()
    WHERE id = p_claim_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get unprocessed emails
CREATE OR REPLACE FUNCTION public.get_unprocessed_emails()
RETURNS TABLE (
    id UUID,
    from_email VARCHAR(255),
    subject TEXT,
    received_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.from_email,
        e.subject,
        e.received_at
    FROM public.inbound_emails e
    WHERE e.processed = FALSE
    ORDER BY e.received_at ASC
    LIMIT 100;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get emails for claim
CREATE OR REPLACE FUNCTION public.get_claim_emails(
    p_claim_id UUID
)
RETURNS TABLE (
    id UUID,
    from_email VARCHAR(255),
    subject TEXT,
    body_text TEXT,
    received_at TIMESTAMP WITH TIME ZONE,
    email_type VARCHAR(100),
    sentiment VARCHAR(50),
    summary_nl TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.from_email,
        e.subject,
        e.body_text,
        e.received_at,
        a.email_type,
        a.sentiment,
        a.summary_nl
    FROM public.inbound_emails e
    LEFT JOIN public.email_analysis a ON a.email_id = e.id
    WHERE e.claim_id = p_claim_id
    ORDER BY e.received_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- VIEWS: Dashboard overzichten
-- =============================================

-- View: Recent emails overview
CREATE OR REPLACE VIEW public.recent_emails_overview AS
SELECT 
    e.id,
    e.from_email,
    e.from_name,
    e.subject,
    e.received_at,
    e.processed,
    e.claim_id,
    c.naam as claim_naam,
    c.status as claim_status,
    a.email_type,
    a.confidence_score,
    a.sentiment,
    a.priority,
    a.summary_nl,
    e.has_attachments
FROM public.inbound_emails e
LEFT JOIN public.claims c ON c.id = e.claim_id
LEFT JOIN public.email_analysis a ON a.email_id = e.id
ORDER BY e.received_at DESC;

-- View: Emails needing review
CREATE OR REPLACE VIEW public.emails_needing_review AS
SELECT 
    e.id as email_id,
    e.from_email,
    e.subject,
    e.received_at,
    a.email_type,
    a.confidence_score,
    a.suggested_actions,
    a.summary_nl,
    CASE 
        WHEN e.claim_id IS NULL THEN 'No claim matched'
        WHEN a.confidence_score < 80 THEN 'Low confidence match'
        WHEN a.requires_admin_action THEN 'Admin action required'
        ELSE 'Review recommended'
    END as review_reason
FROM public.inbound_emails e
LEFT JOIN public.email_analysis a ON a.email_id = e.id
WHERE 
    e.processed = TRUE
    AND (
        e.claim_id IS NULL
        OR a.confidence_score < 80
        OR a.requires_admin_action = TRUE
    )
ORDER BY e.received_at DESC;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.inbound_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_actions ENABLE ROW LEVEL SECURITY;

-- Basic policies (TODO: refine for production)
CREATE POLICY "Allow system read on inbound_emails" ON public.inbound_emails FOR SELECT USING (true);
CREATE POLICY "Allow system read on email_attachments" ON public.email_attachments FOR SELECT USING (true);
CREATE POLICY "Allow system read on email_analysis" ON public.email_analysis FOR SELECT USING (true);
CREATE POLICY "Allow system read on email_threads" ON public.email_threads FOR SELECT USING (true);
CREATE POLICY "Allow system read on auto_actions" ON public.auto_actions FOR SELECT USING (true);

-- =============================================
-- VERIFICATIE QUERIES
-- =============================================

-- Test: Check if tables exist
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name LIKE '%email%' OR table_name LIKE '%inbound%';

-- Test: Get recent emails
-- SELECT * FROM public.recent_emails_overview LIMIT 5;

-- Test: Emails needing review
-- SELECT * FROM public.emails_needing_review;

-- =============================================
-- READY! 🚀
-- =============================================
