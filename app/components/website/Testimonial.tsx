"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "The level of professionalism and attention to detail during our corporate redesign was unprecedented. They didn't just build a structure; they crafted an environment that truly breathes our brand values.",
    author: "Sarah Jenkins",
    role: "CEO, NexaCorp",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    content:
      "Transforming our heritage site into a modern hub seemed impossible. Their team found solutions where others found excuses. The blend of classic and contemporary is flawless.",
    author: "Marcus Thorne",
    role: "Director, Heritage Lofts",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    content:
      "From the initial consultation to the final reveal, the communication was seamless. They delivered a world-class space that has significantly boosted our team's morale and productivity.",
    author: "Elena Rodriguez",
    role: "Lead Architect, ArchiStudio",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  },
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  // Color Mapping from your theme
  const colors = {
    primary: "#2d2926",
    primaryFg: "#f8f5f2",
    accent: "#ffb24e",
    accentSoft: "#e5d3b3",
    background: "#fff0dd",
    foreground: "#1a1a1a",
    card: "#ffffff",
    border: "#e2e2e2",
  };

  return (
    <section
      style={{ backgroundColor: colors.background }}
      className="relative py-24 px-6 overflow-hidden min-h-[800px] flex items-center"
    >
      {/* Decorative Brand Accent Element */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-10 hidden lg:block"
        style={{ backgroundColor: colors.accent }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Left Side: Visual/Image with Accent Border */}
          <div className="w-full lg:w-5/12 flex items-center justify-center md:px-12">
            <div className="relative group w-full max-w-md lg:max-w-none">
              {/* Image Frame with Brand Primary shadow/border */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ border: `2px solid ${colors.primary}` }}
              />

              <div
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]"
                style={{ backgroundColor: colors.card }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={activeIndex}
                    src={testimonials[activeIndex].image}
                    custom={direction}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.05, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                    alt={testimonials[activeIndex].author}
                  />
                </AnimatePresence>

                {/* Overlay Badge using Brand Primary */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md"
                  style={{ backgroundColor: `${colors.primary}cc` }}
                >
                  <p
                    style={{ color: colors.primaryFg }}
                    className="text-sm font-medium tracking-wide"
                  >
                    Verified Partnership • {testimonials[activeIndex].id + 2024}
                  </p>
                </div>
              </div>

              {/* Decorative Accent Circle */}
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 z-10 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                style={{ backgroundColor: colors.accent }}
              >
                <Quote
                  style={{ color: colors.primary }}
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <div className="mb-10">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.4em] mb-4 px-3 py-1 rounded"
                style={{
                  backgroundColor: colors.accentSoft,
                  color: colors.primary,
                }}
              >
                Testimonials
              </span>
              <h2
                className="text-3xl md:text-5xl font-extrabold leading-tight"
                style={{ color: colors.primary }}
              >
                Real Stories from <br />
                Our Partners.
              </h2>
            </div>

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 100, damping: 20 },
                    opacity: { duration: 0.3 },
                  }}
                  className="lg:absolute inset-0"
                >
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonials[activeIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-current"
                          style={{ color: colors.accent }}
                        />
                      ),
                    )}
                  </div>

                  <blockquote
                    className="text-xl md:text-2xl leading-relaxed font-medium mb-8"
                    style={{ color: colors.foreground }}
                  >
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div
                      className="h-px w-12"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <div>
                      <h4
                        className="text-xl font-bold"
                        style={{ color: colors.primary }}
                      >
                        {testimonials[activeIndex].author}
                      </h4>
                      <p
                        className="text-sm font-semibold opacity-70"
                        style={{ color: colors.primary }}
                      >
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom Navigation Controls */}
            <div className="flex items-center gap-6 mt-16">
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="group w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.primaryFg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="group w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.primaryFg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > activeIndex ? 1 : -1);
                      setActiveIndex(i);
                    }}
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: activeIndex === i ? "40px" : "8px",
                      backgroundColor:
                        activeIndex === i ? colors.accent : colors.accentSoft,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
