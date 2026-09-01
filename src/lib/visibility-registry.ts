// Canonical list of every toggleable page and section on the site.
// Add an entry here + wrap the JSX in <VisibilityGate keyName="..."> to make
// something toggleable from the admin panel. The admin panel auto-syncs new
// keys into the DB the next time it loads.

export type RegistryEntry = {
  key: string;
  kind: "page" | "section";
  label: string;
  parentKey?: string;
  sortOrder: number;
  route?: string; // pages only — used for nav filtering + page 404
};

export const VISIBILITY_REGISTRY: RegistryEntry[] = [
  // -------- Pages (page-level ON/OFF is wired everywhere) --------
  { key: "page:home", kind: "page", label: "Home", sortOrder: 10, route: "/" },
  { key: "page:about", kind: "page", label: "About", sortOrder: 20, route: "/about" },
  { key: "page:music", kind: "page", label: "Line-Up (Music)", sortOrder: 30, route: "/music" },
  { key: "page:news", kind: "page", label: "News", sortOrder: 40, route: "/news" },
  { key: "page:tickets", kind: "page", label: "Tickets", sortOrder: 50, route: "/tickets" },
  { key: "page:partners", kind: "page", label: "Partners", sortOrder: 60, route: "/partners" },
  { key: "page:experience", kind: "page", label: "Hospitality", sortOrder: 70, route: "/experience" },
  { key: "page:merchandise", kind: "page", label: "Merchandise", sortOrder: 80, route: "/merchandise" },
  { key: "page:legacy", kind: "page", label: "Legacy / CSI", sortOrder: 90, route: "/legacy" },
  { key: "page:contact", kind: "page", label: "Contact", sortOrder: 100, route: "/contact" },
  { key: "page:faqs", kind: "page", label: "FAQs", sortOrder: 110, route: "/faqs" },
  { key: "page:privacy", kind: "page", label: "Privacy Policy", sortOrder: 120, route: "/privacy" },
  { key: "page:terms", kind: "page", label: "Terms of Use", sortOrder: 130, route: "/terms" },

  // -------- Home sections (fully wired) --------
  { key: "section:home.hero", kind: "section", label: "Hero video", parentKey: "page:home", sortOrder: 10 },
  { key: "section:home.scorpion-kings", kind: "section", label: "Scorpion Kings (duo)", parentKey: "page:home", sortOrder: 20 },
  { key: "section:home.lineup-carousel", kind: "section", label: "Artist carousel (Line-Up)", parentKey: "page:home", sortOrder: 30 },
  { key: "section:home.about-band", kind: "section", label: "About band strip", parentKey: "page:home", sortOrder: 40 },
  { key: "section:home.past-photos", kind: "section", label: "Past event photos", parentKey: "page:home", sortOrder: 50 },
  { key: "section:home.lineup-grid", kind: "section", label: "Lineup grid (desktop)", parentKey: "page:home", sortOrder: 60 },
  { key: "section:home.tickets", kind: "section", label: "Tickets tier cards", parentKey: "page:home", sortOrder: 70 },
  { key: "section:home.experience", kind: "section", label: "Experience blocks", parentKey: "page:home", sortOrder: 80 },
  { key: "section:home.merchandise", kind: "section", label: "Home merchandise preview", parentKey: "page:home", sortOrder: 85 },
  { key: "section:home.partners", kind: "section", label: "Partners row", parentKey: "page:home", sortOrder: 90 },

  // -------- About sections --------
  { key: "section:about.story", kind: "section", label: "Our story", parentKey: "page:about", sortOrder: 10 },
  { key: "section:about.duo", kind: "section", label: "About Scorpion Kings", parentKey: "page:about", sortOrder: 20 },
  { key: "section:about.principles", kind: "section", label: "Principles", parentKey: "page:about", sortOrder: 30 },
  { key: "section:about.platform", kind: "section", label: "What this platform does", parentKey: "page:about", sortOrder: 40 },

  // -------- Music sections --------
  { key: "section:music.artists", kind: "section", label: "Artists grid", parentKey: "page:music", sortOrder: 10 },
  { key: "section:music.releases", kind: "section", label: "Latest releases", parentKey: "page:music", sortOrder: 20 },

  // -------- Partners sections --------
  { key: "section:partners.confirmed", kind: "section", label: "Confirmed partner logos", parentKey: "page:partners", sortOrder: 5 },
  { key: "section:partners.packages", kind: "section", label: "Package tiers + filters", parentKey: "page:partners", sortOrder: 10 },
  { key: "section:partners.cta", kind: "section", label: "Partner-with-us CTA", parentKey: "page:partners", sortOrder: 20 },

  // -------- News sections --------
  { key: "section:news.header", kind: "section", label: "Header ('The official word.')", parentKey: "page:news", sortOrder: 10 },
  { key: "section:news.posts", kind: "section", label: "News posts list", parentKey: "page:news", sortOrder: 20 },
  { key: "section:news.press", kind: "section", label: "Press queries card", parentKey: "page:news", sortOrder: 30 },

  // -------- Tickets sections --------
  { key: "section:tickets.featured", kind: "section", label: "Featured 'From R400' card", parentKey: "page:tickets", sortOrder: 10 },
  { key: "section:tickets.tiers", kind: "section", label: "Ticket tier cards", parentKey: "page:tickets", sortOrder: 20 },
  { key: "section:tickets.retailers", kind: "section", label: "Retailers row", parentKey: "page:tickets", sortOrder: 30 },
  { key: "section:tickets.facts", kind: "section", label: "Event facts grid", parentKey: "page:tickets", sortOrder: 40 },
  { key: "section:tickets.disclaimer", kind: "section", label: "Disclaimer text", parentKey: "page:tickets", sortOrder: 50 },

  // -------- Experience sections --------
  { key: "section:experience.intro", kind: "section", label: "Intro header", parentKey: "page:experience", sortOrder: 10 },
  { key: "section:experience.blocks", kind: "section", label: "Experience blocks grid", parentKey: "page:experience", sortOrder: 20 },
  { key: "section:experience.facts", kind: "section", label: "Facts row", parentKey: "page:experience", sortOrder: 30 },

  // -------- Merchandise sections --------
  { key: "section:merchandise.intro", kind: "section", label: "Intro header", parentKey: "page:merchandise", sortOrder: 10 },
  { key: "section:merchandise.products", kind: "section", label: "Product preview grid", parentKey: "page:merchandise", sortOrder: 20 },
  { key: "section:merchandise.cta", kind: "section", label: "Store-coming-soon CTA", parentKey: "page:merchandise", sortOrder: 30 },

  // -------- Legacy sections --------
  { key: "section:legacy.intro", kind: "section", label: "Intro header", parentKey: "page:legacy", sortOrder: 10 },
  { key: "section:legacy.pillars", kind: "section", label: "Pillars grid", parentKey: "page:legacy", sortOrder: 20 },
  { key: "section:legacy.coming-next", kind: "section", label: "Coming-next card", parentKey: "page:legacy", sortOrder: 30 },

  // -------- Contact sections --------
  { key: "section:contact.info", kind: "section", label: "Contact info column", parentKey: "page:contact", sortOrder: 10 },
  { key: "section:contact.form", kind: "section", label: "Contact form", parentKey: "page:contact", sortOrder: 20 },
  { key: "section:contact.partners", kind: "section", label: "Contact sponsor logos", parentKey: "page:contact", sortOrder: 30 },

  // -------- FAQs sections --------
  { key: "section:faqs.intro", kind: "section", label: "Intro header", parentKey: "page:faqs", sortOrder: 10 },
  { key: "section:faqs.categories", kind: "section", label: "FAQ categories accordion", parentKey: "page:faqs", sortOrder: 20 },
  { key: "section:faqs.cta", kind: "section", label: "'Send the team a message' CTA", parentKey: "page:faqs", sortOrder: 30 },
];

export const REGISTRY_BY_KEY: Record<string, RegistryEntry> = Object.fromEntries(
  VISIBILITY_REGISTRY.map((entry) => [entry.key, entry]),
);

export const PAGE_KEY_BY_ROUTE: Record<string, string> = Object.fromEntries(
  VISIBILITY_REGISTRY.filter((entry) => entry.kind === "page" && entry.route).map((entry) => [
    entry.route as string,
    entry.key,
  ]),
);
