import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { VISIBILITY_REGISTRY } from "./visibility-registry";

export type PublicVisibility = {
  hiddenLive: string[];
  version: number;
};

export type AdminRow = {
  key: string;
  kind: "page" | "section";
  label: string;
  parent_key: string | null;
  sort_order: number;
  draft_hidden: boolean;
  live_hidden: boolean;
  updated_at: string;
  updated_by: string | null;
};

// ---- Public: what is currently HIDDEN on the live site. Called by every visitor.
export const getPublicVisibility = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const [rowsRes, metaRes] = await Promise.all([
    // Narrow read via a restricted view — only exposes `key` of rows
    // currently hidden on live. Draft state is never exposed to the public.
    supa.from("content_visibility_live_hidden").select("key"),
    supa.from("content_visibility_meta").select("version").eq("id", 1).single(),
  ]);

  const hiddenLive = ((rowsRes.data ?? []) as { key: string }[]).map((r) => r.key);
  const version = metaRes.data?.version ?? 1;
  return { hiddenLive, version } satisfies PublicVisibility;
});

// ---- Admin auth check (used by /admin route to gate access).
export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = (context.claims as { email?: string } | undefined)?.email ?? null;
    const { isAdminEmail } = await import("./admin.server");
    return {
      email,
      isAdmin: isAdminEmail(email),
    };
  });

async function assertAdmin(context: { claims: unknown }) {
  const email = (context.claims as { email?: string } | undefined)?.email;
  const { isAdminEmail } = await import("./admin.server");
  if (!isAdminEmail(email)) {
    throw new Error("Forbidden");
  }
  return email!;
}

// ---- Admin: full list with both draft + live state.
export const listVisibility = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Auto-sync: insert any registry entries missing from DB.
    const { data: existing } = await supabaseAdmin.from("content_visibility").select("key");
    const existingKeys = new Set((existing ?? []).map((r) => r.key));
    const missing = VISIBILITY_REGISTRY.filter((e) => !existingKeys.has(e.key));
    if (missing.length > 0) {
      await supabaseAdmin.from("content_visibility").insert(
        missing.map((e) => ({
          key: e.key,
          kind: e.kind,
          label: e.label,
          parent_key: e.parentKey ?? null,
          sort_order: e.sortOrder,
        })),
      );
    }

    // Also refresh labels/sort_order so registry edits propagate on next admin load.
    for (const entry of VISIBILITY_REGISTRY) {
      if (existingKeys.has(entry.key)) {
        await supabaseAdmin
          .from("content_visibility")
          .update({ label: entry.label, sort_order: entry.sortOrder, parent_key: entry.parentKey ?? null })
          .eq("key", entry.key);
      }
    }

    const { data, error } = await supabaseAdmin
      .from("content_visibility")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;

    return { rows: (data ?? []) as AdminRow[] };
  });

// ---- Admin: toggle draft state for a batch of keys.
export const setDraftHidden = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { updates: { key: string; hidden: boolean }[] }) =>
    z
      .object({
        updates: z
          .array(z.object({ key: z.string().max(200), hidden: z.boolean() }))
          .min(1)
          .max(300),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId as string;

    for (const u of data.updates) {
      const { error } = await supabaseAdmin
        .from("content_visibility")
        .update({ draft_hidden: u.hidden, updated_by: userId })
        .eq("key", u.key);
      if (error) throw error;
    }
    return { ok: true };
  });

// ---- Admin: publish all pending draft changes to live.
export const publishVisibility = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Copy draft_hidden -> live_hidden for rows that differ.
    const { data: pending, error: fetchErr } = await supabaseAdmin
      .from("content_visibility")
      .select("key,draft_hidden,live_hidden");
    if (fetchErr) throw fetchErr;

    const changed = (pending ?? []).filter((r) => r.draft_hidden !== r.live_hidden);
    for (const row of changed) {
      const { error } = await supabaseAdmin
        .from("content_visibility")
        .update({ live_hidden: row.draft_hidden })
        .eq("key", row.key);
      if (error) throw error;
    }

    // Bump version so clients revalidate their cached public visibility.
    const { data: metaRow } = await supabaseAdmin
      .from("content_visibility_meta")
      .select("version")
      .eq("id", 1)
      .single();
    const next = (metaRow?.version ?? 1) + 1;
    await supabaseAdmin
      .from("content_visibility_meta")
      .update({ version: next, published_at: new Date().toISOString() })
      .eq("id", 1);

    return { ok: true, publishedCount: changed.length, version: next };
  });

// ---- Admin: discard draft changes (reset draft to live).
export const discardVisibility = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: pending } = await supabaseAdmin
      .from("content_visibility")
      .select("key,draft_hidden,live_hidden");

    const changed = (pending ?? []).filter((r) => r.draft_hidden !== r.live_hidden);
    for (const row of changed) {
      await supabaseAdmin.from("content_visibility").update({ draft_hidden: row.live_hidden }).eq("key", row.key);
    }

    return { ok: true, discardedCount: changed.length };
  });
