import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@white-shop/db", () => ({
  db: {
    settings: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
  },
}));

vi.mock("./reels-management.service", () => ({
  reelsManagementService: {
    getAdminStorage: vi.fn(),
  },
}));

import { db } from "@white-shop/db";

import { reelsLikesService } from "./reels-likes.service";
import { reelsManagementService } from "./reels-management.service";

const settingsFindUnique = db.settings.findUnique as unknown as ReturnType<typeof vi.fn>;
const settingsUpsert = db.settings.upsert as unknown as ReturnType<typeof vi.fn>;
const getAdminStorage = reelsManagementService.getAdminStorage as unknown as ReturnType<typeof vi.fn>;

describe("reelsLikesService", () => {
  beforeEach(() => {
    settingsFindUnique.mockReset();
    settingsUpsert.mockReset();
    getAdminStorage.mockReset();
    settingsUpsert.mockResolvedValue({});
  });

  it("returns like counts and viewer-specific like flags", async () => {
    settingsFindUnique.mockResolvedValue({
      value: {
        version: 1,
        items: [
          { reelId: "r1", userIds: ["u-1", "u-1", "u-2"] },
          { reelId: "r3", userIds: ["u-9"] },
        ],
      },
    });

    const snapshot = await reelsLikesService.getLikesSnapshot({
      reelIds: ["r1", "r2"],
      viewerUserId: "u-1",
    });

    expect(snapshot.likesByReelId.r1).toBe(2);
    expect(snapshot.likesByReelId.r2).toBe(0);
    expect(snapshot.viewerLikedReelIds.has("r1")).toBe(true);
    expect(snapshot.viewerLikedReelsCount).toBe(1);
    expect(settingsUpsert).not.toHaveBeenCalled();
  });

  it("creates like entry for available reel", async () => {
    getAdminStorage.mockResolvedValue({
      version: 1,
      items: [
        {
          id: "r1",
          active: true,
          moderation: { status: "approved" },
        },
      ],
    });
    settingsFindUnique.mockResolvedValue(null);

    const result = await reelsLikesService.setUserLike({
      reelId: "r1",
      userId: "u-5",
      liked: true,
    });

    expect(result).toEqual({
      reelId: "r1",
      likesCount: 1,
      likedByCurrentUser: true,
    });
    expect(settingsUpsert).toHaveBeenCalledOnce();
    expect(settingsUpsert.mock.calls[0]?.[0]?.update?.value).toEqual({
      version: 1,
      items: [{ reelId: "r1", userIds: ["u-5"] }],
    });
  });

  it("removes like entry when user unlikes", async () => {
    getAdminStorage.mockResolvedValue({
      version: 1,
      items: [
        {
          id: "r1",
          active: true,
          moderation: { status: "approved" },
        },
      ],
    });
    settingsFindUnique.mockResolvedValue({
      value: {
        version: 1,
        items: [{ reelId: "r1", userIds: ["u-5"] }],
      },
    });

    const result = await reelsLikesService.setUserLike({
      reelId: "r1",
      userId: "u-5",
      liked: false,
    });

    expect(result).toEqual({
      reelId: "r1",
      likesCount: 0,
      likedByCurrentUser: false,
    });
    expect(settingsUpsert).toHaveBeenCalledOnce();
    expect(settingsUpsert.mock.calls[0]?.[0]?.update?.value).toEqual({
      version: 1,
      items: [],
    });
  });

  it("rejects like when reel is not public and approved", async () => {
    getAdminStorage.mockResolvedValue({
      version: 1,
      items: [
        {
          id: "r1",
          active: false,
          moderation: { status: "approved" },
        },
      ],
    });

    await expect(
      reelsLikesService.setUserLike({
        reelId: "r1",
        userId: "u-5",
        liked: true,
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
    expect(settingsUpsert).not.toHaveBeenCalled();
  });
});
