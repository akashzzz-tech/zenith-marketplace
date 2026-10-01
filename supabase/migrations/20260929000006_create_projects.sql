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
