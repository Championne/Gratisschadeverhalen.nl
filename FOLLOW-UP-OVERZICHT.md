# 🔄 Follow-up Systeem - Overzicht

**Status:** ✅ Volledig gebouwd, veilig disabled  
**Activeer:** Wanneer je productie gaat

---

## 🎯 Wat doet het?

**Automatische herinneringen naar verzekeraars die niet reageren binnen 14 dagen.**

---

## ⚡ Quick Start

### Nu (Development):
```bash
# 1. Database setup
# Run in Supabase: database/follow-up-schema.sql

# 2. Deploy code (veilig, feature disabled)
git add .
git commit -m "feat: Follow-up systeem (disabled)"
git push

# Klaar! ✅
```

### Later (Productie activeren):
```bash
# Vercel Dashboard:
# Environment Variables → ENABLE_FOLLOW_UP_SYSTEM = true
```

---

## 📊 Hoe het werkt

```
09:00 UTC (Dagelijks)
    ↓
Cron Job draait
    ↓
Zoekt claims:
  - Status = 'in_behandeling'
  - > 14 dagen geleden
  - follow_up_sent = false
    ↓
Voor elke claim:
  1. Claude AI genereert originele email
  2. Verstuur naar verzekeraar (+CC claimer)
  3. Update DB: follow_up_sent = true
  4. Notificeer claimer: "Herinnering verstuurd"
  5. Log in audit trail
```

---

## 📁 Wat is gebouwd

| Bestand | Functie |
|---------|---------|
| `database/follow-up-schema.sql` | Database schema + RPC functions |
| `lib/follow-up/email-generator.ts` | AI email generatie via Claude |
| `app/api/cron/follow-up/route.ts` | Cron job (draait dagelijks) |
| `vercel.json` | Cron configuratie (09:00 UTC) |
| `FOLLOW-UP-SYSTEEM-SETUP.md` | Complete setup guide |

---

## 🔒 Veiligheid

### Nu:
- ✅ **Feature DISABLED** (veilig voor development)
- ✅ **Cron secret** beschermt endpoint
- ✅ **Audit logging** compleet
- ✅ **GDPR compliant**

### Later (bij activatie):
- ✅ Zet `ENABLE_FOLLOW_UP_SYSTEM=true` in Vercel
- ✅ Genereer sterke `CRON_SECRET`
- ✅ Test eerst 1 week
- ✅ Dan volledig activeren

---

## 📧 Email Voorbeeld

**AI genereert originele tekst zoals:**

```
Geachte heer/mevrouw,

Op 8 januari jl. hebben wij u een aansprakelijkheidsbrief 
toegestuurd met betrekking tot de schade die onze cliënt, 
Jan Jansen, heeft geleden bij een verkeersongeval op 1 januari 2026.

Tot op heden hebben wij nog geen reactie van u ontvangen. 
De gebruikelijke reactietermijn van 4 weken is inmiddels verstreken.

Wij verzoeken u vriendelijk doch dringend om binnen 7 werkdagen 
te reageren met...

[Originele, gepersonaliseerde tekst door Claude AI]

Met vriendelijke groet,
Gratis Schadeverhalen
```

---

## 🧪 Testing

### Quick Test (2 minuten):

```sql
-- 1. Run database script
-- In Supabase: database/follow-up-schema.sql

-- 2. Verificatie
SELECT COUNT(*) FROM public.get_claims_needing_followup();
-- Expected: 0 (geen oude claims yet)

-- 3. Check view
SELECT * FROM public.followup_overview LIMIT 5;
-- Expected: Lijst met claims en follow-up status
```

### Volledige Test (10 minuten):

Zie: `FOLLOW-UP-SYSTEEM-SETUP.md` → Testing sectie

---

## 🎛️ Environment Variables

```bash
# .env.local en Vercel

# Feature flag (disabled by default)
ENABLE_FOLLOW_UP_SYSTEM=false

# Cron security (genereer random string)
CRON_SECRET=jouw-sterke-random-string

# Bestaande vars (moeten al werken)
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
RESEND_ADMIN_EMAIL=admin@gratisschadeverhalen.nl
```

**Generate CRON_SECRET:**
```bash
openssl rand -base64 32
```

---

## 📈 Na Activatie

### Monitoring:

```sql
-- Hoeveel follow-ups vandaag?
SELECT COUNT(*) FROM audit_logs 
WHERE action_type = 'email_sent'
  AND details->>'email_type' = 'follow_up_reminder'
  AND created_at::date = CURRENT_DATE;

-- Overzicht
SELECT * FROM followup_overview;
```

### Verwachte resultaten:
- 📧 Herinneringen verzonden om 09:00 UTC
- ✅ Audit logs bijgewerkt
- 📊 Claimer genotificeerd
- 📈 Hogere response rate van verzekeraars

---

## 🚀 Deployment

```bash
# 1. Database
# Run: database/follow-up-schema.sql in Supabase

# 2. Deploy code
git add .
git commit -m "feat: Follow-up systeem"
git push

# 3. Vercel configureert automatisch cron!
# Check: Vercel Dashboard → Cron Jobs → Should show /api/cron/follow-up

# 4. Feature blijft DISABLED
# Veilig om te deployen!
```

---

## ✅ Checklist

**Voor je deployed:**
- [ ] Database schema gerund
- [ ] RPC functions getest
- [ ] `CRON_SECRET` gegenereerd
- [ ] Environment vars ingesteld
- [ ] Feature flag = `false`

**Na deployment:**
- [ ] Cron job zichtbaar in Vercel
- [ ] Test handmatig (development)
- [ ] Monitor eerste week
- [ ] Dan activeren: `ENABLE_FOLLOW_UP_SYSTEM=true`

---

## 🆘 Support

### Feature werkt niet?
👉 `FOLLOW-UP-SYSTEEM-SETUP.md` → Troubleshooting

### Cron draait niet?
👉 Check Vercel Dashboard → Cron Jobs → Status

### Emails komen niet aan?
👉 Check Resend dashboard → Logs

---

## 🎉 Klaar!

Je hebt nu een **volledig automatisch follow-up systeem** dat:
- ✅ Dagelijks draait (09:00 UTC)
- ✅ Originele emails genereert (Claude AI)
- ✅ Automatisch verstuurt
- ✅ Claimers notificeert
- ✅ Volledig audit trail
- ✅ Veilig disabled (activeer wanneer klaar)

**Succes! 🚀**
