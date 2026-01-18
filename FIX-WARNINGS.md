# 🚀 Quick Fix Guide - Verhelp Warnings

Deze guide helpt je om alle warnings in de terminal te fixen.

---

## ✅ Fix 1: AI Notes SQL Functie

**Probleem:**
```
❌ Failed to save AI notes: Could not find the function public.update_claim_with_ai_notes
```

**Oplossing:**

1. Open Supabase Dashboard → SQL Editor
2. Run dit script: `database/create-update-function.sql`
3. Of kopieer en plak deze SQL:

```sql
CREATE OR REPLACE FUNCTION update_claim_with_ai_notes(
  claim_id uuid,
  letsel_flag boolean,
  letsel_keywords text[],
  new_status text,
  notes text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE claims
  SET 
    mogelijk_letselschade = letsel_flag,
    letselschade_keywords = letsel_keywords,
    status = new_status,
    ai_notes = notes,
    updated_at = now()
  WHERE id = claim_id;
END;
$$;

GRANT EXECUTE ON FUNCTION update_claim_with_ai_notes(uuid, boolean, text[], text, text) TO authenticated, anon;
```

4. Klik **Run**
5. Restart je server: `Ctrl+C` en `npm run dev`

---

## ✅ Fix 2: Vercel Blob Storage (Optioneel)

**Probleem:**
```
Blob upload failed: No token found. Configure BLOB_READ_WRITE_TOKEN
```

**Wanneer nodig:**
- Alleen voor **production deployment**
- Lokaal ontwikkelen werkt zonder

**Oplossing (voor production):**

1. Ga naar Vercel Dashboard
2. Ga naar **Storage** → **Create Database** → **Blob**
3. Connect blob storage aan je project
4. Kopieer de `BLOB_READ_WRITE_TOKEN`
5. Voeg toe aan `.env.local`:
```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

**Voor nu:** Negeer deze warning, OCR werkt perfect zonder!

---

## ✅ Fix 3: Resend Email Domein

**Probleem:**
```
❌ Email send error: The gratisschadeverhalen.nl domain is not verified
```

**Oplossing A: Development (Makkelijk)**

✅ **Al gefixed!** De app gebruikt nu automatisch `onboarding@resend.dev` in development mode.

Test nu opnieuw een claim en je zou emails moeten ontvangen!

**Oplossing B: Production (Voor later)**

1. Ga naar https://resend.com/domains
2. Klik **Add Domain**
3. Voer in: `gratisschadeverhalen.nl`
4. Voeg DNS records toe bij je domein provider:
   - SPF (TXT record)
   - DKIM (CNAME records)
5. Klik **Verify**
6. Wacht 5-10 minuten voor propagatie

---

## 🧪 Test Alles

1. **Restart server:**
```bash
# Stop huidige server (Ctrl+C)
npm run dev
```

2. **Test claim indienen:**
   - Ga naar http://localhost:3000/claim-indienen
   - Upload schadeformulier
   - Vul gegevens in
   - Submit

3. **Check terminal:**
   - ✅ AI notes opgeslagen
   - ✅ Email verzonden
   - ✅ Geen errors

---

## 📊 Status Checklist

- [ ] SQL functie aangemaakt in Supabase
- [ ] Server herstart
- [ ] Test claim ingediend
- [ ] AI notes succesvol opgeslagen (check terminal)
- [ ] Email succesvol verzonden (check inbox)
- [ ] Geen errors in terminal

---

## 🎉 Klaar!

Alle kritieke warnings zijn nu gefixed. De app werkt volledig lokaal!

**Volgende stappen:**
1. Deploy naar Vercel (production)
2. Configureer Blob storage voor file uploads
3. Verifieer domein bij Resend voor branded emails
