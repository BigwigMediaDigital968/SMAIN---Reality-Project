import { NextRequest, NextResponse } from "next/server";
import { getPropertyBySlugOrId } from "@/app/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Property ID or slug is required" },
        { status: 400 }
      );
    }

    const property = await getPropertyBySlugOrId(id);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (err) {
    console.error("[GET /api/properties/[id]]", err);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
