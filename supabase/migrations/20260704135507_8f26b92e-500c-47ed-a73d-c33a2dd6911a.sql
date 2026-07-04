-- Replace SECURITY DEFINER function with a restricted view for public visibility reads.
DROP FUNCTION IF EXISTS public.get_hidden_live_keys();

CREATE OR REPLACE VIEW public.content_visibility_live_hidden
WITH (security_invoker = false) AS
SELECT key FROM public.content_visibility WHERE live_hidden = true;

GRANT SELECT ON public.content_visibility_live_hidden TO anon, authenticated;