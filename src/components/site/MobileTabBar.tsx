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
      <div className="pointer-events-auto flex h-14 w-full max-w-sm items-center justify-between rounded-full border border-white/40 bg-white/80 px-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] backdrop-blur-2xl backdrop-saturate-150">
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
              ? "bg-gold text-black shadow-[0_4px_14px_-2px_rgba(248,165,45,0.5)] scale-110"
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
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
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
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
