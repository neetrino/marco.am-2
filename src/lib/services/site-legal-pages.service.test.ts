import { describe, expect, it } from "vitest";

import { normalizeLegalPageKey } from "@/lib/services/site-legal-pages.service";

describe("normalizeLegalPageKey", () => {
  it("accepts supported keys with trimming and lowercase normalization", () => {
    expect(normalizeLegalPageKey(" privacy ")).toBe("privacy");
    expect(normalizeLegalPageKey("TERMS")).toBe("terms");
    expect(normalizeLegalPageKey("refund")).toBe("refund");
    expect(normalizeLegalPageKey("delivery-policy")).toBe("delivery-policy");
  });

  it("maps compatibility aliases to canonical keys", () => {
    expect(normalizeLegalPageKey("refund-policy")).toBe("refund");
    expect(normalizeLegalPageKey("delivery-terms")).toBe("delivery-policy");
    expect(normalizeLegalPageKey("delivery")).toBe("delivery-policy");
  });

  it("returns null for unsupported keys", () => {
    expect(normalizeLegalPageKey("cookies")).toBeNull();
    expect(normalizeLegalPageKey("")).toBeNull();
  });
});
