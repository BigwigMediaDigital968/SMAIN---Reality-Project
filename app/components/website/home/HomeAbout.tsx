"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const HomeAbout = () => {
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
        delayChildren: 0.3,
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
    <section className="relative py-24 overflow-hidden">
      {/* Decorative Diagonal Accent (Matches HomeSlider style) */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-brand-accent rotate-[-45deg] origin-top-right" />
        <div className="absolute top-8 right-0 w-3/4 h-[1px] bg-brand-accent rotate-[-45deg] origin-top-right" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
        >
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-brand-primary leading-[1.1] mb-10 tracking-tight"
            >
              When we focus on <span className="italic">mutual success</span>,
              everyone wins.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-gray-600 leading-relaxed text-lg font-light max-w-2xl"
            >
              <p>
                At{" "}
                <span className="font-bold text-brand-primary italic">
                  SMAIN Reality
                </span>
                , we specialize in full-swing construction services for elite
                residential projects. Our unwavering focus is on delivering
                value that transcends traditional building practices, ensuring
                every square foot reflects precision and luxury.
              </p>
              <p>
                As a premier developer and contractor, we collaborate with
                visionary architects to turn complex blueprints into
                breathtaking realities. From advanced digital construction
                technologies to innovative sustainable materials, we lead the
                industry by crafting lasting legacies for our clients and
                partners.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12">
              <Link
                href="/about-us"
                className="inline-flex w-fit group px-8 py-4 border-2 border-brand-primary text-brand-primary font-bold uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all duration-500 items-center gap-3"
              >
                About SMAIN
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Statistics */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative pl-0 lg:pl-12"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-4xl lg:text-6xl font-black text-brand-primary tracking-tighter">
                    {stat.value}
                  </span>
                  <div className="h-px flex-1 bg-gray-100 group-hover:bg-brand-accent/30 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary uppercase tracking-tight mb-2">
                  {stat.label}
                </h4>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-xs">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Text Overlay */}
      <div className="absolute -bottom-10 right-10 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[20vw] font-black uppercase leading-none tracking-tighter">
          SMAIN
        </span>
      </div>
    </section>
  );
};

export default HomeAbout;
