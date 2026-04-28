"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {" "}
        {/* <--- FIXED: Changed ")" to ">" here */}
        {/* Premium Loading Overlay using Brand Primary */}
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none bg-brand-primary"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
