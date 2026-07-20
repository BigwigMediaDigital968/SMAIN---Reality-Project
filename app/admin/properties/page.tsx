"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/app/lib/admin-fetch";
import PropertyStatsCards from "@/app/components/admin/PropertyStatsCards";
import {
  Search,
  Trash2,
  RefreshCw,
  Plus,
  X,
  Loader2,
  Home,
  Edit,
  Eye,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Property {
  id: string;
  propertyName: string;
  location?: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: string;
  price: string;
  bedroom?: string;
  bathroom?: string | null;
  sizeSqft: string;
  address: string;
  subArea?: string;
  developerName: string;
  propertyImages: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

type ToastType = "success" | "error";
interface Toast {
  msg: string;
  type: ToastType;
}
interface ConfirmModal {
  title: string;
  description: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => Promise<void>;
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmDialog({
  modal,
  onClose,
}: {
  modal: ConfirmModal;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    await modal.onConfirm();
    setLoading(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #27272A" }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: modal.danger ? "#3B0A0A" : "#1a2744" }}
          >
            {modal.danger ? (
              <Trash2 size={18} style={{ color: "#F87171" }} />
            ) : (
              <RefreshCw size={18} style={{ color: "#60A5FA" }} />
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-1">
              {modal.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>
              {modal.description}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-80"
            style={{
              backgroundColor: "#1E1E2E",
              color: "#A1A1AA",
              border: "1px solid #27272A",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-80 flex items-center gap-2"
            style={{
              backgroundColor: modal.danger ? "#EF4444" : "#3B82F6",
              color: "#fff",
            }}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Processing..." : modal.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Feedback Modal ────────────────────────────────────────────────────────────
function FeedbackModal({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = toast.type === "success";
  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl"
      style={{
        backgroundColor: "#111118",
        border: `1px solid ${isSuccess ? "#10B98133" : "#EF444433"}`,
        boxShadow: `0 8px 32px ${isSuccess ? "#10B98122" : "#EF444422"}`,
        minWidth: 280,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: isSuccess ? "#022C22" : "#2D0A0A" }}
      >
        {isSuccess ? (
          <RefreshCw size={16} style={{ color: "#34D399" }} />
        ) : (
          <X size={16} style={{ color: "#F87171" }} />
        )}
      </div>
      <div className="flex-1">
        <p
          className="text-sm font-semibold"
          style={{ color: isSuccess ? "#34D399" : "#F87171" }}
        >
          {isSuccess ? "Success" : "Error"}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
          {toast.msg}
        </p>
      </div>
      <button
        onClick={onClose}
        className="cursor-pointer hover:opacity-60 transition-opacity"
        style={{ color: "#52525B" }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ── API helpers ───────────────────────────────────────────────────────────────
async function apiFetchProperties(
  filters: { status?: string; search?: string; listingType?: string },
  onUnauthorized?: () => void
): Promise<Property[]> {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== "all")
    params.set("status", filters.status);
  if (filters.search) params.set("search", filters.search);
  if (filters.listingType) params.set("listingType", filters.listingType);

  const res = await adminFetch(`/api/admin/properties?${params.toString()}`);
  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    onUnauthorized?.();
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch properties");
  const data = await res.json();
  return data.properties ?? [];
}

async function apiDeleteProperty(id: string) {
  const res = await adminFetch("/api/admin/properties", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to delete property");
}

async function apiBulkDelete(ids: string[]) {
  const res = await adminFetch("/api/admin/properties", {
    method: "DELETE",
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error("Failed to delete properties");
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "all", listingType: "" });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<Toast | null>(null);
  const [confirm, setConfirm] = useState<ConfirmModal | null>(null);

  const showToast = useCallback((msg: string, type: ToastType = "success") => {
    setToast({ msg, type });
  }, []);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetchProperties(
        {
          ...filters,
          search: search || undefined,
        },
        () => router.push("/admin/login")
      );
      setProperties(data);
      setSelected(new Set());
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== "Unauthorized") {
        showToast("Failed to load properties", "error");
      }
    } finally {
      setLoading(false);
    }
  }, [filters, search, showToast, router]);

  // console.log(properties)

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchProperties(), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Filter change
  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const allSelected =
    properties.length > 0 && properties.every((p) => selected.has(p.id));

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    setSelected(
      allSelected ? new Set() : new Set(properties.map((p) => p.id))
    );
  }

  function handleDelete(property: Property) {
    setConfirm({
      title: "Delete property",
      description: `This will permanently delete "${property.propertyName}". This action cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        await apiDeleteProperty(property.id);
        setProperties((prev) => prev.filter((p) => p.id !== property.id));
        showToast(`${property.propertyName} deleted`);
      },
    });
  }

  function handleBulkDelete() {
    const count = selected.size;
    setConfirm({
      title: `Delete ${count} propert${count !== 1 ? "ies" : "y"}`,
      description: `You are about to permanently delete ${count} propert${count !== 1 ? "ies" : "y"}. This cannot be undone.`,
      confirmLabel: `Delete ${count}`,
      danger: true,
      onConfirm: async () => {
        const ids = [...selected];
        await apiBulkDelete(ids);
        setProperties((prev) => prev.filter((p) => !selected.has(p.id)));
        setSelected(new Set());
        showToast(`${count} properties deleted`);
      },
    });
  }

  return (
    <div
      className="min-h-screen p-6 lg:p-10"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "#6366F118",
              border: "1px solid #6366F122",
            }}
          >
            <Home size={20} style={{ color: "#6366F1" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Properties
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "#52525B" }}>
              {loading
                ? "Loading..."
                : `${properties.length} propert${properties.length !== 1 ? "ies" : "y"} found`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProperties}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-70"
            style={{
              backgroundColor: "#111118",
              border: "1px solid #27272A",
              color: "#71717A",
            }}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => router.push("/admin/properties/add")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-70"
            style={{ backgroundColor: "#6366F1", color: "#fff" }}
          >
            <Plus size={14} />
            Add Property
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <PropertyStatsCards properties={properties} />

      {/* ── Filters ── */}
      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#52525B" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search property name, address, developer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111118",
              border: "1px solid #27272A",
              color: "#E4E4E7",
            }}
          />
        </div>
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ backgroundColor: "#111118", border: "1px solid #27272A" }}
        >
          {[
            { value: "all", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ].map((s) => {
            const active = filters.status === s.value;
            return (
              <button
                key={s.value}
                onClick={() => setFilters((f) => ({ ...f, status: s.value }))}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? "#6366F118" : "transparent",
                  color: active ? "#6366F1" : "#52525B",
                  border: active ? "1px solid #6366F122" : "1px solid transparent",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ backgroundColor: "#111118", border: "1px solid #27272A" }}
        >
          {[
            { value: "", label: "All Types" },
            { value: "sale", label: "Sale" },
            { value: "rent", label: "Rent" },
          ].map((s) => {
            const active = filters.listingType === s.value;
            return (
              <button
                key={s.value}
                onClick={() => setFilters((f) => ({ ...f, listingType: s.value }))}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? "#10B98118" : "transparent",
                  color: active ? "#10B981" : "#52525B",
                  border: active ? "1px solid #10B98122" : "1px solid transparent",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bulk actions ── */}
      {selected.size > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
          style={{ backgroundColor: "#111118", border: "1px solid #6366F122" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: "#6366F122", color: "#6366F1" }}
            >
              {selected.size}
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "#6366F1" }}
            >
              selected
            </span>
          </div>
          <div className="h-4 w-px" style={{ backgroundColor: "#27272A" }} />

          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-80"
            style={{
              backgroundColor: "#2D0A0A",
              color: "#F87171",
              border: "1px solid #EF444422",
            }}
          >
            <Trash2 size={12} />
            Delete {selected.size}
          </button>

          <button
            onClick={() => setSelected(new Set())}
            className="ml-auto cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: "#52525B" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <div
        className="rounded-2xl overflow-visible"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        {/* Header row */}
        <div
          className="hidden lg:grid items-center px-5 py-3"
          style={{
            gridTemplateColumns: "44px 2fr 1fr 1fr 1fr 100px 140px",
            borderBottom: "1px solid #1E1E2E",
          }}
        >
          <button
            onClick={toggleSelectAll}
            className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: allSelected ? "#6366F1" : "#3F3F46" }}
          >
            {allSelected ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            )}
          </button>
          {["Property", "Location", "Address", "Type & Price", "Status", "Actions"].map((h) => (
            <span
              key={h}
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#52525B" }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#6366F144", borderTopColor: "#6366F1" }}
            />
            <p className="text-xs" style={{ color: "#52525B" }}>
              Loading properties...
            </p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#1E1E2E" }}
            >
              <Home size={24} style={{ color: "#3F3F46" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">No properties found</p>
              <p className="text-xs mt-1" style={{ color: "#52525B" }}>
                Try adjusting your filters or add a new property
              </p>
            </div>
          </div>
        ) : (
          properties.map((property, i) => {
            const isSelected = selected.has(property.id);
            const isLast = i === properties.length - 1;
            return (
              <div
                key={property.id}
                className="hidden lg:grid items-center px-5 py-3.5 transition-colors group"
                style={{
                  gridTemplateColumns: "44px 2fr 1fr 1fr 1fr 100px 140px",
                  borderBottom: isLast ? "none" : "1px solid #1E1E2E",
                  backgroundColor: isSelected ? "#6366F106" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#ffffff03";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    isSelected ? "#6366F106" : "transparent";
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleSelect(property.id)}
                  className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{ color: isSelected ? "#6366F1" : "#3F3F46" }}
                >
                  {isSelected ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  )}
                </button>

                {/* Property Info */}
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{
                      backgroundColor: "#6366F118",
                      border: "1px solid #6366F122",
                    }}
                  >
                    {property.propertyImages?.[0] ? (
                      <img
                        src={property.propertyImages[0]}
                        alt={property.propertyName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Home size={18} style={{ color: "#6366F1" }} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {property.propertyName}
                    </p>
                    <p
                      className="text-[11px] truncate"
                      style={{ color: "#52525B" }}
                    >
                      {property.createdAt
                        ? new Date(property.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="min-w-0 pr-4">
                  <p className="text-sm truncate capitalize" style={{ color: "#D4D4D8" }}>
                    {property.location?.split("-").join(" ")}
                  </p>
                </div>
                
                {/* Address */}

                <div className="min-w-0 pr-4">
                  <p className="text-sm truncate" style={{ color: "#D4D4D8" }}>
                    {property.address}
                  </p>
                  {property.subArea && (
                    <p
                      className="text-[11px] truncate mt-0.5"
                      style={{ color: "#52525B" }}
                    >
                      {property.subArea}
                    </p>
                  )}
                </div>

                {/* Type & Price */}
                <div className="min-w-0 pr-4">
                  <p className="text-sm truncate" style={{ color: "#D4D4D8" }}>
                    {property.propertyType} • {property.listingType === "sale" ? "Sale" : "Rent"}
                  </p>
                  <p
                    className="text-[11px] truncate mt-0.5"
                    style={{ color: "#10B981" }}
                  >
                    ₹{property.price}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`inline-flex justify-center items-center gap-1.5 px-1 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${
                    property.status ? "bg-[#022C22] text-[#10B981]" : "bg-[#2D0A0A] text-[#F87171]"
                  }`}
                  style={{
                    border: `1px solid ${property.status ? "#10B98122" : "#EF444422"}`,
                  }}
                >
                  {property.status ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      Active
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
                      Inactive
                    </>
                  )}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1.5 px-2">
                  <button
                    onClick={() => router.push(`/admin/properties/view/${property.id}`)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: "#1E1E2E", color: "#60A5FA" }}
                    title="View property"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => router.push(`/admin/properties/${property.id}`)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: "#1E1E2E", color: "#71717A" }}
                    title="Edit property"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(property)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: "#2D0A0A", color: "#F87171" }}
                    title="Delete property"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Modals ── */}
      {confirm && (
        <ConfirmDialog modal={confirm} onClose={() => setConfirm(null)} />
      )}
      {toast && <FeedbackModal toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}