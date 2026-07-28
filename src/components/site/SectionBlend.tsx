type SectionBlendProps = {
  /** Which edge of the parent section the blend sits on. */
  edge: "top" | "bottom";
  /** CSS color of the neighbouring section that should bleed across the seam. */
  color: string;
  /** Height of the blend band. */
  className?: string;
};

/**
 * Paints a soft gradient of the neighbouring section's colour across a section
 * boundary so the two background blocks dissolve into each other instead of
 * meeting at a hard horizontal line.
 *
 * Parent must be positioned (relative/isolate).
 */
export function SectionBlend({ edge, color, className = "" }: SectionBlendProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-0 ${
        edge === "top" ? "top-0" : "bottom-0"
      } h-24 md:h-40 ${className}`}
      style={{
        background: `linear-gradient(to ${edge === "top" ? "bottom" : "top"}, ${color} 0%, color-mix(in oklab, ${color} 55%, transparent) 38%, transparent 100%)`,
      }}
    />
  );
}
