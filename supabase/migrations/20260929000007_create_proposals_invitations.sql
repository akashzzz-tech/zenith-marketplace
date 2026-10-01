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
