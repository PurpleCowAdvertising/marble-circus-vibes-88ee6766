import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";

import { SITE_CREDIT } from "@/config/credits";
import logo from "@/assets/logo.png";
import ticketsAvailable from "@/assets/tickets-available.png";

const EXPLORE_LINKS = [
  { to: "/music", label: "Line-Up" },
  { to: "/tickets", label: "Tickets" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
  { to: "/partners", label: "Partners" },
  { to: "/news", label: "News" },
  { to: "/legacy", label: "Legacy / CSI" },
  { to: "/merchandise", label: "Merchandise" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
] as const;

const SOCIAL_LINKS = [
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "YouTube", icon: Youtube },
  { href: "#", label: "Spotify", icon: Music },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-white pb-[calc(4rem+env(safe-area-inset-bottom))] text-black md:pb-0">
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <Link to="/" aria-label="Scorpion Kings Live home" className="inline-block">
              <img src={logo} alt="Scorpion Kings Live" className="h-12 w-auto md:h-28" />
            </Link>

            <div
              className="mt-4 block max-w-[260px] overflow-hidden md:mt-5 md:max-w-[300px]"
              style={{ aspectRatio: "1313 / 232" }}
            >
              <img src={ticketsAvailable} alt="Tickets available from Webtickets" className="block h-auto w-full" />
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-black/70">
              Drops, lineup reveals, ticket waves and exclusive behind-the-scenes updates.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
            >
              Contact
            </Link>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Explore</h4>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:block md:space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-black transition-colors hover:text-black/60">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Legal</h4>

            <ul className="space-y-2 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-black transition-colors hover:text-black/60">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-4 md:mt-8">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-black transition-colors hover:text-black/60"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-white text-black md:border-0 md:bg-black md:text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-1 px-6 py-3 text-center text-[10px] leading-tight md:gap-1.5 md:px-10 md:py-4 md:text-xs">
          <p>Copyright 2016 Sony. All rights reserved.</p>

          <p className="tracking-widest">
            <span>{SITE_CREDIT.prefix}</span>
            <br />
            <a
              href={SITE_CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[7.5px] font-light lowercase text-purple-700 transition-colors hover:text-purple-900 md:text-[9px] md:text-white md:hover:text-white/70"
            >
              {SITE_CREDIT.agency}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
