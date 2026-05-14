"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Sofa,
  Home,
  Sprout,
  Waves,
  UserCheck,
  ShieldCheck,
  Settings,
  Users,
  Droplets,
  Zap,
  Key,
  ClipboardCheck,
} from "lucide-react";

interface HighlightItem {
  icon: React.ReactNode;
  title: string;
}

const highlightData: HighlightItem[] = [
  {
    icon: <Home size={32} />,
    title: "Bespoke Residential & Commercial Builds",
  },
  {
    icon: <ClipboardCheck size={32} />,
    title: "Comprehensive Project Execution",
  },
  { icon: <Settings size={32} />, title: "Turnkey Design & Build Solutions" },
  {
    icon: <ShieldCheck size={32} />,
    title: "Strict Quality & Safety Standards",
  },
  { icon: <Users size={32} />, title: "Skilled Architects & Engineers" },
  { icon: <Sofa size={32} />, title: "Premium Interior Finishes" },
  { icon: <Sprout size={32} />, title: "Eco-Friendly Construction Methods" },
  { icon: <Droplets size={32} />, title: "Smart Water Management Systems" },
  { icon: <Zap size={32} />, title: "Advanced Electrical Infrastructure" },
  { icon: <Waves size={32} />, title: "Robust Structural Engineering" },
  { icon: <UserCheck size={32} />, title: "Client-Centric Approach" },
  { icon: <Key size={32} />, title: "Timely & Transparent Delivery" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Highlights: React.FC = () => {
  return (
    <section className="py-24 bg-white backdrop-blur-sm w-full">
      <div className="max-w-7xl mx-auto px-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif italic text-[#2d2926]/80 mb-20"
        >
          Service <span className="text-[#ffb24e]">Highlights</span>
        </motion.h2>

        {/* Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-8 text-center"
        >
          {highlightData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center group cursor-default"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#ffb24e] text-[#2d2926] flex items-center justify-center mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[#ffb24e]/20 group-hover:shadow-2xl">
                {item.icon}
              </div>

              {/* Item Title */}
              <h4 className="text-sm md:text-base font-medium text-[#2d2926] leading-snug px-2 transition-colors duration-300 group-hover:text-[#ffb24e]">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center md:justify-end"
        >
          <button
            className="px-10 py-4 bg-gradient-to-r from-[#2d2926] to-[#453e39] text-[#ffb24e] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-bold uppercase tracking-widest text-sm flex items-center gap-2 group"
            onClick={() => (window.location.href = "/projects")}
          >
            <span>Know More</span>
            <div className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Highlights;
