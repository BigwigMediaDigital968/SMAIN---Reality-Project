"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  ChevronRight,
  Mail,
  ArrowUp,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Brand Colors based on your theme
  const colors = {
    primary: "#2d2926",
    primaryFg: "#f8f5f2",
    accent: "#ffb24e",
    accentSoft: "#e5d3b3",
    background: "#fff0dd",
    foreground: "#1a1a1a",
    card: "#ffffff",
    border: "#e2e2e2",
  };

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: <FileText size={18} />,
    },
    {
      id: "data-collection",
      title: "2. Data We Collect",
      icon: <Eye size={18} />,
    },
    { id: "usage", title: "3. How We Use Data", icon: <Shield size={18} /> },
    { id: "security", title: "4. Data Security", icon: <Lock size={18} /> },
    { id: "cookies", title: "5. Cookies Policy", icon: <FileText size={18} /> },
    { id: "contact", title: "6. Contact Us", icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const current = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.foreground }}
      className="min-h-screen font-sans selection:bg-[#ffb24e] selection:text-[#2d2926]"
    >
      {/* Header Section */}
      <header
        className="pt-32 pb-14 px-6 border-b"
        style={{ borderColor: colors.accentSoft }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: colors.accentSoft,
              color: colors.primary,
            }}
          >
            <Shield size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Legal Document
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-black mb-6"
            style={{ color: colors.primary }}
          >
            Privacy Policy
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            At SMAIN Reality, your privacy is our foundation. This policy
            explains how we collect, use, and protect your personal information
            within our digital ecosystem.
          </p>
          <p
            className="mt-4 text-sm font-bold uppercase tracking-tighter"
            style={{ color: colors.primary }}
          >
            Last Updated: April 30, 2026
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:w-1/4 hidden lg:block sticky top-8 h-fit">
          <nav
            className="flex flex-col gap-2 p-6 rounded-2xl border bg-white/50 backdrop-blur-sm"
            style={{ borderColor: colors.accentSoft }}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Contents
            </p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  activeSection === section.id
                    ? "shadow-sm font-bold"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    activeSection === section.id
                      ? colors.primary
                      : "transparent",
                  color:
                    activeSection === section.id
                      ? colors.primaryFg
                      : colors.primary,
                }}
              >
                {section.icon}
                <span className="text-sm">{section.title}</span>
                {activeSection === section.id && (
                  <ChevronRight size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="lg:w-3/4">
          <div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5"
            style={{ color: colors.foreground }}
          >
            {/* Section 1 */}
            <section id="introduction" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.primary }}
              >
                1. Introduction
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to <strong>SMAIN Reality</strong>. We are committed to
                  protecting your personal data and your right to privacy. This
                  Privacy Policy applies to all information collected through
                  our website, mobile applications, and any related services,
                  sales, marketing, or events.
                </p>
                <p>
                  When you visit our platform and use our services, you trust us
                  with your personal information. We take this trust seriously.
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.primary }}
              >
                2. Data We Collect
              </h2>
              <p className="mb-6 text-gray-700">
                We collect information that you provide directly to us or
                through your use of SMAIN Reality services:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: colors.background }}
                >
                  <h3
                    className="font-bold mb-3"
                    style={{ color: colors.primary }}
                  >
                    Direct Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                    <li>Contact details (Name, email, phone)</li>
                    <li>Account credentials</li>
                    <li>Payment information (processed securely)</li>
                    <li>Preferences and interests in reality services</li>
                  </ul>
                </div>
                <div
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: colors.accentSoft }}
                >
                  <h3
                    className="font-bold mb-3"
                    style={{ color: colors.primary }}
                  >
                    Automated Data
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                    <li>IP Addresses and device identifiers</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and navigation paths</li>
                    <li>Location data (with your permission)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="usage" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.primary }}
              >
                3. How We Use Data
              </h2>
              <p className="mb-4 text-gray-700">
                Your data allows us to provide a personalized SMAIN Reality
                experience. We use it to:
              </p>
              <div className="space-y-4">
                {[
                  "Facilitate account creation and logon process.",
                  "Deliver personalized property and reality recommendations.",
                  "Improve our platform algorithms and user experience.",
                  "Communicate important service updates and promotional offers.",
                  "Ensure legal compliance and prevent fraudulent activity.",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start border-b pb-4 last:border-0"
                    style={{ borderColor: colors.background }}
                  >
                    <div
                      className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section id="security" className="mb-16 scroll-mt-24">
              <div
                className="p-8 rounded-3xl border-2 border-dashed"
                style={{ borderColor: colors.accent }}
              >
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: colors.primary }}
                >
                  4. Data Security
                </h2>
                <p className="text-gray-700 mb-6">
                  We implement a variety of security measures to maintain the
                  safety of your personal information. All sensitive information
                  is transmitted via Secure Socket Layer (SSL) technology and
                  then encrypted into our payment gateway providers' database
                  only to be accessible by those authorized with special access
                  rights to such systems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                    End-to-End Encryption
                  </span>
                  <span className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                    24/7 Monitoring
                  </span>
                  <span className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                    GDPR Compliant
                  </span>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="cookies" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.primary }}
              >
                5. Cookies Policy
              </h2>
              <p className="text-gray-700 mb-4">
                Cookies are small files that a site or its service provider
                transfers to your computer's hard drive through your Web
                browser. They enable the systems to recognize your browser and
                capture and remember certain information.
              </p>
              <p className="text-gray-700">
                We use cookies to help us understand your preferences based on
                previous or current site activity, which enables us to provide
                you with improved services.
              </p>
            </section>

            {/* Section 6 */}
            <section id="contact" className="scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.primary }}
              >
                6. Contact Us
              </h2>
              <div
                className="p-8 rounded-2xl text-center"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryFg,
                }}
              >
                <p className="mb-6 opacity-80">
                  Questions about our Privacy Policy? Our legal team is here to
                  help.
                </p>
                <a
                  href="mailto:privacy@smainreality.com"
                  className="inline-block px-8 py-4 rounded-full font-bold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                  }}
                >
                  privacy@smainreality.com
                </a>
              </div>
            </section>
          </div>

          <footer className="mt-12 text-center text-sm opacity-50">
            <p>&copy; 2024 SMAIN Reality. All rights reserved.</p>
          </footer>
        </main>
      </div>

      {/* Floating Scroll Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50"
          style={{ backgroundColor: colors.primary, color: colors.primaryFg }}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;
