import {
  createContext,
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

/** Fine-grain noise used for the mobile "particle dissolve" reveal. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";
const DURATION = 600;

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Small / touch screens: skip blur filters, they are costly to composite. */
function isLiteDevice() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
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
  const own = useInView<HTMLElement>(threshold, rootMargin);
  const inView = groupInView === null ? own.inView : groupInView;
  const isHome = useRouterState({ select: (state) => state.location.pathname === "/" });

  // "idle" = untouched (visible, no JS enhancement yet)
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");
  const [animating, setAnimating] = useState(false);
  const reduced = useRef(false);
  // Blur filters are expensive to composite on phones — opacity only there.
  const lite = useRef(false);

  useLayoutEffect(() => {
    reduced.current = prefersReducedMotion();
    lite.current = isLiteDevice();
    if (reduced.current) return;
    setPhase("hidden");
  }, []);

  const effectiveDelay = lite.current ? Math.round(delay * 0.5) : delay;

  useEffect(() => {
    if (phase !== "hidden" || !inView || reduced.current) return;
    setAnimating(true);
    const start = window.setTimeout(() => setPhase("shown"), effectiveDelay);
    const end = window.setTimeout(() => setAnimating(false), effectiveDelay + DURATION + 60);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [phase, inView, effectiveDelay]);

  const hidden = phase === "hidden";
  const particles = lite.current && isHome;

  const revealStyle: CSSProperties =
    phase === "idle"
      ? {}
      : particles
        ? {
            position: "relative",
            opacity: hidden ? 0 : 1,
            filter: hidden ? "blur(5px)" : "blur(0px)",
            transition: `opacity ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}`,
            willChange: animating ? "opacity, filter" : undefined,
          }
        : lite.current
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

  const grainStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    backgroundImage: GRAIN,
    backgroundSize: "140px 140px",
    mixBlendMode: "screen",
    opacity: hidden ? 0.45 : 0,
    transition: `opacity ${DURATION}ms ${EASE}`,
    willChange: animating ? "opacity" : undefined,
  };

  return (
    <Tag
      ref={groupInView === null ? own.ref : undefined}
      className={className}
      style={{ ...revealStyle, ...style }}
      onTransitionEnd={() => setAnimating(false)}
      {...rest}
    >
      {children}
      {particles && animating ? <span aria-hidden="true" style={grainStyle} /> : null}
    </Tag>
  );
}

