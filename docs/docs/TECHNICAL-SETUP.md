# Technical Setup - Gratisschadeverhalen.nl & LocalContent.ai

**Last Updated:** January 29, 2026  
**Purpose:** Reference document for AI agents and developers working on these projects.

---

## 🖥️ Infrastructure Overview

### Environments

| Environment | Location | Purpose |
|-------------|----------|---------|
| **VPS Server** | `89.167.9.171` (Hetzner, Ubuntu 24.04) | Clawdbot AI agent, development work |
| **Local Cursor** | Windows machine | Direct code editing, git operations |
| **Vercel** | Cloud | Production hosting for Gratisschadeverhalen.nl |
| **GitHub** | Cloud | Version control, source of truth |
| **Supabase** | Cloud | PostgreSQL database, authentication |

### VPS Directory Structure

```
/root/clawd-work/
├── localcontent_ai/          # LocalContent.ai project
├── Gratisschadeverhalen.nl/  # Dutch vehicle damage claims site
├── AGENTS.md                 # Clawdbot operating instructions
├── MEMORY.md                 # Tacit knowledge and lessons learned
├── memory/                   # Daily notes (YYYY-MM-DD.md)
└── life/areas/               # Knowledge graph
```

---

## 🔐 GitHub Access Configuration

### Authentication Method
- **Token Type:** Fine-grained Personal Access Token (PAT)
- **Token Prefix:** `github_pat_...`
- **Storage:** Environment variable in `~/.bashrc`
- **Scope:** Read/write access to specific repositories only

### Configured Repositories

| Repository | GitHub URL | VPS Path |
|------------|------------|----------|
| LocalContent.ai | `https://github.com/Championne/localcontent-ai` | `/root/clawd-work/localcontent_ai` |
| Gratisschadeverhalen.nl | `https://github.com/Championne/Gratisschadeverhalen.nl` | `/root/clawd-work/Gratisschadeverhalen.nl` |

### Git Configuration on VPS

```bash
# Token is stored in environment
export GITHUB_TOKEN="github_pat_..." # in ~/.bashrc

# Remote URLs include token for authentication
# Example: https://github_pat_XXX@github.com/Championne/repo.git
```

### How to Push (for Clawdbot)

```bash
cd /root/clawd-work/localcontent_ai
git add .
git commit -m "feat: description"
git push origin main
```

---

## 🛡️ Security Configuration

### Admin Access (Gratisschadeverhalen.nl)

**Implementation:** Environment variable-based admin verification

```typescript
// lib/auth/admin.ts
export function isAdmin(user: User | null): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return adminEmails.includes(user?.email?.toLowerCase())
}
```

**Protected Routes:**
- `/dashboard/admin/*` - Admin dashboard pages
- `/api/admin/*` - Admin API endpoints

**Required Environment Variable:**
```bash
ADMIN_EMAILS=admin@example.com,other-admin@example.com
```

⚠️ **CRITICAL:** If `ADMIN_EMAILS` is not set, ALL admin access is denied (fail-secure).

### Authentication Flow
1. User logs in via Google OAuth (Supabase Auth)
2. Middleware checks if route requires admin
3. If admin route: verify user email is in `ADMIN_EMAILS`
4. Non-admins redirected to `/dashboard?error=unauthorized`

---

## 📧 Email Configuration

### Resend (Transactional Email)

```bash
RESEND_API_KEY=re_...
RESEND_ADMIN_EMAIL=admin@gratisschadeverhalen.nl  # For escalation notifications
```

### Email Types
- Claim confirmation (to claimer)
- Admin notifications (escalations)
- Follow-up reminders (to verzekeraars)
- Status updates

---

## 🗄️ Database (Supabase)

### Key Tables

| Table | Purpose | RLS |
|-------|---------|-----|
| `claims` | Damage claims | Users see only their own |
| `claim_documents` | Uploaded files | Linked to claim ownership |
| `audit_logs` | Activity tracking | Admin/service role only |
| `inbound_emails` | Email processing | Admin only |
| `verzekeraars` | Insurance companies | Public read |

### API Keys

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  # Client-side, RLS enforced
SUPABASE_SERVICE_ROLE_KEY=eyJ...      # Server-side only, bypasses RLS
```

---

## 🤖 AI Integration

### Anthropic Claude

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

**Used For:**
- Claim liability analysis
- Automated email responses
- Follow-up email generation
- OCR data extraction enhancement

### AI Agent Endpoint
- **Route:** `/api/agent`
- **Triggers:** New claim submission, status changes
- **Actions:** Analyze claim, assess liability, send notifications

---

## 🚀 Deployment

### Vercel (Production)

**Required Environment Variables:**
```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=
RESEND_ADMIN_EMAIL=

# AI
ANTHROPIC_API_KEY=

# Security (CRITICAL!)
ADMIN_EMAILS=your-email@example.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX

# Feature Flags
ENABLE_AUTO_SEND_TO_VERZEKERAAR=false
ENABLE_FOLLOW_UP_SYSTEM=false
```

### Local Development

```bash
# Copy example to local config
cp .env.example .env.local

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## 📋 Testing

### API Tests
```bash
npx ts-node scripts/test-claims-api.ts
```

### Supabase RLS Verification
```bash
npx ts-node scripts/verify-supabase-rls.ts
```

### Manual Testing
See: `docs/MANUAL-TEST-CHECKLIST.md`

---

## 🔄 Sync Workflow

### Cursor → GitHub → VPS

```
[Local Cursor] --git push--> [GitHub] <--git pull-- [VPS/Clawdbot]
```

### VPS → GitHub → Cursor

```
[VPS/Clawdbot] --git push--> [GitHub] <--git pull-- [Local Cursor]
```

### Commands

**On VPS (Clawdbot):**
```bash
cd /root/clawd-work/Gratisschadeverhalen.nl
git pull origin main  # Get latest from GitHub
git push origin main  # Push changes to GitHub
```

**On Local (Cursor):**
```bash
git pull origin main  # Get Clawdbot's changes
git push origin main  # Push local changes
```

---

## 📝 For Clawdbot

### Your GitHub Access is Working ✅

You can now push to both repositories:

```bash
# LocalContent.ai
cd /root/clawd-work/localcontent_ai
git add . && git commit -m "your message" && git push origin main

# Gratisschadeverhalen.nl
cd /root/clawd-work/Gratisschadeverhalen.nl
git add . && git commit -m "your message" && git push origin main
```

### Token Location
- Stored in: `~/.bashrc`
- Variable: `GITHUB_TOKEN`
- Do NOT expose in chat or logs

### Before Pushing
Always pull first to avoid conflicts:
```bash
git pull origin main
git push origin main
```

---

## 🆘 Troubleshooting

### "403 Authentication Failed"
- Token may have expired (check GitHub settings)
- Re-run: `source ~/.bashrc` to reload token

### "Updates were rejected"
- Remote has changes you don't have
- Run: `git pull origin main` first

### "ADMIN_EMAILS not configured"
- Add to Vercel environment variables
- Redeploy after adding

---

**Document Version:** 1.0  
**Maintained By:** Development Team
