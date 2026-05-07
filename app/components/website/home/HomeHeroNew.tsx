"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import ModalPopup from "../Popup";

const Link = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const HomeHeroNew = () => {
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const brandPrimary = "#E38B29";
  const brandSecondary = "#ffb24e";

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isMuted) {
      video.muted = true;
    } else {
      video.muted = false;
    }
  }, [isMuted]);

  return (
    <>
      <section className="relative overflow-hidden min-h-screen text-white">
        {/* ================= BACKGROUND VIDEO ================= */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.05]"
            style={{
              filter: "brightness(0.6) contrast(1.08)",
            }}
          >
            <source src="/goa-beach-house.mp4" type="video/mp4" />
          </video>

          {/* Golden Glow */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 20% 40%, rgba(227,139,41,0.35) 0%, transparent 45%)",
            }}
          />

          {/* Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 w-full min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-32 pb-20">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              {/* LEFT CONTENT */}
              <div className="max-w-4xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 backdrop-blur-xl border"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: brandPrimary,
                    }}
                  />
                  <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-white/70">
                    Luxury Interior & Architecture
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[2.9rem] md:text-[3.5rem] font-bold leading-[0.95] tracking-[-0.04em]"
                >
                  Designing Spaces That
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${brandPrimary} 0%, ${brandSecondary} 100%)`,
                    }}
                  >
                    Inspire Living
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 1,
                  }}
                  className="mt-8 text-base sm:text-lg lg:text-xl leading-relaxed text-white/70 max-w-2xl font-light"
                >
                  From modern residences to timeless architectural masterpieces,
                  we create refined environments that combine elegance,
                  functionality, and emotional connection.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.7,
                  }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  {/* Primary Button */}
                  <button
                    onClick={() => setOpen(true)}
                    className="group relative overflow-hidden flex items-center gap-4 rounded-full pl-7 pr-3 py-3.5 font-semibold transition-all duration-500 hover:scale-[1.03] cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${brandPrimary} 0%, ${brandSecondary} 100%)`,
                      boxShadow: "0 18px 50px rgba(227,139,41,0.28)",
                    }}
                  >
                    <span className="uppercase tracking-[0.14em] text-[12px] text-black">
                      Book Free Consultation
                    </span>

                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                      <ArrowRight size={18} className="text-white" />
                    </div>
                  </button>

                  {/* Secondary */}
                  <Link
                    href="/service"
                    className="px-7 py-3.5 rounded-full border flex items-center border-white/15 bg-white/[0.04] backdrop-blur-xl text-white text-sm uppercase tracking-[0.14em] font-medium hover:bg-white hover:text-black transition-all duration-500"
                  >
                    Explore Services
                  </Link>
                </motion.div>

                {/* Stats */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 1,
                  }}
                  className="mt-14 grid grid-cols-3 gap-5 max-w-2xl"
                >
                  {[
                    {
                      value: "250+",
                      label: "Projects Delivered",
                    },
                    {
                      value: "15+",
                      label: "Years Experience",
                    },
                    {
                      value: "98%",
                      label: "Client Satisfaction",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5 backdrop-blur-xl border"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {item.value}
                      </div>

                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </motion.div> */}
              </div>

              {/* RIGHT SIDE FLOATING CARD */}
              <div className="hidden lg:flex justify-end items-end h-full">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.25,
                  }}
                  className="w-[360px] rounded-[32px] overflow-hidden backdrop-blur-2xl border"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="relative">
                    <img
                      src="/hero-feature.jpg"
                      alt="Luxury Interior"
                      className="w-full h-[260px] object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="text-white text-2xl font-bold">
                        Elegant. Timeless. Modern.
                      </div>

                      <div className="mt-2 text-sm text-white/70 leading-relaxed">
                        Curated architecture crafted for extraordinary living
                        experiences.
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <div className="text-white text-sm font-semibold">
                        Featured Showcase
                      </div>

                      <div className="text-white/45 text-xs mt-1">
                        Cinematic Experience
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleVideo}
                        className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HomeHeroNew;
