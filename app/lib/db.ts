import Lead from "./models/leads";
import { connectDB } from "./mongodb";
import type { LeadFilters, LeadStatus } from "@/app/types/leads";

function serialize(doc: any) {
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
}

// ─── Create ───────────────────────────────────────────────────────────────────
export async function createLead(data: any, source = "website") {
  await connectDB();
  const lead = await Lead.create({ ...data, source });
  return lead._id.toString();
}

// ─── Read ─────────────────────────────────────────────────────────────────────
export async function getLead(id: string) {
  await connectDB();
  const lead = await Lead.findById(id);
  if (!lead) return null;
  return serialize(lead);
}

export async function getLeads(filters: LeadFilters = {}) {
  await connectDB();

  const query: Record<string, any> = {};

  if (filters.status && filters.status !== "all") query.status = filters.status;
  if (filters.inquiry) query.inquiry = filters.inquiry;
  if (filters.region) query.region = filters.region;

  if (filters.search) {
    const term = filters.search;
    query.$or = [
      { name: { $regex: term, $options: "i" } },
      { email: { $regex: term, $options: "i" } },
      { phone: { $regex: term, $options: "i" } },
      { location: { $regex: term, $options: "i" } },
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 });
  return leads.map(serialize);
}

// ─── Update ───────────────────────────────────────────────────────────────────
export async function updateLead(id: string, data: any) {
  await connectDB();
  await Lead.findByIdAndUpdate(id, { ...data, updatedAt: new Date() });
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  return updateLead(id, { status });
}

// ─── Delete ───────────────────────────────────────────────────────────────────
export async function deleteLead(id: string) {
  await connectDB();
  await Lead.findByIdAndDelete(id);
}

export async function bulkDeleteLeads(ids: string[]) {
  await connectDB();
  await Lead.deleteMany({ _id: { $in: ids } });
}

export async function bulkUpdateStatus(ids: string[], status: LeadStatus) {
  await connectDB();
  await Lead.updateMany(
    { _id: { $in: ids } },
    { status, updatedAt: new Date() },
  );
}
