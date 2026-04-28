"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Home, Landmark, Hotel } from "lucide-react";
import Link from "next/link";

interface Specialty {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const specialties: Specialty[] = [
  {
    id: 1,
    category: "Residential Excellence",
    title: "Luxury Villas",
    description:
      "Besoke architectural masterpieces designed for the most discerning homeowners. We blend privacy with panoramic views and sustainable smart-home integration.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
    icon: <Home size={24} className="text-brand-accent" />,
  },
  {
    id: 2,
    category: "Urban Living",
    title: "Luxury Apartments",
    description:
      "High-spec living environments in the heart of the city. Our developments focus on communal wellness, high-end finishing, and structural innovation.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    icon: <Building2 size={24} className="text-brand-accent" />,
  },
  {
    id: 3,
    category: "Corporate Infrastructure",
    title: "Commercial Complexes",
    description:
      "Strategic business hubs engineered for efficiency and scale. We deliver Grade-A office spaces and retail centers that redefine the commercial skyline.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    icon: <Landmark size={24} className="text-brand-accent" />,
  },
  {
    id: 4,
    category: "Engineering Marvels",
    title: "High Rise Buildings",
    description:
      "Pushing the limits of vertical construction. Our sky-high developments feature cutting-edge seismic engineering and sustainable HVAC systems.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200",
    icon: <Hotel size={24} className="text-brand-accent" />,
  },
];

const AboutSectionThree = () => {
  return (
    <section id="work" className="bg-[#f8f9fa] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary/80">
                Where Expertise Meets Impact
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-primary tracking-tighter leading-[1.05]">
              A Comprehensive Set <br /> Of Specialized Services
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-lg leading-relaxed font-light mb-2">
            From healthcare to infrastructure, our expertise spans vital sectors
            driving innovation and delivering results across North America.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {specialties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 h-[500px] lg:h-[600px]"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content Layer */}
              <div className="relative mt-auto p-8 lg:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    {item.category}
                  </span>
                </motion.div>

                <h3 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h3>

                <p className="text-white/70 font-light leading-relaxed mb-8 max-w-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {item.description}
                </p>

                <Link
                  href="/contact"
                  className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group/btn"
                >
                  Explore Project
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-brand-accent group-hover/btn:border-brand-accent transition-all duration-300">
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:text-brand-primary group-hover:scale-150 transition-colors"
                    />
                  </div>
                </Link>
              </div>

              {/* Decorative Corner Accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/0 group-hover:bg-brand-accent/20 transition-colors duration-500"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 border-t border-gray-200 bg-brand-accent flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <span className="text-gray-800 text-xl font-medium">
            Ready to start your next ambitious build?
          </span>
          <Link
            href="/sectors"
            className="bg-brand-primary text-white px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-all duration-500 cursor-pointer"
          >
            View All Specialized Sectors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSectionThree;
