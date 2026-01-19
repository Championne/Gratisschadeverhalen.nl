# 📋 Google OAuth Setup Checklist (2026 Nieuwe Interface)

Gebruik deze checklist om stap-voor-stap door de **nieuwe Google Cloud Console interface** te gaan.

---

## ☑️ Pre-Setup Checklist

Voordat je begint, zorg dat je hebt:
- [ ] Een Google account
- [ ] Je Supabase project URL (bijv. `https://xxxxx.supabase.co`)
- [ ] Je email adres voor contact informatie
- [ ] (Optioneel) Je domain verified in Google Search Console

---

## 📦 Stap 1: Google Cloud Project

- [ ] Ga naar [console.cloud.google.com](https://console.cloud.google.com/)
- [ ] Klik "Select a project" → "New Project"
- [ ] Naam: `Gratisschadeverhalen`
- [ ] Klik "Create"
- [ ] Wacht tot project is aangemaakt (5-10 seconden)
- [ ] Zorg dat je nieuwe project is geselecteerd (bovenaan)

---

## 🎨 Stap 2: OAuth Consent Screen (6 Tabs)

### Tab 1: Branding 🎨

Navigeer naar **APIs & Services** → **OAuth consent screen** → **Get Started** (of **Edit App**)

- [ ] **App name:** `Gratisschadeverhalen.nl`
- [ ] **Support email:** Selecteer je email uit dropdown
- [ ] **App logo:** Upload (optioneel, maar aanbevolen)
  - PNG of JPG, max 1MB, vierkant (120x120px aanbevolen)
- [ ] **Application home page:** `https://gratisschadeverhalen.nl`
- [ ] **Application privacy policy:** `https://gratisschadeverhalen.nl/privacy`
- [ ] **Application terms of service:** `https://gratisschadeverhalen.nl/voorwaarden`
- [ ] Klik **Save and Continue**

### Tab 2: Audience 👥

- [ ] Selecteer **External** (radio button)
  - Internal = alleen voor Google Workspace organization
  - External = voor alle Google gebruikers ✅
- [ ] Klik **Save and Continue**

### Tab 3: Scopes 🔐

- [ ] **SKIP DEZE TAB** - standaard scopes zijn voldoende
  - De standaard scopes zijn: `email`, `profile`, `openid`
  - Deze zijn automatisch inbegrepen, je hoeft niets toe te voegen
- [ ] Klik **Save and Continue**

### Tab 4: Authorized Domains 🌐

**Let op:** Voor development kun je deze stap overslaan en later toevoegen.

Voor productie:
- [ ] Klik **Add Domain**
- [ ] Voeg toe: `gratisschadeverhalen.nl`
- [ ] Voeg toe: `supabase.co`
- [ ] **Belangrijk:** Domain moet verified zijn in Google Search Console
- [ ] Klik **Save and Continue**

**Domain Verification (indien nodig):**
1. Ga naar [search.google.com/search-console](https://search.google.com/search-console)
2. Voeg property toe voor `gratisschadeverhalen.nl`
3. Verifieer via DNS, HTML file, of tag
4. Kom terug naar OAuth consent screen

### Tab 5: Contact Information 📧

- [ ] **User support email:** Je email (voor eindgebruikers)
- [ ] **Developer contact email:** Je email (voor Google notificaties)
- [ ] Klik **Save and Continue**

### Tab 6: Test Users 🧪

**Belangrijk voor development!** Je app is in "Testing" modus tot je publiceert.

- [ ] Klik **Add Users**
- [ ] Voeg je eigen Google email toe (degene waarmee je wilt testen)
- [ ] Voeg eventueel andere test accounts toe
- [ ] Klik **Save**
- [ ] Klik **Save and Continue**

### Review & Finish ✅

- [ ] Check alle tabs op correctheid
- [ ] Klik **Back to Dashboard**
- [ ] Status zou moeten zijn: **Testing** (dit is goed voor development)

---

## 🔑 Stap 3: OAuth Client ID Maken

### Credentials Setup

- [ ] Blijf in **APIs & Services**
- [ ] Ga naar **Credentials** (linkermenu)
- [ ] Klik **+ CREATE CREDENTIALS** (bovenaan)
- [ ] Selecteer **OAuth client ID**

### OAuth Client Configuration

- [ ] **Application type:** Web application
- [ ] **Name:** `Gratisschadeverhalen OAuth Client`

### Authorized JavaScript Origins

- [ ] Klik **+ Add URI** onder JavaScript origins
- [ ] Voeg toe: `https://gratisschadeverhalen.nl`
- [ ] Klik **+ Add URI**
- [ ] Voeg toe: `http://localhost:3000` (voor local dev)

### Authorized Redirect URIs

**Belangrijk:** Deze moeten EXACT overeenkomen met Supabase!

- [ ] Klik **+ Add URI** onder Authorized redirect URIs
- [ ] Voeg toe: `https://[JOUW-PROJECT].supabase.co/auth/v1/callback`
  - Vervang `[JOUW-PROJECT]` met je Supabase project ref
  - Bijv: `https://abcdefghijk.supabase.co/auth/v1/callback`
- [ ] Klik **+ Add URI**
- [ ] Voeg toe: `http://localhost:54321/auth/v1/callback` (voor local Supabase)

### Credentials Opslaan

- [ ] Klik **Create**
- [ ] **BELANGRIJK:** Popup verschijnt met Client ID en Secret
- [ ] **Kopieer Client ID** en bewaar veilig
- [ ] **Kopieer Client Secret** en bewaar veilig
- [ ] Klik **OK**

---

## 🔧 Stap 4: Supabase Configuratie

### Supabase Dashboard

- [ ] Ga naar [app.supabase.com](https://app.supabase.com/)
- [ ] Selecteer je project
- [ ] Ga naar **Authentication** (linkermenu)
- [ ] Ga naar **Providers** tab

### Google Provider Activeren

- [ ] Scroll naar **Google** in de lijst
- [ ] Klik op de toggle om **Enabled** te zetten
- [ ] Vul in:
  - **Client ID (for OAuth):** Plak je Google Client ID
  - **Client Secret (for OAuth):** Plak je Google Client Secret
- [ ] **Skip Domain:** laat leeg (alleen nodig voor custom domains)
- [ ] Klik **Save**

### Callback URL Verificatie

- [ ] Kopieer de **Callback URL** die Supabase toont
  - Bijv: `https://xxxxx.supabase.co/auth/v1/callback`
- [ ] Verifieer dat deze **exact hetzelfde** is als wat je in Google Cloud hebt ingevuld
- [ ] Als verschillend: ga terug naar Google Cloud en pas aan

---

## 💾 Stap 5: Database Setup

### SQL Script Runnen

- [ ] Blijf in Supabase Dashboard
- [ ] Ga naar **SQL Editor** (linkermenu)
- [ ] Klik **+ New query**
- [ ] Open lokaal het bestand: `database/setup-user-profiles.sql`
- [ ] Kopieer de **hele inhoud**
- [ ] Plak in Supabase SQL Editor
- [ ] Klik **Run** (of Ctrl+Enter)
- [ ] Check dat je **Success** ziet (geen errors)

### Verificatie

- [ ] Ga naar **Table Editor** → **user_profiles**
- [ ] Table zou leeg moeten zijn maar wel bestaan
- [ ] Check **Authentication** → **Policies**
- [ ] Je zou RLS policies moeten zien voor `user_profiles`

---

## 🧪 Stap 6: Testen

### Local Development Test

- [ ] Start je app: `npm run dev`
- [ ] Open browser: `http://localhost:3000/login`
- [ ] Klik **Inloggen met Google**
- [ ] Login met je test user account (die je in stap 2.6 hebt toegevoegd)
- [ ] Je zou worden teruggeleid naar `/dashboard`

### Database Verificatie

- [ ] Ga naar Supabase **Authentication** → **Users**
- [ ] Je nieuwe user zou er moeten staan
  - Provider: `google`
  - Email: je Google email
- [ ] Ga naar **Table Editor** → **user_profiles**
- [ ] Je profiel zou automatisch aangemaakt moeten zijn
  - ID: matched met auth.users
  - Full name: van je Google account
  - Avatar URL: je Google profielfoto

---

## ✅ Success Criteria

Alles werkt als:
- [ ] Je kunt inloggen met Google
- [ ] Je wordt doorgestuurd naar dashboard
- [ ] Je profiel staat in `user_profiles` table
- [ ] Je ziet je naam en avatar in de UI
- [ ] Geen errors in browser console
- [ ] Geen errors in Supabase logs

---

## 🚀 Productie Deployment (Later)

Wanneer je live gaat:
- [ ] Verifieer je domain in Google Search Console
- [ ] Voeg verified domain toe aan Google OAuth Consent Screen
- [ ] Klik **Publish App** in OAuth Consent Screen
  - Dit zet je app van "Testing" naar "In production"
- [ ] Update redirect URIs met je productie URL
- [ ] Test opnieuw op productie

---

## 🆘 Hulp Nodig?

### Quick Troubleshooting

**Google login knop doet niets:**
→ Check browser console voor errors
→ Verifieer Client ID in Supabase is correct

**"redirect_uri_mismatch" error:**
→ Redirect URI in Google Cloud ≠ Supabase callback URL
→ Controleer op typos, trailing slashes

**"This app is blocked":**
→ Je bent niet toegevoegd als Test User
→ Ga terug naar stap 2.6

**Profiel wordt niet aangemaakt:**
→ Database trigger mist
→ Run `database/setup-user-profiles.sql` opnieuw

### Uitgebreide Documentatie

- 📖 **Gedetailleerde instructies:** `GOOGLE-OAUTH-SETUP.md`
- ⚡ **Quick start:** `GOOGLE-OAUTH-QUICKSTART.md`
- 💻 **Database schema:** `database/setup-user-profiles.sql`

---

**Veel succes met de setup!** 🎉
