-- Migration: Voeg AI notes veld toe aan claims table
-- Voer dit uit in Supabase SQL Editor

-- Voeg ai_notes kolom toe (als deze nog niet bestaat)
ALTER TABLE public.claims 
ADD COLUMN IF NOT EXISTS ai_notes TEXT;

-- Voeg index toe voor snellere queries
CREATE INDEX IF NOT EXISTS idx_claims_ai_notes ON public.claims(id) WHERE ai_notes IS NOT NULL;

-- Comment voor documentatie
COMMENT ON COLUMN public.claims.ai_notes IS 'Automatische notities gegenereerd door AI agent tijdens claim verwerking';
