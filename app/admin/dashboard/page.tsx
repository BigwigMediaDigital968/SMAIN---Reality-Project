"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lead } from "@/app/types/leads";
import StatusBadge from "@/app/components/admin/actions/StatusBadge";
import { adminFetch } from "@/app/lib/admin-fetch";

interface Property {
  id: string;
  propertyName: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: string;
  status: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetch("/api/admin/leads"),
      adminFetch("/api/admin/properties"),
    ])
      .then(async ([leadsRes, propertiesRes]) => {
        if (leadsRes.status === 401) {
          localStorage.removeItem("admin_token");
          router.push("/admin/login");
          return { leads: [], properties: [] };
        }
        const [leadsData, propertiesData] = await Promise.all([
          leadsRes.json(),
          propertiesRes.json(),
        ]);
        return { leads: leadsData, properties: propertiesData };
      })
      .then((data) => {
        setLeads(data.leads?.leads ?? []);
        setProperties(data.properties?.properties ?? []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  console.log(leads);

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
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#71717A] text-sm mt-1">
          Overview of your leads and properties
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Leads Card */}
        <a
          href="/admin/leads"
          className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6 cursor-pointer hover:border-[#ffb24e] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: "#ffb24e18",
                border: "1px solid #ffb24e22",
              }}
            >
              <svg className="w-5 h-5" style={{ color: "#ffb24e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-[#71717A] text-xs font-medium uppercase tracking-widest">Leads</span>
          </div>
          <p className="text-4xl font-bold text-white">{leads.length}</p>
          <p className="text-[#52525B] text-xs mt-1 group-hover:text-[#ffb24e] transition-colors">
            View all leads →
          </p>
        </a>

        {/* Properties Card */}
        <a
          href="/admin/properties"
          className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6 cursor-pointer hover:border-[#ffb24e] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: "#22c55e18",
                border: "1px solid #22c55e22",
              }}
            >
              <svg className="w-5 h-5" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-[#71717A] text-xs font-medium uppercase tracking-widest">Properties</span>
          </div>
          <p className="text-4xl font-bold text-white">{properties.length}</p>
          <p className="text-[#52525B] text-xs mt-1 group-hover:text-[#ffb24e] transition-colors">
            View all properties →
          </p>
        </a>
      </div>

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
