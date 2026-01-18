# 📧 Email Automation Setup Guide

Deze guide helpt je om email automation in te stellen met **Resend**.

---

## 🎯 Wat Heb Je Nodig?

1. **Resend Account** (gratis tier: 3000 emails/maand)
2. **API Key**
3. **Geverifieerd domein** (optioneel, maar aanbevolen)

---

## 📝 Stap 1: Maak een Resend Account

1. Ga naar: https://resend.com
2. Klik **"Sign Up"**
3. Registreer met je email
4. Verifieer je email

---

## 🔑 Stap 2: Genereer API Key

1. Log in op Resend dashboard
2. Ga naar **"API Keys"** in het menu
3. Klik **"Create API Key"**
4. Geef een naam: `Gratisschadeverhalen Production`
5. Selecteer **"Full Access"**
6. Klik **"Create"**
7. **Kopieer de API key** (je ziet hem maar 1 keer!)

Voorbeeld: `re_123abc456def789ghi012jkl345mno678`

---

## 🌐 Stap 3: Domein Verificatie (Optioneel maar Aanbevolen)

### **Waarom?**
- Hogere deliverability
- Geen "via resend.dev" in emails
- Professionelere uitstraling

### **Hoe?**
1. Ga naar **"Domains"** in Resend dashboard
2. Klik **"Add Domain"**
3. Voer je domein in: `gratisschadeverhalen.nl`
4. Voeg DNS records toe bij je domein provider:
   - **TXT record** voor SPF
   - **CNAME records** voor DKIM
5. Klik **"Verify Domain"**
6. Wacht 5-10 minuten voor DNS propagatie

---

## ⚙️ Stap 4: Configureer .env.local

Voeg toe aan je `.env.local`:

```bash
# Resend Email
RESEND_API_KEY=re_jouw_api_key_hier
```

**LET OP:**
- Geen spaties
- Geen aanhalingstekens
- Vervang `re_jouw_api_key_hier` met je echte API key

---

## 🧪 Stap 5: Test Email Sending

### **Optie A: Via Terminal**
```bash
# Start dev server
npm run dev

# Submit een test claim via de website
# Check terminal voor:
# ✅ Email verzonden naar: [email]
# 📧 Email ID: [id]
```

### **Optie B: Via Resend Dashboard**
1. Ga naar **"Logs"** in Resend dashboard
2. Je ziet alle verzonden emails
3. Klik op een email om details te zien

---

## 📋 Email Types

De app verstuurt 3 soorten emails:

### **1. Claim Ontvangen Email**
- **Naar:** Claimer
- **Wanneer:** Direct na claim submit
- **Inhoud:** Bevestiging + claim ID

### **2. Letselschade Waarschuwing Email**
- **Naar:** Claimer
- **Wanneer:** AI detecteert letselschade keywords
- **Inhoud:** Waarschuwing + link naar Unitas

### **3. Admin Notificatie Email**
- **Naar:** Admin (jouw email)
- **Wanneer:** Nieuwe claim binnenkomt
- **Inhoud:** Claim details + link naar dashboard

---

## 🔧 Veelgestelde Problemen

### **❌ Error: API key is invalid**
**Oplossing:**
1. Check of API key correct is gekopieerd
2. Geen spaties aan begin/einde
3. Genereer nieuwe API key als nodig

### **❌ Error: 403 Forbidden**
**Oplossing:**
- Je hebt geen "Full Access" API key
- Maak nieuwe key met volledige rechten

### **❌ Emails komen niet aan**
**Check:**
1. Spam folder
2. Resend Logs (dashboard)
3. Domein verificatie status
4. Email syntax (geldig email adres?)

---

## 📊 Resend Limieten (Gratis Tier)

- **3,000 emails/maand**
- **100 emails/dag**
- **1 email/seconde**

Voor meer: upgrade naar Pro ($20/maand = 50,000 emails)

---

## ✅ Verificatie Checklist

- [ ] Resend account aangemaakt
- [ ] API key gegenereerd
- [ ] API key in `.env.local`
- [ ] Server herstart (`npm run dev`)
- [ ] Test claim ingediend
- [ ] Email ontvangen
- [ ] Terminal toont success logs

---

## 🎉 Klaar!

Je email automation werkt nu! Elke nieuwe claim triggert automatisch emails naar de claimer en admin.

**Volgende stap:** Check `OCR-SETUP.md` voor OCR configuratie.
