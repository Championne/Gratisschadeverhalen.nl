# 🚀 Audit Systeem - Quick Reference Cheatsheet

**Voor:** Gratisschadeverhalen.nl  
**Laatste update:** 20 januari 2026

---

## 📝 Veelgebruikte Code Snippets

### 1. Log een actie (TypeScript)

```typescript
import { logAuditAction } from '@/lib/audit/logger'

// Basis logging
await logAuditAction({
  claimId: claim.id,
  actionType: 'claim_submit',
  performedBy: 'USER:email@example.com',
  details: { key: 'value' },
  severity: 'info', // of 'warning', 'critical'
})

// Zonder claim (systeem log)
await logAuditAction({
  claimId: null,
  actionType: 'login',
  performedBy: 'SYSTEM',
  details: { user: 'admin@example.com' },
})
```

### 2. Escaleer een claim

```typescript
import { escalateClaim } from '@/lib/audit/logger'

await escalateClaim({
  claimId: claim.id,
  reden: 'OCR confidence te laag (65%)',
  performedBy: 'AI', // of 'ADMIN:email@example.com'
})
```

### 3. Check of escalatie nodig is

```typescript
import { shouldEscalateOnConfidence } from '@/lib/audit/logger'

if (shouldEscalateOnConfidence(claim.ocr_confidence)) {
  // Escaleer!
  await escalateClaim({ ... })
}

// Custom threshold
if (shouldEscalateOnConfidence(claim.ocr_confidence, 80)) {
  // Escaleer als < 80%
}
```

### 4. Haal audit logs op

```typescript
import { getClaimAuditLogs } from '@/lib/audit/logger'

const logs = await getClaimAuditLogs(claimId)
console.log(`${logs.length} logs gevonden`)
```

### 5. Resolve een escalatie

```typescript
import { resolveEscalation } from '@/lib/audit/logger'

await resolveEscalation({
  claimId: claim.id,
  performedBy: 'ADMIN:admin@example.com',
  nieuweStatus: 'in_behandeling',
})
```

### 6. Toon Audit Logs in UI

```tsx
import { AuditLogViewer } from '@/components/dashboard/audit-log-viewer'

export function ClaimDetail({ claim }) {
  return (
    <div>
      {/* ... */}
      <AuditLogViewer claimId={claim.id} />
    </div>
  )
}
```

---

## 🗄️ Veelgebruikte SQL Queries

### Alle logs voor een claim

```sql
SELECT * FROM public.audit_logs 
WHERE claim_id = 'your-uuid-here'
ORDER BY created_at DESC;
```

### Alle escalaties vandaag

```sql
SELECT 
    c.naam,
    c.email,
    c.escalatie_reden,
    c.escalatie_datum
FROM public.claims c
WHERE c.status = 'escalated'
  AND c.escalatie_datum::date = CURRENT_DATE
ORDER BY c.escalatie_datum DESC;
```

### Of gebruik de view:

```sql
SELECT * FROM public.escalated_claims;
```

### Top escalatie redenen (laatste week)

```sql
SELECT 
    details->>'reden' as reden,
    COUNT(*) as aantal
FROM public.audit_logs
WHERE action_type = 'escalatie'
  AND created_at > NOW() - INTERVAL '7 days'
GROUP BY reden
ORDER BY aantal DESC;
```

### Claims die lang escalated zijn (>3 dagen)

```sql
SELECT 
    id,
    naam,
    email,
    escalatie_reden,
    escalatie_datum,
    NOW() - escalatie_datum as duur
FROM public.claims
WHERE status = 'escalated'
  AND escalatie_opgelost = FALSE
  AND escalatie_datum < NOW() - INTERVAL '3 days'
ORDER BY escalatie_datum;
```

### Logs per action type (laatste 24u)

```sql
SELECT 
    action_type,
    COUNT(*) as aantal
FROM public.audit_logs
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY action_type
ORDER BY aantal DESC;
```

### Critical logs (laatste 7 dagen)

```sql
SELECT 
    claim_id,
    action_type,
    performed_by,
    details,
    created_at
FROM public.audit_logs
WHERE severity = 'critical'
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Handmatig log toevoegen (testing)

```sql
SELECT public.log_audit_action(
    'claim-uuid-here'::uuid,
    'manual_edit',
    'ADMIN:admin@example.com',
    '{"actie": "Test log", "reden": "Manual check"}'::jsonb,
    'info',
    NULL::inet
);
```

### Handmatig claim escaleren (testing)

```sql
SELECT public.escalate_claim(
    'claim-uuid-here'::uuid,
    'Handmatig geëscaleerd voor testing',
    'ADMIN:admin@example.com'
);
```

### GDPR: Verwijder oude logs (>2 jaar)

```sql
SELECT public.cleanup_old_audit_logs();
-- Returns: aantal verwijderde logs
```

### GDPR: Anonimiseer oude IPs (>30 dagen)

```sql
SELECT public.anonymize_old_ip_addresses();
-- Returns: aantal geanonimiseerde IPs
```

---

## 🔍 Debugging Commands

### Check of audit systeem werkt

```bash
# Terminal
curl "http://localhost:3000/api/audit-logs?claimId=YOUR_UUID" | jq
```

### Check Supabase RPC functions

```sql
-- Toon alle audit-gerelateerde functies
SELECT 
    proname as function_name,
    pg_get_function_arguments(oid) as arguments
FROM pg_proc 
WHERE proname LIKE '%audit%' OR proname LIKE '%escalat%'
ORDER BY proname;
```

### Check indexes (performance)

```sql
SELECT 
    indexname, 
    indexdef
FROM pg_indexes
WHERE tablename = 'audit_logs';
```

### Check RLS policies

```sql
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'audit_logs';
```

### Test email verzending (logs)

```sql
SELECT 
    claim_id,
    details->>'to' as recipient,
    details->>'subject' as subject,
    created_at
FROM public.audit_logs
WHERE action_type = 'email_sent'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 📊 Monitoring Dashboard Queries

### Dagelijkse stats

```sql
-- Hoeveel logs vandaag?
SELECT COUNT(*) FROM public.audit_logs 
WHERE created_at::date = CURRENT_DATE;

-- Hoeveel escalaties vandaag?
SELECT COUNT(*) FROM public.audit_logs 
WHERE action_type = 'escalatie' 
  AND created_at::date = CURRENT_DATE;

-- Hoeveel emails verstuurd vandaag?
SELECT COUNT(*) FROM public.audit_logs 
WHERE action_type = 'email_sent' 
  AND created_at::date = CURRENT_DATE;
```

### Weekly report

```sql
SELECT 
    created_at::date as datum,
    COUNT(*) as totaal_logs,
    COUNT(*) FILTER (WHERE action_type = 'claim_submit') as nieuwe_claims,
    COUNT(*) FILTER (WHERE action_type = 'escalatie') as escalaties,
    COUNT(*) FILTER (WHERE severity = 'critical') as critical_events
FROM public.audit_logs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY datum
ORDER BY datum DESC;
```

### Performance check

```sql
-- Gemiddelde query tijd (run met EXPLAIN ANALYZE)
EXPLAIN ANALYZE
SELECT * FROM public.audit_logs 
WHERE claim_id = 'test-uuid'
ORDER BY created_at DESC;

-- Tabel grootte
SELECT 
    pg_size_pretty(pg_total_relation_size('public.audit_logs')) as total_size,
    pg_size_pretty(pg_relation_size('public.audit_logs')) as table_size,
    pg_size_pretty(pg_indexes_size('public.audit_logs')) as indexes_size;
```

---

## 🚨 Escalatie Triggers (Automatisch)

### In `app/api/agent/route.ts`:

1. **Lage OCR Confidence (<70%)**
   ```typescript
   if (shouldEscalateOnConfidence(claim.ocr_confidence)) {
     await escalateClaim({
       claimId: claim.id,
       reden: `OCR confidence te laag (${claim.ocr_confidence}%)`,
       performedBy: 'AI',
     })
   }
   ```

2. **Onvolledige Tegenpartij Gegevens**
   ```typescript
   if (!claim.naam_tegenpartij || !claim.verzekeraar_tegenpartij) {
     await escalateClaim({
       claimId: claim.id,
       reden: 'Onvolledige tegenpartij gegevens',
       performedBy: 'AI',
     })
   }
   ```

3. **Lage AI Confidence (<70%)**
   ```typescript
   const aansprakelijkheid = extractAansprakelijkheid(aiText)
   if (aansprakelijkheid < 70) {
     await escalateClaim({
       claimId: claim.id,
       reden: `AI confidence te laag (${aansprakelijkheid}%)`,
       performedBy: 'AI',
     })
   }
   ```

4. **Mogelijk Letselschade**
   ```typescript
   if (letselschadeDetected) {
     await escalateClaim({
       claimId: claim.id,
       reden: 'Mogelijk letselschade gedetecteerd',
       performedBy: 'AI',
     })
   }
   ```

---

## 🔐 GDPR Compliance

### Automatische Cleanup (Setup Cron Jobs)

**In Supabase Dashboard → Database → Cron Jobs:**

#### 1. Weekly IP Anonymization
- **Name:** `anonymize_ips`
- **Schedule:** `0 2 * * 0` (Sunday 2AM)
- **SQL:**
  ```sql
  SELECT public.anonymize_old_ip_addresses();
  ```

#### 2. Monthly Log Cleanup
- **Name:** `cleanup_logs`
- **Schedule:** `0 3 1 * *` (1st of month 3AM)
- **SQL:**
  ```sql
  SELECT public.cleanup_old_audit_logs();
  ```

### Handmatige Cleanup

```sql
-- Verwijder logs ouder dan X dagen (custom)
DELETE FROM public.audit_logs 
WHERE created_at < NOW() - INTERVAL '365 days';

-- Verwijder alle IPs (nuclear option)
UPDATE public.audit_logs 
SET ip_address = NULL 
WHERE ip_address IS NOT NULL;
```

---

## 📧 Email Notificaties

### Admin Escalatie Email

Wanneer verstuurd:
- ✅ Lage OCR confidence
- ✅ Lage AI confidence
- ✅ Onvolledige gegevens
- ✅ Mogelijk letselschade

Template: `lib/email/templates.ts` → `adminEscalationEmail()`

**Vereiste env var:**
```bash
RESEND_ADMIN_EMAIL=admin@gratisschadeverhalen.nl
```

### Check of emails aankomen

```sql
-- Laatste 10 verzonden emails
SELECT 
    claim_id,
    details->>'to' as recipient,
    details->>'subject' as subject,
    details->>'template' as template,
    created_at
FROM public.audit_logs
WHERE action_type = 'email_sent'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🎨 Action Type Icons (UI)

| Action Type | Icon | Label (NL) |
|-------------|------|------------|
| `claim_submit` | 📄 FileText | Claim Ingediend |
| `ocr_run` | ⚡ Zap | OCR Verwerking |
| `ai_analyse` | 🤖 Bot | AI Analyse |
| `email_sent` | ✉️ Mail | Email Verzonden |
| `status_change` | ⚡ Zap | Status Gewijzigd |
| `escalatie` | ⚠️ AlertTriangle | Claim Geëscaleerd |
| `manual_edit` | ✏️ Edit | Handmatig Aangepast |
| `file_upload` | 📤 Upload | Bestand Geüpload |
| `file_delete` | 🗑️ Trash2 | Bestand Verwijderd |
| `view_claim` | 👁️ Eye | Claim Bekeken |
| `login` | 👤 User | Ingelogd |

---

## 🛠️ Troubleshooting Checklist

### ❌ Logs verschijnen niet

```bash
# 1. Check API endpoint
curl "http://localhost:3000/api/audit-logs?claimId=UUID"

# 2. Check in database
# SQL: SELECT * FROM audit_logs WHERE claim_id = 'UUID'

# 3. Check console logs
# Zoek: "✅ Audit logged:" of "❌ Audit log failed:"
```

### ❌ Escalatie email komt niet aan

```bash
# 1. Check env var
echo $RESEND_ADMIN_EMAIL

# 2. Check Resend dashboard
# https://resend.com/logs

# 3. Check audit logs
# SQL: SELECT * FROM audit_logs WHERE action_type = 'email_sent'
```

### ❌ Database errors

```sql
-- Check of alle functies bestaan
SELECT proname FROM pg_proc 
WHERE proname IN (
    'log_audit_action',
    'escalate_claim',
    'resolve_escalation',
    'get_claim_audit_logs',
    'cleanup_old_audit_logs',
    'anonymize_old_ip_addresses'
);

-- Re-run schema als functies ontbreken
-- Zie: database/audit-logs-schema.sql
```

---

## 📚 Documentatie Links

- **Setup:** `AUDIT-DEPLOYMENT.md`
- **Volledige Uitleg:** `AUDIT-SYSTEEM-UITLEG.md`
- **Test Script:** `test-audit-systeem.sql`
- **Code:** `lib/audit/logger.ts`
- **Schema:** `database/audit-logs-schema.sql`

---

## ✅ Quick Health Check

Run deze queries om te verifiëren dat alles werkt:

```sql
-- 1. Tabel bestaat?
SELECT COUNT(*) FROM public.audit_logs;

-- 2. Functies werken?
SELECT public.log_audit_action(
    NULL, 'test_action', 'SYSTEM', '{}'::jsonb, 'info', NULL
);

-- 3. View werkt?
SELECT COUNT(*) FROM public.escalated_claims;

-- 4. Recent activity?
SELECT COUNT(*) FROM public.audit_logs 
WHERE created_at > NOW() - INTERVAL '24 hours';
```

Als alle 4 slagen: **✅ Systeem OK!**

---

**Laatste update:** 20 januari 2026  
**Vragen?** Check `AUDIT-SYSTEEM-UITLEG.md` voor details
