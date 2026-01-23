# 🚀 Partner Setup Guide - Autoschadebureau.nl

Welkom! Deze guide helpt je om het project lokaal te draaien op je computer.

## 📋 Wat je nodig hebt

- ✅ GitHub account (al gedaan - je bent toegevoegd als collaborator)
- ✅ Vercel account (check je email voor de invite)
- ✅ Node.js geïnstalleerd (versie 18 of hoger)
- ✅ Git geïnstalleerd
- ✅ Code editor (bijv. VS Code of Cursor)

---

## 🔧 Stap 1: Accepteer Vercel Invite

1. **Check je email** voor een invite van Vercel
2. **Klik op de link** in de email
3. **Accepteer de invite**
4. Je hebt nu toegang tot het project en alle environment variables!

---

## 💻 Stap 2: Clone de Repository

Open je terminal/command prompt en voer uit:

```bash
# Clone het project
git clone https://github.com/Championne/Gratisschadeverhalen.nl.git

# Ga naar de project folder
cd Gratisschadeverhalen.nl
```

---

## 📦 Stap 3: Installeer Dependencies

```bash
npm install
```

Dit installeert alle benodigde packages (Next.js, React, Supabase, etc.)

---

## 🔐 Stap 4: Download Environment Variables (BELANGRIJK!)

Dit is de **veiligste manier** om de environment variables te krijgen:

### **4a. Installeer Vercel CLI**

```bash
npm install -g vercel
```

### **4b. Login bij Vercel**

```bash
vercel login
```

Volg de instructies in je browser om in te loggen.

### **4c. Link het Project**

```bash
vercel link
```

Beantwoord de vragen als volgt:
- **Set up?** → Kies **"Link to existing project"**
- **Link to?** → Kies **Championne/Gratisschadeverhalen.nl** (of autoschadebureau)
- **Linked!** → Je bent nu verbonden

### **4d. Download Environment Variables**

```bash
vercel env pull .env.local
```

Dit download automatisch **alle environment variables** (Supabase keys, API keys, etc.) naar `.env.local` in je project folder.

✅ **Klaar!** Je hebt nu alle benodigde credentials zonder dat Gert Jan deze handmatig hoeft te delen.

---

## 🚀 Stap 5: Start Development Server

```bash
npm run dev
```

Open je browser en ga naar: **http://localhost:3000**

Je zou nu de website lokaal moeten zien draaien! 🎉

---

## 🔄 Dagelijkse Workflow

### **Voordat je begint te werken:**

```bash
# Haal altijd eerst de laatste wijzigingen op
git pull origin main
```

### **Als je een nieuwe feature bouwt:**

```bash
# 1. Maak een nieuwe branch
git checkout -b feat/jouw-feature-naam

# 2. Werk aan je feature
# ... maak wijzigingen in de code ...

# 3. Test lokaal
npm run dev

# 4. Commit je wijzigingen
git add .
git commit -m "feat: beschrijving van je wijziging"

# 5. Push naar GitHub
git push origin feat/jouw-feature-naam

# 6. Maak een Pull Request op GitHub
# Ga naar: https://github.com/Championne/Gratisschadeverhalen.nl/pulls
# Klik op "New Pull Request"
# Selecteer je branch en klik "Create Pull Request"
```

### **Pull Request Workflow:**

- ✅ Jij of Gert Jan reviewt de code
- ✅ Merge naar `main` branch
- ✅ Vercel deployt automatisch naar production!

---

## 📁 Project Structuur

```
Gratisschadeverhalen.nl/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Homepage
│   ├── claim-indienen/    # Claim formulier
│   ├── dashboard/         # Dashboard voor klanten
│   └── api/               # API routes
├── components/            # React componenten
│   ├── site-header.tsx   # Global header
│   ├── site-footer.tsx   # Global footer
│   └── ui/               # shadcn/ui componenten
├── lib/                   # Utilities & helpers
│   ├── supabase/         # Supabase clients
│   ├── email/            # Email sending (Resend)
│   └── pdf/              # PDF generation
├── database/             # SQL schema bestanden
└── .env.local           # Environment variables (NIET committen!)
```

---

## 🛠️ Belangrijke Commands

```bash
# Development server starten
npm run dev

# Production build maken (om te testen)
npm run build

# Production build lokaal draaien
npm start

# Linter draaien (code quality check)
npm run lint

# Type checking
npm run type-check
```

---

## 🔑 Environment Variables (voor referentie)

Als `vercel env pull` niet werkt, vraag Gert Jan om de `.env.local` met je te delen via een veilige methode (bijv. 1Password).

De file bevat:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key (GEHEIM!)
- `RESEND_API_KEY` - Email sending API key
- `ANTHROPIC_API_KEY` - Claude AI API key
- En meer...

**⚠️ BELANGRIJK: Deel deze keys NOOIT publiekelijk of commit ze NIET naar Git!**

---

## 🐛 Troubleshooting

### **Port 3000 is al in gebruik?**

```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMMER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Of gebruik een andere port:
npm run dev -- -p 3001
```

### **Module niet gevonden errors?**

```bash
# Verwijder node_modules en reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Git conflicts?**

```bash
# Haal eerst de laatste wijzigingen op
git pull origin main

# Los conflicts op in je editor
# Commit de resolved conflicts
git add .
git commit -m "fix: resolve merge conflicts"
```

### **Vercel CLI werkt niet?**

Zorg dat je:
1. Ingelogd bent: `vercel login`
2. Het project hebt gelinkt: `vercel link`
3. Toegang hebt tot het Vercel team (check je email voor invite)

---

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Email**: Resend
- **AI**: Claude (Anthropic)
- **PDF**: jsPDF
- **Deployment**: Vercel
- **Forms**: React Hook Form + Zod

---

## 🤝 Communicatie

- **GitHub Issues**: Voor bug reports en feature requests
- **Pull Requests**: Voor code reviews
- **Direct contact**: Voor vragen en dagelijkse sync

---

## 🎯 Belangrijke Features

### **1. Claim Indienen Flow**
- Europees Schadeformulier upload met OCR
- Automatische verzekeraar lookup
- PDF generatie voor aansprakelijkheidsbrief
- Email naar verzekeraar via Resend

### **2. Email Automation**
- Inbound email processing via Resend webhooks
- AI-powered email analysis (Claude)
- Automatic claim matching
- Auto-reply en follow-up systeem

### **3. Dashboard**
- Real-time claim status tracking
- Email correspondence viewer
- Document uploads
- Admin panel voor claim beheer

---

## 📞 Hulp Nodig?

- **Technische vragen**: Vraag Gert Jan
- **Vercel problemen**: Check Vercel docs: https://vercel.com/docs
- **Supabase vragen**: Check Supabase docs: https://supabase.com/docs
- **Git help**: Check Git cheat sheet: https://training.github.com/

---

## ✅ Checklist

Zorg dat je dit allemaal hebt gedaan:

- [ ] Vercel invite geaccepteerd
- [ ] Repository gecloned
- [ ] `npm install` uitgevoerd
- [ ] Vercel CLI geïnstalleerd
- [ ] Ingelogd bij Vercel (`vercel login`)
- [ ] Project gelinkt (`vercel link`)
- [ ] Environment variables gedownload (`vercel env pull .env.local`)
- [ ] Development server draait (`npm run dev`)
- [ ] Localhost:3000 werkt in je browser

---

**Succes met bouwen! 🚀**

Als je vast loopt, stuur Gert Jan een berichtje of maak een GitHub Issue.
