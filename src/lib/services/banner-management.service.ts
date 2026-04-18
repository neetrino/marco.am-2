import { db } from "@white-shop/db";

import {
  BANNER_MANAGEMENT_SETTINGS_KEY,
  type BannerSlotId,
} from "@/lib/constants/banner-management";
import {
  bannerManagementStorageSchema,
  type BannerManagementStorage,
} from "@/lib/schemas/banner-management.schema";
import { logger } from "@/lib/utils/logger";

type BannerLocale = "en" | "hy" | "ru";

export type PublicBannerItem = {
  id: string;
  slot: BannerSlotId;
  title: string;
  imageDesktopUrl: string | null;
  imageMobileUrl: string | null;
  link: {
    href: string;
    openInNewTab: boolean;
  };
  sortOrder: number;
};

export type PublicBannersPayload = {
  slot: BannerSlotId;
  generatedAt: string;
  items: PublicBannerItem[];
};

const DEFAULT_BANNER_STORAGE: BannerManagementStorage = {
  version: 1,
  banners: [],
};

function normalizeLocale(raw: string | undefined): BannerLocale {
  if (raw === "en" || raw === "hy" || raw === "ru") {
    return raw;
  }
  return "en";
}

function parseStored(raw: unknown): BannerManagementStorage | null {
  const parsed = bannerManagementStorageSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn("[bannerManagement] Invalid stored payload", parsed.error.flatten());
    return null;
  }
  return parsed.data;
}

async function loadStorage(): Promise<BannerManagementStorage> {
  const row = await db.settings.findUnique({
    where: { key: BANNER_MANAGEMENT_SETTINGS_KEY },
  });
  if (!row) {
    return DEFAULT_BANNER_STORAGE;
  }

  const valid = parseStored(row.value);
  return valid ?? DEFAULT_BANNER_STORAGE;
}

function isScheduledNow(
  startsAt: string | null,
  endsAt: string | null,
  nowMs: number,
): boolean {
  if (startsAt !== null) {
    const startsMs = Date.parse(startsAt);
    if (!Number.isFinite(startsMs) || startsMs > nowMs) {
      return false;
    }
  }

  if (endsAt !== null) {
    const endsMs = Date.parse(endsAt);
    if (!Number.isFinite(endsMs) || endsMs <= nowMs) {
      return false;
    }
  }

  return true;
}

export const bannerManagementService = {
  getDefaultStorage(): BannerManagementStorage {
    return DEFAULT_BANNER_STORAGE;
  },

  async getAdminStorage(): Promise<BannerManagementStorage> {
    return loadStorage();
  },

  async updateAdminStorage(
    payload: BannerManagementStorage,
  ): Promise<BannerManagementStorage> {
    const parsed = bannerManagementStorageSchema.parse(payload);

    await db.settings.upsert({
      where: { key: BANNER_MANAGEMENT_SETTINGS_KEY },
      update: {
        value: parsed as object,
        updatedAt: new Date(),
        description:
          "Admin-managed banners: slots, scheduling windows, and destination links",
      },
      create: {
        key: BANNER_MANAGEMENT_SETTINGS_KEY,
        value: parsed as object,
        description:
          "Admin-managed banners: slots, scheduling windows, and destination links",
      },
    });

    return parsed;
  },

  async getPublicSlotPayload(args: {
    slot: BannerSlotId;
    localeRaw: string | undefined;
    now?: Date;
  }): Promise<PublicBannersPayload> {
    const storage = await loadStorage();
    const locale = normalizeLocale(args.localeRaw);
    const now = args.now ?? new Date();
    const nowMs = now.getTime();

    const items = storage.banners
      .filter((banner) => banner.slot === args.slot)
      .filter((banner) => banner.active)
      .filter((banner) =>
        isScheduledNow(
          banner.schedule.startsAt,
          banner.schedule.endsAt,
          nowMs,
        ),
      )
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
      .map((banner) => ({
        id: banner.id,
        slot: banner.slot,
        title: banner.title[locale],
        imageDesktopUrl: banner.imageDesktopUrl,
        imageMobileUrl: banner.imageMobileUrl,
        link: {
          href: banner.link.href,
          openInNewTab: banner.link.openInNewTab,
        },
        sortOrder: banner.sortOrder,
      }));

    return {
      slot: args.slot,
      generatedAt: now.toISOString(),
      items,
    };
  },
};
