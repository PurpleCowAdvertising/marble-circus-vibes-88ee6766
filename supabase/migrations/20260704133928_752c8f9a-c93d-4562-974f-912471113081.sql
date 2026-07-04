
-- Stop exposing draft_hidden to the public. Replace the anon SELECT policy on
-- content_visibility with a narrow view that only surfaces the keys currently
-- hidden on live. The admin dashboard keeps reading the full table via the
-- service-role client (bypasses RLS), so nothing there changes.

DROP POLICY IF EXISTS "Public can read visibility" ON public.content_visibility;

CREATE OR REPLACE VIEW public.content_visibility_public
WITH (security_invoker = false) AS
SELECT key
FROM public.content_visibility
WHERE live_hidden = true;

REVOKE ALL ON public.content_visibility_public FROM PUBLIC;
GRANT SELECT ON public.content_visibility_public TO anon, authenticated;
