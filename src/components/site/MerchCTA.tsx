import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { getCartCount, openCart, subscribeCartCount } from '@/lib/shopify-cart';

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
  const reachedMerch = useRef(false);
  const autoTimer = useRef<number | null>(null);

  const collapse = useCallback(() => {
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    autoTimer.current = null;
    setExpanded(false);
  }, []);

  const expandTemporarily = useCallback((ms = 2200) => {
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    setExpanded(true);
    autoTimer.current = window.setTimeout(() => setExpanded(false), ms);
  }, []);

  // Cart count
  useEffect(() => subscribeCartCount(setCount), []);

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
        }, 2800);
      }, 900);
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

  // Collapse the intro pill as soon as the visitor starts scrolling.
  useEffect(() => {
    if (!expanded || !firstReveal) return;
    const onScroll = () => {
      setExpanded(false);
      setFirstReveal(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true, once: true });
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

      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          if (!firstReveal) collapse();
        }}
        aria-label={
          count > 0 ? `Open cart (${count} items)` : 'Buy official merch'
        }
        className={[
          'group fixed right-0 top-1/2 z-[60] -translate-y-1/2',
          'flex items-center gap-2 overflow-hidden',
          'rounded-l-full border border-r-0 border-white/25',
          'bg-gold/90 text-[color:var(--gold-foreground,#1a1408)] backdrop-blur-xl',
          'shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)]',
          'py-3 pl-3 pr-3',
          'transition-[transform,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
          mounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
          firstReveal ? 'scale-[1.04]' : 'scale-100',
        ].join(' ')}
      >
        <ChevronLeft
          className={[
            'h-4 w-4 shrink-0 transition-transform duration-300',
            expanded ? '-translate-x-0.5' : 'translate-x-0',
          ].join(' ')}
          strokeWidth={2.5}
          aria-hidden
        />

        <span className="relative flex shrink-0 items-center justify-center">
          <ShoppingBag className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-gold">
              {count}
            </span>
          )}
        </span>

        <span
          className={[
            'whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em]',
            'transition-[max-width,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            expanded
              ? 'ml-0.5 max-w-[180px] opacity-100'
              : 'ml-0 max-w-0 opacity-0',
          ].join(' ')}
        >
          {count > 0 ? 'View your cart' : 'Buy official merch'}
        </span>
      </button>
    </>
  );
}
