"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const currentProjects = [
  {
    id: "#001",
    title: "Luxury Villa Construction, Goa",
    img: "/project-image-5.jpg",
  },
  {
    id: "#002",
    title: "Premium Apartment Development, Goa",
    img: "/project-image-6.jpg",
  },
  {
    id: "#003",
    title: "High-Rise Residential Buildings, Goa",
    img: "/smain-image-5.png",
  },
  {
    id: "#004",
    title: "Beachside Luxury Villas, Goa",
    img: "/project-image-3.jpg",
  },
  {
    id: "#005",
    title: "Modern Gated Community Projects, Goa",
    img: "/project-image-4.jpg",
  },
];

const OngoingProjects = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal translation
  // We move from 0% to -80% (since there are 5 items, we want to show the last one)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  // Smooth the progress bar scaling
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div>
      {/* Spacer Header */}
      <header className="h-[40vh] flex flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-12 bg-[#ffb24e]"></div>
            <span className="uppercase tracking-[0.3em] text-sm font-semibold text-[#2d2926]/70">
              Current Portfolio
            </span>
            <div className="h-[1px] w-12 bg-[#ffb24e]"></div>
          </div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-[#2d2926] leading-[0.9]">
            Architecting <br />{" "}
            <span className="text-[#ffb24e]">Tomorrow.</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-[#2d2926]/60 max-w-xl mx-auto font-light">
            A curated glimpse into our ongoing developments, where engineering
            excellence meets visionary design.
          </p>
        </motion.div>
      </header>

      {/* Main Scroll Container */}
      <section ref={targetRef} className="relative h-[800vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.ul style={{ x }} className="flex gap-4">
            {currentProjects.map((item) => (
              <li
                key={item.id}
                className="group relative flex h-[100vh] w-[100vw] md:w-[80vw] flex-col items-center justify-center flex-shrink-0"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 premium-card">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-[60vh] w-[80vw] md:h-[450px] md:w-[1000px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tighter font-outfit mb-2">
                    {item.id}
                  </h3>
                  <p className="text-md md:text-xl font-light text-gray-400 font-poppins">
                    {item.title}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-12 left-10 right-10 h-[4px] bg-[#f26522] z-50 origin-left rounded-full shadow-[0_0_15px_rgba(242,101,34,0.5)]"
        style={{ scaleX }}
      />

      {/* Footer Spacer */}
      {/* <footer className="h-[40vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-500 font-poppins">
          Driving digital excellence across <br />
          <span className="text-[#f26522] font-semibold">
            diverse market sectors.
          </span>
        </p>
      </footer> */}
    </div>
  );
};

export default OngoingProjects;
