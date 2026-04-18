import { describe, expect, it } from "vitest";

import { reelsManagementStorageSchema } from "./reels-management.schema";

function buildValidPayload() {
  return {
    version: 1 as const,
    items: [
      {
        id: "reel-1",
        title: {
          en: "Reel One",
          hy: "Ռիլ Մեկ",
          ru: "Рил Один",
        },
        sourceType: "external_url" as const,
        videoUrl: "https://cdn.example.com/reels/one.mp4",
        posterUrl: "https://cdn.example.com/reels/one.jpg",
        active: true,
        sortOrder: 0,
        moderation: {
          status: "approved" as const,
          note: "Safe for feed",
          moderatedAt: "2026-04-18T10:00:00.000Z",
          moderatedBy: "admin-user-id",
        },
      },
    ],
  };
}

describe("reelsManagementStorageSchema", () => {
  it("rejects external reel when video URL is non-https", () => {
    const payload = buildValidPayload();
    payload.items[0].videoUrl = "http://cdn.example.com/reels/one.mp4";
    const parsed = reelsManagementStorageSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
  });

  it("rejects finalized moderation without moderator info", () => {
    const payload = buildValidPayload();
    payload.items[0].moderation.moderatedBy = null;
    const parsed = reelsManagementStorageSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
  });

  it("accepts valid external reel payload", () => {
    const parsed = reelsManagementStorageSchema.safeParse(buildValidPayload());
    expect(parsed.success).toBe(true);
  });
});
