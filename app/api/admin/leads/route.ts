import { requireAdmin } from "@/app/lib/auth-middleware";
import {
  bulkDeleteLeads,
  bulkUpdateStatus,
  deleteLead,
  getLeads,
  updateLead,
} from "@/app/lib/db";
import { LeadFilters, LeadStatus } from "@/app/types/leads";
import { NextRequest, NextResponse } from "next/server";

// ── GET /api/admin/leads ──────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  try {
    const { searchParams } = req.nextUrl;

    const filters: LeadFilters = {
      status: (searchParams.get("status") as LeadStatus | "all") || "all",
      inquiry: searchParams.get("inquiry") || undefined,
      region: searchParams.get("region") || undefined,
      search: searchParams.get("search") || undefined,
    };

    const leads = await getLeads(filters);
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("[GET /api/admin/leads]", err);
    return NextResponse.json(
      { error: "Failed to fetch leads", leads: [] },
      { status: 500 },
    );
  }
}

// ── PATCH /api/admin/leads ────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();

    // Bulk status change: { ids: string[], status: LeadStatus }
    if (Array.isArray(body.ids) && body.status) {
      await bulkUpdateStatus(body.ids, body.status as LeadStatus);
      return NextResponse.json({ success: true });
    }

    // Single update: { id: string, ...fields }
    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    const { id, ...data } = body;
    await updateLead(id, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PATCH /api/admin/leads]", err);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 },
    );
  }
}

// ── DELETE /api/admin/leads ───────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();

    // Bulk delete: { ids: string[] }
    if (Array.isArray(body.ids)) {
      await bulkDeleteLeads(body.ids);
      return NextResponse.json({ success: true });
    }

    // Single delete: { id: string }
    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    await deleteLead(body.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/leads]", err);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 },
    );
  }
}
