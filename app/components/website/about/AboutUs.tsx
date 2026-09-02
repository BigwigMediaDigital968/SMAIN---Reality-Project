"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Compass,
  Eye,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Milestone {
  number: string;
  label: string;
}

const AboutUs: React.FC = () => {
  // SMAIN Reality Signature Color Palette
  const colors = {
    primary: "#2d2926", // Charcoal
    heroBg: "#fff0dd", // Dark Hero Background for Transparent Navbar
    primaryFg: "#f8f5f2", // Off-white
    accent: "#ffb24e", // Golden Orange Accent
    accentSoft: "#e5d3b3", // Soft Tan
    background: "#fff0dd", // Warm Cream Background
    foreground: "#1a1a1a", // Dark text
    card: "#ffffff", // Clean White Card
    border: "#e2e2e2", // Subtle border
  };

  const milestones: Milestone[] = [
    { number: "2015", label: "Year Established" },
    { number: "100%", label: "Luxury Focused" },
    { number: "10+", label: "Years of Excellence" },
  ];

  const coreValues = [
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality & Craftsmanship",
      description:
        "Combining distinctive architecture, quality craftsmanship, and timeless appeal in every detail.",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Prime Locations",
      description:
        "Developments situated in carefully selected destinations with strong lifestyle and investment potential.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Transparency & Trust",
      description:
        "Driven by high standards, innovation, and unwavering commitment from planning through delivery.",
    },
  ];

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const scrollToContact = () => {
    window.location.href = "/contact-us";
  };

  return (
    <div className="w-full font-sans overflow-hidden">
      {/* ================= HERO SECTION (DARK SHADED FOR TRANSPARENT NAVBAR) ================= */}
      <section
        style={{ backgroundColor: colors.heroBg }}
        className="relative pt-32 pb-10 lg:pt-40 px-6 text-white overflow-hidden"
      >
        {/* Dark Gradient Overlay for optimal transparent navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Decorative Radial Gold Accent */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Column: Heading & Core Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-[2px]"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-[0.3em]"
                    style={{ color: colors.accent }}
                  >
                    About SMAIN Reality
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white">
                  Creating Exceptional <br />
                  <span
                    className="italic font-serif font-light"
                    style={{ color: colors.accentSoft }}
                  >
                    Spaces Since 2015
                  </span>
                </h1>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-5 text-white font-light text-base sm:text-lg leading-relaxed"
              >
                <p>
                  Established in 2015, we are a real estate development company
                  focused on the luxury real estate segment. Over the years, we
                  have built our expertise around creating thoughtfully designed
                  developments that combine distinctive architecture, quality
                  craftsmanship, modern functionality, and timeless appeal.
                </p>
                <p>
                  Our portfolio encompasses luxury villas and premium apartments
                  located in carefully selected destinations with strong
                  lifestyle and investment potential.
                </p>
                <p>
                  We believe that luxury is not simply about design. it is about
                  the experience, quality, attention to detail, and value that a
                  property offers. From concept and planning to construction and
                  delivery, we are committed to maintaining high standards at
                  every stage of development.
                </p>
              </motion.div>

              {/* Call-to-Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="pt-4 flex flex-wrap items-center gap-5"
              >
                <button
                  onClick={scrollToContact}
                  className="group relative flex items-center justify-center gap-4 text-gray-900 px-8 py-4 rounded-none font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
                  style={{ backgroundColor: colors.accent }}
                >
                  <span className="relative z-10 font-black">
                    Contact Our Team
                  </span>
                  <div
                    className="relative z-10 rounded-full p-1.5 transition-transform duration-500 group-hover:rotate-45"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.accent,
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Right Column: Visual Composition */}
            <div className="lg:col-span-5 relative">
              <motion.div variants={itemVariants} className="relative z-10">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                    alt="SMAIN Modern Luxury Real Estate Architecture"
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 p-5 backdrop-blur-md bg-black/60 rounded-2xl border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                          Uncompromising Standard
                        </p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          Custom Architecture & Craft
                        </p>
                      </div>
                      <Sparkles size={20} style={{ color: colors.accent }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN CONTENT SECTION (WARM CREAM BACKGROUND) ================= */}
      <section
        style={{ backgroundColor: colors.background }}
        className="relative py-20 px-6 text-gray-900 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-20 lg:space-y-24"
          >
            {/* Stats Banner */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl border shadow-xl"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 border-b sm:border-b-0 sm:border-r last:border-none border-gray-100"
                >
                  <p
                    className="text-3xl sm:text-4xl font-black italic"
                    style={{ color: colors.primary }}
                  >
                    {m.number}
                  </p>
                  <p className="text-xs uppercase font-semibold text-gray-500 mt-2 tracking-widest">
                    {m.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Vision & Values Section */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left: Our Vision Card */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-5 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  <div
                    className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/10 text-[#ffb24e]">
                      <Eye size={24} />
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ color: colors.accentSoft }}
                    >
                      Strategic Direction
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light text-base">
                    To become a trusted and distinguished name in luxury real
                    estate development by creating exceptional spaces that
                    elevate lifestyles and deliver lasting value.
                  </p>
                </motion.div>

                {/* Right: Core Values Cards */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-7 space-y-4"
                >
                  <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-6">
                    What Sets Us Apart
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {coreValues.map((val, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl border bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        style={{ borderColor: colors.border }}
                      >
                        <div
                          className="p-3 rounded-xl w-fit mb-4"
                          style={{
                            backgroundColor: colors.background,
                            color: colors.primary,
                          }}
                        >
                          {val.icon}
                        </div>
                        <h4
                          className="font-bold text-sm mb-2"
                          style={{ color: colors.primary }}
                        >
                          {val.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-light">
                          {val.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Banner CTA */}
            <motion.div
              variants={itemVariants}
              className="p-10 sm:p-14 rounded-3xl text-center flex flex-col items-center justify-center space-y-6 border"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <h3
                className="text-2xl sm:text-4xl font-black tracking-tight"
                style={{ color: colors.primary }}
              >
                Ready to Discover Your Next Enduring Asset?
              </h3>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl font-light">
                Connect with our advisory team to discuss private viewings,
                custom villa blueprints, or high-yield real estate investments.
              </p>
              <button
                onClick={scrollToContact}
                className="group flex items-center gap-3 text-white px-10 py-5 rounded-none font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
                style={{ backgroundColor: colors.primary }}
              >
                <span>Get in Touch with SMAIN</span>
                <ArrowUpRight
                  size={16}
                  className="text-[#ffb24e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
