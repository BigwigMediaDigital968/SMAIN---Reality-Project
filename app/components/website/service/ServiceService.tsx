"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Shaping Modern Australian Living",
    content:
      "At SMAIN Reality, we design and deliver spaces that reflect the evolving lifestyle of Australia. From luxury apartments to bespoke villas, our focus is on creating communities that combine architectural excellence, sustainability, and long-term value. Every project is built to enhance the way people live, invest, and grow.",
    image: "/smain-image-7.png",
  },
  {
    id: 2,
    title: "Precision & Quality Commitment",
    content:
      "Quality is embedded in every stage of our construction process. Our teams follow strict Australian standards, ensuring structural integrity, premium finishes, and long-lasting performance. From initial planning to final delivery, we maintain complete transparency, attention to detail, and a commitment to exceeding client expectations.",
    image: "/quality-control-image.png",
  },
  {
    id: 3,
    title: "Smart & Sustainable Construction",
    content:
      "We integrate smart building practices and sustainable design principles to deliver efficient, future-ready developments. By adopting modern construction techniques and energy-conscious solutions, we reduce waste, optimise timelines, and ensure our projects meet the environmental expectations of today’s Australian market.",
    image: "/smain-reality-images-4.png",
  },
  {
    id: 4,
    title: "Data-Driven Project Delivery",
    content:
      "Through advanced project tracking and real-time insights, we ensure every development runs with precision and clarity. Our data-driven approach enables better decision-making, improved efficiency, and proactive problem-solving—delivering projects on time, within budget, and to the highest standards.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
  },
];

const ServiceService = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide functionality (optional, can be disabled)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="service"
      className="py-20 px-6 md:px-12 lg:px-24 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-gray-400" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
              Services for Your Success
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-black max-w-3xl">
            Delivering Value Beyond Construction
          </h2>
          <p className="text-black/60 text-md max-w-xl mt-5">
            Whatever the complexity, we apply proven methods to deliver spaces
            that elevate your vision and stand the test of time.
          </p>
        </div>

        {/* Main Interactive Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          {/* Left Side: Animated Image Container */}
          <div className="lg:col-span-7 relative h-[300px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={slides[activeIndex].image}
                alt={slides[activeIndex].title}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Right Side: Content and Vertical Navigation */}
          <div className="lg:col-span-5 flex relative">
            <div className="flex-1 pr-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-black">
                    {slides[activeIndex].title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {slides[activeIndex].content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Vertical Pagination Dots */}
            <div className="flex flex-col gap-4 items-center justify-center border-l border-gray-100 pl-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative group p-2 focus:outline-none cursor-pointer"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-[#004a2c] scale-125"
                        : "bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  />
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 border border-[#004a2c] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Optional: Navigation Numbers / Footer Info */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-gray-400">
          <span>SMAIN INTEGRATED SOLUTIONS</span>
          <span>
            0{activeIndex + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServiceService;
