import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type SocialPlatform = "instagram" | "facebook" | "youtube" | "tiktok";

export type SocialPost = {
  id: string;
  platform: SocialPlatform;
  post_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  is_video: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

const socialPostInput = z.object({
  platform: z.enum(["instagram", "facebook", "youtube", "tiktok"]),
  post_url: z.string().url().max(2000),
  thumbnail_url: z.string().max(2000).nullable().optional(),
  caption: z.string().max(500).nullable().optional(),
  is_video: z.boolean().optional(),
  sort_order: z.number().int().min(-100000).max(100000).optional(),
  published: z.boolean().optional(),
});

async function assertAdmin(context: { claims: unknown }) {
  const email = (context.claims as { email?: string } | undefined)?.email;
  const { isAdminEmail } = await import("./admin.server");
  if (!isAdminEmail(email)) throw new Error("Forbidden");
}

async function withSignedThumbnail(row: SocialPost): Promise<SocialPost> {
  if (!row.thumbnail_url?.startsWith("storage:")) return row;

  const path = row.thumbnail_url.slice("storage:".length);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.storage.from("social-thumbs").createSignedUrl(path, 3600);

  return { ...row, thumbnail_url: data?.signedUrl ?? null };
}

export const getPublicSocialPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("social_posts")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return Promise.all(((data ?? []) as SocialPost[]).map(withSignedThumbnail));
});

export const listSocialPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("social_posts")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as SocialPost[];
  });

export const createSocialPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => socialPostInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("social_posts").insert(data).select("*").single();
    if (error) throw error;
    return row as SocialPost;
  });

export const updateSocialPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid(), updates: socialPostInput.partial() }).parse(data),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("social_posts")
      .update({ ...data.updates, updated_at: new Date().toISOString() })
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw error;
    return row as SocialPost;
  });

export const deleteSocialPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("social_posts").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const uploadSocialThumbnail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("A thumbnail file is required");
    return data;
  })
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const file = data.get("file");
    if (!(file instanceof File)) throw new Error("A thumbnail file is required");
    if (!file.type.startsWith("image/")) throw new Error("Thumbnail must be an image");
    if (file.size > 10 * 1024 * 1024) throw new Error("Thumbnail must be 10 MB or smaller");

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `social/${crypto.randomUUID()}.${extension}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("social-thumbs").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;

    return { thumbnail_url: `storage:${path}` };
  });
