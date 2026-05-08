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
      <div className="mx-auto hidden max-w-[1400px] items-center justify-between gap-4 px-4 pt-3 sm:px-6 sm:pt-4 md:flex md:px-8 md:pt-5">
        {/* Logo — desktop only */}
        <Link to="/" aria-label="Scorpion Kings Live" className="flex shrink-0 items-center">
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
          className="pointer-events-auto flex items-center gap-1 rounded-full bg-white px-2 py-1.5 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-black transition-colors duration-300 hover:text-black lg:px-4"
              activeProps={{ className: "!text-black" }}
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
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => openSubscribe("header")}
            className="rounded-full bg-foreground px-4 py-1.5 text-[12px] font-medium tracking-tight text-background transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Mobile — floating FAB menu trigger, bottom-right, thumb-reachable */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`pointer-events-auto fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90 md:hidden ${
          open ? "rotate-90" : "rotate-0"
        }`}
      >
        <span className="relative inline-block h-3.5 w-5">
          <span
            className={`absolute left-0 right-0 top-1/2 block h-[1.5px] rounded-full bg-black transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"
            }`}
          />
          <span
            className={`absolute left-0 right-0 top-1/2 block h-[1.5px] rounded-full bg-black transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 right-0 top-1/2 block h-[1.5px] rounded-full bg-black transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"
            }`}
          />
        </span>
      </button>

      {/* Mobile sheet — anchored bottom-right above FAB */}
      <div
        className={`md:hidden fixed bottom-24 right-5 z-40 w-[min(320px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 translate-y-3"
        }`}
        style={{ WebkitBackdropFilter: "blur(24px) saturate(1.4)", backdropFilter: "blur(24px) saturate(1.4)" }}
      >
        <nav className="flex flex-col p-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium tracking-tight text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openSubscribe("mobile-nav");
            }}
            className="mt-2 rounded-xl bg-white px-4 py-3 text-sm font-medium tracking-tight text-black"
          >
            Subscribe
          </button>
        </nav>
      </div>
    </header>
  );
}
