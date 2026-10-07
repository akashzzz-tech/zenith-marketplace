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
