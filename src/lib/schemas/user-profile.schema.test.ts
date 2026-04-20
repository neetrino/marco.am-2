import { describe, expect, it } from "vitest";
import { safeParseUpdateProfile } from "./user-profile.schema";

describe("safeParseUpdateProfile", () => {
  it("accepts valid email and optional fields", () => {
    const r = safeParseUpdateProfile({
      firstName: "A",
      lastName: "B",
      email: "a@b.co",
      phone: "+374000000",
    });
    expect(r.success).toBe(true);
  });

  it("rejects invalid email when non-empty", () => {
    const r = safeParseUpdateProfile({ email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("allows empty email string", () => {
    const r = safeParseUpdateProfile({ email: "" });
    expect(r.success).toBe(true);
  });
});
