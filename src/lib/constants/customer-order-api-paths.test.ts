import { describe, expect, it } from "vitest";
import {
  buildCustomerOrderLinks,
  customerOrderDetailPath,
  customerOrderReorderPath,
} from "./customer-order-api-paths";

describe("customerOrderDetailPath", () => {
  it("encodes order number for URL path segments", () => {
    expect(customerOrderDetailPath("26-04-16-ABC123")).toBe(
      "/api/v1/orders/26-04-16-ABC123"
    );
    expect(customerOrderDetailPath("weird/")).toBe("/api/v1/orders/weird%2F");
  });
});

describe("customerOrderReorderPath", () => {
  it("appends reorder segment", () => {
    expect(customerOrderReorderPath("ORD-1")).toBe(
      "/api/v1/orders/ORD-1/reorder"
    );
  });
});

describe("buildCustomerOrderLinks", () => {
  it("returns GET self and POST reorder", () => {
    const links = buildCustomerOrderLinks("ORD-1");
    expect(links.self).toEqual({
      method: "GET",
      href: "/api/v1/orders/ORD-1",
    });
    expect(links.reorder).toEqual({
      method: "POST",
      href: "/api/v1/orders/ORD-1/reorder",
    });
  });
});
