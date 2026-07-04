
DROP VIEW IF EXISTS public.content_visibility_public;

CREATE OR REPLACE FUNCTION public.get_hidden_live_keys()
RETURNS TABLE(key text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT key FROM public.content_visibility WHERE live_hidden = true;
$$;

REVOKE ALL ON FUNCTION public.get_hidden_live_keys() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_hidden_live_keys() TO anon, authenticated;
