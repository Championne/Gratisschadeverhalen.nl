# 🔄 Automatisch Follow-up Systeem - Complete Setup Guide

**Versie:** 1.0  
**Datum:** 22 januari 2026  
**Status:** ✅ Klaar voor Deployment

---

## 📋 Overzicht

Automatisch herinneringen versturen naar verzekeraars die niet binnen 14 dagen hebben gereageerd op de aansprakelijkheidsbrief.

### Features:
- ✅ **Dagelijkse cron job** (09:00 UTC)
- ✅ **AI-gegenereerde emails** via Claude (origineel, gepersonaliseerd)
- ✅ **Automatische verzending** naar verzekeraar + CC naar claimer
- ✅ **Notificaties** naar claimer
- ✅ **Audit logging** compleet
- ✅ **Feature flag** (veilig disabled by default)
- ✅ **GDPR compliant**

---

## 🏗️ Architectuur

```
Daily Cron (09:00 UTC)
    ↓
Query: Claims > 14 dagen + status 'in_behandeling' + follow_up_sent = false
    ↓
Voor elke claim:
    ├─> Genereer email via Claude AI (origineel)
    ├─> Verstuur naar verzekeraar (+ CC claimer)
    ├─> Update DB (follow_up_sent = true)
    ├─> Notificeer claimer
    └─> Log audit trail
```

---

## 🚀 Deployment Stappen

### **Stap 1: Database Setup**

```sql
-- In Supabase SQL Editor:
-- Run: database/follow-up-schema.sql
```

**Verificatie:**
```sql
-- Check kolommen
SELECT follow_up_sent, follow_up_date, follow_up_count 
FROM public.claims 
LIMIT 1;

-- Test RPC function
SELECT * FROM public.get_claims_needing_followup();

-- Check view
SELECT * FROM public.followup_overview LIMIT 5;
```

---

### **Stap 2: Environment Variables**

#### Lokaal (`.env.local`):
```bash
# Feature flag (disabled by default)
ENABLE_FOLLOW_UP_SYSTEM=false

# Cron security secret
# Genereer met: openssl rand -base64 32
CRON_SECRET=your-super-secret-random-string-here

# Bestaande vars (moeten al ingesteld zijn)
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
RESEND_ADMIN_EMAIL=admin@gratisschadeverhalen.nl
```

#### Productie (Vercel):
1. Ga naar Vercel Dashboard
2. Settings → Environment Variables
3. Voeg toe:
   - `ENABLE_FOLLOW_UP_SYSTEM` = `false` (eerst testen!)
   - `CRON_SECRET` = `[genereer sterke random string]`

**⚠️ BELANGRIJK:** Genereer een sterke CRON_SECRET!
```bash
# In terminal:
openssl rand -base64 32
# Kopieer output naar Vercel
```

---

### **Stap 3: Code Deployment**

#### Nieuwe bestanden:
- ✅ `database/follow-up-schema.sql`
- ✅ `lib/follow-up/email-generator.ts`
- ✅ `app/api/cron/follow-up/route.ts`
- ✅ `vercel.json` (cron configuratie)
- ✅ `FOLLOW-UP-SYSTEEM-SETUP.md` (deze file)

#### Deployment:
```bash
git add .
git commit -m "feat: Automatisch follow-up systeem (disabled by default)"
git push origin main

# Vercel deployt automatisch + configureert cron job!
```

---

### **Stap 4: Vercel Cron Verificatie**

Na deployment, check in Vercel Dashboard:

1. Ga naar je project → Settings → **Cron Jobs**
2. Je zou moeten zien:
   ```
   Path: /api/cron/follow-up
   Schedule: 0 9 * * * (Daily at 09:00 UTC)
   Status: Active
   ```

---

## 🧪 Testing

### Test 1: Database Setup
```sql
-- Check of kolommen bestaan
\d public.claims;
-- Should show: follow_up_sent, follow_up_date, follow_up_count

-- Check RPC function
SELECT COUNT(*) FROM public.get_claims_needing_followup();
```

---

### Test 2: Handmatige Trigger (Development)

**⚠️ Alleen in development!**

```bash
# Terminal:
curl -X POST http://localhost:3000/api/cron/follow-up \
  -H "Authorization: Bearer dev-secret-change-in-production"
```

**Expected terminal output:**
```
🔄 === FOLLOW-UP CRON JOB START ===
⏰ Tijd: 22 jan 2026, 10:30
📋 X claim(s) gevonden die herinnering nodig hebben
✅ === FOLLOW-UP CRON JOB COMPLEET ===
```

---

### Test 3: Create Test Claim (Handmatig)

Maak een test claim die aan criteria voldoet:

```sql
-- Maak test claim (oudere datum)
INSERT INTO public.claims (
    naam, email, telefoon,
    kenteken_tegenpartij, datum_ongeval, plaats_ongeval,
    beschrijving, naam_tegenpartij, verzekeraar_tegenpartij,
    status, follow_up_sent,
    created_at  -- ⚠️ Forceer oude datum
) VALUES (
    'Test Follow-up',
    'test@example.com',
    '0612345678',
    'TEST-99',
    '2026-01-01',
    'Amsterdam',
    'Test voor follow-up systeem',
    'Tegenpartij',
    'ANWB',  -- Bekende verzekeraar!
    'in_behandeling',
    false,
    NOW() - INTERVAL '15 days'  -- 15 dagen geleden
) RETURNING id;

-- Trigger follow-up handmatig:
curl -X POST http://localhost:3000/api/cron/follow-up \
  -H "Authorization: Bearer dev-secret-change-in-production"

-- Check of follow_up_sent = true
SELECT follow_up_sent, follow_up_date 
FROM public.claims 
WHERE email = 'test@example.com';

-- Cleanup
DELETE FROM public.claims WHERE email = 'test@example.com';
```

---

### Test 4: AI Email Generatie

Test of Claude AI emails kan genereren:

```typescript
// In Next.js API route of test file:
import { generateFollowUpEmail } from '@/lib/follow-up/email-generator'

const testEmail = await generateFollowUpEmail({
  claimId: 'test-123',
  naam_claimer: 'Jan Jansen',
  email_claimer: 'jan@example.com',
  telefoon_claimer: '0612345678',
  kenteken_tegenpartij: 'AB-12-CD',
  verzekeraar_tegenpartij: 'ANWB',
  datum_ongeval: '2026-01-01',
  plaats_ongeval: 'Amsterdam',
  beschrijving: 'Test ongeval',
  dagen_wachttijd: 15,
})

console.log('Subject:', testEmail.subject)
console.log('HTML:', testEmail.html.substring(0, 200))
```

**Expected:** Email met originele, gepersonaliseerde tekst van Claude

---

### Test 5: Cron Job in Productie

**Na deployment naar Vercel:**

1. **Wacht tot 09:00 UTC (10:00 Nederlandse tijd)**
2. Check Vercel logs:
   ```
   Project → Logs → Filter: "/api/cron/follow-up"
   ```
3. Expected logs:
   ```
   🔄 === FOLLOW-UP CRON JOB START ===
   📋 X claims gevonden
   ✅ === FOLLOW-UP CRON JOB COMPLEET ===
   ```

4. Check database:
   ```sql
   SELECT * FROM audit_logs 
   WHERE action_type = 'email_sent' 
     AND details->>'email_type' = 'follow_up_reminder'
   ORDER BY created_at DESC;
   ```

---

## 🔓 Activeren (Productie)

**Wanneer klaar:**

1. Test in development succesvol ✅
2. Database setup compleet ✅
3. Cron job draait in Vercel ✅
4. Eerste testrun succesvol ✅

**Activate:**
```bash
# Vercel Dashboard:
# Settings → Environment Variables
# Change: ENABLE_FOLLOW_UP_SYSTEM = true

# Redeploy of wacht tot volgende cron run (09:00 UTC)
```

---

## 📊 Monitoring

### Daily Check (09:30 UTC)

```sql
-- Hoeveel follow-ups verzonden vandaag?
SELECT COUNT(*) FROM audit_logs 
WHERE action_type = 'email_sent'
  AND details->>'email_type' = 'follow_up_reminder'
  AND created_at::date = CURRENT_DATE;

-- Welke claims?
SELECT 
    c.naam,
    c.verzekeraar_tegenpartij,
    c.follow_up_date,
    EXTRACT(DAY FROM (NOW() - c.created_at))::INTEGER as dagen_wachttijd
FROM claims c
WHERE c.follow_up_sent = TRUE
  AND c.follow_up_date::date = CURRENT_DATE;
```

### Weekly Report

```sql
-- Follow-up statistieken laatste 7 dagen
SELECT 
    DATE(follow_up_date) as datum,
    COUNT(*) as aantal_follow_ups
FROM claims
WHERE follow_up_sent = TRUE
  AND follow_up_date > NOW() - INTERVAL '7 days'
GROUP BY datum
ORDER BY datum DESC;

-- Success rate: Hoeveel claims hebben reactie na follow-up?
SELECT 
    COUNT(*) FILTER (WHERE status = 'in_onderhandeling') as met_reactie,
    COUNT(*) FILTER (WHERE status = 'in_behandeling') as zonder_reactie,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE status = 'in_onderhandeling') / 
        NULLIF(COUNT(*), 0)
    , 2) as succes_percentage
FROM claims
WHERE follow_up_sent = TRUE
  AND follow_up_date > NOW() - INTERVAL '30 days';
```

---

## 🛡️ Security & GDPR

### Security:
- ✅ **Cron Secret** - Alleen requests met correct Bearer token
- ✅ **Feature Flag** - Disabled by default
- ✅ **Rate Limiting** - Max 60 seconden execution time
- ✅ **Error Handling** - Admin notificatie bij crashes

### GDPR:
- ✅ **Minimale data** - Alleen noodzakelijke claim info
- ✅ **Audit trail** - Alle verzendingen gelogd
- ✅ **User notificatie** - Claimer krijgt kopie
- ✅ **Opt-out mogelijk** - (TODO: implementeer indien nodig)

---

## 🔧 Admin Tools

### Handmatig Follow-up Triggeren

```sql
-- Markeer claim als follow-up needed (reset flag)
UPDATE public.claims
SET follow_up_sent = FALSE
WHERE id = 'claim-uuid-here';

-- Dan wacht tot volgende cron run of trigger handmatig
```

### Follow-up Status Dashboard

```sql
-- Overzicht follow-up status
SELECT * FROM public.followup_overview 
ORDER BY dagen_sinds_aangemaakt DESC
LIMIT 20;

-- Claims die binnenkort follow-up nodig hebben (10-14 dagen)
SELECT 
    id,
    naam,
    verzekeraar_tegenpartij,
    EXTRACT(DAY FROM (NOW() - created_at))::INTEGER as dagen_wachttijd,
    14 - EXTRACT(DAY FROM (NOW() - created_at))::INTEGER as dagen_tot_follow_up
FROM claims
WHERE status = 'in_behandeling'
  AND follow_up_sent = FALSE
  AND created_at < NOW() - INTERVAL '10 days'
  AND created_at > NOW() - INTERVAL '14 days'
ORDER BY created_at;
```

---

## ⚠️ Troubleshooting

### Cron draait niet

**Check:**
1. Vercel Dashboard → Cron Jobs → Status = Active?
2. Vercel logs → Zoek naar errors
3. `vercel.json` correct deployed?

**Fix:**
```bash
# Redeploy
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

### Emails komen niet aan

**Check:**
1. Resend dashboard → Logs
2. Terminal logs → Zoek "Email verzonden"
3. Verzekeraar email correct in database?

**Fix:**
```sql
-- Check verzekeraar email
SELECT * FROM verzekeraars WHERE naam = 'ANWB';
```

---

### Feature flag werkt niet

**Check:**
```bash
# In Vercel terminal (Production):
echo $ENABLE_FOLLOW_UP_SYSTEM
# Should output: true
```

**Fix:**
- Vercel Dashboard → Environment Variables → Verify value
- Redeploy

---

### Claude AI fails

**Fallback:** Script gebruikt automatisch fallback template

**Check logs:**
```
❌ Claude AI email generatie failed: [error]
✅ Using fallback template
```

---

## 📈 Toekomstige Verbeteringen

### v2.0 Features:
1. **Meerdere follow-ups** - 2e herinnering na 28 dagen
2. **Escalatie flow** - Automatisch escaleren na 2e herinnering
3. **Template varianten** - A/B testing verschillende email tonen
4. **WhatsApp integratie** - Ook via WhatsApp herinneren
5. **Dashboard UI** - Visueel follow-up overzicht

---

## ✅ Deployment Checklist

Print en vink af:

```
DATABASE:
[ ] follow-up-schema.sql gerund
[ ] Kolommen bestaan (follow_up_sent, etc.)
[ ] RPC functions werken
[ ] View werkt (followup_overview)

ENVIRONMENT:
[ ] ENABLE_FOLLOW_UP_SYSTEM=false gezet
[ ] CRON_SECRET gegenereerd (sterke random string)
[ ] ANTHROPIC_API_KEY werkt
[ ] RESEND_API_KEY werkt
[ ] RESEND_ADMIN_EMAIL ingesteld

CODE:
[ ] vercel.json deployed
[ ] Cron route deployed
[ ] Email generator deployed
[ ] Feature flag in code

TESTING:
[ ] Database test succesvol
[ ] Handmatige trigger werkt (dev)
[ ] AI email generatie werkt
[ ] Test claim verwerkt

PRODUCTIE:
[ ] Deployed naar Vercel
[ ] Cron job zichtbaar in dashboard
[ ] Feature nog DISABLED
[ ] Eerste cron run getest (09:00 UTC)

ACTIVATIE:
[ ] Week succesvol getest
[ ] Geen kritieke bugs
[ ] ENABLE_FOLLOW_UP_SYSTEM=true gezet
[ ] Monitoring actief
[ ] Ready! 🎉
```

---

## 📚 Documentatie Links

- **Setup:** `FOLLOW-UP-SYSTEEM-SETUP.md` (deze file)
- **Code:** `app/api/cron/follow-up/route.ts`
- **Email Generator:** `lib/follow-up/email-generator.ts`
- **Database:** `database/follow-up-schema.sql`

---

**🚀 Veel succes met de deployment!**

**Vragen?** Check inline comments in de code of de troubleshooting sectie.
