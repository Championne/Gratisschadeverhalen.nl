# ✅ Google OAuth Setup - Quick Start

De Google OAuth functionaliteit is **volledig geïmplementeerd** in de code. Je hoeft alleen nog de configuratie in Google Cloud en Supabase te doen.

## 📋 Wat is al klaar?

✅ **Login pagina** (`/login`) - Met Google OAuth knop  
✅ **Signup pagina** (`/registreren`) - Met Google OAuth knop  
✅ **OAuth callback route** (`/auth/callback`) - Handelt Google redirects af  
✅ **User profiles** - Automatisch aangemaakt voor alle gebruikers  
✅ **Profiel pagina** (`/dashboard/profiel`) - Beheer naam en bekijk account info  
✅ **Dashboard integratie** - Profiel link in user menu  

## 🚀 Setup in 3 stappen

### Stap 1: Google Cloud Console (5 min)

1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project: `Gratisschadeverhalen`
3. Ga naar **APIs & Services** → **OAuth consent screen**
   - Kies **External**
   - Vul app naam, email, domains in
4. Ga naar **Credentials** → **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
   - Type: **Web application**
   - Authorized redirect URIs:
     ```
     https://[YOUR-SUPABASE-PROJECT].supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
5. **Kopieer** Client ID en Client Secret

### Stap 2: Supabase Dashboard (2 min)

1. Ga naar [Supabase Dashboard](https://app.supabase.com/)
2. Selecteer je project
3. Ga naar **Authentication** → **Providers**
4. Schakel **Google** in
5. Plak je **Client ID** en **Client Secret**
6. Klik **Save**

### Stap 3: Database Trigger (1 min)

1. Ga naar **SQL Editor** in Supabase
2. Open het bestand `database/setup-user-profiles.sql`
3. Kopieer en plak de hele inhoud in de SQL Editor
4. Klik **Run**

**Klaar!** Google OAuth werkt nu! 🎉

## 🧪 Test het

### Lokaal testen
```bash
npm run dev
```

1. Ga naar `http://localhost:3000/login`
2. Klik "Inloggen met Google"
3. Login met je Google account
4. Je wordt doorgestuurd naar `/dashboard`

### Check database
1. Ga naar **Authentication** → **Users** in Supabase
2. Je nieuwe gebruiker staat er met provider: `google`
3. Ga naar **Table Editor** → **user_profiles**
4. Je profiel is automatisch aangemaakt met naam en avatar

## 📚 Meer informatie

Voor **gedetailleerde instructies** en troubleshooting:  
👉 Zie `GOOGLE-OAUTH-SETUP.md`

Voor **database schema details**:  
👉 Zie `database/setup-user-profiles.sql`

## 🎨 Nieuwe pagina's

Na setup kun je deze pagina's gebruiken:

- `/login` - Inloggen (met Google of email)
- `/registreren` - Account aanmaken (met Google of email)
- `/dashboard` - Je claims overzicht
- `/dashboard/profiel` - Profiel bewerken ⭐ **NIEUW**
- `/claim-indienen` - Nieuwe claim indienen

## 🔐 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Gebruikers kunnen alleen eigen profiel zien/bewerken
- ✅ Automatische profile sync via database trigger
- ✅ OAuth tokens worden veilig opgeslagen in Supabase
- ✅ HTTPS verplicht voor production

## ⚠️ Belangrijke notes

1. **Email verificatie**: Google OAuth gebruikers hebben automatisch geverifieerde emails
2. **User metadata**: Google stuurt naam en avatar automatisch mee
3. **Fallback**: Als geen naam beschikbaar, wordt email gebruikt
4. **Avatar**: Google profielfoto wordt automatisch gebruikt (indien beschikbaar)

## 🐛 Veel voorkomende problemen

### "redirect_uri_mismatch"
➡️ Controleer dat de redirect URI in Google Cloud **exact** hetzelfde is als in Supabase

### "invalid_client"
➡️ Client ID of Secret is verkeerd - kopieer opnieuw zonder extra spaties

### Profiel wordt niet aangemaakt
➡️ Run het SQL script uit stap 3 opnieuw

### Lokaal werkt niet
➡️ Voeg `http://localhost:54321/auth/v1/callback` toe aan Google Cloud redirect URIs

## 🎯 Next steps

Na succesvolle setup:

1. ✅ Test Google login op lokaal en productie
2. ✅ Verifieer dat profielen worden aangemaakt
3. ✅ Test de profiel pagina
4. 📧 Configureer email templates in Supabase (optioneel)
5. 🎨 Pas de branding aan (logo's, kleuren)

---

**Vragen?** Check de uitgebreide guide in `GOOGLE-OAUTH-SETUP.md`
