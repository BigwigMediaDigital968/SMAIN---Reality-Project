"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";

interface SlideData {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  image: string;
}

const slides: SlideData[] = [
  {
    id: 0,
    label: "Our Values",
    title: "Built on Trust, Innovation & Long-Term Vision",
    subtitle: "CORE PRINCIPLES",
    image: "/smain-reality-images-2.png",
  },
  {
    id: 1,
    label: "Our Projects",
    title: "Transforming Ideas into Scalable Digital Experiences",
    subtitle: "FEATURED WORK",
    image: "/smain-reality-images.png",
  },
  {
    id: 2,
    label: "Latest Insights",
    title: "Stay Ahead with Industry Trends & Expert Insights",
    subtitle: "THOUGHT LEADERSHIP",
    image: "/smain-reality-images-1.png",
  },
];

const AUTO_PLAY_INTERVAL = 4000;

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const step = 100 / (AUTO_PLAY_INTERVAL / 100);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTabClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Scale effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Diagonal Lighting Effect */}
          <motion.div
            initial={{ x: "-100%", skewX: -20 }}
            animate={{ x: "200%", skewX: -20 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-20 h-full max-w-7xl mx-auto flex flex-col justify-center px-6 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block text-sm font-bold tracking-[0.2em] text-white uppercase mb-4"
            >
              {slides[currentSlide].subtitle}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8"
            >
              {slides[currentSlide].title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-white border-b-2 border-brand-accent pb-1">
                Read the story
              </span>
              <ArrowRight className="text-white group-hover:translate-x-2 transition-transform" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Tabs (Left Bottom) */}
      <div className="absolute bottom-12 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-8">
          <div className="flex flex-wrap gap-8 md:gap-12">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleTabClick(index)}
                className="relative flex flex-col items-start group transition-all cursor-pointer"
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider mb-3 transition-colors ${
                    currentSlide === index
                      ? "text-white"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {slide.label}
                </span>

                {/* Progress Bar Container */}
                <div className="relative w-32 md:w-40 h-[2px] bg-white/20">
                  {currentSlide === index && (
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-brand-accent"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  {currentSlide > index && (
                    <div className="absolute top-0 left-0 h-full w-full bg-white/40" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <button
            title="click to pause"
            onClick={() => setIsPaused(!isPaused)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            {isPaused ? (
              <Play size={20} fill="currentColor" />
            ) : (
              <Pause size={20} fill="currentColor" />
            )}
          </button>
        </div>
      </div>

      {/* Right Decorative Diagonal Accent (from design) */}
      <div className="absolute top-0 right-0 w-1/4 h-full pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-[-20%] right-[-10%] w-[150%] h-[140%] bg-brand-accent/20 rotate-[25deg] blur-3xl" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-black/40 to-transparent" />
      </div>
    </section>
  );
}
