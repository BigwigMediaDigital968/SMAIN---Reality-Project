import { createLead } from "@/app/lib/db";
import { LeadFormData } from "@/app/types/leads";
import { NextRequest, NextResponse } from "next/server";

// ── POST /api/leads ──────────────────────────────────────────────────────────
// Public endpoint called by the website contact / lead form.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const required: (keyof LeadFormData)[] = ["name", "email", "phone"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Field "${field}" is required.` },
          { status: 400 },
        );
      }
    }

    // Email format check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    const formData: LeadFormData = {
      inquiry: body.inquiry || "general",
      region: body.region || "",
      name: String(body.name).trim(),
      location: body.location || "",
      phone: String(body.phone).trim(),
      email: String(body.email).trim().toLowerCase(),
      description: body.description || "",
      newsletter: Boolean(body.newsletter),
    };

    const id = await createLead(formData, "website");

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/leads]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
