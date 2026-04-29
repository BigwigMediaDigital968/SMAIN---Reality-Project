"use client";

import type { Lead } from "@/app/types/leads";
import StatusBadge from "./StatusBadge";

export default function LeadDetailModal({
  lead,
  onClose,
}: {
  lead: Lead;
  onClose: () => void;
}) {
  const fields = [
    { label: "Full Name", value: lead.name },
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "Location", value: lead.location },
    { label: "Region", value: lead.region },
    { label: "Inquiry Type", value: lead.inquiry },
    { label: "Source", value: lead.source || "Website" },
    { label: "Newsletter", value: lead.newsletter ? "Yes" : "No" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#111118] border border-[#1E1E2E] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E2E]">
          <div>
            <h2 className="text-white font-semibold">{lead.name}</h2>
            <p className="text-[#71717A] text-sm mt-0.5">
              {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={lead.status} />
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#71717A] hover:text-white hover:bg-[#27272A] transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[#52525B] text-xs uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="text-[#D4D4D8] text-sm capitalize">
                {value || "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        {lead.description && (
          <div className="px-6 pb-6">
            <p className="text-[#52525B] text-xs uppercase tracking-wider mb-2">
              Message
            </p>
            <p className="text-[#A1A1AA] text-sm bg-[#0A0A0F] rounded-xl p-4 border border-[#1E1E2E] leading-relaxed">
              {lead.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
