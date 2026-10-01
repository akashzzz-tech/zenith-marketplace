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
