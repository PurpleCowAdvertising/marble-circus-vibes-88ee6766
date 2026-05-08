#!/usr/bin/env node
/**
 * Regression check: folding sections on the home route must keep their
 * responsive safe-area utilities so they never overlap the About section.
 *
 * Run: node scripts/check-fold-spacing.mjs
 * Exits non-zero if any required class is missing.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const checks = [
  {
    file: "src/routes/index.tsx",
    required: [
      // About section must reserve bottom breathing room before the fold.
      { label: "About uses fold-safe-above", pattern: /text-foreground fold-safe-above/ },
      // Headliners (the folding section) must use the responsive fold-safe utility.
      { label: "Headliners uses fold-safe", pattern: /surface-light[^"]*\bfold-safe\b/ },
      // Carousel folds over hero with the strong variant.
      { label: "Carousel uses fold-safe-strong", pattern: /\bfold-safe-strong\b/ },
      // Stacking order (z-indexes) must remain monotonic so folds layer correctly.
      { label: "Carousel z-10", pattern: /z-10[^"]*fold-safe-strong/ },
      { label: "About z-20", pattern: /z-20[^"]*bg-orange-rich/ },
      { label: "Headliners z-30", pattern: /z-30[^"]*fold-safe/ },
      { label: "Sponsors z-40", pattern: /z-40[^"]*bg-orange-rich/ },
    ],
  },
  {
    file: "src/styles.css",
    required: [
      { label: ".fold-safe-above defined", pattern: /\.fold-safe-above\s*{[^}]*padding-bottom:\s*clamp\(/ },
      { label: ".fold-safe defined", pattern: /\.fold-safe\s*{[^}]*margin-top:\s*clamp\([^}]*padding-top:\s*clamp\(/s },
      { label: ".fold-safe-strong defined", pattern: /\.fold-safe-strong\s*{[^}]*margin-top:\s*clamp\([^}]*padding-top:\s*clamp\(/s },
    ],
  },
];

let failures = 0;
for (const { file, required } of checks) {
  const src = readFileSync(resolve(root, file), "utf8");
  for (const { label, pattern } of required) {
    if (!pattern.test(src)) {
      console.error(`✗ [${file}] ${label}`);
      failures++;
    } else {
      console.log(`✓ [${file}] ${label}`);
    }
  }
}

if (failures > 0) {
  console.error(`\nFold-spacing regression check FAILED (${failures} issue${failures === 1 ? "" : "s"}).`);
  console.error("Folding sections must keep their responsive safe-area utilities so they never overlap the About section.");
  process.exit(1);
}
console.log("\nFold-spacing regression check passed.");
