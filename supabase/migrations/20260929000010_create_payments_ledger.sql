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
