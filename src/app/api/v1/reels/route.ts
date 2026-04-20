import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { authenticateToken } from "@/lib/middleware/auth";
import { reelsPublicPayloadSchema } from "@/lib/schemas/reels-management.schema";
import { reelsLikesService } from "@/lib/services/reels-likes.service";
import { reelsManagementService } from "@/lib/services/reels-management.service";
import { logger } from "@/lib/utils/logger";

/**
 * GET /api/v1/reels?locale=<hy|ru|en>
 * Locale resolution: `?locale=` -> `?lang=` -> `Accept-Language` -> `hy`.
 * Public reels feed payload (approved + active only).
 */
export async function GET(req: NextRequest) {
  try {
    const locale =
      req.nextUrl.searchParams.get("locale") ??
      req.nextUrl.searchParams.get("lang");
    const user = await authenticateToken(req);
    const payload = await reelsManagementService.getPublicPayload({
      localeRaw: locale ?? undefined,
      acceptLanguageRaw: req.headers.get("accept-language"),
    });
    const snapshot = await reelsLikesService.getLikesSnapshot({
      reelIds: payload.items.map((item) => item.id),
      viewerUserId: user?.id,
    });
    const response = reelsPublicPayloadSchema.parse({
      ...payload,
      viewer: {
        likedReelsCount: snapshot.viewerLikedReelsCount,
      },
      items: payload.items.map((item) => ({
        ...item,
        likesCount: snapshot.likesByReelId[item.id] ?? 0,
        likedByCurrentUser: snapshot.viewerLikedReelIds.has(item.id),
      })),
    });
    return NextResponse.json(response);
  } catch (error: unknown) {
    logger.error("GET /api/v1/reels failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
