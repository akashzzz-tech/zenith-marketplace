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
