import Lead from "./models/leads";
import Property from "./models/Property";
import { connectDB } from "./mongodb";
import type { LeadFilters, LeadStatus } from "@/app/types/leads";
import type { IProperty } from "./models/Property";

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

// ─── Property CRUD ───────────────────────────────────────────────────────────
export async function createProperty(data: Partial<IProperty>) {
  await connectDB();
  const property = await Property.create(data);
  return property._id.toString();
}

export async function getProperty(id: string) {
  await connectDB();
  const property = await Property.findById(id);
  if (!property) return null;
  return serialize(property);
}

export async function getProperties(filters: {
  status?: boolean | "all";
  search?: string;
  listingType?: string;
  propertyType?: string;
  location?: string;
} = {}) {
  await connectDB();

  const query: Record<string, any> = {};

  if (filters.status !== undefined && filters.status !== "all") {
    query.status = filters.status;
  }
  if (filters.listingType) query.listingType = filters.listingType;
  if (filters.propertyType) query.propertyType = filters.propertyType;
  if (filters.location) query.location = filters.location;

  if (filters.search) {
    const term = filters.search;
    query.$or = [
      { propertyName: { $regex: term, $options: "i" } },
      { address: { $regex: term, $options: "i" } },
      { developerName: { $regex: term, $options: "i" } },
    ];
  }

  const properties = await Property.find(query).sort({ createdAt: -1 });
  return properties.map(serialize);
}

export async function getPropertiesPaginated(
  filters: {
    status?: boolean | "all";
    search?: string;
    listingType?: string;
    propertyType?: string;
    location?: string;
  } = {},
  options: { page?: number; limit?: number } = {},
) {
  await connectDB();

  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(options.limit) || 10));
  const skip = (page - 1) * limit;

  const query: Record<string, any> = {};

  if (filters.status !== undefined && filters.status !== "all") {
    query.status = filters.status;
  }
  if (filters.listingType) query.listingType = filters.listingType;
  if (filters.propertyType) query.propertyType = filters.propertyType;
  if (filters.location) query.location = filters.location;

  if (filters.search) {
    const term = filters.search;
    query.$or = [
      { propertyName: { $regex: term, $options: "i" } },
      { address: { $regex: term, $options: "i" } },
      { developerName: { $regex: term, $options: "i" } },
    ];
  }

  const [properties, total] = await Promise.all([
    Property.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Property.countDocuments(query),
  ]);

  return {
    properties: properties.map(serialize),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function updateProperty(id: string, data: Partial<IProperty>) {
  // console.log(data)
  await connectDB();
  const property = await Property.findByIdAndUpdate(id, { ...data, updatedAt: new Date() });
  // console.log(property)
}

export async function deleteProperty(id: string) {
  await connectDB();
  await Property.findByIdAndDelete(id);
}

export async function bulkDeleteProperties(ids: string[]) {
  await connectDB();
  await Property.deleteMany({ _id: { $in: ids } });
}
