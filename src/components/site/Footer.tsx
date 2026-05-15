import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useSubscribePopup } from "./SubscribePopup";
import { SITE_CREDIT } from "@/config/credits";
import logo from "@/assets/logo.png";
import ticketsAvailable from "@/assets/tickets-available.png";

export function Footer() {
  const { open } = useSubscribePopup();
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
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-black md:hidden">
              Stay in the<br />
              <span className="text-black">loop.</span>
            </h3>
            <p className="mt-3 max-w-md text-sm text-black/70 md:hidden">
              Drops, lineup reveals, ticket waves and exclusive behind-the-scenes — straight to your inbox.
            </p>
            {/* Mobile: Contact button (replaces Subscribe). Desktop: keep Subscribe. */}
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 md:hidden"
            >
              Contact
            </Link>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-orange-rich md:mb-4 md:text-xs md:text-black/60">Explore</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/music" className="text-black hover:text-black/60">Line-Up</Link></li>
              <li><Link to="/tickets" className="text-black hover:text-black/60">Tickets</Link></li>
              <li><Link to="/experience" className="text-black hover:text-black/60">Experience</Link></li>
              {/* Desktop-only links (mobile moves these to right column or removes) */}
              <li className="hidden md:list-item"><Link to="/partners" className="text-black hover:text-black/60">Partners</Link></li>
              <li className="hidden md:list-item"><Link to="/news" className="text-black hover:text-black/60">News</Link></li>
              <li className="hidden md:list-item"><Link to="/legacy" className="text-black hover:text-black/60">Legacy / CSI</Link></li>
              <li className="hidden md:list-item"><Link to="/merchandise" className="text-black hover:text-black/60">Merchandise</Link></li>
              <li><Link to="/faqs" className="text-black hover:text-black/60">FAQs</Link></li>
              <li className="hidden md:list-item"><Link to="/contact" className="text-black hover:text-black/60">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Legal</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/privacy" className="text-black hover:text-black/60">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-black hover:text-black/60">Terms of Use</Link></li>
              {/* Mobile-only: Partners, News, Legacy, CSI moved here */}
              <li className="md:hidden"><Link to="/partners" className="text-black hover:text-black/60">Partners</Link></li>
              <li className="md:hidden"><Link to="/news" className="text-black hover:text-black/60">News</Link></li>
              <li className="md:hidden"><Link to="/legacy" className="text-black hover:text-black/60">Legacy</Link></li>
              <li className="md:hidden"><Link to="/legacy" className="text-black hover:text-black/60">CSI</Link></li>
            </ul>

            <div className="mt-6 flex gap-3 md:mt-8 md:gap-4">
              <a href="#" aria-label="Instagram" className="text-black hover:text-black/60"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter" className="text-black hover:text-black/60"><Twitter size={18} /></a>
              <a href="#" aria-label="YouTube" className="text-black hover:text-black/60"><Youtube size={18} /></a>
              <a href="#" aria-label="Spotify" className="text-black hover:text-black/60"><Music size={18} /></a>
            </div>
          </div>
        </div>

      </div>
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-1 px-6 py-3 text-center text-[10px] leading-tight md:gap-1.5 md:px-10 md:py-4 md:text-xs">
          <p>© {new Date().getFullYear()} Sony Music Africa. All rights reserved.</p>
          <p className="tracking-widest">
            <span>{SITE_CREDIT.prefix}</span>{" "}
            <a href={SITE_CREDIT.url} target="_blank" rel="noopener noreferrer" className="uppercase text-white hover:text-white/70 transition-colors">{SITE_CREDIT.agency}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
