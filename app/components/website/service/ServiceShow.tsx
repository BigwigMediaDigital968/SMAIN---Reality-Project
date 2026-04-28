"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Home,
  Landmark,
  Construction,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const projects = [
  {
    id: "luxury-villas",
    title: "Luxury Villas",
    description:
      "Bespoke residential estates designed for ultimate privacy and architectural grandeur.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    services: [
      "Site Preparation",
      "Custom Foundations",
      "Smart Home Integration",
      "Landscape Engineering",
    ],
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: "luxury-apartments",
    title: "Luxury Apartments",
    description:
      "Modern urban living spaces combining premium materials with efficient spatial planning.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop",
    services: [
      "Interior Fit-outs",
      "Acoustic Engineering",
      "Sustainable HVAC",
      "Premium Finishes",
    ],
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    id: "high-rise",
    title: "High Rise Buildings",
    description:
      "Engineering excellence for the skyline, focusing on safety, scale, and iconic design.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    services: [
      "Structural Steel Work",
      "Vertical Logistics",
      "Seismic Reinforcement",
      "Glass Curtain Walls",
    ],
    icon: <Building2 className="w-6 h-6" />,
  },
];

const ServiceShow = () => {
  const [activeTab, setActiveTab] = useState(projects[0].id);

  const activeProject = projects.find((p) => p.id === activeTab) || projects[0];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-36">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              <Construction className="w-5 h-5" />
              <span>Our Portfolio & Expertise</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Mastering the Art of{" "}
              <span className="text-brand-accent">Luxury Construction</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-800 md:max-w-xs text-sm leading-relaxed"
          >
            From soaring skylines to private sanctuaries, we deliver specialized
            construction solutions tailored to each architectural typology.
          </motion.p>
        </div>

        {/* Desktop Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs (Left side) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`group relative flex items-center gap-6 p-6 transition-all duration-500 border-l-4 cursor-pointer ${
                  activeTab === project.id
                    ? "border-brand-accent bg-gray-50"
                    : "border-transparent hover:bg-gray-50/50 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                }`}
              >
                <div
                  className={`p-3 rounded-full transition-colors ${
                    activeTab === project.id
                      ? "bg-brand-accent text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {project.icon}
                </div>
                <div className="text-left">
                  <h3
                    className={`font-bold text-lg transition-colors ${
                      activeTab === project.id
                        ? "text-[#004a2c]"
                        : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Specialized Construction
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Content Display (Right side) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8 bg-white"
              >
                {/* Image Showcase */}
                <div className="relative group overflow-hidden h-[400px] md:h-[500px]">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <a
                      href="#contact-us"
                      className="text-white flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
                    >
                      View Details <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex flex-col justify-center">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">
                    {activeProject.title} Services
                  </h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {activeProject.description} Our approach integrates advanced
                    BIM modeling and precision execution to ensure structural
                    integrity and aesthetic perfection.
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {activeProject.services.map((service, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={service}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#ffcc33]" />
                        <span className="font-medium">{service}</span>
                      </motion.div>
                    ))}
                  </div>

                  <a
                    href="/contact-us"
                    className="inline-flex items-center justify-center bg-brand-accent text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#ffcc33] hover:text-black transition-all duration-300 w-full md:w-max"
                  >
                    Discuss Your Project
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShow;
