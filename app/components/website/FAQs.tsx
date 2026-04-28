"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/app/data/faqData";

interface FAQsProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

const FAQAccordion = ({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border-b border-gray-200 transition-colors duration-300 ${isOpen ? "bg-white" : "bg-white/50"}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 px-4 md:px-6 text-left focus:outline-none cursor-pointer"
      >
        <span
          className={`text-md font-medium transition-colors duration-300 ${isOpen ? "text-[#004a2c]" : "text-gray-900"}`}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`p-1 rounded-full ${isOpen ? "bg-brand-accent text-white" : "bg-gray-100 text-gray-500"}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-4 md:px-6 text-gray-600 leading-relaxed max-w-3xl">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQs: React.FC<FAQsProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our luxury construction process and services.",
  items,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[#004a2c] font-bold uppercase tracking-[0.2em] text-xs mb-4"
            >
              <HelpCircle className="w-4 h-4 text-[#ffcc33]" />
              <span>Got Questions?</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 max-w-xl mx-auto"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Accordion List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="border-t border-gray-200"
          >
            {items.map((faq, index) => (
              <FAQAccordion
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          {/* Footer Contact Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 mb-6">Still have questions?</p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 font-bold text-[#004a2c] hover:text-[#ffcc33] transition-colors group"
            >
              Contact Our Support Team
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                &rarr;
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
