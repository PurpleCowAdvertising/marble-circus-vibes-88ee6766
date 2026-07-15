import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SubscriberExportRow = {
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  marketing_consent: boolean;
  privacy_consent: boolean;
  source: string | null;
};

export const exportSubscribersCsv = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = (context.claims as { email?: string } | undefined)?.email;
    const { isAdminEmail } = await import("./admin.server");
    if (!isAdminEmail(email)) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("subscribers")
      .select(
        "created_at, first_name, last_name, name, email, phone, country, marketing_consent, privacy_consent, source",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    const rows = (data ?? []) as SubscriberExportRow[];
    const headers = [
      "created_at",
      "first_name",
      "last_name",
      "name",
      "email",
      "phone",
      "country",
      "marketing_consent",
      "privacy_consent",
      "source",
    ] as const;

    const escape = (v: unknown) => {
      if (v === null || v === undefined) return "";
      const s = String(v);
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
    ].join("\n");

    return { csv, count: rows.length };
  });
