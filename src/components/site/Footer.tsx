import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useSubscribePopup } from "./SubscribePopup";
import logo from "@/assets/logo.png";

export function Footer() {
  const { open } = useSubscribePopup();
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
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
              <li><Link to="/music" className="hover:text-primary">Music</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/sponsors" className="hover:text-primary">Sponsors</Link></li>
              <li><Link to="/faqs" className="hover:text-primary">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Use</Link></li>
            </ul>

            <div className="mt-8 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={20} /></a>
              <a href="#" aria-label="Spotify" className="text-muted-foreground hover:text-primary"><Music size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Sony Music Entertainment Africa (Pty) Ltd. All rights reserved.</p>
          <p className="uppercase tracking-widest">Made for the culture.</p>
        </div>
      </div>
    </footer>
  );
}
