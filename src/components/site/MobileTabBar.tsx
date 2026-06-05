import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Music, Ticket, Map, Newspaper } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/music", label: "Music", icon: Music, exact: false },
  { to: "/tickets", label: "Tickets", icon: Ticket, exact: false },
  { to: "/experience", label: "Experience", icon: Map, exact: false },
  { to: "/news", label: "News", icon: Newspaper, exact: false },
] as const;

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Mobile tab bar"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-white/10 bg-black/90 backdrop-blur-xl backdrop-saturate-150 md:hidden"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.exact ? pathname === tab.to : pathname.startsWith(tab.to);
        return (
          <Link
            key={tab.to}
            to={tab.to}
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.vibrate) {
                navigator.vibrate(8);
              }
            }}
            className="group flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors"
          >
            <span
              className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-gold text-black shadow-[0_4px_12px_-2px_rgba(248,165,45,0.45)]"
                  : "text-white/60 group-hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            </span>
            <span
              className={`font-display text-[10px] tracking-tight transition-colors ${
                isActive ? "text-gold" : "text-white/50 group-hover:text-white/80"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
