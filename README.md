# ZENITH Marketplace

**Experienced Talent. Remote Opportunities.**  
*"Experience That Works Remotely."*

ZENITH is an exclusive, production-ready remote freelancing marketplace connecting **Retired Professionals** and **5+ Years Experienced Professionals** with companies, startups, and institutions seeking high-caliber, verified independent talent.

---

## 🏛️ Business Model & Core Principles

**ZENITH is an intermediary marketplace platform.**
- **NOT an Employer:** ZENITH does not employ freelancers or act as an employer of record.
- **NOT a Project Delivery Agency:** Independent professionals perform work directly for clients.
- **NO Guaranteed Income:** ZENITH facilitates discovery, contracts, milestones, and escrow payments.
- **Eligibility Barrier:** Exclusively for:
  - **Route A — Retired Professionals** (demonstrating career mastery).
  - **Route B — 5+ Years Experienced Specialists** (strictly verified credentials).

---

## 🎨 Brand & Design System

- **Black (`#000000`)**: Deep backdrops, navbars, footers, and structured framing.
- **White (`#FFFFFF`)**: High-contrast cards, clean surface typography, and form controls.
- **Deep Cobalt Blue (`#2C3480`)**: Primary actions, button states, active badges, and focus rings.

---

## 📂 Repository Structure

```
zenith/
├── web/                    # Next.js 15.3.9 App Router (Production Web App)
│   ├── src/
│   │   ├── app/            # 42 Static & Dynamic Routes (Auth, Client, Pro, Admin)
│   │   ├── components/     # UI Design System (Button, Badge, Card, Modal, etc.)
│   │   ├── lib/            # Payments, Supabase SSR, Safety Message Filter, Realtime
│   │   └── types/          # Database & application type definitions
│   └── package.json
│
├── mobile/                 # React Native & Expo SDK 52 Application
│   ├── app/                # Expo Router file-based screens
│   ├── src/                # Shared state, components, and real-time hooks
│   └── package.json
│
├── supabase/               # Complete PostgreSQL Database Layer
│   ├── migrations/         # 17 Migration SQL files
│   └── full_schema.sql     # Single-script complete database schema
│
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v20 or v22
- **npm**: v10+

### 2. Install Dependencies
```bash
# From repository root
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables
Copy and set your local environment file:
```bash
cp web/.env.example web/.env.local
```

Inside `web/.env.local`:
```ini
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ZENITH

# Supabase Project Credentials
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Payment Abstraction (Sandbox default)
PAYMENT_PROVIDER=sandbox
```

### 4. Run Applications
- **Web Application**:
  ```bash
  npm run dev --workspace=web
  ```
  Open [http://localhost:3000](http://localhost:3000)

- **Mobile Application**:
  ```bash
  npm run start --workspace=mobile
  ```

---

## 🗄️ Database Setup (Supabase)

The complete schema is bundled in a single, idempotent SQL script:
`supabase/full_schema.sql`

### How to apply:
1. Open your project on [supabase.com](https://supabase.com).
2. Go to **SQL Editor** > **New Query**.
3. Copy the entire content of `supabase/full_schema.sql` and click **Run**.
4. The script provisions:
   - All 16 table schemas, PostgreSQL enums, and performance indexes.
   - Immutable double-entry financial ledger (`ledger_entries`).
   - Anti-fraud detection flags (`fraud_flags`) and audit trails (`audit_logs`).
   - 25+ domain categories and seed skills.
   - Storage buckets (`avatars`, `verification-documents`, `milestone-deliverables`) with Row Level Security.

---

## ☁️ Deploying Web App to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete ZENITH marketplace"
   git push -u origin main
   ```
2. Log in to [vercel.com](https://vercel.com) and click **Add New...** > **Project**.
3. Import your `zenith` repository.
4. Set **Root Directory** to `web`.
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PAYMENT_PROVIDER=sandbox`
6. Click **Deploy**. (All 42 routes compile and generate with **0 errors**).
7. In **Supabase Dashboard** > **Authentication** > **URL Configuration**, add your Vercel URL to **Site URL** and **Redirect URLs**.

---

## 🔒 Security & Compliance Architecture

- **Row Level Security (RLS)**: Enforced across 100% of tables.
- **Private Document Buckets**: Verification docs and deliverables require authenticated signed URLs.
- **Anti-Circumvention Protection**: Client/Professional messages scan for phone/email sharing, external payment bypass keywords, and banking credentials.
- **Financial Integrity**: Double-entry accounting ensures debits equal credits before any escrow funds can disburse.

---

*ZENITH — Experience That Works Remotely.*
