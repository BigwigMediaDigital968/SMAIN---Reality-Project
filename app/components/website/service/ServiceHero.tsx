"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ServiceHero = () => {
  // We use a high-quality construction process video from a public CDN
  const videoUrl = "/smain-reality-hero-video.mp4";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        ease: "easeOut", // Changed from numeric array to string for type safety
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105 animate-subtle-zoom"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Overlays for depth and legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              Our Expertise
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-[1.1]"
          >
            Delivering integrated construction{" "}
            <br className="hidden md:block" />
            <span className="text-white/60 font-serif italic">
              services to build lasting success
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-white/70 text-base md:text-lg font-light leading-relaxed mb-12"
          >
            When you partner with SMAIN, you not only get innovative solutions,
            you get our fully vested team and a commitment to doing things
            right. Our relentless focus on success leads to smarter, more
            collaborative building practices.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#service"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wider uppercase transition-all hover:bg-[#fff0dd] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-white/10"
            >
              Explore Services
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>

      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ServiceHero;
