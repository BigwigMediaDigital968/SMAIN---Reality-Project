// "use client";

// import { motion, Variants } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const ServiceHero = () => {
//   // We use a high-quality construction process video from a public CDN
//   const videoUrl = "/service-hero-video.mp4";

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut", // Changed from numeric array to string for type safety
//       },
//     },
//   };

//   return (
//     <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video Layer */}
//       <div className="absolute inset-0 z-0">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-full object-cover opacity-60 scale-105 animate-subtle-zoom"
//         >
//           <source src={videoUrl} type="video/mp4" />
//         </video>
//         {/* Overlays for depth and legibility */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
//         <div className="absolute inset-0 bg-black/20" />
//       </div>

//       {/* Content Layer */}
//       <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 text-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="flex flex-col items-center"
//         >
//           <motion.div variants={itemVariants} className="mb-6">
//             <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
//               Our Expertise
//             </span>
//           </motion.div>

//           <motion.h1
//             variants={itemVariants}
//             className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-[1.1]"
//           >
//             Delivering integrated construction{" "}
//             <br className="hidden md:block" />
//             <span className="text-white/60 font-serif italic">
//               services to build lasting success
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={itemVariants}
//             className="max-w-2xl text-white/70 text-base md:text-lg font-light leading-relaxed mb-12"
//           >
//             When you partner with SMAIN, you not only get innovative solutions,
//             you get our fully vested team and a commitment to doing things
//             right. Our relentless focus on success leads to smarter, more
//             collaborative building practices.
//           </motion.p>

//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col sm:flex-row gap-4"
//           >
//             <motion.a
//               href="#service"
//               className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wider uppercase transition-all hover:bg-[#fff0dd] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-white/10"
//             >
//               Explore Services
//               <ArrowRight
//                 size={18}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </motion.a>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Decorative Bottom Element */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 1 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
//       >
//         <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
//           Scroll
//         </span>
//         <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
//       </motion.div>

//       <style>{`
//         @keyframes subtle-zoom {
//           0% { transform: scale(1); }
//           100% { transform: scale(1.1); }
//         }
//         .animate-subtle-zoom {
//           animation: subtle-zoom 20s infinite alternate ease-in-out;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ServiceHero;

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const ServiceHero = () => {
  // Use a high-quality video URL
  const videoUrl = "/service-hero-video.mp4";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a "premium" feel
      },
    },
  };

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 scale-110 animate-slow-pan"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Advanced Overlay System */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-transparent to-neutral-950/40" />
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-[0.85]" /> */}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center justify-center pt-16"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E38B29] animate-pulse" />
              <span className="text-white text-[8px] md:text-xs tracking-[0.4em] uppercase">
                Our Expertise
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9] uppercase"
          >
            Delivering integrated <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic font-serif normal-case">
              construction services
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-white/60 text-base md:text-xl font-light leading-relaxed mb-12 px-4"
          >
            Partnering with SMAIN means more than hiring a contractor. You gain
            a vested team committed to architectural excellence and smarter,
            collaborative building practices that stand the test of time.
          </motion.p>

          {/* Action Button */}
          <motion.div variants={itemVariants}>
            <a
              href="#service"
              className="group relative inline-flex items-center gap-8 bg-[#E38B29] text-white pl-10 pr-3 py-3 rounded-full overflow-hidden transition-all hover:bg-[#ffb24e] hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_-10px_rgba(227,139,41,0.5)]"
            >
              <span className="font-bold text-xs tracking-[0.2em] uppercase">
                Explore Our Services
              </span>
              <div className="bg-white/20 rounded-full p-3 transition-all group-hover:bg-white group-hover:text-[#E38B29]">
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
