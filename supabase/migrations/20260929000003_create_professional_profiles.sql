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
