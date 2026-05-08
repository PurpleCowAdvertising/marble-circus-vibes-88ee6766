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
  const [open, setOpen] = useState(false);
  const { open: openSubscribe } = useSubscribePopup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" aria-label="Scorpion Kings Live" className="flex items-center">
          <img src={logo} alt="Scorpion Kings Live" className="h-16 w-auto md:h-20" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-display text-base uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openSubscribe("header")}
            className="hidden rounded-full bg-accent px-5 py-2 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 md:block"
          >
            Subscribe
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
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
              className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground"
            >
              Subscribe
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
