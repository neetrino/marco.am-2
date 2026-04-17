import { describe, expect, it } from "vitest";

import { isAllowedMapEmbedUrl } from "./site-footer.service";

describe("isAllowedMapEmbedUrl", () => {
  it("allows Google Maps embed HTTPS URLs", () => {
    expect(
      isAllowedMapEmbedUrl(
        "https://www.google.com/maps/embed?pb=abc",
      ),
    ).toBe(true);
  });

  it("rejects non-HTTPS", () => {
    expect(
      isAllowedMapEmbedUrl("http://www.google.com/maps/embed?pb=abc"),
    ).toBe(false);
  });

  it("rejects arbitrary hosts", () => {
    expect(isAllowedMapEmbedUrl("https://evil.com/embed")).toBe(false);
  });
});
