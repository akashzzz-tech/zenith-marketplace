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
