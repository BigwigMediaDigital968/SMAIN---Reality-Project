"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Cookie,
  Database,
  UserCheck,
  ChevronRight,
  ArrowUp,
  Eye,
  Info,
  Lock,
  MousePointerClick,
} from "lucide-react";

const CookiePolicyPage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const colors = {
    primary: "#2d2926", // Charcoal
    primaryFg: "#f8f5f2", // Off-white
    accent: "#ffb24e", // Orange
    accentSoft: "#e5d3b3", // Soft Tan
    background: "#fff0dd", // Cream
    foreground: "#1a1a1a", // Black text
    card: "#ffffff", // White card
    border: "#e2e2e2", // Light border
  };

  const sections = [
    { id: "overview", title: "1. Policy Overview", icon: <Info size={18} /> },
    {
      id: "lead-forms",
      title: "2. Lead Form Data",
      icon: <Database size={18} />,
    },
    { id: "tracking", title: "3. Tracking Tech", icon: <Cookie size={18} /> },
    {
      id: "preferences",
      title: "4. Your Preferences",
      icon: <MousePointerClick size={18} />,
    },
    { id: "security", title: "5. Data Security", icon: <Shield size={18} /> },
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
      {/* Header - Matching TOS Style */}
      <header
        className="pt-30 pb-14 px-6 border-b"
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
            <Cookie size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Digital Privacy
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-black mb-6"
            style={{ color: colors.primary }}
          >
            Cookie Policy
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            Transparency is a core value of SMAIN Reality. This policy outlines
            how we handle cookies, tracking pixels, and the data you share via
            our lead generation forms.
          </p>
          <p
            className="mt-4 text-sm font-bold uppercase tracking-tighter"
            style={{ color: colors.primary }}
          >
            Last Revised: October 24, 2024
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:w-1/4 hidden lg:block sticky top-8 h-fit">
          <nav
            className="flex flex-col gap-2 p-6 rounded-2xl border bg-white/50 backdrop-blur-sm"
            style={{ borderColor: colors.accentSoft }}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Privacy Modules
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

        {/* Content Main Area */}
        <main className="lg:w-3/4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5">
            {/* Section 1: Overview */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Info className="text-orange-500" /> 1. Policy Overview
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  SMAIN Reality uses cookies and similar technologies to
                  provide, protect, and improve our platform. This policy
                  explains how and why we use these technologies and the choices
                  you have.
                </p>
                <p>
                  By continuing to use our site or submitting lead forms, you
                  consent to our use of cookies as described in this protocol.
                </p>
              </div>
            </section>

            {/* Section 2: Lead Forms */}
            <section id="lead-forms" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Database className="text-orange-500" /> 2. Lead Form Data
              </h2>
              <p className="text-gray-700 mb-6">
                When you engage with our property inquiries or service request
                forms, we collect specific identifiers to facilitate your
                project.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl border-orange-100 bg-orange-50/30">
                  <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                    <UserCheck size={14} /> Identity Data
                  </h4>
                  <p className="text-xs text-orange-700 leading-tight">
                    We collect names, emails, and phone numbers to provide
                    accurate construction bids and project updates.
                  </p>
                </div>
                <div className="p-4 border rounded-xl border-blue-100 bg-blue-50/30">
                  <h4 className="font-bold text-blue-800 text-sm mb-2">
                    Intent Mapping
                  </h4>
                  <p className="text-xs text-blue-700 leading-tight">
                    We store information regarding your budget, property
                    location, and desired timeline to personalize our service
                    delivery.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Tracking Tech */}
            <section id="tracking" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Eye className="text-orange-500" /> 3. Tracking Technologies
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl border border-dashed border-gray-200 hover:border-orange-300 transition-colors">
                  <span className="font-medium text-sm">Essential Cookies</span>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded uppercase tracking-wider">
                    Required
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl border border-dashed border-gray-200">
                  <span className="font-medium text-sm">
                    Analytics (Google)
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    Optional
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl border border-dashed border-gray-200">
                  <span className="font-medium text-sm">
                    Retargeting Pixels
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    Optional
                  </span>
                </div>
              </div>
            </section>

            {/* Section 4: Preferences */}
            <section id="preferences" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <MousePointerClick className="text-orange-500" /> 4. Your
                Preferences
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                You have the absolute right to manage how your data is
                collected. You can adjust your browser settings to refuse
                cookies or use our opt-out dashboard.
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-600 italic">
                  "Note: Disabling essential cookies may result in the loss of
                  functionality for project management tools and secure payment
                  portals on the SMAIN Reality platform."
                </p>
              </div>
            </section>

            {/* Section 5: Security */}
            <section id="security" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Lock className="text-orange-500" /> 5. Data Security
              </h2>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                <p>
                  <strong>Encryption:</strong> All data submitted through lead
                  forms is encrypted using SSL/TLS protocols during transit and
                  stored in SOC2 compliant databases.
                </p>
                <p>
                  <strong>Retention:</strong> We retain cookie data for 24
                  months, while lead form data is kept for the duration of the
                  commercial relationship or until a deletion request is filed.
                </p>
              </div>
            </section>

            {/* Footer Action */}
            <div className="mt-12 p-8 rounded-2xl text-center border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-4 tracking-tight">
                For detailed inquiries regarding your personal data, contact our
                compliance officer.
              </p>
              <button
                className="px-10 py-4 rounded-full font-bold shadow-lg transition-all hover:shadow-xl active:scale-95 flex items-center gap-3 mx-auto"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryFg,
                }}
              >
                compliance@smainreality.com
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Scroll to Top - Matching TOS */}
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

export default CookiePolicyPage;
