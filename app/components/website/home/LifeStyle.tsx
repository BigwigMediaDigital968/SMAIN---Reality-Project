"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Compass, Shield, Award, MapPin } from "lucide-react";
import Link from "next/link";

interface LifestyleFeature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const LifeStyle: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Brand color guidelines
  const colors = {
    primary: "#2d2926", // Charcoal
    primaryFg: "#f8f5f2", // Off-white
    accent: "#ffb24e", // Golden Orange Accent
    accentSoft: "#e5d3b3", // Soft Tan
    background: "#fff0dd", // Warm Cream Background
    card: "#ffffff", // Clean White Card
    border: "#e2e2e2", // Delicate border
  };

  const features: LifestyleFeature[] = [
    {
      id: 1,
      icon: <Compass className="w-6 h-6" />,
      title: "Bespoke Spatial Design",
      description:
        "Every estate layout is organically tailored to its natural topography, optimizing solar orientation, microclimates, and panoramic views.",
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6" />,
      title: "Private Sanctuaries",
      description:
        "Intelligent layout zoning and acoustic shielding create an oasis of deep tranquility, preserving your privacy within a luxury compound.",
    },
    {
      id: 3,
      icon: <Award className="w-6 h-6" />,
      title: "Artisanal Execution",
      description:
        "From custom-quarried travertine to raw brass fittings, SMAIN partners with global artisans to handcraft every finish with meticulous precision.",
    },
  ];

  // Motion variants for smooth reveals
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
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
      style={{ backgroundColor: colors.background }}
      className="relative py-24 px-6 overflow-hidden min-h-screen flex items-center font-sans"
    >
      {/* Structural Accent Gradients */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.15] hidden lg:block"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${colors.accentSoft} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Left Column: Immersive Media Grid */}
          <div className="lg:col-span-6 relative flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border-4 border-white/50"
            >
              {/* Primary Luxury Villa Photo */}
              <img
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop"
                alt="SMAIN Luxury Villa Architecture"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d2926]/40 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Floating Card */}
              <div
                className="absolute bottom-6 left-6 p-4 backdrop-blur-md rounded-2xl flex items-center gap-3 border border-white/20"
                style={{ backgroundColor: `${colors.primary}cc` }}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <MapPin size={18} style={{ color: colors.accent }} />
                </div>
                <div>
                  <p
                    style={{ color: colors.primaryFg }}
                    className="text-[10px] font-bold uppercase tracking-widest opacity-60"
                  >
                    Signature Compound
                  </p>
                  <p
                    style={{ color: colors.primaryFg }}
                    className="text-xs font-bold"
                  >
                    The Obsidian Hillside, Malibu
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Overlapping secondary detail frame */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="rounded-2xl overflow-hidden shadow-xl border border-white/30"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop"
                  alt="SMAIN High-End Interior Travertine"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-2xl flex flex-col justify-center border"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <span
                  className="text-3xl font-black italic tracking-tighter"
                  style={{ color: colors.primary }}
                >
                  100%
                </span>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">
                  Bespoke Blueprinting
                </p>
                <p className="text-[10px] text-gray-400 mt-2">
                  Zero pre-built templates. Every design begins from a
                  completely blank canvas.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Copy & Experience Accordion */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-[2px]"
                  style={{ backgroundColor: colors.primary }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: colors.primary }}
                >
                  We build Lifestyle
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black leading-[1.1] mb-6 tracking-tight"
                style={{ color: colors.primary }}
              >
                We Build <br />
                <span className="italic font-serif font-light opacity-65">
                  Lifestyle,
                </span>{" "}
                Not Just Walls.
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                Luxury isn't determined by square footage, but by the flow of
                life within it. SMAIN builds highly customized environments that
                enhance, protect, and celebrate your daily routines.
              </p>
            </motion.div>

            {/* Interactive Features List */}
            <motion.div variants={itemVariants} className="space-y-4 mb-12">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="p-6 rounded-2xl border transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor:
                      hoveredFeature === feature.id
                        ? colors.card
                        : "transparent",
                    borderColor:
                      hoveredFeature === feature.id
                        ? colors.border
                        : "transparent",
                    boxShadow:
                      hoveredFeature === feature.id
                        ? "0 10px 30px -10px rgba(45,41,38,0.05)"
                        : "none",
                  }}
                >
                  <div className="flex gap-5 items-start">
                    <div
                      className="p-3 rounded-xl transition-colors duration-300"
                      style={{
                        backgroundColor:
                          hoveredFeature === feature.id
                            ? colors.primary
                            : colors.accentSoft,
                        color:
                          hoveredFeature === feature.id
                            ? colors.primaryFg
                            : colors.primary,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4
                        className="font-bold text-lg mb-1"
                        style={{ color: colors.primary }}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light max-w-md">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Premium CTA Button */}
            <motion.div variants={itemVariants}>
              <Link
                href="/contact-us"
                className="group relative flex items-center justify-center gap-6 text-white px-10 py-5 rounded-none font-bold uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
                style={{ backgroundColor: colors.primary }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Design Your Luxury Villa Today
                </span>
                <div
                  className="relative z-10 rounded-full p-2 transition-transform duration-500 group-hover:rotate-45"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                  }}
                >
                  <ArrowUpRight size={16} />
                </div>
                {/* Custom Slide Reveal Overlay */}
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: "#3d3733" }}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Abstract Scale watermark to emphasize the SMAIN lifestyle branding */}
      <div
        className="absolute -bottom-10 left-10 pointer-events-none opacity-[0.02] select-none text-[20vw] font-black uppercase tracking-tighter"
        style={{ color: colors.primary }}
      >
        LIFESTYLE
      </div>
    </section>
  );
};

// Export as App for live compatibility with Canvas Preview environment
export default LifeStyle;
