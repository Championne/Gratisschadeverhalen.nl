-- =============================================
-- GRATIS SCHADEVERHALEN - DATABASE SCHEMA
-- =============================================
-- PostgreSQL Database Schema voor Supabase
-- Versie: 2.0 (Cleanup - Correctie Flow Verwijderd)
-- =============================================

-- Claims table (hoofdtabel)
CREATE TABLE IF NOT EXISTS public.claims (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Claimer gegevens
    naam VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefoon VARCHAR(50),
    
    -- Ongeval details
    datum_ongeval DATE NOT NULL,
    plaats_ongeval VARCHAR(255),
    beschrijving TEXT NOT NULL,
    
    -- Tegenpartij
    kenteken_tegenpartij VARCHAR(20) NOT NULL,
    naam_tegenpartij VARCHAR(255),
    verzekeraar_tegenpartij VARCHAR(255),
    polisnummer_tegenpartij VARCHAR(100),
    
    -- OCR geëxtraheerde data
    ocr_data JSONB DEFAULT '{}'::jsonb,
    ocr_confidence DECIMAL(5,2),
    
    -- Schade details
    geschatte_schade DECIMAL(10,2),
    reparatie_offerte DECIMAL(10,2),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'nieuw' CHECK (status IN ('nieuw', 'in_behandeling', 'aansprakelijkheidsbrief_verzonden', 'in_onderhandeling', 'afgerond', 'geweigerd', 'geannuleerd')),
    
    -- Admin notities
    admin_notities TEXT,
    interne_status VARCHAR(255),
    toegewezen_aan VARCHAR(255),
    
    -- File paths (opgeslagen in Supabase Storage)
    fotos_schade TEXT[] DEFAULT ARRAY[]::TEXT[],
    schadeformulier_url TEXT,
    andere_documenten TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- AI screening flags
    mogelijk_letselschade BOOLEAN DEFAULT FALSE,
    letselschade_keywords TEXT[],
    
    -- AI Agent notes
    ai_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    afgerond_op TIMESTAMP WITH TIME ZONE
);

-- Index voor snellere queries
CREATE INDEX IF NOT EXISTS idx_claims_user_id ON public.claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON public.claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON public.claims(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_claims_email ON public.claims(email);

-- User profiles table (extra user info naast auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Claims Policies
-- 1. Anyone can INSERT claims (voor guest submissions)
CREATE POLICY "Anyone can insert claims" 
    ON public.claims 
    FOR INSERT 
    WITH CHECK (true);

-- 2. Users can only SELECT their own claims
CREATE POLICY "Users can view own claims" 
    ON public.claims 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- 3. Users can UPDATE their own claims
CREATE POLICY "Users can update own claims" 
    ON public.claims 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- User Profiles Policies
CREATE POLICY "Users can view own profile" 
    ON public.user_profiles 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.user_profiles 
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON public.user_profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for claims updated_at
DROP TRIGGER IF EXISTS handle_claims_updated_at ON public.claims;
CREATE TRIGGER handle_claims_updated_at
    BEFORE UPDATE ON public.claims
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for user_profiles updated_at
DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- RPC FUNCTION voor AI Notes Update
-- =============================================
-- Dit bypast Supabase schema cache issues

CREATE OR REPLACE FUNCTION public.update_claim_with_ai_notes(
    claim_id UUID,
    notes TEXT,
    new_status VARCHAR(50),
    letsel_flag BOOLEAN,
    letsel_keywords TEXT[]
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.claims
    SET 
        ai_notes = notes,
        status = new_status,
        mogelijk_letselschade = letsel_flag,
        letselschade_keywords = letsel_keywords,
        updated_at = NOW()
    WHERE id = claim_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- VERIFICATIE QUERIES
-- =============================================

-- Check of alles goed is aangemaakt:
-- SELECT * FROM public.claims LIMIT 1;
-- SELECT * FROM public.user_profiles LIMIT 1;

-- Check RLS policies:
-- SELECT * FROM pg_policies WHERE tablename IN ('claims', 'user_profiles');

-- =============================================
-- READY!
-- =============================================
