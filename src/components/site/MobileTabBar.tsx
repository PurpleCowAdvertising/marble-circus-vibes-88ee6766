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
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hash = useRouterState({ select: (state) => state.location.hash });

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
        bottom: "calc(env(safe-area-inset-bottom) + 0.75rem)",
      }}
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 md:hidden"
    >
      <div className="pointer-events-auto flex h-16 w-full max-w-md items-center justify-around rounded-full border border-white/10 bg-black/70 px-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-2xl backdrop-saturate-150">
      {TABS.map((tab) => {
        const Icon = tab.icon;

        const isActive =
          tab.kind === "route"
            ? tab.exact
              ? pathname === tab.to
              : pathname.startsWith(tab.to)
            : pathname === "/" && hash === `#${tab.hash}`;

        const iconClassName = `relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
          isActive
            ? "bg-gold text-black shadow-[0_4px_14px_-2px_rgba(248,165,45,0.6)] scale-110"
            : "text-white/70 group-hover:text-white"
        }`;

        const labelClassName = `font-display text-[10px] tracking-tight transition-colors ${
          isActive ? "text-gold" : "text-white/55 group-hover:text-white/80"
        }`;

        const inner = (
          <>
            <span className={iconClassName}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
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
      </div>
    </nav>
  );
}
