import { db } from "@white-shop/db";

import {
  SITE_LEGAL_PAGE_KEYS,
  SITE_LEGAL_PAGES_SETTINGS_KEY,
  SUPPORTED_SITE_LOCALES,
  type SiteLegalPageKey,
  type SiteLocale,
} from "@/lib/constants/site-legal-pages";
import { SITE_LEGAL_PAGES_DEFAULT_STORAGE } from "@/lib/constants/site-legal-pages.defaults";
import {
  siteLegalPagesStorageSchema,
  type SiteLegalPagesStorage,
} from "@/lib/schemas/site-legal-pages.schema";
import { resolveApiLocale } from "@/lib/i18n/api-locale";
import type {
  SiteLegalLocaleResolution,
  SiteLegalPagePublicPayload,
} from "@/lib/types/site-legal-pages";
import { logger } from "@/lib/utils/logger";

type LocalizedMap = SiteLegalPagesStorage["pages"]["privacy"]["title"];

function normalizeLocale(
  localeRaw: string | null,
  acceptLanguageRaw: string | null,
): SiteLegalLocaleResolution {
  const locale = resolveApiLocale({
    localeRaw,
    acceptLanguageRaw,
    fallbackLocale: "hy",
  });
  return {
    requestedLocale: locale.requestedLocale,
    resolvedLocale: locale.resolvedLocale,
    fallbackUsed: locale.fallbackUsed,
  };
}

function parseStored(raw: unknown): SiteLegalPagesStorage | null {
  const parsed = siteLegalPagesStorageSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn("[siteLegalPages] Invalid stored payload", parsed.error.flatten());
    return null;
  }
  return parsed.data;
}

function pickLocalized(value: LocalizedMap, locale: SiteLocale): string {
  return value[locale];
}

async function loadStorage(): Promise<SiteLegalPagesStorage> {
  const row = await db.settings.findUnique({
    where: { key: SITE_LEGAL_PAGES_SETTINGS_KEY },
  });
  if (!row) {
    return SITE_LEGAL_PAGES_DEFAULT_STORAGE;
  }
  return parseStored(row.value) ?? SITE_LEGAL_PAGES_DEFAULT_STORAGE;
}

const LEGAL_PAGE_ALIASES: Record<string, SiteLegalPageKey> = {
  "refund-policy": "refund",
  "delivery-terms": "delivery-policy",
  delivery: "delivery-policy",
};

export function normalizeLegalPageKey(raw: string): SiteLegalPageKey | null {
  const normalized = raw.trim().toLowerCase();
  const canonical = LEGAL_PAGE_ALIASES[normalized] ?? normalized;
  return SITE_LEGAL_PAGE_KEYS.find((key) => key === canonical) ?? null;
}

export const siteLegalPagesService = {
  async getPublicPagePayload(args: {
    readonly page: SiteLegalPageKey;
    readonly localeRaw: string | null;
    readonly acceptLanguageRaw: string | null;
  }): Promise<SiteLegalPagePublicPayload> {
    const localeResolution = normalizeLocale(args.localeRaw, args.acceptLanguageRaw);
    const storage = await loadStorage();
    const page = storage.pages[args.page];
    return {
      page: args.page,
      locale: localeResolution.resolvedLocale,
      i18n: {
        ...localeResolution,
        availableLocales: SUPPORTED_SITE_LOCALES,
      },
      title: pickLocalized(page.title, localeResolution.resolvedLocale),
      summary: pickLocalized(page.summary, localeResolution.resolvedLocale),
      contentHtml: pickLocalized(page.contentHtml, localeResolution.resolvedLocale),
      lastUpdatedIso: page.lastUpdatedIso,
    };
  },

  async getAdminStorage(): Promise<SiteLegalPagesStorage> {
    return loadStorage();
  },

  async updateAdminStorage(
    payload: SiteLegalPagesStorage,
  ): Promise<SiteLegalPagesStorage> {
    const parsed = siteLegalPagesStorageSchema.parse(payload);
    await db.settings.upsert({
      where: { key: SITE_LEGAL_PAGES_SETTINGS_KEY },
      update: {
        value: parsed as object,
        updatedAt: new Date(),
        description:
          "Legal pages — Privacy, Terms, Refund, Delivery Policy (per-locale CMS/static API document)",
      },
      create: {
        key: SITE_LEGAL_PAGES_SETTINGS_KEY,
        value: parsed as object,
        description:
          "Legal pages — Privacy, Terms, Refund, Delivery Policy (per-locale CMS/static API document)",
      },
    });
    return parsed;
  },
};
