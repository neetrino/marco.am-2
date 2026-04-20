import { describe, expect, it } from "vitest";
import { normalizeGuestCheckoutItemsInput } from "./checkout-guest-items.service";

describe("normalizeGuestCheckoutItemsInput", () => {
  it("merges duplicated variant rows into a single checkout line", () => {
    const normalized = normalizeGuestCheckoutItemsInput([
      { productId: "p-1", variantId: "v-1", quantity: 1 },
      { productId: "p-1", variantId: "v-1", quantity: 3 },
      { productId: "p-2", variantId: "v-2", quantity: 2 },
    ]);

    expect(normalized).toEqual([
      { productId: "p-1", variantId: "v-1", quantity: 4 },
      { productId: "p-2", variantId: "v-2", quantity: 2 },
    ]);
  });

  it("rejects non-integer and non-positive quantities", () => {
    for (const quantity of [0, -1, 1.2]) {
      try {
        normalizeGuestCheckoutItemsInput([
          { productId: "p-1", variantId: "v-1", quantity },
        ]);
        expect.fail("expected throw");
      } catch (error: unknown) {
        expect(error).toMatchObject({
          status: 400,
          title: "Validation Error",
          detail: "quantity must be a positive integer",
        });
      }
    }
  });

  it("rejects a variant linked to multiple product ids", () => {
    try {
      normalizeGuestCheckoutItemsInput([
        { productId: "p-1", variantId: "v-1", quantity: 1 },
        { productId: "p-2", variantId: "v-1", quantity: 1 },
      ]);
      expect.fail("expected throw");
    } catch (error: unknown) {
      expect(error).toMatchObject({
        status: 400,
        title: "Validation Error",
        detail: "Variant v-1 belongs to multiple productIds in payload",
      });
    }
  });
});
