import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, LogOut, Search, ExternalLink, Loader2, Download } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  discardVisibility,
  getAdminSession,
  listVisibility,
  publishVisibility,
  setDraftHidden,
  type AdminRow,
} from "@/lib/visibility.functions";
import { exportSubscribersCsv } from "@/lib/subscribers.functions";
import { useInvalidatePublicVisibility } from "@/components/site/visibility";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Content Visibility Manager" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const invalidatePublic = useInvalidatePublicVisibility();

  const getSession = useServerFn(getAdminSession);
  const listFn = useServerFn(listVisibility);
  const toggleFn = useServerFn(setDraftHidden);
  const publishFn = useServerFn(publishVisibility);
  const discardFn = useServerFn(discardVisibility);

  const [authState, setAuthState] = useState<"checking" | "unauth" | "notAdmin" | "ok">("checking");
  const [email, setEmail] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  // Check session + admin role up front.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!data.session) {
        setAuthState("unauth");
        return;
      }
      try {
        const info = await getSession();
        if (cancelled) return;
        setEmail(info.email);
        setAuthState(info.isAdmin ? "ok" : "notAdmin");
      } catch {
        setAuthState("unauth");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getSession]);

  const rowsQuery = useQuery({
    queryKey: ["admin-visibility"],
    queryFn: () => listFn(),
    enabled: authState === "ok",
    staleTime: 5_000,
  });

  const toggleMutation = useMutation({
    mutationFn: (updates: { key: string; hidden: boolean }[]) => toggleFn({ data: { updates } }),
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ["admin-visibility"] });
      const prev = queryClient.getQueryData<{ rows: AdminRow[] }>(["admin-visibility"]);
      if (prev) {
        const map = new Map(updates.map((u) => [u.key, u.hidden]));
        queryClient.setQueryData(["admin-visibility"], {
          rows: prev.rows.map((r) => (map.has(r.key) ? { ...r, draft_hidden: map.get(r.key)! } : r)),
        });
      }
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admin-visibility"], ctx.prev);
      toast.error("Could not save toggle. Try again.");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-visibility"] }),
  });

  const publishMutation = useMutation({
    mutationFn: () => publishFn(),
    onSuccess: (res) => {
      toast.success(`Published ${res.publishedCount} change${res.publishedCount === 1 ? "" : "s"}.`);
      queryClient.invalidateQueries({ queryKey: ["admin-visibility"] });
      invalidatePublic();
    },
    onError: () => toast.error("Publish failed. Try again."),
  });

  const discardMutation = useMutation({
    mutationFn: () => discardFn(),
    onSuccess: (res) => {
      toast.success(`Discarded ${res.discardedCount} change${res.discardedCount === 1 ? "" : "s"}.`);
      queryClient.invalidateQueries({ queryKey: ["admin-visibility"] });
    },
    onError: () => toast.error("Could not discard changes."),
  });

  const rows = rowsQuery.data?.rows ?? [];
  const pending = rows.filter((r) => r.draft_hidden !== r.live_hidden);
  const pages = useMemo(() => rows.filter((r) => r.kind === "page"), [rows]);
  const sectionsByParent = useMemo(() => {
    const map = new Map<string, AdminRow[]>();
    for (const r of rows.filter((x) => x.kind === "section")) {
      const p = r.parent_key ?? "_orphan";
      if (!map.has(p)) map.set(p, []);
      map.get(p)!.push(r);
    }
    return map;
  }, [rows]);

  const filteredPages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter((p) => {
      if (p.label.toLowerCase().includes(q) || p.key.toLowerCase().includes(q)) return true;
      const kids = sectionsByParent.get(p.key) ?? [];
      return kids.some((k) => k.label.toLowerCase().includes(q) || k.key.toLowerCase().includes(q));
    });
  }, [pages, sectionsByParent, search]);

  // ---- Loading / auth screens ----
  if (authState === "checking") return <Center>Loading…</Center>;
  if (authState === "unauth") {
    navigate({ to: "/auth", replace: true });
    return <Center>Redirecting to sign in…</Center>;
  }
  if (authState === "notAdmin") {
    return (
      <Center>
        <div className="max-w-md text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Not authorised</p>
          <h1 className="mt-3 font-display text-3xl font-bold">This account isn’t on the admin allow-list.</h1>
          {email && <p className="mt-2 text-sm text-white/60">Signed in as {email}</p>}
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth", replace: true });
            }}
            className="mt-6 rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black"
          >
            Sign out
          </button>
        </div>
      </Center>
    );
  }

  // ---- Main dashboard ----
  const selectedRow = selected ? rows.find((r) => r.key === selected) ?? null : null;

  async function togglePage(page: AdminRow, hidden: boolean) {
    const kids = sectionsByParent.get(page.key) ?? [];
    toggleMutation.mutate([{ key: page.key, hidden }, ...kids.map((k) => ({ key: k.key, hidden }))]);
  }

  return (
    <div className="min-h-[100dvh] bg-neutral-950 text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Content visibility</p>
            <span className="hidden text-xs text-white/40 md:inline">Draft workflow · publish to apply</span>
          </div>

          <div className="flex items-center gap-2">
            {pending.length > 0 ? (
              <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">
                {pending.length} pending
              </span>
            ) : (
              <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-widest text-white/50">
                In sync
              </span>
            )}

            <button
              type="button"
              disabled={pending.length === 0 || discardMutation.isPending}
              onClick={() => discardMutation.mutate()}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-white/30 disabled:opacity-40"
            >
              Discard
            </button>

            <button
              type="button"
              disabled={pending.length === 0 || publishMutation.isPending}
              onClick={() => publishMutation.mutate()}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-black transition hover:scale-[1.02] disabled:opacity-40"
            >
              {publishMutation.isPending && <Loader2 size={13} className="animate-spin" />}
              Publish
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white"
            >
              <ExternalLink size={12} /> Live
            </a>

            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth", replace: true });
              }}
              title="Sign out"
              className="ml-1 rounded-full p-2 text-white/60 hover:bg-white/[0.06] hover:text-white"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:grid-cols-[360px_1fr]">
        {/* Sidebar: page tree */}
        <aside className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages, sections…"
              className="w-full rounded-full border border-white/10 bg-black/40 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="mt-3 space-y-2">
            {rowsQuery.isLoading && <p className="p-3 text-xs text-white/50">Loading…</p>}
            {filteredPages.map((p) => {
              const kids = sectionsByParent.get(p.key) ?? [];
              return (
                <div key={p.key} className="rounded-xl border border-white/10 bg-black/30">
                  <button
                    type="button"
                    onClick={() => setSelected(p.key)}
                    className={`flex w-full items-center justify-between gap-2 rounded-t-xl px-3 py-2.5 text-left transition hover:bg-white/[0.04] ${
                      selected === p.key ? "bg-white/[0.06]" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{p.label}</p>
                      <p className="truncate text-[10px] uppercase tracking-widest text-white/40">{p.key}</p>
                    </div>
                    <StatusPill row={p} />
                  </button>

                  {kids.length > 0 && (
                    <ul className="divide-y divide-white/5 border-t border-white/5">
                      {kids.map((k) => (
                        <li key={k.key}>
                          <button
                            type="button"
                            onClick={() => setSelected(k.key)}
                            className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition hover:bg-white/[0.04] ${
                              selected === k.key ? "bg-white/[0.06]" : ""
                            }`}
                          >
                            <span className="truncate text-xs text-white/75">{k.label}</span>
                            <StatusPill row={k} compact />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Detail pane */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          {selectedRow ? (
            <DetailPane
              row={selectedRow}
              onToggle={(hidden) => {
                if (selectedRow.kind === "page") {
                  togglePage(selectedRow, hidden);
                } else {
                  toggleMutation.mutate([{ key: selectedRow.key, hidden }]);
                }
              }}
              onBulk={
                selectedRow.kind === "page"
                  ? (hidden) => {
                      const kids = sectionsByParent.get(selectedRow.key) ?? [];
                      if (kids.length === 0) return;
                      toggleMutation.mutate(kids.map((k) => ({ key: k.key, hidden })));
                    }
                  : undefined
              }
              busy={toggleMutation.isPending}
            />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center text-center text-white/50">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Select</p>
                <p className="mt-3 max-w-sm text-sm">
                  Choose a page or section from the left to view its status, toggle its visibility, or run bulk actions.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatusPill({ row, compact = false }: { row: AdminRow; compact?: boolean }) {
  const pending = row.draft_hidden !== row.live_hidden;
  const label = pending
    ? row.draft_hidden
      ? "Pending hide"
      : "Pending show"
    : row.live_hidden
      ? "Hidden"
      : "Live";
  const cls = pending
    ? "bg-gold/15 text-gold border-gold/30"
    : row.live_hidden
      ? "bg-red-500/10 text-red-300 border-red-500/25"
      : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25";
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${cls} ${
        compact ? "" : ""
      }`}
    >
      {label}
    </span>
  );
}

function DetailPane({
  row,
  onToggle,
  onBulk,
  busy,
}: {
  row: AdminRow;
  onToggle: (hidden: boolean) => void;
  onBulk?: (hidden: boolean) => void;
  busy: boolean;
}) {
  const draftHidden = row.draft_hidden;
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
        {row.kind === "page" ? "Page" : "Section"}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-3xl font-bold text-white">{row.label}</h2>
        <StatusPill row={row} />
      </div>
      <p className="mt-1 text-xs text-white/50">{row.key}</p>

      <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Visibility (draft)</p>
          <p className="mt-1 text-xs text-white/55">
            Changes stay in draft until you press <span className="font-semibold text-white/80">Publish</span> at the
            top. Hidden items simply don’t render — the surrounding layout reflows naturally.
          </p>
        </div>

        <button
          type="button"
          disabled={busy}
          onClick={() => onToggle(!draftHidden)}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
            draftHidden ? "bg-red-500/20 text-red-200 hover:bg-red-500/30" : "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
          } disabled:opacity-50`}
        >
          {draftHidden ? <EyeOff size={16} /> : <Eye size={16} />}
          {draftHidden ? "Hidden" : "Visible"}
        </button>
      </div>

      {onBulk && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="text-sm font-semibold text-white">Bulk actions for this page</p>
          <p className="mt-1 text-xs text-white/55">Apply to every section on this page in one click.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => onBulk(false)}
              className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-200 transition hover:bg-emerald-500/30 disabled:opacity-50"
            >
              Show all sections
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onBulk(true)}
              className="rounded-full bg-red-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-200 transition hover:bg-red-500/30 disabled:opacity-50"
            >
              Hide all sections
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 text-xs text-white/50 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="uppercase tracking-widest text-white/40">Live state</p>
          <p className="mt-1 text-white/80">{row.live_hidden ? "Hidden on live site" : "Visible on live site"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="uppercase tracking-widest text-white/40">Last updated</p>
          <p className="mt-1 text-white/80">{new Date(row.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-neutral-950 px-4 text-white">{children}</div>
  );
}
