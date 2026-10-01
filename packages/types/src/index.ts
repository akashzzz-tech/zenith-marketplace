// ============================================================
// ZENITH MARKETPLACE — Shared TypeScript Types
// ============================================================

// ── Enums ────────────────────────────────────────────────────

export type UserRole = 'professional' | 'client' | 'admin' | 'support';

export type AdminRole =
  | 'super_admin'
  | 'verification_admin'
  | 'finance_admin'
  | 'support_admin'
  | 'moderation_admin';

export type EligibilityRoute = 'retired_professional' | 'five_plus_years';

export type VerificationStatus =
  | 'unverified'
  | 'pending'
  | 'under_review'
  | 'more_info_required'
  | 'verified'
  | 'rejected'
  | 'suspended';

export type ProjectStatus =
  | 'draft'
  | 'pending_review'
  | 'published'
  | 'paused'
  | 'closed'
  | 'cancelled'
  | 'completed';

export type ProposalStatus =
  | 'submitted'
  | 'shortlisted'
  | 'rejected'
  | 'withdrawn'
  | 'accepted';

export type ContractStatus =
  | 'draft'
  | 'offered'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type MilestoneStatus =
  | 'pending'
  | 'in_progress'
  | 'submitted'
  | 'approved'
  | 'disputed'
  | 'cancelled';

export type PaymentState =
  | 'created'
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'funds_available'
  | 'payout_pending'
  | 'paid_out'
  | 'failed'
  | 'cancelled'
  | 'expired'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed'
  | 'chargeback'
  | 'reversed';

export type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'evidence_required'
  | 'resolved_refund'
  | 'resolved_payout'
  | 'resolved_split'
  | 'closed';

export type PayoutStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';
export type RefundStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'expired';
export type ReviewType = 'client_to_professional' | 'professional_to_client';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// ── Database Row Types ────────────────────────────────────────

export interface DbUser {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_mfa_enabled: boolean;
  last_sign_in_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProfile {
  id: string;
  user_id: string;
  full_name: string;
  display_name: string | null;
  avatar_url: string | null;
  country_code: string;
  time_zone: string;
  languages: string[];
  bio: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProfessionalProfile {
  id: string;
  profile_id: string;
  eligibility_route: EligibilityRoute;
  professional_title: string;
  industry: string;
  specialization: string;
  years_of_experience: number;
  is_retired: boolean;
  retirement_year: number | null;
  hourly_rate_cents: number;
  currency: string;
  availability: string;
  preferred_hours: string | null;
  verification_status: VerificationStatus;
  is_publicly_visible: boolean;
  profile_completion_pct: number;
  total_earnings_cents: number;
  total_contracts: number;
  average_rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface DbExperience {
  id: string;
  professional_profile_id: string;
  job_title: string;
  organization: string;
  industry: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  created_at: string;
}

export interface DbEducation {
  id: string;
  professional_profile_id: string;
  degree: string;
  institution: string;
  field_of_study: string | null;
  graduation_year: number | null;
  created_at: string;
}

export interface DbCertification {
  id: string;
  professional_profile_id: string;
  name: string;
  issuing_org: string;
  issue_date: string | null;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  created_at: string;
}

export interface DbSkill {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

export interface DbProfessionalSkill {
  id: string;
  professional_profile_id: string;
  skill_id: string;
  years_of_experience: number | null;
  proficiency_level: string;
}

export interface DbCompany {
  id: string;
  name: string;
  industry: string;
  company_size: string;
  website: string | null;
  logo_url: string | null;
  description: string | null;
  country_code: string;
  city: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbClientProfile {
  id: string;
  profile_id: string;
  company_id: string | null;
  job_title: string | null;
  total_projects_posted: number;
  total_spent_cents: number;
  average_rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface DbProject {
  id: string;
  client_profile_id: string;
  title: string;
  description: string;
  category: string;
  industry: string;
  min_years_experience: number;
  budget_min_cents: number;
  budget_max_cents: number;
  currency: string;
  is_hourly: boolean;
  expected_duration: string;
  start_date: string | null;
  deadline: string | null;
  time_zone_requirement: string | null;
  language_requirements: string[];
  remote_requirement: string;
  confidentiality_required: boolean;
  professionals_needed: number;
  status: ProjectStatus;
  view_count: number;
  proposal_count: number;
  created_at: string;
  updated_at: string;
}

export interface DbProposal {
  id: string;
  project_id: string;
  professional_profile_id: string;
  cover_letter: string;
  proposed_price_cents: number;
  currency: string;
  estimated_days: number;
  relevant_experience: string | null;
  milestone_proposal: Record<string, unknown> | null;
  status: ProposalStatus;
  shortlisted_at: string | null;
  rejected_at: string | null;
  accepted_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbContract {
  id: string;
  project_id: string;
  proposal_id: string;
  client_profile_id: string;
  professional_profile_id: string;
  title: string;
  scope_of_work: string;
  total_amount_cents: number;
  platform_fee_cents: number;
  professional_earnings_cents: number;
  currency: string;
  status: ContractStatus;
  start_date: string | null;
  end_date: string | null;
  offered_at: string | null;
  accepted_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbMilestone {
  id: string;
  contract_id: string;
  title: string;
  description: string | null;
  amount_cents: number;
  currency: string;
  deadline: string;
  status: MilestoneStatus;
  payment_state: PaymentState;
  order_index: number;
  submitted_at: string | null;
  approved_at: string | null;
  approved_by: string | null;
  submission_notes: string | null;
  rejection_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPayment {
  id: string;
  contract_id: string;
  milestone_id: string;
  client_profile_id: string;
  professional_profile_id: string;
  amount_cents: number;
  platform_fee_cents: number;
  professional_earnings_cents: number;
  currency: string;
  payment_provider: string;
  provider_payment_id: string | null;
  provider_customer_id: string | null;
  idempotency_key: string;
  state: PaymentState;
  captured_at: string | null;
  failed_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbLedgerEntry {
  id: string;
  transaction_group_id: string;
  payment_id: string | null;
  contract_id: string | null;
  milestone_id: string | null;
  entry_type: string;
  account_id: string;
  debit_cents: number;
  credit_cents: number;
  currency: string;
  description: string;
  created_at: string;
}

export interface DbPayout {
  id: string;
  payment_id: string;
  professional_profile_id: string;
  amount_cents: number;
  currency: string;
  payment_provider: string;
  provider_account_id: string;
  provider_payout_id: string | null;
  status: PayoutStatus;
  initiated_at: string | null;
  completed_at: string | null;
  failed_at: string | null;
  failure_reason: string | null;
  idempotency_key: string;
  created_at: string;
}

export interface DbReview {
  id: string;
  contract_id: string;
  reviewer_id: string;
  reviewee_id: string;
  review_type: ReviewType;
  rating: number;
  title: string | null;
  content: string;
  is_public: boolean;
  is_flagged: boolean;
  created_at: string;
}

// ── Match Score ───────────────────────────────────────────────

export interface MatchScoreBreakdown {
  skills: number;        // 0–35
  experience: number;    // 0–25
  industry: number;      // 0–15
  timezone: number;      // 0–15
  rate: number;          // 0–10
  total: number;         // 0–100
  reasons: string[];     // Human-readable explanation strings
}

// ── API Utility Types ─────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}

// ── Currency Utility ──────────────────────────────────────────

/**
 * Formats integer cents to a localized currency string.
 * Always use integer arithmetic for financial calculations — never floating-point.
 * @param cents - Amount in smallest currency unit (e.g. 10050 = $100.50)
 * @param currency - ISO 4217 currency code (e.g. 'USD', 'INR', 'GBP')
 */
export function formatCurrency(cents: number, currency: string = 'USD'): string {
  const amount = Math.floor(cents) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
