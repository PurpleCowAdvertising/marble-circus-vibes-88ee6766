import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import {
  fetchFeaturedMerch,
  getCartCount,
  openCart,
  subscribeCartCount,
} from '@/lib/shopify-cart';


const MERCH_ID = 'merchandise';
const SEEN_KEY = 'sk-merch-cta-seen';

/**
 * Persistent floating merchandise CTA.
 *
 * Replaces the Shopify SDK's own cart toggle (hidden via CSS below) with a
 * branded pill that doubles as a shortcut to the Official Merch section and
 * as the cart opener once items are in the basket.
 */
export function MerchCTA() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [firstReveal, setFirstReveal] = useState(false);
  const [count, setCount] = useState(0);
  const [featured, setFeatured] = useState<{
    title: string;
    image: string;
  } | null>(null);
  const reachedMerch = useRef(false);
  const autoTimer = useRef<number | null>(null);


  const collapse = useCallback(() => {
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    autoTimer.current = null;
    setExpanded(false);
  }, []);

  const expandTemporarily = useCallback((ms = 2600) => {
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    setExpanded(true);
    autoTimer.current = window.setTimeout(() => setExpanded(false), ms);
  }, []);

  // Cart count
  useEffect(() => subscribeCartCount(setCount), []);

  // Merch preview thumbnail (loaded lazily, after first paint).
  useEffect(() => {
    const id = window.setTimeout(() => {
      fetchFeaturedMerch().then((f) => f && setFeatured(f));
    }, 1200);
    return () => window.clearTimeout(id);
  }, []);


  // Mount-in slide, then the one-time auto-expand.
  useEffect(() => {
    const seen =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(SEEN_KEY) === '1';
    if (seen) reachedMerch.current = true;

    const inTimer = window.setTimeout(() => setMounted(true), 400);
    let outTimer: number | null = null;

    if (!seen) {
      outTimer = window.setTimeout(() => {
        setFirstReveal(true);
        setExpanded(true);
        autoTimer.current = window.setTimeout(() => {
          setExpanded(false);
          setFirstReveal(false);
        }, 4200);
      }, 1300);

    }

    const onScroll = () => {
      if (!reachedMerch.current) return;
      collapse();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(inTimer);
      if (outTimer) window.clearTimeout(outTimer);
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [collapse]);

  // Collapse the intro pill once the visitor has scrolled a meaningful amount,
  // so it eases away rather than snapping shut on the first pixel of scroll.
  useEffect(() => {
    if (!expanded || !firstReveal) return;
    const start = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) < 160) return;
      setExpanded(false);
      setFirstReveal(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [expanded, firstReveal]);


  // Track whether the merch section has been reached this session.
  useEffect(() => {
    const el = document.getElementById(MERCH_ID);
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reachedMerch.current = true;
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {
            /* ignore */
          }
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  const scrollToMerch = useCallback(() => {
    const el = document.getElementById(MERCH_ID);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  }, []);

  const handleClick = useCallback(() => {
    expandTemporarily(1400);

    // Not yet at the merch section → take them there first.
    if (!reachedMerch.current) {
      if (scrollToMerch()) return;
      navigate({ to: '/' }).then(() => {
        window.setTimeout(scrollToMerch, 400);
      });
      return;
    }

    if (getCartCount() > 0 && openCart()) return;
    if (!scrollToMerch()) {
      navigate({ to: '/' }).then(() => {
        window.setTimeout(scrollToMerch, 400);
      });
    }
  }, [expandTemporarily, navigate, scrollToMerch]);

  return (
    <>
      {/* The SDK's own floating cart toggle is replaced by this CTA. */}
      <style>{`
        .shopify-buy-frame--toggle,
        iframe.shopify-buy-frame--toggle,
        .shopify-buy__cart-toggle { display: none !important; }
      `}</style>

      <div
        className={[
          'fixed right-0 top-1/2 z-[60] -translate-y-1/2',
          'transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          mounted ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
        ].join(' ')}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          if (!firstReveal) collapse();
        }}
      >
        {/* Floating product preview */}
        <div
          aria-hidden
          className={[
            'pointer-events-none absolute bottom-full right-2 mb-3',
            'w-28 overflow-hidden rounded-2xl border border-white/15',
            'bg-background/70 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl',
            'transition-[opacity,transform] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            expanded && featured
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-2 scale-95 opacity-0',
          ].join(' ')}
        >
          {featured && (
            <>
              <img
                src={featured.image}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-1.5 truncate text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground/80">
                {featured.title}
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleClick}
          aria-label={
            count > 0 ? `Open cart (${count} items)` : 'Buy official merch'
          }
          className={[
            'group relative flex items-center overflow-hidden',
            'rounded-l-2xl border border-r-0 border-white/20',
            'bg-gradient-to-l from-gold to-gold/85 text-gold-foreground',
            'shadow-[0_16px_44px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl',
            'h-12 pl-2.5 pr-3',
            'transition-[box-shadow,filter] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            'hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.9)] hover:brightness-105',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
          ].join(' ')}
        >
          <ChevronLeft
            className={[
              'h-4 w-4 shrink-0 transition-[opacity,transform] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              expanded ? '-translate-x-0.5 opacity-100' : 'opacity-60',
            ].join(' ')}
            strokeWidth={2.5}
            aria-hidden
          />

          <span className="relative ml-1 flex shrink-0 items-center justify-center">
            <ShoppingBag className="h-5 w-5" strokeWidth={2.1} aria-hidden />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-background px-1 text-[10px] font-bold leading-none text-gold">
                {count}
              </span>
            )}
          </span>

          <span
            className={[
              'grid transition-[grid-template-columns] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              expanded ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]',
            ].join(' ')}
          >
            <span className="overflow-hidden">
              <span
                className={[
                  'block whitespace-nowrap pl-2 text-[11px] font-bold uppercase tracking-[0.16em]',
                  'transition-opacity duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  expanded ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                {count > 0 ? 'View your cart' : 'Buy merch'}
              </span>
            </span>
          </span>
        </button>
      </div>
    </>
  );
}

