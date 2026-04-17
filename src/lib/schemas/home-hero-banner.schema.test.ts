import { describe, expect, it } from "vitest";
import { homeHeroBannerStorageSchema } from "./home-hero-banner.schema";

const minimalHeadline = {
  en: { emphasis: "A", accent: "B" },
  hy: { emphasis: "A", accent: "B" },
  ru: { emphasis: "A", accent: "B" },
};

describe("homeHeroBannerStorageSchema", () => {
  it("rejects javascript: href on CTA", () => {
    const parsed = homeHeroBannerStorageSchema.safeParse({
      version: 1,
      headline: minimalHeadline,
      imageDesktopUrl: null,
      imageMobileUrl: null,
      ctas: [
        {
          id: "c1",
          label: { en: "x", hy: "x", ru: "x" },
          href: "javascript:alert(1)",
          active: true,
          sortOrder: 0,
        },
      ],
    });
    expect(parsed.success).toBe(false);
  });

  it("accepts relative href and sort order", () => {
    const parsed = homeHeroBannerStorageSchema.safeParse({
      version: 1,
      headline: minimalHeadline,
      imageDesktopUrl: null,
      imageMobileUrl: null,
      ctas: [
        {
          id: "c1",
          label: { en: "Shop", hy: "Գնել", ru: "Купить" },
          href: "/products",
          active: true,
          sortOrder: 10,
        },
      ],
    });
    expect(parsed.success).toBe(true);
  });
});
