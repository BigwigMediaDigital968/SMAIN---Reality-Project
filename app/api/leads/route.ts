import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// --- Firebase Configuration ---
// Note: In this environment, these are provided as global variables
const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "{}",
);
const appId = process.env.NEXT_PUBLIC_APP_ID || "default-app-id";

// Initialize Firebase (Singleton pattern)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Valid status types for the workflow
const VALID_STATUSES = ["new", "contacted", "forwarded", "rejected"];

/**
 * GET: Fetch all leads
 * Path: /api/leads
 */
export async function GET() {
  try {
    const leadsRef = collection(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      "leads",
    );
    const snapshot = await getDocs(leadsRef);

    const leads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Simple in-memory sort (Rule 2: No complex queries)
    const sortedLeads = leads.sort((a: any, b: any) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });

    return NextResponse.json(sortedLeads, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST: Create a new lead from contact form
 * Path: /api/leads
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, inquiry, region, description } =
      body;

    // Basic Validation
    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const leadsRef = collection(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      "leads",
    );
    const newDoc = await addDoc(leadsRef, {
      firstName,
      lastName,
      email,
      phone,
      inquiry,
      region,
      description,
      status: "new", // Default status
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      { id: newDoc.id, message: "Lead created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * PUT: Update lead status or details
 * Path: /api/leads?id=ID_HERE
 */
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id)
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

    // If updating status, validate against allowed types
    if (body.status && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status transition" },
        { status: 400 },
      );
    }

    const leadRef = doc(db, "artifacts", appId, "public", "data", "leads", id);

    await updateDoc(leadRef, {
      ...body,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Lead updated successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE: Remove a lead
 * Path: /api/leads?id=ID_HERE
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

    const leadRef = doc(db, "artifacts", appId, "public", "data", "leads", id);
    await deleteDoc(leadRef);

    return NextResponse.json(
      { message: "Lead deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
