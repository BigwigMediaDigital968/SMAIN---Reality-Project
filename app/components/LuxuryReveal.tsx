"use client";
import { motion } from "framer-motion";

export default function LuxuryReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden group h-full w-full">
      {/* Reveal overlay */}
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-0 z-10 bg-brand-primary"
      />

      {/* Content wrapper FIXED */}
      <motion.div
        className="h-full w-full" // ✅ THIS IS THE FIX
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
