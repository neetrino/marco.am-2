import { describe, expect, it } from "vitest";

import { siteFooterStorageSchema } from "./site-footer.schema";
import { HOME_SITE_FOOTER_STORAGE_VERSION } from "@/lib/constants/site-footer";

const minimalTriple = { en: "a", hy: "ա", ru: "б" };

describe("siteFooterStorageSchema", () => {
  it("accepts a valid full document", () => {
    const parsed = siteFooterStorageSchema.safeParse({
      version: HOME_SITE_FOOTER_STORAGE_VERSION,
      companyColumnTitle: minimalTriple,
      supportColumnTitle: minimalTriple,
      contactsColumnTitle: minimalTriple,
      contact: {
        address: minimalTriple,
        phoneDisplay: minimalTriple,
        phoneTel: "+37400000000",
        email: "a@b.co",
      },
      mapEmbed: { enabled: false },
      companyLinks: [],
      supportLinks: [],
      legalLinks: [],
      socialLinks: [
        {
          id: "s1",
          platform: "instagram",
          active: true,
          href: "https://example.com/x",
          sortOrder: 0,
        },
      ],
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects active social row without HTTPS URL", () => {
    const parsed = siteFooterStorageSchema.safeParse({
      version: HOME_SITE_FOOTER_STORAGE_VERSION,
      companyColumnTitle: minimalTriple,
      supportColumnTitle: minimalTriple,
      contactsColumnTitle: minimalTriple,
      contact: {
        address: minimalTriple,
        phoneDisplay: minimalTriple,
        phoneTel: "+37400000000",
        email: "a@b.co",
      },
      mapEmbed: { enabled: false },
      companyLinks: [],
      supportLinks: [],
      legalLinks: [],
      socialLinks: [
        {
          id: "s1",
          platform: "instagram",
          active: true,
          sortOrder: 0,
        },
      ],
    });
    expect(parsed.success).toBe(false);
  });
});
