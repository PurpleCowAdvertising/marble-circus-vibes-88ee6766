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
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-4 pt-3 sm:px-6 sm:pt-4 md:justify-between md:px-8 md:pt-5">
        {/* Logo — desktop only */}
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
        <div className="relative">
          {/* Scroll-responsive glow — strongest over hero, fades as you scroll */}
          <span
            aria-hidden
            className={`pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_55%,transparent),transparent_70%)] blur-2xl transition-opacity duration-700 ease-out ${
              scrolled ? "opacity-0" : "opacity-90"
            }`}
          />
          <nav
            aria-label="Primary"
            className="pointer-events-auto relative flex items-center gap-1 rounded-full bg-white/75 px-2 py-1.5 ring-1 ring-inset ring-white/60 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-out"
            style={{ WebkitBackdropFilter: "blur(20px) saturate(1.6)", backdropFilter: "blur(20px) saturate(1.6)" }}
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group relative rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-neutral-900 transition-all duration-300 hover:text-white hover:font-semibold lg:px-4 group-data-[status=active]:font-semibold data-[status=active]:!text-white"
                activeProps={{ className: "!text-white !font-semibold" }}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 rounded-full bg-accent shadow-[0_6px_18px_-4px_color-mix(in_oklab,var(--color-accent)_55%,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[status=active]:opacity-100"
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Subscribe — desktop only */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={() => openSubscribe("header")}
            className="rounded-full bg-foreground px-4 py-1.5 text-[12px] font-medium tracking-tight text-background transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90"
          >
            Subscribe
          </button>
        </div>
      </div>

    </header>
  );
}
