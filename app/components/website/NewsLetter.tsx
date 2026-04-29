"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Loader2,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulating a network request for the premium feel
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // In a real local-only scenario, you might save to an array or localStorage,
    // but here we just transition to the success state.
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="min-h-[600px] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] p-8 md:p-14 lg:p-16 overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.15)] bg-gradient-to-br from-[#F4CF4F] via-[#f7d96a] to-[#e6be3f]"
        >
          {/* Ambient Glow Layers */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          {/* Glass Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* ================= LEFT CONTENT ================= */}
            <div className="space-y-6">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-black/10 backdrop-blur-sm">
                <ShieldCheck size={14} className="text-black" />

                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/80">
                  Exclusive Network
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-black">
                The SMAIN <br />
                <span className="text-black/50 font-light italic">
                  Briefing.
                </span>
              </h2>

              {/* Description */}
              <p className="text-black/60 text-base leading-relaxed max-w-md">
                Join our private network for architectural insights, high-value
                project leads, and curated industry intelligence delivered with
                precision.
              </p>
            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-3xl p-8 text-center bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
                  >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                      <CheckCircle className="text-black" size={26} />
                    </div>

                    <h4 className="text-black font-semibold text-xl mb-2 tracking-tight">
                      Registration Complete
                    </h4>

                    <p className="text-black/50 text-sm">
                      Your access has been granted. Check your inbox.
                    </p>

                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition cursor-pointer"
                    >
                      Submit another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="space-y-5"
                  >
                    {/* Input */}
                    <div className="relative group">
                      <Mail
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-black transition z-10"
                        size={18}
                      />

                      <input
                        required
                        type="email"
                        placeholder="Your professional email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-full py-5 pl-14 pr-6 text-black placeholder:text-black/30 outline-none focus:border-black focus:bg-white/60 transition-all shadow-sm"
                      />
                    </div>

                    {/* CTA Button */}
                    <button
                      disabled={status === "loading"}
                      className="w-full group relative flex items-center justify-center gap-3 py-5 rounded-full bg-black text-white font-bold uppercase text-[10px] tracking-[0.25em] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      <span className="relative z-10">
                        {status === "loading"
                          ? "Processing..."
                          : "Join The Network"}
                      </span>

                      <div className="relative z-10">
                        {status === "loading" ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        )}
                      </div>

                      {/* Button Glow */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                    </button>

                    {/* Footer Note */}
                    <p className="text-center text-[11px] text-black/50 uppercase tracking-[0.15em] mt-4">
                      No noise. No clutter. Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetter;
