-- Database Schema voor Gratisschadeverhalen.nl
-- Voer dit uit in je Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Claims table (schade claims)
CREATE TABLE IF NOT EXISTS public.claims (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Contact informatie
    naam VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefoon VARCHAR(50),
    
    -- Ongeval gegevens
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
    address TEXT,
    email_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Status updates log (voor tracking van status wijzigingen)
CREATE TABLE IF NOT EXISTS public.claim_status_updates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE NOT NULL,
    oude_status VARCHAR(50),
    nieuwe_status VARCHAR(50) NOT NULL,
    notitie TEXT,
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_status_updates_claim_id ON public.claim_status_updates(claim_id);
CREATE INDEX IF NOT EXISTS idx_status_updates_created_at ON public.claim_status_updates(created_at DESC);

-- Function om updated_at automatisch bij te werken
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers voor auto-update van timestamps
DROP TRIGGER IF EXISTS update_claims_updated_at ON public.claims;
CREATE TRIGGER update_claims_updated_at
    BEFORE UPDATE ON public.claims
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function om automatisch status updates te loggen
CREATE OR REPLACE FUNCTION log_claim_status_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO public.claim_status_updates (claim_id, oude_status, nieuwe_status, updated_by)
        VALUES (NEW.id, OLD.status, NEW.status, NEW.user_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS log_status_change ON public.claims;
CREATE TRIGGER log_status_change
    AFTER UPDATE ON public.claims
    FOR EACH ROW
    EXECUTE FUNCTION log_claim_status_update();

-- ===================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================

-- Enable RLS op alle tables
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_status_updates ENABLE ROW LEVEL SECURITY;

-- Claims policies
-- Users kunnen hun eigen claims zien
CREATE POLICY "Users can view own claims"
    ON public.claims FOR SELECT
    USING (auth.uid() = user_id OR email = auth.jwt()->>'email');

-- Users kunnen nieuwe claims aanmaken
CREATE POLICY "Users can insert own claims"
    ON public.claims FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users kunnen hun eigen claims updaten (alleen als status niet 'afgerond')
CREATE POLICY "Users can update own claims"
    ON public.claims FOR UPDATE
    USING (auth.uid() = user_id AND status NOT IN ('afgerond', 'geweigerd'));

-- Anonymous claims (voor niet-ingelogde gebruikers)
CREATE POLICY "Allow anonymous claim creation"
    ON public.claims FOR INSERT
    WITH CHECK (user_id IS NULL);

-- User profiles policies
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Claim status updates policies
CREATE POLICY "Users can view status updates for own claims"
    ON public.claim_status_updates FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.claims
            WHERE claims.id = claim_status_updates.claim_id
            AND claims.user_id = auth.uid()
        )
    );

-- Storage bucket voor schade foto's (run dit apart in Supabase dashboard > Storage)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('claim-documents', 'claim-documents', false);

-- Storage policies voor claim documents
-- CREATE POLICY "Users can upload their own claim documents"
--     ON storage.objects FOR INSERT
--     WITH CHECK (bucket_id = 'claim-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view their own claim documents"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'claim-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Seed data (optioneel, alleen voor development)
-- INSERT INTO public.claims (naam, email, telefoon, datum_ongeval, beschrijving, kenteken_tegenpartij, status)
-- VALUES 
--     ('Jan de Vries', 'jan@example.com', '0612345678', '2024-01-15', 'Aanrijding op kruising', 'AB-123-CD', 'nieuw'),
--     ('Marie Jansen', 'marie@example.com', '0687654321', '2024-01-20', 'Bumper schade parkeerplaats', 'XY-987-ZW', 'in_behandeling');

-- Comments voor documentatie
COMMENT ON TABLE public.claims IS 'Hoofdtabel voor alle schade claims';
COMMENT ON TABLE public.user_profiles IS 'Extra gebruikers informatie aanvullend op auth.users';
COMMENT ON TABLE public.claim_status_updates IS 'Log van alle status wijzigingen per claim';
COMMENT ON COLUMN public.claims.status IS 'Status: nieuw, in_behandeling, aansprakelijkheidsbrief_verzonden, in_onderhandeling, afgerond, geweigerd, geannuleerd';
COMMENT ON COLUMN public.claims.mogelijk_letselschade IS 'Flag als AI letselschade keywords detecteert';
