"use client";
import { motion, Variants } from "framer-motion";
import { Home, ArrowLeft, Building2 } from "lucide-react";
import Navbar from "./components/website/Navbar";
import Footer from "./components/website/Footer";

const NotFound = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const backgroundVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 1, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[#fff0dd] flex flex-col items-center justify-center overflow-hidden px-6 selection:bg-[#ffb24e] selection:text-[#2d2926] py-40">
        {/* Decorative Background Element */}
        <motion.div
          variants={backgroundVariants}
          animate="animate"
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]"
        >
          <span className="text-[60vw] font-black leading-none tracking-tighter text-[#2d2926]">
            404
          </span>
        </motion.div>

        {/* Floating Accent lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[1px] h-32 bg-[#ffb24e]/20" />
          <div className="absolute bottom-[20%] right-[15%] w-48 h-[1px] bg-[#ffb24e]/20" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-2xl"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="p-4 bg-[#2d2926] rounded-sm text-[#ffb24e] shadow-2xl">
              <Building2 size={48} strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[2px] bg-[#2d2926]" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#ffb24e]">
              Page Not Found
            </span>
            <div className="w-8 h-[2px] bg-[#2d2926]" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl font-bold text-[#2d2926] tracking-tighter mb-6 leading-none"
          >
            Lost{" "}
            <span className="font-serif italic text-[#ffb24e]">Blueprint.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#2d2926]/60 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto leading-relaxed"
          >
            The structure you're looking for doesn't exist yet, or the
            foundations have shifted. Let's get you back to familiar ground.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-8 py-4 border-2 border-[#2d2926] text-[#2d2926] font-bold uppercase tracking-widest text-xs hover:bg-[#2d2926] hover:text-[#f8f5f2] transition-all duration-500 flex items-center justify-center gap-2 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Go Back
            </button>

            <a
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-[#2d2926] text-[#f8f5f2] border-2 border-[#2d2926] font-bold uppercase tracking-widest text-xs hover:bg-[#ffb24e] hover:border-[#ffb24e] hover:text-[#2d2926] transition-all duration-500 flex items-center justify-center gap-2 group shadow-xl"
            >
              <Home
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              Return Home
            </a>
          </motion.div>
        </motion.div>

        {/* Footer-style Accent */}
        <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 pointer-events-none">
          <div className="h-px w-24 bg-[#2d2926]/10" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#2d2926]/30">
            SMAIN Reality Construction
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
