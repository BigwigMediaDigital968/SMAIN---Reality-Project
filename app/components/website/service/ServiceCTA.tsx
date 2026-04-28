"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ServiceCTA = () => {
  return (
    <section className="relative w-full bg-[#f8f9fa] overflow-hidden py-24 md:py-32">
      {/* Geometric Background Elements - Mimicking the uploaded design pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-auto opacity-90 transition-transform duration-1000"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d="M800 0L400 400L800 600V0Z"
            fill="#ffcc33" // Golden Yellow
            fillOpacity="0.6"
          />
          <motion.path
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            d="M600 200L800 500V200H600Z"
            fill="#eeb400" // Deeper Yellow
          />
          <motion.path
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            d="M750 350L800 450V350H750Z"
            fill="#004a2c" // Dark Green accent
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 md:px-36">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-black mb-8 leading-[1.1] tracking-tight"
          >
            Ready to work together?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl"
          >
            Whether you have a complex project in mind or you're looking for a
            reliable construction partner to bring your vision to life, we are
            here to help you build what matters most.
          </motion.p>

          {/* Single Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/contact-us"
              className="group relative inline-flex w-fit items-center  bg-[#004a2c] text-white px-10 py-5 font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#003620] shadow-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Build a Project With Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              {/* Button Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#004a2c] via-[#ffcc33] to-transparent" />
    </section>
  );
};

export default ServiceCTA;
