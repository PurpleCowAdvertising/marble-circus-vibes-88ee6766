import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, X, Youtube, Icon } from "lucide-react";

import { SITE_CREDIT } from "@/config/credits";
import { useVisiblePageRoutes } from "./visibility";
import logo from "@/assets/logo.png";
import ticketsAvailable from "@/assets/tickets-available.png";

const EXPLORE_LINKS = [
  { to: "/music", label: "Line-Up" },
  { href: "https://www.webtickets.co.za/v2/event.aspx?itemid=1594173143", label: "Tickets", external: true as const },
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

const TIKTOK_ICON = [
  [
    "path",
    {
      d: "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.62 2.52-4.91 1.45-1.38 3.42-2.13 5.38-2.14 1.06.01 2.11.18 3.11.51.03.05.06.09.06.15v3.98c-.46-.14-.93-.27-1.41-.37-1.05-.23-2.16-.19-3.13.22-1.03.43-1.89 1.21-2.39 2.22-.25.52-.39 1.09-.39 1.67.02 1.34.87 2.57 2.11 3.04.73.32 1.55.35 2.31.14.85-.24 1.58-.74 2.11-1.41.51-.66.79-1.45.85-2.26.02-2.06.01-4.13.01-6.19h3.15c-.04.66-.11 1.31-.24 1.95-.25 1.17-.74 2.28-1.44 3.24-.72.98-1.64 1.79-2.71 2.35-.93.48-1.96.77-3.01.85-.02.01-.04 0-.06 0z",
      fill: "currentColor",
      stroke: "none",
    },
  ],
] as const;

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/scorpionkingslive/?hl=en", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/share/1D9ccSVuU3/?mibextid=wwXIfr", label: "Facebook", icon: Facebook },
  { href: "https://www.youtube.com/channel/UCe0qO9T8tdTwKLR6rnPTRPQ", label: "YouTube", icon: Youtube },
  { href: "https://x.com/scorpionkingslv?s=21", label: "X", icon: X },
  { href: "https://www.tiktok.com/@scorpionkingslive?_r=1&_t=ZS-97paQvcDRTt", label: "TikTok", icon: () => <Icon iconNode={TIKTOK_ICON} size={18} /> },
] as const;

export function Footer() {
  const visibleRoutes = useVisiblePageRoutes();
  const exploreLinks = EXPLORE_LINKS.filter((link) =>
    "external" in link ? true : visibleRoutes.has(link.to),
  );
  return (
    <footer id="site-footer" className="relative z-10 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] text-black md:pb-0">
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

          </div>

          <div>
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
                  <span
                    key={social.label}
                    aria-label={social.label}
                    className="pointer-events-none text-black/60"
                  >
                    <Icon size={18} />
                  </span>
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
