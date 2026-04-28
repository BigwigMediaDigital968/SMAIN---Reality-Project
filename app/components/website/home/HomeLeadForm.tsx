"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Building2,
  HardHat,
  Hammer,
  Ruler,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  MapPin,
  Globe,
} from "lucide-react";

const HomeLeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    location: "",
    service: "Luxury Apartment",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const services = ["Luxury Apartment", "Commercial", "Villa", "Renovation"];

  const countryCodes = [
    { code: "+91", label: "IN" },
    { code: "+1", label: "US" },
    { code: "+44", label: "UK" },
    { code: "+971", label: "UAE" },
    { code: "+61", label: "AU" },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden relative">
      {/* Interactive Background Elements (Stickers/Icons) */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[5%] text-brand-primary/10 hidden lg:block"
      >
        <Ruler size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[5%] text-brand-primary/10 hidden lg:block"
      >
        <Building2 size={150} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Copy and Context */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-[#F4CF4F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">
                Get a Blueprint
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Let's Build Your <br />
              <span className="italic font-serif font-light text-gray-400">
                Next Masterpiece
              </span>
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md font-light">
              Ready to start your next construction project? Tell us about your
              vision and our experts will provide a customized consultation and
              estimate.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <HardHat className="text-[#F4CF4F]" />,
                  text: "Expert Consultation",
                },
                {
                  icon: <Hammer className="text-[#F4CF4F]" />,
                  text: "Quality Craftsmanship",
                },
                {
                  icon: <PhoneCall className="text-[#F4CF4F]" />,
                  text: "24/7 Project Support",
                },
              ].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest text-brand-primary">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-brand-primary p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden">
              {/* Subtle Blueprint Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:border-[#F4CF4F] outline-none transition-all"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:border-[#F4CF4F] outline-none transition-all"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone with Country Code */}
                    <div className="space-y-3">
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-white/60 ml-1">
                        Phone Number
                      </label>

                      <div className="flex gap-3 w-full">
                        {/* Select */}
                        <div className="relative w-[95px] shrink-0">
                          <select
                            className="appearance-none w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-4 text-white text-sm pr-8 outline-none focus:border-[#F4CF4F] focus:ring-2 focus:ring-[#F4CF4F]/30 transition-all cursor-pointer"
                            value={formData.countryCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                countryCode: e.target.value,
                              })
                            }
                          >
                            {countryCodes.map((c) => (
                              <option
                                key={c.code}
                                value={c.code}
                                className="bg-brand-primary text-white"
                              >
                                {c.label} ({c.code})
                              </option>
                            ))}
                          </select>

                          {/* Proper Arrow Alignment */}
                          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">
                            ▼
                          </div>
                        </div>

                        {/* Input */}
                        <input
                          required
                          type="tel"
                          placeholder="Enter phone number"
                          className="flex-1 min-w-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/30 focus:border-[#F4CF4F] focus:ring-2 focus:ring-[#F4CF4F]/30 outline-none transition-all"
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-white/60 ml-1">
                        Project Location
                      </label>

                      <div className="relative group">
                        <input
                          required
                          type="text"
                          placeholder="City, Country"
                          className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:border-[#F4CF4F] focus:ring-2 focus:ring-[#F4CF4F]/30 outline-none transition-all"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">
                      Select Service
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, service: s })
                          }
                          className={`py-3 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all cursor-pointer ${
                            formData.service === s
                              ? "bg-[#F4CF4F] text-brand-primary"
                              : "bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project goals..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:border-[#F4CF4F] outline-none transition-all resize-none"
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-[#F4CF4F] hover:bg-white text-brand-primary py-5 rounded-lg font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl cursor-pointer"
                  >
                    Send Request
                    <Send
                      size={16}
                      className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 py-20 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-[#F4CF4F] rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} className="text-brand-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    Project Received!
                  </h3>
                  <p className="text-white/60 font-light max-w-xs mb-8 leading-relaxed">
                    Thanks{" "}
                    <span className="text-[#F4CF4F] font-bold">
                      {formData.name}
                    </span>
                    ! Our construction experts are reviewing your request for{" "}
                    <span className="text-white">{formData.location}</span> and
                    will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="flex items-center gap-2 text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                  >
                    Submit another request <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLeadForm;
