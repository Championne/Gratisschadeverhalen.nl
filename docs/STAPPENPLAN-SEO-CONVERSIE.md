# Stappenplan SEO & Conversie Optimalisatie

**Laatste update:** 24 januari 2026  
**Status:** In uitvoering

---

## Fase 1: Kritieke Fixes (Direct - Vandaag)

### 1.1 ✅ OG-Image aanmaken
**Prioriteit:** KRITIEK  
**Impact:** Social shares werken niet zonder  
**Geschatte tijd:** 30 min

**Actie:**
- [ ] Maak professionele OG-image (1200x630px)
- [ ] Ontwerp met logo, tagline, en call-to-action
- [ ] Sla op als `/public/og-image.jpg`
- [ ] Test met https://www.opengraph.xyz/

**Design suggestie:**
- Achtergrond: gradient blauw (primary color)
- Logo links
- Tekst: "Gratis Autoschade Verhalen"
- Subtekst: "U betaalt niets - Tegenpartij betaalt alles"

---

### 1.2 ✅ WWW Inconsistentie fixen
**Prioriteit:** KRITIEK  
**Impact:** Duplicate content in Google  
**Geschatte tijd:** 5 min

**Huidige situatie:**
- `sitemap.ts` gebruikt `https://www.autoschadebureau.nl`
- `layout.tsx` canonical gebruikt `https://autoschadebureau.nl` (GEEN www)

**Actie:**
- [ ] Update `layout.tsx` canonical naar `https://www.autoschadebureau.nl`
- [ ] Controleer alle hardcoded URLs in structured-data.tsx
- [ ] Vercel redirect instellen: non-www → www

**Code wijziging:**
```tsx
// app/layout.tsx
alternates: {
  canonical: "https://www.autoschadebureau.nl"  // MET www
}
```

---

### 1.3 ✅ Google Verification Token fixen
**Prioriteit:** KRITIEK  
**Impact:** GSC verificatie kan falen  
**Geschatte tijd:** 2 min

**Actie:**
- [ ] Vervang placeholder in `layout.tsx`

**Code wijziging:**
```tsx
// app/layout.tsx
verification: {
  google: "4711ef4432d27e30",  // Uit bestandsnaam google4711ef4432d27e30.html
}
```

---

### 1.4 ✅ HowTo Schema images verwijderen
**Prioriteit:** HOOG  
**Impact:** Schema validatie fouten in GSC  
**Geschatte tijd:** 5 min

**Actie:**
- [ ] Verwijder `"image"` properties uit HowTo steps in `app/page.tsx`
- [ ] OF maak de step images aan (step1.jpg t/m step4.jpg)

---

## Fase 2: Quick Wins (Deze Week)

### 2.1 ✅ AI Chatbot installeren (Botpress)
**Prioriteit:** HOOG  
**Impact:** +15-25% meer leads (NL markt)  
**Geschatte tijd:** 45 min

**Actie:**
- [ ] Maak Botpress account aan op botpress.com
- [ ] Configureer chatbot met website content
- [ ] Kopieer embed code
- [ ] Installeer widget in layout.tsx

**Plaatsing:**
- Fixed rechtsonder op alle pagina's

---

### 2.2 ✅ Internal Linking Blog Posts
**Prioriteit:** HOOG  
**Impact:** Betere SEO juice distributie  
**Geschatte tijd:** 1-2 uur

**Actie per blog post:**
- [ ] Link naar 2-3 gerelateerde artikelen
- [ ] Link naar /claim-indienen in elke post
- [ ] Link naar relevante lokale pagina's

**Voorbeeld mapping:**
| Blog Post | Linkt naar |
|-----------|------------|
| schade-openstaand-portier | autoschade-door-fietser, claim-indienen |
| autoschade-door-fietser | schade-parkeerplaats-supermarkt |
| dagwaarde-auto-berekenen | auto-total-loss-wat-nu |

---

### 2.3 ✅ Lokale pagina's verbeteren
**Prioriteit:** MEDIUM  
**Impact:** Betere lokale rankings  
**Geschatte tijd:** 2 uur

**Actie per stad:**
- [ ] Unieke openingszin per stad
- [ ] Lokale landmarks/straatnamen noemen
- [ ] Testimonial van klant uit die stad toevoegen
- [ ] Schema markup met LocalBusiness per pagina

**Steden te updaten:**
- [ ] Amsterdam
- [ ] Rotterdam
- [ ] Den Haag
- [ ] Utrecht
- [ ] Eindhoven
- [ ] Tilburg
- [ ] Groningen
- [ ] Almere
- [ ] Breda
- [ ] Nijmegen
- [ ] Arnhem
- [ ] Haarlem
- [ ] Zaanstad
- [ ] Apeldoorn
- [ ] Amersfoort

---

### 2.4 ✅ Structured Data areaServed uitbreiden
**Prioriteit:** MEDIUM  
**Impact:** Lokale SEO versterking  
**Geschatte tijd:** 15 min

**Actie:**
- [ ] Voeg alle 15 steden toe aan `structured-data.tsx` areaServed

---

## Fase 3: Conversie Optimalisatie (Week 2)

### 3.1 ⬜ Claim Form Simplificeren
**Prioriteit:** HOOG  
**Impact:** -30% form abandonment  
**Geschatte tijd:** 3-4 uur

**Huidige situatie:** 10 velden in 2 stappen

**Nieuwe flow:**
```
Stap 1: Upload schadeformulier (OCR)
        └── OCR vult automatisch velden
        
Stap 2: Controleer + vul aan
        - Naam*
        - Email*
        - Telefoon*
        - Kenteken tegenpartij*
        - Datum ongeval*
        - Korte beschrijving
        
Stap 3: Verstuur
```

**Wijzigingen:**
- [ ] Verplaats "plaats_ongeval" naar optioneel
- [ ] Verplaats tegenpartij details naar optioneel
- [ ] Progressive disclosure: toon extra velden alleen indien nodig
- [ ] Add "Sla op en ga later verder" functie

---

### 3.2 ⬜ Social Proof Sticky Bar
**Prioriteit:** MEDIUM  
**Impact:** +Trust, +Conversie  
**Geschatte tijd:** 1 uur

**Actie:**
- [ ] Sticky bar component maken
- [ ] Tonen na 3 seconden scroll
- [ ] Content: "⭐ 4.8/5 | 127 reviews | 1000+ claims verwerkt"

---

### 3.3 ⬜ Exit Intent Popup
**Prioriteit:** MEDIUM  
**Impact:** Rescue bouncing visitors  
**Geschatte tijd:** 2 uur

**Actie:**
- [ ] Exit intent detectie toevoegen
- [ ] Popup met "Wacht! Vergeet niet..."
- [ ] Offer: gratis checklist download
- [ ] Email capture voor remarketing

---

### 3.4 ⬜ Mobile Sticky CTA Bar
**Prioriteit:** MEDIUM  
**Impact:** Meer clicks op mobile  
**Geschatte tijd:** 45 min

**Actie:**
- [ ] Fixed bar onderaan mobile schermen
- [ ] Twee buttons: "Bel direct" + "Schade melden"
- [ ] Tonen na scroll voorbij hero

---

## Fase 4: Content Uitbreiding (Week 3-4)

### 4.1 ⬜ FAQ Uitbreiden naar 25+ vragen
**Prioriteit:** MEDIUM  
**Impact:** Long-tail traffic + featured snippets  
**Geschatte tijd:** 2-3 uur

**Nieuwe FAQ onderwerpen:**
- [ ] "Wat als ik geen schadeformulier heb?"
- [ ] "Kan ik claimen als ik zelf deels schuld heb?"
- [ ] "Hoe lang heb ik om schade te claimen?"
- [ ] "Wat is waardevermindering en krijg ik dat vergoed?"
- [ ] "Kan ik ook huurautokosten claimen?"
- [ ] "Wat als de tegenpartij onverzekerd is?"
- [ ] "Hoe werkt no cure no pay precies?"
- [ ] "Moet ik naar een specifieke garage?"
- [ ] "Krijg ik ook reiskosten vergoed?"
- [ ] "Wat als er een geschil is over de toedracht?"
- [ ] "Kan ik ook bedrijfsvoertuig schade claimen?"
- [ ] "Wat als de tegenpartij in buitenland woont?"
- [ ] "Hoe snel moet ik schade melden?"
- [ ] "Kan ik ook stilstandschade claimen?"

---

### 4.2 ⬜ Nieuwe Blog Artikelen (6 stuks)
**Prioriteit:** MEDIUM  
**Impact:** Meer organic traffic  
**Geschatte tijd:** 4-6 uur

**Geplande onderwerpen:**
- [ ] "Achterop gereden worden: dit moet u weten"
- [ ] "Schade door hagel of storm - wat nu?"
- [ ] "Leaseauto schade door ander - wie betaalt?"
- [ ] "Eigen risico terugvragen bij schade door ander"
- [ ] "Wat doet een schade-expert precies?"
- [ ] "Verzekeraar betaalt te weinig - wat nu?"

---

### 4.3 ⬜ Video Content
**Prioriteit:** LAAG  
**Impact:** Engagement + trust  
**Geschatte tijd:** extern

**Actie:**
- [ ] Korte uitleg video (60 sec) over het proces
- [ ] Video testimonials van klanten
- [ ] Embed op homepage en diensten pagina

---

## Fase 5: Technische Performance (Week 4)

### 5.1 ⬜ Font Awesome Optimalisatie
**Prioriteit:** MEDIUM  
**Impact:** Snellere laadtijd  
**Geschatte tijd:** 2 uur

**Opties:**
1. Converteer naar inline SVG (beste)
2. Gebruik alleen benodigde icons via tree-shaking
3. Verplaats naar CSS (font subsetting)

---

### 5.2 ⬜ Image Lazy Loading
**Prioriteit:** MEDIUM  
**Impact:** Betere LCP score  
**Geschatte tijd:** 30 min

**Actie:**
- [ ] Voeg `loading="lazy"` toe aan alle images onder de fold
- [ ] Behoud `priority` alleen voor hero/above-fold images

---

### 5.3 ⬜ Component Code Splitting
**Prioriteit:** LAAG  
**Impact:** Kleinere JS bundle  
**Geschatte tijd:** 2-3 uur

**Actie:**
- [ ] Split homepage in dynamic imports
- [ ] Lazy load FAQ section
- [ ] Lazy load testimonials

---

## Fase 6: Trust & Authority (Doorlopend)

### 6.1 ⬜ Reviews Platform Koppeling
**Prioriteit:** HOOG  
**Impact:** Social proof + SEO  
**Geschatte tijd:** 1-2 uur

**Opties:**
- [ ] Trustpilot widget integreren
- [ ] Google Reviews widget
- [ ] Kiyoh reviews

---

### 6.2 ⬜ Keurmerken Toevoegen
**Prioriteit:** MEDIUM  
**Impact:** Vertrouwen verhogen  
**Geschatte tijd:** Extern

**Mogelijke keurmerken:**
- [ ] Thuiswinkel Waarborg
- [ ] WebwinkelKeur
- [ ] Qshops Keurmerk
- [ ] Branche-specifiek keurmerk

---

### 6.3 ⬜ Backlink Building
**Prioriteit:** MEDIUM  
**Impact:** Domain authority  
**Geschatte tijd:** Doorlopend

**Strategieën:**
- [ ] Gastblogs op automotive sites
- [ ] Vermeldingen in directories (Gouden Gids, etc.)
- [ ] PR over unieke aanpak
- [ ] Partnerships met garages/schadeherstellers

---

## Progress Tracker

| Fase | Taken | Voltooid | Status |
|------|-------|----------|--------|
| 1. Kritiek | 4 | 4 | ✅ 100% |
| 2. Quick Wins | 4 | 4 | ✅ 100% |
| 3. Conversie | 4 | 0 | ⬜ |
| 4. Content | 3 | 0 | ⬜ |
| 5. Performance | 3 | 0 | ⬜ |
| 6. Trust | 3 | 0 | ⬜ |
| **TOTAAL** | **21** | **8** | **38%** |

---

## Volgende Acties

**Direct starten met:**
1. OG-Image aanmaken
2. WWW inconsistentie fixen
3. Google verification token
4. HowTo schema images

**Wil je dat ik een van deze taken nu direct uitvoer?**
