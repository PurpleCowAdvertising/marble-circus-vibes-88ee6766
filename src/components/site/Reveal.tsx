import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { useRouterState } from "@tanstack/react-router";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 600;

/** matchMedia is evaluated once per page, not once per Reveal instance. */
let cachedReduced: boolean | null = null;
let cachedLite: boolean | null = null;
let cachedLowEnd: boolean | null = null;

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (cachedReduced === null) {
    cachedReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return cachedReduced;
}

/** Small / touch screens: skip blur filters, they are costly to composite. */
function isLiteDevice() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (cachedLite === null) {
    cachedLite = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  }
  return cachedLite;
}

/**
 * Weak hardware: few cores or little RAM. These devices drop frames on any
 * filter animation, so they get a plain opacity fade and no grain at all.
 */
function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  if (cachedLowEnd === null) {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    cachedLowEnd = cores <= 4 || memory <= 4;
  }
  return cachedLowEnd;
}




/**
 * Observes an element once. Disconnects immediately on first intersection.
 * Never runs when the user prefers reduced motion.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setInView(true);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, inView]);

  return { ref, inView } as const;
}

const RevealContext = createContext<boolean | null>(null);

/** True inside another Reveal — nested reveals must not multiply opacity. */
const NestedRevealContext = createContext(false);

/**
 * One IntersectionObserver per section. Children read the trigger via context.
 */
export function RevealGroup({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  threshold?: number;
  rootMargin?: string;
} & Record<string, unknown>) {
  const { ref, inView } = useInView<HTMLElement>(threshold, rootMargin);

  return (
    <RevealContext.Provider value={inView}>
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    </RevealContext.Provider>
  );
}

/**
 * Blur-to-focus + opacity reveal. Default state is fully visible, so content
 * renders normally without JS and never gates images or interaction.
 *
 * Mobile (lite / touch devices): continuous scroll-linked opacity fade.
 * Elements fade in as they enter the viewport and fade out as they leave,
 * with no blur, grain or heavy filters to keep scrolling smooth.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  ...rest
}: {
  children?: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
} & Record<string, unknown>) {
  const groupInView = useContext(RevealContext);
  const nested = useContext(NestedRevealContext);
  const own = useInView<HTMLElement>(threshold, rootMargin);
  const inView = groupInView === null ? own.inView : groupInView;
  const isHome = useRouterState({ select: (state) => state.location.pathname === "/" });

  // "idle" = untouched (visible, no JS enhancement yet)
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Scroll-linked opacity only on the outermost Reveal, and never for
  // reduced-motion users (nested opacity multiplies and dims content).
  const [scrollLinked, setScrollLinked] = useState(false);
  const reduced = useRef(false);
  const lowEnd = useRef(false);
  const scrollRef = useScrollRatio<HTMLElement>(scrollLinked);

  useLayoutEffect(() => {
    reduced.current = prefersReducedMotion();
    const mobile = isLiteDevice();
    lowEnd.current = isLowEndDevice();
    setIsMobile(mobile);
    setScrollLinked(mobile && !reduced.current && !nested);
    if (reduced.current || mobile) return;
    setPhase("hidden");
  }, [nested]);

  const effectiveDelay = isMobile ? 0 : lowEnd.current ? 0 : Math.round(delay * 0.5);

  useEffect(() => {
    if (isMobile || phase !== "hidden" || !inView || reduced.current) return;
    setAnimating(true);
    const start = window.setTimeout(() => setPhase("shown"), effectiveDelay);
    const end = window.setTimeout(() => setAnimating(false), effectiveDelay + DURATION + 60);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [phase, inView, effectiveDelay, isMobile]);

  const hidden = phase === "hidden";
  const particles = false;

  const revealStyle: CSSProperties =
    isMobile || reduced.current
      ? {}
      : phase === "idle"
        ? {}
        : lowEnd.current
          ? {
              opacity: hidden ? 0 : 1,
              transition: `opacity ${DURATION}ms ${EASE}`,
              willChange: animating ? "opacity" : undefined,
            }
          : {
              opacity: hidden ? 0 : 1,
              filter: hidden ? "blur(6px)" : "blur(0px)",
              transition: `opacity ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}`,
              willChange: animating ? "opacity, filter" : undefined,
            };

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      own.ref.current = node;
      scrollRef.current = node;
    },
    [scrollRef],
  );

  return (
    <Tag
      ref={setRef}
      className={className}
      style={{ ...revealStyle, ...style }}
      onTransitionEnd={() => setAnimating(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function useScrollRatio<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const thresholds: number[] = [];
    for (let i = 0; i <= 20; i++) thresholds.push(i * 0.05);

    el.style.opacity = "0";
    el.style.transition = "opacity 150ms ease-out";

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          el.style.opacity = String(entry.intersectionRatio);
        }
      },
      { threshold: thresholds },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return ref;
}

