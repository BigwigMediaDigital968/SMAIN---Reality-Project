"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hammer, HardHat, Home, Sparkles } from "lucide-react";

const ProjectHero = () => {
  const { scrollY } = useScroll();

  // Parallax offsets for background and foreground elements
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const categories = [
    { icon: <Home className="w-5 h-5" />, label: "Constructed" },
    { icon: <Hammer className="w-5 h-5" />, label: "Renovated" },
    { icon: <HardHat className="w-5 h-5" />, label: "Rebuilded" },
    { icon: <Sparkles className="w-5 h-5" />, label: "Transformed" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#004a2c] text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#004a2c]/80 via-transparent to-[#004a2c]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 md:pt-36 pt-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1 border border-[#ffcc33] text-[#ffcc33] text-xs tracking-widest uppercase mb-6"
            >
              Our Portfolio
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Legacy in <br />
              <span className="text-[#ffcc33]">Every Beam.</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
              From historic renovations to modern architectural wonders, explore
              how we turn blueprints into monuments of excellence.
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full hover:bg-[#ffcc33] hover:text-[#004a2c] transition-all cursor-default border border-white/10"
                >
                  {cat.icon}
                  <span className="font-semibold text-sm">{cat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Composition */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Main Featured Image Box */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="absolute top-0 right-0 w-[85%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                alt="Modern skyscraper"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-500" />
            </motion.div>

            {/* Floating Secondary Image (Transformation Focus) */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute bottom-0 left-0 w-[60%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ffcc33]/30"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                alt="Interior renovation"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#ffcc33] text-[#004a2c] px-3 py-1 rounded text-xs font-bold uppercase">
                Transformed
              </div>
            </motion.div>

            {/* Floating Stats/Badge */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[40%] right-[-20px] bg-white text-[#004a2c] p-6 rounded-2xl shadow-xl z-20 hidden md:block"
            >
              <div className="text-3xl font-black italic">500+</div>
              <div className="text-[10px] tracking-widest font-bold uppercase opacity-60">
                Completed Projects
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
