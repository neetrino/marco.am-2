import { logger } from '@/lib/utils/logger';
import { NextRequest, NextResponse } from "next/server";
import { toApiErrorResponse } from "@/lib/api/next-route-error";
import { authenticateToken, requireAdmin } from "@/lib/middleware/auth";
import { adminService } from "@/lib/services/admin.service";

/**
 * GET /api/v1/admin/dashboard/top-products
 * Get top products for admin dashboard
 */
export async function GET(req: NextRequest) {
  try {
    logger.debug("📊 [TOP-PRODUCTS] Request received");
    const user = await authenticateToken(req);
    
    if (!user || !requireAdmin(user)) {
      logger.debug("❌ [TOP-PRODUCTS] Unauthorized or not admin");
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/forbidden",
          title: "Forbidden",
          status: 403,
          detail: "Admin access required",
          instance: req.url,
        },
        { status: 403 }
      );
    }

    // Get limit from query params
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    logger.debug(`✅ [TOP-PRODUCTS] User authenticated: ${user.id}, limit: ${limit}`);
    const result = await adminService.getTopProducts(limit);
    logger.debug("✅ [TOP-PRODUCTS] Top products retrieved successfully");
    
    return NextResponse.json({ data: result });
  } catch (error: unknown) {
    console.error("❌ [TOP-PRODUCTS] Error:", error);
    return toApiErrorResponse(error, req.url);
  }
}


