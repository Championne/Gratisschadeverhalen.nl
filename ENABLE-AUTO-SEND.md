# 🚀 Auto-Send naar Verzekeraar Activeren

**Status:** ⏸️ Momenteel uitgeschakeld (veilig voor development)  
**Activeer:** Alleen wanneer je LIVE gaat in productie!

---

## ⚡ Quick Enable (1 minuut)

### Lokaal (Development)
```bash
# In .env.local toevoegen:
ENABLE_AUTO_SEND_TO_VERZEKERAAR=true
```

### Productie (Vercel)
1. Open Vercel Dashboard
2. Ga naar je project → Settings → Environment Variables
3. Voeg toe:
   - **Key:** `ENABLE_AUTO_SEND_TO_VERZEKERAAR`
   - **Value:** `true`
   - **Environment:** Production
4. Klik "Save"
5. Redeploy (of wacht op volgende deployment)

---

## ✅ Checklist VOOR je activeert

Zorg ervoor dat je dit EERST hebt gedaan:

### Database:
- [ ] `verzekeraars-schema.sql` gerund in Supabase
- [ ] Minimaal 20+ verzekeraars in database
- [ ] Test queries gerund (zie `VERZEKERAAR-AUTO-SEND-SETUP.md`)

### Environment Variables:
- [ ] `RESEND_API_KEY` correct ingesteld
- [ ] `RESEND_ADMIN_EMAIL` ingesteld
- [ ] `ANTHROPIC_API_KEY` werkt (AI agent)
- [ ] `GOOGLE_APPLICATION_CREDENTIALS_JSON` werkt (PDF generatie)

### Testing:
- [ ] Handmatige test met bekende verzekeraar (ANWB)
- [ ] Handmatige test met onbekende verzekeraar
- [ ] PDF generatie werkt
- [ ] Audit logs werken
- [ ] Email verzending werkt (Resend)

### Juridisch:
- [ ] Bedrijfsgegevens correct in emails
- [ ] `NEXT_PUBLIC_COMPANY_ADDRESS` ingesteld
- [ ] `NEXT_PUBLIC_COMPANY_KVK` ingesteld
- [ ] Email template gereviewd door juridisch adviseur (optioneel)

---

## 🧪 Test voordat je Live Gaat

### Stap 1: Enable in Development
```bash
# .env.local
ENABLE_AUTO_SEND_TO_VERZEKERAAR=true
```

### Stap 2: Test met Real Data
1. Dien test claim in met echte verzekeraar naam (bijv. "ANWB")
2. Check terminal logs:
```
✅ Verzekeraar gevonden: ANWB Verzekeringen (schade@anwb.nl)
📄 Genereren PDF aansprakelijkheidsbrief...
✅ PDF gegenereerd (45 KB)
📧 Versturen aansprakelijkheidsbrief naar verzekeraar: schade@anwb.nl
✅ Aansprakelijkheidsbrief verzonden naar verzekeraar!
```

### Stap 3: Verificatie
- Check Resend dashboard → Email verzonden?
- Check Supabase → Claim status = `aansprakelijkheidsbrief_verzonden`?
- Check audit logs → Email_sent log aanwezig?

### Stap 4: Test Escalatie
1. Dien claim in met onbekende verzekeraar ("Test Verzekering XYZ")
2. Check of escalatie email naar admin komt
3. Check of claim status = `escalated`

---

## 🔄 Rollback (Uitschakelen)

Als er problemen zijn:

### Vercel (Direct)
1. Vercel Dashboard → Settings → Environment Variables
2. Zoek `ENABLE_AUTO_SEND_TO_VERZEKERAAR`
3. Verander naar `false` OF verwijder de variabele
4. Redeploy

### Emergency (Super snel)
```bash
# In code:
# Wijzig in app/api/agent/route.ts regel ~315:
const AUTO_SEND_TO_VERZEKERAAR = false // Hard-coded disable
```

Commit en push → Instant disable na deployment!

---

## 📊 Monitoring na Activatie

### Eerste Uur:
```sql
-- Check hoeveel emails verzonden
SELECT COUNT(*) FROM audit_logs 
WHERE action_type = 'email_sent'
  AND details->>'email_type' = 'aansprakelijkheidsbrief_verzekeraar'
  AND created_at > NOW() - INTERVAL '1 hour';

-- Check voor errors
SELECT COUNT(*) FROM audit_logs 
WHERE action_type = 'escalatie'
  AND details->>'reden' LIKE '%Verzekeraar%'
  AND created_at > NOW() - INTERVAL '1 hour';
```

### Eerste Dag:
- Check Resend dashboard voor bounce rates
- Check admin inbox voor escalatie emails
- Monitor claim status updates

### Eerste Week:
```sql
-- Succes rate berekenen
SELECT 
    COUNT(*) FILTER (WHERE status = 'aansprakelijkheidsbrief_verzonden') as verzonden,
    COUNT(*) FILTER (WHERE status = 'escalated' AND escalatie_reden LIKE '%Verzekeraar%') as escalaties,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE status = 'aansprakelijkheidsbrief_verzonden') / 
        NULLIF(COUNT(*), 0)
    , 2) as succes_percentage
FROM claims
WHERE created_at > NOW() - INTERVAL '7 days';
```

---

## ⚠️ Waarschuwingen

### NIET activeren als:
- ❌ Database niet volledig (< 20 verzekeraars)
- ❌ Resend API niet getest
- ❌ PDF generatie niet werkt
- ❌ Je nog in development bent
- ❌ Email templates niet gereviewd

### WEL activeren als:
- ✅ Alle tests geslaagd
- ✅ Database compleet
- ✅ Je LIVE gaat in productie
- ✅ Admin monitoring setup (emails + dashboard)
- ✅ Rollback plan bekend

---

## 🎯 Wanneer Activeren?

**Aanbevolen moment:**
```
Deploy naar productie
    ↓
Test 1-2 dagen met feature DISABLED
    ↓
Monitor alle flows (audit logs, emails, etc.)
    ↓
Alles werkt? ✅
    ↓
Enable feature flag
    ↓
Monitor intensief eerste uur/dag/week
```

**Niet aanbevolen:**
- ❌ Direct bij eerste deployment
- ❌ Zonder testing
- ❌ 's Avonds/weekends (wees beschikbaar bij problemen)
- ❌ Zonder rollback plan

---

## 🆘 Support

### Feature werkt niet na enable?

1. **Check env var in Vercel:**
   ```bash
   # In Vercel terminal:
   echo $ENABLE_AUTO_SEND_TO_VERZEKERAAR
   # Should output: true
   ```

2. **Check terminal logs:**
   ```
   ⏭️ Skip verzending naar verzekeraar (feature flag disabled)
   ```
   → Env var niet correct!

3. **Force redeploy:**
   - Vercel Dashboard → Deployments → Latest → "Redeploy"

### Emails komen niet aan?

1. Check Resend logs
2. Check verzekeraar email in database
3. Check audit logs voor errors
4. Zie `VERZEKERAAR-AUTO-SEND-SETUP.md` → Troubleshooting

---

## 📚 Meer Info

- **Setup Guide:** `VERZEKERAAR-AUTO-SEND-SETUP.md`
- **Audit Systeem:** `AUDIT-SYSTEEM-UITLEG.md`
- **Code:** `app/api/agent/route.ts` (regel ~315)

---

## ✅ Ready Checklist

Print dit uit en vink af:

```
VOOR ACTIVATIE:
[ ] Database schema gerund
[ ] 20+ verzekeraars aanwezig
[ ] Resend werkt (test email verzonden)
[ ] PDF generatie werkt
[ ] Audit logs werken
[ ] Development test succesvol
[ ] Juridische review (optioneel)
[ ] Admin monitoring setup
[ ] Rollback plan bekend

DEPLOYMENT:
[ ] Code deployed naar productie
[ ] Feature flag nog DISABLED
[ ] 1-2 dagen monitoring
[ ] Geen kritieke bugs
[ ] Klaar voor activatie!

ACTIVATIE:
[ ] ENABLE_AUTO_SEND_TO_VERZEKERAAR=true gezet
[ ] Redeploy gedaan
[ ] Eerste test claim successful
[ ] Monitoring actief
[ ] Admin bereikbaar bij issues

NA 1 WEEK:
[ ] Geen kritieke issues
[ ] Succes rate > 80%
[ ] Admin feedback positief
[ ] Feature is stable! 🎉
```

---

**🚀 Veel succes met de lancering!**
