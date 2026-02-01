# 🚀 SEO LAUNCH CHECKLIST - Week 1 Prioriteiten

**Doel:** Van "invisible" naar "findable" in Google binnen 7 dagen!

---

## ✅ FASE 1: TRACKING & ANALYTICS (60 min)

### Google Analytics 4 Setup
- [ ] GA4 account aanmaken op analytics.google.com
- [ ] Measurement ID kopieren (format: G-XXXXXXXXXX)
- [ ] In `.env.local` toevoegen: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] Deploy naar Vercel (`git push`)
- [ ] Test: Bezoek je site, check "Realtime" report in GA4
- [ ] 3 conversie events instellen:
  - [ ] `claim_submitted` (markeer als conversie!)
  - [ ] `ocr_upload_success`
  - [ ] `claim_form_start`

### Microsoft Clarity Setup (Gratis Heatmaps!)
- [ ] Account aanmaken op clarity.microsoft.com
- [ ] Project aanmaken: "Autoschadebureau.nl"
- [ ] Project ID kopieren
- [ ] In `.env.local` toevoegen: `NEXT_PUBLIC_CLARITY_ID=jouw_id`
- [ ] Deploy naar Vercel
- [ ] Wacht 30-60 min, check eerste heatmaps

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## ✅ FASE 2: GOOGLE SEARCH CONSOLE (30 min)

### Account Setup
- [ ] Ga naar search.google.com/search-console
- [ ] Kies "URL-prefix": `https://autoschadebureau.nl`
- [ ] Kies verificatiemethode: "HTML tag" (makkelijkst)
- [ ] Kopieer verification code
- [ ] In `app/layout.tsx` regel 75: Plak code bij `google: "..."`
- [ ] Deploy (`git push`)
- [ ] Klik "Verifiëren" in GSC

### Sitemap Indienen
- [ ] In GSC: Ga naar "Sitemaps"
- [ ] Voer in: `sitemap.xml`
- [ ] Klik "Verzenden"
- [ ] Status = "Succes" (kan 24u duren)

### Indexatie Aanvragen (Snelste Rankings!)
- [ ] In GSC: Klik "URL-inspectie" bovenaan
- [ ] Test + vraag indexering aan voor:
  - [ ] `https://autoschadebureau.nl/`
  - [ ] `https://autoschadebureau.nl/claim-indienen`
  - [ ] `https://autoschadebureau.nl/veelgestelde-vragen`
  - [ ] `https://autoschadebureau.nl/blog/europees-schadeformulier-invullen`
  - [ ] `https://autoschadebureau.nl/blog/wa-verzekering-tegenpartij-claimen`

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## ✅ FASE 3: GOOGLE MY BUSINESS (45 min) - HIGHEST IMPACT!

### Account Aanmaken
- [ ] Ga naar business.google.com
- [ ] Klik "Bedrijf beheren"
- [ ] Voeg bedrijf toe: "Autoschadebureau.nl"
- [ ] Categorie: "Juridische dienstverlening" of "Schadeadviesbureau"
- [ ] Kies locatietype:
  - [ ] **Service Area** (als je geen fysiek kantoor hebt) ✅ AANBEVOLEN
  - [ ] OF Fysiek adres (als je wel kantoor hebt)
- [ ] Service gebied: Heel Nederland of specifieke steden

### Verificatie
- [ ] Kies verificatiemethode (postkaart, sms, email, telefoon)
- [ ] Vul verificatiecode in wanneer ontvangen

### Profiel Optimaliseren (100% Volledigheid = Betere Rankings!)
- [ ] Beschrijving invullen (zie template in docs/GOOGLE-MY-BUSINESS-SETUP.md)
- [ ] Openingstijden instellen
- [ ] Foto's uploaden:
  - [ ] Logo (500x500px)
  - [ ] Cover foto (1024x576px)
  - [ ] Minimaal 3 extra foto's (screenshots site, proces, team)
- [ ] Services toevoegen (6 diensten, allemaal "Gratis")
- [ ] Attributen selecteren (online diensten, veilig, etc.)

### Q&A Invullen (Goud voor SEO!)
- [ ] Voeg 5-7 veelgestelde vragen toe (zie template in docs)
- [ ] Vragen: Kosten? Duur? Eigen risico? Letselschade? Premie omhoog?

### Eerste Post Plaatsen
- [ ] Post 1: "🚗 Autoschadebureau.nl is nu live! Claim gratis schade verhalen op tegenpartij"

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## ✅ FASE 4: DIRECTORY LISTINGS (60 min) - EASY BACKLINKS!

### Top Priority (Doe deze ZEKER)
- [ ] **TrustPilot** - business.trustpilot.com (reviews = trust!)
- [ ] **LinkedIn Company Page** - linkedin.com/company/setup/new
- [ ] **Facebook Business Page** - facebook.com/pages/creation
- [ ] **Yelp Nederland** - biz.yelp.nl/signup

### Secondary (Als je tijd hebt)
- [ ] Startpagina.nl - startpagina.nl/suggest
- [ ] Bedrijvengids.nl
- [ ] Detelefoongids.nl
- [ ] Hotfrog.nl

### Check NAP Consistency!
**GEBRUIK OVERAL EXACT DEZELFDE GEGEVENS:**
- Naam: `Autoschadebureau.nl` (geen variaties!)
- Adres: `[exact zelfde format]`
- Telefoon: `+31 [nummer]` (exact zelfde format!)
- Website: `https://autoschadebureau.nl` (geen www, geen trailing slash)

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## ✅ FASE 5: QUICK BACKLINK WINS (30 min)

### Partnership Links
- [ ] Email naar Unitas Letselschade voor kruislink (template in docs/BACKLINK-STRATEGY.md)
- [ ] Check of je al KvK nummer prominent op site hebt
- [ ] Voeg "Partner van Unitas Letselschade" toe aan footer (met link)

### Social Profiles (DA 90-100 Backlinks!)
- [ ] Twitter/X business account + bio link
- [ ] Instagram business + link in bio
- [ ] YouTube channel (optioneel, maar waardevol)

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## ✅ BONUS: CONTENT OPTIMALISATIE (Als je tijd hebt)

### Internal Linking
- [ ] Check of alle blog posts linken naar `/claim-indienen`
- [ ] Check of homepage linkt naar alle blog posts
- [ ] Voeg "Gerelateerde Artikelen" toe aan blog posts

### Schema Markup Check
- [ ] Test op schema.org validator
- [ ] Check Google Rich Results Test

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## 📊 WEEK 1 SUCCESS METRICS

**Na 7 dagen verwacht:**
- ✅ 15-20 backlinks live
- ✅ Google Search Console verified + sitemap ingediend
- ✅ GA4 tracking live + eerste conversies gemeten
- ✅ GMB profiel 80%+ compleet
- ✅ Eerste paginas geïndexeerd in Google

**Check deze URLs in Google:**
```
site:autoschadebureau.nl
```
Als je 5+ results ziet = success! 🎉

---

## 📈 WEEK 2-4 ROADMAP (Preview)

### Week 2: Content + Reviews
- [ ] Eerste 3 customer reviews vragen (TrustPilot + GMB)
- [ ] 2 GMB posts plaatsen
- [ ] 1 LinkedIn post over je launch

### Week 3: Backlink Outreach
- [ ] 20 garages contacteren voor partnership
- [ ] 5 guest post pitches versturen
- [ ] HARO aanmelden + eerste responses

### Week 4: Monitor & Optimize
- [ ] Check GSC: Welke keywords geven impressions?
- [ ] GA4: Welke paginas converteren best?
- [ ] Clarity: Waar droppen mensen af?
- [ ] Optimize based on data!

---

## 🚨 VEELGEMAAKTE FOUTEN

❌ **"Ik doe het later"** → Rankings duren al 3-6 maanden, elke dag telt!  
✅ **Beter:** Block 3-4 uur vandaag/morgen, doe het in één sprint

❌ **"Ik sla stap X over"** → Alle stappen zijn cruciaal voor success  
✅ **Beter:** Volg checklist exact, shortcuts = lagere rankings

❌ **"Ik test eerst lokaal"** → Google ziet alleen production!  
✅ **Beter:** Deploy direct naar Vercel, test op live site

❌ **Inconsistente NAP data** → Google vertrouwt je minder  
✅ **Beter:** Copy-paste exact zelfde bedrijfsnaam/adres/telefoon overal

---

## 🎯 HULP NODIG?

**Uitgebreide Guides:**
- 📊 [Google Search Console Setup](./GOOGLE-SEARCH-CONSOLE-SETUP.md)
- 🏪 [Google My Business Setup](./GOOGLE-MY-BUSINESS-SETUP.md)
- 🔗 [Backlink Strategy](./BACKLINK-STRATEGY.md)
- 📈 [SEO Ranking Analyse](./SEO-RANKING-ANALYSE.md)

**Support:**
- Google Search Console: support.google.com/webmasters
- GA4: support.google.com/analytics
- Clarity: docs.microsoft.com/clarity

---

## 💡 PRO TIPS

1. **Speed is key:** Elke dag wachten = 1 dag later ranken
2. **Quality > Quantity:** 10 goede backlinks > 100 spam links
3. **Patience:** SEO duurt 3-6 maanden, maar het werkt!
4. **Data-driven:** Meet alles, optimize based on data
5. **Consistency:** 1 uur/week SEO werk = compound growth

---

## ✅ FINAL CHECKLIST

Print deze lijst en vink af:

**Vandaag:**
- [ ] Analytics setup (GA4 + Clarity)
- [ ] Google Search Console verified
- [ ] Sitemap ingediend

**Deze week:**
- [ ] GMB profiel compleet
- [ ] 5 directory listings
- [ ] Unitas backlink aangevraagd

**Deze maand:**
- [ ] 20+ backlinks
- [ ] Eerste reviews
- [ ] Eerste rankings zichtbaar

---

**KLAAR? PUSH DE CODE! 🚀**

```bash
git add .
git commit -m "feat(seo): add analytics, tracking, and SEO foundation"
git push origin main
```

**Volgende stap:** Monitor in GSC + start Week 2 backlink outreach! 💪
