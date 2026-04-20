import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { normalizeLegalPageKey, siteLegalPagesService } from "@/lib/services/site-legal-pages.service";
import { logger } from "@/lib/utils/logger";

type RouteContext = {
  params: Promise<{ page: string }>;
};

/**
 * Public legal page document (privacy/terms/refund/delivery-policy) with locale fallback.
 * Locale order: `?locale=` -> `Accept-Language` -> `hy`.
 */
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const params = await context.params;
    const page = normalizeLegalPageKey(params.page);
    if (!page) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/not-found",
          title: "Not Found",
          status: 404,
          detail:
            "Legal page is not supported. Allowed: privacy, terms, refund, delivery-policy (aliases: refund-policy, delivery-terms)",
          instance: req.url,
        },
        { status: 404 },
      );
    }

    const payload = await siteLegalPagesService.getPublicPagePayload({
      page,
      localeRaw: req.nextUrl.searchParams.get("locale"),
      acceptLanguageRaw: req.headers.get("accept-language"),
    });
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/site-content/legal/[page] failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
