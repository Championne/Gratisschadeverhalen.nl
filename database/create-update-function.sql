-- Create function to update claim with AI notes
-- This function bypasses Supabase schema cache issues

CREATE OR REPLACE FUNCTION update_claim_with_ai_notes(
  claim_id uuid,
  letsel_flag boolean,
  letsel_keywords text[],
  new_status text,
  notes text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE claims
  SET 
    mogelijk_letselschade = letsel_flag,
    letselschade_keywords = letsel_keywords,
    status = new_status,
    ai_notes = notes,
    updated_at = now()
  WHERE id = claim_id;
END;
$$;

-- Grant execute permission to authenticated users and anon
GRANT EXECUTE ON FUNCTION update_claim_with_ai_notes(uuid, boolean, text[], text, text) TO authenticated, anon;
