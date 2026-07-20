"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";




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

const HomeProject = ({
  properties
}: {

  properties: any
}) => {
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

          {/* <motion.div
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
          </motion.div> */}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {properties.map((project: any) => (

            <Link
              href={`/property/${project.slug}`} // Added a leading slash to ensure clean routing
              className="block"
            >
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[1/1] overflow-hidden mb-5 bg-gray-100">
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
                    src={project.propertyImages?.[0] || "/placeholder-property.jpg"} // Safely access image array
                    alt={project.propertyName}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                    <span className="bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm w-fit">
                      {project.propertyType}
                    </span>
                    {project.listingType && (
                      <span className="bg-brand-primary text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest shadow-sm w-fit">
                        For {project.listingType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {/* Property Name & Action Arrow */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-brand-primary tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                        {project.propertyName}
                      </h3>

                      {/* Location Vector Indicator */}
                      <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <MapPin size={14} className="text-brand-primary/60 shrink-0" />
                        <span className="text-xs font-medium tracking-wide capitalize">
                          {project.subArea ? `${project.subArea}, ` : ""}
                          {project.location?.replace("-", " ") || "North Goa"}
                        </span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-500">
                      <ArrowUpRight
                        size={16}
                        className="text-brand-primary group-hover:text-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Dynamic Description Fallback */}
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[95%] font-light line-clamp-2">
                    {project.description || project.propertyDetails?.replace(/<[^>]*>/g, '')}
                  </p>

                  {/* Price Grid & Valuation */}
                  <div className="pt-1 flex items-center justify-between border-t border-gray-100 mt-2">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Valuation</p>
                      <div className="flex items-center text-base font-extrabold text-brand-primary">
                        <IndianRupee size={14} className="mr-0.5" />
                        <span>{project.price || "Price on Request"}</span>
                      </div>
                    </div>

                    <div className="self-end pb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary/40 group-hover:text-brand-primary transition-colors">
                        Get A Quote —
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProject;
