import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Music, Ticket, Map, Newspaper } from "lucide-react";

const TABS = [
  { kind: "route", to: "/", label: "Home", icon: Home, exact: true },
  { kind: "scroll", hash: "lineup", label: "Line-Up", icon: Music },
  { kind: "scroll", hash: "tickets", label: "Tickets", icon: Ticket },
  { kind: "scroll", hash: "experience", label: "Experience", icon: Map },
  { kind: "route", to: "/news", label: "News", icon: Newspaper, exact: false },
] as const;

function vibrate() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
}

function scrollToHash(hash: string) {
  const target = document.getElementById(hash);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function MobileTabBar() {
  const pathname = useRouterState((state) => state.location.pathname);
  const hash = useRouterState((state) => state.location.hash);

  const handleScrollTab = (sectionHash: string) => {
    vibrate();

    if (pathname !== "/") {
      window.location.href = `/#${sectionHash}`;
      return;
    }

    window.history.pushState(null, "", `/#${sectionHash}`);

    window.setTimeout(() => {
      scrollToHash(sectionHash);
    }, 50);
  };

  return (
    <nav
      aria-label="Mobile tab bar"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        bottom: 0,
      }}
      className="fixed inset-x-0 z-50 flex h-16 items-center justify-around border-t border-white/10 bg-black/90 backdrop-blur-xl backdrop-saturate-150 md:hidden"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;

        const isActive =
          tab.kind === "route"
            ? tab.exact
              ? pathname === tab.to
              : pathname.startsWith(tab.to)
            : pathname === "/" && hash === `#${tab.hash}`;

        const iconClassName = `relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
          isActive
            ? "bg-gold text-black shadow-[0_4px_12px_-2px_rgba(248,165,45,0.45)]"
            : "text-white/60 group-hover:text-white"
        }`;

        const labelClassName = `font-display text-[10px] tracking-tight transition-colors ${
          isActive ? "text-gold" : "text-white/50 group-hover:text-white/80"
        }`;

        const inner = (
          <>
            <span className={iconClassName}>
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            </span>
            <span className={labelClassName}>{tab.label}</span>
          </>
        );

        const baseClassName = "group flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors";

        if (tab.kind === "scroll") {
          return (
            <button key={tab.hash} type="button" onClick={() => handleScrollTab(tab.hash)} className={baseClassName}>
              {inner}
            </button>
          );
        }

        return (
          <Link key={tab.to} to={tab.to} onClick={vibrate} className={baseClassName}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
