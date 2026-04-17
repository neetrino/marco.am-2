import { NextRequest, NextResponse } from "next/server";
import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { homeHeroBannerService } from "@/lib/services/home-hero-banner.service";
import { logger } from "@/lib/utils/logger";

/**
 * Public home hero — headline copy, background image URLs, active CTAs (sorted) for one locale.
 * Query: `locale` — `en` | `hy` | `ru` (default `en`).
 */
export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") ?? "en";
    const payload = await homeHeroBannerService.getPublicPayload(locale);
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/home/hero failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
