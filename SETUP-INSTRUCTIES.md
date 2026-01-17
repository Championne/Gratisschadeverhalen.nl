# 🚀 Setup Instructies voor Beginners

## Welkom! Dit is je stap-voor-stap gids om de applicatie te starten.

### 📋 Wat heb je nodig?

1. **Node.js** - Een programma om JavaScript code te draaien
2. **Supabase Account** - Gratis database en authenticatie
3. **Een code editor** - Cursor (die je nu gebruikt!)

---

## Stap 1: Installeer Node.js

1. Ga naar: https://nodejs.org/
2. Download de **LTS versie** (dit is de stabiele versie)
3. Installeer Node.js (volg de installatie wizard)
4. Open een nieuwe terminal en type: `node --version`
   - Als je een versienummer ziet (bijv. v20.11.0), is het gelukt!

---

## Stap 2: Installeer Project Dependencies

1. Open een terminal in deze map
2. Type het volgende commando en druk op Enter:

```bash
npm install
```

Dit installeert alle benodigde packages. Dit kan 2-5 minuten duren.

⏳ **Wacht tot je "added XXX packages" ziet**

---

## Stap 3: Maak een Supabase Account

### 3.1 Account Aanmaken
1. Ga naar: https://supabase.com
2. Klik op "Start your project"
3. Sign up met Google of Email
4. Bevestig je email adres

### 3.2 Maak een Nieuw Project
1. Klik op "New Project"
2. Vul in:
   - **Name:** gratisschadeverhalen (of een naam naar keuze)
   - **Database Password:** Kies een sterk wachtwoord (schrijf het op!)
   - **Region:** West EU (Netherlands)
3. Klik "Create new project"
4. Wacht 2-3 minuten terwijl je database wordt opgezet ☕

### 3.3 Kopieer je Project Keys
1. Ga naar **Settings** (tandwiel icoon links)
2. Klik op **API** in het menu
3. Zoek naar **Project URL** en kopieer deze
4. Zoek naar **anon public** key en kopieer deze

---

## Stap 4: Configureer Environment Variables

1. In deze map, hernoem `env.example.txt` naar `.env.local`
2. Open `.env.local` in je editor
3. Plak je Supabase gegevens:

```
NEXT_PUBLIC_SUPABASE_URL=https://jouwproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key-hier
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Vervang:
- `jouwproject.supabase.co` met je **Project URL**
- `jouw-anon-key-hier` met je **anon public** key

---

## Stap 5: Setup Database

1. Ga terug naar je Supabase dashboard
2. Klik op **SQL Editor** in het linker menu
3. Klik op "New query"
4. Open het bestand: `database/schema.sql` in deze map
5. **Kopieer ALLE code** uit `schema.sql`
6. **Plak** het in de Supabase SQL Editor
7. Klik op **Run** (of druk Ctrl/Cmd + Enter)

✅ Als je "Success. No rows returned" ziet, is het gelukt!

### 5.1 Setup Storage Bucket (voor foto uploads)
1. Klik op **Storage** in het linker menu
2. Klik "Create a new bucket"
3. Vul in:
   - **Name:** claim-documents
   - **Public bucket:** NEE (laat uit)
4. Klik "Create bucket"

---

## Stap 6: Google OAuth Setup (Optioneel)

Als je Google inloggen wilt:

1. Ga naar Supabase Dashboard > **Authentication** > **Providers**
2. Scroll naar **Google**
3. Toggle aan
4. Ga naar: https://console.cloud.google.com/
5. Maak een nieuw project
6. Schakel Google+ API in
7. Maak OAuth credentials aan
8. Kopieer Client ID en Client Secret naar Supabase

*Dit is optioneel - email/password login werkt ook!*

---

## Stap 7: Start de Development Server

1. Open een terminal in deze map
2. Type:

```bash
npm run dev
```

3. Wacht tot je ziet: "Ready in XXms"
4. Open je browser op: **http://localhost:3000**

🎉 **Je applicatie draait nu!**

---

## 🧪 Test je Applicatie

1. Open http://localhost:3000
2. Klik op "Claim Indienen"
3. Vul het formulier in (testdata mag)
4. Maak een account aan via "Registreren"
5. Log in en bekijk je dashboard

---

## 🐛 Problemen?

### "npm: command not found"
→ Installeer Node.js opnieuw (Stap 1)

### "Supabase client is missing"
→ Controleer je `.env.local` bestand (Stap 4)

### "Database error"
→ Controleer of je `schema.sql` hebt uitgevoerd (Stap 5)

### Port 3000 already in use
→ Type: `npm run dev -- -p 3001` (gebruik poort 3001)

---

## 📚 Wat nu?

### Voor Development:
- Wijzig kleuren in `tailwind.config.ts`
- Pas teksten aan in `app/page.tsx`
- Voeg features toe in `components/`

### Voor Productie (Later):
1. Maak een Vercel account: https://vercel.com
2. Importeer je GitHub repository
3. Voeg environment variables toe
4. Deploy met 1 klik!

---

## 📞 Hulp Nodig?

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## ✅ Checklist

- [ ] Node.js geïnstalleerd
- [ ] npm install uitgevoerd
- [ ] Supabase account aangemaakt
- [ ] Database schema uitgevoerd
- [ ] .env.local geconfigureerd
- [ ] Storage bucket aangemaakt
- [ ] npm run dev werkt
- [ ] Website draait op localhost:3000

**Succes! 🚀**
npm run dev
