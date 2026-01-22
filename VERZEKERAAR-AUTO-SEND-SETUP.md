# 📧 Automatisch Versturen naar Verzekeraar - Setup Guide

**Versie:** 1.0  
**Datum:** 22 januari 2026  
**Status:** ✅ Klaar voor Deployment

---

## 📋 Overzicht

Dit systeem verstuurt **automatisch** aansprakelijkheidsbrieven naar verzekeraars van de tegenpartij, mits:
1. ✅ Verzekeraar email bekend is in database
2. ✅ Claim heeft geen problemen (niet geëscaleerd)
3. ✅ Geen letselschade (alleen materiële schade)

---

## 🏗️ Wat is er gebouwd?

### 1. Database: Verzekeraars Tabel
**File:** `database/verzekeraars-schema.sql`

- Tabel met 25+ Nederlandse verzekeraars
- Email adressen voor schadeclaims
- Fuzzy matching voor varianten (ANWB, anwb verzekeringen, etc.)

### 2. Email Template: Verzekeraar
**File:** `lib/email/templates.ts`

- Professionele, juridisch correcte email
- Met PDF aansprakelijkheidsbrief als bijlage
- CC naar claimer (zodat zij op de hoogte zijn)

### 3. Lookup Utilities
**File:** `lib/verzekeraar/lookup.ts`

- `getVerzekeEvent()` - Zoek verzekeraar email
- `fuzzyMatchVerzekeEvent()` - Voor suggesties
- `getAllVerzekeraars()` - Voor admin dropdown

### 4. AI Agent Update
**File:** `app/api/agent/route.ts`

- Automatische lookup na AI analyse
- PDF generatie + email verzending
- Escalatie als email niet gevonden

---

## 🚀 Deployment Stappen

### **Stap 1: Database Setup**

1. Open Supabase Dashboard → SQL Editor
2. Run het script: `database/verzekeraars-schema.sql`
3. Verificatie:

```sql
-- Check of tabel bestaat
SELECT COUNT(*) FROM public.verzekeraars;
-- Expected: 25+ verzekeraars

-- Test lookup
SELECT * FROM public.get_verzekeraar_email('ANWB');
-- Expected: Returns email_schade, naam, etc.

-- Test fuzzy matching
SELECT * FROM public.fuzzy_match_verzekeraar('Nationale');
-- Expected: Returns "Nationale Nederlanden" with similarity score
```

---

### **Stap 2: Environment Variables**

Geen nieuwe env vars nodig! Gebruikt bestaande:
- ✅ `RESEND_API_KEY` (al ingesteld)
- ✅ `RESEND_ADMIN_EMAIL` (voor escalatie emails)
- ✅ `NEXT_PUBLIC_SITE_URL` (voor links in emails)

**Optioneel toevoegen** (voor professionele uitstraling):
```bash
NEXT_PUBLIC_COMPANY_ADDRESS="Postbus 12345, 1000 AA Amsterdam"
NEXT_PUBLIC_COMPANY_PHONE="088-000-0000"
NEXT_PUBLIC_COMPANY_KVK="12345678"
```

---

### **Stap 3: Code Deployment**

Nieuwe bestanden:
- ✅ `database/verzekeraars-schema.sql`
- ✅ `lib/verzekeraar/lookup.ts`
- ✅ `VERZEKERAAR-AUTO-SEND-SETUP.md` (deze file)

Gewijzigde bestanden:
- ✅ `lib/email/templates.ts` (nieuwe template: `insuranceLiabilityEmail`)
- ✅ `app/api/agent/route.ts` (auto-send logica)

Deployment:
```bash
# Commit changes
git add .
git commit -m "feat: Automatisch versturen aansprakelijkheidsbrief naar verzekeraar"
git push origin main

# Vercel deploys automatically!
```

---

## 🎯 Hoe het Werkt

### Flow Diagram:

```
1. User dient claim in
   ↓
2. OCR verwerkt documenten
   ↓
3. User verifieert/corrigeert OCR data ← Menselijke controle!
   ↓
4. User submit definitieve claim
   ↓
5. AI Agent analyseert
   ↓
6. Decision Point:
   
   ╔══════════════════════════════════════╗
   ║  Heeft problemen? (Escalatie?)      ║
   ╚══════════════════════════════════════╝
   
   JA → Escaleer naar admin (zoals voorheen)
   ↓
   NEE → Ga verder ↓
   
   ╔══════════════════════════════════════╗
   ║  Mogelijk letselschade?              ║
   ╚══════════════════════════════════════╝
   
   JA → Email naar user + admin (geen verzekeraar contact)
   ↓
   NEE → Ga verder ↓
   
   ╔══════════════════════════════════════╗
   ║  Zoek verzekeraar email in database  ║
   ╚══════════════════════════════════════╝
   
   GEVONDEN ✅
   ↓
   ├─> Genereer PDF aansprakelijkheidsbrief
   ├─> Verstuur email naar verzekeraar (met PDF)
   ├─> CC naar claimer
   ├─> Update status = "aansprakelijkheidsbrief_verzonden"
   └─> Log in audit trail
   
   NIET GEVONDEN ❌
   ↓
   ├─> Escaleer naar admin
   ├─> Email naar admin: "Verzekeraar email onbekend"
   └─> Admin moet handmatig afhandelen
```

---

## 📧 Email Voorbeelden

### Email naar Verzekeraar:

```
Van: Gratis Schadeverhalen <noreply@gratisschadeverhalen.nl>
Aan: schade@anwb.nl
CC: claimer@example.com
Onderwerp: Aansprakelijkstelling schade d.d. 20 januari 2026 | Kenteken: AB-123-CD

Bijlage: Aansprakelijkheidsbrief_AB-123-CD_2026-01-20.pdf (45 KB)

---

Betreft: Aansprakelijkstelling materiële schade verkeersongeval
Datum ongeval: Maandag 20 januari 2026
Uw verzekerde: Jan Jansen
Kenteken: AB-123-CD
Polisnummer: POL12345

Geachte heer/mevrouw,

Namens onze cliënt stellen wij u aansprakelijk voor de schade...

[Volledige juridisch correcte brief]

Bijgaand treft u aan: Aansprakelijkheidsbrief (PDF)

Wij verzoeken u binnen 4 weken te reageren...

Met vriendelijke groet,
Gratis Schadeverhalen
```

### Email naar Admin (als email niet gevonden):

```
Van: System <noreply@gratisschadeverhalen.nl>
Aan: admin@gratisschadeverhalen.nl
Onderwerp: 🚨 ESCALATIE: Verzekeraar email onbekend - "ANWB Verzekering"

Verzekeraar Email Niet Gevonden

Claim ID: abc-123-def
Claimer: Piet Pietersen (piet@example.com)
Verzekeraar (ingevoerd): "ANWB Verzekering"

Actie vereist:
• Zoek het correcte email adres van de verzekeraar
• Voeg toe aan database (tabel: verzekeraars)
• Verstuur aansprakelijkheidsbrief handmatig via dashboard

[Bekijk Claim in Dashboard →]
```

---

## 🧪 Testing Checklist

### Test 1: Bekende Verzekeraar (Happy Path)

1. Dien claim in met verzekeraar: **"ANWB"**
2. Wacht op AI verwerking (10-20 sec)
3. Check terminal logs:

```
✅ Verzekeraar gevonden: ANWB Verzekeringen (schade@anwb.nl)
📄 Genereren PDF aansprakelijkheidsbrief...
✅ PDF gegenereerd (45 KB)
📧 Versturen aansprakelijkheidsbrief naar verzekeraar: schade@anwb.nl
✅ Aansprakelijkheidsbrief verzonden naar verzekeraar!
```

4. Check emails:
   - ✅ Email ontvangen op schade@anwb.nl (check Resend logs)
   - ✅ CC naar claimer
   - ✅ PDF bijlage aanwezig

5. Check database:
```sql
SELECT status FROM claims WHERE id = 'claim-id';
-- Expected: 'aansprakelijkheidsbrief_verzonden'
```

6. Check audit log:
```sql
SELECT * FROM audit_logs 
WHERE claim_id = 'claim-id' 
  AND action_type = 'email_sent'
  AND details->>'email_type' = 'aansprakelijkheidsbrief_verzekeraar';
```

---

### Test 2: Onbekende Verzekeraar (Escalatie Path)

1. Dien claim in met verzekeraar: **"Onbekende Verzekeraar XYZ"**
2. Wacht op AI verwerking
3. Check terminal logs:

```
⚠️  Verzekeraar email niet gevonden voor: "Onbekende Verzekeraar XYZ"
🚨 Escaleren naar admin: Verzekeraar email onbekend
```

4. Check emails:
   - ✅ Admin ontvangt escalatie email
   - ✅ Subject: "🚨 ESCALATIE: Verzekeraar email onbekend"

5. Check database:
```sql
SELECT status, escalatie_reden FROM claims WHERE id = 'claim-id';
-- Expected: 
-- status = 'escalated'
-- escalatie_reden = 'Verzekeraar email niet gevonden in database: "Onbekende Verzekeraar XYZ"'
```

---

### Test 3: Varianten / Fuzzy Matching

Test of varianten correct gematched worden:

```sql
-- Test verschillende schrijfwijzen
SELECT * FROM get_verzekeraar_email('ANWB');
SELECT * FROM get_verzekeraar_email('anwb verzekeringen');
SELECT * FROM get_verzekeraar_email('ANWB Verzekering'); -- Enkelvoud
SELECT * FROM get_verzekeraar_email('Nationale Nederlanden');
SELECT * FROM get_verzekeraar_email('NN');
SELECT * FROM get_verzekeraar_email('Centraal Beheer');
SELECT * FROM get_verzekeraar_email('CB');
```

Alle bovenstaande moeten een email returnen!

---

## 📊 Monitoring Queries

### Hoeveel brieven verzonden vandaag?

```sql
SELECT COUNT(*) 
FROM audit_logs 
WHERE action_type = 'email_sent'
  AND details->>'email_type' = 'aansprakelijkheidsbrief_verzekeraar'
  AND created_at::date = CURRENT_DATE;
```

### Welke verzekeraars krijgen de meeste claims?

```sql
SELECT 
    details->>'verzekeraar' as verzekeraar,
    COUNT(*) as aantal_brieven
FROM audit_logs
WHERE action_type = 'email_sent'
  AND details->>'email_type' = 'aansprakelijkheidsbrief_verzekeraar'
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY verzekeraar
ORDER BY aantal_brieven DESC;
```

### Hoeveel escalaties door onbekende verzekeraar?

```sql
SELECT COUNT(*)
FROM audit_logs
WHERE action_type = 'escalatie'
  AND details->>'reden' LIKE '%Verzekeraar email niet gevonden%'
  AND created_at > NOW() - INTERVAL '7 days';
```

### Overzicht verzonden brieven

```sql
SELECT 
    c.naam as claimer,
    c.verzekeraar_tegenpartij,
    al.details->>'verzekeraar' as verzekeraar_matched,
    al.details->>'recipient' as email,
    al.created_at
FROM audit_logs al
JOIN claims c ON c.id = al.claim_id
WHERE al.action_type = 'email_sent'
  AND al.details->>'email_type' = 'aansprakelijkheidsbrief_verzekeraar'
ORDER BY al.created_at DESC
LIMIT 20;
```

---

## 🔧 Admin Tools

### Verzekeraar Toevoegen (Handmatig)

Als een verzekeraar ontbreekt:

```sql
INSERT INTO public.verzekeraars (
    naam, 
    naam_normalized, 
    email_schade, 
    telefoon, 
    website,
    adres_straat,
    adres_postcode,
    adres_plaats
) VALUES (
    'Nieuwe Verzekeraar',
    'nieuweverzekeraar',
    'schade@nieuweverzekeraar.nl',
    '088-123-4567',
    'https://www.nieuweverzekeraar.nl',
    'Straatnaam 123',
    '1234 AB',
    'Amsterdam'
);
```

### Verzekeraar Email Updaten

```sql
UPDATE public.verzekeraars
SET email_schade = 'nieuw-email@verzekeraar.nl'
WHERE naam = 'ANWB Verzekeringen';
```

### Verzekeraar Deactiveren

```sql
UPDATE public.verzekeraars
SET actief = FALSE
WHERE naam = 'Oude Verzekeraar';
```

---

## ⚠️ Belangrijke Opmerkingen

### Juridische Verantwoordelijkheid

- ✅ **User heeft data geverifieerd** na OCR → Menselijke controle
- ✅ **AI analyseert claim** → Automatische kwaliteitscheck
- ✅ **Alleen bij goede claims** → Escalatie bij problemen
- ✅ **Audit trail compleet** → Juridische traceerbaarheid

### Email Verzending

- 📧 **CC naar claimer** - Zij krijgen kopie van verzonden brief
- 📄 **PDF als bijlage** - Formele brief meegestuurd
- ⏰ **Reactietermijn 4 weken** - Standaard juridische termijn
- 📝 **Professionele tone** - Juridisch correct geformuleerd

### Privacy & GDPR

- ✅ Geen gevoelige medische data verzonden
- ✅ Alleen noodzakelijke claim gegevens
- ✅ Audit logs compliance
- ✅ CC naar claimer = transparantie

---

## 🆘 Troubleshooting

### Probleem: Email komt niet aan bij verzekeraar

**Check:**
1. Resend dashboard → Logs (is email verzonden?)
2. Email adres correct in database?
```sql
SELECT email_schade FROM verzekeraars WHERE naam = 'ANWB Verzekeringen';
```
3. Check audit logs:
```sql
SELECT details FROM audit_logs 
WHERE action_type = 'email_sent' 
  AND details->>'email_type' = 'aansprakelijkheidsbrief_verzekeraar'
ORDER BY created_at DESC LIMIT 1;
```

### Probleem: PDF niet gegenereerd

**Check terminal logs:**
```
❌ PDF generatie of verzending naar verzekeraar failed: [error]
```

**Mogelijke oorzaken:**
- PDF generator dependencies ontbreken
- Claim data incompleet
- File system permissions

**Fix:** Check `lib/pdf/letter-generator.ts` voor errors

### Probleem: Verzekeraar niet gevonden (terwijl die wel in database staat)

**Test fuzzy matching:**
```sql
SELECT * FROM fuzzy_match_verzekeraar('ANWB Verzeker');
```

**Check naam varianten:**
```sql
SELECT naam, naam_normalized FROM verzekeraars WHERE naam LIKE '%ANWB%';
```

**Voeg alias toe:**
```sql
INSERT INTO verzekeraars (naam, naam_normalized, email_schade, ...) 
VALUES ('ANWB', 'anwb', 'schade@anwb.nl', ...);
```

---

## ✅ Deployment Checklist

Voor je live gaat:

- [ ] Database schema gerund (`verzekeraars-schema.sql`)
- [ ] Verificatie queries gerund (25+ verzekeraars aanwezig)
- [ ] Test lookup functie (ANWB, NN, Interpolis)
- [ ] Code deployed naar productie
- [ ] Resend API key correct (test email versturen)
- [ ] RESEND_ADMIN_EMAIL ingesteld
- [ ] Test happy path (bekende verzekeraar)
- [ ] Test escalatie path (onbekende verzekeraar)
- [ ] Check audit logs werken
- [ ] Check PDF generatie werkt
- [ ] Monitoring queries bookmarked

---

## 📈 Toekomstige Verbeteringen (Optioneel)

### 1. Admin Dashboard Pagina
- Overzicht verzonden brieven
- Knop "Handmatig versturen" voor geëscaleerde claims
- Verzekeraar database beheer UI

### 2. Email Tracking
- Read receipts (via Resend)
- Open tracking
- Link tracking (als verzekeraar op links klikt)

### 3. Automatische Follow-up
- Na 2 weken: automatische reminder naar verzekeraar
- Na 4 weken: escalatie naar admin (geen reactie)

### 4. Verzekeraar API Integratie
- Directe integratie met verzekeraar systemen
- Real-time status updates

---

## 🎉 Klaar!

Het systeem is klaar voor gebruik. Na deployment:

1. ✅ Claims met bekende verzekeraars → Automatisch verzonden
2. ✅ Claims met onbekende verzekeraars → Geëscaleerd naar admin
3. ✅ Volledige audit trail → Juridisch verantwoord
4. ✅ CC naar claimer → Transparant

**Succes met de deployment!** 🚀

---

**Vragen?** Check inline comments in:
- `lib/verzekeraar/lookup.ts`
- `app/api/agent/route.ts` (auto-send logica)
- `lib/email/templates.ts` (insuranceLiabilityEmail)
