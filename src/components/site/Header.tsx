import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useSubscribePopup } from "./SubscribePopup";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/music", label: "Music" },
  { to: "/about", label: "About" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openSubscribe } = useSubscribePopup();

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        const delta = y - lastY;
        if (y > 140 && delta > 6) setHidden(true);
        else if (delta < -6 || y < 80) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        hidden && !open ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 pt-3 sm:px-6 sm:pt-4 md:px-8 md:pt-5">
        {/* Logo — desktop only (mobile uses centered floating pill below) */}
        <Link to="/" aria-label="Scorpion Kings Live" className="hidden shrink-0 items-center md:flex">
          <img
            src={logo}
            alt="Scorpion Kings Live"
            className={`w-auto transition-all duration-500 ease-out ${
              scrolled ? "h-8" : "h-10"
            }`}
          />
        </Link>

        {/* Floating glass pill nav — desktop */}
        <nav
          aria-label="Primary"
          className={`pointer-events-auto hidden items-center gap-1 rounded-full border border-white/40 bg-white/80 px-2 py-1.5 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500 ease-out md:flex ${
            scrolled ? "bg-white/90 shadow-[0_12px_36px_-14px_rgba(0,0,0,0.55)]" : ""
          }`}
          style={{ WebkitBackdropFilter: "blur(24px) saturate(1.6)", backdropFilter: "blur(24px) saturate(1.6)" }}
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-neutral-700 transition-colors duration-300 hover:text-neutral-950 lg:px-4"
              activeProps={{ className: "!text-neutral-950" }}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                aria-hidden
                className="absolute inset-0 -z-0 rounded-full bg-accent/20 ring-1 ring-inset ring-accent/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[status=active]:opacity-100"
              />
            </Link>
          ))}
        </nav>

        {/* Subscribe — desktop only */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={() => openSubscribe("header")}
            className="rounded-full bg-foreground px-4 py-1.5 text-[12px] font-medium tracking-tight text-background transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90"
          >
            Subscribe
          </button>
        </div>

        {/* Mobile — single centered floating glass capsule */}
        <div className="flex w-full items-center justify-center md:hidden">
          <div
            className="pointer-events-auto flex w-full max-w-[420px] items-center justify-between gap-3 rounded-full border border-white/40 bg-white/80 py-1.5 pl-2 pr-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            style={{ WebkitBackdropFilter: "blur(24px) saturate(1.6)", backdropFilter: "blur(24px) saturate(1.6)" }}
          >
            <Link to="/" aria-label="Scorpion Kings Live" className="flex shrink-0 items-center pl-1.5">
              <img src={logo} alt="Scorpion Kings Live" className="h-6 w-auto" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="group flex items-center gap-2 rounded-full bg-neutral-950 px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-white transition-transform active:scale-95"
            >
              <span className="relative inline-block h-3 w-4">
                <span
                  className={`absolute left-0 right-0 top-1/2 block h-px bg-white transition-transform duration-300 ${
                    open ? "translate-y-0 rotate-45" : "-translate-y-[3px] rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 top-1/2 block h-px bg-white transition-transform duration-300 ${
                    open ? "translate-y-0 -rotate-45" : "translate-y-[3px] rotate-0"
                  }`}
                />
              </span>
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet — full-screen quiet panel */}
      <div
        className={`md:hidden fixed inset-x-0 top-[68px] mx-3 origin-top overflow-hidden rounded-2xl border border-foreground/10 bg-background/85 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0"
        }`}
        style={{ WebkitBackdropFilter: "blur(24px) saturate(1.4)", backdropFilter: "blur(24px) saturate(1.4)" }}
      >
        <nav className="flex flex-col p-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-lg font-medium tracking-tight text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openSubscribe("mobile-nav");
            }}
            className="mt-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium tracking-tight text-background"
          >
            Subscribe
          </button>
        </nav>
      </div>
    </header>
  );
}
