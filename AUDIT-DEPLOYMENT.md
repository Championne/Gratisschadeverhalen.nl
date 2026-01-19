# 🔍 Audit Log & Escalatie Systeem - Deployment Guide

**Versie:** 1.0  
**Datum:** 16 januari 2026  
**Status:** ✅ Klaar voor Deployment

---

## 📋 Overzicht

Het Audit Log & Escalatie Systeem biedt:
- **Juridische traceerbaarheid**: Volledige logging van alle acties
- **Automatische escalatie**: Claims met lage confidence worden geëscaleerd
- **Admin notificaties**: Directe email alerts bij problemen
- **GDPR compliance**: Automatische data cleanup en anonimisering

---

## 🚀 Deployment Stappen

### **1. Database Setup (Supabase)**

#### A. Run SQL Schema
1. Open Supabase Dashboard → SQL Editor
2. Run het bestand: `database/audit-logs-schema.sql`
3. Verificatie queries:
   ```sql
   -- Check audit_logs tabel
   SELECT * FROM public.audit_logs ORDER BY created_at DESC LIMIT 10;
   
   -- Check escalaties view
   SELECT * FROM public.escalated_claims;
   
   -- Check nieuwe claims tabel kolommen
   SELECT escalatie_reden, escalatie_datum, escalatie_opgelost 
   FROM public.claims 
   WHERE status = 'escalated' 
   LIMIT 5;
   ```

#### B. Test RPC Functions
```sql
-- Test log functie
SELECT public.log_audit_action(
    NULL::uuid,  -- claim_id (NULL voor systeem logs)
    'manual_edit',
    'ADMIN:test@example.com',
    '{"test": "deployment test"}'::jsonb,
    'info',
    NULL::inet
);

-- Test escalate functie (gebruik een bestaande claim UUID)
SELECT public.escalate_claim(
    'your-claim-uuid-here'::uuid,
    'Test escalatie - deployment',
    'ADMIN:test@example.com'
);

-- Cleanup test data
DELETE FROM public.audit_logs WHERE details->>'test' = 'deployment test';
```

---

### **2. Environment Variables**

Voeg toe aan `.env.local` en Vercel:

```bash
# Admin email voor escalatie notificaties
RESEND_ADMIN_EMAIL=admin@gratisschadeverhalen.nl  # ⚠️ VERVANG MET ECHTE EMAIL!

# Bestaande variabelen (blijven hetzelfde)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...
ANTHROPIC_API_KEY=...
GOOGLE_APPLICATION_CREDENTIALS_JSON=...
```

**❗ BELANGRIJK:** Vervang `RESEND_ADMIN_EMAIL` met je echte admin email!

---

### **3. Dependencies Check**

Alle benodigde packages zijn al geïnstalleerd:
```bash
npm list
# ✅ @supabase/supabase-js
# ✅ @ai-sdk/anthropic
# ✅ resend
# ✅ @react-email/components
# ✅ sonner (toast notifications)
```

Geen extra installaties nodig! 🎉

---

### **4. Code Deployment**

#### Nieuwe bestanden:
- ✅ `database/audit-logs-schema.sql` - Database schema
- ✅ `lib/audit/logger.ts` - Audit logging utilities
- ✅ `components/dashboard/escalation-badge.tsx` - Escalatie badge component
- ✅ `components/dashboard/audit-log-viewer.tsx` - Audit trail viewer
- ✅ `app/api/audit-logs/route.ts` - API route voor audit logs

#### Aangepaste bestanden:
- ✅ `app/api/agent/route.ts` - Escalatie logica toegevoegd
- ✅ `app/api/generate-letter/route.ts` - PDF generatie logging
- ✅ `lib/email/templates.ts` - Admin escalatie email template
- ✅ `components/dashboard/claim-detail.tsx` - Escalatie badge + audit viewer
- ✅ `components/dashboard/claims-list.tsx` - Compact escalatie badges
- ✅ `app/dashboard/page.tsx` - Escalated claims stats

#### Deployment:
```bash
# Local test
npm run dev

# Git commit & push
git add .
git commit -m "feat: Add audit log & escalatie systeem"
git push origin main

# Vercel auto-deploys! ✅
```

---

## 🧪 Testing Checklist

### **A. Database Tests**
- [ ] `audit_logs` tabel bestaat
- [ ] `escalated_claims` view werkt
- [ ] RPC functions werken (`log_audit_action`, `escalate_claim`, `resolve_escalation`)
- [ ] Nieuwe claims kolommen (`escalatie_reden`, `escalatie_datum`, `escalatie_opgelost`)

### **B. Frontend Tests**
1. **Dashboard**
   - [ ] Escalatie badges tonen bij escalated claims
   - [ ] Compact badges in claims lijst
   - [ ] Audit log viewer toont logs correct

2. **Claim Details Page**
   - [ ] Escalatie waarschuwing box bij escalated claims
   - [ ] Audit trail sectie onderaan
   - [ ] Logs worden correct weergegeven

### **C. Escalatie Flow Tests**

#### Test 1: Lage OCR Confidence
1. Upload schadeformulier met slechte kwaliteit
2. OCR confidence < 70%
3. ✅ Expected: Status = 'escalated'
4. ✅ Expected: Admin email ontvangen met escalatie reden

#### Test 2: Onvolledige Gegevens
1. Claim indienen zonder tegenpartij naam/verzekeraar
2. ✅ Expected: Status = 'escalated'
3. ✅ Expected: Reden = "Onvolledige tegenpartij gegevens"

#### Test 3: AI Lage Confidence
1. Claim met onduidelijke aansprakelijkheid
2. AI bepaalt aansprakelijkheid < 70%
3. ✅ Expected: Status = 'escalated'
4. ✅ Expected: Email met AI confidence score

### **D. Audit Logging Tests**
- [ ] Claim submit gelogd
- [ ] AI analyse gelogd
- [ ] Email sends gelogd
- [ ] Status changes gelogd
- [ ] PDF generatie gelogd
- [ ] Escalaties gelogd (severity: critical)

### **E. Email Tests**
```bash
# Test admin escalatie email (gebruik test claim)
# Check inbox voor email met:
# - Subject: "🚨 ESCALATIE VEREIST: ..."
# - Confidence bar (visueel)
# - Reden box (geel)
# - Link naar dashboard
```

---

## 📊 Monitoring & Maintenance

### **Daily Checks (Optioneel)**
```sql
-- Aantal escalaties vandaag
SELECT COUNT(*) 
FROM public.audit_logs 
WHERE action_type = 'escalatie' 
  AND created_at::date = CURRENT_DATE;

-- Top escalatie redenen
SELECT details->>'reden' as reden, COUNT(*) as aantal
FROM public.audit_logs
WHERE action_type = 'escalatie'
  AND created_at > NOW() - INTERVAL '7 days'
GROUP BY reden
ORDER BY aantal DESC;

-- Claims die lang escalated zijn (>3 dagen)
SELECT id, naam, escalatie_reden, escalatie_datum
FROM public.claims
WHERE status = 'escalated'
  AND escalatie_opgelost = FALSE
  AND escalatie_datum < NOW() - INTERVAL '3 days';
```

### **GDPR Compliance (Automated)**

Deze functies kunnen via Supabase Cron Jobs worden ingesteld:

```sql
-- Weekly: Anonimiseer IP addresses (>30 dagen)
SELECT public.anonymize_old_ip_addresses();

-- Monthly: Verwijder oude logs (>2 jaar)
SELECT public.cleanup_old_audit_logs();
```

**Setup via Supabase:**
1. Dashboard → Database → Cron Jobs
2. Voeg toe:
   - Name: `anonymize_ips`, Schedule: `0 2 * * 0` (Sunday 2AM)
   - Name: `cleanup_logs`, Schedule: `0 3 1 * *` (1st of month 3AM)

---

## 🛠️ Troubleshooting

### **Probleem: Geen admin emails ontvangen**
**Fix:**
1. Check `RESEND_ADMIN_EMAIL` in env vars (Vercel)
2. Check Resend dashboard → Logs
3. Check terminal logs: `"📧 Versturen escalatie email naar admin:"`

### **Probleem: Audit logs niet zichtbaar in dashboard**
**Fix:**
1. Check API route: `/api/audit-logs?claimId=xxx`
2. Check browser console voor fetch errors
3. Check RLS policies: `SELECT * FROM pg_policies WHERE tablename = 'audit_logs';`

### **Probleem: Escalatie badge niet zichtbaar**
**Fix:**
1. Check claim status: `SELECT status, escalatie_reden FROM claims WHERE id = 'xxx';`
2. Check component import in `claim-detail.tsx`
3. Hard refresh browser (Ctrl+Shift+R)

### **Probleem: Database errors bij RPC calls**
**Fix:**
```sql
-- Check of functies bestaan
SELECT proname FROM pg_proc WHERE proname LIKE '%audit%' OR proname LIKE '%escalat%';

-- Re-run schema script als functies ontbreken
-- (Kopieer uit database/audit-logs-schema.sql)
```

---

## 📞 Support

**Questions?** Check de inline comments in:
- `lib/audit/logger.ts` - Logging functies
- `database/audit-logs-schema.sql` - Database schema docs
- `app/api/agent/route.ts` - Escalatie logica

**Issues?** Check terminal logs:
- `🚨 ESCALATIE GEDETECTEERD:` - Escalatie triggered
- `✅ Audit logged:` - Successful log
- `❌ Audit log failed:` - Error logging

---

## ✅ Deployment Completed!

Als alle tests slagen:
1. ✅ Database schema gedeployed
2. ✅ Audit logging actief
3. ✅ Escalatie flow werkend
4. ✅ Admin emails verzonden
5. ✅ Dashboard badges zichtbaar

**Juridische traceerbaarheid:** ✅ Volledig operationeel  
**GDPR compliance:** ✅ Automatisch beheerd  
**Solo-maintainable:** ✅ Clean code, goed gedocumenteerd

---

**🎉 Klaar voor productie!**
