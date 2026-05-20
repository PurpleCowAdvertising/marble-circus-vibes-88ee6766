import { Link } from "@tanstack/react-router";
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const { open: openSubscribe } = useSubscribePopup();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        // Visible on landing, fades out gradually as user scrolls down.
        // Fully visible until 80px, then fades from 1 → 0 between 80px and 480px.
        const START = 80;
        const END = 480;
        const progress = Math.max(0, Math.min(1, (y - START) / (END - START)));
        setOpacity(1 - progress);

        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const headerOpacity = menuOpen ? 1 : opacity;

  return (
    <>
      <header
        style={{ opacity: headerOpacity, pointerEvents: headerOpacity < 0.05 ? "none" : "auto" }}
        className="fixed inset-x-0 top-0 z-50 hidden transition-opacity duration-200 ease-out will-change-[opacity] md:block"
      >

        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 pt-3 sm:px-6 sm:pt-4 md:px-8 md:pt-5">
          {/* Logo — visible all sizes */}
          <Link to="/" aria-label="Scorpion Kings Live" className="flex shrink-0 items-center">
            <img
              src={logo}
              alt="Scorpion Kings Live"
              className={`w-auto transition-all duration-500 ease-out ${
                scrolled ? "h-7 md:h-8" : "h-9 md:h-10"
              }`}
            />
          </Link>

          {/* Desktop pill nav */}
          <div className="relative hidden md:block">
            <span
              aria-hidden
              className={`pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_55%,transparent),transparent_70%)] blur-2xl transition-opacity duration-700 ease-out ${
                scrolled ? "opacity-0" : "opacity-90"
              }`}
            />
            <nav
              aria-label="Primary"
              className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 py-1.5 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.25),0_18px_40px_-12px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out"
            >
              {NAV.map((item) => {
                const className =
                  "group relative rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight text-white transition-all duration-300 hover:text-white hover:font-semibold sm:px-3 sm:py-1.5 sm:text-[12px] lg:px-3.5 lg:text-[13px] group-data-[status=active]:font-semibold data-[status=active]:!text-white";

                const inner = (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-0 rounded-full bg-[#f8a52d] shadow-[0_6px_18px_-4px_rgba(248,165,45,0.55)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[status=active]:opacity-100 border-[#f2ac07]"
                    />
                  </>
                );
                if (item.kind === "scroll") {
                  return (
                    <a key={item.hash} href={`/#${item.hash}`} className={className}>
                      {inner}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className={className}
                    activeProps={{ className: "!text-black !font-semibold" }}
                  >
                    {inner}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Subscribe — desktop only */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              onClick={() => openSubscribe("header")}
              className="text-[12px] font-medium tracking-tight text-white transition-all duration-300 hover:scale-[1.03] hover:text-white/80"
            >
              ...
            </button>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <div
          className={`absolute inset-x-0 top-0 bg-black text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
            <Link to="/" onClick={() => setMenuOpen(false)} aria-label="Scorpion Kings Live">
              <img src={logo} alt="Scorpion Kings Live" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-105"
            >
              <X size={20} />
            </button>
          </div>

          <nav aria-label="Mobile" className="px-4 pb-8 pt-6 sm:px-6">
            <ul className="divide-y divide-white/10">
              {NAV.filter((item) => item.kind === "scroll" || !["/news"].includes(item.to)).map((item) => {
                const linkClass =
                  "flex items-center justify-between py-4 font-display text-2xl font-bold tracking-tight transition-colors hover:text-primary";
                const inner = (
                  <>
                    {item.label}
                    <span aria-hidden className="text-white/30">→</span>
                  </>
                );
                if (item.kind === "scroll") {
                  return (
                    <li key={item.hash}>
                      <a
                        href={`/#${item.hash}`}
                        onClick={() => setMenuOpen(false)}
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
                      onClick={() => setMenuOpen(false)}
                      activeOptions={{ exact: item.to === "/" }}
                      className={linkClass}
                      activeProps={{ className: "!text-primary" }}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => {
                setMenuOpen(false);
                openSubscribe("header");
              }}
              className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              ...
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
