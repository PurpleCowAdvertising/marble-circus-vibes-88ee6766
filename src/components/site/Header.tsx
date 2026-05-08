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
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openSubscribe } = useSubscribePopup();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide when scrolling down past threshold, show when scrolling up
      if (y > 120 && y > lastY) {
        setHidden(true);
      } else if (y < lastY - 4 || y < 80) {
        setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
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
              scrolled ? "h-8 sm:h-9 md:h-10" : "h-10 sm:h-12 md:h-16 lg:h-20"
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
