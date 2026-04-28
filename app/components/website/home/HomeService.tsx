"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: "light" | "dark" | "accent";
  index: number;
  link: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  variant,
  index,
  link,
}: ServiceProps) => {
  const bgColor = {
    light: "bg-white border border-gray-100",
    dark: "bg-[#0A1425] text-white",
    accent: "bg-[#F4CF4F] text-[#0A1425]", // Brand Yellow from design
  };

  const titleColor = {
    light: "text-brand-primary",
    dark: "text-white",
    accent: "text-brand-primary",
  };

  const descColor = {
    light: "text-gray-500",
    dark: "text-white/60",
    accent: "text-brand-primary/70",
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`relative p-10 lg:p-14 flex flex-col items-start min-h-[450px] group transition-transform duration-500 hover:-translate-y-2 ${bgColor[variant]}`}
    >
      <div className="mb-10 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>

      <h3
        className={`text-3xl lg:text-4xl font-bold leading-tight mb-6 tracking-tight ${titleColor[variant]}`}
      >
        {title}
      </h3>

      <p
        className={`text-sm lg:text-base leading-relaxed mb-10 max-w-[280px] font-medium ${descColor[variant]}`}
      >
        {description}
      </p>

      <div className="mt-auto">
        <Link
          href={link}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest group/btn`}
        >
          Learn More
          <ArrowRight
            size={16}
            className="group-hover/btn:translate-x-2 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
};

const HomeService = () => {
  const services = [
    {
      title: "New Construction",
      description:
        "Our team of experienced professionals specializes in designing and building new luxury residential properties.",
      variant: "light" as const,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 44H44"
            stroke="#0A1425"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M8 44V12L24 4L40 12V44"
            stroke="#0A1425"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path d="M16 24H20V28H16V24Z" stroke="#0A1425" strokeWidth="2" />
          <path d="M28 24H32V28H28V24Z" stroke="#0A1425" strokeWidth="2" />
          <path d="M16 34H20V38H16V34Z" stroke="#0A1425" strokeWidth="2" />
          <path d="M28 34H32V38H28V34Z" stroke="#0A1425" strokeWidth="2" />
        </svg>
      ),
      link: "/contact",
    },
    {
      title: "Commercial Construction",
      description:
        "Our expertise extends to commercial construction projects as well. From office buildings to retail spaces.",
      variant: "dark" as const,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 44H44"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M8 44V8H24V44"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M24 16H40V44"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path d="M14 14H18" stroke="white" strokeWidth="2" />
          <path d="M14 22H18" stroke="white" strokeWidth="2" />
          <path d="M14 30H18" stroke="white" strokeWidth="2" />
          <path d="M30 24H34" stroke="white" strokeWidth="2" />
          <path d="M30 32H34" stroke="white" strokeWidth="2" />
        </svg>
      ),
      link: "/contact",
    },
    {
      title: "Renovation & Remodeling",
      description:
        "Transform your existing space into something new and functional with our comprehensive remodeling services.",
      variant: "accent" as const,
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
            stroke="#0A1425"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M24 4V44" stroke="#0A1425" strokeWidth="2" />
          <path d="M42 14L24 24L6 14" stroke="#0A1425" strokeWidth="2" />
          <path
            d="M24 24V44"
            stroke="#0A1425"
            strokeWidth="2"
            className="opacity-0"
          />{" "}
          {/* Logic spacer */}
        </svg>
      ),
      link: "/contact",
    },
  ];

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="mb-5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
              Our Service
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-primary tracking-tighter leading-[0.9]">
            A Comprehensive Set Of
            <br />
            Construction Services
          </h2>
          <div className="w-full h-px bg-gray-100 mt-12" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeService;
