import { Link } from "@tanstack/react-router";
import { createLucideIcon, Facebook, Instagram, X, Youtube } from "lucide-react";

import { SITE_CREDIT } from "@/config/credits";
import { Reveal, RevealGroup } from "@/components/site/Reveal";
import { useVisiblePageRoutes } from "./visibility";
import logo from "@/assets/logo.webp";
import ticketsAvailable from "@/assets/tickets-available.webp";

const EXPLORE_LINKS = [
  { to: "/music", label: "Line-Up" },
  { href: "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143", label: "Tickets", external: true as const },
  { to: "/experience", label: "Hospitality" },
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

const CONTACT_LINKS = [
  { href: "mailto:sponsorship@scorpionkings.live", label: "sponsorship@scorpionkings.live" },
  { href: "mailto:press@scorpionkings.live", label: "press@scorpionkings.live" },
  { href: "mailto:info@scorpionkings.live", label: "info@scorpionkings.live" },
] as const;

const TikTokIcon = createLucideIcon("TikTok", [
  ["path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }],
]);

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/scorpionkingslive/?hl=en", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/share/1D9ccSVuU3/?mibextid=wwXIfr", label: "Facebook", icon: Facebook },
  { href: "https://www.youtube.com/channel/UCe0qO9T8tdTwKLR6rnPTRPQ", label: "YouTube", icon: Youtube },
  { href: "https://x.com/scorpionkingslv?s=21", label: "X", icon: X },
  { href: "https://www.tiktok.com/@scorpionkingslive?_r=1&_t=ZS-97paQvcDRTt", label: "TikTok", icon: TikTokIcon },
] as const;

export function Footer() {
  const visibleRoutes = useVisiblePageRoutes();
  const exploreLinks = EXPLORE_LINKS.filter((link) =>
    "external" in link ? true : visibleRoutes.has(link.to),
  );
  return (
    <footer id="site-footer" className="relative z-10 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] text-black md:pb-0">
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-10 md:py-10">
        <RevealGroup className="grid gap-8 md:grid-cols-5 md:gap-12">
          <Reveal className="md:col-span-2">
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

          </Reveal>

          <Reveal delay={100}>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Explore</h4>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:block md:space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black transition-colors hover:text-black/60"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} className="text-black transition-colors hover:text-black/60">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
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
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-black/60 transition-colors hover:text-black"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Contact</h4>

            <ul className="space-y-2 text-sm">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-black transition-colors hover:text-black/60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </RevealGroup>
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
