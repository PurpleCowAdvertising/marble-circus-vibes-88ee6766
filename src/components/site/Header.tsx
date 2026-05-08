import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
        {/* Logo — bare, no chrome */}
        <Link to="/" aria-label="Scorpion Kings Live" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="Scorpion Kings Live"
            className={`w-auto transition-all duration-500 ease-out ${
              scrolled ? "h-7 md:h-8" : "h-8 md:h-10"
            }`}
          />
        </Link>

        {/* Floating glass pill nav */}
        <nav
          aria-label="Primary"
          className={`pointer-events-auto hidden items-center gap-1 rounded-full border border-foreground/10 bg-background/40 px-2 py-1.5 backdrop-blur-2xl transition-all duration-500 ease-out md:flex ${
            scrolled ? "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]" : ""
          }`}
          style={{ WebkitBackdropFilter: "blur(24px) saturate(1.4)", backdropFilter: "blur(24px) saturate(1.4)" }}
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-foreground/65 transition-colors duration-300 hover:text-white lg:px-4"
              activeProps={{ className: "!text-white" }}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                aria-hidden
                className="absolute inset-0 -z-0 rounded-full bg-accent/25 ring-1 ring-inset ring-accent/30 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-data-[status=active]:opacity-100"
              />
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => openSubscribe("header")}
            className="hidden rounded-full bg-foreground px-4 py-1.5 text-[12px] font-medium tracking-tight text-background transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 md:inline-flex"
          >
            Subscribe
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-background/40 text-foreground backdrop-blur-2xl transition-colors hover:bg-foreground/[0.06] md:hidden"
            style={{ WebkitBackdropFilter: "blur(24px) saturate(1.4)", backdropFilter: "blur(24px) saturate(1.4)" }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
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
