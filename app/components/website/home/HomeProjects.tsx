"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Skyline Heights",
    category: "High Rise Buildings",
    description:
      "An iconic high-rise tower offering breathtaking skyline views and ultra-modern amenities.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Palm Residency",
    category: "Luxury Apartments",
    description:
      "Elegant apartments crafted for luxurious urban living with world-class facilities.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Royal Crest Villas",
    category: "Villas",
    description:
      "Exclusive villas designed with private gardens, pools, and premium architecture.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Aurora Towers",
    category: "High Rise Buildings",
    description:
      "A premium high-rise development blending smart living with contemporary design.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Elite Waterfront Residences",
    category: "Luxury Apartments",
    description:
      "Luxury apartments overlooking serene waterfronts with unmatched lifestyle amenities.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Signature Icon Project",
    category: "Special Projects",
    description:
      "A landmark development redefining luxury with innovative architecture and design excellence.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

const HomeProject = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary/80">
                Recent Work
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-primary tracking-tighter leading-[0.95]">
              Take A Look At Our <br />
              <span className="italic font-serif font-light text-brand-accent">
                Latest Projects
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-primary cursor-pointer border-b-2 border-brand-accent pb-2 hover:border-brand-primary transition-all duration-300"
            >
              View All Projects
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-100">
                {/* Reveal Overlay Effect */}
                <motion.div
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.77, 0, 0.175, 1],
                    delay: 0.2,
                  }}
                  style={{ originY: 0 }}
                  className="absolute inset-0 bg-white z-20 pointer-events-none"
                />

                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-brand-primary tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-500">
                    <ArrowUpRight
                      size={16}
                      className="text-brand-primary group-hover:text-brand-accent transition-colors"
                    />
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[90%] font-light">
                  {project.description}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary/40 group-hover:text-brand-primary transition-colors">
                    Get A Quote —
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProject;
