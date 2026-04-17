import { describe, expect, it } from "vitest";

import { buildCustomerIdentityKey } from "./customer-identity";

describe("buildCustomerIdentityKey", () => {
  it("prefers userId over email", () => {
    expect(buildCustomerIdentityKey("u1", "a@b.com")).toBe("user:u1");
  });

  it("uses normalized email for guests", () => {
    expect(buildCustomerIdentityKey(null, "  Test@EXAMPLE.com  ")).toBe(
      "email:test@example.com"
    );
  });

  it("returns null when neither identity is present", () => {
    expect(buildCustomerIdentityKey(null, null)).toBe(null);
    expect(buildCustomerIdentityKey(undefined, "   ")).toBe(null);
  });
});
