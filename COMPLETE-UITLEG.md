# 📘 Complete Uitleg voor Beginners

## Welkom bij je Auto Schade Applicatie!

Deze uitleg is speciaal voor jou als complete beginner. Ik leg alles stap-voor-stap uit in gewoon Nederlands.

---

## 🎯 Wat heb je gebouwd?

Je hebt nu een **professionele website** die mensen kunnen gebruiken om gratis hun autoschade te verhalen. Denk aan het als een digitale assistent die helpt bij het afhandelen van claims.

### Wat kan de website doen?

1. ✅ **Publieke Homepage** - Bezoekers lezen info over je dienst
2. ✅ **Claim Indienen** - Mensen vullen een formulier in met foto's
3. ✅ **OCR (Tekst herkenning)** - Automatisch gegevens uitlezen van foto's
4. ✅ **Account Systeem** - Inloggen met email of Google
5. ✅ **Dashboard** - Gebruikers zien hun claims
6. ✅ **Real-time Updates** - Status wijzigingen verschijnen automatisch
7. ✅ **PDF Generatie** - Download professionele brieven
8. ✅ **Voice Input** - Spreek je beschrijving in
9. ✅ **GDPR Compliant** - Privacy wetgeving correct toegepast

---

## 📁 Wat zijn al die mappen en bestanden?

Laat me je door de belangrijkste bestanden leiden:

### 🗂️ Hoofd mappen:

```
📁 app/                    → Al je webpagina's
📁 components/             → Herbruikbare stukjes code (zoals knoppen)
📁 lib/                    → Hulp functies (database, PDF maken, etc)
📁 database/               → Database structuur (tabellen)
📁 public/                 → Afbeeldingen en andere bestanden
```

### 📄 Belangrijke bestanden:

#### In de `app/` map:

- **page.tsx** → De homepage (wat bezoekers eerst zien)
- **layout.tsx** → De algemene opmaak (header, footer, etc)
- **globals.css** → Stijlen (kleuren, lettertypen)

#### In de `app/claim-indienen/` map:

- **page.tsx** → De claim indienen pagina

#### In de `app/dashboard/` map:

- **page.tsx** → Het gebruikers dashboard
- **claim/[id]/page.tsx** → Detail pagina van 1 claim

#### In de `components/` map:

- **claim-form.tsx** → Het grote formulier voor claims
- **file-upload.tsx** → Component om foto's te uploaden
- **ocr-upload.tsx** → Component met OCR functionaliteit
- **voice-input.tsx** → Spraak naar tekst knop
- **cookie-consent.tsx** → Privacy banner

#### In de `lib/` map:

- **supabase/client.ts** → Verbinding met database (browser)
- **supabase/server.ts** → Verbinding met database (server)
- **pdf-generator.ts** → Code om PDF brieven te maken
- **utils.ts** → Handige functies (datum opmaken, etc)

#### In de root:

- **middleware.ts** → Beveiliging (wie mag waar komen?)
- **package.json** → Lijst van alle gebruikte packages
- **.env.local** → Geheime keys (NOOIT delen!)

---

## 🔧 Hoe werkt het technisch?

### 1. Frontend (wat gebruikers zien)

**Next.js 15** is het framework. Dit is zoals een gereedschapskist voor websites.

**React** is de basis - het maakt interactieve pagina's.

**Tailwind CSS** zorgt voor de styling (kleuren, layout, etc).

### 2. Backend (de achterkant)

**Supabase** is je database. Het slaat alle gegevens op:
- Gebruikers accounts
- Claims (schadeclaims)
- Status updates

### 3. Authenticatie (inloggen)

Supabase Auth zorgt voor:
- Email/wachtwoord login
- Google OAuth login
- Wachtwoord reset
- Email verificatie

### 4. Database Structuur

In `database/schema.sql` staan 3 tabellen:

**claims** → Alle schade claims
- id, naam, email, telefoon
- kenteken tegenpartij
- datum ongeval, beschrijving
- status (nieuw, in behandeling, afgerond, etc)
- foto's en documenten

**user_profiles** → Extra user info
- Naam, telefoon, adres
- Notificatie voorkeuren

**claim_status_updates** → Geschiedenis
- Wanneer veranderde de status?
- Van welke status naar welke status?

### 5. Row Level Security (RLS)

Dit is **super belangrijk** voor veiligheid!

RLS zorgt ervoor dat:
- Gebruikers alleen hun **eigen** claims zien
- Niemand andermans data kan wijzigen
- De database zelf controleert wie wat mag

---

## 🎨 Hoe pas je de website aan?

### Kleuren veranderen

Open: `tailwind.config.ts`

```typescript
primary: "210 100% 50%",  // Dit is de hoofd kleur (blauw)
```

Wil je groen? Verander naar:
```typescript
primary: "142 76% 36%",  // Groen
```

Online kleur kiezen: https://tailwindcss.com/docs/customizing-colors

### Teksten aanpassen

Open: `app/page.tsx`

Zoek naar de H1 heading:
```typescript
<h1 className="text-4xl...">
  Gratis je Autoschade Verhalen op de Tegenpartij
</h1>
```

Verander de tekst tussen de `>` en `</h1>` tags.

### Logo toevoegen

1. Plaats je logo in `public/logo.png`
2. Open `app/layout.tsx`
3. Verander de Shield icoon naar:

```typescript
<Image src="/logo.png" alt="Logo" width={32} height={32} />
```

### Contact gegevens

Zoek in alle bestanden naar:
- `088-1234567` → Vervang met jouw telefoonnummer
- `info@gratisschadeverhalen.nl` → Vervang met jouw email

Je kunt zoeken met Ctrl+Shift+F in Cursor.

---

## 🚀 De Website Online Zetten (Deployment)

### Optie 1: Vercel (Gratis & Makkelijk)

1. **Maak GitHub account** (als je die nog niet hebt)
   - Ga naar: https://github.com
   - Sign up gratis

2. **Upload je code naar GitHub**
   - In Cursor: klik op Source Control (links)
   - Klik "Initialize Repository"
   - Commit je changes
   - Publish to GitHub

3. **Vercel Account**
   - Ga naar: https://vercel.com
   - Sign up met je GitHub account

4. **Importeer Project**
   - Klik "New Project"
   - Selecteer je GitHub repository
   - Klik "Import"

5. **Environment Variables toevoegen**
   - Kopieer je `.env.local` waardes
   - Plak in Vercel onder "Environment Variables"
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → Verander naar je Vercel URL

6. **Deploy**
   - Klik "Deploy"
   - Wacht 2-3 minuten
   - Klaar! Je website is live! 🎉

### Optie 2: Eigen Server

Voor gevorderden - hosting op VPS met Node.js.

---

## 🔐 Beveiliging Checklist

✅ **Environment Variables**
- Nooit `.env.local` delen of committen naar GitHub
- Gebruik `.gitignore` (is al ingesteld)

✅ **Supabase RLS**
- Row Level Security is ingesteld
- Gebruikers kunnen alleen hun eigen data zien

✅ **HTTPS**
- Vercel geeft automatisch HTTPS
- Altijd gebruiken in productie

✅ **Input Validatie**
- Email format wordt gecheckt
- Required fields zijn verplicht

✅ **GDPR/AVG**
- Cookie consent banner
- Privacy pagina aanwezig
- Data deletion mogelijk

---

## 📊 Database Beheren

### Via Supabase Dashboard:

1. Log in op https://supabase.com
2. Selecteer je project
3. Klik "Table Editor" links

Hier zie je:
- Alle claims
- Alle gebruikers
- Status updates

### Handmatig een claim toevoegen:

1. Ga naar Table Editor
2. Selecteer `claims` tabel
3. Klik "Insert row"
4. Vul velden in
5. Klik "Save"

### Data exporteren:

1. Ga naar SQL Editor
2. Run query:
```sql
SELECT * FROM claims;
```
3. Klik "Download as CSV"

---

## 🐛 Veelvoorkomende Problemen & Oplossingen

### "Module not found"
```bash
npm install
```
Dit installeert alle packages opnieuw.

### "Supabase client error"
Check je `.env.local`:
- Staan de juiste URL en KEY erin?
- Geen spaties voor of na de waardes?

### "Can't connect to database"
1. Check Supabase project status
2. Is je database actief?
3. Check RLS policies (zijn ze enabled?)

### "OCR works slow"
OCR (Tesseract) is intensief:
- Kleinere afbeeldingen uploaden
- Goede kwaliteit foto's gebruiken
- Voor productie: overweeg cloud OCR (Google Vision)

### "Real-time updates not working"
1. Check Supabase Realtime settings
2. Is Realtime enabled voor je tabel?
3. Check browser console voor errors

### "PDF download fails"
- Check browser console
- jsPDF library correct geïnstalleerd?
- Run: `npm install jspdf`

---

## 📈 Uitbreidingen voor Later

Wanneer je meer ervaring hebt:

### 1. Email Notificaties
- Gebruik Resend.com of SendGrid
- Verstuur emails bij status wijzigingen
- Stuur bevestigingsmails

### 2. Admin Dashboard
- Aparte pagina voor beheerders
- Overzicht van alle claims
- Claims goedkeuren/afwijzen

### 3. Betaling Integratie
- Mollie of Stripe toevoegen
- Voor "premium" features
- Eigen risico bijbetaling

### 4. Beter OCR
- Google Cloud Vision API
- Hogere nauwkeurigheid
- Meer talen

### 5. Notificaties
- Push notifications
- WhatsApp updates
- SMS berichten

### 6. Analytics
- Google Analytics toevoegen
- Conversie tracking
- User behavior tracking

---

## 📚 Waar kan je meer leren?

### Video Tutorials (Nederlands):

- **Codebazen** (YouTube) - Next.js tutorials
- **DevDuck** (YouTube) - React voor beginners
- **Codercise** (YouTube) - Full-stack development

### Online Cursussen (Engels):

- **freeCodeCamp.org** - Gratis, volledig
- **The Odin Project** - Gratis web development
- **Scrimba** - Interactief leren

### Documentatie:

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

### Communities:

- **Reddit**: r/webdev, r/nextjs
- **Discord**: Next.js Discord, Reactiflux
- **Stack Overflow**: Voor specifieke vragen

---

## ✅ Volgende Stappen

1. **Run de applicatie lokaal**
   ```bash
   npm install
   npm run dev
   ```

2. **Setup Supabase** (volg SETUP-INSTRUCTIES.md)

3. **Test alle features**
   - Claim indienen
   - Account aanmaken
   - Inloggen
   - Dashboard bekijken
   - PDF downloaden

4. **Pas aan naar jouw wensen**
   - Logo
   - Kleuren
   - Teksten
   - Contact info

5. **Deploy naar Vercel**

6. **Promoot je website!**

---

## 🎉 Gefeliciteerd!

Je hebt nu een complete, production-ready web applicatie!

Dit is een geweldige prestatie, vooral als beginner.

**Wat heb je geleerd:**
- Next.js & React
- TypeScript
- Database design
- Authenticatie
- File uploads
- OCR technologie
- PDF generatie
- Real-time updates
- Security best practices

**Keep learning en veel succes! 🚀**

---

## 📞 Hulp Nodig?

Stuck? Vragen? Check:

1. **SETUP-INSTRUCTIES.md** → Stap-voor-stap setup
2. **README.md** → Project overzicht
3. **Google** → Zoek je error message
4. **ChatGPT/Claude** → Vraag om uitleg
5. **Stack Overflow** → Community hulp

**Pro tip:** Als je een error krijgt, kopieer de error message en google deze met "next.js" ervoor. Meestal vind je de oplossing snel!

---

**Gemaakt met ❤️ voor beginners**

Versie 1.0 - Januari 2026
