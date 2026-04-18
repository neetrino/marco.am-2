import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { authenticateToken } from "@/lib/middleware/auth";
import { reelsLikesService } from "@/lib/services/reels-likes.service";
import { logger } from "@/lib/utils/logger";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function unauthorizedResponse(req: NextRequest): NextResponse {
  return NextResponse.json(
    {
      type: "https://api.shop.am/problems/unauthorized",
      title: "Unauthorized",
      status: 401,
      detail: "Authentication required",
      instance: req.url,
    },
    { status: 401 },
  );
}

/**
 * POST /api/v1/reels/{id}/like
 * Requires JWT user. Creates like if it does not exist.
 */
export async function POST(req: NextRequest, ctx: RouteContext) {
  try {
    const user = await authenticateToken(req);
    if (!user) {
      return unauthorizedResponse(req);
    }

    const { id } = await ctx.params;
    const payload = await reelsLikesService.setUserLike({
      reelId: id,
      userId: user.id,
      liked: true,
    });
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("POST /api/v1/reels/[id]/like failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}

/**
 * DELETE /api/v1/reels/{id}/like
 * Requires JWT user. Removes like if it exists.
 */
export async function DELETE(req: NextRequest, ctx: RouteContext) {
  try {
    const user = await authenticateToken(req);
    if (!user) {
      return unauthorizedResponse(req);
    }

    const { id } = await ctx.params;
    const payload = await reelsLikesService.setUserLike({
      reelId: id,
      userId: user.id,
      liked: false,
    });
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("DELETE /api/v1/reels/[id]/like failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
