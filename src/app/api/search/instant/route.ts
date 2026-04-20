import { NextRequest, NextResponse } from 'next/server';
import {
  parseInstantSearchRequest,
  searchInstant,
} from '@/lib/services/instant-search.service';
import { logger } from '@/lib/utils/logger';

/**
 * GET /api/search/instant
 * Query params:
 * - q (required)
 * - locale | lang (optional): hy | ru | en
 * Locale resolution: `?locale=` -> `?lang=` -> `Accept-Language` -> `hy`.
 * - limit (optional): product limit alias for backward compatibility
 * - productLimit (optional): products max count
 * - categoryLimit (optional): categories max count
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = parseInstantSearchRequest({
      searchParams,
      acceptLanguageRaw: req.headers.get("accept-language"),
    });
    const payload = await searchInstant(params);

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'no-store, must-revalidate' },
    });
  } catch (error: unknown) {
    logger.error('Instant search request failed', { error });
    return NextResponse.json(
      {
        error: 'Search failed',
        results: [],
        categories: [],
        suggestions: [],
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store, must-revalidate' },
      }
    );
  }
}
