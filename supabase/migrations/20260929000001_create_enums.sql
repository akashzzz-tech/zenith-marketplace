-- 20260929000001_create_enums.sql

CREATE TYPE user_role AS ENUM ('professional', 'client', 'admin', 'support');
CREATE TYPE admin_role AS ENUM ('super_admin', 'verification_admin', 'finance_admin', 'support_admin', 'moderation_admin');
CREATE TYPE eligibility_route AS ENUM ('retired_professional', 'five_plus_years');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'under_review', 'more_info_required', 'verified', 'rejected', 'suspended');
CREATE TYPE project_status AS ENUM ('draft', 'pending_review', 'published', 'paused', 'closed', 'cancelled', 'completed');
CREATE TYPE proposal_status AS ENUM ('submitted', 'shortlisted', 'rejected', 'withdrawn', 'accepted');
CREATE TYPE contract_status AS ENUM ('draft', 'offered', 'active', 'paused', 'completed', 'cancelled', 'disputed');
CREATE TYPE milestone_status AS ENUM ('pending', 'in_progress', 'submitted', 'approved', 'disputed', 'cancelled');
CREATE TYPE payment_state AS ENUM ('created', 'pending', 'authorized', 'captured', 'funds_available', 'payout_pending', 'paid_out', 'failed', 'cancelled', 'expired', 'refunded', 'partially_refunded', 'disputed', 'chargeback', 'reversed');
CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'evidence_required', 'resolved_refund', 'resolved_payout', 'resolved_split', 'closed');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'paid', 'failed', 'cancelled');
CREATE TYPE refund_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined', 'expired');
CREATE TYPE review_type AS ENUM ('client_to_professional', 'professional_to_client');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');
