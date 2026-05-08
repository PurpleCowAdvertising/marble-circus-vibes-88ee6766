import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useSubscribePopup } from "./SubscribePopup";
import logo from "@/assets/logo.png";

export function Footer() {
  const { open } = useSubscribePopup();
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <img src={logo} alt="Scorpion Kings Live" className="h-16 w-auto md:h-20" />
            <h3 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Stay in the<br />
              <span className="text-primary">loop.</span>
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Drops, lineup reveals, ticket waves and exclusive behind-the-scenes — straight to your inbox.
            </p>
            <button
              onClick={() => open("footer")}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/music" className="hover:text-accent">Music</Link></li>
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/sponsors" className="hover:text-accent">Sponsors</Link></li>
              <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent">Terms of Use</Link></li>
            </ul>

            <div className="mt-8 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent"><Twitter size={20} /></a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-accent"><Youtube size={20} /></a>
              <a href="#" aria-label="Spotify" className="text-muted-foreground hover:text-accent"><Music size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sony Music Africa. All rights reserved.</p>
          <p className="tracking-widest text-center"><span className="lowercase">Designed & developed by</span> <br /><span className="uppercase">Purple Cow Advertising</span></p>
        </div>
      </div>
    </footer>
  );
}
