import { describe, expect, it } from "vitest";

import { SITE_LEGAL_PAGES_DEFAULT_STORAGE } from "@/lib/constants/site-legal-pages.defaults";
import { siteLegalPagesStorageSchema } from "@/lib/schemas/site-legal-pages.schema";

describe("siteLegalPagesStorageSchema", () => {
  it("accepts default storage", () => {
    const parsed = siteLegalPagesStorageSchema.safeParse(
      SITE_LEGAL_PAGES_DEFAULT_STORAGE,
    );
    expect(parsed.success).toBe(true);
  });

  it("rejects invalid datetime in legal page", () => {
    const candidate = {
      ...SITE_LEGAL_PAGES_DEFAULT_STORAGE,
      pages: {
        ...SITE_LEGAL_PAGES_DEFAULT_STORAGE.pages,
        privacy: {
          ...SITE_LEGAL_PAGES_DEFAULT_STORAGE.pages.privacy,
          lastUpdatedIso: "today",
        },
      },
    };
    const parsed = siteLegalPagesStorageSchema.safeParse(candidate);
    expect(parsed.success).toBe(false);
  });

  it("rejects empty localized strings", () => {
    const candidate = {
      ...SITE_LEGAL_PAGES_DEFAULT_STORAGE,
      pages: {
        ...SITE_LEGAL_PAGES_DEFAULT_STORAGE.pages,
        terms: {
          ...SITE_LEGAL_PAGES_DEFAULT_STORAGE.pages.terms,
          title: {
            ...SITE_LEGAL_PAGES_DEFAULT_STORAGE.pages.terms.title,
            en: "  ",
          },
        },
      },
    };
    const parsed = siteLegalPagesStorageSchema.safeParse(candidate);
    expect(parsed.success).toBe(false);
  });
});
