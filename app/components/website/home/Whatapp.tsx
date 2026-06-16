"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, Sparkles, ArrowUpRight } from "lucide-react";

interface QuickReply {
  id: number;
  text: string;
  message: string;
}

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowScrollBubble] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  // Premium SMAIN Color Palette Mapping with missing foreground added
  const colors = {
    primary: "#2d2926", // Charcoal
    primaryFg: "#f8f5f2", // Off-white
    accent: "#ffb24e", // Golden Orange Accent
    accentSoft: "#e5d3b3", // Soft Tan
    background: "#fff0dd", // Warm Cream Background
    foreground: "#1a1a1a", // Dark text
    card: "#ffffff", // Clean White Card
    border: "#e2e2e2", // Delicate border
    whatsapp: "#25D366", // Standard brand WhatsApp green
  };

  const quickReplies: QuickReply[] = [
    {
      id: 1,
      text: "🏡 Enquire about a Villa",
      message:
        "Hello! I am highly interested in SMAIN's signature Luxury Villas. Could you share details regarding current availabilities?",
    },
    {
      id: 2,
      text: "📅 Schedule a Site Visit",
      message:
        "Hi SMAIN team, I would love to schedule a private, personalized site visit to explore your ongoing premium developments.",
    },
    {
      id: 3,
      text: "💼 Business Partnership",
      message:
        "Greetings. I would like to speak to an investment manager about commercial building opportunities with SMAIN.",
    },
  ];

  useEffect(() => {
    // Safely grab current pathname on the client side without Next.js dependencies
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    if (localStorage.getItem("smain_wa_interacted") === "true") {
      return;
    }
    const timer = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowScrollBubble(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  // Hide button on Admin routes
  if (currentPath.startsWith("/admin")) return null;

  const handleOpenWidget = () => {
    setIsOpen(!isOpen);
    setShowScrollBubble(false);
    setHasInteracted(true);
    localStorage.setItem("smain_wa_interacted", "true");
  };

  const handleStartChat = (messageText: string) => {
    const textToSend =
      messageText.trim() ||
      "Hello! I would like to enquire about SMAIN Reality properties.";
    const whatsappUrl = `https://wa.me/919284788693?text=${encodeURIComponent(textToSend)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleStartChat(inputValue);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end font-sans">
      {/* Animated Greeting Teaser Bubble */}
      <AnimatePresence>
        { showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-20 right-2 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 w-44 max-w-[280px] mb-2 pointer-events-auto"
            style={{ borderLeft: `4px solid ${colors.accent}` }}
          >
            <button
              onClick={() => setShowScrollBubble(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: colors.primary }}
            >
              SMAIN Concierge
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Hi there! Looking for your next bespoke luxury villa? Let's
              discuss your vision over a quick WhatsApp chat.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Enhanced Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[380px] rounded-3xl overflow-hidden shadow-2xl mb-5 flex flex-col border border-white/20 bg-white"
            style={{ boxShadow: "0 20px 50px -10px rgba(45,41,38,0.15)" }}
          >
            {/* Chat Panel Header - SMAIN Custom Luxury Themed */}
            <div
              className="p-6 text-white relative overflow-hidden flex items-center justify-between"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ffb24e] bg-white flex items-center justify-center">
                  <span className="text-[#2d2926] font-serif text-xl font-bold italic">
                    S
                  </span>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                    SMAIN Concierge
                    <Sparkles
                      size={12}
                      className="text-[#ffb24e] animate-pulse"
                    />
                  </h3>
                  <p className="text-[10px] text-[#e5d3b3] uppercase tracking-widest font-semibold">
                    Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors relative z-10 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body Area */}
            <div
              style={{ backgroundColor: colors.background }}
              className="p-6 flex-1 max-h-[300px] overflow-y-auto space-y-4"
            >
              <div className="flex items-start gap-3 max-w-[85%]">
                <div
                  className="p-3.5 rounded-2xl rounded-tl-none shadow-sm text-xs leading-relaxed font-light"
                  style={{
                    backgroundColor: colors.card,
                    color: colors.foreground,
                  }}
                >
                  <p className="mb-2">
                    Greetings! I am your SMAIN Luxury Living assistant.
                  </p>
                  <p>
                    How can we assist you with our bespoke real estate designs
                    and custom developments today?
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 py-1 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                <Check size={12} className="text-green-500" />
                <span>SMAIN Reality Verified Line</span>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3 pl-1">
                  Suggested inquiries
                </p>
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleStartChat(reply.message)}
                    className="w-full text-left p-3 rounded-xl bg-white border text-xs font-medium hover:border-[#ffb24e] hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-pointer"
                    style={{ borderColor: colors.border }}
                  >
                    <span style={{ color: colors.primary }}>{reply.text}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#ffb24e]"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Action Form Area */}
            <form
              onSubmit={handleFormSubmit}
              className="p-4 bg-white border-t flex items-center gap-2"
              style={{ borderColor: colors.border }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-xs outline-none border-none py-2 px-3 rounded-full bg-gray-50 focus:bg-gray-100 transition-colors"
                style={{ color: colors.primary }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-3 rounded-full text-white transition-all disabled:opacity-30 disabled:scale-100 active:scale-95 cursor-pointer"
                style={{ backgroundColor: colors.primary }}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Toggle Button */}
      <button
        onClick={handleOpenWidget}
        className="relative group flex items-center justify-center rounded-full text-white shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 z-50 cursor-pointer h-16 w-16 cursor-pointer"
        style={{ backgroundColor: colors.whatsapp }}
        aria-label="Toggle live concierge WhatsApp chat"
      >
        {!isOpen && (
          <span
            className="absolute inset-0 h-full w-full animate-ping rounded-full opacity-35"
            style={{ backgroundColor: colors.whatsapp }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-93.8-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Active Red Notification Badge */}
        {!isOpen && !hasInteracted && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] items-center justify-center font-bold text-white leading-none">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
