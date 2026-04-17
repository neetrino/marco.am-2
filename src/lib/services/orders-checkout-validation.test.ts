import { describe, expect, it } from "vitest";
import { validateCheckoutCustomer } from "./orders-checkout-validation";

const base = {
  email: "a@b.co",
  phone: "+37412345678",
  firstName: "A",
  lastName: "B",
};

describe("validateCheckoutCustomer", () => {
  it("returns normalized fields for pickup", () => {
    const r = validateCheckoutCustomer(
      { ...base, shippingMethod: "pickup" },
      "pickup"
    );
    expect(r.email).toBe("a@b.co");
    expect(r.phone).toBe("+37412345678");
    expect(r.firstName).toBe("A");
    expect(r.lastName).toBe("B");
    expect(r.notes).toBeNull();
  });

  it("requires courier address and city", () => {
    try {
      validateCheckoutCustomer(
        { ...base, shippingAddress: { address: "St", city: "" } },
        "courier"
      );
      expect.fail("expected throw");
    } catch (e: unknown) {
      expect((e as { detail?: string }).detail).toMatch(/Shipping address and city/);
    }
  });

  it("accepts courier with address alias", () => {
    const r = validateCheckoutCustomer(
      {
        ...base,
        shippingAddress: { address: "Main 1", city: "Yerevan" },
      },
      "courier"
    );
    expect(r.firstName).toBe("A");
  });

  it("rejects invalid phone", () => {
    try {
      validateCheckoutCustomer({ ...base, phone: "12" }, "pickup");
      expect.fail("expected throw");
    } catch (e: unknown) {
      expect((e as { detail?: string }).detail).toMatch(/Invalid phone/);
    }
  });

  it("rejects missing last name", () => {
    try {
      validateCheckoutCustomer({ ...base, lastName: "  " }, "pickup");
      expect.fail("expected throw");
    } catch (e: unknown) {
      expect((e as { detail?: string }).detail).toMatch(/First name and last name/);
    }
  });
});
