import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { siteFooterService } from "@/lib/services/site-footer.service";
import { logger } from "@/lib/utils/logger";

/**
 * Public site footer — contact, social (HTTPS URLs), optional map embed, nav + legal links for one locale.
 * Query: `locale` — `en` | `hy` | `ru` (default `en`).
 */
export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") ?? "en";
    const payload = await siteFooterService.getPublicPayload(locale);
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/home/footer failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
