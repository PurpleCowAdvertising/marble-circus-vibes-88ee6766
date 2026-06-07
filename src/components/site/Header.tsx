import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { useSubscribePopup } from "./SubscribePopup";
import logo from "@/assets/logo.png";

type NavItem =
  | { kind: "route"; to: "/" | "/news" | "/merchandise"; label: string }
  | { kind: "scroll"; hash: string; label: string };

const NAV: readonly NavItem[] = [
  { kind: "route", to: "/", label: "Home" },
  { kind: "scroll", hash: "lineup", label: "Line-Up" },
  { kind: "scroll", hash: "tickets", label: "Tickets" },
  { kind: "scroll", hash: "experience", label: "Experience" },
  { kind: "scroll", hash: "partners", label: "Partners" },
  { kind: "route", to: "/news", label: "News" },
  { kind: "route", to: "/merchandise", label: "Merch" },
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

  const { open: openSubscribe } = useSubscribePopup();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

    window.history.pushState(null, "", `/#${hash}`);

    window.setTimeout(() => {
      scrollToHash(hash);
    }, 50);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 pt-3 sm:px-6 sm:pt-4 md:px-8 md:pt-5">
          <Link to="/" aria-label="Scorpion Kings Live" className="flex shrink-0 items-center" onClick={closeMenu}>
            <img
              src={logo}
              alt="Scorpion Kings Live"
              className={`w-auto transition-all duration-500 ease-out ${scrolled ? "h-8 md:h-8" : "h-10 md:h-10"}`}
            />
          </Link>

          <div className="relative hidden md:block">
            <span
              aria-hidden
              className={`pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_55%,transparent),transparent_70%)] blur-2xl transition-opacity duration-700 ease-out ${
                scrolled ? "opacity-30" : "opacity-90"
              }`}
            />

            <nav
              aria-label="Primary"
              className={`pointer-events-auto relative flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out ${
                scrolled
                  ? "border-white/15 bg-black/45 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.75)]"
                  : "border-white/25 bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.25),0_18px_40px_-12px_rgba(0,0,0,0.55)]"
              }`}
            >
              {NAV.map((item) => {
                const className =
                  "group relative rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight text-white transition-all duration-300 hover:text-white sm:px-3 sm:py-1.5 sm:text-[12px] lg:px-3.5 lg:text-[13px]";

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
                      onClick={() => handleScrollNav(item.hash)}
                      className={className}
                    >
                      {inner}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className={className}
                    activeProps={{
                      className: "font-semibold text-white",
                    }}
                  >
                    {inner}
                  </Link>
                );
              })}
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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition-transform hover:scale-[1.05] md:hidden"
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
              {NAV.map((item) => {
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
