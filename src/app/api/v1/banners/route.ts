import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import {
  BANNER_SLOT_IDS,
  type BannerSlotId,
} from "@/lib/constants/banner-management";
import { bannerManagementService } from "@/lib/services/banner-management.service";
import { logger } from "@/lib/utils/logger";

const slotSet = new Set<string>(BANNER_SLOT_IDS);
function isBannerSlotId(value: string): value is BannerSlotId {
  return slotSet.has(value);
}

/**
 * GET /api/v1/banners?slot=<slotId>&locale=<en|hy|ru>[&at=<ISO8601>]
 * Public endpoint returning active/scheduled banners for one slot.
 */
export async function GET(req: NextRequest) {
  try {
    const slotRaw = req.nextUrl.searchParams.get("slot");
    if (slotRaw === null || !isBannerSlotId(slotRaw)) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          status: 400,
          detail: `Invalid slot. Allowed: ${BANNER_SLOT_IDS.join(", ")}`,
          instance: req.url,
        },
        { status: 400 },
      );
    }

    const locale = req.nextUrl.searchParams.get("locale") ?? "en";
    const atRaw = req.nextUrl.searchParams.get("at");
    let atDate: Date | undefined = undefined;
    if (atRaw !== null) {
      const parsedAt = new Date(atRaw);
      if (Number.isNaN(parsedAt.getTime())) {
        return NextResponse.json(
          {
            type: "https://api.shop.am/problems/validation-error",
            title: "Validation Error",
            status: 400,
            detail: "Invalid at datetime. Use ISO8601 format.",
            instance: req.url,
          },
          { status: 400 },
        );
      }
      atDate = parsedAt;
    }

    const payload = await bannerManagementService.getPublicSlotPayload({
      slot: slotRaw,
      localeRaw: locale,
      now: atDate,
    });

    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/banners failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
