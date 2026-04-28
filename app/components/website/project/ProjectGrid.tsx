"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Maximize2, MapPin, Calendar } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Harbourfront Glass Residence",
    category: "Transformed",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    location: "Sydney, NSW",
    year: "2024",
    size: "wide",
  },
  {
    id: 2,
    title: "Heritage Loft Restoration",
    category: "Renovated",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=1200",
    location: "Melbourne, VIC",
    year: "2023",
    size: "tall",
  },
  {
    id: 3,
    title: "Skyline Luxury Apartments",
    category: "Constructed",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1200",
    location: "Brisbane, QLD",
    year: "2024",
    size: "normal",
  },
  {
    id: 4,
    title: "EcoSmart Industrial Park",
    category: "Rebuilded",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1200",
    location: "Perth, WA",
    year: "2025",
    size: "normal",
  },
  {
    id: 5,
    title: "Urban Mixed-Use Precinct",
    category: "Rebuilded",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    location: "Adelaide, SA",
    year: "2024",
    size: "normal",
  },
  {
    id: 6,
    title: "Coastal Luxury Villa Estate",
    category: "Constructed",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
    location: "Gold Coast, QLD",
    year: "2023",
    size: "wide",
  },
  {
    id: 7,
    title: "Atrium Business Tower",
    category: "Transformed",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    location: "Canberra, ACT",
    year: "2024",
    size: "normal",
  },
];

const categories = [
  "All",
  "Constructed",
  "Renovated",
  "Rebuilded",
  "Transformed",
];

const ProjectGrid = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((p) =>
    filter === "All" ? true : p.category === filter,
  );

  return (
    <section className="py-24 bg-slate-50 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Filter Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-accent mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600">
              A curated selection of our most challenging and rewarding projects
              across North America.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? "bg-brand-accent text-white shadow-lg"
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden bg-white shadow-xl h-[450px] ${
                  project.size === "wide" ? "lg:col-span-2" : ""
                }`}
              >
                {/* Image Component */}
                <div className="absolute inset-0 z-0">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#ffcc33] text-[#004a2c] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                    </motion.div>
                  </div>

                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-3">{project.title}</h3>

                    <div className="flex items-center gap-6 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#ffcc33]" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#ffcc33]" />
                        {project.year}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 hidden group-hover:block animate-in fade-in slide-in-from-bottom-2">
                      <button className="flex items-center gap-2 text-[#ffcc33] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                        View Project <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative border on hover */}
                <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-white/5 transition-all duration-500 pointer-events-none rounded-3xl" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
