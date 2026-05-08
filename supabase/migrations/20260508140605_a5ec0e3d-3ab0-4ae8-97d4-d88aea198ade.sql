CREATE TABLE public.consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marketing_consent boolean NOT NULL DEFAULT false,
  privacy_consent boolean NOT NULL DEFAULT false,
  source text,
  user_agent text,
  consent_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record consent"
  ON public.consent_records
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (privacy_consent IS NOT NULL);