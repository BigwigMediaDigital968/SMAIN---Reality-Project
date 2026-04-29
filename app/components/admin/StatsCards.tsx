import {
  Lead,
  LEAD_STATUS_COLORS,
  LEAD_STATUS_LABELS,
  LeadStatus,
} from "@/app/types/leads";

const STATS_STATUS: LeadStatus[] = [
  "new",
  "assigned",
  "contacted",
  "in_progress",
  "closed_won",
  "rejected",
];

export default function StatsCards({ leads }: { leads: Lead[] }) {
  const total = leads.length;

  const counts = STATS_STATUS.reduce(
    (acc, s) => {
      acc[s] = leads.filter((l) => l.status === s).length;
      return acc;
    },
    {} as Record<LeadStatus, number>,
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total */}
      <div className="col-span-2 lg:col-span-1 bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5">
        <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest mb-3">
          Total Leads
        </p>
        <p className="text-4xl font-bold text-white">{total}</p>
        <p className="text-[#52525B] text-xs mt-1">All time</p>
      </div>

      {STATS_STATUS.map((status) => (
        <div
          key={status}
          className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: LEAD_STATUS_COLORS[status] }}
            />
            <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest">
              {LEAD_STATUS_LABELS[status]}
            </p>
          </div>
          <p className="text-3xl font-bold text-white">{counts[status]}</p>
          <p className="text-[#52525B] text-xs mt-1">
            {total > 0 ? Math.round((counts[status] / total) * 100) : 0}% of
            total
          </p>
        </div>
      ))}
    </div>
  );
}
