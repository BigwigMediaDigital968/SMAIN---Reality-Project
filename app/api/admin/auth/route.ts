import { NextRequest, NextResponse } from "next/server";
import {
  validateCredentials,
  generateStaticToken,
} from "@/app/lib/auth-middleware";

/**
 * POST /api/admin/auth
 * Body: { email: string; password: string }
 *
 * Returns { token } on success — client stores it and sends as
 * "Authorization: Bearer <token>" on all subsequent admin API calls.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (!validateCredentials(email.trim().toLowerCase(), password)) {
      // Intentionally vague — don't reveal which field is wrong
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    return NextResponse.json({ token: generateStaticToken() });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
