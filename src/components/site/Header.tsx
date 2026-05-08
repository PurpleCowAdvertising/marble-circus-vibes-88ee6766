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
        if (y > 140 && delta > 6) {
          setHidden(true);
        } else if (delta < -6 || y < 80) {
          setHidden(false);
        }
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
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,opacity,background-color,padding,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      } ${
        hidden && !open
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 md:px-10 transition-all duration-500 ease-out ${
          scrolled ? "py-1.5 md:py-2" : "py-3 md:py-4"
        }`}
      >
        <Link to="/" aria-label="Scorpion Kings Live" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="Scorpion Kings Live"
            className={`w-auto transition-all duration-500 ease-out ${
              scrolled ? "h-10 sm:h-11 md:h-12" : "h-12 sm:h-14 md:h-20 lg:h-24"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-display text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent lg:text-base"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            onClick={() => openSubscribe("header")}
            className="hidden rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 md:inline-block lg:px-5 lg:py-2 lg:text-xs"
          >
            Subscribe
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-1 md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col px-6 py-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openSubscribe("mobile-nav");
              }}
              className="mt-6 rounded-full bg-accent px-5 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground"
            >
              Subscribe
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
