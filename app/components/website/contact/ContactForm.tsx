"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

const App = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    inquiry: "",
    region: "",
    firstName: "",
    location: "",
    phone: "",
    email: "",
    description: "",
    newsletter: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-brand-primary transition-all placeholder:text-black/30 text-brand-primary font-medium cursor-pointer";
  const labelClasses =
    "text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1 block";

  return (
    <section
      className="py-24 lg:py-32 min-h-screen"
      style={{ backgroundColor: "#fff0dd" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Side: Header Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-[2px] bg-brand-primary"
                  style={{ backgroundColor: "#1a1a1a" }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">
                  Inquiry Portal
                </span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold text-brand-primary tracking-tighter leading-[0.9] mb-8">
                How can <br />
                we help?
              </h2>
              <p className="text-brand-primary/60 text-lg font-light leading-relaxed max-w-md">
                Whether you're looking to start a landmark project or exploring
                career opportunities, our global network is ready to assist.
              </p>

              <div className="mt-16 pt-16 border-t border-black/5 hidden lg:block">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">
                    Headquarters
                  </span>
                  <span className="text-brand-primary font-medium">
                    100 SMAIN Plaza, Dubai, UAE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form Component */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-brand-primary mb-4 tracking-tighter">
                    Request Received
                  </h3>

                  <button
                    onClick={() => setStatus("idle")}
                    className="text-brand-primary font-bold uppercase tracking-widest text-xs border-b-2 border-brand-accent pb-1"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClasses}>Select Inquiry *</label>
                      <select
                        required
                        className={inputClasses}
                        value={formData.inquiry}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiry: e.target.value })
                        }
                      >
                        <option value="">Choose an option</option>
                        <option value="Residential">Luxury Residential</option>
                        <option value="Commercial">
                          Commercial Construction
                        </option>
                        <option value="Industrial">Heavy Industrial</option>
                        <option value="Careers">Careers</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClasses}>Select Region *</label>
                      <select
                        required
                        className={inputClasses}
                        value={formData.region}
                        onChange={(e) =>
                          setFormData({ ...formData, region: e.target.value })
                        }
                      >
                        <option value="">Select Location</option>
                        <option value="Middle East">Middle East</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="Asia Pacific">Asia Pacific</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>First Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Walter"
                        className={inputClasses}
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Location *</label>
                      <input
                        required
                        type="text"
                        placeholder="Sydney"
                        className={inputClasses}
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className={inputClasses}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@smain.com"
                        className={inputClasses}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Description</label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your project or inquiry..."
                      className={inputClasses + " resize-none"}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      className="mt-1 w-4 h-4 border-gray-300 rounded text-brand-primary focus:ring-brand-primary cursor-pointer"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newsletter: e.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-gray-500 leading-tight"
                    >
                      Sign me up for access to exclusive content and the latest
                      news from SMAIN Reality.
                    </label>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded text-sm">
                      <AlertCircle size={18} />
                      Something went wrong. Please check your connection or try
                      again.
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between gap-6">
                    <p className="text-[10px] text-gray-400 max-w-[240px] uppercase font-bold tracking-widest leading-relaxed">
                      By clicking submit you have read and understood our{" "}
                      <span className="text-brand-accent cursor-pointer underline">
                        Privacy Policy
                      </span>
                      .
                    </p>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group relative flex items-center gap-4 bg-brand-primary text-white pl-8 pr-3 py-4 rounded-full transition-all hover:pr-8 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <span className="font-bold uppercase text-[10px] tracking-[0.2em]">
                        {status === "submitting"
                          ? "Processing..."
                          : "Submit Inquiry"}
                      </span>
                      <div className="bg-white rounded-full p-2 text-brand-primary transition-transform group-hover:translate-x-2">
                        {status === "submitting" ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <ArrowRight size={18} />
                        )}
                      </div>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
