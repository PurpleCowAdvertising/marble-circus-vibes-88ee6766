DROP VIEW IF EXISTS public.content_visibility_live_hidden;
DROP VIEW IF EXISTS public.content_visibility_public;

DROP POLICY IF EXISTS "Public can read live-hidden keys" ON public.content_visibility;
DROP POLICY IF EXISTS "Public can read visibility" ON public.content_visibility;
DROP POLICY IF EXISTS "Public can read visibility meta" ON public.content_visibility_meta;
DROP POLICY IF EXISTS "Public can read meta" ON public.content_visibility_meta;

REVOKE ALL ON public.content_visibility FROM anon, authenticated;
REVOKE ALL ON public.content_visibility_meta FROM anon, authenticated;

GRANT ALL ON public.content_visibility TO service_role;
GRANT ALL ON public.content_visibility_meta TO service_role;