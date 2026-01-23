# 🔐 Admin Dashboard - Gebruikershandleiding

## 📍 Toegang

**URL:** `https://autoschadebureau.nl/dashboard/admin`

**Vereisten:**
- ✅ Ingelogd zijn met een Supabase account
- ⚠️ TODO: Admin role check moet nog geïmplementeerd worden (nu heeft elke ingelogde gebruiker toegang)

---

## 🎯 Wat kan je doen?

### **1. Claims Overzicht**

**URL:** `/dashboard/admin`

**Features:**
- ✅ Overzicht van ALLE claims (niet alleen jouw eigen claims)
- ✅ Statistieken: Totaal, Nieuw, In Behandeling, Afgerond
- ✅ Tabbladen voor filtering op status
- ✅ Zoekfunctie (zoek op referentie, kenteken, email, naam)
- ✅ Filter op verzekeraar
- ✅ Sorteerbaar per kolom

**Kolommen:**
- Referentie (bijv. CLAIM-2026-001)
- Status (met kleurcodering)
- Klant (naam + email)
- Kentekens (aanvrager + tegenpartij)
- Verzekeraar
- Geschat bedrag
- Aanmaakdatum
- Acties (bekijken knop)

---

### **2. Claim Detail Pagina**

**URL:** `/dashboard/admin/claims/[id]`

**Features:**

#### **Tab: Details**
- ✅ Volledige klantinformatie (naam, email, telefoon, adres)
- ✅ Voertuig informatie (beide kentekens, merken)
- ✅ Schade informatie (datum, locatie, bedrag, beschrijving)
- ✅ Omstandigheden

#### **Tab: Emails**
- ✅ Alle emails gerelateerd aan deze claim
- ✅ Email type badge (bijv. liability_acceptance)
- ✅ Preview van email content
- ✅ Datum ontvangen

#### **Tab: Documenten**
- ⏳ TODO: Document viewer implementeren
- Zal tonen: Geüploade schadeformulieren, foto's, gegenereerde PDFs

#### **Tab: Audit Log**
- ✅ Alle acties en wijzigingen op deze claim
- ✅ Tijdstempel
- ✅ Actie type
- ✅ Details

---

### **3. Sidebar Acties**

#### **Status Wijzigen**
- ✅ Dropdown met alle statussen (Nieuw, In Behandeling, Afgerond, Geannuleerd)
- ✅ Optionele notitie toevoegen bij statuswijziging
- ✅ Wordt gelogd in audit trail

#### **Interne Notities**
- ✅ Voeg interne notities toe (niet zichtbaar voor klant)
- ✅ Historisch overzicht van alle notities
- ✅ Tijdstempel per notitie

#### **Quick Actions** (TODO)
- ⏳ Email verzenden naar klant
- ⏳ Document genereren (aansprakelijkheidsbrief)
- ⏳ Claim bewerken

---

## 🚀 Hoe te gebruiken

### **Claims Beheren:**

1. **Ga naar Admin Dashboard**
   - Login op je account
   - Klik rechtsboven op je profiel icoon
   - Selecteer "Admin Dashboard"

2. **Bekijk alle claims**
   - Gebruik de tabs om te filteren op status
   - Gebruik de zoekbalk om specifieke claims te vinden
   - Gebruik de verzekeraar dropdown om te filteren

3. **Open een claim**
   - Klik op "Bekijken" bij een claim
   - Of klik op de hele rij

4. **Update status**
   - In de sidebar rechts: selecteer nieuwe status
   - Optioneel: voeg een notitie toe
   - Klik "Status Bijwerken"

5. **Voeg notitie toe**
   - Scroll naar "Interne Notities" in sidebar
   - Typ je notitie
   - Klik "Notitie Toevoegen"

6. **Bekijk email historie**
   - Klik op de "Emails" tab
   - Zie alle binnenkomende emails van verzekeraars
   - Zie AI analyse resultaten

7. **Bekijk audit trail**
   - Klik op de "Audit Log" tab
   - Zie alle acties: status wijzigingen, emails verstuurd, notities toegevoegd

---

## 🔐 Security & Permissions

### **Huidige status:**
- ⚠️ Elke ingelogde gebruiker heeft toegang tot admin dashboard
- ⚠️ Er is nog geen role-based access control (RBAC)

### **TODO: Te implementeren:**
- [ ] Admin role toevoegen aan users table
- [ ] Admin check in API routes
- [ ] Admin check in page components
- [ ] Redirect niet-admins naar normaal dashboard

**Voor nu:** Geef alleen trusted mensen (jij en je partner) een account.

---

## 📊 Database Schema

### **Nieuwe Tabellen (niet nodig, gebruikt audit_logs):**

Notities worden opgeslagen in `audit_logs` met `action_type = 'comment_added'`.

Dit heeft als voordeel:
- ✅ Alle acties op één plek
- ✅ Consistente audit trail
- ✅ Geen extra tabel nodig

---

## 🎨 UI Features

- ✅ Responsive design (werkt op mobile)
- ✅ Real-time filtering en zoeken
- ✅ Kleurcodering van statussen
- ✅ Loading states
- ✅ Toast notificaties bij acties
- ✅ Scroll containers voor lange lijsten

---

## 🐛 Known Issues & TODO

### **Moet nog geïmplementeerd:**
1. **Role-based access control** (hoogste prioriteit)
2. **Document viewer** in Documents tab
3. **Email verzenden** functionaliteit
4. **Bulk acties** (meerdere claims tegelijk updaten)
5. **Export functionaliteit** (Excel, PDF)
6. **Advanced filters** (datum range, bedrag range)
7. **Claim bewerken** functionaliteit
8. **User management** (alle users beheren)

---

## 💡 Tips

### **Snelle Navigatie:**
- Gebruik de zoekbalk voor snelle claim lookup
- Filter op verzekeraar om te zien wie veel claims heeft
- Check de "Nieuw" tab dagelijks voor nieuwe claims
- Gebruik notities om belangrijke info vast te leggen

### **Workflow suggestie:**
1. **Dagelijks:** Check "Nieuw" tab
2. **Wekelijks:** Review "In Behandeling" tab
3. **Maandelijks:** Analyse "Afgerond" tab voor statistieken

---

## 📞 Support

- Technische problemen? Check de browser console (F12)
- Feature requests? Bespreek met je co-founder
- Bugs gevonden? Noteer in GitHub Issues

---

**Klaar om te gebruiken! 🚀**

Ga naar: `/dashboard/admin` en begin met claim management!
