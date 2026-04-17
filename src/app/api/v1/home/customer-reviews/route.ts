import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { homeCustomerReviewsService } from "@/lib/services/home-customer-reviews.service";
import { logger } from "@/lib/utils/logger";

/**
 * Public home customer reviews — carousel payload for one locale.
 * Query: `locale` — `en` | `hy` | `ru` (default `en`).
 */
export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") ?? "en";
    const payload = await homeCustomerReviewsService.getPublicPayload(locale);
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/home/customer-reviews failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
