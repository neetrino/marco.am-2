import { SUPPORTED_SITE_LOCALES, type SiteLocale } from "@/lib/constants/site-content";

export const SITE_LEGAL_PAGES_SETTINGS_KEY = "siteLegalPages";
export const SITE_LEGAL_PAGES_STORAGE_VERSION = 1;

export const SITE_LEGAL_PAGE_KEYS = [
  "privacy",
  "terms",
  "refund",
  "delivery-policy",
] as const;

export type SiteLegalPageKey = (typeof SITE_LEGAL_PAGE_KEYS)[number];

export { SUPPORTED_SITE_LOCALES };
export type { SiteLocale };
