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
