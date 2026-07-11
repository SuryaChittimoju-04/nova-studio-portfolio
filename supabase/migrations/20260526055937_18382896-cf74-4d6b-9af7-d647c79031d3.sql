
-- Fix 1: Remove public read access to avatars bucket
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;

-- Fix 2: Lock down SECURITY DEFINER functions
-- handle_new_user is only invoked by an auth trigger; no one should call it directly
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role is used in RLS; revoke from anon, keep authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(public.app_role) TO authenticated;
