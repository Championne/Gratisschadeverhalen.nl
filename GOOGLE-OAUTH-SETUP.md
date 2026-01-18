# Google OAuth Setup voor Supabase

## Stap 1: Google Cloud Console Setup

### 1.1 Maak een Google Cloud Project aan
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Klik op "Select a project" → "New Project"
3. Naam: `Gratisschadeverhalen`
4. Klik op "Create"

### 1.2 Configureer OAuth Consent Screen
1. Navigeer naar **APIs & Services** → **OAuth consent screen**
2. Selecteer **External** (voor publieke app)
3. Klik **Create**

**App information:**
- App name: `Gratisschadeverhalen.nl`
- User support email: `jouw@email.nl`
- App logo: Upload je logo (optioneel)

**App domain:**
- Application home page: `https://gratisschadeverhalen.nl`
- Application privacy policy: `https://gratisschadeverhalen.nl/privacy`
- Application terms of service: `https://gratisschadeverhalen.nl/voorwaarden`

**Authorized domains:**
- Voeg toe: `gratisschadeverhalen.nl`

**Developer contact information:**
- Email addresses: `jouw@email.nl`

4. Klik **Save and Continue**
5. Skip "Scopes" (standaard scopes zijn voldoende)
6. Skip "Test users" (niet nodig voor External apps)
7. Klik **Back to Dashboard**

### 1.3 Maak OAuth 2.0 Client ID aan
1. Navigeer naar **APIs & Services** → **Credentials**
2. Klik **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Gratisschadeverhalen OAuth Client`

**Authorized JavaScript origins:**
```
https://gratisschadeverhalen.nl
http://localhost:3000
```

**Authorized redirect URIs:**
```
https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
http://localhost:54321/auth/v1/callback
```

> **Let op:** Vervang `[YOUR-PROJECT-REF]` met je Supabase project reference ID (te vinden in je Supabase project settings)

5. Klik **Create**
6. **Kopieer** je `Client ID` en `Client Secret` - je hebt deze straks nodig!

---

## Stap 2: Supabase Configuration

### 2.1 Voeg Google als OAuth Provider toe
1. Ga naar je [Supabase Dashboard](https://app.supabase.com/)
2. Selecteer je project
3. Navigeer naar **Authentication** → **Providers**
4. Scroll naar **Google** en klik op de toggle om het in te schakelen

**Configuratie:**
- **Client ID (for OAuth):** `[Plak hier je Google Client ID]`
- **Client Secret (for OAuth):** `[Plak hier je Google Client Secret]`
- **Redirect URL:** (al ingevuld, gebruik deze voor Google Cloud Console)

5. Klik **Save**

### 2.2 Configureer Email Templates (Optioneel)
Als je ook email/password signup gebruikt:
1. Navigeer naar **Authentication** → **Email Templates**
2. Pas de templates aan voor je branding

---

## Stap 3: Database Trigger voor User Profiles

Google OAuth gebruikers krijgen geen profiel via de signup form. Maak een database trigger:

### 3.1 Run dit SQL script in Supabase SQL Editor

```sql
-- Create user_profiles table if not exists
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger function: Maak automatisch user_profile aan bij nieuwe user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Run handle_new_user() na elke nieuwe user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Wat doet dit?**
- Maakt automatisch een `user_profile` aan voor elke nieuwe gebruiker
- Voor Google OAuth: gebruikt de naam en profielfoto van Google
- Voor email signup: gebruikt de opgegeven naam uit de form
- RLS policies zorgen dat gebruikers alleen hun eigen profiel kunnen zien/bewerken

---

## Stap 4: Test de Integratie

### 4.1 Lokaal testen
1. Start je development server: `npm run dev`
2. Ga naar `http://localhost:3000/login`
3. Klik op "Inloggen met Google"
4. Log in met je Google account
5. Je wordt teruggeleid naar `/dashboard`

### 4.2 Productie testen
1. Deploy naar Vercel
2. Ga naar `https://gratisschadeverhalen.nl/login`
3. Test Google login
4. Verifieer dat het profiel correct is aangemaakt in Supabase

---

## Stap 5: Verifieer Database

Na een succesvolle Google login, check in Supabase:

### 5.1 Check auth.users table
1. Navigeer naar **Authentication** → **Users**
2. Je nieuwe gebruiker zou hier moeten staan met:
   - Email van Google
   - Provider: `google`
   - Avatar URL (indien beschikbaar)

### 5.2 Check user_profiles table
1. Navigeer naar **Table Editor** → **user_profiles**
2. Je zou een nieuw profiel moeten zien met:
   - ID matching de auth.users ID
   - Full name van Google account
   - Avatar URL (indien beschikbaar)

---

## Troubleshooting

### "Error: redirect_uri_mismatch"
- **Oorzaak:** De redirect URI in Google Cloud Console komt niet overeen met Supabase
- **Oplossing:** 
  1. Kopieer exact de redirect URL uit Supabase Authentication → Providers → Google
  2. Plak deze in Google Cloud Console → Credentials → OAuth 2.0 Client → Authorized redirect URIs
  3. Zorg dat er geen trailing slash is

### "Error: invalid_client"
- **Oorzaak:** Client ID of Secret is verkeerd ingevoerd
- **Oplossing:** Controleer dat je de juiste credentials hebt gekopieerd zonder extra spaties

### Google login werkt, maar geen profiel
- **Oorzaak:** Database trigger is niet aangemaakt
- **Oplossing:** Run het SQL script uit Stap 3.1 opnieuw

### "Access blocked: This app's request is invalid"
- **Oorzaak:** OAuth consent screen is niet volledig ingevuld
- **Oplossing:** Vul alle verplichte velden in bij OAuth consent screen

### Locale ontwikkeling werkt niet
- **Oorzaak:** Supabase lokaal moet ook geconfigureerd zijn
- **Oplossing:** Voeg `http://localhost:54321/auth/v1/callback` toe aan Google Cloud Console redirect URIs

---

## Environment Variables

Geen extra environment variables nodig! De Google OAuth credentials worden opgeslagen in Supabase.

**Bestaande env vars die je nodig hebt:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Belangrijke Notes

1. **Email verificatie:** Google OAuth gebruikers hebben automatisch geverifieerde emails
2. **User metadata:** Google stuurt `full_name`, `avatar_url`, en `email` automatisch mee
3. **Security:** RLS policies zijn ingeschakeld, gebruikers kunnen alleen hun eigen data zien
4. **GDPR:** Gebruikers kunnen hun account verwijderen via het dashboard (implementeer je later)

---

## Next Steps

Na setup:
1. Test Google login op zowel lokaal als productie
2. Verifieer dat user profiles correct worden aangemaakt
3. Test het dashboard met een Google account
4. Implementeer een profiel bewerk pagina (optioneel)
5. Voeg eventueel meer OAuth providers toe (GitHub, Microsoft, etc.)

---

**Klaar!** Je Google OAuth login is nu volledig geconfigureerd! 🎉
