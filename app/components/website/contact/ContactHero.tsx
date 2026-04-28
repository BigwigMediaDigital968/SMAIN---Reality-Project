"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative min-h-screen w-full bg-brand-primary overflow-hidden flex flex-col justify-end">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/smain-reality-images-4.png"
          alt="Contact SMAIN"
          className="w-full h-full object-cover transition-all duration-1000"
        />
        {/* Brand Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 via-brand-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent" />
      </div>

      {/* Decorative Accent (Yellow Line) */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "200px" }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-0 right-12 lg:right-24 w-[2px] bg-brand-accent hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-8"
            >
              <a
                href="/"
                className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-accent transition-colors"
              >
                Home
              </a>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                Contact Us
              </span>
            </motion.div>

            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-brand-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent">
                  Get In Touch
                </span>
              </div>

              <h1 className="text-3xl md:text-7xl font-bold text-white leading-[0.9] mb-8">
                Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                  Legacy
                </span>{" "}
                With Us.
              </h1>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:pb-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/60 text-lg lg:text-xl font-light leading-relaxed max-w-sm"
            >
              Connect with our specialized teams to discuss your vision, from
              luxury residential builds to large-scale infrastructure.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none whitespace-nowrap">
        <span className="text-[25vw] font-black uppercase text-white tracking-tighter">
          SMAIN
        </span>
      </div>
    </section>
  );
};

export default ContactHero;
