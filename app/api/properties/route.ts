import { NextRequest, NextResponse } from "next/server";
import { getPropertiesPaginated } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const statusParam = searchParams.get("status") ?? "true";
    const status = statusParam === "all" ? "all" : statusParam === "true";
    const listingType = searchParams.get("listingType") || undefined;
    const propertyType = searchParams.get("propertyType") || undefined;
    const location = searchParams.get("location") || undefined;
    const search = searchParams.get("search") || undefined;
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const result = await getPropertiesPaginated(
      {
        status: status as boolean | "all",
        search,
        listingType,
        propertyType,
        location,
      },
      { page, limit },
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/properties]", err);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 },
    );
  }
}
