import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

const SHOPIFY_SCRIPT_URL =
  'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

// TODO: move these into env vars (VITE_SHOPIFY_DOMAIN / VITE_SHOPIFY_TOKEN)
// rather than hardcoding — storefront tokens are safe to expose, but env vars
// make it easy to swap stores per environment.
const SHOPIFY_DOMAIN = 'galxboy-sa.myshopify.com';
const STOREFRONT_TOKEN = '3b7f71847b99743ed81f6d61ea90dfc1';
const COLLECTION_ID = '496493461795';

// Gold accent + its paired dark text color, copied from the site's
// design tokens (--gold / --gold-foreground in src/styles.css) so the
// Buy Button widget's CTA matches the rest of the site exactly.
const GOLD = 'oklch(0.83 0.16 80)';
const GOLD_HOVER = 'oklch(0.88 0.16 80)';
const GOLD_FOREGROUND = 'oklch(0.14 0.012 60)';

const goldButtonStyles = {
  'background-color': GOLD,
  color: GOLD_FOREGROUND,
  'font-weight': '700',
  'text-transform': 'uppercase',
  'letter-spacing': '0.08em',
  'font-size': '12px',
  'border-radius': '9999px',
  'padding-top': '12px',
  'padding-bottom': '12px',
  transition: 'background-color 0.2s ease, transform 0.2s ease',
  ':hover': {
    'background-color': GOLD_HOVER,
  },
  ':focus': {
    'background-color': GOLD_HOVER,
  },
};

export function ShopifyCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invoking effects in dev,
    // and against remounts re-triggering the widget build.
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    function renderCollection() {
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: STOREFRONT_TOKEN,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (!containerRef.current) return;
        ui.createComponent('collection', {
          id: COLLECTION_ID,
          node: containerRef.current,
          moneyFormat: 'R%20%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  // Glass card wrapper, matching merchandise.tsx product cards
                  'background-color': 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  'border-radius': '1.5rem',
                  padding: '1rem',
                  'backdrop-filter': 'blur(24px)',
                  '-webkit-backdrop-filter': 'blur(24px)',
                  transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                  ':hover': {
                    transform: 'translateY(-4px)',
                  },
                  // Mobile: horizontal scroll carousel cards
                  '@media (max-width: 639px)': {
                    'max-width': '280px',
                    'min-width': '280px',
                    width: '280px',
                    'margin-bottom': '0',
                    'margin-right': '16px',
                    flex: '0 0 280px',
                  },
                  '@media (min-width: 640px)': {
                    'max-width': 'calc(50% - 24px)',
                    'margin-left': '24px',
                    'margin-bottom': '24px',
                    width: 'calc(50% - 24px)',
                  },
                  '@media (min-width: 1024px)': {
                    'max-width': 'calc(25% - 24px)',
                    width: 'calc(25% - 24px)',
                  },
                  img: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    width: '100%',
                    height: '100%',
                    'object-fit': 'cover',
                  },
                  imgWrapper: {
                    'padding-top': '100%',
                    position: 'relative',
                    height: '0',
                    'border-radius': '1rem',
                    overflow: 'hidden',
                    'background-color': '#000000',
                    'margin-bottom': '1rem',
                  },
                },
                title: {
                  color: '#ffffff',
                  'font-family':
                    '"Chinese Rocks", "Syne", "Bebas Neue", system-ui, sans-serif',
                  'font-weight': '700',
                  'letter-spacing': '-0.02em',
                  'font-size': '18px',
                  'margin-top': '0.75rem',
                  '@media (min-width: 1024px)': {
                    'font-size': '22px',
                  },
                },
                price: {
                  color: '#ffffff',
                  'font-size': '14px',
                  'font-weight': '500',
                  'margin-top': '0.25rem',
                },
                compareAt: {
                  color: 'rgba(255,255,255,0.55)',
                  'text-decoration': 'line-through',
                },
                unitPrice: {
                  color: 'rgba(255,255,255,0.55)',
                },
                button: goldButtonStyles,
              },
              text: { button: 'Add to cart' },
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 640px)': { 'margin-left': '-24px' },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 640px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                title: {
                  color: '#ffffff',
                  'font-family':
                    '"Chinese Rocks", "Syne", "Bebas Neue", system-ui, sans-serif',
                },
                price: {
                  color: '#ffffff',
                },
                button: goldButtonStyles,
              },
              text: { button: 'Add to cart' },
            },
            option: {
              styles: {
                label: {
                  color: '#ffffff',
                  'font-family': 'Candara, sans-serif',
                  'font-size': '13px',
                  'font-weight': '600',
                  'text-transform': 'uppercase',
                  'letter-spacing': '0.05em',
                  'margin-bottom': '4px',
                },
                select: {
                  color: '#ffffff',
                  'background-color': 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  'border-radius': '0.5rem',
                  padding: '8px 12px',
                  'font-family': 'Candara, sans-serif',
                },
              },
            },
            cart: {
              styles: {
                button: goldButtonStyles,
              },
              text: { total: 'Subtotal', button: 'Checkout' },
              popup: false,
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': GOLD,
                  ':hover': { 'background-color': GOLD_HOVER },
                  ':focus': { 'background-color': GOLD_HOVER },
                },
              },
            },
          },
        });
      });
    }

    if (window.ShopifyBuy?.UI) {
      renderCollection();
      return;
    }

    if (window.ShopifyBuy) {
      const interval = setInterval(() => {
        if (window.ShopifyBuy.UI) {
          clearInterval(interval);
          renderCollection();
        }
      }, 50);
      return () => clearInterval(interval);
    }

    const existing = document.querySelector(
      `script[src="${SHOPIFY_SCRIPT_URL}"]`
    );
    if (existing) {
      existing.addEventListener('load', renderCollection);
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = SHOPIFY_SCRIPT_URL;
    script.onload = renderCollection;
    document.head.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
