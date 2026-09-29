CREATE TABLE public.show_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.show_feedback TO anon, authenticated;
GRANT ALL ON public.show_feedback TO service_role;

ALTER TABLE public.show_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON public.show_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Deny read of feedback to anon/authenticated"
  ON public.show_feedback
  FOR SELECT
  TO anon, authenticated
  USING (false);