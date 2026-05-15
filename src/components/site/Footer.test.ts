import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { SITE_CREDIT } from "@/config/credits";

const footerSrc = readFileSync(
  path.resolve(__dirname, "Footer.tsx"),
  "utf8",
);

describe("Footer credit rendering", () => {
  it("renders credit text from the SITE_CREDIT constant (no hard-coded duplicate)", () => {
    // The Footer must consume the shared constant so capitalization can't drift.
    expect(footerSrc).toMatch(/\{SITE_CREDIT\.prefix\}/);
    expect(footerSrc).toMatch(/\{SITE_CREDIT\.agency\}/);
    expect(footerSrc).toMatch(/\{SITE_CREDIT\.url\}/);

    // Guard against anyone re-introducing a hard-coded credit line in any case.
    expect(footerSrc).not.toMatch(/Designed\s+&\s+[Dd]eveloped\s+by(?![^<]*\})/);
  });

  it("uses Title Case capitalization (covers every breakpoint — no responsive variants exist)", () => {
    expect(SITE_CREDIT.prefix).toBe("Designed & Developed by");
  });

  it("does not contain responsive class variants that would change credit text per breakpoint", () => {
    // If someone ever adds something like `md:hidden` to the credit line, this fails.
    const creditLine = footerSrc
      .split("\n")
      .find((l) => l.includes("SITE_CREDIT.prefix"));
    expect(creditLine, "credit line not found").toBeDefined();
    expect(creditLine!).not.toMatch(/\b(sm|md|lg|xl|2xl):hidden\b/);
    expect(creditLine!).not.toMatch(/\b(sm|md|lg|xl|2xl):block\b/);
  });
});
