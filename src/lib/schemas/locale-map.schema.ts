import { z } from "zod";

import { SUPPORTED_API_LOCALES } from "@/lib/i18n/api-locale";

export const apiLocaleSchema = z.enum(SUPPORTED_API_LOCALES);

export function buildLocalizedTextMapSchema(args: {
  max: number;
  min?: number;
  trim?: boolean;
}) {
  const min = args.min ?? 0;
  const base = args.trim ? z.string().trim() : z.string();
  const field = min > 0 ? base.min(min).max(args.max) : base.max(args.max);

  return z.object({
    hy: field,
    ru: field,
    en: field,
  });
}
