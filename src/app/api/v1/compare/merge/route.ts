import { NextRequest, NextResponse } from "next/server";
import { toApiErrorResponse } from "@/lib/api/next-route-error";
import {
  clearCompareSessionCookie,
  readCompareSessionToken,
} from "@/lib/api/compare-session-cookie";
import { authenticateToken } from "@/lib/middleware/auth";
import { mergeGuestCompareIntoUser } from "@/lib/services/compare-merge.service";
import { logger } from "@/lib/utils/logger";

/**
 * POST — attach guest compare list (cookie / `x-compare-session`) to the authenticated user.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    if (!user) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/unauthorized",
          title: "Unauthorized",
          status: 401,
          detail: "Authentication token required",
          instance: req.url,
        },
        { status: 401 }
      );
    }

    const sessionToken = readCompareSessionToken(req);
    const result = await mergeGuestCompareIntoUser(sessionToken, user.id);
    const res = NextResponse.json({
      mergedItems: result.mergedItems,
      guestCompareFound: result.guestCompareFound,
    });

    if (sessionToken) {
      clearCompareSessionCookie(res);
    }

    return res;
  } catch (error: unknown) {
    logger.error("Compare merge failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
