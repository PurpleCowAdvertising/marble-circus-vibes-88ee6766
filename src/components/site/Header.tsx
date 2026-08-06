import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import { useSubscribePopup } from "./SubscribePopup";
import { useVisiblePageRoutes } from "./visibility";
import logo from "@/assets/logo.webp";

type NavItem =
  | { kind: "route"; to: "/" | "/news" | "/merchandise" | "/contact"; label: string }
  | { kind: "scroll"; hash: string; label: string }
  | { kind: "external"; href: string; label: string };

const NAV: readonly NavItem[] = [
  { kind: "route", to: "/", label: "Home" },
  { kind: "scroll", hash: "tickets", label: "Tickets" },
  { kind: "scroll", hash: "experience", label: "Hospitality" },
  { kind: "route", to: "/contact", label: "Partners" },
  { kind: "route", to: "/news", label: "News" },
  { kind: "route", to: "/merchandise", label: "Merch" },
] as const;

const BUY_ACTIONS = [
  { label: "Buy Tickets", hash: "tickets" },
  { label: "Buy Merch", hash: "merchandise" },
] as const;

function scrollToHash(hash: string) {

  const target = document.getElementById(hash);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [buyIndex, setBuyIndex] = useState(0);

  const { open: openSubscribe } = useSubscribePopup();

  const visibleRoutes = useVisiblePageRoutes();
  const nav = useMemo(
    () => NAV.filter((item) => (item.kind === "route" ? visibleRoutes.has(item.to) : true)),
    [visibleRoutes],
  );

  useEffect(() => {
    let ticking = false;
    let lastY = typeof window === "undefined" ? 0 : window.scrollY;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        setScrolled(y > 20);

        if (y < 140) {
          setCondensed(false);
        } else if (y > lastY + 4) {
          setCondensed(true);
        } else if (y < lastY - 6) {
          setCondensed(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the bar is condensed, the exposed buy action alternates between
  // tickets and merch so both entry points surface.
  const collapsed = condensed && !navHovered;

  useEffect(() => {
    if (!collapsed) return;

    const id = window.setInterval(() => setBuyIndex((i) => (i + 1) % BUY_ACTIONS.length), 4200);

    return () => window.clearInterval(id);
  }, [collapsed]);


  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleScrollNav = (hash: string) => {
    closeMenu();

    if (pathname !== "/") {
      window.location.href = `/#${hash}`;
      return;
    }

    scrollToHash(hash);

    window.setTimeout(() => {
      window.history.replaceState(null, "", `/#${hash}`);
    }, 600);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out">
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 pt-3 sm:px-6 sm:pt-4 md:px-8 md:pt-5">
          <Link to="/" aria-label="Scorpion Kings Live" className="hidden shrink-0 items-center md:flex" onClick={closeMenu}>
            <img
              src={logo}
              alt="Scorpion Kings Live"
              className={`w-auto transition-all duration-700 ease-out ${scrolled ? "h-8 md:h-8" : "h-10 md:h-10"}`}
            />
          </Link>

          <div
            className="absolute left-1/2 top-3 z-10 hidden -translate-x-1/2 justify-center sm:top-4 md:top-5 md:flex"
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_55%,transparent),transparent_70%)] blur-2xl transition-opacity duration-1000 ease-out ${
                scrolled ? "opacity-30" : "opacity-90"
              }`}
            />


            <nav
              aria-label="Primary"
              className={`pointer-events-auto relative flex items-center justify-center gap-0.5 rounded-full border px-1.5 py-1 backdrop-blur-xl backdrop-saturate-150 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-1 sm:px-2 sm:py-1.5 ${
                scrolled
                  ? "border-white/15 bg-black/45 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.75)]"
                  : "border-white/25 bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.25),0_18px_40px_-12px_rgba(0,0,0,0.55)]"
              }`}
            >
              {nav.map((item) => {
                const className = `group relative overflow-hidden whitespace-nowrap rounded-full text-center text-[10px] font-medium tracking-tight text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[12px] lg:text-[13px] ${
                  collapsed
                    ? "pointer-events-none max-w-0 px-0 py-1 opacity-0 blur-[3px] sm:px-0 lg:px-0"
                    : "max-w-[180px] px-2 py-1 opacity-100 blur-0 sm:px-3 sm:py-1.5 lg:px-3.5"
                }`;


                const inner = (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-0 rounded-full bg-[#f8a52d] opacity-0 shadow-[0_6px_18px_-4px_rgba(248,165,45,0.55)] transition-opacity duration-300 group-hover:opacity-100 group-data-[status=active]:opacity-100"
                    />
                  </>
                );

                if (item.kind === "scroll") {
                  return (
                    <button
                      key={item.hash}
                      type="button"
                      tabIndex={collapsed ? -1 : 0}
                      onClick={() => handleScrollNav(item.hash)}
                      className={className}
                    >
                      {inner}
                    </button>
                  );
                }

                if (item.kind === "external") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={collapsed ? -1 : 0}
                      onClick={closeMenu}
                      className={className}
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    tabIndex={collapsed ? -1 : 0}
                    className={className}
                    activeProps={{
                      className: "font-semibold text-white",
                    }}
                  >
                    {inner}
                  </Link>
                );
              })}

              {/* Buy action that emerges as the menu retracts on scroll */}
              <button
                type="button"
                aria-hidden={!collapsed}
                tabIndex={collapsed ? 0 : -1}
                onClick={() => handleScrollNav(BUY_ACTIONS[buyIndex].hash)}
                className={`relative flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-[#f8a52d] text-[12px] font-bold tracking-tight text-black shadow-[0_8px_22px_-8px_rgba(248,165,45,0.8)] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  collapsed
                    ? "pointer-events-auto max-w-[220px] scale-100 px-5 py-1.5 opacity-100 blur-0"
                    : "pointer-events-none max-w-0 scale-95 px-0 py-1.5 opacity-0 blur-[3px]"
                }`}
              >
                <span className="relative block h-[16px] w-[88px] text-center">
                  {BUY_ACTIONS.map((action, index) => (
                    <span
                      key={action.hash}
                      className={`absolute inset-0 flex items-center justify-center leading-4 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        index === buyIndex ? "translate-y-0 opacity-100 blur-0" : "-translate-y-1.5 opacity-0 blur-[2px]"
                      }`}
                    >
                      {action.label}
                    </span>
                  ))}
                </span>
              </button>

            </nav>
          </div>


          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => openSubscribe("header")}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[12px] font-semibold tracking-tight text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/15"
            >
              Subscribe
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition-transform hover:scale-[1.05]"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-[2rem] bg-black text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
            <Link to="/" onClick={closeMenu} aria-label="Scorpion Kings Live">
              <img src={logo} alt="Scorpion Kings Live" className="h-9 w-auto" />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-105"
            >
              <X size={20} />
            </button>
          </div>

          <nav aria-label="Mobile" className="px-4 pb-8 pt-6 sm:px-6">
            <ul className="divide-y divide-white/10">
              {nav.map((item) => {
                const linkClass =
                  "flex w-full items-center justify-between py-4 text-left font-display text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#f8a52d]";

                const inner = (
                  <>
                    <span>{item.label}</span>
                    <span aria-hidden className="text-white/30">
                      →
                    </span>
                  </>
                );

                if (item.kind === "scroll") {
                  return (
                    <li key={item.hash}>
                      <button type="button" onClick={() => handleScrollNav(item.hash)} className={linkClass}>
                        {inner}
                      </button>
                    </li>
                  );
                }

                if (item.kind === "external") {
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className={linkClass}
                      >
                        {inner}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      activeOptions={{ exact: item.to === "/" }}
                      className={linkClass}
                      activeProps={{
                        className: "text-[#f8a52d]",
                      }}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                openSubscribe("header");
              }}
              className="mt-6 w-full rounded-full bg-[#f8a52d] px-5 py-3 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.02]"
            >
              Subscribe
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
