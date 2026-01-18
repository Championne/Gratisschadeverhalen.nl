# 🔍 Google Cloud Vision OCR Setup Guide

Complete handleiding voor het instellen van Google Cloud Vision API voor OCR (Optical Character Recognition).

---

## 🎯 Wat Heb Je Nodig?

1. **Google Cloud Account** (gratis tier: 1000 OCR requests/maand)
2. **Google Cloud Project**
3. **Cloud Vision API enabled**
4. **Service Account met JSON key**

---

## 📝 Stap 1: Google Cloud Account Aanmaken

1. Ga naar: https://console.cloud.google.com
2. Klik **"Get Started for Free"**
3. Log in met je Google account
4. Accepteer de voorwaarden
5. Voeg een betaalmethode toe (geen kosten voor free tier!)

---

## 🏗️ Stap 2: Nieuw Project Aanmaken

1. Klik op project dropdown (top-left)
2. Klik **"New Project"**
3. Project naam: `Gratisschadeverhalen`
4. Klik **"Create"**
5. Wacht tot project is aangemaakt
6. Selecteer het nieuwe project

---

## 🔌 Stap 3: Vision API Activeren

1. Ga naar **"APIs & Services"** → **"Library"**
2. Zoek: `Cloud Vision API`
3. Klik op **"Cloud Vision API"**
4. Klik **"Enable"**
5. Wacht 1-2 minuten

---

## 🔑 Stap 4: Service Account Aanmaken

### **4a. Navigeer naar Service Accounts**
1. Ga naar **"IAM & Admin"** → **"Service Accounts"**
2. Klik **"Create Service Account"**

### **4b. Account Details**
- **Name:** `gratisschadeverhalen-ocr`
- **ID:** (auto-generated)
- **Description:** `OCR service for damage forms`
- Klik **"Create and Continue"**

### **4c. Grant Access**
- **Role:** Selecteer **"Cloud Vision AI Service Agent"**
- Klik **"Continue"**
- Klik **"Done"**

---

## 📥 Stap 5: JSON Key Downloaden

1. In de Service Accounts lijst, klik op je nieuwe service account
2. Ga naar het **"Keys"** tabblad
3. Klik **"Add Key"** → **"Create New Key"**
4. Selecteer **"JSON"**
5. Klik **"Create"**
6. De key wordt gedownload: `gratisschadeverhalen-xxxx.json`

**⚠️ BELANGRIJK:**
- Bewaar dit bestand veilig!
- Voeg NOOIT toe aan Git!
- Verwijder als gestolen!

---

## ⚙️ Stap 6: Configuratie

Je hebt **2 opties** voor configuratie:

### **Optie A: JSON String in Environment Variable (AANBEVOLEN voor Vercel)**

1. Open de JSON file
2. Kopieer de HELE inhoud
3. Voeg toe aan `.env.local`:

```bash
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
```

**LET OP:**
- Gebruik single quotes `'...'`
- Hele JSON op 1 regel
- Geen enters in de JSON

### **Optie B: JSON File Path (Voor Lokaal)**

1. Plaats de JSON file in je project root
2. Hernoem naar: `google-credentials.json`
3. Voeg toe aan `.env.local`:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
```

4. Check dat het in `.gitignore` staat:

```
# In .gitignore
google-credentials.json
*.json
```

---

## 🧪 Stap 7: Testen

### **Test 1: API Health Check**
```bash
# Start server
npm run dev

# Open browser
http://localhost:3000/api/ocr

# Verwacht resultaat:
{
  "status": "online",
  "configured": true,
  "authMethod": "Service Account (JSON)",
  "provider": "Google Cloud Vision",
  "message": "OCR service is beschikbaar"
}
```

### **Test 2: Upload Test**
1. Ga naar: http://localhost:3000/claim-indienen
2. Upload een Europees Schadeformulier
3. Check terminal:
   ```
   🔍 OCR start: schadeformulier.jpg (120 KB)
   ✅ OCR succesvol: [extracted text...]
   ```

---

## 🔧 Veelgestelde Problemen

### **❌ Error: invalid_grant**
**Oplossing:**
- JSON key is expired of invalid
- Genereer nieuwe key
- Update `.env.local`
- Restart server

### **❌ Error: Permission denied**
**Oplossing:**
- Service Account heeft geen juiste rol
- Ga naar IAM & Admin
- Voeg rol toe: **"Cloud Vision AI Service Agent"**

### **❌ Error: API not enabled**
**Oplossing:**
- Vision API nog niet geactiveerd
- Ga naar APIs & Services → Library
- Enable Cloud Vision API
- Wacht 5 minuten

### **❌ Error: Quota exceeded**
**Oplossing:**
- Free tier limiet bereikt (1000/maand)
- Check quota: APIs & Services → Quotas
- Upgrade naar betaald account of wacht tot volgende maand

---

## 💰 Kosten & Limieten

### **Free Tier (Altijd Gratis):**
- **1,000 requests/maand**
- €0 kosten
- Geen credit card vereist na free trial

### **Daarna:**
- **$1.50 per 1,000 requests**
- Eerste 1,000 blijven gratis
- Pas als je meer dan 1,000/maand doet

### **Voorbeeld Kosten:**
- 50 claims/maand → €0 (binnen free tier)
- 2,000 claims/maand → ~€1.50
- 10,000 claims/maand → ~€13.50

**TIP:** Monitor je usage in Google Cloud Console!

---

## 📊 OCR Kwaliteit Verbeteren

### **Tips voor Betere Resultaten:**

1. **Foto Kwaliteit:**
   - Goede belichting
   - Scherpe foto
   - Rechtstreeks van boven
   - Geen schaduwen

2. **File Format:**
   - JPG of PNG (geen PDF voor nu)
   - Max 10MB
   - Min 640px breed

3. **Document Type:**
   - Europees Schadeformulier werkt het best
   - Nederlandse tekst = hoge accuracy
   - Handschrift = lagere accuracy

---

## 🔐 Security Best Practices

### **DO:**
- ✅ Gebruik environment variables
- ✅ JSON key in `.gitignore`
- ✅ Verschillende keys voor dev/prod
- ✅ Rotate keys elke 90 dagen

### **DON'T:**
- ❌ Commit JSON key naar Git
- ❌ Share JSON key via email
- ❌ Gebruik production key lokaal
- ❌ Hardcode credentials in code

---

## 🚀 Production Deployment (Vercel)

### **Stap 1: Vercel Environment Variables**
1. Ga naar Vercel Dashboard
2. Select je project
3. Ga naar **"Settings"** → **"Environment Variables"**
4. Add new:
   - **Name:** `GOOGLE_APPLICATION_CREDENTIALS_JSON`
   - **Value:** [Paste hele JSON content]
   - **Environment:** Production
5. Klik **"Save"**

### **Stap 2: Redeploy**
```bash
git push origin main
# Of via Vercel dashboard: Deployments → Redeploy
```

---

## ✅ Verificatie Checklist

- [ ] Google Cloud account aangemaakt
- [ ] Project aangemaakt
- [ ] Vision API enabled
- [ ] Service Account aangemaakt
- [ ] JSON key gedownload
- [ ] Key in `.env.local` (JSON string of path)
- [ ] Key in `.gitignore`
- [ ] Server herstart
- [ ] Health check succesvol (http://localhost:3000/api/ocr)
- [ ] Test upload succesvol
- [ ] OCR data zichtbaar in terminal

---

## 📚 Extra Resources

- **Google Cloud Vision Docs:** https://cloud.google.com/vision/docs
- **Pricing Calculator:** https://cloud.google.com/products/calculator
- **API Quotas:** https://console.cloud.google.com/apis/api/vision.googleapis.com/quotas

---

## 🎉 Klaar!

Je OCR werkt nu! Upload een Europees Schadeformulier en zie de magie gebeuren.

**Volgende stap:** Check `EMAIL-SETUP.md` voor email configuratie.
