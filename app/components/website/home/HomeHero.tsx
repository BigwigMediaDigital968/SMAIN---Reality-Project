"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ModalPopup from "../Popup";
import Link from "next/link";

const HomeHero = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen pt-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[calc(100vh-80px)]">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 z-10 py-12 lg:py-0 px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-brand-primary uppercase">
                Where your best <br />
                <span className="inline-block text-brand-primary">
                  next home awaits
                </span>
              </h1>

              <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-light">
                Turning aspirations into tangible outcomes is the essence of
                bringing visions to life.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {/* Primary CTA */}
                <button
                  onClick={() => setOpen(true)}
                  className="group flex items-center gap-4 bg-brand-primary text-white pl-8 pr-3 py-3 rounded-full hover:bg-[#ffb24e] transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <span className="font-medium">Book A Free Call</span>
                  <div className="bg-white rounded-full p-2.5 transition-transform group-hover:rotate-[-45deg]">
                    <ArrowRight size={20} className="text-brand-primary" />
                  </div>
                </button>

                {/* Secondary CTA */}
                <Link
                  href="/serices"
                  className="px-8 py-3 flex items-center rounded-full border border-brand-primary text-brand-primary font-medium hover:bg-brand-primary hover:text-white transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-[80vh] mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative"
            >
              {/* The Building Image */}
              <div
                className="absolute inset-0 bg-cover bg-center rounded-bl-[100px] lg:rounded-bl-[200px]"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
                }}
              >
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-bl-[100px] lg:rounded-bl-[200px]" />
              </div>

              {/* Accent Elements */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "120px" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-6 right-20 w-3 bg-brand-accent hidden lg:block"
              />
            </motion.div>
          </div>
        </div>

        {/* Background Decorative Text */}
        <div className="absolute bottom-10 left-12 pointer-events-none opacity-[0.03] select-none hidden lg:block">
          <span className="text-[15vw] font-bold uppercase whitespace-nowrap">
            Architecture
          </span>
        </div>
      </section>

      <ModalPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HomeHero;
