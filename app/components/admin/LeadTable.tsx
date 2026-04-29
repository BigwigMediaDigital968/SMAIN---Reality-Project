"use client";

import StatusBadge from "./actions/StatusBadge";
import type { Lead, LeadStatus } from "@/app/types/leads";
import { LEAD_STATUS_LABELS } from "@/app/types/leads";

interface Props {
  leads: Lead[];
  selected: Set<string>;
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

export default function LeadTable({
  leads,
  selected,
  onSelect,
  onSelectAll,
  onStatusChange,
  onDelete,
  onView,
}: Props) {
  if (leads.length === 0) {
    return (
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#1E1E2E] flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#52525B"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </div>
        <p className="text-[#71717A] text-sm">No leads found</p>
      </div>
    );
  }

  const allSelected = leads.every((l) => selected.has(l.id));

  return (
    <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E2E]">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded accent-[#6366F1] cursor-pointer"
                />
              </th>
              {[
                "Name",
                "Contact",
                "Inquiry",
                "Region",
                "Status",
                "Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-[#52525B] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E1E2E]">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-[#0A0A0F]/50 transition-colors group"
              >
                {/* Checkbox */}
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.has(lead.id)}
                    onChange={() => onSelect(lead.id)}
                    className="w-4 h-4 rounded accent-[#6366F1] cursor-pointer"
                  />
                </td>

                {/* Name */}
                <td className="px-4 py-4">
                  <p className="text-white text-sm font-medium">{lead.name}</p>
                  <p className="text-[#52525B] text-xs mt-0.5">
                    {lead.location || "—"}
                  </p>
                </td>

                {/* Contact */}
                <td className="px-4 py-4">
                  <p className="text-[#A1A1AA] text-sm">{lead.email}</p>
                  <p className="text-[#52525B] text-xs mt-0.5">{lead.phone}</p>
                </td>

                {/* Inquiry */}
                <td className="px-4 py-4">
                  <span className="capitalize text-[#A1A1AA] text-sm">
                    {lead.inquiry || "—"}
                  </span>
                </td>

                {/* Region */}
                <td className="px-4 py-4">
                  <span className="text-[#A1A1AA] text-sm">
                    {lead.region || "—"}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      onStatusChange(lead.id, e.target.value as LeadStatus)
                    }
                    className="bg-transparent border-0 p-0 text-sm cursor-pointer focus:outline-none"
                  >
                    <option value="" disabled className="bg-[#111118]">
                      —
                    </option>
                    {(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map(
                      (s) => (
                        <option key={s} value={s} className="bg-[#111118]">
                          {LEAD_STATUS_LABELS[s]}
                        </option>
                      ),
                    )}
                  </select>
                  <div className="mt-1">
                    <StatusBadge status={lead.status} />
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-4">
                  <span className="text-[#71717A] text-xs">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onView(lead)}
                      className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#27272A] transition-colors"
                      title="View details"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="p-1.5 rounded-lg text-[#71717A] hover:text-red-400 hover:bg-red-500/5 transition-colors"
                      title="Delete lead"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
