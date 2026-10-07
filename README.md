# ZENITH Marketplace

 **Experienced Talent. Remote Opportunities.**  
 *"Experience That Works Remotely."*

ZENITH is a production-grade, global remote freelancing marketplace exclusively connecting **Retired Professionals** and **5+ Years Experienced Professionals** with companies, startups, and organizations seeking experienced remote talent.


## ⚠️ Important Notices

 **ZENITH IS AN INTERMEDIARY MARKETPLACE.** ZENITH does not employ freelancers, act as an employer of record, perform project work, or guarantee income. The platform facilitates discovery, matching, contracts, and payment processing between independent professionals and clients.

 **PAYMENT PROVIDER APPROVAL REQUIRED** — See [Payment Setup](#payment-setup).

 **LEGAL REVIEW REQUIRED** — Terms of Service, Privacy Policy, Independent Contractor Agreements, and jurisdiction-specific legal requirements must be reviewed by a qualified attorney before production launch.



## Monorepo Structure

```
zenith/
├── web/                    # Next.js 15 Web Application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utilities, Supabase clients, validations
│   │   ├── hooks/          # Custom React hooks
│   │   ├── providers/      # Context providers
│   │   ├── store/          # Zustand state stores
│   │   └── types/          # TypeScript type definitions
│   └── public/             # Static assets
│
├── mobile/                 # Expo React Native Application
│   ├── app/                # Expo Router file-based screens
│   ├── src/
│   │   ├── components/     # React Native UI components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Supabase, notifications, secure storage
│   │   ├── providers/      # Context providers
│   │   └── store/          # Zustand stores
│   └── assets/             # Images, fonts
│
├── supabase/               # Supabase Configuration & Migrations
│   ├── migrations/         # Numbered SQL migration files
│   └── config.toml         # Supabase local dev config
│
└── packages/               # Shared packages (types, utilities)
    └── types/              # Shared TypeScript types
```

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Web Frontend | Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 |
| Mobile | Expo SDK 52 + React Native + Expo Router v4 + NativeWind |
| Backend | Supabase (PostgreSQL + Auth + Storage + Edge Functions + Realtime) |
| Database | PostgreSQL with RLS, Migrations, PITR |
| Hosting | Vercel (Web) + Google Play + Apple App Store (Mobile) |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Analytics | PostHog |
| Monitoring | Sentry |
| Payments | Stripe Connect / Razorpay Marketplace (abstracted) |

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Supabase CLI (`npm install -g supabase`)
- Expo CLI (`npm install -g @expo/cli`)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/zenith.git
cd zenith
npm install
```

### 2. Environment Setup

```bash
# Web application
cp web/.env.example web/.env.local

# Mobile application
cp mobile/.env.example mobile/.env
```

Fill in all required environment variables. See `.env.example` for required keys.

### 3. Database Setup

```bash
# Start local Supabase (Docker required)
supabase start

# Run all migrations
supabase db push

# Generate TypeScript types
npm run db:types
```

### 4. Run Development

```bash
# Web
npm run dev

# Mobile (in separate terminal)
npm run mobile
```



## Database Migrations

All migrations are in `supabase/migrations/` and run in numbered order:

| Migration | Description |
|:|:|
| `000001_create_enums` | All PostgreSQL enum types |
| `000002_create_users_profiles` | Core identity tables |
| `000003_create_professional_profiles` | Professional profile, experience, skills |
| `000004_create_verification` | Verification document workflow |
| `000005_create_client_company` | Client profiles and company tables |
| `000006_create_projects` | Project posting tables |
| `000007_create_proposals_invitations` | Proposals and invitations |
| `000008_create_messaging` | Conversations and messages |
| `000009_create_contracts_milestones` | Contract and milestone tables |
| `000010_create_payments_ledger` | Payments, ledger (double-entry), payouts, refunds |
| `000011_create_disputes` | Dispute arbitration |
| `000012_create_reviews_notifications` | Reviews, notifications, support tickets |
| `000013_create_admin_fraud_audit` | Admin, fraud flags, audit logs (immutable) |
| `000014_create_indexes` | Performance indexes |
| `000015_create_functions_triggers` | Database triggers and functions |
| `000016_seed_skills_categories` | Seed data for skills and categories |



## Payment Setup

 **⚠️ PAYMENT PROVIDER APPROVAL REQUIRED**

ZENITH uses an abstracted `IPaymentProvider` interface, supporting:
 **Stripe Connect** (US, EU, UK, SG, AU) — `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
 **Razorpay Marketplace** (India) — `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

**Never route customer funds through a personal bank account.**  
Always use the sandbox/test keys during development. Never use real money for testing.

---

## Security

 Row Level Security (RLS) enabled on **all** database tables
 Verification documents stored in **private** Supabase Storage buckets
 Signed URLs expire in **< 15 minutes** for verification document access
 Payment secrets stored **server-side only** — never in frontend code
 Financial ledger entries are **immutable** (INSERT only, no UPDATE/DELETE)
 Admin actions require **MFA** enforcement



## Development Phases

 Phase | Status | Description | |:|:|:|

 1 | ✅ Complete | Business requirements & architecture  2 | 🚧 In Progress | Project init, database schema |
 3 | ⏳ Pending | Design system & UI shell |
 4–25 | ⏳ Pending | Full feature development |


## Legal

 **LEGAL REVIEW REQUIRED** before production launch:
  Terms of Service
  Privacy Policy  
  Independent Contractor Agreement
  Marketplace Fee Disclosure
  Jurisdiction-specific payment regulations
  Tax/GST/TDS withholding obligations
  Data protection compliance (GDPR, CCPA, etc.)



## Contributing

This is a private project. All contributors must sign the Confidentiality Agreement before access is granted.



*ZENITH — Experienced Talent. Remote Opportunities.*

# zenith

