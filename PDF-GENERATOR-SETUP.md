# 📄 PDF Generator Setup Guide

Deze guide legt uit hoe de PDF Aansprakelijkheidsbrief Generator werkt.

---

## ✅ Wat Is Ingebouwd?

De PDF generator is **al volledig geconfigureerd** en werkt out-of-the-box!

### **Features:**
- ✅ Professionele header met bedrijfsgegevens
- ✅ KvK, BTW, IBAN informatie
- ✅ Gepersonaliseerde aanhef (naam tegenpartij)
- ✅ OCR ruis filtering (leesbare tekst only)
- ✅ Buitengerechtelijke incassokosten clausule
- ✅ Professionele afsluiting met directeur naam
- ✅ Automatische text wrapping
- ✅ Nederlandse datum formatting

---

## 🎯 Hoe Het Werkt

### **Flow:**
```
1. Claim succesvol ingediend
   ↓
2. Success pagina toont "Download Brief" button
   ↓
3. User klikt button
   ↓
4. API genereert PDF met claim data
   ↓
5. PDF wordt gedownload (client-side)
```

---

## 📋 PDF Inhoud

### **Header:**
- Bedrijfsnaam: GRATIS SCHADEVERHALEN
- KvK: 12345678
- BTW: NL123456789B01
- IBAN: NL12ABCD3456789012

### **Aanhef:**
- Als naam tegenpartij bekend: "Geachte heer/mevrouw [Naam],"
- Anders: "Geachte heer/mevrouw,"

### **Secties:**
1. **Gegevens Ongeval**
   - Datum
   - Plaats
   - Kenteken benadeelde (VERPLICHT VELD!)
   - Kenteken tegenpartij

2. **Toedracht**
   - Gefilterde beschrijving (OCR ruis weg)
   - Max 500 karakters
   - Leesbare tekst only

3. **Aansprakelijkstelling**
   - Formele tekst
   - 14 dagen termijn
   - Incassokosten clausule (NIEUW!)

4. **Geschatte Schade**
   - Bedrag (indien opgegeven)

5. **Verzoek tot Actie**
   - 3 concrete punten
   - Juridische waarschuwing

6. **Afsluiting**
   - "Hoogachtend,"
   - "Namens Gratis Schadeverhalen"
   - "Gert Jan van Straalen - Directeur"
   - Contactgegevens

---

## 🛠️ Aanpassen van Bedrijfsgegevens

### **Bestand:** `lib/pdf/letter-generator.ts`

**Wijzig deze regels:**

```typescript
// HEADER (regel ~50)
page.drawText('KvK: 12345678 | BTW: NL123456789B01', { ... })
page.drawText('IBAN: NL12ABCD3456789012', { ... })

// AFSLUITING (regel ~250)
page.drawText('Gert Jan van Straalen - Directeur', { ... })
```

**Vervang met jouw gegevens:**
- KvK nummer
- BTW nummer
- IBAN
- Directeur naam

---

## 🔧 Veelgestelde Vragen

### **❓ Waarom staat "VERPLICHT VELD" bij kenteken benadeelde?**
**Antwoord:** Het veld `kenteken_claimer` ontbreekt nog in het formulier. Dit is de **volgende prioriteit** om toe te voegen!

**Fix:**
1. Voeg `kenteken_claimer` toe aan claim formulier
2. Maak het verplicht
3. Update database insert in `submit-claim.ts`

---

### **❓ Hoe filter ik OCR ruis?**
**Antwoord:** De PDF generator doet dit automatisch:

```typescript
// Verwijdert:
- "OCR geextraheerde tekst:"
- Bulgaarse/Cyrillische karakters
- Dubbele spaties/enters
- Non-ASCII karakters

// Beperkt:
- Max 500 karakters
```

---

### **❓ Kan ik een logo toevoegen?**
**Antwoord:** Ja! Voeg dit toe:

```typescript
// In letter-generator.ts, na het laden van fonts:
const logoBytes = await fetch('/logo.png').then(r => r.arrayBuffer())
const logoImage = await pdfDoc.embedPng(logoBytes)

// Teken logo:
page.drawImage(logoImage, {
  x: 50,
  y: height - 80,
  width: 100,
  height: 40,
})
```

---

## 🧪 Testen

### **Stap 1: Submit een claim**
```bash
npm run dev
# Ga naar http://localhost:3000/claim-indienen
# Vul formulier in
# Submit
```

### **Stap 2: Download PDF**
```
1. Na success → Klik "Download Brief"
2. Check Downloads folder
3. Open PDF
4. Verifieer alle velden
```

### **Check:**
- [ ] Header met bedrijfsgegevens
- [ ] Gepersonaliseerde aanhef
- [ ] Correcte ongevalgegevens
- [ ] Leesbare toedracht (geen OCR ruis)
- [ ] Incassokosten clausule
- [ ] Correcte afsluiting met jouw naam

---

## ⚠️ Bekende Issues

### **Issue 1: Kenteken Benadeelde = "VERPLICHT VELD"**
**Status:** Nog niet in formulier
**Prioriteit:** Hoog
**Fix:** Voeg veld toe aan claim-form.tsx

### **Issue 2: Non-ASCII karakters crashen PDF**
**Status:** Opgelost
**Fix:** Alle non-ASCII karakters worden gefilterd

### **Issue 3: Datum format**
**Status:** Opgelost  
**Fix:** Nederlandse datum format (`1 januari 2025`)

---

## 🎨 Styling Aanpassen

### **Kleuren:**
```typescript
// In letter-generator.ts
const primaryColor = rgb(0.4, 0.49, 0.92)  // Blauw
const textColor = rgb(0.2, 0.2, 0.2)       // Donkergrijs
const grayColor = rgb(0.5, 0.5, 0.5)       // Lichtgrijs
```

### **Fonts:**
```typescript
const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

// Andere opties:
// - StandardFonts.TimesRoman
// - StandardFonts.Courier
```

---

## 📦 Dependencies

De PDF generator gebruikt:
- **pdf-lib** - PDF generatie
- **StandardFonts** - Ingebouwde fonts (geen externe files)

Geen extra setup nodig! 

---

## ✅ Checklist

- [x] PDF generator geïnstalleerd
- [x] API route geconfigureerd
- [x] Download button component
- [x] OCR ruis filtering
- [x] Incassokosten clausule
- [ ] Kenteken benadeelde veld toevoegen (VOLGENDE STAP)
- [ ] Bedrijfsgegevens aanpassen (optioneel)
- [ ] Logo toevoegen (optioneel)

---

## 🎉 Klaar!

De PDF generator werkt! Elke claim kan nu een professionele aansprakelijkheidsbrief downloaden.

**Volgende prioriteit:** Voeg `kenteken_benadeelde` toe aan het formulier!
