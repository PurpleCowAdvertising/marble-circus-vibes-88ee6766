import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useSubscribePopup } from "./SubscribePopup";
import logo from "@/assets/logo.png";
import ticketsAvailable from "@/assets/tickets-available.png";

export function Footer() {
  const { open } = useSubscribePopup();
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-10 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-2">
            <img src={logo} alt="Scorpion Kings Live" className="h-12 w-auto md:h-32" />
            <img
              src={ticketsAvailable}
              alt="Tickets available from Webtickets and Pick n Pay"
              className="mt-4 h-auto w-full max-w-[320px] md:mt-6 md:max-w-[380px]"
            />
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:hidden">
              Stay in the<br />
              <span className="text-primary">loop.</span>
            </h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground md:hidden">
              Drops, lineup reveals, ticket waves and exclusive behind-the-scenes — straight to your inbox.
            </p>
            <button
              onClick={() => open("footer")}
              className="mt-5 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 md:hidden"
            >
              Subscribe
            </button>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground md:mb-4 md:text-xs">Explore</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/music" className="hover:text-accent">Music</Link></li>
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/sponsors" className="hover:text-accent">Sponsors</Link></li>
              <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground md:mb-4 md:text-xs">Legal</h4>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent">Terms of Use</Link></li>
            </ul>

            <div className="mt-6 flex gap-3 md:mt-8 md:gap-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent"><Twitter size={18} /></a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-accent"><Youtube size={18} /></a>
              <a href="#" aria-label="Spotify" className="text-muted-foreground hover:text-accent"><Music size={18} /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-2 border-t border-border pt-6 text-center text-[10px] text-muted-foreground md:mt-16 md:gap-4 md:pt-8 md:text-xs">
          <p>© {new Date().getFullYear()} Sony Music Africa. All rights reserved.</p>
          <p className="tracking-widest"><span className="lowercase">Designed & developed by</span> <br /><span className="uppercase">Purple Cow Advertising</span></p>
        </div>
      </div>
    </footer>
  );
}
