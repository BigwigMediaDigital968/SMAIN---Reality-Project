"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LuxuryReveal from "../../LuxuryReveal";
import Link from "next/link";

interface ProjectCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  imageUrl: string;
}

const HomeWhatWeDo = () => {
  const categories: ProjectCategory[] = [
    {
      id: "vill",
      label: "Villas",
      title: "Connecting communities through quality",
      description:
        "Our civil infrastructure team specializes in complex projects that move people and resources. We focus on longevity, safety, and modern engineering practices to build the backbone of the city.",
      imageUrl: "/project-image-7.jpg",
    },
    {
      id: "apartments",
      label: "Luxury Aparthments",
      title: "Powerful solutions for industry",
      description:
        "From manufacturing plants to energy facilities, our industrial division provides robust construction services that meet stringent technical requirements and safety standards.",
      imageUrl: "/home-image-3.png",
    },
    // {
    //   id: "buildings",
    //   label: "Buildings",
    //   title: "Stunning structures, sustainably built",
    //   description:
    //     "SMAIN's network of construction professionals rise to the challenges associated with a diverse buildings portfolio, bringing added value to every educational, institutional, residential and commercial construction project.",
    //   imageUrl: "/smain-image-6.png",
    // },
    {
      id: "special",
      label: "Special Projects",
      title: "Unique visions, tailored execution",
      description:
        "Every vision is unique. Our special projects team handles bespoke builds and complex renovations that require a high degree of craftsmanship and technical innovation.",
      imageUrl: "project-image-1.jpg",
    },
  ];

  const [activeTab, setActiveTab] = useState(categories[0]);

  const slideVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    enter: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  const imageVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.4 } },
  };

  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
              What We Do
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-primary tracking-tight max-w-4xl">
            We have a vision for the future of construction.
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-8 md:gap-12 mb-16 border-b border-gray-100 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat)}
              className={`relative pb-4 text-sm font-bold uppercase tracking-widest cursor-pointer transition-colors duration-300 ${
                activeTab.id === cat.id
                  ? "text-brand-primary"
                  : "text-gray-400 hover:text-brand-primary"
              }`}
            >
              {cat.label}
              {activeTab.id === cat.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-7 h-[400px] md:h-[600px] overflow-hidden bg-gray-100 rounded-sm">
            <AnimatePresence mode="wait">
              <LuxuryReveal>
                <motion.img
                  key={activeTab.id}
                  src={activeTab.imageUrl}
                  alt={activeTab.label}
                  variants={imageVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="w-full h-full object-cover"
                />
              </LuxuryReveal>
            </AnimatePresence>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                variants={slideVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="space-y-8"
              >
                <h3 className="text-4xl lg:text-5xl font-bold text-brand-primary leading-tight tracking-tight">
                  {activeTab.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  {activeTab.description}
                </p>

                <div className="pt-4">
                  <Link
                    href="/contact-us"
                    className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary cursor-pointer"
                  >
                    <span className="relative">
                      Learn More
                      <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-brand-accent group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWhatWeDo;
