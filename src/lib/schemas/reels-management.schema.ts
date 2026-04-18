import { z } from "zod";

import {
  REEL_MODERATION_STATUSES,
  REEL_SOURCE_TYPES,
  REELS_MANAGEMENT_MAX_ITEMS,
  REELS_MANAGEMENT_MODERATION_NOTE_MAX_LENGTH,
  REELS_MANAGEMENT_STORAGE_VERSION,
} from "@/lib/constants/reels-management";

const localeLabelSchema = z.object({
  en: z.string().max(160),
  hy: z.string().max(160),
  ru: z.string().max(160),
});

const urlSchema = z.string().min(1).max(2048);

function isHttpsUrl(raw: string): boolean {
  try {
    const value = new URL(raw);
    return value.protocol === "https:";
  } catch {
    return false;
  }
}

export const reelModerationStatusSchema = z.enum(REEL_MODERATION_STATUSES);

export const reelSourceTypeSchema = z.enum(REEL_SOURCE_TYPES);

const moderationSchema = z
  .object({
    status: reelModerationStatusSchema,
    note: z
      .union([z.string().max(REELS_MANAGEMENT_MODERATION_NOTE_MAX_LENGTH), z.null()])
      .optional(),
    moderatedAt: z.union([z.string().datetime({ offset: true }), z.null()]),
    moderatedBy: z.union([z.string().min(1).max(64), z.null()]),
  })
  .superRefine((value, ctx) => {
    if (value.status === "pending") {
      return;
    }

    if (value.moderatedAt === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "moderatedAt is required once moderation is finalized",
        path: ["moderatedAt"],
      });
    }
    if (value.moderatedBy === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "moderatedBy is required once moderation is finalized",
        path: ["moderatedBy"],
      });
    }
  });

export const reelItemSchema = z
  .object({
    id: z.string().min(1).max(64),
    title: localeLabelSchema,
    sourceType: reelSourceTypeSchema,
    videoUrl: urlSchema,
    posterUrl: z.union([urlSchema, z.null()]),
    active: z.boolean(),
    sortOrder: z.number().int().min(0).max(9999),
    moderation: moderationSchema,
  })
  .superRefine((value, ctx) => {
    if (value.sourceType === "external_url" && !isHttpsUrl(value.videoUrl)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "External reels must use an HTTPS video URL",
        path: ["videoUrl"],
      });
    }

    if (
      value.posterUrl !== null &&
      value.sourceType === "external_url" &&
      !isHttpsUrl(value.posterUrl) &&
      !value.posterUrl.startsWith("/")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "External reels posterUrl must be HTTPS or absolute local path",
        path: ["posterUrl"],
      });
    }
  });

export const reelsManagementStorageSchema = z.object({
  version: z.literal(REELS_MANAGEMENT_STORAGE_VERSION),
  items: z.array(reelItemSchema).max(REELS_MANAGEMENT_MAX_ITEMS),
});

export const reelsModerationPatchSchema = z.object({
  status: reelModerationStatusSchema,
  note: z
    .union([z.string().max(REELS_MANAGEMENT_MODERATION_NOTE_MAX_LENGTH), z.null()])
    .optional(),
});

export type ReelsManagementStorage = z.infer<typeof reelsManagementStorageSchema>;
export type ReelModerationPatch = z.infer<typeof reelsModerationPatchSchema>;
