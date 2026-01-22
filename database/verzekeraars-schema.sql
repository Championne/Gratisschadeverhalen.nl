-- =============================================
-- VERZEKERAARS DATABASE
-- =============================================
-- Doel: Automatische lookup van verzekeraar contact gegevens
-- Voor: Automatisch versturen aansprakelijkheidsbrieven
-- =============================================

-- Verzekeraars Tabel
CREATE TABLE IF NOT EXISTS public.verzekeraars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Verzekeraar informatie
    naam VARCHAR(255) NOT NULL UNIQUE,
    naam_normalized VARCHAR(255) NOT NULL, -- Lowercase, geen spaties voor matching
    
    -- Contact gegevens
    email_schade VARCHAR(255), -- Email voor schademeldingen
    telefoon VARCHAR(50),
    website VARCHAR(255),
    
    -- Adres (voor formele brieven)
    adres_straat VARCHAR(255),
    adres_postcode VARCHAR(10),
    adres_plaats VARCHAR(100),
    
    -- Metadata
    actief BOOLEAN DEFAULT TRUE,
    notities TEXT, -- Bijv. "Altijd binnen 2 werkdagen reactie"
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes voor snelle lookup
CREATE INDEX IF NOT EXISTS idx_verzekeraars_naam ON public.verzekeraars(naam);
CREATE INDEX IF NOT EXISTS idx_verzekeraars_naam_normalized ON public.verzekeraars(naam_normalized);
CREATE INDEX IF NOT EXISTS idx_verzekeraars_actief ON public.verzekeraars(actief);

-- =============================================
-- RPC FUNCTION: Zoek Verzekeraar Email
-- =============================================

CREATE OR REPLACE FUNCTION public.get_verzekeraar_email(
    p_verzekeraar_naam VARCHAR(255)
)
RETURNS TABLE (
    email VARCHAR(255),
    naam VARCHAR(255),
    telefoon VARCHAR(50),
    website VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.email_schade,
        v.naam,
        v.telefoon,
        v.website
    FROM public.verzekeraars v
    WHERE 
        v.actief = TRUE
        AND (
            LOWER(v.naam) = LOWER(p_verzekeraar_naam)
            OR v.naam_normalized = LOWER(REGEXP_REPLACE(p_verzekeraar_naam, '\s+', '', 'g'))
            OR LOWER(v.naam) LIKE LOWER('%' || p_verzekeraar_naam || '%')
        )
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- RPC FUNCTION: Fuzzy Match Verzekeraar
-- =============================================

CREATE OR REPLACE FUNCTION public.fuzzy_match_verzekeraar(
    p_verzekeraar_naam VARCHAR(255)
)
RETURNS TABLE (
    id UUID,
    naam VARCHAR(255),
    email_schade VARCHAR(255),
    similarity_score FLOAT
) AS $$
BEGIN
    -- Fuzzy matching met similarity score
    RETURN QUERY
    SELECT 
        v.id,
        v.naam,
        v.email_schade,
        SIMILARITY(LOWER(v.naam), LOWER(p_verzekeraar_naam)) as similarity_score
    FROM public.verzekeraars v
    WHERE 
        v.actief = TRUE
        AND SIMILARITY(LOWER(v.naam), LOWER(p_verzekeraar_naam)) > 0.3
    ORDER BY similarity_score DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable pg_trgm extension for similarity matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- =============================================
-- SEED DATA: Nederlandse Verzekeraars
-- =============================================

INSERT INTO public.verzekeraars (naam, naam_normalized, email_schade, telefoon, website, adres_straat, adres_postcode, adres_plaats) VALUES
-- Top 10 Grootste Verzekeraars Nederland
('ANWB Verzekeringen', 'anwbverzekeringen', 'schade@anwb.nl', '088-269-2222', 'https://www.anwb.nl/verzekeringen', 'Wassenaarseweg 220', '2596 EC', 'Den Haag'),
('Nationale Nederlanden', 'nationalenederlanden', 'schade@nn.nl', '088-663-3663', 'https://www.nn.nl', 'Prinses Beatrixlaan 35', '2595 AK', 'Den Haag'),
('Interpolis', 'interpolis', 'schade@interpolis.nl', '0344-835-835', 'https://www.interpolis.nl', 'Spoorlaan 298', '5017 JZ', 'Tilburg'),
('Centraal Beheer', 'centraalbeheer', 'schade@centraalbeheer.nl', '055-579-8055', 'https://www.centraalbeheer.nl', 'Prins Willem-Alexanderlaan 651', '7311 KL', 'Apeldoorn'),
('ASR Verzekeringen', 'asrverzekeringen', 'schade@asr.nl', '030-257-9111', 'https://www.asr.nl', 'Archimedeslaan 10', '3584 BA', 'Utrecht'),
('Aegon', 'aegon', 'schade@aegon.nl', '070-344-8888', 'https://www.aegon.nl', 'Aegonplein 50', '2591 TV', 'Den Haag'),
('Allianz', 'allianz', 'schade@allianz.nl', '020-541-5555', 'https://www.allianz.nl', 'Poeldijkstraat 4', '1059 VM', 'Amsterdam'),
('Amersfoortse Verzekeringen', 'amersfoortseverzekeringen', 'schade@amersfoortse.nl', '033-464-7777', 'https://www.amersfoortse.nl', 'Stadsring 159', '3811 HP', 'Amersfoort'),
('Univé', 'unive', 'schade@unive.nl', '0900-8648', 'https://www.unive.nl', 'Barneveldseweg 16', '3771 RP', 'Barneveld'),
('Delta Lloyd', 'deltelloyd', 'schade@deltalloyd.nl', '020-594-9111', 'https://www.deltalloyd.nl', 'Claude Debussylaan 24', '1082 MD', 'Amsterdam'),

-- Andere Bekende Verzekeraars
('Reaal', 'reaal', 'schade@reaal.nl', '0900-7325', 'https://www.reaal.nl', 'Van Heenvlietlaan 228', '1083 CN', 'Amsterdam'),
('Ditzo', 'ditzo', 'schade@ditzo.nl', '088-234-8965', 'https://www.ditzo.nl', 'Spoorlaan 298', '5017 JZ', 'Tilburg'),
('FBTO', 'fbto', 'schade@fbto.nl', '058-234-5678', 'https://www.fbto.nl', 'Jancko Douwamaweg 10', '8912 AX', 'Leeuwarden'),
('InShared', 'inshared', 'schade@inshared.nl', '088-000-8000', 'https://www.inshared.nl', 'Zwarte Woud 10', '3524 SJ', 'Utrecht'),
('Zilveren Kruis', 'zilverenkruis', 'schade@zilverenkruis.nl', '088-221-1111', 'https://www.zilverenkruis.nl', 'Stationsstraat 44', '3511 ER', 'Utrecht'),
('VGZ', 'vgz', 'schade@vgz.nl', '026-355-5555', 'https://www.vgz.nl', 'Winthontlaan 200', '3526 KV', 'Utrecht'),
('Menzis', 'menzis', 'schade@menzis.nl', '088-555-5555', 'https://www.menzis.nl', 'Antareslaan 10', '3903 KA', 'Veenendaal'),
('CZ', 'cz', 'schade@cz.nl', '0900-0990', 'https://www.cz.nl', 'Schepersmaat 2', '6603 AA', 'Wijchen'),
('Movir', 'movir', 'schade@movir.nl', '0900-6684', 'https://www.movir.nl', 'Bouwmeesterplein 1', '6843 NW', 'Arnhem'),
('Klaverblad', 'klaverblad', 'schade@klaverblad.nl', '0900-5528', 'https://www.klaverblad.nl', 'Rivium Boulevard 301', '2909 LK', 'Capelle aan den IJssel'),

-- Budget/Online Verzekeraars
('OHRA', 'ohra', 'schade@ohra.nl', '088-642-0000', 'https://www.ohra.nl', 'Handelsweg 2', '1181 ZA', 'Amstelveen'),
('Budget Thuis', 'budgetthuis', 'schade@budgetthuis.nl', '088-235-0000', 'https://www.budgetthuis.nl', 'Claude Debussylaan 24', '1082 MD', 'Amsterdam'),
('Woongarant', 'woongarant', 'schade@woongarant.nl', '030-711-9500', 'https://www.woongarant.nl', 'Croeselaan 1', '3521 BJ', 'Utrecht'),

-- Regionale Verzekeraars
('Stad Rotterdam', 'stadrotterdam', 'schade@stadrotterdam.nl', '010-224-0000', 'https://www.stadrotterdam.nl', 'Blaak 34', '3011 TA', 'Rotterdam'),
('Vereniging Eigen Huis', 'verenigingeigenhuis', 'schade@eigenhuis.nl', '088-443-4400', 'https://www.eigenhuis.nl', 'Catharijnesingel 33', '3511 GB', 'Utrecht'),

-- Varianten / Aliassen (vaak voorkomende schrijfwijzen)
('NN', 'nn', 'schade@nn.nl', '088-663-3663', 'https://www.nn.nl', 'Prinses Beatrixlaan 35', '2595 AK', 'Den Haag'),
('CB', 'cb', 'schade@centraalbeheer.nl', '055-579-8055', 'https://www.centraalbeheer.nl', 'Prins Willem-Alexanderlaan 651', '7311 KL', 'Apeldoorn'),
('ASR', 'asr', 'schade@asr.nl', '030-257-9111', 'https://www.asr.nl', 'Archimedeslaan 10', '3584 BA', 'Utrecht')

ON CONFLICT (naam) DO NOTHING;

-- =============================================
-- UPDATE TRIGGER: Auto-update updated_at
-- =============================================

CREATE OR REPLACE FUNCTION public.update_verzekeraars_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_verzekeraars_updated_at
    BEFORE UPDATE ON public.verzekeraars
    FOR EACH ROW
    EXECUTE FUNCTION public.update_verzekeraars_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE public.verzekeraars ENABLE ROW LEVEL SECURITY;

-- Iedereen kan lezen (via RPC functions)
CREATE POLICY "Anyone can read verzekeraars via RPC" 
    ON public.verzekeraars 
    FOR SELECT 
    USING (true);

-- Alleen admins kunnen schrijven (TODO: implementeer admin role)
CREATE POLICY "Only admins can modify verzekeraars" 
    ON public.verzekeraars 
    FOR ALL 
    USING (false)
    WITH CHECK (false);

-- =============================================
-- VERIFICATIE QUERIES
-- =============================================

-- Test lookup
-- SELECT * FROM public.get_verzekeraar_email('ANWB');
-- SELECT * FROM public.get_verzekeraar_email('Nationale Nederlanden');
-- SELECT * FROM public.get_verzekeraar_email('nn'); -- Should match NN

-- Test fuzzy matching
-- SELECT * FROM public.fuzzy_match_verzekeraar('ANWB Verzeker');
-- SELECT * FROM public.fuzzy_match_verzekeraar('Centraal Behe');

-- Overzicht alle verzekeraars
-- SELECT naam, email_schade, actief FROM public.verzekeraars ORDER BY naam;

-- =============================================
-- READY! 🚀
-- =============================================
