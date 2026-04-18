import { describe, expect, it } from "vitest";

import { bannerManagementStorageSchema } from "./banner-management.schema";

function buildValidPayload() {
  return {
    version: 1 as const,
    banners: [
      {
        id: "hero-primary-1",
        slot: "home.hero.primary" as const,
        title: {
          en: "Shop now",
          hy: "Գնել հիմա",
          ru: "Купить сейчас",
        },
        imageDesktopUrl: "https://cdn.shop.am/banner-desktop.jpg",
        imageMobileUrl: "https://cdn.shop.am/banner-mobile.jpg",
        link: {
          href: "/products",
          openInNewTab: false,
        },
        schedule: {
          startsAt: "2026-04-18T10:00:00.000Z",
          endsAt: "2026-04-18T12:00:00.000Z",
        },
        active: true,
        sortOrder: 0,
      },
    ],
  };
}

describe("bannerManagementStorageSchema", () => {
  it("rejects unsafe javascript href", () => {
    const payload = buildValidPayload();
    payload.banners[0].link.href = "javascript:alert(1)";

    const parsed = bannerManagementStorageSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
  });

  it("rejects schedule where endsAt is before startsAt", () => {
    const payload = buildValidPayload();
    payload.banners[0].schedule.startsAt = "2026-04-18T12:00:00.000Z";
    payload.banners[0].schedule.endsAt = "2026-04-18T10:00:00.000Z";

    const parsed = bannerManagementStorageSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
  });

  it("accepts valid slot, schedule and safe link", () => {
    const parsed = bannerManagementStorageSchema.safeParse(buildValidPayload());
    expect(parsed.success).toBe(true);
  });
});
