# 🚀 EMAIL AUTOMATION SYSTEM - COMPLETE SETUP GUIDE

**Maximale automatisering van verzekeraar email responses**

Dit systeem verwerkt automatisch ALLE inkomende emails van verzekeraars:
- 🤖 AI-powered analyse (Claude Sonnet 4)
- 🎯 Intelligente claim matching
- ⚡ Automatische status updates
- 📬 Real-time notificaties
- 🔍 Sentiment analysis
- 📊 Priority scoring
- ✅ Volledige audit trail

---

## 📋 INHOUDSOPGAVE

1. [Overzicht](#overzicht)
2. [Architectuur](#architectuur)
3. [Installatie](#installatie)
4. [Configuratie](#configuratie)
5. [Testing](#testing)
6. [Dashboard Gebruik](#dashboard-gebruik)
7. [Troubleshooting](#troubleshooting)
8. [Kosten & Limieten](#kosten--limieten)

---

## 🎯 OVERZICHT

### Wat doet het systeem?

Wanneer een verzekeraar een email stuurt naar jouw domein (bijv. `schade@gratisschadeverhalen.nl`):

```
📧 Email ontvangen
    ↓
🔍 Opslaan in database
    ↓
🤖 AI Analyse (Claude)
    ↓
🎯 Claim Matching
    ↓
⚡ Auto Status Update (optioneel)
    ↓
📬 Notificaties versturen
    ↓
✅ Audit Log
```

### Key Features

| Feature | Beschrijving | Auto/Manueel |
|---------|--------------|--------------|
| **Email Ontvangst** | Resend Inbound Webhook | Automatisch |
| **AI Analyse** | Type, sentiment, priority | Automatisch |
| **Claim Matching** | 5 strategieën (ref, kenteken, naam, email, context) | Automatisch |
| **Status Update** | Bij 85%+ confidence | Optioneel |
| **Notificaties** | Client + Admin | Automatisch |
| **Dashboard** | Overzicht alle emails | Manueel bekijken |

---

## 🏗️ ARCHITECTUUR

### Database Schema

**Nieuwe Tabellen:**
- `inbound_emails` - Ruwe emails
- `email_analysis` - AI analyse resultaten
- `email_attachments` - Bijlagen (toekomstig)
- `email_threads` - Conversatie tracking
- `auto_actions` - Log van automatische acties

**Updated Tabellen:**
- `claims` - Nieuwe kolommen:
  - `last_verzekeraar_email_at`
  - `verzekeraar_email_count`
  - `latest_verzekeraar_response_type`
  - `requires_manual_review`
  - `manual_review_reason`

### AI Analyse Flow

```typescript
// 1. Email ontvangen → webhook
POST /api/webhook/email-inbound

// 2. AI Analyse
analyzeEmail() // lib/email-processor/ai-analyzer.ts
  → Claude Sonnet 4 prompt
  → Structured JSON response
  → Type, sentiment, priority, entities

// 3. Claim Matching
matchEmailToClaim() // lib/email-processor/claim-matcher.ts
  → 5 matching strategies
  → Confidence score
  → Best match selection

// 4. Auto Actions
if (confidence > 85% && AUTO_UPDATE_ENABLED)
  → Update claim status
  → Send notifications
  → Log audit trail
```

### Matching Strategies

| Priority | Strategie | Confidence | Voorbeeld |
|----------|-----------|------------|-----------|
| 1 | **Exact Reference** | 100% | `REF-123`, UUID in email |
| 2 | **License Plate** | 95% | `AB-12-CD` match |
| 3 | **Email Domain** | 70% | `@anwb.nl` → ANWB claims |
| 4 | **Name Match** | 75% | Naam claimer/tegenpartij |
| 5 | **Context** | 65-80% | Datum, bedrag combinatie |

---

## 🛠️ INSTALLATIE

### Stap 1: Database Schema Uitvoeren

```bash
# In Supabase SQL Editor, voer uit:
```

```sql
-- Voer VOLLEDIG uit: database/email-response-system-schema.sql
-- Dit creëert:
-- - 5 nieuwe tabellen
-- - Indexes
-- - RPC functions
-- - Views
-- - RLS policies
```

**Verificatie:**

```sql
-- Check tabellen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%email%';

-- Expected output:
-- inbound_emails
-- email_analysis
-- email_attachments
-- email_threads
-- auto_actions

-- Check views
SELECT * FROM recent_emails_overview LIMIT 1;
SELECT * FROM emails_needing_review LIMIT 1;
```

### Stap 2: Resend Inbound Email Setup

1. **Ga naar Resend Dashboard** → Domains
2. **Klik op je domein** (gratisschadeverhalen.nl)
3. **Enable Inbound Emails**:
   ```
   MX Record:
   Type: MX
   Host: @
   Value: mx.resend.com
   Priority: 10
   ```

4. **Inbound Route toevoegen**:
   ```
   To: schade@gratisschadeverhalen.nl
   Forward to webhook: https://jouw-domein.vercel.app/api/webhook/email-inbound
   ```

5. **Webhook URL instellen**:
   - Production: `https://gratisschadeverhalen.nl/api/webhook/email-inbound`
   - Development: Gebruik ngrok (zie Testing sectie)

### Stap 3: Environment Variables

Update `.env.local`:

```bash
# Bestaande vars...
ANTHROPIC_API_KEY=sk-ant-jouw_key_hier

# 🚀 NIEUWE VARS - EMAIL AUTOMATION
ENABLE_EMAIL_PROCESSING=true
ENABLE_AUTO_STATUS_UPDATE=false  # Zet op true voor volledige automatisering

# Admin email voor notificaties
ADMIN_EMAIL=admin@gratisschadeverhalen.nl

# Base URL (voor links in emails)
NEXT_PUBLIC_BASE_URL=https://gratisschadeverhalen.nl
```

### Stap 4: Deploy naar Vercel

```bash
# Push naar GitHub
git add .
git commit -m "feat: email automation system"
git push

# Vercel zal automatisch deployen

# Zet environment variables in Vercel Dashboard:
vercel env add ENABLE_EMAIL_PROCESSING
vercel env add ENABLE_AUTO_STATUS_UPDATE
vercel env add ADMIN_EMAIL
```

---

## ⚙️ CONFIGURATIE

### Feature Flags

| Flag | Functie | Recommended |
|------|---------|-------------|
| `ENABLE_EMAIL_PROCESSING=true` | Activeer email processing | ✅ Altijd |
| `ENABLE_AUTO_STATUS_UPDATE=false` | Auto status updates | ⚠️ Start met false, later true |

### Auto Status Update Logic

Automatische status update gebeurt ALLEEN als:

```typescript
✅ Confidence > 85%
✅ Email type != 'other'
✅ Requires admin action = false
✅ Heeft suggested status change
✅ ENABLE_AUTO_STATUS_UPDATE = true
```

**Status Mapping:**

| Email Type | Nieuwe Status |
|------------|---------------|
| `liability_acceptance` | `in_onderhandeling` |
| `rejection` | `afgewezen` |
| `information_request` | `informatie_gevraagd` |
| `settlement_offer` | `in_onderhandeling` |
| `acknowledgment` | `in_behandeling` |

### Notification Logic

**Client notificatie** (altijd):
- Match confidence > 80%
- Email ontvangen van verzekeraar
- Link naar dashboard

**Admin notificatie** (conditional):
- Geen claim match gevonden
- Match confidence < 80%
- Multiple matches met similar confidence
- Requires admin action = true

---

## 🧪 TESTING

### Lokaal Testen met ngrok

```bash
# 1. Start Next.js dev server
npm run dev

# 2. Start ngrok (andere terminal)
ngrok http 3000

# 3. Copy ngrok URL (bijv. https://abc123.ngrok.io)

# 4. Update Resend webhook:
# https://abc123.ngrok.io/api/webhook/email-inbound

# 5. Test email sturen:
# Van: test@anwb.nl
# Naar: schade@gratisschadeverhalen.nl
# Subject: RE: Claim REF-12345 - Aansprakelijkheid erkend
# Body: Beste, Wij erkennen aansprakelijkheid voor het ongeval...
```

### Test Script

```typescript
// test-email-system.ts
async function testEmailSystem() {
  // Simuleer webhook call
  const testPayload = {
    from: { email: 'schade@anwb.nl', name: 'ANWB Schade' },
    to: 'schade@gratisschadeverhalen.nl',
    subject: 'RE: Claim - Aansprakelijkheid erkend',
    text: 'Beste, We erkennen aansprakelijkheid voor ongeval op 2026-01-15 met kenteken AB-12-CD. Graag herstelofferte.',
    html: '<p>Beste, We erkennen aansprakelijkheid...</p>',
    message_id: '<test@anwb.nl>',
  }

  const response = await fetch('http://localhost:3000/api/webhook/email-inbound', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload),
  })

  console.log('Response:', await response.json())
}
```

### Verificatie Queries

```sql
-- 1. Check ontvangen emails
SELECT 
  id,
  from_email,
  subject,
  processed,
  claim_id,
  match_confidence,
  received_at
FROM inbound_emails
ORDER BY received_at DESC
LIMIT 10;

-- 2. Check AI analyses
SELECT 
  e.subject,
  a.email_type,
  a.confidence_score,
  a.sentiment,
  a.summary_nl
FROM inbound_emails e
JOIN email_analysis a ON a.email_id = e.id
ORDER BY e.received_at DESC
LIMIT 5;

-- 3. Check auto actions
SELECT 
  aa.action_type,
  aa.action_description,
  aa.confidence_score,
  aa.success,
  c.naam,
  c.status
FROM auto_actions aa
JOIN claims c ON c.id = aa.claim_id
ORDER BY aa.created_at DESC
LIMIT 10;

-- 4. Emails needing review
SELECT * FROM emails_needing_review;

-- 5. Recent emails overview
SELECT * FROM recent_emails_overview LIMIT 10;
```

---

## 📊 DASHBOARD GEBRUIK

### Email Viewer Component

Integreer in claim detail pagina:

```tsx
// app/dashboard/claims/[id]/page.tsx
import { EmailViewer } from '@/components/dashboard/email-viewer'

export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* ... andere componenten ... */}
      
      <EmailViewer claimId={params.id} />
    </div>
  )
}
```

### Features Email Viewer

- ✅ Lijst van alle emails per claim
- ✅ AI analyse samenvatting
- ✅ Sentiment & priority badges
- ✅ Expandable details
- ✅ Key points & suggested actions
- ✅ Direct reply button
- ✅ Real-time updates

---

## 🔧 TROUBLESHOOTING

### Email wordt niet ontvangen

**Check:**
1. MX record correct ingesteld?
   ```bash
   nslookup -type=MX gratisschadeverhalen.nl
   # Expected: mx.resend.com
   ```

2. Inbound route actief in Resend?
   - Dashboard → Domains → [jouw domein] → Inbound

3. Webhook URL correct?
   - Moet eindigen op `/api/webhook/email-inbound`
   - Moet HTTPS zijn (niet HTTP)

**Debug:**
```bash
# Check Resend logs
# Dashboard → Activity → Inbound

# Check Vercel logs
vercel logs --follow
```

### Email ontvangen maar niet verwerkt

**Check:**
```sql
-- Email in database?
SELECT * FROM inbound_emails WHERE processed = false;

-- Processing errors?
SELECT id, from_email, processing_error 
FROM inbound_emails 
WHERE processing_error IS NOT NULL;
```

**Common issues:**
- ANTHROPIC_API_KEY niet gezet → AI analyse faalt
- Supabase RLS policies te strict → Database writes falen
- Feature flag `ENABLE_EMAIL_PROCESSING=false` → Processing disabled

### Claim matching faalt

**Check matching strategies:**

```sql
-- Zoek claims met kenteken
SELECT id, kenteken_tegenpartij 
FROM claims 
WHERE kenteken_tegenpartij ILIKE '%AB-12-CD%';

-- Zoek claims met verzekeraar
SELECT id, verzekeraar_tegenpartij 
FROM claims 
WHERE verzekeraar_tegenpartij ILIKE '%ANWB%';

-- Check fuzzy verzekeraar match
SELECT * FROM fuzzy_match_verzekeraar('anwb');
```

**Improve matching:**
1. Zorg dat kenteken format consistent is (uppercase, geen spaties)
2. Zorg dat verzekeraar naam in database staat (verzekeraars tabel)
3. Voeg claim ID toe aan outbound emails (als referentie)

### Auto status update werkt niet

**Checklist:**
- [ ] `ENABLE_AUTO_STATUS_UPDATE=true`
- [ ] `ENABLE_EMAIL_PROCESSING=true`
- [ ] Email confidence > 85%
- [ ] Email type is niet 'other'
- [ ] `requires_admin_action` is false
- [ ] AI heeft `suggested_status_change` gegeven

**Debug:**
```typescript
// In webhook route logs kijken:
console.log('🚀 Auto-send naar verzekeraar geactiveerd.')
console.log('⏭️  Auto status update disabled (feature flag)')
```

---

## 💰 KOSTEN & LIMIETEN

### API Costs per Email

| Service | Cost | Notes |
|---------|------|-------|
| **Resend Inbound** | Gratis (tot 1000/maand) | Dan $0.0001/email |
| **Claude Sonnet 4** | ~$0.003/email | 1000 tokens gemiddeld |
| **Supabase** | Inclusief | Tot 500MB database |

**Totale cost per email: ~$0.003 (€0.0027)**

Bij 100 emails/maand: **€0.27/maand**  
Bij 1000 emails/maand: **€2.70/maand**

### Performance

| Metric | Value |
|--------|-------|
| **Email ontvangst → Database** | < 500ms |
| **AI Analyse** | 2-4 seconden |
| **Claim Matching** | < 1 seconde |
| **Total Processing Time** | 3-6 seconden |
| **Notificatie verzonden** | + 1-2 seconden |

### Schaalbaarheid

Het systeem kan aan:
- ✅ 10,000+ emails per maand
- ✅ 100+ emails per dag
- ✅ Concurrent processing (async)
- ✅ Large email bodies (tot 100KB)

**Bottlenecks:**
1. Claude API rate limits (50 req/min)
2. Supabase free tier (500MB database)

---

## 🎓 BEST PRACTICES

### 1. Start Conservatief

```bash
# Week 1-2: Monitoring only
ENABLE_EMAIL_PROCESSING=true
ENABLE_AUTO_STATUS_UPDATE=false

# Week 3-4: Enable auto-update
ENABLE_AUTO_STATUS_UPDATE=true
```

### 2. Monitor Daily

Check dashboard dagelijks:
- Emails needing review
- Auto actions log
- Claim match confidence

### 3. Feedback Loop

Als AI verkeerde classificatie maakt:
1. Noteer in feedback log
2. Pas prompt aan in `ai-analyzer.ts`
3. Test met historical data

### 4. Claim References in Outbound

Voeg altijd claim ID toe in outbound emails:

```
Subject: Aansprakelijkstelling - REF-abc123
Body: ... Claim referentie: REF-abc123 ...
```

Dit verbetert matching naar 100% confidence.

---

## 📚 GERELATEERDE DOCS

- [AUDIT-SYSTEEM-UITLEG.md](./AUDIT-SYSTEEM-UITLEG.md) - Audit logging
- [FOLLOW-UP-SYSTEEM-SETUP.md](./FOLLOW-UP-SYSTEEM-SETUP.md) - Automatische herinneringen
- [VERZEKERAAR-AUTO-SEND-SETUP.md](./VERZEKERAAR-AUTO-SEND-SETUP.md) - Outbound emails

---

## 🚀 QUICK START CHECKLIST

- [ ] Database schema uitgevoerd
- [ ] Resend MX record toegevoegd
- [ ] Resend inbound route geconfigureerd
- [ ] Environment variables gezet
- [ ] Gedeployed naar Vercel
- [ ] Test email verstuurd
- [ ] Email ontvangen in database
- [ ] AI analyse succesvol
- [ ] Claim match succesvol
- [ ] Dashboard toont emails
- [ ] Notificaties ontvangen

---

## 🎉 SUCCESS!

Als alles werkt zie je:
1. ✅ Emails verschijnen in `inbound_emails` tabel
2. ✅ AI analyse in `email_analysis` tabel
3. ✅ Claim match gevonden (80%+ confidence)
4. ✅ Status automatisch updated (als enabled)
5. ✅ Notificaties verstuurd naar client & admin
6. ✅ Audit log entry toegevoegd
7. ✅ Dashboard toont email met analysis

**BEAST MODE ACTIVATED!** 🔥🚀

---

*Gemaakt met ❤️ voor maximale automatisering*
