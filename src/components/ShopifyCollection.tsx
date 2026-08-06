import { useEffect, useRef, useState } from 'react';

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

const ORANGE_500_20 = 'rgba(249, 115, 22, 0.2)';
const ORANGE_500_30 = 'rgba(249, 115, 22, 0.3)';
const ORANGE_500_40 = 'rgba(249, 115, 22, 0.4)';
const ORANGE_500_12 = 'rgba(249, 115, 22, 0.12)';
const ORANGE_500_25 = 'rgba(249, 115, 22, 0.25)';
const SLATE_950_82 = 'rgba(2, 6, 23, 0.82)';
const SLATE_900_50 = 'rgba(2, 6, 23, 0.5)';
const WHITE_08 = 'rgba(255, 255, 255, 0.08)';
const WHITE_10 = 'rgba(255, 255, 255, 0.1)';
const WHITE_15 = 'rgba(255, 255, 255, 0.15)';
const WHITE_05 = 'rgba(255, 255, 255, 0.05)';
const WHITE_55 = 'rgba(255, 255, 255, 0.55)';

const goldButtonStyles = {
  'background-color': GOLD,
  color: GOLD_FOREGROUND,
  'font-weight': '700',
  'text-transform': 'uppercase',
  'letter-spacing': '0.08em',
  'font-size': '12px',
  'border-radius': '9999px',
  'border-width': '0',
  'padding-top': '12px',
  'padding-bottom': '12px',
  'margin-top': '16px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 0.2s ease, transform 0.2s ease',
  ':before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background:
      'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  ':hover': {
    'background-color': GOLD_HOVER,
    transform: 'translateY(-1px)',
    ':before': {
      transform: 'translateX(100%)',
    },
  },
  ':focus': {
    'background-color': GOLD_HOVER,
  },
};

const FONT_SANS =
  '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const FONT_DISPLAY =
  '"Chinese Rocks", "Syne", "Bebas Neue", system-ui, sans-serif';

const optionWrapperStyles = {
  'background-color': 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  'border-radius': '9999px',
  padding: '0',
  margin: '0',
  'z-index': '2',
  position: 'relative',
  display: 'inline-block',
  width: '48%',
  'vertical-align': 'top',
};

const optionSelectStyles = {
  color: '#ffffff',
  'background-color': 'transparent',
  border: '0',
  'border-radius': '9999px',
  padding: '6px 26px 6px 12px',
  'font-family': FONT_SANS,
  'font-size': '12px',
  height: '32px',
  width: '100%',
  ':focus': {
    outline: 'none',
    'box-shadow': `inset 0 0 0 2px ${ORANGE_500_20}`,
  },
};


function injectIframeCss(node: HTMLElement) {
  // The Shopify Buy Button renders inside same-origin iframes that the SDK
  // creates without a src attribute (product grid, cart, and the product
  // detail modal). We inject an extra stylesheet to style elements that the
  // SDK's `styles` object does not expose (disabled button state, dropdown
  // chevron, modal chrome, etc.).
  const tryInject = () => {
    const frames = Array.from(
      new Set([
        ...Array.from(node.querySelectorAll('iframe')),
        ...Array.from(
          document.querySelectorAll(
            'iframe.shopify-buy-frame, iframe[name^="frame-"]'
          )
        ),

      ])
    ) as HTMLIFrameElement[];
    if (!frames.length) return false;
    let injected = false;
    for (const iframe of frames) {
      const doc = iframe.contentDocument;
      if (!doc || !doc.head) continue;

      const id = 'shopify-glass-override';
      if (doc.getElementById(id)) {
        injected = true;
        continue;
      }
      injected = true;


    const style = doc.createElement('style');
    style.id = id;
    style.textContent = `
      @font-face {
        font-family: "Chinese Rocks";
        font-style: normal;
        font-weight: 400 900;
        font-display: swap;
        src: url("/fonts/chinese-rocks.otf") format("opentype");
      }
      @font-face {
        font-family: "Syne";
        font-style: normal;
        font-weight: 400 800;
        font-display: swap;
        src: url("https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_04uT6k.woff2") format("woff2");
      }
      .shopify-buy-frame, .shopify-buy__product, .shopify-buy__product * {
        font-family: ${FONT_SANS} !important;
      }
      .shopify-buy__product__title {
        font-family: ${FONT_DISPLAY} !important;
        letter-spacing: -0.01em !important;
      }
      .shopify-buy__product__price,
      .shopify-buy__product__actual-price {
        color: ${GOLD} !important;
        font-weight: 700 !important;
      }
      /* Compact, pill-shaped variant selectors, side by side */
      .shopify-buy__product__variant-selectors {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 8px !important;
        margin: 8px 0 0 !important;
        position: relative;
        z-index: 2;
      }
      .shopify-buy__option-select {
        flex: 1 1 calc(50% - 8px) !important;
        min-width: 0 !important;
        margin: 0 !important;
      }
      .shopify-buy__option-select__label {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(0 0 0 0) !important;
        white-space: nowrap !important;
      }
      .shopify-buy__option-select-wrapper {
        background: rgba(255,255,255,0.05) !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        border-radius: 9999px !important;
        width: 100% !important;
        margin: 0 !important;
        transition: border-color 0.2s ease, background-color 0.2s ease !important;
      }
      .shopify-buy__option-select-wrapper:hover {
        border-color: ${ORANGE_500_40} !important;
        background: rgba(255,255,255,0.09) !important;
      }
      .shopify-buy__option-select__select {
        color: #ffffff !important;
        background: transparent !important;
        border: 0 !important;
        border-radius: 9999px !important;
        padding: 6px 24px 6px 12px !important;
        height: 32px !important;
        font-size: 12px !important;
        line-height: 1.2 !important;
        letter-spacing: 0.02em !important;
        text-transform: none !important;
      }
      .shopify-buy__option-select__select option {
        color: #ffffff !important;
        background: #0b1020 !important;
      }
      .shopify-buy__option-select__select:focus {
        outline: none !important;
        box-shadow: inset 0 0 0 2px ${ORANGE_500_20} !important;
      }
      .shopify-buy__select-icon {
        fill: rgba(255,255,255,0.7) !important;
        right: 8px !important;
      }
      .shopify-buy__btn[disabled],
      .shopify-buy__btn:disabled {
        background: #ffffff !important;
        color: ${GOLD_FOREGROUND} !important;
        border-radius: 9999px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        font-size: 12px !important;
      }
      .shopify-buy__product__variant-img {
        background: ${SLATE_900_50} !important;
      }
      .shopify-buy__product__compare-price {
        color: ${WHITE_55} !important;
      }
      .shopify-buy__product__unit-price {
        color: ${WHITE_55} !important;
      }
      @keyframes glassShimmer {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
      .shopify-buy__product::after {
        animation: glassShimmer 4s ease-in-out infinite !important;
      }
      /* Product detail modal — dark glass to match the site */
      .shopify-buy-modal, .shopify-buy__modal {
        background: rgba(2, 6, 23, 0.94) !important;
        border: 1px solid ${ORANGE_500_20} !important;
        border-radius: 28px !important;
        color: #ffffff !important;
      }
      .shopify-buy__modal-item, .shopify-buy__modal-item * {
        color: #ffffff;
      }
      .shopify-buy__modal .shopify-buy__option-select__label,
      .shopify-buy__modal-item .shopify-buy__option-select__label {
        position: static !important;
        width: auto !important;
        height: auto !important;
        clip: auto !important;
        color: rgba(255,255,255,0.65) !important;
        font-size: 11px !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        margin-bottom: 6px !important;
      }
      .shopify-buy__modal .shopify-buy__option-select,
      .shopify-buy__modal-item .shopify-buy__option-select {
        flex: 1 1 calc(50% - 8px) !important;
      }
      .shopify-buy__quantity {
        color: #ffffff !important;
        background: rgba(255,255,255,0.06) !important;
        border: 1px solid rgba(255,255,255,0.15) !important;
        border-radius: 9999px !important;
      }
      .shopify-buy__btn--close {
        color: rgba(255,255,255,0.8) !important;
      }
      .shopify-buy__product-description,
      .shopify-buy__product-description * {
        color: rgba(255,255,255,0.75) !important;
      }
    `;

      doc.head.appendChild(style);
    }
    return injected;
  };

  // Try immediately, then keep polling as the SDK lazily builds the modal
  // iframe on first product click.
  tryInject();
  let attempts = 0;
  const timer = setInterval(() => {
    tryInject();
    if (attempts++ > 600) clearInterval(timer);
  }, 500);
}


// Start downloading the Buy Button SDK as soon as this module is imported so
// the widget can paint almost immediately once the section mounts.
let sdkPromise: Promise<void> | null = null;
function loadSdk(): Promise<void> {
  if (typeof window === 'undefined') return new Promise(() => {});
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<void>((resolve) => {
    const waitForUi = () => {
      if (window.ShopifyBuy?.UI) return resolve();
      const t = setInterval(() => {
        if (window.ShopifyBuy?.UI) {
          clearInterval(t);
          resolve();
        }
      }, 30);
    };
    if (window.ShopifyBuy) return waitForUi();
    const existing = document.querySelector(
      `script[src="${SHOPIFY_SCRIPT_URL}"]`
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', waitForUi);
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = SHOPIFY_SCRIPT_URL;
    script.onload = waitForUi;
    document.head.appendChild(script);
  });
  return sdkPromise;
}
if (typeof window !== 'undefined') {
  // Kick off the download immediately (non-blocking).
  loadSdk();
}

type StockMap = Record<string, boolean>;

// Fetch live availability straight from the Storefront API so we can mark
// sold-out products and push them to the end of the mobile carousel.
async function fetchAvailability(): Promise<StockMap> {
  const query = `{
    collection(id: "gid://shopify/Collection/${COLLECTION_ID}") {
      products(first: 60) { nodes { title availableForSale } }
    }
  }`;
  try {
    const res = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );
    const json = await res.json();
    const nodes = json?.data?.collection?.products?.nodes ?? [];
    const map: StockMap = {};
    for (const n of nodes) {
      map[String(n.title).trim().toLowerCase()] = !!n.availableForSale;
    }
    return map;
  } catch {
    return {};
  }
}

function applyStockState(node: HTMLElement, onReady: () => void) {
  let stock: StockMap | null = null;
  let notified = false;
  fetchAvailability().then((m) => {
    stock = m;
  });

  const isMobile = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;

  const apply = () => {
    const iframe = node.querySelector('iframe') as HTMLIFrameElement | null;
    const doc = iframe?.contentDocument;
    if (!doc) return false;
    const products = Array.from(
      doc.querySelectorAll('.shopify-buy__product')
    ) as HTMLElement[];
    if (!products.length) return false;

    if (!notified) {
      notified = true;
      onReady();
    }
    if (!stock) return false;

    const soldOut: HTMLElement[] = [];
    for (const el of products) {
      const title = (
        el.querySelector('.shopify-buy__product__title')?.textContent ?? ''
      )
        .trim()
        .toLowerCase();
      const available = stock[title];
      if (available === false) {
        soldOut.push(el);
        el.setAttribute('data-sold-out', 'true');
        const btn = el.querySelector(
          '.shopify-buy__btn'
        ) as HTMLButtonElement | null;
        if (btn && btn.textContent?.trim() !== 'Out of stock') {
          btn.textContent = 'Out of stock';
          btn.setAttribute('disabled', 'disabled');
        }
      } else if (available === true) {
        el.removeAttribute('data-sold-out');
      }
    }

    // On mobile, in-stock items lead the carousel; sold-out ones go last.
    if (isMobile() && soldOut.length) {
      for (const el of soldOut) {
        const parent = el.parentElement;
        if (parent && parent.lastElementChild !== el) parent.appendChild(el);
      }
    }
    return true;
  };

  apply();
  let attempts = 0;
  const timer = setInterval(() => {
    apply();
    if (attempts++ > 120) clearInterval(timer);
  }, 250);
}

export function ShopifyCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const [ready, setReady] = useState(false);


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
              // Colour / size are chosen in the product detail view instead of
              // on the card, keeping the grid cards compact.
              buttonDestination: 'modal',
              contents: {
                options: false,
              },
              styles: {

                product: {
                  // Gilded glass card outer wrapper
                  position: 'relative',
                  background: `linear-gradient(180deg, ${WHITE_10} 0%, transparent 60%)`,
                  border: `1px solid ${ORANGE_500_20}`,
                  'border-radius': '2.5rem',
                  padding: '1.5rem',
                  'backdrop-filter': 'blur(24px)',
                  '-webkit-backdrop-filter': 'blur(24px)',
                  overflow: 'hidden',
                  transition:
                    'border-color 0.5s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
                  // Inner dark card fill
                  ':before': {
                    content: '""',
                    position: 'absolute',
                    top: '1px',
                    left: '1px',
                    right: '1px',
                    bottom: '1px',
                    'border-radius': '2.35rem',
                    'background-color': SLATE_950_82,
                    'z-index': '0',
                    'pointer-events': 'none',
                  },
                  // Amber top glow
                  ':after': {
                    content: '""',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    'border-radius': '2.5rem',
                    background: `radial-gradient(circle at 50% 0%, ${ORANGE_500_25}, transparent 55%)`,
                    'z-index': '1',
                    'pointer-events': 'none',
                    opacity: '0.75',
                  },
                  ':hover': {
                    'border-color': ORANGE_500_40,
                    transform: 'translateY(-4px)',
                    'box-shadow': `0 20px 40px -20px ${ORANGE_500_25}`,
                    ':after': {
                      opacity: '1',
                    },
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
                    'border-radius': '1.5rem',
                    overflow: 'hidden',
                    'background-color': SLATE_900_50,
                    border: `1px solid ${WHITE_05}`,
                    'margin-bottom': '1rem',
                    'z-index': '2',
                  },
                },
                title: {
                  color: '#ffffff',
                  'font-family':
                    FONT_DISPLAY,
                  'font-weight': '700',
                  'letter-spacing': '-0.02em',
                  'font-size': '20px',
                  'text-transform': 'uppercase',
                  'margin-top': '0.75rem',
                  'z-index': '2',
                  position: 'relative',
                  '@media (min-width: 1024px)': {
                    'font-size': '24px',
                  },
                },
                price: {
                  color: GOLD,
                  'font-family': FONT_SANS,
                  'font-size': '16px',
                  'font-weight': '700',
                  'margin-top': '0.25rem',
                  'margin-bottom': '0.75rem',
                  'z-index': '2',
                  position: 'relative',
                },
                compareAt: {
                  color: WHITE_55,
                  'text-decoration': 'line-through',
                  'margin-left': '0.5rem',
                },
                unitPrice: {
                  color: WHITE_55,
                },
                button: goldButtonStyles,
              },
              text: { button: 'Select options' },

            },
            productSet: {
              styles: {
                products: {
                  '@media (max-width: 639px)': {
                    display: 'flex',
                    'flex-wrap': 'nowrap',
                    'overflow-x': 'auto',
                    '-webkit-overflow-scrolling': 'touch',
                    'scrollbar-width': 'none',
                  },
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
                    FONT_DISPLAY,
                },
                price: {
                  color: GOLD,
                  'font-family': FONT_SANS,
                },
                button: goldButtonStyles,
              },
              text: { button: 'Add to cart' },
            },
            option: {
              styles: {
                label: {
                  color: '#ffffff',
                  'font-family': FONT_SANS,
                  'font-size': '11px',
                  'font-weight': '600',
                  'text-transform': 'uppercase',
                  'letter-spacing': '0.08em',
                  'margin-bottom': '4px',
                  'z-index': '2',
                  position: 'relative',
                },
                select: optionSelectStyles,
                wrapper: optionWrapperStyles,
              },
            },
            modal: {
              styles: {
                modal: {
                  'background-color': 'rgba(2, 6, 23, 0.94)',
                  'border-radius': '28px',
                  'max-width': '900px',
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

        // Inject extra overrides for SDK elements that don't expose style keys.
        if (containerRef.current) {
          injectIframeCss(containerRef.current);
          applyStockState(containerRef.current, () => setReady(true));
        }
      });
    }

    loadSdk().then(renderCollection);
  }, []);

  return (
    <div className="relative">
      {!ready && <CollectionSkeleton />}
      <div
        ref={containerRef}
        className="shopify-collection-wrapper"
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />
    </div>
  );
}

function CollectionSkeleton() {
  return (
    <div
      aria-hidden
      className="flex gap-4 overflow-hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="w-[280px] shrink-0 rounded-[2.5rem] border border-orange-500/20 bg-slate-950/80 p-6 sm:w-auto"
        >
          <div className="aspect-square w-full animate-pulse rounded-3xl bg-white/[0.06]" />
          <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-white/[0.08]" />
          <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-4 h-10 w-full animate-pulse rounded-full bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

