"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import ModalPopup from "./Popup";

type NavbarProps = {
  isScrolled?: boolean;
};

const Navbar = ({ isScrolled: customScrolled }: NavbarProps) => {
  const pathname = usePathname(); // Get current route
  const [isOpen, setIsOpen] = useState(false);
  const [isModalopen, setISModalopen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const [showTopBar, setShowTopBar] = useState(true);
  // const [isScrolled, setIsScrolled] = useState( forceScrolled || false);
  const [scrollState, setScrollState] = useState(false);


  // const navLinks = [
  //   { name: "Home", href: "/" },
  //   {
  //     name: "About Us",
  //     href: "/about-us",
  //     submenu: [],
  //   },
  //   { name: "Service", href: "/service" },
  //   { name: "Projects", href: "/projects" },
  //   { name: "Contact Us", href: "/contact-us" },
  // ];

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Home For Sale",
      href: "#",
      submenu: [
        { name: "Villas in North Goa", href: "/villas-in-north-goa" },
        { name: "Villas in South Goa", href: "/villas-in-south-goa" },
      ],
    },
    { name: "Completed Homes", href: "#" },
    {
      name: "About Us",
      href: "#",
      submenu: [],
    },
    {
      name: "Contact Us",
      href: "/contact-us",
      submenu: [],
    },
  ];

   useEffect(() => {
    const handleScroll = () => {
      setScrollState(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    const isScrolled = customScrolled ?? scrollState;

  const textColor = isScrolled ? "text-brand-primary" : "text-white";

  return (
    <>
    
          
    <motion.nav
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255,255,255,1)"
          : "rgba(255,255,255,0)",
        boxShadow: isScrolled
          ? "0 2px 10px rgba(0,0,0,0.08)"
          : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-[100]"
    >
      {/* Main Navbar */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="h-[50px] w-auto">
             <img src="/smain-realty-blue.png" alt="" className={`h-full w-auto object-contain ${isScrolled?"":"filter brightness-0 invert"}`} />
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
                    className={`px-3 py-2 text-[15px] font-medium uppercase tracking-widest transition-colors flex items-center gap-1 relative ${isActive
                        ? "text-brand-accent"
                        : `${textColor} hover:text-brand-accent`
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
                                key={item.name}
                                href={item.href}
                                whileHover={{ x: 10 }}
                                className="px-8 py-3 text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest"
                              >
                                {item.name}
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              );
            })}

            <button
            onClick={()=>setISModalopen(true)}
              className={`cursor-pointer ml-4 px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${isScrolled
                  ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-accent"
                  : "bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-brand-accent hover:text-white"
                }`}
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled?"text-[#0A1425]":"text-white"} p-2 focus:outline-none cursor-pointer`}
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
                  SMAIN Realty
                </span>
                <X
                  size={24}
                  className={`text-white cursor-pointer`}
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
                        className={`text-xl font-bold uppercase tracking-tighter block mb-2 ${isActive ? "text-brand-accent" : "text-white"
                          }`}
                      >
                        {link.name}
                      </Link>
                      {link.submenu && link.submenu.length > 0 && (
                        <div className="pl-4 mt-2 space-y-3 border-l border-brand-accent/30">
                          {link.submenu.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block text-sm text-white/50 hover:text-brand-accent uppercase tracking-widest"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-8 bg-brand-primary">
                <button
                  onClick={() => {setIsOpen(false); setISModalopen(true);}}
                  className="w-full cursor-pointer flex items-center justify-between text-white font-bold uppercase tracking-widest text-xs cursor-pointer"
                >
                  Enquire Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
    <ModalPopup isOpen={isModalopen} onClose={() => setISModalopen(false)} />
    
    </>
  );
};

export default Navbar;
