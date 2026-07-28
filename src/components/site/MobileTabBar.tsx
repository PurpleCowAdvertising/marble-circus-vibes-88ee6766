import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Music, Ticket, Map, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { useVisiblePageRoutes } from "./visibility";

const TABS = [
  { kind: "route", to: "/", label: "Home", icon: Home, exact: true },
  { kind: "scroll", hash: "lineup", label: "Line-Up", icon: Music },
  { kind: "scroll", hash: "tickets", label: "Tickets", icon: Ticket },
  { kind: "scroll", hash: "experience", label: "Hospitality", icon: Map },
  { kind: "route", to: "/contact", label: "Contact", icon: Mail, exact: false },
] as const;

function vibrate() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
}

function scrollToHash(hash: string) {
  const target = document.getElementById(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrollDim() {
  const [dim, setDim] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (Math.abs(delta) > 4) {
          if (delta > 0 && y > 80) setDim(true);
          else if (delta < 0) setDim(false);
          lastY.current = y;
        }
        if (idleTimer.current) window.clearTimeout(idleTimer.current);
        idleTimer.current = window.setTimeout(() => setDim(false), 350);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  return dim;
}

export function MobileTabBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hash = useRouterState({ select: (state) => state.location.hash });
  const dim = useScrollDim();
  const [drawKey, setDrawKey] = useState(0);
  const visibleRoutes = useVisiblePageRoutes();
  const tabs = useMemo(
    () => TABS.filter((t) => (t.kind === "route" ? visibleRoutes.has(t.to) : true)),
    [visibleRoutes],
  );

  const handleScrollTab = (sectionHash: string) => {
    vibrate();
    setDrawKey((k) => k + 1);

    if (pathname !== "/") {
      window.location.href = `/#${sectionHash}`;
      return;
    }

    scrollToHash(sectionHash);
    window.setTimeout(() => {
      window.history.replaceState(null, "", `/#${sectionHash}`);
    }, 600);
  };

  return (
    <>
      <style>{`
        @keyframes tabbar-draw {
          0% { stroke-dasharray: 80; stroke-dashoffset: 80; opacity: 0.4; }
          100% { stroke-dasharray: 80; stroke-dashoffset: 0; opacity: 1; }
        }
        .tabbar-icon svg * {
          animation: tabbar-draw 1.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--tabbar-delay, 0ms);
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .tabbar-icon.is-active svg * {
          animation-duration: 1.9s;
        }
        .tabbar-icon:hover svg *,
        .tabbar-icon:active svg * {
          animation: tabbar-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .tabbar-icon svg * { animation: none !important; }
        }
      `}</style>
      <nav
        aria-label="Mobile tab bar"
        style={{
          top: "calc(env(safe-area-inset-top) + 0.75rem)",
          transform: "translateY(0)",
          opacity: dim ? 0.75 : 1,
          transition: "opacity 250ms ease",
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
          }}

        >
          <div className="pointer-events-none absolute inset-x-3 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-6 bottom-0.5 h-1/3 rounded-full bg-gradient-to-t from-black/15 to-transparent blur-[2px]" />

          {TABS.map((tab, tabIndex) => {
            const Icon = tab.icon;
            const iconStyle = { "--tabbar-delay": `${tabIndex * 180}ms` } as CSSProperties;

            const isActive =
              tab.kind === "route"
                ? tab.exact
                  ? pathname === tab.to
                  : pathname.startsWith(tab.to)
                : tab.kind === "scroll"
                  ? pathname === "/" && hash === `#${tab.hash}`
                  : false;

            const baseClassName =
              "group flex h-full w-12 items-center justify-center transition-transform duration-200 active:scale-95";

            const iconClassName = `tabbar-icon ${isActive ? "is-active" : ""} flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-b from-[#ffd76b] via-gold to-[#b8761a] text-black scale-110 shadow-[0_4px_10px_-2px_rgba(248,165,45,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"
                : "text-black group-hover:bg-black/5"
            }`;

            const iconKey = `${isActive ? "a" : "i"}-${drawKey}`;

            if (tab.kind === "scroll") {
              return (
                <button
                  key={tab.hash}
                  type="button"
                  aria-label={tab.label}
                  onClick={() => handleScrollTab(tab.hash)}
                  className={baseClassName}
                >
                  <span className={iconClassName} key={iconKey} style={iconStyle}>
                    <Icon size={28} strokeWidth={1.25} absoluteStrokeWidth />
                  </span>
                </button>
              );
            }




            return (
              <Link
                key={tab.to}
                to={tab.to}
                onClick={() => {
                  vibrate();
                  setDrawKey((k) => k + 1);
                }}
                aria-label={tab.label}
                className={baseClassName}
              >
                <span className={iconClassName} key={iconKey} style={iconStyle}>
                  <Icon size={28} strokeWidth={1.25} absoluteStrokeWidth />
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
