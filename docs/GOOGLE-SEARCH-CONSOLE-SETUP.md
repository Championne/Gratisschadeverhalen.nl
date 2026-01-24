# 🔍 Google Search Console Setup Guide

## Stap 1: Google Search Console Aanmaken (5 min)

1. Ga naar: https://search.google.com/search-console/
2. Klik op "Nu beginnen" of "Start now"
3. Log in met je Google account
4. Kies **"URL-prefix"** property type
5. Voer in: `https://autoschadebureau.nl`
6. Klik op "Doorgaan"

## Stap 2: Domeinverificatie

Google biedt meerdere verificatiemethoden. **Beste optie voor jou:**

### Optie A: HTML Tag (MAKKELIJKST)

1. Google geeft je een meta tag zoals:
   ```html
   <meta name="google-site-verification" content="jouw_verification_code" />
   ```

2. Open `app/layout.tsx`
3. Vervang regel 75:
   ```typescript
   verification: {
     google: "jouw_verification_code", // Plak hier ALLEEN de code (niet de hele tag)
   },
   ```

4. Deploy naar Vercel (git push)
5. Wacht 2 minuten
6. Klik in Google Search Console op "Verifiëren"

### Optie B: Via Vercel (ALTERNATIEF)

1. Ga naar Vercel Dashboard → autoschadebureau.nl project
2. Settings → Domains → autoschadebureau.nl
3. Scroll naar "Verification Records"
4. Voeg Google's TXT record toe
5. Wacht 5-10 minuten
6. Klik in GSC op "Verifiëren"

## Stap 3: Sitemap Indienen

1. In Google Search Console, ga naar "Sitemaps" (linkermenu)
2. Voer in: `sitemap.xml`
3. Klik op "Verzenden"
4. Status wordt "Succes" binnen 1-2 dagen

**Je sitemap bevat nu:**
- `/` (homepage)
- `/claim-indienen`
- `/over-ons`
- `/algemene-voorwaarden`
- `/diensten`
- `/veelgestelde-vragen`
- `/blog` + alle 5 blog posts

## Stap 4: URL Inspection Tool (Test Indexatie)

1. Klik op "URL-inspectie" bovenaan
2. Test deze URLs:
   - `https://autoschadebureau.nl/`
   - `https://autoschadebureau.nl/blog/europees-schadeformulier-invullen`
   - `https://autoschadebureau.nl/veelgestelde-vragen`

3. Als status "URL is not on Google":
   - Klik op "Indexering aanvragen"
   - Doe dit voor je 5 belangrijkste paginas

## Stap 5: Verwachte Tijdlijn

- **Dag 1-3:** Verificatie + sitemap ingediend
- **Dag 4-14:** Eerste paginas geïndexeerd
- **Dag 15-30:** Alle paginas geïndexeerd + eerste rankings verschijnen
- **Maand 2-3:** Rankings stabiliseren, traffic start

---

# 📊 Google Analytics 4 Setup (10 min)

## Stap 1: GA4 Account Aanmaken

1. Ga naar: https://analytics.google.com/
2. Klik op "Start meten" of "Admin" (tandwiel icoon)
3. Klik op "Account maken"
   - Account naam: `Autoschadebureau`
4. Klik op "Property maken"
   - Property naam: `Autoschadebureau.nl`
   - Tijdzone: `Netherlands`
   - Valuta: `Euro (EUR)`

## Stap 2: Data Stream Instellen

1. Kies "Web" als platform
2. Website URL: `https://autoschadebureau.nl`
3. Stream naam: `Autoschadebureau.nl - Production`
4. Klik op "Stream maken"

## Stap 3: Measurement ID Kopieren

1. Je ziet nu je **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Kopieer deze code
3. Voeg toe aan `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## Stap 4: Conversies Instellen

### A. Claim Submitted (Meest Belangrijk!)

1. Ga naar Admin → Events
2. Klik op "Gebeurtenis maken"
3. Aangepaste gebeurtenisnaam: `claim_submitted`
4. **Markeer als conversie** (toggle aan)

### B. OCR Upload Success

1. Zelfde stappen voor: `ocr_upload_success`

### C. Form Started

1. Zelfde stappen voor: `claim_form_start`

## Stap 5: Goals/Conversies Monitoring

1. Ga naar Reports → Engagement → Conversions
2. Hier zie je:
   - Hoeveel claims submitted
   - Conversion rate (bezoekers → claims)
   - Waarde per conversie (stel in: €300-€500 gemiddeld)

---

# 🗺️ Microsoft Clarity Setup (5 min - GRATIS HEATMAPS!)

## Stap 1: Account Aanmaken

1. Ga naar: https://clarity.microsoft.com/
2. Klik op "Sign up"
3. Log in met Microsoft account (of maak gratis aan)

## Stap 2: Project Aanmaken

1. Klik op "Add new project"
2. Project naam: `Autoschadebureau.nl`
3. Website URL: `https://autoschadebureau.nl`
4. Category: `Business & Industrial`

## Stap 3: Setup Code Ophalen

1. Je krijgt een **Project ID** (10 tekens)
2. Kopieer deze
3. Voeg toe aan `.env.local`:
   ```
   NEXT_PUBLIC_CLARITY_ID=jouw_clarity_id
   ```

## Stap 4: Deploy & Wachten

1. Deploy naar Vercel (`git push`)
2. Wacht 30-60 minuten voor eerste data
3. Ga terug naar Clarity dashboard

## Wat Je Krijgt:

- **Heatmaps:** Waar klikken mensen?
- **Session Recordings:** Bekijk echte user sessies
- **Rage Clicks:** Waar frustreren mensen zich?
- **Dead Clicks:** Klikken op niet-klikbare elementen
- **Scroll Depth:** Hoe ver scrollen mensen?

---

# 🎯 Conversie Funnel Instellen

## In GA4: Funnel Exploration

1. Ga naar Explore → Blank
2. Kies "Funnel exploration"
3. Stel in:

**Stap 1:** Pageview `/`  
**Stap 2:** Pageview `/claim-indienen`  
**Stap 3:** Event `claim_form_start`  
**Stap 4:** Event `ocr_upload_success` (optioneel)  
**Stap 5:** Event `claim_submitted` ✅  

4. Sla op als "Claim Submission Funnel"

## Wat Je Nu Ziet:

- **Drop-off rates:** Waar stoppen mensen?
- **Conversion rate:** Homepage → Claim submitted
- **Time to convert:** Hoe snel submit mensen?

---

# ✅ CHECKLIST: Alles Gedaan?

## Week 1 Prioriteiten:

- [ ] Google Search Console aangemaakt
- [ ] Domein geverifieerd via meta tag
- [ ] Sitemap.xml ingediend
- [ ] 5 belangrijkste paginas "indexering aangevraagd"
- [ ] Google Analytics 4 aangemaakt
- [ ] GA4 Measurement ID in .env.local gezet
- [ ] 3 conversie events ingesteld (claim_submitted, ocr_upload_success, form_start)
- [ ] Microsoft Clarity aangemaakt
- [ ] Clarity ID in .env.local gezet
- [ ] Code deployed naar Vercel
- [ ] Test: Claim indienen en check of events in GA4 verschijnen

---

# 🚨 TROUBLESHOOTING

## "Gebeurtenis claim_submitted niet zichtbaar in GA4"

**Oplossing:**
1. Wacht 24-48 uur (data vertraging)
2. Test in "DebugView" (GA4 → Admin → DebugView)
3. Check browser console voor errors

## "Sitemap status 'Couldn't fetch'"

**Oplossing:**
1. Check: https://autoschadebureau.nl/sitemap.xml (moet XML tonen)
2. Wacht 24 uur en probeer opnieuw
3. Check robots.txt: https://autoschadebureau.nl/robots.txt

## "Pagina's niet geïndexeerd na 2 weken"

**Mogelijke oorzaken:**
1. Site is te nieuw (wacht 4-6 weken)
2. Geen backlinks (zie Phase 2 guide)
3. Content duplicatie (check Sitelinks)

---

# 📞 HULP NODIG?

**Google Search Console:** https://support.google.com/webmasters  
**GA4 Help:** https://support.google.com/analytics  
**Clarity Help:** https://docs.microsoft.com/en-us/clarity/

**Pro Tip:** Bookmark deze paginas in GA4:
1. Realtime report (zie live traffic)
2. Conversions report (zie claims)
3. Acquisition → Traffic acquisition (waar komen bezoekers vandaan?)

---

# 🎉 SUCCES METRICS (Eerste 30 Dagen)

## Realistische Verwachtingen:

- **Impressions (Google):** 100-500
- **Clicks:** 5-30
- **Bezoekers:** 20-80
- **Claims:** 0-3
- **Indexatie:** 80-100% van paginas

## Als je meer wilt:

→ Ga naar **Phase 2: Backlink Strategy Guide** (komt zo!)
