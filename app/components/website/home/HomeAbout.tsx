"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const HomeAbout = () => {
  const [currentImg, setCurrentImg] = useState(0);

  const projectImages = [
    "/about-image-1.png",
    "/about-image-2.png",
    "/about-image-3.png",
    "/about-image-4.png",
    "/about-image-5.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % projectImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [projectImages.length]);

  const stats = [
    {
      value: "15+",
      label: "Years of Excellence",
      description: "Delivering luxury spaces across the region.",
    },
    {
      value: "500+",
      label: "Premium Units Delivered",
      description: "A track record of high-end construction.",
    },
    {
      value: "#01",
      label: "Luxury Choice",
      description: "Ranked as the preferred builder for elite villas.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Decorative Diagonal Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-full h-[10px] bg-[#ffb24e] rotate-[-45deg] origin-top-right" />
        <div className="absolute top-8 right-0 w-3/4 h-[20px] bg-[#ffb24e] rotate-[-45deg] origin-top-right" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* Left Column: Text Content & Stats Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[2px] bg-[#2d2926]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffb24e]">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-[#2d2926] mb-8 leading-[1.1] tracking-tight"
            >
              Precision Construction in{" "}
              <span className="italic font-serif text-[#ffb24e]">Goa’s</span>{" "}
              finest locations
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-[#2d2926]/70 leading-relaxed text-lg font-light max-w-2xl mb-8"
            >
              <p>
                At{" "}
                <span className="font-bold text-[#2d2926] italic">
                  SMAIN Reality
                </span>
                , we specialize in full-swing construction services for elite
                residential projects. Our unwavering focus is on delivering
                value that transcends traditional building practices.
              </p>
            </motion.div>

            {/* Stats Animated Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 border border-[#2d2926]/5 shadow-xl shadow-[#2d2926]/5 rounded-sm group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb24e] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                  <span className="block text-4xl font-black text-[#2d2926] mb-2 tracking-tighter">
                    {stat.value}
                  </span>
                  <h4 className="text-xs font-bold text-[#ffb24e] uppercase tracking-widest mb-3">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-[#2d2926]/50 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-8">
              <a
                href="/about-us"
                className="inline-flex w-fit group px-10 py-5 bg-[#2d2926] text-[#f8f5f2] font-bold uppercase tracking-widest text-xs hover:bg-[#ffb24e] hover:text-[#2d2926] transition-all duration-500 items-center gap-4 cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                About SMAIN
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Project Image Showcase */}
          <div className="lg:col-span-5 relative min-h-[500px] lg:min-h-full flex items-center">
            <motion.div
              variants={itemVariants}
              className="relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={projectImages[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Overlay Decor */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d2926]/40 via-transparent to-transparent" />

              {/* Image Counter */}
              <div className="absolute bottom-10 left-10 flex gap-2">
                {projectImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[2px] transition-all duration-500 ${i === currentImg ? "w-8 bg-[#ffb24e]" : "w-4 bg-white/30"}`}
                  />
                ))}
              </div>

              {/* Decorative Frame */}
              <div className="absolute top-6 right-6 border border-white/20 w-24 h-24 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-serif italic text-2xl">
                  0{currentImg + 1}
                </span>
              </div>
            </motion.div>

            {/* Background floating accent */}
            <div className="absolute -z-10 -right-20 top-1/2 -translate-y-1/2 w-full h-[80%] border border-[#ffb24e]/20 rounded-full blur-3xl opacity-30" />
          </div>
        </motion.div>
      </div>

      {/* Background Text Overlay */}
      <div className="absolute -bottom-10 left-10 pointer-events-none opacity-[0.03] select-none">
        <span className="text-[25vw] font-black uppercase leading-none tracking-tighter text-[#2d2926]">
          SMAIN
        </span>
      </div>
    </section>
  );
};

export default HomeAbout;
