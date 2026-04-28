"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import ModalPopup from "./Popup";

const PremiumCTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative w-full py-24 overflow-hidden bg-brand-primary">
        {/* Background Image with Parallax-like scaling */}
        <motion.div
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400"
            alt="Premium Architecture"
            className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary to-transparent" />
        </motion.div>

        {/* Decorative Brand Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-transparent to-transparent opacity-50" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "150px" }}
          className="absolute top-0 right-10 w-[1px] bg-brand-accent hidden lg:block"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Main Content Side */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-brand-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent">
                    Next Step
                  </span>
                </div>

                <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-10">
                  Let’s build <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">
                    extraordinary.
                  </span>
                </h2>

                <p className="text-white/60 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-12">
                  Whether it's a bespoke luxury villa or a towering commercial
                  landmark, we have the precision and vision to bring your most
                  ambitious ideas to life.
                </p>

                <div className="flex flex-wrap gap-6">
                  <motion.a
                    href="/contact-us"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-8 bg-brand-accent text-brand-primary px-8 py-4 rounded-none font-bold uppercase tracking-[0.2em] text-[11px] overflow-hidden"
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <div className="relative z-10 bg-brand-primary rounded-full p-2 group-hover:rotate-[-45deg] transition-transform duration-500">
                      <ArrowRight size={18} className="text-white" />
                    </div>
                    {/* Hover Slide Effect */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </motion.a>

                  <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-4 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-brand-primary transition-all duration-500 cursor-pointer"
                  >
                    Request Brochure
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Contact Details / Stats Side */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 lg:p-12 relative overflow-hidden"
              >
                {/* Decorative Corner */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />

                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-10 border-b border-white/10 pb-6">
                  Global Headquarters
                </h4>

                <div className="space-y-8">
                  <div className="flex gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-500 text-brand-accent">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                        Call Us
                      </p>
                      <p className="text-white font-medium text-lg">
                        +1 (800) 555-0199
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-500 text-brand-accent">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                        Email Us
                      </p>
                      <p className="text-white font-medium text-lg">
                        hello@smain.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-500 text-brand-accent">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                        Visit Us
                      </p>
                      <p className="text-white font-medium text-lg">
                        7th Ave, New York, NY
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Large Watermark Background Text */}
        <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.02] select-none">
          <span className="text-[30vw] font-black uppercase text-white leading-none">
            CONTACT
          </span>
        </div>
      </section>

      <ModalPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default PremiumCTA;
