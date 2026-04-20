import { z } from "zod";

import {
  SITE_LEGAL_PAGE_KEYS,
  SITE_LEGAL_PAGES_STORAGE_VERSION,
} from "@/lib/constants/site-legal-pages";
import { buildLocalizedTextMapSchema } from "@/lib/schemas/locale-map.schema";

const localeTripleSchema = buildLocalizedTextMapSchema({
  max: 5000,
  min: 1,
  trim: true,
});

const legalPageDocumentSchema = z.object({
  title: localeTripleSchema,
  summary: localeTripleSchema,
  contentHtml: localeTripleSchema,
  lastUpdatedIso: z.string().datetime(),
});

const legalPagesRecordSchema = z.object(
  Object.fromEntries(
    SITE_LEGAL_PAGE_KEYS.map((key) => [key, legalPageDocumentSchema]),
  ) as Record<
    (typeof SITE_LEGAL_PAGE_KEYS)[number],
    typeof legalPageDocumentSchema
  >,
);

export const siteLegalPagesStorageSchema = z.object({
  version: z.literal(SITE_LEGAL_PAGES_STORAGE_VERSION),
  pages: legalPagesRecordSchema,
});

export type SiteLegalPagesStorage = z.infer<typeof siteLegalPagesStorageSchema>;
