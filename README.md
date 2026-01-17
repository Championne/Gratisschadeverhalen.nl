# Gratisschadeverhalen.nl

Een professionele Nederlandse web applicatie voor het gratis verhalen van materiële autoschade (WA tegenpartij claims).

## 🚀 Snel Starten (Voor Beginners)

### Stap 1: Installeer Node.js
Download en installeer Node.js van: https://nodejs.org/ (kies de LTS versie)

### Stap 2: Installeer Dependencies
Open een terminal in deze map en run:
```bash
npm install
```

Dit installeert alle benodigde packages (kan 2-5 minuten duren).

### Stap 3: Supabase Account Aanmaken
1. Ga naar https://supabase.com
2. Maak een gratis account aan
3. Maak een nieuw project aan
4. Kopieer de Project URL en Anon Key
5. Maak een `.env.local` bestand (kopieer van `.env.example`)
6. Vul je Supabase gegevens in

### Stap 4: Database Opzetten
1. Open je Supabase dashboard
2. Ga naar SQL Editor
3. Kopieer de inhoud van `database/schema.sql`
4. Plak en voer uit in de SQL Editor

### Stap 5: Start de Applicatie
```bash
npm run dev
```

Open je browser op: http://localhost:3000

## 📁 Project Structuur

```
├── app/                    # Next.js App Router pagina's
│   ├── (public)/          # Publieke pagina's (homepage, etc)
│   ├── (auth)/            # Authenticatie pagina's
│   └── dashboard/         # Beveiligde dashboard pagina's
├── components/            # Herbruikbare UI componenten
├── lib/                   # Hulp functies (Supabase, utils)
├── database/              # SQL schema en migraties
└── public/                # Statische bestanden (afbeeldingen, etc)
```

## 🛠️ Tech Stack

- **Next.js 15** - React framework met App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Mooie UI componenten
- **Supabase** - Backend (database, auth, real-time)
- **Tesseract.js** - OCR voor schadeformulieren
- **jsPDF** - PDF generatie

## 📝 Features

✅ SEO-geoptimaliseerde publieke pagina's
✅ Schade indienen formulier met foto uploads
✅ OCR voor Europees Schadeformulier
✅ AI screening voor letselschade detectie
✅ Email/wachtwoord + Google OAuth login
✅ Gebruikers dashboard met real-time updates
✅ Voice input voor beschrijvingen
✅ PDF download van aansprakelijkheidsbrief
✅ GDPR compliant met consent banner

## 🔒 Beveiliging

- Row Level Security (RLS) op database niveau
- Server-side validatie met Zod
- Protected routes via middleware
- HTTPS verplicht in productie
- Geen opslag van gevoelige data zonder consent

## 📞 Support

Voor vragen, open een issue op GitHub.
