import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from "@/app/types/leads";
import type { LeadStatus } from "@/app/types/leads";

const BG_MAP: Record<LeadStatus, string> = {
  new: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  assigned: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  contacted: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  in_progress: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  closed_won: "bg-green-500/10 border-green-500/20 text-green-400",
  rejected: "bg-red-500/10 border-red-500/20 text-red-400",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${BG_MAP[status]}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: LEAD_STATUS_COLORS[status] }}
      />
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
