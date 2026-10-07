-- =============================================
-- FILE: 20260929000001_create_enums.sql
-- =============================================

-- 20260929000001_create_enums.sql
-- Idempotent Enum Definitions

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('professional', 'client', 'admin', 'support');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('super_admin', 'verification_admin', 'finance_admin', 'support_admin', 'moderation_admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE eligibility_route AS ENUM ('retired_professional', 'five_plus_years');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'under_review', 'more_info_required', 'verified', 'rejected', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE project_status AS ENUM ('draft', 'pending_review', 'published', 'paused', 'closed', 'cancelled', 'completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE proposal_status AS ENUM ('submitted', 'shortlisted', 'rejected', 'withdrawn', 'accepted');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE contract_status AS ENUM ('draft', 'offered', 'active', 'paused', 'completed', 'cancelled', 'disputed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE milestone_status AS ENUM ('pending', 'in_progress', 'submitted', 'approved', 'disputed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_state AS ENUM ('created', 'pending', 'authorized', 'captured', 'funds_available', 'payout_pending', 'paid_out', 'failed', 'cancelled', 'expired', 'refunded', 'partially_refunded', 'disputed', 'chargeback', 'reversed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'evidence_required', 'resolved_refund', 'resolved_payout', 'resolved_split', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'paid', 'failed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE refund_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined', 'expired');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE review_type AS ENUM ('client_to_professional', 'professional_to_client');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


-- =============================================
-- FILE: 20260929000002_create_users_profiles.sql
-- =============================================

-- 20260929000002_create_users_profiles.sql

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'professional',
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_mfa_enabled BOOLEAN NOT NULL DEFAULT false,
    last_sign_in_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.users IS 'Core user accounts and settings.';

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    country_code CHAR(2) NOT NULL,
    time_zone TEXT NOT NULL,
    languages TEXT[] NOT NULL DEFAULT '{}',
    bio TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.profiles IS 'User profiles containing public/semi-public information.';

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own row" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own row" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profiles can be viewed by owner or admin" ON public.profiles FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'support'))
);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);


-- =============================================
-- FILE: 20260929000003_create_professional_profiles.sql
-- =============================================

-- 20260929000003_create_professional_profiles.sql

CREATE TABLE public.professional_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    eligibility_route eligibility_route NOT NULL,
    professional_title TEXT NOT NULL,
    industry TEXT NOT NULL,
    specialization TEXT NOT NULL,
    years_of_experience INTEGER NOT NULL,
    is_retired BOOLEAN NOT NULL DEFAULT false,
    retirement_year INTEGER,
    hourly_rate_cents BIGINT NOT NULL CHECK (hourly_rate_cents >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    availability TEXT NOT NULL DEFAULT 'available',
    preferred_hours TEXT,
    verification_status verification_status NOT NULL DEFAULT 'unverified',
    is_publicly_visible BOOLEAN NOT NULL DEFAULT false,
    profile_completion_pct INTEGER NOT NULL DEFAULT 0 CHECK (profile_completion_pct BETWEEN 0 AND 100),
    total_earnings_cents BIGINT NOT NULL DEFAULT 0,
    total_contracts INTEGER NOT NULL DEFAULT 0,
    average_rating NUMERIC(3,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_experience CHECK (years_of_experience >= 5 OR eligibility_route = 'retired_professional')
);
COMMENT ON TABLE public.professional_profiles IS 'Professional-specific profile data.';

CREATE TABLE public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    organization TEXT NOT NULL,
    industry TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.experience IS 'Work experience for professionals.';

CREATE TABLE public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    graduation_year INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.education IS 'Educational background for professionals.';

CREATE TABLE public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    issuing_org TEXT NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.certifications IS 'Certifications held by professionals.';

CREATE TABLE public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    project_url TEXT,
    image_url TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.portfolio IS 'Portfolio items for professionals.';

CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.skills IS 'Global list of skills available in the platform.';

CREATE TABLE public.professional_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id),
    years_of_experience INTEGER,
    proficiency_level TEXT NOT NULL DEFAULT 'proficient',
    UNIQUE (professional_profile_id, skill_id)
);
COMMENT ON TABLE public.professional_skills IS 'Skills associated with professional profiles.';

-- RLS
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_skills ENABLE ROW LEVEL SECURITY;

-- Base ownership function
CREATE OR REPLACE FUNCTION public.is_professional_owner(prof_id UUID) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = (SELECT profile_id FROM public.professional_profiles WHERE id = prof_id)
    AND p.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- professional_profiles
CREATE POLICY "Pro select own or public" ON public.professional_profiles FOR SELECT USING (
    is_professional_owner(id) OR (is_publicly_visible = true AND verification_status = 'verified')
);
CREATE POLICY "Pro insert own" ON public.professional_profiles FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid())
);
CREATE POLICY "Pro update own" ON public.professional_profiles FOR UPDATE USING (is_professional_owner(id));
CREATE POLICY "Pro delete own" ON public.professional_profiles FOR DELETE USING (is_professional_owner(id));

-- experience
CREATE POLICY "Exp select" ON public.experience FOR SELECT USING (is_professional_owner(professional_profile_id) OR EXISTS (SELECT 1 FROM public.professional_profiles WHERE id = professional_profile_id AND is_publicly_visible = true AND verification_status = 'verified'));
CREATE POLICY "Exp insert" ON public.experience FOR INSERT WITH CHECK (is_professional_owner(professional_profile_id));
CREATE POLICY "Exp update" ON public.experience FOR UPDATE USING (is_professional_owner(professional_profile_id));
CREATE POLICY "Exp delete" ON public.experience FOR DELETE USING (is_professional_owner(professional_profile_id));

-- education, certifications, portfolio, professional_skills
-- Similar policies can be applied for each, assuming same visibility rules.
CREATE POLICY "Edu select" ON public.education FOR SELECT USING (is_professional_owner(professional_profile_id) OR EXISTS (SELECT 1 FROM public.professional_profiles WHERE id = professional_profile_id AND is_publicly_visible = true AND verification_status = 'verified'));
CREATE POLICY "Edu insert" ON public.education FOR INSERT WITH CHECK (is_professional_owner(professional_profile_id));
CREATE POLICY "Edu update" ON public.education FOR UPDATE USING (is_professional_owner(professional_profile_id));
CREATE POLICY "Edu delete" ON public.education FOR DELETE USING (is_professional_owner(professional_profile_id));

CREATE POLICY "Cert select" ON public.certifications FOR SELECT USING (is_professional_owner(professional_profile_id) OR EXISTS (SELECT 1 FROM public.professional_profiles WHERE id = professional_profile_id AND is_publicly_visible = true AND verification_status = 'verified'));
CREATE POLICY "Cert insert" ON public.certifications FOR INSERT WITH CHECK (is_professional_owner(professional_profile_id));
CREATE POLICY "Cert update" ON public.certifications FOR UPDATE USING (is_professional_owner(professional_profile_id));
CREATE POLICY "Cert delete" ON public.certifications FOR DELETE USING (is_professional_owner(professional_profile_id));

CREATE POLICY "Port select" ON public.portfolio FOR SELECT USING (is_professional_owner(professional_profile_id) OR EXISTS (SELECT 1 FROM public.professional_profiles WHERE id = professional_profile_id AND is_publicly_visible = true AND verification_status = 'verified'));
CREATE POLICY "Port insert" ON public.portfolio FOR INSERT WITH CHECK (is_professional_owner(professional_profile_id));
CREATE POLICY "Port update" ON public.portfolio FOR UPDATE USING (is_professional_owner(professional_profile_id));
CREATE POLICY "Port delete" ON public.portfolio FOR DELETE USING (is_professional_owner(professional_profile_id));

CREATE POLICY "ProSkill select" ON public.professional_skills FOR SELECT USING (is_professional_owner(professional_profile_id) OR EXISTS (SELECT 1 FROM public.professional_profiles WHERE id = professional_profile_id AND is_publicly_visible = true AND verification_status = 'verified'));
CREATE POLICY "ProSkill insert" ON public.professional_skills FOR INSERT WITH CHECK (is_professional_owner(professional_profile_id));
CREATE POLICY "ProSkill update" ON public.professional_skills FOR UPDATE USING (is_professional_owner(professional_profile_id));
CREATE POLICY "ProSkill delete" ON public.professional_skills FOR DELETE USING (is_professional_owner(professional_profile_id));

-- skills (global read)
CREATE POLICY "Skills select" ON public.skills FOR SELECT USING (true);


-- =============================================
-- FILE: 20260929000004_create_verification.sql
-- =============================================

-- 20260929000004_create_verification.sql

CREATE TABLE public.verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT,
    submission_notes TEXT,
    reviewer_id UUID REFERENCES public.users(id),
    review_notes TEXT,
    status verification_status NOT NULL DEFAULT 'pending',
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.verifications IS 'Identity and professional verifications.';

ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner select verifications" ON public.verifications FOR SELECT USING (
    public.is_professional_owner(professional_profile_id) OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Owner insert verifications" ON public.verifications FOR INSERT WITH CHECK (
    public.is_professional_owner(professional_profile_id)
);

CREATE POLICY "Admin update verifications" ON public.verifications FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);


-- =============================================
-- FILE: 20260929000005_create_client_company.sql
-- =============================================

-- 20260929000005_create_client_company.sql

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    company_size TEXT NOT NULL,
    website TEXT,
    logo_url TEXT,
    description TEXT,
    country_code CHAR(2) NOT NULL,
    city TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    verification_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.companies IS 'Companies associated with clients.';

CREATE TABLE public.client_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_id UUID REFERENCES public.companies(id),
    job_title TEXT,
    total_projects_posted INTEGER NOT NULL DEFAULT 0,
    total_spent_cents BIGINT NOT NULL DEFAULT 0,
    average_rating NUMERIC(3,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.client_profiles IS 'Client-specific profile data.';

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_client_owner(c_id UUID) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = (SELECT profile_id FROM public.client_profiles WHERE id = c_id)
    AND p.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Companies viewable by public" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Clients can create companies" ON public.companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Clients can update companies" ON public.companies FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.client_profiles cp WHERE cp.company_id = id AND public.is_client_owner(cp.id))
);

CREATE POLICY "Client view own or public" ON public.client_profiles FOR SELECT USING (true);
CREATE POLICY "Client insert own" ON public.client_profiles FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid())
);
CREATE POLICY "Client update own" ON public.client_profiles FOR UPDATE USING (is_client_owner(id));
CREATE POLICY "Client delete own" ON public.client_profiles FOR DELETE USING (is_client_owner(id));


-- =============================================
-- FILE: 20260929000006_create_projects.sql
-- =============================================

-- 20260929000006_create_projects.sql

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_profile_id UUID NOT NULL REFERENCES public.client_profiles(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    industry TEXT NOT NULL,
    min_years_experience INTEGER NOT NULL DEFAULT 5,
    budget_min_cents BIGINT NOT NULL,
    budget_max_cents BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    is_hourly BOOLEAN NOT NULL DEFAULT false,
    expected_duration TEXT NOT NULL,
    start_date DATE,
    deadline DATE,
    time_zone_requirement TEXT,
    language_requirements TEXT[],
    remote_requirement TEXT NOT NULL DEFAULT 'fully_remote',
    confidentiality_required BOOLEAN NOT NULL DEFAULT false,
    professionals_needed INTEGER NOT NULL DEFAULT 1,
    status project_status NOT NULL DEFAULT 'draft',
    view_count INTEGER NOT NULL DEFAULT 0,
    proposal_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.projects IS 'Projects posted by clients.';

CREATE TABLE public.project_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id),
    is_required BOOLEAN DEFAULT true,
    years_required INTEGER,
    UNIQUE (project_id, skill_id)
);
COMMENT ON TABLE public.project_skills IS 'Skills required for projects.';

CREATE TABLE public.project_milestones_template (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    amount_cents BIGINT NOT NULL,
    estimated_days INTEGER,
    order_index INTEGER NOT NULL DEFAULT 0
);
COMMENT ON TABLE public.project_milestones_template IS 'Milestone templates defined during project creation.';

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones_template ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects viewable by owner or verified pros" ON public.projects FOR SELECT USING (
    public.is_client_owner(client_profile_id) OR 
    status = 'published'
);
CREATE POLICY "Projects insertable by owner" ON public.projects FOR INSERT WITH CHECK (public.is_client_owner(client_profile_id));
CREATE POLICY "Projects updatable by owner" ON public.projects FOR UPDATE USING (public.is_client_owner(client_profile_id));
CREATE POLICY "Projects deletable by owner" ON public.projects FOR DELETE USING (public.is_client_owner(client_profile_id));

CREATE POLICY "Project_skills viewable" ON public.project_skills FOR SELECT USING (true);
CREATE POLICY "Project_skills insertable by owner" ON public.project_skills FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);
CREATE POLICY "Project_skills updatable by owner" ON public.project_skills FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);
CREATE POLICY "Project_skills deletable by owner" ON public.project_skills FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);

CREATE POLICY "Project_milestones_template viewable" ON public.project_milestones_template FOR SELECT USING (true);
CREATE POLICY "Project_milestones_template insertable by owner" ON public.project_milestones_template FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);
CREATE POLICY "Project_milestones_template updatable by owner" ON public.project_milestones_template FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);
CREATE POLICY "Project_milestones_template deletable by owner" ON public.project_milestones_template FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);


-- =============================================
-- FILE: 20260929000007_create_proposals_invitations.sql
-- =============================================

-- 20260929000007_create_proposals_invitations.sql

CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
    cover_letter TEXT NOT NULL,
    proposed_price_cents BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    estimated_days INTEGER NOT NULL,
    relevant_experience TEXT,
    milestone_proposal JSONB,
    status proposal_status NOT NULL DEFAULT 'submitted',
    shortlisted_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (project_id, professional_profile_id)
);
COMMENT ON TABLE public.proposals IS 'Proposals submitted by professionals for projects.';

CREATE TABLE public.proposal_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.proposal_attachments IS 'Attachments for proposals.';

CREATE TABLE public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id),
    client_profile_id UUID NOT NULL REFERENCES public.client_profiles(id),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id),
    message TEXT,
    status invitation_status NOT NULL DEFAULT 'pending',
    responded_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.invitations IS 'Invitations sent by clients to professionals.';

ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposal_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Proposals viewable by owner or client" ON public.proposals FOR SELECT USING (
    public.is_professional_owner(professional_profile_id) OR
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);
CREATE POLICY "Proposals insertable by pro" ON public.proposals FOR INSERT WITH CHECK (public.is_professional_owner(professional_profile_id));
CREATE POLICY "Proposals updatable by pro or client" ON public.proposals FOR UPDATE USING (
    public.is_professional_owner(professional_profile_id) OR
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND public.is_client_owner(client_profile_id))
);

CREATE POLICY "Proposal_attachments viewable by owner or client" ON public.proposal_attachments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.proposals p WHERE p.id = proposal_id AND (public.is_professional_owner(p.professional_profile_id) OR EXISTS (SELECT 1 FROM public.projects pr WHERE pr.id = p.project_id AND public.is_client_owner(pr.client_profile_id))))
);
CREATE POLICY "Proposal_attachments insertable by pro" ON public.proposal_attachments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.proposals p WHERE p.id = proposal_id AND public.is_professional_owner(p.professional_profile_id))
);

CREATE POLICY "Invitations viewable by client or pro" ON public.invitations FOR SELECT USING (
    public.is_client_owner(client_profile_id) OR
    public.is_professional_owner(professional_profile_id)
);
CREATE POLICY "Invitations insertable by client" ON public.invitations FOR INSERT WITH CHECK (public.is_client_owner(client_profile_id));
CREATE POLICY "Invitations updatable by client or pro" ON public.invitations FOR UPDATE USING (
    public.is_client_owner(client_profile_id) OR
    public.is_professional_owner(professional_profile_id)
);


-- =============================================
-- FILE: 20260929000008_create_messaging.sql
-- =============================================

-- 20260929000008_create_messaging.sql

CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id),
    contract_id UUID,
    participant_one_id UUID NOT NULL REFERENCES public.users(id),
    participant_two_id UUID NOT NULL REFERENCES public.users(id),
    is_system_created BOOLEAN NOT NULL DEFAULT false,
    last_message_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (project_id, participant_one_id, participant_two_id)
);
COMMENT ON TABLE public.conversations IS 'Conversations between users.';

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users(id),
    content TEXT NOT NULL,
    message_type TEXT NOT NULL DEFAULT 'text',
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    is_flagged BOOLEAN NOT NULL DEFAULT false,
    flag_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.messages IS 'Messages within conversations.';

CREATE TABLE public.message_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.message_attachments IS 'Attachments sent in messages.';

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Conversations viewable by participants" ON public.conversations FOR SELECT USING (
    auth.uid() = participant_one_id OR auth.uid() = participant_two_id
);
CREATE POLICY "Conversations insertable by participants" ON public.conversations FOR INSERT WITH CHECK (
    auth.uid() = participant_one_id OR auth.uid() = participant_two_id
);
CREATE POLICY "Conversations updatable by participants" ON public.conversations FOR UPDATE USING (
    auth.uid() = participant_one_id OR auth.uid() = participant_two_id
);

CREATE POLICY "Messages viewable by conversation participants" ON public.messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.participant_one_id = auth.uid() OR c.participant_two_id = auth.uid()))
);
CREATE POLICY "Messages insertable by sender" ON public.messages FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.participant_one_id = auth.uid() OR c.participant_two_id = auth.uid()))
);
CREATE POLICY "Messages updatable by sender" ON public.messages FOR UPDATE USING (sender_id = auth.uid());

CREATE POLICY "Message_attachments viewable by participants" ON public.message_attachments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.messages m JOIN public.conversations c ON m.conversation_id = c.id WHERE m.id = message_id AND (c.participant_one_id = auth.uid() OR c.participant_two_id = auth.uid()))
);
CREATE POLICY "Message_attachments insertable by sender" ON public.message_attachments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.messages m WHERE m.id = message_id AND m.sender_id = auth.uid())
);


-- =============================================
-- FILE: 20260929000009_create_contracts_milestones.sql
-- =============================================

-- 20260929000009_create_contracts_milestones.sql

CREATE TABLE public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id),
    proposal_id UUID NOT NULL REFERENCES public.proposals(id),
    client_profile_id UUID NOT NULL REFERENCES public.client_profiles(id),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id),
    title TEXT NOT NULL,
    scope_of_work TEXT NOT NULL,
    total_amount_cents BIGINT NOT NULL,
    platform_fee_cents BIGINT NOT NULL,
    professional_earnings_cents BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status contract_status NOT NULL DEFAULT 'draft',
    start_date DATE,
    end_date DATE,
    offered_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.contracts IS 'Contracts for projects.';

CREATE TABLE public.milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    amount_cents BIGINT NOT NULL CHECK (amount_cents > 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    deadline TIMESTAMPTZ NOT NULL,
    status milestone_status NOT NULL DEFAULT 'pending',
    payment_state payment_state NOT NULL DEFAULT 'created',
    order_index INTEGER NOT NULL DEFAULT 0,
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES public.users(id),
    submission_notes TEXT,
    rejection_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.milestones IS 'Milestones for contracts.';

CREATE TABLE public.milestone_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_id UUID NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT,
    uploaded_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.milestone_deliverables IS 'Deliverables submitted for milestones.';

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestone_deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contracts viewable by parties" ON public.contracts FOR SELECT USING (
    public.is_client_owner(client_profile_id) OR public.is_professional_owner(professional_profile_id)
);
CREATE POLICY "Contracts insertable by client" ON public.contracts FOR INSERT WITH CHECK (
    public.is_client_owner(client_profile_id)
);
CREATE POLICY "Contracts updatable by parties" ON public.contracts FOR UPDATE USING (
    public.is_client_owner(client_profile_id) OR public.is_professional_owner(professional_profile_id)
);

CREATE POLICY "Milestones viewable by parties" ON public.milestones FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.contracts c WHERE c.id = contract_id AND (public.is_client_owner(c.client_profile_id) OR public.is_professional_owner(c.professional_profile_id)))
);
CREATE POLICY "Milestones insert/update by parties" ON public.milestones FOR ALL USING (
    EXISTS (SELECT 1 FROM public.contracts c WHERE c.id = contract_id AND (public.is_client_owner(c.client_profile_id) OR public.is_professional_owner(c.professional_profile_id)))
);

CREATE POLICY "Milestone_deliverables viewable by parties" ON public.milestone_deliverables FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.milestones m JOIN public.contracts c ON m.contract_id = c.id WHERE m.id = milestone_id AND (public.is_client_owner(c.client_profile_id) OR public.is_professional_owner(c.professional_profile_id)))
);
CREATE POLICY "Milestone_deliverables insert by parties" ON public.milestone_deliverables FOR INSERT WITH CHECK (
    uploaded_by = auth.uid() AND EXISTS (SELECT 1 FROM public.milestones m JOIN public.contracts c ON m.contract_id = c.id WHERE m.id = milestone_id AND (public.is_client_owner(c.client_profile_id) OR public.is_professional_owner(c.professional_profile_id)))
);


-- =============================================
-- FILE: 20260929000010_create_payments_ledger.sql
-- =============================================

-- 20260929000010_create_payments_ledger.sql

CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id),
    milestone_id UUID NOT NULL REFERENCES public.milestones(id),
    client_profile_id UUID NOT NULL REFERENCES public.client_profiles(id),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id),
    amount_cents BIGINT NOT NULL CHECK (amount_cents > 0),
    platform_fee_cents BIGINT NOT NULL CHECK (platform_fee_cents >= 0),
    professional_earnings_cents BIGINT NOT NULL CHECK (professional_earnings_cents > 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    payment_provider TEXT NOT NULL,
    provider_payment_id TEXT UNIQUE,
    provider_customer_id TEXT,
    idempotency_key UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    state payment_state NOT NULL DEFAULT 'created',
    captured_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    failure_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.payments IS 'Payments for milestones.';

CREATE TABLE public.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES public.payments(id),
    event_type TEXT NOT NULL,
    provider_event_id TEXT,
    previous_state payment_state,
    new_state payment_state NOT NULL,
    payload JSONB,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.payment_events IS 'Audit trail of payment state changes.';

CREATE TABLE public.ledger_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_group_id UUID NOT NULL,
    payment_id UUID REFERENCES public.payments(id),
    contract_id UUID REFERENCES public.contracts(id),
    milestone_id UUID REFERENCES public.milestones(id),
    entry_type TEXT NOT NULL,
    account_id TEXT NOT NULL,
    debit_cents BIGINT NOT NULL DEFAULT 0 CHECK (debit_cents >= 0),
    credit_cents BIGINT NOT NULL DEFAULT 0 CHECK (credit_cents >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT double_entry CHECK ((debit_cents > 0 AND credit_cents = 0) OR (credit_cents > 0 AND debit_cents = 0))
);
COMMENT ON TABLE public.ledger_entries IS 'Immutable double-entry ledger.';

CREATE TABLE public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES public.payments(id),
    professional_profile_id UUID NOT NULL REFERENCES public.professional_profiles(id),
    amount_cents BIGINT NOT NULL CHECK (amount_cents > 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    payment_provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    provider_payout_id TEXT,
    status payout_status NOT NULL DEFAULT 'pending',
    initiated_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    failure_reason TEXT,
    idempotency_key UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.payouts IS 'Payouts to professionals.';

CREATE TABLE public.refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES public.payments(id),
    amount_cents BIGINT NOT NULL CHECK (amount_cents > 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    reason TEXT NOT NULL,
    provider_refund_id TEXT,
    status refund_status NOT NULL DEFAULT 'pending',
    requested_by UUID NOT NULL REFERENCES public.users(id),
    processed_by UUID REFERENCES public.users(id),
    idempotency_key UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);
COMMENT ON TABLE public.refunds IS 'Refunds for payments.';

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payments viewable by parties" ON public.payments FOR SELECT USING (
    public.is_client_owner(client_profile_id) OR public.is_professional_owner(professional_profile_id)
);
CREATE POLICY "Payment_events viewable by admins" ON public.payment_events FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Ledger_entries viewable by admins" ON public.ledger_entries FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
-- Ledger entries are INSERT only, enforced via lack of UPDATE/DELETE policies or explicit triggers
CREATE POLICY "Ledger_entries insertable by system" ON public.ledger_entries FOR INSERT WITH CHECK (
    -- Typically restricted to service role or secure functions
    true
);

CREATE POLICY "Payouts viewable by pro or admins" ON public.payouts FOR SELECT USING (
    public.is_professional_owner(professional_profile_id) OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Refunds viewable by parties" ON public.refunds FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.payments p WHERE p.id = payment_id AND (public.is_client_owner(p.client_profile_id) OR public.is_professional_owner(p.professional_profile_id)))
);


-- =============================================
-- FILE: 20260929000011_create_disputes.sql
-- =============================================

-- 20260929000011_create_disputes.sql

CREATE TABLE public.disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id),
    milestone_id UUID REFERENCES public.milestones(id),
    raised_by UUID NOT NULL REFERENCES public.users(id),
    against UUID NOT NULL REFERENCES public.users(id),
    reason TEXT NOT NULL,
    description TEXT NOT NULL,
    status dispute_status NOT NULL DEFAULT 'open',
    resolution TEXT,
    resolution_amount_cents BIGINT,
    assigned_admin_id UUID REFERENCES public.users(id),
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.disputes IS 'Disputes raised on contracts or milestones.';

CREATE TABLE public.dispute_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispute_id UUID NOT NULL REFERENCES public.disputes(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES public.users(id),
    evidence_type TEXT,
    description TEXT,
    storage_path TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.dispute_evidence IS 'Evidence submitted for disputes.';

CREATE TABLE public.dispute_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispute_id UUID NOT NULL REFERENCES public.disputes(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users(id),
    content TEXT NOT NULL,
    is_admin_message BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.dispute_messages IS 'Messages within disputes.';

ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispute_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispute_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Disputes viewable by parties and admins" ON public.disputes FOR SELECT USING (
    auth.uid() = raised_by OR auth.uid() = against OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Disputes insertable by parties" ON public.disputes FOR INSERT WITH CHECK (auth.uid() = raised_by);
CREATE POLICY "Disputes updatable by admins" ON public.disputes FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Dispute_evidence viewable by parties and admins" ON public.dispute_evidence FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.disputes d WHERE d.id = dispute_id AND (auth.uid() = d.raised_by OR auth.uid() = d.against OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')))
);
CREATE POLICY "Dispute_evidence insertable by submitter" ON public.dispute_evidence FOR INSERT WITH CHECK (
    auth.uid() = submitted_by
);

CREATE POLICY "Dispute_messages viewable by parties and admins" ON public.dispute_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.disputes d WHERE d.id = dispute_id AND (auth.uid() = d.raised_by OR auth.uid() = d.against OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')))
);
CREATE POLICY "Dispute_messages insertable by sender" ON public.dispute_messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id
);


-- =============================================
-- FILE: 20260929000012_create_reviews_notifications.sql
-- =============================================

-- 20260929000012_create_reviews_notifications.sql

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id),
    reviewer_id UUID NOT NULL REFERENCES public.users(id),
    reviewee_id UUID NOT NULL REFERENCES public.users(id),
    review_type review_type NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    content TEXT NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT true,
    is_flagged BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (contract_id, reviewer_id)
);
COMMENT ON TABLE public.reviews IS 'Reviews left by users for each other.';

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.notifications IS 'Notifications for users.';

CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES public.users(id),
    reported_user_id UUID NOT NULL REFERENCES public.users(id),
    reported_content_type TEXT NOT NULL,
    reported_content_id UUID,
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    reviewed_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.reports IS 'Content or user reports.';

CREATE TABLE public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    status ticket_status NOT NULL DEFAULT 'open',
    priority TEXT NOT NULL DEFAULT 'normal',
    assigned_to UUID REFERENCES public.users(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.support_tickets IS 'Support tickets raised by users.';

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews viewable publicly if public" ON public.reviews FOR SELECT USING (is_public = true OR auth.uid() = reviewer_id OR auth.uid() = reviewee_id);
CREATE POLICY "Reviews insertable by reviewer" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Notifications viewable by owner" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Notifications updatable by owner" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Reports insertable by reporter" ON public.reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Reports viewable by reporter or admins" ON public.reports FOR SELECT USING (auth.uid() = reporter_id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Tickets viewable by owner or admins" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'support')));
CREATE POLICY "Tickets insertable by owner" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tickets updatable by owner or admins" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'support')));


-- =============================================
-- FILE: 20260929000013_create_admin_fraud_audit.sql
-- =============================================

-- 20260929000013_create_admin_fraud_audit.sql

CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    admin_role admin_role NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.admin_users IS 'Admin roles and assignments.';

CREATE TABLE public.fraud_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flagged_user_id UUID NOT NULL REFERENCES public.users(id),
    flag_type TEXT NOT NULL,
    risk_level risk_level NOT NULL DEFAULT 'medium',
    description TEXT NOT NULL,
    evidence JSONB,
    detected_by TEXT NOT NULL DEFAULT 'system',
    reviewed_by UUID REFERENCES public.users(id),
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);
COMMENT ON TABLE public.fraud_flags IS 'Flags for suspicious or fraudulent activity.';

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.users(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    previous_value JSONB,
    new_value JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.audit_logs IS 'Immutable audit logs for sensitive actions.';

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins viewable by admins" ON public.admin_users FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Fraud flags viewable by admins" ON public.fraud_flags FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Fraud flags updatable by admins" ON public.fraud_flags FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Audit logs viewable by admins" ON public.audit_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
-- Audit logs are insert-only by system, no update/delete
CREATE POLICY "Audit logs insertable by system" ON public.audit_logs FOR INSERT WITH CHECK (true);


-- =============================================
-- FILE: 20260929000014_create_indexes.sql
-- =============================================

-- 20260929000014_create_indexes.sql

CREATE INDEX idx_professional_profiles_search ON public.professional_profiles(verification_status, is_publicly_visible, industry, eligibility_route);
CREATE INDEX idx_projects_search ON public.projects(status, category, client_profile_id, created_at);
CREATE INDEX idx_proposals_lookup ON public.proposals(project_id, professional_profile_id, status);
CREATE INDEX idx_contracts_lookup ON public.contracts(client_profile_id, professional_profile_id, status);
CREATE INDEX idx_milestones_lookup ON public.milestones(contract_id, status, payment_state);
CREATE INDEX idx_payments_lookup ON public.payments(contract_id, milestone_id, state);
CREATE INDEX idx_ledger_entries_lookup ON public.ledger_entries(transaction_group_id, payment_id, contract_id, created_at);
CREATE INDEX idx_messages_lookup ON public.messages(conversation_id, sender_id, created_at);
CREATE INDEX idx_notifications_lookup ON public.notifications(user_id, is_read, created_at);
CREATE INDEX idx_audit_logs_lookup ON public.audit_logs(actor_id, action, resource_type, created_at);
CREATE INDEX idx_fraud_flags_lookup ON public.fraud_flags(flagged_user_id, is_resolved, risk_level);


-- =============================================
-- FILE: 20260929000015_create_functions_triggers.sql
-- =============================================

-- 20260929000015_create_functions_triggers.sql

-- 1. update_updated_at()
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. Apply trigger
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_professional_profiles_updated_at BEFORE UPDATE ON public.professional_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON public.client_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON public.milestones FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON public.disputes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. increment_proposal_count()
CREATE OR REPLACE FUNCTION public.increment_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.projects
    SET proposal_count = proposal_count + 1
    WHERE id = NEW.project_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_proposal_created
    AFTER INSERT ON public.proposals
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_proposal_count();

-- 4. check_refund_total()
CREATE OR REPLACE FUNCTION public.check_refund_total()
RETURNS TRIGGER AS $$
DECLARE
    total_refunded BIGINT;
    original_amount BIGINT;
BEGIN
    SELECT amount_cents INTO original_amount FROM public.payments WHERE id = NEW.payment_id;
    SELECT COALESCE(SUM(amount_cents), 0) INTO total_refunded FROM public.refunds WHERE payment_id = NEW.payment_id AND status != 'failed';
    
    IF total_refunded + NEW.amount_cents > original_amount THEN
        RAISE EXCEPTION 'Total refunds cannot exceed original payment amount.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_refund_limit
    BEFORE INSERT ON public.refunds
    FOR EACH ROW
    EXECUTE FUNCTION public.check_refund_total();

-- 5. calculate_profile_completion()
CREATE OR REPLACE FUNCTION public.calculate_profile_completion(prof_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    prof RECORD;
    prof_count INTEGER;
BEGIN
    SELECT * INTO prof FROM public.professional_profiles WHERE id = prof_id;
    IF NOT FOUND THEN RETURN 0; END IF;
    
    IF prof.professional_title IS NOT NULL AND prof.professional_title != '' THEN score := score + 10; END IF;
    IF prof.industry IS NOT NULL AND prof.industry != '' THEN score := score + 10; END IF;
    IF prof.specialization IS NOT NULL AND prof.specialization != '' THEN score := score + 10; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.experience WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 20; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.education WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 10; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.professional_skills WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 20; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.portfolio WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 20; END IF;
    
    RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;


-- =============================================
-- FILE: 20260929000016_seed_skills_categories.sql
-- =============================================

-- 20260929000016_seed_skills_categories.sql

-- Insert Skills
INSERT INTO public.skills (name, category) VALUES
('JavaScript', 'Software Engineering'),
('TypeScript', 'Software Engineering'),
('Python', 'Software Engineering'),
('Java', 'Software Engineering'),
('Go', 'Software Engineering'),
('Rust', 'Software Engineering'),
('SQL', 'Software Engineering'),
('PostgreSQL', 'Software Engineering'),
('React', 'Software Engineering'),
('Next.js', 'Software Engineering'),
('Node.js', 'Software Engineering'),
('AWS', 'Software Engineering'),
('Azure', 'Software Engineering'),
('GCP', 'Software Engineering'),
('Docker', 'Software Engineering'),
('Kubernetes', 'Software Engineering'),
('CI/CD', 'Software Engineering'),

('R', 'Data Science'),
('TensorFlow', 'Data Science'),
('PyTorch', 'Data Science'),
('Pandas', 'Data Science'),
('Spark', 'Data Science'),
('Statistics', 'Data Science'),
('ML', 'Data Science'),
('Deep Learning', 'Data Science'),

('Penetration Testing', 'Cybersecurity'),
('SIEM', 'Cybersecurity'),
('SOC', 'Cybersecurity'),
('Network Security', 'Cybersecurity'),
('Cloud Security', 'Cybersecurity'),
('ISO 27001', 'Cybersecurity'),

('CAD', 'Mechanical Engineering'),
('SolidWorks', 'Mechanical Engineering'),
('AutoCAD', 'Mechanical Engineering'),
('FEA', 'Mechanical Engineering'),
('ANSYS', 'Mechanical Engineering'),
('Product Design', 'Mechanical Engineering'),
('Manufacturing', 'Mechanical Engineering'),

('Structural Analysis', 'Civil Engineering'),
('Revit', 'Civil Engineering'),
('Project Planning', 'Civil Engineering'),

('BIM', 'Architecture'),
('Urban Planning', 'Architecture'),

('PMP', 'Project Management'),
('Agile', 'Project Management'),
('Scrum', 'Project Management'),
('PRINCE2', 'Project Management'),
('Risk Management', 'Project Management'),
('Stakeholder Management', 'Project Management'),

('Strategy', 'Business Consulting'),
('Operations', 'Business Consulting'),
('Digital Transformation', 'Business Consulting'),
('Change Management', 'Business Consulting'),

('Financial Modeling', 'Finance'),
('Excel', 'Finance'),
('Bloomberg', 'Finance'),
('Risk', 'Finance'),
('Compliance', 'Finance'),
('Auditing', 'Finance'),

('Healthcare Management', 'Healthcare Consulting'),
('Medical Writing', 'Healthcare Consulting'),
('Regulatory Affairs', 'Healthcare Consulting')
ON CONFLICT (name) DO NOTHING;


-- =============================================
-- FILE: 20260929000017_create_storage_buckets.sql
-- =============================================

-- 20260929000017_create_storage_buckets.sql
-- ZENITH Marketplace Storage Buckets and Security Access Policies

-- 1. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('verification-documents', 'verification-documents', false, 20971520, ARRAY['application/pdf', 'image/jpeg', 'image/png']),
  ('milestone-deliverables', 'milestone-deliverables', false, 52428800, ARRAY['application/pdf', 'application/zip', 'application/x-zip-compressed', 'image/jpeg', 'image/png', 'text/plain'])
ON CONFLICT (id) DO NOTHING;

-- 2. Avatars RLS: Public read, Authenticated write for own folder
DROP POLICY IF EXISTS "Public Read Avatars" ON storage.objects;
CREATE POLICY "Public Read Avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 3. Verification Documents RLS: Private, owner and admin read/write
DROP POLICY IF EXISTS "Users can view own verification documents" ON storage.objects;
CREATE POLICY "Users can view own verification documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'verification-documents'
    AND (
      (storage.foldername(name))[2] = auth.uid()::text
      OR EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() AND is_active = true
      )
    )
  );

DROP POLICY IF EXISTS "Users can upload own verification documents" ON storage.objects;
CREATE POLICY "Users can upload own verification documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- 4. Milestone Deliverables RLS: Contract participants and Admins
DROP POLICY IF EXISTS "Contract parties and admins can view deliverables" ON storage.objects;
CREATE POLICY "Contract parties and admins can view deliverables"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'milestone-deliverables'
    AND (
      EXISTS (
        SELECT 1 FROM public.contracts c
        JOIN public.client_profiles cp ON c.client_profile_id = cp.id
        JOIN public.profiles client_p ON cp.profile_id = client_p.id
        JOIN public.professional_profiles pp ON c.professional_profile_id = pp.id
        JOIN public.profiles pro_p ON pp.profile_id = pro_p.id
        WHERE c.id::text = (storage.foldername(name))[1]
          AND (client_p.user_id = auth.uid() OR pro_p.user_id = auth.uid())
      )
      OR EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() AND is_active = true
      )
    )
  );

DROP POLICY IF EXISTS "Contract parties can upload deliverables" ON storage.objects;
CREATE POLICY "Contract parties can upload deliverables"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'milestone-deliverables'
    AND EXISTS (
      SELECT 1 FROM public.contracts c
      JOIN public.professional_profiles pp ON c.professional_profile_id = pp.id
      JOIN public.profiles pro_p ON pp.profile_id = pro_p.id
      WHERE c.id::text = (storage.foldername(name))[1]
        AND pro_p.user_id = auth.uid()
    )
  );


