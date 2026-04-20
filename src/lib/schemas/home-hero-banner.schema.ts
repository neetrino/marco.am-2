import { z } from "zod";
import { HOME_HERO_BANNER_VERSION } from "@/lib/constants/home-hero-banner";

const localeHeadlineSchema = z.object({
  emphasis: z.string().max(200),
  accent: z.string().max(200),
});

function isAllowedHref(raw: string): boolean {
  const h = raw.trim();
  if (h.length === 0) return false;
  const lower = h.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:")) return false;
  return (
    h.startsWith("/") ||
    h.startsWith("#") ||
    /^https?:\/\//i.test(h) ||
    lower.startsWith("mailto:")
  );
}

const ctaSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.object({
    en: z.string().max(120),
    hy: z.string().max(120),
    ru: z.string().max(120),
  }),
  href: z
    .string()
    .min(1)
    .max(2048)
    .refine(isAllowedHref, "Invalid or unsafe href"),
  active: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});

export const homeHeroBannerStorageSchema = z.object({
  version: z.literal(HOME_HERO_BANNER_VERSION),
  headline: z.object({
    en: localeHeadlineSchema,
    hy: localeHeadlineSchema,
    ru: localeHeadlineSchema,
  }),
  imageDesktopUrl: z.union([z.string().max(2048), z.null()]),
  imageMobileUrl: z.union([z.string().max(2048), z.null()]),
  ctas: z.array(ctaSchema).max(20),
});

export type HomeHeroBannerStorage = z.infer<typeof homeHeroBannerStorageSchema>;
