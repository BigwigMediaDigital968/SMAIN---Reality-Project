"use client";

import { LEAD_STATUS_LABELS } from "@/app/types/leads";
import type { LeadFilters, LeadStatus } from "@/app/types/leads";

const STATUSES: (LeadStatus | "all")[] = [
  "all",
  "new",
  "assigned",
  "contacted",
  "in_progress",
  "closed_won",
  "rejected",
];

interface Props {
  filters: LeadFilters;
  onChange: (f: Partial<LeadFilters>) => void;
  totalSelected: number;
  onBulkDelete: () => void;
  onBulkStatus: (s: LeadStatus) => void;
}

export default function LeadFilters({
  filters,
  onChange,
  totalSelected,
  onBulkDelete,
  onBulkStatus,
}: Props) {
  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, phone…"
          value={filters.search ?? ""}
          onChange={(e) => onChange({ search: e.target.value })}
          className="w-full bg-[#0A0A0F] border border-[#27272A] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#3F3F46] focus:outline-none focus:border-[#6366F1] text-sm transition-colors"
        />
      </div>

      {/* Status pills */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onChange({ status: s })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              filters.status === s || (!filters.status && s === "all")
                ? "bg-[#6366F1]/10 border-[#6366F1]/30 text-[#818CF8]"
                : "border-[#27272A] text-[#71717A] hover:border-[#3F3F46] hover:text-white"
            }`}
          >
            {s === "all" ? "All" : LEAD_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Bulk actions — only when items selected */}
      {totalSelected > 0 && (
        <div className="flex items-center gap-3 bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-xl px-4 py-3">
          <span className="text-[#818CF8] text-sm font-medium">
            {totalSelected} selected
          </span>
          <div className="flex gap-2 ml-auto flex-wrap">
            {(
              [
                "assigned",
                "contacted",
                "in_progress",
                "closed_won",
                "rejected",
              ] as LeadStatus[]
            ).map((s) => (
              <button
                key={s}
                onClick={() => onBulkStatus(s)}
                className="px-3 py-1.5 bg-[#1E1E2E] border border-[#27272A] hover:border-[#6366F1]/40 text-[#A1A1AA] hover:text-[#818CF8] rounded-lg text-xs font-medium transition-colors"
              >
                → {LEAD_STATUS_LABELS[s]}
              </button>
            ))}
            <button
              onClick={onBulkDelete}
              className="px-3 py-1.5 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 text-red-400 rounded-lg text-xs font-medium transition-colors"
            >
              Delete selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
