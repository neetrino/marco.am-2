import type {
  SiteLegalPageKey,
  SiteLocale,
} from "@/lib/constants/site-legal-pages";

export type SiteLegalLocaleResolution = {
  readonly requestedLocale: string | null;
  readonly resolvedLocale: SiteLocale;
  readonly fallbackUsed: boolean;
};

export type SiteLegalPagePublicPayload = {
  readonly page: SiteLegalPageKey;
  readonly locale: SiteLocale;
  readonly i18n: SiteLegalLocaleResolution & {
    readonly availableLocales: readonly SiteLocale[];
  };
  readonly title: string;
  readonly summary: string;
  readonly contentHtml: string;
  readonly lastUpdatedIso: string;
};
