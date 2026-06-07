
CREATE POLICY "Deny read to anon/authenticated" ON public.consent_records FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny read to anon/authenticated" ON public.contact_messages FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny read to anon/authenticated" ON public.subscribers FOR SELECT TO anon, authenticated USING (false);
