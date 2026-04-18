import { NextRequest, NextResponse } from "next/server";
import {
  COMPARE_SESSION_COOKIE_NAME,
  COMPARE_SESSION_HEADER_NAME,
  COMPARE_SESSION_MAX_AGE_SECONDS,
} from "@/lib/constants/compare-session";

/**
 * Guest compare session token: header wins over cookie (explicit client override).
 */
export function readCompareSessionToken(req: NextRequest): string | undefined {
  const header = req.headers.get(COMPARE_SESSION_HEADER_NAME)?.trim();
  if (header) {
    return header;
  }
  return req.cookies.get(COMPARE_SESSION_COOKIE_NAME)?.value ?? undefined;
}

export function applyCompareSessionCookie(
  res: NextResponse,
  sessionToken: string
): void {
  res.cookies.set(COMPARE_SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COMPARE_SESSION_MAX_AGE_SECONDS,
  });
}

export function clearCompareSessionCookie(res: NextResponse): void {
  res.cookies.set(COMPARE_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
