# Manual Testing Checklist - Gratisschadeverhalen.nl

## Pre-Launch Verification

Use this checklist for manual verification of critical user flows.
Run after passing automated API tests (`npx ts-node scripts/test-claims-api.ts`).

---

## 🔐 Authentication Flow

### Google Sign-In
- [ ] Click "Inloggen" in header
- [ ] Google OAuth popup appears
- [ ] After login, redirected to dashboard
- [ ] User email displayed in header/dashboard
- [ ] Logout works correctly

### Session Persistence  
- [ ] Close browser, reopen site
- [ ] Still logged in (session persists)
- [ ] Dashboard accessible without re-login

---

## 📝 Claim Submission Flow (CRITICAL)

### Step 1: Navigate to Form
- [ ] Homepage loads without errors
- [ ] "Direct schade melden" button visible
- [ ] Click navigates to `/claim-indienen`

### Step 2: Fill Form
- [ ] All required fields marked clearly
- [ ] Date picker works
- [ ] Verzekeraar dropdown populated with options
- [ ] Form validation shows errors for missing fields
- [ ] Phone number accepts Dutch format

### Step 3: File Upload (Optional)
- [ ] Upload button visible
- [ ] Can select image file
- [ ] Preview shown after upload
- [ ] Can remove uploaded file
- [ ] Large file shows size warning (if applicable)

### Step 4: Submit
- [ ] Submit button enabled when form valid
- [ ] Loading state shown during submission
- [ ] Success message displayed
- [ ] Redirected to dashboard or confirmation page

### Step 5: Verify in Database
- [ ] Check Supabase: new claim record created
- [ ] Status is "nieuw"
- [ ] All form fields saved correctly
- [ ] User ID linked (if authenticated)

---

## 📧 Email Notifications

### Claimer Confirmation Email
- [ ] Email received at claimer address
- [ ] Subject line correct
- [ ] Claim details included
- [ ] Professional formatting

### Admin Notification Email
- [ ] Email received at admin address (not claimer!)
- [ ] Contains claim summary
- [ ] Link to admin dashboard

---

## 📊 Dashboard

### Claims List
- [ ] Shows all user's claims
- [ ] Status badges display correctly
- [ ] Clicking claim shows details

### Claim Details
- [ ] All submitted info displayed
- [ ] Status history visible
- [ ] Documents/uploads listed
- [ ] Notes section works

---

## 🤖 AI Agent Processing

### Auto-Processing
- [ ] New claim triggers agent (check logs)
- [ ] Aansprakelijkheid assessment generated
- [ ] Letselschade detection works
- [ ] Status updated appropriately

### Escalation
- [ ] Low confidence triggers escalation
- [ ] Admin notified of escalation
- [ ] Claim marked for review

---

## 📱 Mobile Responsiveness

### Homepage
- [ ] Hero section readable
- [ ] Navigation hamburger menu works
- [ ] CTAs tappable size
- [ ] No horizontal scroll

### Claim Form (Mobile)
- [ ] Form fields full width
- [ ] Keyboard doesn't cover inputs
- [ ] Submit button accessible
- [ ] File upload works on mobile

### Dashboard (Mobile)
- [ ] Claims list scrollable
- [ ] Claim details readable
- [ ] Actions accessible

---

## 🔒 Security Checks

### Direct URL Access
- [ ] `/admin/*` routes require admin role
- [ ] `/dashboard` requires authentication
- [ ] API routes reject unauthorized requests

### Data Isolation
- [ ] User A cannot see User B's claims
- [ ] Claim IDs in URL don't expose other users' data

---

## ⚡ Performance

### Page Load Times
- [ ] Homepage: < 3 seconds
- [ ] Claim form: < 2 seconds
- [ ] Dashboard: < 3 seconds

### Interaction Responsiveness
- [ ] Form inputs respond instantly
- [ ] Buttons show feedback on click
- [ ] No UI freezing

---

## ✅ Sign-Off

| Area | Tested By | Date | Pass/Fail |
|------|-----------|------|-----------|
| Authentication | | | |
| Claim Submission | | | |
| Email Notifications | | | |
| Dashboard | | | |
| AI Processing | | | |
| Mobile | | | |
| Security | | | |
| Performance | | | |

**Final Approval:**
- [ ] All critical paths verified
- [ ] No blocking issues found
- [ ] Ready for production traffic
