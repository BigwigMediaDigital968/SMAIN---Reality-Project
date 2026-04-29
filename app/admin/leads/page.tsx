"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Lead, LeadFilters as Filters, LeadStatus } from "@/app/types/leads";
import LeadDetailModal from "@/app/components/admin/actions/LeadDetailModal";
import { adminFetch } from "@/app/lib/admin-fetch";
import {
  Search,
  Trash2,
  RefreshCw,
  ChevronDown,
  Eye,
  CheckSquare,
  Square,
  Filter,
  Users,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronUp,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
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

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS: {
  value: LeadStatus | "all";
  label: string;
  color: string;
  bg: string;
  dot: string;
}[] = [
  {
    value: "all",
    label: "All",
    color: "#71717A",
    bg: "#18181B",
    dot: "#52525B",
  },
  {
    value: "new",
    label: "New",
    color: "#60A5FA",
    bg: "#172554",
    dot: "#3B82F6",
  },
  {
    value: "contacted",
    label: "Contacted",
    color: "#FBBF24",
    bg: "#2D1B00",
    dot: "#F59E0B",
  },
  {
    value: "closed_won",
    label: "Success",
    color: "#34D399",
    bg: "#022C22",
    dot: "#10B981",
  },
  {
    value: "rejected",
    label: "Rejected",
    color: "#F87171",
    bg: "#2D0A0A",
    dot: "#EF4444",
  },
];

function getStatusCfg(status: LeadStatus) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[1];
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = getStatusCfg(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap"
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.color}22`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: cfg.dot }}
      />
      {cfg.label}
    </span>
  );
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
            <AlertTriangle
              size={18}
              style={{ color: modal.danger ? "#F87171" : "#60A5FA" }}
            />
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
          <CheckCircle2 size={16} style={{ color: "#34D399" }} />
        ) : (
          <XCircle size={16} style={{ color: "#F87171" }} />
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

// ── Status Dropdown ───────────────────────────────────────────────────────────
function StatusDropdown({
  lead,
  onSelect,
}: {
  lead: Lead;
  onSelect: (status: LeadStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity group"
      >
        <StatusBadge status={lead.status} />
        {open ? (
          <ChevronUp size={12} style={{ color: "#52525B" }} />
        ) : (
          <ChevronDown size={12} style={{ color: "#52525B" }} />
        )}
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 left-0 z-30 rounded-xl overflow-hidden py-1"
          style={{
            backgroundColor: "#0D0D14",
            border: "1px solid #27272A",
            minWidth: 150,
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          <p
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#52525B" }}
          >
            Change status
          </p>
          {STATUS_OPTIONS.filter((s) => s.value !== "all").map((s) => {
            const isActive = lead.status === s.value;
            return (
              <button
                key={s.value}
                onClick={() => {
                  onSelect(s.value as LeadStatus);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-left cursor-pointer transition-all"
                style={{
                  color: s.color,
                  backgroundColor: isActive ? s.bg : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#ffffff08";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    isActive ? s.bg : "transparent";
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: s.dot }}
                />
                {s.label}
                {isActive && (
                  <span
                    className="ml-auto text-[10px] font-bold"
                    style={{ color: s.color, opacity: 0.6 }}
                  >
                    active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── API helpers ───────────────────────────────────────────────────────────────
async function apiFetchLeads(filters: Filters): Promise<Lead[]> {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== "all")
    params.set("status", filters.status);
  if (filters.inquiry) params.set("inquiry", filters.inquiry);
  if (filters.region) params.set("region", filters.region);
  if (filters.search) params.set("search", filters.search);
  const res = await adminFetch(`/api/admin/leads?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch leads");
  const data = await res.json();
  return data.leads ?? [];
}

async function apiUpdateStatus(id: string, status: LeadStatus) {
  const res = await adminFetch("/api/admin/leads", {
    method: "PATCH",
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
}

async function apiDeleteLead(id: string) {
  const res = await adminFetch("/api/admin/leads", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to delete lead");
}

async function apiBulkDelete(ids: string[]) {
  const res = await adminFetch("/api/admin/leads", {
    method: "DELETE",
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error("Failed to delete leads");
}

async function apiBulkStatus(ids: string[], status: LeadStatus) {
  const res = await adminFetch("/api/admin/leads", {
    method: "PATCH",
    body: JSON.stringify({ ids, status }),
  });
  if (!res.ok) throw new Error("Failed to update leads");
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({ status: "all" });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewing, setViewing] = useState<Lead | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [confirm, setConfirm] = useState<ConfirmModal | null>(null);
  const [bulkDropdown, setBulkDropdown] = useState(false);
  const bulkRef = useRef<HTMLDivElement>(null);

  // Close bulk dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (bulkRef.current && !bulkRef.current.contains(e.target as Node))
        setBulkDropdown(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showToast = useCallback((msg: string, type: ToastType = "success") => {
    setToast({ msg, type });
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetchLeads({
        ...filters,
        search: search || undefined,
      });
      setLeads(data);
      setSelected(new Set());
    } catch {
      showToast("Failed to load leads", "error");
    } finally {
      setLoading(false);
    }
  }, [filters, search, showToast]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchLeads(), 400);
    return () => clearTimeout(t);
  }, [search]); // eslint-disable-line

  // Filter change
  useEffect(() => {
    fetchLeads();
  }, [filters]); // eslint-disable-line

  const allSelected =
    leads.length > 0 && leads.every((l) => selected.has(l.id));

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    setSelected(allSelected ? new Set() : new Set(leads.map((l) => l.id)));
  }

  function handleStatusChange(lead: Lead, status: LeadStatus) {
    if (lead.status === status) return;
    const cfg = getStatusCfg(status);
    setConfirm({
      title: "Change status",
      description: `Mark "${lead.name}" as ${cfg.label}?`,
      confirmLabel: `Set ${cfg.label}`,
      danger: false,
      onConfirm: async () => {
        await apiUpdateStatus(lead.id, status);
        setLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, status } : l)),
        );
        showToast(`${lead.name} marked as ${cfg.label}`);
      },
    });
  }

  function handleDelete(lead: Lead) {
    setConfirm({
      title: "Delete lead",
      description: `This will permanently delete "${lead.name}". This action cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
      onConfirm: async () => {
        await apiDeleteLead(lead.id);
        setLeads((prev) => prev.filter((l) => l.id !== lead.id));
        showToast(`${lead.name} deleted`);
      },
    });
  }

  function handleBulkDelete() {
    const count = selected.size;
    setConfirm({
      title: `Delete ${count} lead${count !== 1 ? "s" : ""}`,
      description: `You are about to permanently delete ${count} lead${count !== 1 ? "s" : ""}. This cannot be undone.`,
      confirmLabel: `Delete ${count}`,
      danger: true,
      onConfirm: async () => {
        const ids = [...selected];
        await apiBulkDelete(ids);
        setLeads((prev) => prev.filter((l) => !selected.has(l.id)));
        setSelected(new Set());
        showToast(`${count} leads deleted`);
      },
    });
  }

  function handleBulkStatus(status: LeadStatus) {
    const count = selected.size;
    const cfg = getStatusCfg(status);
    setConfirm({
      title: "Bulk status update",
      description: `Change ${count} lead${count !== 1 ? "s" : ""} to "${cfg.label}"?`,
      confirmLabel: `Set ${cfg.label}`,
      danger: false,
      onConfirm: async () => {
        const ids = [...selected];
        await apiBulkStatus(ids, status);
        setLeads((prev) =>
          prev.map((l) => (selected.has(l.id) ? { ...l, status } : l)),
        );
        setBulkDropdown(false);
        showToast(`${count} leads updated to ${cfg.label}`);
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
              backgroundColor: "#ffb24e18",
              border: "1px solid #ffb24e22",
            }}
          >
            <Users size={20} style={{ color: "#ffb24e" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Leads
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "#52525B" }}>
              {loading
                ? "Loading..."
                : `${leads.length} lead${leads.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
        </div>
        <button
          onClick={fetchLeads}
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
      </div>

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
            placeholder="Search name, email, phone, location..."
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
          {STATUS_OPTIONS.map((s) => {
            const active = filters.status === s.value;
            return (
              <button
                key={s.value}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    status: s.value as LeadStatus | "all",
                  }))
                }
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? s.bg : "transparent",
                  color: active ? s.color : "#52525B",
                  border: active
                    ? `1px solid ${s.color}22`
                    : "1px solid transparent",
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
          style={{ backgroundColor: "#111118", border: "1px solid #ffb24e22" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: "#ffb24e22", color: "#ffb24e" }}
            >
              {selected.size}
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "#ffb24e" }}
            >
              selected
            </span>
          </div>
          <div className="h-4 w-px" style={{ backgroundColor: "#27272A" }} />

          <div ref={bulkRef} className="relative">
            <button
              onClick={() => setBulkDropdown((b) => !b)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:opacity-80"
              style={{
                backgroundColor: "#1E1E2E",
                color: "#A1A1AA",
                border: "1px solid #27272A",
              }}
            >
              Change Status
              {bulkDropdown ? (
                <ChevronUp size={11} />
              ) : (
                <ChevronDown size={11} />
              )}
            </button>
            {bulkDropdown && (
              <div
                className="absolute top-full mt-2 left-0 z-30 rounded-xl overflow-hidden py-1"
                style={{
                  backgroundColor: "#0D0D14",
                  border: "1px solid #27272A",
                  minWidth: 155,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                <p
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#52525B" }}
                >
                  Set all to
                </p>
                {STATUS_OPTIONS.filter((s) => s.value !== "all").map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleBulkStatus(s.value as LeadStatus)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-left cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: s.color }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: s.dot }}
                    />
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

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
            gridTemplateColumns: "44px 1.8fr 1.4fr 130px 110px 150px 90px",
            borderBottom: "1px solid #1E1E2E",
          }}
        >
          <button
            onClick={toggleSelectAll}
            className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: allSelected ? "#ffb24e" : "#3F3F46" }}
          >
            {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
          </button>
          {[
            "Name & Date",
            "Contact",
            "Inquiry",
            "Region",
            "Status",
            "Actions",
          ].map((h) => (
            <span
              key={h}
              className="text-[10px] font-bold uppercase tracking-widest text-brand-accent"
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
              style={{ borderColor: "#ffb24e44", borderTopColor: "#ffb24e" }}
            />
            <p className="text-xs" style={{ color: "#52525B" }}>
              Loading leads...
            </p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#1E1E2E" }}
            >
              <Filter size={24} style={{ color: "#3F3F46" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">No leads found</p>
              <p className="text-xs mt-1" style={{ color: "#52525B" }}>
                Try adjusting your filters or search
              </p>
            </div>
          </div>
        ) : (
          leads.map((lead, i) => {
            const isSelected = selected.has(lead.id);
            const isLast = i === leads.length - 1;
            return (
              <div
                key={lead.id}
                className="hidden lg:grid items-center px-5 py-3.5 transition-colors group"
                style={{
                  gridTemplateColumns:
                    "44px 1.8fr 1.4fr 130px 110px 150px 90px",
                  borderBottom: isLast ? "none" : "1px solid #1E1E2E",
                  backgroundColor: isSelected ? "#ffb24e06" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#ffffff03";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    isSelected ? "#ffb24e06" : "transparent";
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleSelect(lead.id)}
                  className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{ color: isSelected ? "#ffb24e" : "#3F3F46" }}
                >
                  {isSelected ? (
                    <CheckSquare size={16} />
                  ) : (
                    <Square size={16} />
                  )}
                </button>

                {/* Name */}
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: "#ffb24e18",
                      color: "#ffb24e",
                      border: "1px solid #ffb24e22",
                    }}
                  >
                    {lead.name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {lead.name}
                    </p>
                    <p
                      className="text-[11px] truncate"
                      style={{ color: "#52525B" }}
                    >
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="min-w-0 pr-4">
                  <p className="text-sm truncate" style={{ color: "#D4D4D8" }}>
                    {lead.email}
                  </p>
                  <p
                    className="text-[11px] truncate mt-0.5"
                    style={{ color: "#52525B" }}
                  >
                    {lead.phone}
                  </p>
                </div>

                {/* Inquiry */}
                <span
                  className="text-xs font-medium truncate pr-2"
                  style={{ color: "#71717A" }}
                >
                  {lead.inquiry || "—"}
                </span>

                {/* Region */}
                <span
                  className="text-xs font-medium truncate pr-2"
                  style={{ color: "#71717A" }}
                >
                  {lead.region || "—"}
                </span>

                {/* Status */}
                <StatusDropdown
                  lead={lead}
                  onSelect={(status) => handleStatusChange(lead, status)}
                />

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setViewing(lead)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: "#1E1E2E", color: "#71717A" }}
                    title="View details"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(lead)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: "#2D0A0A", color: "#F87171" }}
                    title="Delete lead"
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
      {viewing && (
        <LeadDetailModal lead={viewing} onClose={() => setViewing(null)} />
      )}
      {toast && <FeedbackModal toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
