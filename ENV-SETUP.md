# 🔐 Environment Variables Setup

## Required Environment Variables

Copy these to your `.env.local` file and Vercel environment variables:

```bash
# =============================================
# SUPABASE (Database & Auth)
# =============================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change to production URL

# =============================================
# RESEND (Email Service)
# =============================================
RESEND_API_KEY=re_your_api_key

# ⚠️ NIEUW: Admin email voor escalatie notificaties
RESEND_ADMIN_EMAIL=admin@gratisschadeverhalen.nl  # ← VERVANG MET ECHTE EMAIL!

# =============================================
# ANTHROPIC (AI Agent - Claude)
# =============================================
ANTHROPIC_API_KEY=sk-ant-your-api-key

# =============================================
# GOOGLE CLOUD VISION (OCR)
# =============================================
# Option 1: JSON credentials (recommended for Vercel)
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'

# Option 2: File path (for local development)
# GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json

# =============================================
# VERCEL BLOB (File Storage)
# =============================================
# Auto-configured by Vercel when you add Blob storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

---

## 🆕 Nieuwe Variabelen (Audit & Escalatie Systeem)

### `RESEND_ADMIN_EMAIL`
**Purpose:** Email adres waar escalatie notificaties naartoe worden gestuurd.

**When triggered:**
- OCR confidence < 70%
- AI confidence < 70%
- Onvolledige tegenpartij gegevens
- Manual escalation

**Example:**
```bash
RESEND_ADMIN_EMAIL=gert.jan@gratisschadeverhalen.nl
```

**⚠️ BELANGRIJK:**
- Gebruik een echte email die je controleert!
- Test escalatie emails gaan hierheen
- Productie escalaties gaan hierheen

**Testing:**
Voordat je live gaat, test met een test email:
```bash
RESEND_ADMIN_EMAIL=test+escalations@your-domain.com
```

---

## 📝 Setup Instructions

### Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in all values (use test values where needed)
3. Run `npm run dev`

### Vercel Deployment
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add all variables listed above
3. Select: Production, Preview, Development
4. Deploy!

---

## ✅ Verification

Check if all variables are loaded:
```bash
# Terminal
npm run dev

# Check logs for:
✅ Vision client initialized
✅ Supabase client ready
✅ Resend configured
```

Test escalatie email:
```bash
# Trigger een test escalatie (lage OCR confidence)
# Check je inbox op RESEND_ADMIN_EMAIL
```

---

## 🔒 Security Notes

- **NEVER** commit `.env.local` to git (already in `.gitignore`)
- Rotate keys regularly (especially API keys)
- Use different keys for development/production
- Keep `RESEND_ADMIN_EMAIL` private (no spam)

---

## 📞 Support

**Missing variables error?**
→ Check spelling in `.env.local` and Vercel

**Email not working?**
→ Verify `RESEND_API_KEY` and `RESEND_ADMIN_EMAIL`

**OCR not working?**
→ Check `GOOGLE_APPLICATION_CREDENTIALS_JSON` format

---

**Last updated:** 16 januari 2026  
**Version:** 1.1 (Added RESEND_ADMIN_EMAIL)
