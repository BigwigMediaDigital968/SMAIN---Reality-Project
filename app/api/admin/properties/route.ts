import { requireAdmin } from "@/app/lib/auth-middleware";
import { deleteFromCloudinary, uploadToCloudinary } from "@/app/lib/cloudinary";
import {
  bulkDeleteProperties,
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// ── GET /api/admin/properties ──────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  try {
    const { searchParams } = req.nextUrl;

    // Check for single property fetch by ID
    const id = searchParams.get("id");
    if (id) {
      const property = await getProperty(id);
      if (!property) {
        return NextResponse.json(
          { error: "Property not found", properties: [] },
          { status: 404 },
        );
      }
      return NextResponse.json({ properties: [property] });
    }

    const filters = {
      status:
        (searchParams.get("status") as "true" | "false" | "all") || "all",
      search: searchParams.get("search") || undefined,
      listingType: searchParams.get("listingType") || undefined,
      propertyType: searchParams.get("propertyType") || undefined,
    };

    // Convert status string to boolean
    const statusValue: boolean | "all" | undefined =
      filters.status === "all"
        ? "all"
        : filters.status === "true"
          ? true
          : filters.status === "false"
            ? false
            : undefined;

    const properties = await getProperties({
      status: statusValue,
      search: filters.search,
      listingType: filters.listingType,
      propertyType: filters.propertyType,
    });
    return NextResponse.json({ properties });
  } catch (err) {
    console.error("[GET /api/admin/properties]", err);
    return NextResponse.json(
      { error: "Failed to fetch properties", properties: [] },
      { status: 500 },
    );
  }
}

// ── POST /api/admin/properties ─────────────────────────────────────────────────
// export async function POST(req: NextRequest) {
//   const authErr = await requireAdmin(req);
//   if (authErr) return authErr;

//   try {
//     const body = await req.json();

//     // Generate slug from propertyName if not provided
//     if (!body.slug && body.propertyName) {
//       body.slug = body.propertyName
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)/g, "");
//     }

//     const id = await createProperty(body);
//     return NextResponse.json({ success: true, id }, { status: 201 });
//   } catch (err) {
//     console.error("[POST /api/admin/properties]", err);
//     return NextResponse.json(
//       { error: "Failed to create property" },
//       { status: 500 },
//     );
//   }
// }

export async function POST(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  // Track successfully uploaded URLs in this request so we can roll back if DB fails
  const uploadedUrls: string[] = [];

  try {
    
    // 1. Read the request as FormData instead of JSON
    const formData = await req.formData();
    
    const rawData = formData.get("data") as string;
    const rawImageOrder = formData.get("imageOrder") as string;
    const fileObjects = formData.getAll("images") as File[]; // matches newFiles on front-end

    if (!rawData || !rawImageOrder) {
      return NextResponse.json({ error: "Missing required form fields." }, { status: 400 });
    }

    const body = JSON.parse(rawData);
    const imageOrder = JSON.parse(rawImageOrder) as string[];

    // 2. Process Auto-Slug generation
    if (!body.slug && body.propertyName) {
      body.slug = body.propertyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // 3. Process and upload files to Cloudinary
    const uploadedNewUrls: string[] = [];
    for (const file of fileObjects) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const secureUrl = await uploadToCloudinary(buffer);
      uploadedUrls.push(secureUrl);    // Global catch-all tracker for rollback triggers
      uploadedNewUrls.push(secureUrl); // Sequential tracker for this loop matching incoming order
    }

    // 4. Rebuild propertyImages array based on the `imageOrder` schema sent by client
    const finalPropertyImages = imageOrder.map((token: string) => {
      if (token.startsWith("existing:")) {
        return token.replace("existing:", "");
      } else if (token.startsWith("new:")) {
        const index = parseInt(token.replace("new:", ""), 10);
        return uploadedNewUrls[index];
      }
      return "";
    }).filter(Boolean);

    // Merge computed images into the data body payload
    body.propertyImages = finalPropertyImages;

    // 5. Attempt database creation
    // Replacing raw `createProperty(body)` logic with standard Mongoose document validation
    const id = await createProperty(body);
    // await newProperty.save();

    return NextResponse.json({ success: true, id }, { status: 201 });

  } catch (err) {
    console.error("[POST /api/admin/properties] Error occurred:", err);

    // 6. ROLLBACK: If any database error occurs, sweep and remove files from Cloudinary
    if (uploadedUrls.length > 0) {
      console.log(`Rollback triggered. Cleaning up ${uploadedUrls.length} uploaded files from Cloudinary...`);
      await Promise.all(uploadedUrls.map((url) => deleteFromCloudinary(url)));
    }

    return NextResponse.json(
      { error: "Failed to create property and assets rolled back successfully." },
      { status: 500 }
    );
  }
}

// ── PATCH /api/admin/properties ─────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Generate slug from propertyName if not provided
    if (!body.slug && body.propertyName) {
      body.slug = body.propertyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const { id, ...data } = body;
    await updateProperty(id, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PATCH /api/admin/properties]", err);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 },
    );
  }
}

// ── DELETE /api/admin/properties ────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();

    // Bulk delete: { ids: string[] }
    if (Array.isArray(body.ids)) {
      await bulkDeleteProperties(body.ids);
      return NextResponse.json({ success: true });
    }

    // Single delete: { id: string }
    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    await deleteProperty(body.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/properties]", err);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 },
    );
  }
}