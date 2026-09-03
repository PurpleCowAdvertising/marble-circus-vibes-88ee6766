GRANT SELECT ON public.social_posts TO anon;

CREATE POLICY "Public can view published social posts"
ON public.social_posts
FOR SELECT
TO anon
USING (published = true);

CREATE POLICY "Service role manages social posts"
ON public.social_posts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role manages social thumbnails"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'social-thumbs')
WITH CHECK (bucket_id = 'social-thumbs');