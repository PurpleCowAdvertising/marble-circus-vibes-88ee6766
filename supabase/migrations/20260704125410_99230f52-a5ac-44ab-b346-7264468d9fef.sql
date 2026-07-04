
-- Content Visibility Manager: one row per toggleable page/section.
CREATE TABLE public.content_visibility (
  key text PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('page','section')),
  label text NOT NULL,
  parent_key text REFERENCES public.content_visibility(key) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  draft_hidden boolean NOT NULL DEFAULT false,
  live_hidden boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

-- Anon needs to read live_hidden to render the public site (SSR + client).
GRANT SELECT ON public.content_visibility TO anon, authenticated;
GRANT ALL ON public.content_visibility TO service_role;

ALTER TABLE public.content_visibility ENABLE ROW LEVEL SECURITY;

-- Public read only. All writes go through admin-guarded server functions
-- using the service role client.
CREATE POLICY "Public can read visibility"
  ON public.content_visibility
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.touch_content_visibility()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER content_visibility_touch
  BEFORE UPDATE ON public.content_visibility
  FOR EACH ROW EXECUTE FUNCTION public.touch_content_visibility();

-- Bumped whenever admin publishes, so clients can revalidate.
CREATE TABLE public.content_visibility_meta (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  version bigint NOT NULL DEFAULT 1,
  published_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.content_visibility_meta TO anon, authenticated;
GRANT ALL ON public.content_visibility_meta TO service_role;

ALTER TABLE public.content_visibility_meta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visibility meta"
  ON public.content_visibility_meta
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO public.content_visibility_meta (id, version) VALUES (1, 1);
