"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Slide {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}

const slides: Slide[] = [
  {
    id: 0,
    subtitle: "Corporate Responsibility",
    title: "Building meaningful change within our communities.",
    description:
      "At SMAIN, building what matters goes beyond delivering world-class structures. We are committed to fostering diversity, local economic growth, and educational partnerships that empower the next generation of builders.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200",
    accentColor: "#F4CF4F",
  },
  {
    id: 1,
    subtitle: "Water Infrastructure",
    title: "Building water resiliency for the future.",
    description:
      "We tackle complex civil engineering challenges to ensure sustainable resource management. From treatment facilities to massive aqueduct systems, our infrastructure secures vital resources for millions.",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
    accentColor: "#F4CF4F",
  },
  {
    id: 2,
    subtitle: "Innovation & Tech",
    title: "The future of construction is digital.",
    description:
      "Leveraging VR, 4D modeling, and autonomous site monitoring, we bring a level of precision to luxury construction that was previously impossible. We don't just build; we engineer intelligence.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    accentColor: "#F4CF4F",
  },
];

const AboutSectionTwo = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // Updated to 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] lg:h-[80vh] bg-white overflow-hidden flex flex-col lg:flex-row">
      {/* Visual Side (Left on Desktop) */}
      <div className="relative w-full lg:w-1/2 h-[450px] lg:h-full overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].imageUrl}
              alt={slides[current].title}
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Square Dot Navigation - Placed over the image */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 transition-all duration-300 cursor-pointer ${
                current === i
                  ? "bg-[#F4CF4F] rotate-45 scale-110 shadow-[0_0_15px_rgba(244,207,79,0.5)]"
                  : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Brand Accent Overlay */}
        <div
          className="absolute top-0 right-0 w-24 h-24 lg:w-48 lg:h-48 z-10 hidden lg:block"
          style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            backgroundColor: slides[current].accentColor,
          }}
        />
      </div>

      {/* Content Side (Right on Desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 lg:px-20 lg:py-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[2px] bg-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary/80">
                {slides[current].subtitle}
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-brand-primary tracking-tighter leading-[1.1] mb-8">
              {slides[current].title}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed font-light mb-10">
              {slides[current].description}
            </p>

            <Link
              href="/contact-us"
              className="bg-brand-primary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F4CF4F] hover:text-brand-primary transition-all duration-500 shadow-lg shadow-black/5"
            >
              Learn More
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
