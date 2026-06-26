import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";

import { ConsentBanner } from "@/components/site/ConsentBanner";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { LaunchCountdown } from "@/components/site/LaunchCountdown";
import { SubscribeProvider } from "@/components/site/SubscribePopup";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Page not found</p>

        <h1 className="mt-4 font-display text-8xl font-bold text-white">404</h1>

        <p className="mt-4 text-sm leading-relaxed text-white/65">
          The page you’re looking for does not exist or has been moved.
        </p>

        <div className="mt-7">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Something went wrong</p>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white">This page didn’t load.</h1>

        <p className="mt-3 text-sm leading-relaxed text-white/65">You can try refreshing the page or head back home.</p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-gold hover:text-gold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Scorpion Kings Live" },
      {
        name: "description",
        content: "Scorpion Kings Live, home of the artists, the events and the culture.",
      },
      { name: "author", content: "Scorpion Kings Live" },
      { property: "og:title", content: "Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Scorpion Kings Live, home of the artists, the events and the culture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Scorpion Kings Live" },
      {
        name: "twitter:description",
        content: "Scorpion Kings Live, home of the artists, the events and the culture.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8c4e17d7-28f6-42be-a735-b866b4d2b1ed/id-preview-79c1df9e--b14f59e7-9cd4-4bcb-a19b-ee187eb36f3f.lovable.app-1778249006123.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8c4e17d7-28f6-42be-a735-b866b4d2b1ed/id-preview-79c1df9e--b14f59e7-9cd4-4bcb-a19b-ee187eb36f3f.lovable.app-1778249006123.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTop() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const hash = useRouterState({
    select: (state) => state.location.hash,
  });

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      const element = id ? document.getElementById(id) : null;

      if (element) {
        window.setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 60);
      }

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash]);

  return null;
}

function AnimatedOutlet() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.24,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-w-0 flex-1"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SubscribeProvider>
        <ScrollToTop />

        <div className="relative flex min-h-[100dvh] flex-col bg-background text-foreground">
          <Header />

          <main className="relative z-10 flex-1">
            <AnimatedOutlet />
          </main>

          <Footer />
          <MobileTabBar />
        </div>

        <ConsentBanner />
        <LaunchCountdown />
        <Toaster />
      </SubscribeProvider>
    </QueryClientProvider>
  );
}
