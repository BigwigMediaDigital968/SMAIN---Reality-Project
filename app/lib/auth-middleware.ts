import { NextRequest, NextResponse } from "next/server";

/**
 * Static admin guard — no Firebase Auth required.
 *
 * The login page POSTs credentials, we compare against env vars,
 * and issue a static base64 token stored in localStorage.
 *
 * Token = base64(email:password) — lightweight, no JWT lib needed.
 * Swap in HttpOnly cookies + a real secret for stricter production security.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function buildToken(): string {
  return Buffer.from(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}`).toString("base64");
}

/** Validate raw credentials — used by POST /api/admin/auth */
export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

/** Return the static session token — handed back to the client on login */
export function generateStaticToken(): string {
  return buildToken();
}

/**
 * Route guard for all admin API handlers.
 * Expects:  Authorization: Bearer <static-token>
 *
 * Usage:
 *   const err = requireAdmin(req);   // sync — no await needed
 *   if (err) return err;
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || token !== buildToken()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // OK — continue to handler
}
