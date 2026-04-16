import { describe, expect, it } from "vitest";
import { checkoutTotalsService } from "./checkout-totals.service";

describe("checkoutTotalsService", () => {
  it("rejects guest with empty items", async () => {
    await expect(
      checkoutTotalsService.compute({
        locale: "en",
        shippingMethod: "pickup",
        guestItems: [],
      })
    ).rejects.toMatchObject({ status: 400 });
  });
});
