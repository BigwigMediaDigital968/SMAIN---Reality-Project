"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface WorkItem {
  id: number;
  frontTitle: string;
  frontCategory: string;
  frontImage: string;
  backTitle: string;
  backCategory: string;
  backDescription: string;
  backImage: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    frontTitle: "The Obsidian Villa",
    frontCategory: "Luxury Residential",
    frontImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    backTitle: "Interior Elegance",
    backCategory: "Bespoke Finishing",
    backDescription:
      "A masterclass in minimalist luxury, featuring seamless indoor-outdoor integration and custom-quarried Italian marble throughout.",
    backImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    frontTitle: "Skyline Terrace",
    frontCategory: "High Rise",
    frontImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    backTitle: "Structural Prowess",
    backCategory: "Engineering",
    backDescription:
      "Setting a new benchmark for vertical living with advanced seismic dampening and a signature triple-height cantilevered garden.",
    backImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    frontTitle: "The Nexus Plaza",
    frontCategory: "Commercial",
    frontImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    backTitle: "Future Workplace",
    backCategory: "Tech Infrastructure",
    backDescription:
      "A smart-integrated commercial hub designed for fluid collaboration, featuring LEED Platinum sustainability certification.",
    backImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
  },
];

const OurWork = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      {/* Optional Heading Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-[2px] bg-brand-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary/80">
            Portfolio
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-brand-primary tracking-tighter">
          Masterpieces in Motion
        </h2>
      </div>

      {/* Full Width 3-Column Grid with No Gaps */}
      <div className="flex flex-col md:flex-row w-full md:h-[600px]">
        {workItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex-1 h-[420px] md:h-full cursor-pointer overflow-hidden"
          >
            {/* ================= MOBILE VERSION ================= */}
            <div className="md:hidden relative w-full h-full">
              <img
                src={item.frontImage}
                alt={item.frontTitle}
                className="w-full h-full object-cover scale-100 group-active:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-2">
                  {item.frontCategory}
                </p>

                <h3 className="text-2xl font-bold tracking-tight mb-3">
                  {item.frontTitle}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {item.backDescription}
                </p>

                <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] group/btn">
                  View Project
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-active/btn:bg-brand-accent transition">
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              </div>
            </div>

            {/* ================= DESKTOP VERSION ================= */}
            <div className="hidden md:block perspective-1000 h-full">
              <motion.div
                className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                  <img
                    src={item.frontImage}
                    alt={item.frontTitle}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-brand-primary/0 transition duration-500" />

                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-2">
                      {item.frontCategory}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tighter">
                      {item.frontTitle}
                    </h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <img
                    src={item.backImage}
                    alt={item.backTitle}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-brand-primary/85 flex flex-col justify-center p-12 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                      {item.backCategory}
                    </p>

                    <h3 className="text-4xl font-bold tracking-tight mb-6">
                      {item.backTitle}
                    </h3>

                    <div className="w-12 h-[2px] bg-brand-accent mb-6" />

                    <p className="text-white/70 text-lg leading-relaxed max-w-md">
                      {item.backDescription}
                    </p>

                    <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group/btn mt-6">
                      View Project
                      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-brand-accent transition">
                        <ArrowUpRight size={18} />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default OurWork;
