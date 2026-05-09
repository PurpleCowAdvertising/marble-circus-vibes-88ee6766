import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useSubscribePopup } from "./SubscribePopup";
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
            <img
              src={ticketsAvailable}
              alt="Tickets available from Webtickets and Pick n Pay"
              className="mt-4 block h-auto w-auto max-w-[260px] md:mt-5 md:max-w-[300px]"
            />
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-black md:hidden">
              Stay in the<br />
              <span className="text-black">loop.</span>
            </h3>
            <p className="mt-3 max-w-md text-sm text-black/70 md:hidden">
              Drops, lineup reveals, ticket waves and exclusive behind-the-scenes — straight to your inbox.
            </p>
            <button
              onClick={() => open("footer")}
              className="mt-5 rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 md:hidden"
            >
              Subscribe
            </button>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Explore</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/music" className="text-black hover:text-black/60">Music</Link></li>
              <li><Link to="/about" className="text-black hover:text-black/60">About</Link></li>
              <li><Link to="/sponsors" className="text-black hover:text-black/60">Sponsors</Link></li>
              <li><Link to="/faqs" className="text-black hover:text-black/60">FAQs</Link></li>
              <li><Link to="/contact" className="text-black hover:text-black/60">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-black/60 md:mb-4 md:text-xs">Legal</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/privacy" className="text-black hover:text-black/60">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-black hover:text-black/60">Terms of Use</Link></li>
            </ul>

            <div className="mt-6 flex gap-3 md:mt-8 md:gap-4">
              <a href="#" aria-label="Instagram" className="text-black hover:text-black/60"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter" className="text-black hover:text-black/60"><Twitter size={18} /></a>
              <a href="#" aria-label="YouTube" className="text-black hover:text-black/60"><Youtube size={18} /></a>
              <a href="#" aria-label="Spotify" className="text-black hover:text-black/60"><Music size={18} /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-black/10 pt-5 text-center text-[10px] text-black/60 md:mt-10 md:gap-3 md:pt-6 md:text-xs">
          <p>© {new Date().getFullYear()} Sony Music Africa. All rights reserved.</p>
          <p className="tracking-widest"><span>Designed & developed by</span> <br /><a href="https://purplecowbw.com" target="_blank" rel="noopener noreferrer" className="uppercase text-black hover:text-black/60 transition-colors">Purple Cow Advertising</a></p>
        </div>
      </div>
    </footer>
  );
}
