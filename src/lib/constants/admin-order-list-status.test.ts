import { describe, expect, it } from "vitest";
import {
  isAdminOrderListStatus,
  ADMIN_ORDER_LIST_STATUS_VALUES,
} from "./admin-order-list-status";

describe("isAdminOrderListStatus", () => {
  it("accepts canonical order status values", () => {
    for (const s of ADMIN_ORDER_LIST_STATUS_VALUES) {
      expect(isAdminOrderListStatus(s)).toBe(true);
    }
  });

  it("rejects unknown or empty strings", () => {
    expect(isAdminOrderListStatus("shipped")).toBe(false);
    expect(isAdminOrderListStatus("")).toBe(false);
  });
});
