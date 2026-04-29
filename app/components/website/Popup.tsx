"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const INQUIRY_OPTIONS = [
  { value: "Residential", label: "Luxury Residential" },
  { value: "Commercial", label: "Commercial Construction" },
  { value: "Industrial", label: "Heavy Industrial" },
  { value: "Careers", label: "Careers" },
];

const REGION_OPTIONS = [
  { value: "Middle East", label: "Middle East" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "Asia Pacific", label: "Asia Pacific" },
];

const inputClass =
  "w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#f28c28] transition-colors placeholder-gray-400 text-gray-800 text-sm";

const labelClass =
  "text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 block";

export default function ModalPopup({ isOpen, onClose }: Props) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    inquiry: "",
    region: "",
    description: "",
    source: "pop-up",
    newsletter: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          inquiry: formData.inquiry,
          region: formData.region,
          description: formData.description,
          newsletter: formData.newsletter,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleClose() {
    onClose();
    // Reset after animation finishes
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        inquiry: "",
        region: "",
        description: "",
        source: "pop-up",
        newsletter: false,
      });
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 32 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 32 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-orange-50"
              style={{ border: "1px solid #f28c2833", color: "#f28c28" }}
            >
              <X size={16} />
            </button>

            {/* ── LEFT: Form ── */}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="mb-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f28c28] mb-2">
                  Inquiry Portal
                </p>
                <h2 className="text-3xl font-bold text-[#2d2926] leading-tight">
                  Get In Touch
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {/* ── Success state ── */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: "#f0fdf4" }}
                    >
                      <CheckCircle2 size={32} style={{ color: "#22c55e" }} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-[#2d2926] mb-2">
                        Request Received!
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                        Thank you for reaching out. Our team will get back to
                        you within 24 hours.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-6 px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all hover:opacity-80"
                        style={{ backgroundColor: "#f28c28", color: "#fff" }}
                      >
                        Close
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {/* ── Form state ── */}
                {status !== "success" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 flex-1"
                  >
                    {/* Row 1: Name + Phone */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Walter"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone *</label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 2: Email + Location */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Location</label>
                        <input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Dubai, UAE"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 3: Inquiry + Region */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Inquiry Type</label>
                        <select
                          name="inquiry"
                          value={formData.inquiry}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select type</option>
                          {INQUIRY_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Region</label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select region</option>
                          {REGION_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Tell us about your project or inquiry..."
                        className={inputClass + " resize-none"}
                      />
                    </div>

                    {/* Newsletter */}
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 rounded accent-[#f28c28] cursor-pointer"
                      />
                      <span className="text-xs text-gray-400 leading-snug">
                        Sign me up for exclusive content and latest news from
                        SMAIN Reality.
                      </span>
                    </label>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
                          style={{
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            color: "#dc2626",
                          }}
                        >
                          <AlertCircle size={16} className="flex-shrink-0" />
                          <span>
                            {errorMsg ||
                              "Something went wrong. Please try again."}
                          </span>
                          <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="ml-auto cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-relaxed">
                        By submitting you agree to our{" "}
                        <span
                          className="underline cursor-pointer"
                          style={{ color: "#f28c28" }}
                        >
                          Privacy Policy
                        </span>
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group flex items-center gap-3 pl-6 pr-3 py-3 rounded-full font-bold text-[11px] uppercase tracking-widest text-white cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        style={{ backgroundColor: "#f28c28" }}
                      >
                        {status === "submitting"
                          ? "Submitting..."
                          : "Enquire Now"}
                        <span
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center transition-transform group-hover:translate-x-1"
                          style={{ color: "#f28c28" }}
                        >
                          {status === "submitting" ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <ArrowRight size={14} />
                          )}
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Image ── */}
            <div className="hidden md:block relative">
              <img
                src="/smain-reality-images-3.png"
                alt="SMAIN Reality"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(45,41,38,0.6) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                  Headquarters
                </p>
                <p className="text-white font-semibold text-sm">
                  100 SMAIN Plaza, Dubai, UAE
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
