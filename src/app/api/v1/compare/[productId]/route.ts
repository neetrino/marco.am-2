import { NextRequest, NextResponse } from "next/server";
import { toApiErrorResponse } from "@/lib/api/next-route-error";
import {
  applyCompareSessionCookie,
  readCompareSessionToken,
} from "@/lib/api/compare-session-cookie";
import { authenticateToken } from "@/lib/middleware/auth";
import {
  removeCompareItemForGuest,
  removeCompareItemForUser,
} from "@/lib/services/compare.service";
import { logger } from "@/lib/utils/logger";

function resolveApiLocale(req: NextRequest): string {
  const lang = new URL(req.url).searchParams.get("lang")?.trim();
  if (lang === "hy" || lang === "ru" || lang === "en") {
    return lang;
  }
  return "en";
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const user = await authenticateToken(req);
    const { productId } = await params;
    const locale = user?.locale ?? resolveApiLocale(req);

    if (user) {
      const payload = await removeCompareItemForUser(user.id, productId, locale);
      return NextResponse.json(payload);
    }

    const sessionToken = readCompareSessionToken(req);
    const { payload, sessionToken: token } = await removeCompareItemForGuest(
      sessionToken,
      productId,
      locale
    );
    const res = NextResponse.json(payload);
    applyCompareSessionCookie(res, token);
    return res;
  } catch (error: unknown) {
    logger.error("Compare DELETE failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
