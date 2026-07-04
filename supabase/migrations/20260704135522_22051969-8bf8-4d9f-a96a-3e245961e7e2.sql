DROP VIEW IF EXISTS public.content_visibility_live_hidden;

CREATE VIEW public.content_visibility_live_hidden
WITH (security_invoker = true) AS
SELECT key FROM public.content_visibility WHERE live_hidden = true;

GRANT SELECT ON public.content_visibility_live_hidden TO anon, authenticated;

-- Column-level grant so anon/authenticated can only read `key` from the base table (needed by the invoker view).
GRANT SELECT (key) ON public.content_visibility TO anon, authenticated;

-- Row-level policy limiting anon/authenticated reads to live-hidden rows.
DROP POLICY IF EXISTS "Public can read live-hidden keys" ON public.content_visibility;
CREATE POLICY "Public can read live-hidden keys"
  ON public.content_visibility
  FOR SELECT
  TO anon, authenticated
  USING (live_hidden = true);