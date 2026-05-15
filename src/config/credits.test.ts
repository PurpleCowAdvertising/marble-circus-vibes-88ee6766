import { describe, it, expect } from "vitest";
import { SITE_CREDIT } from "./credits";

describe("SITE_CREDIT", () => {
  it("uses Title Case for 'Designed & Developed by'", () => {
    expect(SITE_CREDIT.prefix).toBe("Designed & Developed by");
    // Guard against future regressions to lowercase 'developed' or 'designed'
    expect(SITE_CREDIT.prefix).not.toMatch(/\bdeveloped\b/);
    expect(SITE_CREDIT.prefix).not.toMatch(/\bdesigned\b/);
  });

  it("points at the agency URL", () => {
    expect(SITE_CREDIT.url).toMatch(/^https:\/\//);
    expect(SITE_CREDIT.agency).toBe("Purple Cow Advertising");
  });
});
