"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Leaf, Handshake, ArrowRight } from "lucide-react";

const AboutSectionOne = () => {
  const commitments = [
    {
      title: "Uncompromising Safety",
      description:
        "We believe every worker should return home safely. Our 'Zero Incident' culture is backed by rigorous training and industry-leading safety protocols.",
      icon: <Shield className="text-brand-primary" size={32} />,
    },
    {
      title: "Precision Quality",
      description:
        "Consistency ensures longevity. We utilize advanced digital construction technologies to exceed the complex requirements of luxury infrastructure.",
      icon: <Target className="text-brand-primary" size={32} />,
    },
    {
      title: "Sustainability",
      description:
        "We don't just build for today; we build for the future. Our green building practices minimize environmental impact across every project phase.",
      icon: <Leaf className="text-brand-primary" size={32} />,
    },
    {
      title: "Community Stewardship",
      description:
        "Our culture of giving empowers our employees to support local communities, driving meaningful change through shared purpose.",
      icon: <Handshake className="text-brand-primary" size={32} />,
    },
  ];

  const stats = [
    { label: "Years in Operation", value: "120" },
    { label: "Annual Construction Volume", value: "$9.9B+" },
    { label: "Rank in ENR Top 400", value: "#11" },
  ];

  return (
    <section className="py-24 overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Commitment Grid (Inspired by image_5b2754.png) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[2px] bg-brand-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary/80">
                  Our Commitments
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-brand-primary tracking-tighter">
                We know that every decision has an impact
              </h3>
            </div>
            <p className="text-gray-500 max-w-sm text-xl leading-relaxed font-light">
              Our commitments to safety, quality, sustainability and community
              stewardship ensure your lasting success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#F4CF4F]/10 via-transparent to-transparent" />

                {/* Left Accent Line */}
                <div className="absolute left-0 top-0 h-0 w-[3px] bg-[#F4CF4F] group-hover:h-full transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-8 p-4 w-fit rounded-xl bg-gray-50 group-hover:bg-[#F4CF4F]/10 transition-all duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-md font-bold text-brand-primary mb-4 tracking-tight group-hover:tracking-normal transition-all duration-300">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-500 text-md leading-relaxed font-light mb-6 flex-grow group-hover:text-gray-600 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Bottom Animated Line */}
                  <div className="h-[2px] w-0 bg-gradient-to-r from-[#F4CF4F] to-transparent group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
