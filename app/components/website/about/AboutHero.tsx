"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Award, Users, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const AboutHero = () => {
  const stats = [
    {
      label: "Years of Excellence",
      value: "25+",
      icon: <ShieldCheck size={20} className="text-[#F4CF4F]" />,
    },
    {
      label: "Luxury Projects",
      value: "450+",
      icon: <Award size={20} className="text-[#F4CF4F]" />,
    },
    {
      label: "Expert Professionals",
      value: "1.2k",
      icon: <Users size={20} className="text-[#F4CF4F]" />,
    },
    {
      label: "Annual Volume",
      value: "$4.2B",
      icon: <Zap size={20} className="text-[#F4CF4F]" />,
    },
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col pt-24 lg:pt-32 bg-white overflow-hidden">
      {/* Primary Background Image with Parallax-ready feel */}
      {/* <div className="absolute inset-0 z-0">
        <img
          src="/smain-reality-images-4.png"
          alt="Architectural Detail"
          className="w-full h-full object-cover opacity-5"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-transparent" />
      </div> */}

      {/* Background Blueprint Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      {/* Decorative Brand Accent (Yellow Triangle/Polygon like PCL/Clark) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F4CF4F]/5 -skew-x-12 translate-x-20 hidden lg:block z-1" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Side: Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-primary/60">
                Who We Are
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-7xl font-bold text-brand-primary tracking-tighter leading-[0.85] mb-10"
            >
              SMAIN <br />
              <span className="text-gray-300 italic font-light">
                Luxury Living.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xl"
            >
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light mb-8">
                Building the backbone of modern luxury. From high-rise
                residential towers to complex civil infrastructure, we redefine
                the skyline with precision and purpose.
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <Link
                  href="#timeline"
                  className="bg-brand-primary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F4CF4F] hover:text-brand-primary transition-all duration-300 cursor-pointer"
                >
                  Our Legacy
                </Link>
                <Link
                  href="#work"
                  className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-primary group cursor-pointer hover:border-amber-900 hover:border px-10 py-5"
                >
                  Explore Work
                  <ArrowDown
                    size={16}
                    className="group-hover:translate-y-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image/Visual (Industrial Perspective) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] overflow-hidden shadow-2xl"
            >
              <img
                src="/smain-image.png"
                alt="Construction Site High Rise"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-xl border-l-4 border-[#F4CF4F]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Current Feature
                </p>
                <p className="text-brand-primary font-bold text-lg tracking-tight">
                  Johns Hopkins Bloomberg Center
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 py-10 border-t border-gray-200">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#F4CF4F]/10 via-transparent to-transparent" />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#F4CF4F] group-hover:w-full transition-all duration-500" />

              <div className="relative z-10 space-y-4">
                {/* Icon + Value */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#F4CF4F]/10 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>

                  <span className="text-3xl lg:text-5xl font-bold text-brand-primary tracking-tight">
                    {stat.value}
                  </span>
                </div>

                {/* Label */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
