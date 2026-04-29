export type LeadStatus =
  | "new"
  | "assigned"
  | "contacted"
  | "in_progress"
  | "closed_won"
  | "rejected";

export type LeadInquiry =
  | "general"
  | "sales"
  | "support"
  | "partnership"
  | "careers"
  | "other";

export interface Lead {
  id: string;
  inquiry: LeadInquiry | string;
  region: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  newsletter: boolean;
  status: LeadStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  source?: string; // e.g. "website", "referral"
}

export interface LeadFormData {
  inquiry: string;
  region: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  newsletter: boolean;
}

export type LeadFilters = {
  status?: LeadStatus | "all";
  inquiry?: string;
  region?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  assigned: "Assigned",
  contacted: "Contacted",
  in_progress: "In Progress",
  closed_won: "Closed / Won",
  rejected: "Rejected",
};

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  new: "#3B82F6",
  assigned: "#8B5CF6",
  contacted: "#F59E0B",
  in_progress: "#10B981",
  closed_won: "#059669",
  rejected: "#EF4444",
};
