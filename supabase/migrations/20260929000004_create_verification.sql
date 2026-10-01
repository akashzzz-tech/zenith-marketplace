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
