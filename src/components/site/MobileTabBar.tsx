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
        top: "calc(env(safe-area-inset-top) + 0.75rem)",
      }}
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-6 md:hidden"
    >
      <div
        className="pointer-events-auto relative flex h-14 w-full max-w-sm items-center justify-between rounded-full border border-white/70 px-4 backdrop-blur-2xl backdrop-saturate-150"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.85) 45%, rgba(210,210,215,0.85) 100%)",
          boxShadow:
            "0 18px 40px -12px rgba(0,0,0,0.45), 0 6px 14px -6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -2px 4px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.35)",
          transform: "perspective(600px) rotateX(6deg)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-3 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0.5 h-1/3 rounded-full bg-gradient-to-t from-black/15 to-transparent blur-[2px]" />

        {TABS.map((tab) => {
          const Icon = tab.icon;

          const isActive =
            tab.kind === "route"
              ? tab.exact
                ? pathname === tab.to
                : pathname.startsWith(tab.to)
              : pathname === "/" && hash === `#${tab.hash}`;

          const baseClassName =
            "group flex h-full w-12 items-center justify-center transition-transform duration-200";

          const iconClassName = `flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-b from-[#ffd76b] via-gold to-[#b8761a] text-black scale-110 shadow-[0_4px_10px_-2px_rgba(248,165,45,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"
              : "text-black/60 group-hover:text-black/90 group-hover:bg-black/5"
          }`;


          if (tab.kind === "scroll") {
            return (
              <button
                key={tab.hash}
                type="button"
                aria-label={tab.label}
                onClick={() => handleScrollTab(tab.hash)}
                className={baseClassName}
              >
                <span className={iconClassName}>
                <Icon size={22} strokeWidth={1.5} />
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.to}
              to={tab.to}
              onClick={vibrate}
              aria-label={tab.label}
              className={baseClassName}
            >
              <span className={iconClassName}>
                <Icon size={22} strokeWidth={1.5} />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
