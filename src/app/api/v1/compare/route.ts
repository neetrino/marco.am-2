import { NextRequest, NextResponse } from "next/server";
import { toApiErrorResponse } from "@/lib/api/next-route-error";
import {
  applyCompareSessionCookie,
  readCompareSessionToken,
} from "@/lib/api/compare-session-cookie";
import { authenticateToken } from "@/lib/middleware/auth";
import { compareAddBodySchema } from "@/lib/schemas/compare-body.schema";
import {
  addCompareItemForGuest,
  addCompareItemForUser,
  getCompareForGuest,
  getCompareForUser,
} from "@/lib/services/compare.service";
import { logger } from "@/lib/utils/logger";

function resolveApiLocale(req: NextRequest): string {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang")?.trim();
  if (lang === "hy" || lang === "ru" || lang === "en") {
    return lang;
  }

  const acceptLanguage = req.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.trim()
    .split("-")[0];
  if (acceptLanguage === "hy" || acceptLanguage === "ru" || acceptLanguage === "en") {
    return acceptLanguage;
  }

  return "en";
}

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    const locale = user?.locale ?? resolveApiLocale(req);

    if (user) {
      const payload = await getCompareForUser(user.id, locale);
      return NextResponse.json(payload);
    }

    const sessionToken = readCompareSessionToken(req);
    const { payload, sessionToken: token } = await getCompareForGuest(
      sessionToken,
      locale
    );
    const res = NextResponse.json(payload);
    applyCompareSessionCookie(res, token);
    return res;
  } catch (error: unknown) {
    logger.error("Compare GET failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    const raw: unknown = await req.json();
    const parsed = compareAddBodySchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation failed",
          status: 400,
          detail: parsed.error.message,
          instance: req.url,
        },
        { status: 400 }
      );
    }

    const { productId } = parsed.data;
    const locale = user?.locale ?? resolveApiLocale(req);

    if (user) {
      const payload = await addCompareItemForUser(user.id, productId, locale);
      return NextResponse.json(payload, { status: 201 });
    }

    const sessionToken = readCompareSessionToken(req);
    const { payload, sessionToken: token } = await addCompareItemForGuest(
      sessionToken,
      productId,
      locale
    );
    const res = NextResponse.json(payload, { status: 201 });
    applyCompareSessionCookie(res, token);
    return res;
  } catch (error: unknown) {
    logger.error("Compare POST failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
