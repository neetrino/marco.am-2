import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { authenticateToken, requireAdmin } from "@/lib/middleware/auth";
import { reelsModerationPatchSchema } from "@/lib/schemas/reels-management.schema";
import { reelsManagementService } from "@/lib/services/reels-management.service";
import { logger } from "@/lib/utils/logger";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * PATCH /api/v1/supersudo/reels/{id}/moderation
 * Body: { status: "pending" | "approved" | "rejected", note?: string | null }
 */
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  try {
    const user = await authenticateToken(req);
    if (!user || !requireAdmin(user)) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/forbidden",
          title: "Forbidden",
          status: 403,
          detail: "Admin access required",
          instance: req.url,
        },
        { status: 403 },
      );
    }

    const body: unknown = await req.json();
    const parsedBody = reelsModerationPatchSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          status: 400,
          detail: "Invalid moderation patch payload",
          instance: req.url,
          errors: parsedBody.error.flatten(),
        },
        { status: 400 },
      );
    }

    const params = await ctx.params;
    const saved = await reelsManagementService.patchModeration({
      reelId: params.id,
      patch: parsedBody.data,
      moderatorUserId: user.id,
    });
    return NextResponse.json(saved);
  } catch (error: unknown) {
    logger.error("PATCH /api/v1/supersudo/reels/[id]/moderation failed", {
      error,
    });
    return toApiErrorResponse(error, req.url);
  }
}
