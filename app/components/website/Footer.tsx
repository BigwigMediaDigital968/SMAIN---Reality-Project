"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";
import ModalPopup from "./Popup";
import Link from "next/link";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const links = {
    navigation: [
      { name: "Contact", href: "/contact-us" },
      { name: "Know about us", href: "/about-us" },
      { name: "Explore Projects", href: "/projects" },
      { name: "Services", href: "/service" },
    ],
    socials: [
      { icon: <FaSquareXTwitter size={18} />, href: "#", name: "X" },
      { icon: <FaFacebook size={18} />, href: "#", name: "Facebook" },
      { icon: <FaInstagram size={18} />, href: "#", name: "Instagram" },
      { icon: <FaLinkedin size={18} />, href: "#", name: "LinkedIn" },
    ],
    policies: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  };

  return (
    <>
      <footer className="text-white bg-brand-primary pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Branding & Navigation Section (Inspired by Dribbble/Clark styles) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-16 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <h2 className="text-3xl font-black tracking-tighter mb-1">
                SMAIN
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-yellow-500">
                Luxury Living
              </p>
            </motion.div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {links.navigation.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              {links.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Action & Vision Section */}
          <div className="hidden lg:grid grid-cols-2 gap-16 py-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
                Building the future of <br />
                <span className="italic font-serif font-light text-gray-500">
                  high-end construction.
                </span>
              </h3>
              <p className="text-gray-400 font-light max-w-md leading-relaxed">
                We focus on mutual success where everyone wins. Our commitment
                to unparalleled craftsmanship ensures your vision becomes a
                landmark.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={() => setOpen(true)}
                className="group relative flex items-center justify-center gap-3 bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 cursor-pointer"
              >
                Get A Quote
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
              <Link
                href="/service"
                className="flex items-center justify-center gap-3 border border-white/20 hover:border-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Policies & Rights Section */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              © {currentYear} SMAIN REALITY. ALL RIGHTS RESERVED.
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {links.policies.map((policy) => (
                <a
                  key={policy.name}
                  href={policy.href}
                  className="group flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                >
                  {policy.name}
                  <ChevronRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <ModalPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Footer;
