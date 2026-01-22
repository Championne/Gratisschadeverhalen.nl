# 🔍 Audit Systeem - Overzicht & Snelle Start

**Project:** Gratisschadeverhalen.nl  
**Status:** ✅ Volledig operationeel  
**Datum:** 20 januari 2026

---

## 📋 Wat is het Audit Systeem?

Het audit systeem biedt **juridische traceerbaarheid** door alle belangrijke acties te loggen in een centrale `audit_logs` tabel. Het systeem detecteert automatisch problemen en escaleert claims die handmatige aandacht nodig hebben.

---

## 🏗️ Architectuur Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUDIT SYSTEEM FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. USER ACTION
   │
   ├─> Claim Indienen
   ├─> File Upload
   ├─> Status Wijziging
   └─> Login
   
2. APPLICATION LAYER (TypeScript)
   │
   ├─> lib/audit/logger.ts
   │   ├─> logAuditAction()
   │   ├─> escalateClaim()
   │   ├─> resolveEscalation()
   │   └─> getClaimAuditLogs()
   │
   └─> Gebruikt in:
       ├─> app/actions/submit-claim.ts
       ├─> app/api/agent/route.ts
       └─> app/api/generate-letter/route.ts

3. DATABASE LAYER (Supabase/PostgreSQL)
   │
   ├─> Tabel: audit_logs
   │   ├─> id (UUID)
   │   ├─> claim_id (UUID)
   │   ├─> action_type (VARCHAR)
   │   ├─> performed_by (VARCHAR)
   │   ├─> details (JSONB)
   │   ├─> severity (VARCHAR)
   │   ├─> ip_address (INET)
   │   └─> created_at (TIMESTAMP)
   │
   ├─> RPC Functions:
   │   ├─> log_audit_action()
   │   ├─> get_claim_audit_logs()
   │   ├─> escalate_claim()
   │   ├─> resolve_escalation()
   │   ├─> cleanup_old_audit_logs()
   │   └─> anonymize_old_ip_addresses()
   │
   └─> View: escalated_claims

4. API LAYER
   │
   └─> GET /api/audit-logs?claimId=xxx
       └─> Returns: { logs: [...], count: 5 }

5. UI LAYER (React)
   │
   └─> components/dashboard/audit-log-viewer.tsx
       ├─> Fetches logs via API
       ├─> Shows timeline met icons
       ├─> Color coding (severity)
       └─> Expandable details

6. ESCALATIE FLOW
   │
   ├─> Triggers:
   │   ├─> OCR confidence < 70%
   │   ├─> AI confidence < 70%
   │   ├─> Onvolledige gegevens
   │   └─> Mogelijk letselschade
   │
   ├─> Actions:
   │   ├─> Status = 'escalated'
   │   ├─> Log audit met severity 'critical'
   │   └─> Email naar admin
   │
   └─> UI:
       ├─> Badge in claims lijst
       └─> Waarschuwing in claim detail

7. GDPR COMPLIANCE
   │
   ├─> IP anonimisatie na 30 dagen
   └─> Log verwijdering na 2 jaar
```

---

## 🚀 Hoe te Testen (Quick Start)

### Methode 1: Database Test (Snelst - 2 minuten)

1. Open Supabase Dashboard → SQL Editor
2. Kopieer volledige inhoud van `test-audit-systeem.sql`
3. Plak en run
4. Bekijk output voor ✅/❌ status

**Expected:** Alle 8 tests tonen ✅

---

### Methode 2: Frontend Test (Volledig - 5 minuten)

#### A. Basis Logging Test

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Dien test claim in via /claim-indienen
# 4. Open Supabase SQL Editor en run:
```

```sql
SELECT 
    id, 
    naam, 
    email, 
    status
FROM public.claims 
ORDER BY created_at DESC 
LIMIT 1;

-- Kopieer ID en check audit logs:
SELECT * FROM public.audit_logs 
WHERE claim_id = 'PASTE_ID_HERE'
ORDER BY created_at;
```

**Expected logs:**
- ✅ `claim_submit`
- ✅ `ai_analyse`
- ✅ `email_sent` (meerdere)

---

#### B. Escalatie Test

```bash
# 1. Upload schadeformulier met SLECHTE kwaliteit foto
# 2. Wacht 10 seconden
# 3. Check terminal output voor:
```

```
🚨 ESCALATIE GEDETECTEERD: OCR Confidence Laag
📧 Versturen escalatie email naar admin: admin@gratisschadeverhalen.nl
```

```bash
# 4. Check admin inbox voor email
# 5. Check dashboard voor escalatie badge
```

---

#### C. UI Test (Audit Log Viewer)

```bash
# 1. Login op dashboard
http://localhost:3000/dashboard

# 2. Open een claim detail pagina
# 3. Scroll naar beneden
# 4. Zie "Audit Trail" sectie met:
```

**Checklist:**
- [ ] Shield icon ⛨ zichtbaar
- [ ] Logs tonen met correcte icons (📄,🤖,✉️)
- [ ] Timestamps in NL formaat (dd mmm yyyy, HH:mm)
- [ ] "Toon details" button werkt (expandable)
- [ ] Kleuren correct (blauw=info, rood=critical)

---

### Methode 3: API Test (2 minuten)

**Terminal:**
```bash
# Haal een claim UUID uit database
curl "http://localhost:3000/api/audit-logs?claimId=YOUR_UUID_HERE"
```

**Expected response:**
```json
{
  "success": true,
  "logs": [
    {
      "id": "...",
      "action_type": "claim_submit",
      "performed_by": "USER:test@example.com",
      "details": {...},
      "severity": "info",
      "created_at": "2026-01-20T10:30:00Z"
    }
  ],
  "count": 5
}
```

---

## 📂 Belangrijke Bestanden

### Bestaande Files (Al Gebouwd)

| Bestand | Doel | Status |
|---------|------|--------|
| `database/audit-logs-schema.sql` | Database schema (run in Supabase) | ✅ Ready |
| `lib/audit/logger.ts` | TypeScript utilities | ✅ Ready |
| `app/api/audit-logs/route.ts` | API endpoint | ✅ Ready |
| `components/dashboard/audit-log-viewer.tsx` | UI component | ✅ Ready |
| `app/api/agent/route.ts` | Gebruikt audit logging + escalatie | ✅ Ready |
| `app/actions/submit-claim.ts` | Gebruikt audit logging | ✅ Ready |
| `app/api/generate-letter/route.ts` | Gebruikt audit logging | ✅ Ready |

### Nieuwe Documentatie (Net Aangemaakt)

| Bestand | Doel |
|---------|------|
| `AUDIT-SYSTEEM-UITLEG.md` | **Complete uitleg + testing guide** (LEES DIT!) |
| `test-audit-systeem.sql` | Geautomatiseerde test script |
| `AUDIT-CHEATSHEET.md` | Quick reference voor dagelijks gebruik |
| `AUDIT-OVERZICHT.md` | Dit bestand (snelle start) |

### Bestaande Deployment Docs

| Bestand | Doel |
|---------|------|
| `AUDIT-DEPLOYMENT.md` | Deployment instructies |

---

## 🎯 Volgende Stappen

### Als je het systeem wilt TESTEN:

```bash
# 1. Run database test (2 min)
# Open Supabase → SQL Editor
# Kopieer/plak: test-audit-systeem.sql

# 2. Test frontend (5 min)
npm run dev
# Dien claim in, check dashboard

# 3. Lees volledige testing guide
# Open: AUDIT-SYSTEEM-UITLEG.md → "Testing Guide"
```

---

### Als je het systeem wilt GEBRUIKEN in code:

```bash
# 1. Open cheatsheet
# Open: AUDIT-CHEATSHEET.md

# 2. Kopieer voorbeelden:
# - Log een actie
# - Escaleer claim
# - Haal logs op
# - Toon in UI

# 3. Voorbeelden staan in:
# - lib/audit/logger.ts (TypeScript docs)
# - app/api/agent/route.ts (praktijkvoorbeelden)
```

---

### Als je problemen hebt:

```bash
# 1. Check troubleshooting sectie
# Open: AUDIT-SYSTEEM-UITLEG.md → "Troubleshooting"

# 2. Run health check queries
# Open: AUDIT-CHEATSHEET.md → "Quick Health Check"

# 3. Check terminal logs voor:
# ✅ Audit logged: ...
# ❌ Audit log failed: ...
```

---

## 🔑 Belangrijkste Concepten

### 1. Action Types

```typescript
type ActionType = 
  | 'claim_submit'      // Claim ingediend
  | 'ocr_run'           // OCR verwerkt
  | 'ai_analyse'        // AI analyse gedraaid
  | 'email_sent'        // Email verstuurd
  | 'status_change'     // Status gewijzigd
  | 'escalatie'         // Claim geëscaleerd ⚠️
  | 'manual_edit'       // Handmatig aangepast
  | 'file_upload'       // Bestand geüpload
  | 'file_delete'       // Bestand verwijderd
  | 'login'             // Ingelogd
  | 'view_claim'        // Claim bekeken
```

### 2. Severity Levels

```typescript
type Severity = 
  | 'info'              // Normale actie (blauw)
  | 'warning'           // Let op (geel)
  | 'critical'          // Urgent ⚠️ (rood)
```

### 3. Performed By Format

```typescript
// Format: TYPE:identifier
'AI'                           // AI actie
'SYSTEM'                       // Systeem actie
'USER:email@example.com'       // User actie
'ADMIN:admin@example.com'      // Admin actie
'ANONYMOUS'                    // Niet ingelogd
```

### 4. Escalatie Triggers

```typescript
// Automatisch geëscaleerd wanneer:
if (ocr_confidence < 70) { escaleer() }
if (ai_confidence < 70) { escaleer() }
if (!naam_tegenpartij || !verzekeraar) { escaleer() }
if (mogelijk_letselschade) { escaleer() }
```

---

## 📊 Database Schema (Simplified)

```sql
-- Tabel: audit_logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    claim_id UUID,                    -- Link naar claim
    action_type VARCHAR(50),          -- Wat gebeurde
    performed_by VARCHAR(255),        -- Wie deed het
    details JSONB,                    -- Extra metadata
    severity VARCHAR(20),             -- info/warning/critical
    ip_address INET,                  -- Optioneel (max 30d)
    created_at TIMESTAMP
);

-- View: escalated_claims
SELECT id, naam, escalatie_reden, escalatie_datum
FROM claims
WHERE status = 'escalated' AND escalatie_opgelost = FALSE;
```

---

## 🧪 Snelle Test Commando's

### Database Quick Test

```sql
-- Test 1: Basis logging
SELECT public.log_audit_action(
    NULL, 'test_action', 'SYSTEM', '{}'::jsonb, 'info', NULL
);

-- Test 2: Check logs
SELECT COUNT(*) FROM public.audit_logs;

-- Test 3: Check escalaties
SELECT * FROM public.escalated_claims;
```

### API Quick Test

```bash
# Terminal (vervang UUID)
curl "http://localhost:3000/api/audit-logs?claimId=UUID"
```

### UI Quick Test

```
1. Open: http://localhost:3000/dashboard
2. Klik op een claim
3. Scroll naar "Audit Trail"
4. Check: ✅ Logs zichtbaar?
```

---

## 🎓 Leer het Systeem Kennen

### Voor Beginners (Eerste keer)

**Start hier:**
1. Lees deze file (AUDIT-OVERZICHT.md) ← Je bent hier!
2. Run test script: `test-audit-systeem.sql`
3. Open dashboard, bekijk een claim, zie audit logs
4. Klaar! Nu weet je hoe het werkt.

---

### Voor Developers (Gebruik in code)

**Start hier:**
1. Open `AUDIT-CHEATSHEET.md`
2. Kopieer code snippets voor:
   - Log een actie
   - Escaleer claim
   - Haal logs op
3. Zie voorbeelden in `app/api/agent/route.ts`
4. Klaar! Nu kun je het gebruiken.

---

### Voor Testing (Volledige verificatie)

**Start hier:**
1. Open `AUDIT-SYSTEEM-UITLEG.md`
2. Ga naar "Testing Guide" sectie
3. Volg alle 8 tests
4. Klaar! Nu weet je dat alles werkt.

---

### Voor Deployment (Productie)

**Start hier:**
1. Open `AUDIT-DEPLOYMENT.md`
2. Volg deployment stappen
3. Check environment variables
4. Klaar! Nu draait het in productie.

---

## ✅ Checklist: Is het Systeem OK?

### Quick Check (30 seconden)

```sql
-- Run in Supabase SQL Editor:
SELECT COUNT(*) as audit_logs_count FROM public.audit_logs;
SELECT COUNT(*) as functies_count FROM pg_proc WHERE proname LIKE '%audit%';
SELECT COUNT(*) as escalaties_count FROM public.escalated_claims;
```

**Expected:**
- `audit_logs_count` > 0 (als er al claims zijn)
- `functies_count` = 6
- `escalaties_count` = variabel (afhankelijk van problemen)

---

### Full Check (5 minuten)

```bash
# 1. Run test script
# Supabase → SQL Editor → test-audit-systeem.sql

# 2. Alle tests ✅? JA
# → Systeem OK!

# 2. Sommige tests ❌? 
# → Check AUDIT-SYSTEEM-UITLEG.md → Troubleshooting
```

---

## 🆘 Hulp Nodig?

### Ik zie geen logs in de UI

```
→ Check: AUDIT-SYSTEEM-UITLEG.md → "Probleem 1: Logs verschijnen niet in UI"
```

### Ik krijg geen escalatie emails

```
→ Check: AUDIT-SYSTEEM-UITLEG.md → "Probleem 2: Escalatie email komt niet aan"
```

### Database errors

```
→ Check: AUDIT-SYSTEEM-UITLEG.md → "Probleem 3: Audit logs niet aangemaakt"
```

### App is traag

```
→ Check: AUDIT-SYSTEEM-UITLEG.md → "Probleem 4: Performance issues"
```

---

## 📚 Alle Documentatie

| Bestand | Gebruik voor | Tijd |
|---------|--------------|------|
| **AUDIT-OVERZICHT.md** | **Snelle start (lees dit eerst!)** | **5 min** |
| AUDIT-SYSTEEM-UITLEG.md | Complete uitleg + testing | 20 min |
| AUDIT-CHEATSHEET.md | Daily reference | 2 min |
| test-audit-systeem.sql | Geautomatiseerde tests | 2 min |
| AUDIT-DEPLOYMENT.md | Deployment guide | 10 min |
| lib/audit/logger.ts | TypeScript code + inline docs | 10 min |
| database/audit-logs-schema.sql | Database schema + comments | 10 min |

---

## 🎉 Klaar voor Gebruik!

Het audit systeem is **volledig operationeel** en production-ready.

### Wat nu?

**Als je wilt testen:**
```bash
# Run: test-audit-systeem.sql in Supabase
```

**Als je wilt gebruiken in code:**
```bash
# Open: AUDIT-CHEATSHEET.md
```

**Als je alles wilt begrijpen:**
```bash
# Lees: AUDIT-SYSTEEM-UITLEG.md
```

---

**Succes! 🚀**

Vragen? Check de troubleshooting secties in `AUDIT-SYSTEEM-UITLEG.md`
