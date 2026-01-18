-- =====================================================
-- USER PROFILES SETUP
-- Automatisch user profile aanmaken bij signup (email + OAuth)
-- =====================================================

-- 1. Create user_profiles table (als deze nog niet bestaat)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if they exist (om opnieuw te kunnen runnen)
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- 4. Create RLS Policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 5. Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert new profile with data from auth.users
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    -- Voor Google OAuth: gebruik naam uit metadata, anders gebruik email
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)  -- Fallback: eerste deel van email
    ),
    -- Avatar URL voor Google OAuth gebruikers
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 7. Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- 8. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON user_profiles TO authenticated;
GRANT SELECT ON user_profiles TO anon;

-- =====================================================
-- VERIFICATIE QUERIES
-- Run deze na het uitvoeren van bovenstaande script
-- =====================================================

-- Check of table bestaat
-- SELECT * FROM user_profiles LIMIT 5;

-- Check of trigger bestaat
-- SELECT tgname, tgrelid::regclass, tgenabled 
-- FROM pg_trigger 
-- WHERE tgname = 'on_auth_user_created';

-- Check of function bestaat
-- SELECT proname, prosrc 
-- FROM pg_proc 
-- WHERE proname = 'handle_new_user';

-- Test: Maak een test user aan en check of profiel automatisch wordt aangemaakt
-- (Test dit via de UI door in te loggen met Google of een nieuw account aan te maken)
