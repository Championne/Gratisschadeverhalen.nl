# 🚀 Vercel Deployment Guide

Complete handleiding om je app naar production te deployen.

---

## 📋 Pre-Deployment Checklist

Voordat je deployed, zorg dat je het volgende hebt:

- [x] Lokale app werkt perfect
- [x] Supabase database opgezet
- [x] SQL functie `update_claim_with_ai_notes` aangemaakt
- [ ] GitHub repository aangemaakt
- [ ] Alle environment variables klaar
- [ ] Vercel account aangemaakt

---

## 🔑 Stap 1: Verzamel Alle Environment Variables

Kopieer deze lijst en vul alle waardes in:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic AI
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Google Cloud Vision OCR
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account","project_id":"...","private_key":"..."}'

# Resend Email
RESEND_API_KEY=re_xxxxx

# Site URL (wordt automatisch ingesteld door Vercel, maar kan ook handmatig)
NEXT_PUBLIC_SITE_URL=https://gratisschadeverhalen.vercel.app
```

**Haal deze waardes uit je lokale `.env.local` bestand!**

---

## 📦 Stap 2: Push naar GitHub

### Als je nog GEEN Git repository hebt:

```bash
# Stop de server (Ctrl+C)

# Initialiseer Git
git init

# Voeg alle bestanden toe
git add .

# Eerste commit
git commit -m "Initial commit - Production ready"

# Maak nieuwe repository op GitHub.com
# Ga naar: https://github.com/new
# Naam: gratisschadeverhalen
# Type: Private (aanbevolen voor nu)
# Klik: Create repository

# Link lokale repo aan GitHub (vervang USERNAME met jouw GitHub username)
git remote add origin https://github.com/USERNAME/gratisschadeverhalen.git

# Push naar GitHub
git branch -M main
git push -u origin main
```

### Als je WEL al een Git repository hebt:

```bash
# Check status
git status

# Voeg wijzigingen toe
git add .

# Commit
git commit -m "Ready for production deployment"

# Push
git push
```

---

## 🌐 Stap 3: Deploy naar Vercel

### 3a. Vercel Account Setup

1. Ga naar https://vercel.com/signup
2. Kies **"Continue with GitHub"**
3. Autoriseer Vercel om je repositories te zien

### 3b. Nieuw Project Aanmaken

1. Klik **"Add New Project"**
2. Selecteer je **gratisschadeverhalen** repository
3. Klik **"Import"**

### 3c. Project Configuratie

**Framework Preset:**
- Vercel detecteert automatisch: Next.js ✅

**Root Directory:**
- Laat leeg (standaard: `/`)

**Build Command:**
- Laat standaard: `npm run build` ✅

**Output Directory:**
- Laat standaard: `.next` ✅

### 3d. Environment Variables Toevoegen

1. Klik **"Environment Variables"**
2. Voeg ALLE environment variables toe (1 per 1):

```
NEXT_PUBLIC_SUPABASE_URL = [jouw-waarde]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [jouw-waarde]
ANTHROPIC_API_KEY = [jouw-waarde]
GOOGLE_APPLICATION_CREDENTIALS_JSON = [hele-json-string]
RESEND_API_KEY = [jouw-waarde]
```

**LET OP voor `GOOGLE_APPLICATION_CREDENTIALS_JSON`:**
- Plak de HELE JSON string (met single quotes eromheen)
- Voorbeeld: `'{"type":"service_account",...}'`

3. Selecteer voor elke variable: **"Production, Preview, Development"**
4. Klik **"Add"** na elke variable

### 3e. Deploy!

1. Klik **"Deploy"**
2. Wacht 2-5 minuten
3. Je ziet een voortgangsbalk met build logs

---

## 🎉 Stap 4: Verifieer Deployment

### Check de Website

1. Zodra build compleet is, klik **"Visit"**
2. Je website is live op: `https://gratisschadeverhalen.vercel.app`

### Test de Functionaliteit

✅ Homepage laadt
✅ Navigatie werkt
✅ Claim indienen pagina laadt
✅ OCR upload werkt (test met schadeformulier)
✅ Formulier submit werkt
✅ Email ontvangen (check inbox)

---

## ⚙️ Stap 5: Post-Deployment Configuratie

### 5a. Vercel Blob Storage (Voor File Uploads)

**Alleen nodig als je geüploade bestanden permanent wilt opslaan.**

1. Ga naar Vercel Dashboard → Je project
2. Klik **"Storage"** tab
3. Klik **"Create Database"**
4. Selecteer **"Blob"**
5. Klik **"Continue"**
6. De `BLOB_READ_WRITE_TOKEN` wordt automatisch toegevoegd

**Nu werken file uploads ook in production!**

### 5b. Custom Domain (Optioneel)

1. Ga naar **"Settings"** → **"Domains"**
2. Klik **"Add"**
3. Voer in: `gratisschadeverhalen.nl`
4. Vercel geeft je DNS instructies
5. Voeg A/CNAME records toe bij je domain provider
6. Wacht 24-48 uur voor DNS propagatie

### 5c. Resend Domain Verificatie

**Voor branded emails (niet meer onboarding@resend.dev):**

1. Ga naar https://resend.com/domains
2. Klik **"Add Domain"**
3. Voer in: `gratisschadeverhalen.nl`
4. Voeg SPF en DKIM records toe bij je domain provider
5. Klik **"Verify"**
6. Emails worden nu verzonden vanaf `noreply@gratisschadeverhalen.nl`

### 5d. Update Environment Variable

```bash
# In Vercel Dashboard → Settings → Environment Variables
# Update:
NEXT_PUBLIC_SITE_URL = https://gratisschadeverhalen.nl
# (of blijf gebruiken: https://gratisschadeverhalen.vercel.app)
```

Na wijziging: **Redeploy** (Deployments tab → 3 dots → "Redeploy")

---

## 🔄 Stap 6: Toekomstige Updates

### Elke keer als je code wijzigt:

```bash
# Lokaal testen
npm run dev

# Commit en push
git add .
git commit -m "Beschrijving van wijziging"
git push

# Vercel deployed automatisch!
```

**Vercel deployed automatisch bij elke push naar `main`!**

---

## 🚨 Troubleshooting

### Build Failed

**Error: Missing environment variables**
- Check of ALLE env vars zijn toegevoegd in Vercel
- Let op: `GOOGLE_APPLICATION_CREDENTIALS_JSON` moet quotes hebben

**Error: Module not found**
- Zorg dat `package.json` up-to-date is
- Run lokaal: `npm install` en push opnieuw

### Runtime Errors in Production

**500 Error op homepage:**
- Check Vercel logs: Deployments → Latest → "View Function Logs"
- Meestal: env variable mist of is incorrect

**OCR werkt niet:**
- Check `GOOGLE_APPLICATION_CREDENTIALS_JSON` in env vars
- Test met: curl -X POST [jouw-url]/api/ocr

**Emails komen niet aan:**
- Check `RESEND_API_KEY` is correct
- Verifieer domein bij Resend (zie 5c)

---

## 📊 Monitoring

### Vercel Analytics (Gratis)

1. Ga naar je project → **"Analytics"**
2. Zie real-time traffic, performance, en errors

### Supabase Logs

1. Ga naar Supabase Dashboard → **"Logs"**
2. Zie alle database queries en errors

---

## ✅ Deployment Checklist

- [ ] GitHub repository aangemaakt en gepusht
- [ ] Vercel account aangemaakt
- [ ] Project geïmporteerd in Vercel
- [ ] Alle environment variables toegevoegd
- [ ] Eerste deployment succesvol
- [ ] Website bereikbaar op vercel.app URL
- [ ] Test claim ingediend en gewerkt
- [ ] Email ontvangen
- [ ] (Optioneel) Blob storage geconfigureerd
- [ ] (Optioneel) Custom domain toegevoegd
- [ ] (Optioneel) Resend domain geverifieerd

---

## 🎊 Gefeliciteerd!

Je app is nu live in production! 🚀

**Je live URL:**
- Vercel: https://gratisschadeverhalen.vercel.app
- (Custom): https://gratisschadeverhalen.nl

**Support:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
