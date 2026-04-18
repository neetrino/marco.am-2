import { NextRequest, NextResponse } from "next/server";

import { toApiErrorResponse } from "@/lib/api/next-route-error";
import {
  i18nTranslationScopeSchema,
  updateI18nTranslationsPayloadSchema,
} from "@/lib/schemas/admin-i18n.schema";
import { authenticateToken, requireAdmin } from "@/lib/middleware/auth";
import { adminI18nService } from "@/lib/services/admin/admin-i18n.service";
import { logger } from "@/lib/utils/logger";

function buildForbiddenResponse(req: NextRequest): NextResponse {
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

/**
 * GET /api/v1/supersudo/i18n/translations
 * - without query `scope`: list available scopes and translation-entry counts.
 * - with query `scope`: export flattened localized entries for that scope.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    if (!user || !requireAdmin(user)) {
      return buildForbiddenResponse(req);
    }

    const url = new URL(req.url);
    const scopeRaw = url.searchParams.get("scope");
    if (!scopeRaw) {
      const scopes = await adminI18nService.listScopes();
      return NextResponse.json({ scopes });
    }

    const parsedScope = i18nTranslationScopeSchema.safeParse(scopeRaw);
    if (!parsedScope.success) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          status: 400,
          detail: "Invalid translation scope",
          instance: req.url,
          errors: parsedScope.error.flatten(),
        },
        { status: 400 },
      );
    }

    const payload = await adminI18nService.exportScope(parsedScope.data);
    return NextResponse.json(payload);
  } catch (error: unknown) {
    logger.error("GET /api/v1/supersudo/i18n/translations failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}

/**
 * PUT /api/v1/supersudo/i18n/translations
 * Import/edit translations by flattened entries.
 */
export async function PUT(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    if (!user || !requireAdmin(user)) {
      return buildForbiddenResponse(req);
    }

    const body: unknown = await req.json();
    const parsed = updateI18nTranslationsPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          status: 400,
          detail: "Invalid i18n import payload",
          instance: req.url,
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const result = await adminI18nService.importScope({
      scope: parsed.data.scope,
      entries: parsed.data.entries,
      strict: parsed.data.strict,
    });
    return NextResponse.json(result);
  } catch (error: unknown) {
    logger.error("PUT /api/v1/supersudo/i18n/translations failed", { error });
    return toApiErrorResponse(error, req.url);
  }
}
