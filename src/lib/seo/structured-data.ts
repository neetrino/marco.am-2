import { getPublicAppUrl } from "@/lib/config/deployment-env";
import type { SiteLegalPageKey } from "@/lib/constants/site-legal-pages";
import type { SiteLocale } from "@/lib/constants/site-content";

type SeoRobots = {
  readonly index: boolean;
  readonly follow: boolean;
};

type AboutPageStructuredData = {
  readonly "@context": "https://schema.org";
  readonly "@type": "AboutPage";
  readonly inLanguage: string;
  readonly url: string;
  readonly name: string;
  readonly description: string;
};

type ContactPageStructuredData = {
  readonly "@context": "https://schema.org";
  readonly "@type": "ContactPage";
  readonly inLanguage: string;
  readonly url: string;
  readonly name: string;
  readonly description: string;
  readonly contactPoint: {
    readonly "@type": "ContactPoint";
    readonly telephone: string;
    readonly email: string;
    readonly contactType: "customer support";
    readonly areaServed: "AM";
  };
};

type CollectionPageStructuredData = {
  readonly "@context": "https://schema.org";
  readonly "@type": "CollectionPage";
  readonly inLanguage: string;
  readonly url: string;
  readonly name: string;
  readonly description: string;
  readonly mainEntity: {
    readonly "@type": "Brand";
    readonly name: string;
  };
};

type LegalPageStructuredData = {
  readonly "@context": "https://schema.org";
  readonly "@type": "WebPage";
  readonly inLanguage: string;
  readonly url: string;
  readonly name: string;
  readonly description: string;
  readonly dateModified: string;
};

export type SitePageStructuredData =
  | AboutPageStructuredData
  | ContactPageStructuredData
  | CollectionPageStructuredData
  | LegalPageStructuredData;

export type SitePageSeoMetadata = {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly canonicalUrl: string;
  readonly robots: SeoRobots;
  readonly structuredData: SitePageStructuredData;
};

const DEFAULT_ROBOTS: SeoRobots = {
  index: true,
  follow: true,
};

const LOCALE_TO_BCP47: Record<SiteLocale, string> = {
  hy: "hy-AM",
  ru: "ru-RU",
  en: "en-US",
};

const LEGAL_PAGE_TO_CANONICAL_PATH: Record<SiteLegalPageKey, string> = {
  privacy: "/privacy",
  terms: "/terms",
  refund: "/refund-policy",
  "delivery-policy": "/delivery-terms",
};

function toCanonicalUrl(pathname: string): string {
  return `${getPublicAppUrl()}${pathname}`;
}

function sanitizeText(raw: string): string {
  return raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function clampDescription(raw: string, maxLength: number = 160): string {
  const text = sanitizeText(raw);
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function titleWithSite(title: string): string {
  return `${title} | WhiteShop.am`;
}

export function buildAboutPageSeoMetadata(args: {
  readonly locale: SiteLocale;
  readonly title: string;
  readonly subtitle: string;
  readonly paragraph: string;
}): SitePageSeoMetadata {
  const canonicalPath = "/about";
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const description = clampDescription(`${args.subtitle}. ${args.paragraph}`);
  return {
    title: titleWithSite(args.title),
    description,
    canonicalPath,
    canonicalUrl,
    robots: DEFAULT_ROBOTS,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      inLanguage: LOCALE_TO_BCP47[args.locale],
      url: canonicalUrl,
      name: args.title,
      description,
    },
  };
}

export function buildContactPageSeoMetadata(args: {
  readonly locale: SiteLocale;
  readonly title: string;
  readonly description: string;
  readonly phoneTel: string;
  readonly email: string;
}): SitePageSeoMetadata {
  const canonicalPath = "/contact";
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const normalizedDescription = clampDescription(args.description);
  return {
    title: titleWithSite(args.title),
    description: normalizedDescription,
    canonicalPath,
    canonicalUrl,
    robots: DEFAULT_ROBOTS,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      inLanguage: LOCALE_TO_BCP47[args.locale],
      url: canonicalUrl,
      name: args.title,
      description: normalizedDescription,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: args.phoneTel,
        email: args.email,
        contactType: "customer support",
        areaServed: "AM",
      },
    },
  };
}

export function buildBrandPageSeoMetadata(args: {
  readonly locale: SiteLocale;
  readonly brandSlug: string;
  readonly brandName: string;
  readonly brandDescription: string;
}): SitePageSeoMetadata {
  const canonicalPath = `/brands/${encodeURIComponent(args.brandSlug)}`;
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const title = `${args.brandName} — Official brand page`;
  const description = clampDescription(args.brandDescription);
  return {
    title: titleWithSite(title),
    description,
    canonicalPath,
    canonicalUrl,
    robots: DEFAULT_ROBOTS,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      inLanguage: LOCALE_TO_BCP47[args.locale],
      url: canonicalUrl,
      name: title,
      description,
      mainEntity: {
        "@type": "Brand",
        name: args.brandName,
      },
    },
  };
}

export function buildLegalPageSeoMetadata(args: {
  readonly locale: SiteLocale;
  readonly page: SiteLegalPageKey;
  readonly title: string;
  readonly summary: string;
  readonly lastUpdatedIso: string;
}): SitePageSeoMetadata {
  const canonicalPath = LEGAL_PAGE_TO_CANONICAL_PATH[args.page];
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const description = clampDescription(args.summary);
  return {
    title: titleWithSite(args.title),
    description,
    canonicalPath,
    canonicalUrl,
    robots: DEFAULT_ROBOTS,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      inLanguage: LOCALE_TO_BCP47[args.locale],
      url: canonicalUrl,
      name: args.title,
      description,
      dateModified: args.lastUpdatedIso,
    },
  };
}
