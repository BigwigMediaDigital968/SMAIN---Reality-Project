"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

const Navbar = () => {
  const pathname = usePathname(); // Get current route
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > lastScrollY) {
  //       setShowTopBar(false);
  //     } else {
  //       setShowTopBar(true);
  //     }
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about-us",
      submenu: [],
    },
    // {
    //   name: "Our Work",
    //   href: "/work",
    //   submenu: [],
    // },
    { name: "Service", href: "/service" },
    { name: "Projects", href: "/projects" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <motion.nav
      animate={{ y: showTopBar ? 0 : -40 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-[100]"
    >
      {/* Top Utility Bar */}
      {/* <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: showTopBar ? 0 : -50,
          opacity: showTopBar ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-md border-b border-gray-100 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-10 flex justify-end items-center gap-6">
          <Link
            href="/contact-us"
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
              pathname === "/contact-us"
                ? "text-brand-accent"
                : "text-brand-primary/60 hover:text-brand-primary"
            }`}
          >
            Contact Us
          </Link>
          <button className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/60 hover:text-brand-primary transition-colors cursor-pointer">
            Offices
          </button>
        </div>
      </motion.div> */}

      {/* Main Navbar */}
      <div className="bg-white relative shadow-sm">
        <div className="max-w-7xl mx-auto pl-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 bg-brand-primary overflow-hidden flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-brand-accent/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="text-white font-serif text-xl font-bold italic">
                S
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none text-brand-primary uppercase italic">
                SMAIN
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] leading-none text-brand-accent uppercase mt-1">
                Reality
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-end space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    setActiveSubmenu(
                      link.submenu && link.submenu.length > 0
                        ? link.name
                        : null,
                    )
                  }
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-[15px] font-medium uppercase tracking-widest transition-colors flex items-center gap-1 relative ${
                      isActive
                        ? "text-brand-accent"
                        : "text-brand-primary hover:text-brand-accent"
                    }`}
                  >
                    {link.name}

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent"
                      />
                    )}

                    {link.submenu && link.submenu.length > 0 && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${activeSubmenu === link.name ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {activeSubmenu === link.name &&
                      link.submenu &&
                      link.submenu.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-64 bg-[#0A1425] shadow-2xl z-[110]"
                        >
                          <div className="flex flex-col py-4">
                            {link.submenu.map((item) => (
                              <motion.a
                                key={item}
                                href="#"
                                whileHover={{ x: 10 }}
                                className="px-8 py-3 text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest"
                              >
                                {item}
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <Search size={20} className="text-brand-primary" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary p-2 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[80%] h-full bg-[#0A1425] shadow-2xl lg:hidden z-[120] flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-white/10">
                <span className="text-white font-black italic tracking-tighter">
                  SMAIN
                </span>
                <X
                  size={24}
                  className="text-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="flex-1 overflow-y-auto py-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.name} className="px-8 py-4">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl font-bold uppercase tracking-tighter block mb-2 ${
                          isActive ? "text-brand-accent" : "text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                      {link.submenu && link.submenu.length > 0 && (
                        <div className="pl-4 mt-2 space-y-3 border-l border-brand-accent/30">
                          {link.submenu.map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="block text-sm text-white/50 hover:text-brand-accent uppercase tracking-widest"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-8 bg-brand-primary">
                <button className="w-full flex items-center justify-between text-white font-bold uppercase tracking-widest text-xs cursor-pointer">
                  Request a Viewing <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
