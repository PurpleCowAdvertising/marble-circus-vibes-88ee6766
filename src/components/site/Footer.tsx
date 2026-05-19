import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { SITE_CREDIT } from "@/config/credits";
import logo from "@/assets/logo.png";
import ticketsAvailable from "@/assets/tickets-available.png";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-10 md:py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-2">
            <img src={logo} alt="Scorpion Kings Live" className="h-12 w-auto md:h-32" />
            <div className="mt-4 block max-w-[260px] overflow-hidden md:mt-5 md:max-w-[300px]" style={{ aspectRatio: "1313 / 232" }}>
              <img
                src={ticketsAvailable}
                alt="Tickets available from Webtickets"
                className="block h-auto w-full"
              />
            </div>
            <p className="mt-4 max-w-md text-sm text-black/70 md:hidden">
              Drops, lineup reveals, ticket waves and exclusive behind-the-scenes — straight to your inbox.
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-black whitespace-nowrap md:hidden">
              Stay in the <span className="text-black">loop.</span>
            </h3>
            {/* Mobile: Contact button (replaces Subscribe). Desktop: keep Subscribe. */}
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 md:hidden"
            >
              Contact
            </Link>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-gold md:mb-4 md:text-xs md:text-black/60">Explore</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/music" className="text-black hover:text-black/60">Line-Up</Link></li>
              <li><Link to="/tickets" className="text-black hover:text-black/60">Tickets</Link></li>
              <li><Link to="/experience" className="text-black hover:text-black/60">Experience</Link></li>
              {/* Desktop-only links */}
              <li className="hidden md:list-item"><Link to="/partners" className="text-black hover:text-black/60">Partners</Link></li>
              <li className="hidden md:list-item"><Link to="/news" className="text-black hover:text-black/60">News</Link></li>
              <li className="hidden md:list-item"><Link to="/legacy" className="text-black hover:text-black/60">Legacy / CSI</Link></li>
              <li className="hidden md:list-item"><Link to="/merchandise" className="text-black hover:text-black/60">Merchandise</Link></li>
              <li><Link to="/faqs" className="text-black hover:text-black/60">FAQs</Link></li>
              {/* Mobile-only: Legacy under FAQs */}
              <li className="md:hidden"><Link to="/legacy" className="text-black hover:text-black/60">Legacy</Link></li>
              <li className="hidden md:list-item"><Link to="/contact" className="text-black hover:text-black/60">Contact</Link></li>
            </ul>
          </div>

          <div className="pl-4 md:pl-0">
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Legal</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/privacy" className="text-black hover:text-black/60">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-black hover:text-black/60">Terms of Use</Link></li>
              {/* Mobile-only extras */}
              <li className="md:hidden"><Link to="/partners" className="text-black hover:text-black/60">Partners</Link></li>
              <li className="md:hidden"><Link to="/news" className="text-black hover:text-black/60">News</Link></li>
              <li className="md:hidden"><Link to="/legacy" className="text-black hover:text-black/60">CSI</Link></li>
            </ul>

            <div className="mt-6 hidden md:flex md:mt-8 md:justify-start md:gap-4">
              <a href="#" aria-label="Instagram" className="text-black hover:text-black/60"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter" className="text-black hover:text-black/60"><Twitter size={18} /></a>
              <a href="#" aria-label="YouTube" className="text-black hover:text-black/60"><Youtube size={18} /></a>
              <a href="#" aria-label="Spotify" className="text-black hover:text-black/60"><Music size={18} /></a>
            </div>
          </div>
        </div>

        {/* Mobile-only social icons, left-aligned with Explore column */}
        <div className="mt-6 flex justify-start gap-3 md:hidden">
          <a href="#" aria-label="Instagram" className="text-black hover:text-black/60"><Instagram size={18} /></a>
          <a href="#" aria-label="Twitter" className="text-black hover:text-black/60"><Twitter size={18} /></a>
          <a href="#" aria-label="YouTube" className="text-black hover:text-black/60"><Youtube size={18} /></a>
          <a href="#" aria-label="Spotify" className="text-black hover:text-black/60"><Music size={18} /></a>
        </div>
      </div>
      <div className="bg-white text-black border-t border-black/10 md:border-0 md:bg-black md:text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-1 px-6 py-3 text-center text-[10px] leading-tight md:gap-1.5 md:px-10 md:py-4 md:text-xs">
          <p>Copyright 2016 Sony. All rights reserved.</p>
          <p className="tracking-widest">
            <span>{SITE_CREDIT.prefix}</span>
            <br />
            <a href={SITE_CREDIT.url} target="_blank" rel="noopener noreferrer" className="uppercase md:text-white md:hover:text-white/70 transition-colors text-purple-700 font-mono font-light">{SITE_CREDIT.agency}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
