"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/app/types/leads";
import StatsCards from "@/app/components/admin/StatsCards";
import StatusBadge from "@/app/components/admin/actions/StatusBadge";
import { adminFetch } from "@/app/lib/admin-fetch"; // ✅ ADD THIS

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/leads") // ✅ was: fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const recent = leads.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#ffb24e44", borderTopColor: "#ffb24e" }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#71717A] text-sm mt-1">
          Overview of all your leads
        </p>
      </div>

      <StatsCards leads={leads} />

      <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
          <h2 className="text-white font-semibold text-sm">Recent Leads</h2>
          <a
            href="/admin/leads"
            className="text-xs transition-colors cursor-pointer hover:opacity-70"
            style={{ color: "#ffb24e" }}
          >
            View all →
          </a>
        </div>
        {recent.length === 0 ? (
          <div className="py-12 text-center text-[#52525B] text-sm">
            No leads yet
          </div>
        ) : (
          <div className="divide-y divide-[#1E1E2E]">
            {recent.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center px-6 py-4 transition-colors cursor-pointer"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0A0A0F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold mr-4 shrink-0"
                  style={{
                    backgroundColor: "#ffb24e18",
                    color: "#ffb24e",
                    border: "1px solid #ffb24e22",
                  }}
                >
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {lead.name}
                  </p>
                  <p className="text-[#71717A] text-xs truncate">
                    {lead.email}
                  </p>
                </div>
                <div className="ml-4 shrink-0">
                  <StatusBadge status={lead.status} />
                </div>
                <div className="ml-4 shrink-0 text-[#52525B] text-xs">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
