import { z } from "zod";

import {
  HOME_CUSTOMER_REVIEWS_MAX_ITEMS,
  HOME_CUSTOMER_REVIEWS_MAX_PHOTOS_PER_ITEM,
  HOME_CUSTOMER_REVIEWS_STORAGE_VERSION,
} from "@/lib/constants/home-customer-reviews";

const localeTripleSchema = z.object({
  en: z.string().max(2000),
  hy: z.string().max(2000),
  ru: z.string().max(2000),
});

const authorLocaleTripleSchema = z.object({
  en: z.string().max(120),
  hy: z.string().max(120),
  ru: z.string().max(120),
});

const photoUrlSchema = z.string().min(1).max(2048);

const itemSchema = z.object({
  id: z.string().min(1).max(64),
  rating: z.number().int().min(1).max(5),
  text: localeTripleSchema,
  authorName: authorLocaleTripleSchema,
  photoUrls: z
    .array(photoUrlSchema)
    .max(HOME_CUSTOMER_REVIEWS_MAX_PHOTOS_PER_ITEM),
  active: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});

export const homeCustomerReviewsStorageSchema = z.object({
  version: z.literal(HOME_CUSTOMER_REVIEWS_STORAGE_VERSION),
  sectionTitle: z.object({
    en: z.string().max(200),
    hy: z.string().max(200),
    ru: z.string().max(200),
  }),
  items: z.array(itemSchema).min(0).max(HOME_CUSTOMER_REVIEWS_MAX_ITEMS),
});

export type HomeCustomerReviewsStorage = z.infer<
  typeof homeCustomerReviewsStorageSchema
>;
