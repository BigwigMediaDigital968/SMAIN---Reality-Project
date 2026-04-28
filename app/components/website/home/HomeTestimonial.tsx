"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  project: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexander Sterling",
    role: "Chief Architect",
    company: "Sterling & Co.",
    project: "Atlas Museum",
    content:
      "SMAIN Reality's attention to structural integrity and architectural finesse is unmatched. They didn't just build a museum; they crafted a masterpiece that defines the city's skyline. Their team managed the complex geometry of the Atlas Museum with absolute precision.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Project Director",
    company: "Urban Pulse",
    project: "Axel Towers",
    content:
      "Working with SMAIN on the Axel Towers was a seamless experience. Their commitment to safety and deadlines, combined with their eye for luxury finishing, made them the ideal partner for our flagship residential project.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "CEO",
    company: "Chen Hospitality Group",
    project: "Glass Hotel",
    content:
      "The complexity of the Glass Hotel required a contractor who understood the delicate balance between transparency and strength. SMAIN delivered ahead of schedule, with craftsmanship that exceeded our highest expectations.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  },
];

const HomeTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      filter: "blur(10px)",
    }),
    active: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="bg-[#0A1425] py-24 overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F4CF4F]/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Branding and Stats */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[2px] bg-[#F4CF4F]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F4CF4F]">
                  Success Stories
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-[0.95] mb-12">
                What Our <br />
                <span className="italic font-serif font-light text-white/50">
                  Clients Say
                </span>
              </h2>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Client Retention
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#F4CF4F] mb-2">
                    150+
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Projects Delivered
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Animated Testimonial Card */}
          <div className="lg:col-span-7 relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-16 relative min-h-[500px] flex flex-col justify-center">
              <Quote
                className="absolute top-8 right-8 text-[#F4CF4F] opacity-20"
                size={80}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-[#F4CF4F] text-[#F4CF4F]"
                      />
                    ))}
                  </div>

                  <p className="text-md md:text-xl font-light text-white leading-relaxed italic">
                    "{testimonials[currentIndex].content}"
                  </p>

                  <div className="flex items-center gap-6 pt-8">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover grayscale border-2 border-[#F4CF4F]"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#F4CF4F]">
                        {testimonials[currentIndex].role} —{" "}
                        {testimonials[currentIndex].company}
                      </p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                        Project: {testimonials[currentIndex].project}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex gap-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#F4CF4F] hover:text-[#0A1425] hover:border-[#F4CF4F] transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#F4CF4F] hover:text-[#0A1425] hover:border-[#F4CF4F] transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Pagination Indicators */}
            <div className="mt-8 flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1 transition-all duration-500 cursor-pointer ${
                    currentIndex === idx
                      ? "w-12 bg-[#F4CF4F]"
                      : "w-6 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;
