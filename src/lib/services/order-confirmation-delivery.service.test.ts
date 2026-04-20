import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { deliverOrderConfirmation } from "./order-confirmation-delivery.service";

const ORIGINAL_ENV = { ...process.env };

describe("deliverOrderConfirmation", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns skipped statuses when contacts are missing", async () => {
    const result = await deliverOrderConfirmation({
      orderNumber: "240417-ABC123",
      total: 10000,
      currency: "AMD",
    });

    expect(result.email.status).toBe("skipped");
    expect(result.email.detail).toBe("email_missing");
    expect(result.sms.status).toBe("skipped");
    expect(result.sms.detail).toBe("phone_missing");
  });

  it("sends email via Resend when configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_FROM_EMAIL = "shop@example.com";
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await deliverOrderConfirmation({
      orderNumber: "240417-ABC123",
      total: 10000,
      currency: "AMD",
      customerEmail: "customer@example.com",
      customerPhone: "+37499123456",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.email.status).toBe("sent");
    expect(result.sms.status).toBe("skipped");
    expect(result.sms.detail).toBe("sms_provider_not_configured");
  });

  it("returns failed email status when provider responds with error", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_FROM_EMAIL = "shop@example.com";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => "internal error",
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await deliverOrderConfirmation({
      orderNumber: "240417-ABC123",
      total: 10000,
      currency: "AMD",
      customerEmail: "customer@example.com",
    });

    expect(result.email.status).toBe("failed");
    expect(result.email.detail).toBe("email_provider_error");
  });
});
