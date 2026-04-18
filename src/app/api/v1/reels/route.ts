import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { reelsManagementService } from "@/lib/services/reels-management.service";
import { logger } from "@/lib/utils/logger";

/**
 * GET /api/v1/reels?locale=<en|hy|ru>
 * Public reels feed payload (approved + active only).
 */
export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") ?? "en";
    const payload = await reelsManagementService.getPublicPayload(locale);
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/reels failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
