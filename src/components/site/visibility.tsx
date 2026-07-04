import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { getPublicVisibility, type PublicVisibility } from "@/lib/visibility.functions";
import { PAGE_KEY_BY_ROUTE } from "@/lib/visibility-registry";

// Public: what's hidden on live. Cached long, revalidated on window focus.
export function usePublicVisibility() {
  return useQuery<PublicVisibility>({
    queryKey: ["public-visibility"],
    queryFn: () => getPublicVisibility(),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    // If the fn ever fails (e.g. cold cache during network hiccup), fail open:
    // treat everything as visible rather than blanking the site.
    placeholderData: { hiddenLive: [], version: 1 },
  });
}

// Small hook: is this specific key hidden right now?
export function useIsHidden(key: string): boolean {
  const { data } = usePublicVisibility();
  if (!data) return false;
  return data.hiddenLive.includes(key);
}

// Wrap sections and pages with this. Hidden = render nothing (layout reflows).
export function VisibilityGate({ keyName, children }: { keyName: string; children: ReactNode }) {
  const hidden = useIsHidden(keyName);
  if (hidden) return null;
  return <>{children}</>;
}

// Wraps a whole page's rendered output. If the page is hidden, renders a 404-style
// screen so the URL is treated as unavailable. Admin can still preview via
// ?preview=draft (that's handled by the admin dashboard iframe, not here — the
// public site always shows live state).
export function PageGate({ keyName, children }: { keyName: string; children: ReactNode }) {
  const hidden = useIsHidden(keyName);
  if (hidden) return <HiddenPageFallback />;
  return <>{children}</>;
}

function HiddenPageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Page not found</p>
        <h1 className="mt-4 font-display text-6xl font-bold text-white">404</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/65">This page is currently unavailable.</p>
      </div>
    </div>
  );
}

// Small helper — page keys keyed off current route path, used by nav filtering.
export function useCurrentPageKey(): string | null {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return PAGE_KEY_BY_ROUTE[pathname] ?? null;
}

// Filter helper for nav components — returns the subset of nav items whose
// target page is currently visible on live.
export function useVisiblePageRoutes(): Set<string> {
  const { data } = usePublicVisibility();
  const hidden = new Set(data?.hiddenLive ?? []);
  const visible = new Set<string>();
  for (const [route, pageKey] of Object.entries(PAGE_KEY_BY_ROUTE)) {
    if (!hidden.has(pageKey)) visible.add(route);
  }
  return visible;
}

// Utility used by the admin dashboard to refresh public state after publishing.
export function useInvalidatePublicVisibility() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["public-visibility"] });
}

// Suppress unused import warnings while keeping these ready for later use.
export type { PublicVisibility };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unused = { useLocation, useNavigate };
