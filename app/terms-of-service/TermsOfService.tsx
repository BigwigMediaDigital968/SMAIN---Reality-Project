"use client";

import React, { useState, useEffect } from "react";
import {
  HardHat,
  Scale,
  FileCheck,
  AlertTriangle,
  Hammer,
  Clock,
  ChevronRight,
  ArrowUp,
  Briefcase,
} from "lucide-react";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("agreement");
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      id: "agreement",
      title: "1. Service Agreement",
      icon: <FileCheck size={18} />,
    },
    {
      id: "estimates",
      title: "2. Estimates & Bids",
      icon: <Briefcase size={18} />,
    },
    {
      id: "site-access",
      title: "3. Site Access & Safety",
      icon: <HardHat size={18} />,
    },
    { id: "changes", title: "4. Change Orders", icon: <Hammer size={18} /> },
    { id: "payments", title: "5. Payment Terms", icon: <Clock size={18} /> },
    {
      id: "liability",
      title: "6. Liability & Warranty",
      icon: <Scale size={18} />,
    },
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
      {/* Header */}
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
            <Scale size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Legal Framework
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-black mb-6"
            style={{ color: colors.primary }}
          >
            Terms of Service
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            These terms govern the construction, design, and reality services
            provided by SMAIN Reality. By engaging our services, you agree to
            the following protocols.
          </p>
          <p
            className="mt-4 text-sm font-bold uppercase tracking-tighter"
            style={{ color: colors.primary }}
          >
            Effective Date: April 30, 2026
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Navigation */}
        <aside className="lg:w-1/4 hidden lg:block sticky top-8 h-fit">
          <nav
            className="flex flex-col gap-2 p-6 rounded-2xl border bg-white/50 backdrop-blur-sm"
            style={{ borderColor: colors.accentSoft }}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Contract Modules
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

        {/* Content */}
        <main className="lg:w-3/4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5">
            {/* Section 1 */}
            <section id="agreement" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <FileCheck className="text-orange-500" /> 1. Service Agreement
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  SMAIN Reality provides professional construction, renovation,
                  and reality management services. By utilizing our platform or
                  signing a Project Work Order, you enter into a legally binding
                  agreement.
                </p>
                <p>
                  We reserve the right to refuse service to any project that
                  does not meet local zoning laws, safety regulations, or our
                  internal ethical standards.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="estimates" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Briefcase className="text-orange-500" /> 2. Estimates & Bids
              </h2>
              <div
                className="p-6 rounded-2xl mb-6"
                style={{ backgroundColor: colors.background }}
              >
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: colors.primary }}
                >
                  Important Notice:
                </p>
                <p className="text-gray-700 text-sm italic">
                  All initial digital estimates are non-binding. Final project
                  costs are determined only after a physical site inspection and
                  signed detailed bid.
                </p>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    Bids are valid for 30 days from the date of issuance due to
                    fluctuating material costs.
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    Estimates include labor and basic materials unless "Premium
                    Selection" is specified.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="site-access" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <HardHat className="text-orange-500" /> 3. Site Access & Safety
              </h2>
              <p className="text-gray-700 mb-6">
                Client agrees to provide SMAIN Reality personnel and
                subcontractors clear access to the project site during standard
                working hours (8:00 AM - 6:00 PM).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl border-red-100 bg-red-50">
                  <h4 className="font-bold text-red-800 text-sm mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} /> Safety Zone
                  </h4>
                  <p className="text-xs text-red-700 leading-tight">
                    Clients must stay clear of active construction zones. SMAIN
                    Reality is not liable for injuries occurring if safety
                    boundaries are ignored.
                  </p>
                </div>
                <div className="p-4 border rounded-xl border-blue-100 bg-blue-50">
                  <h4 className="font-bold text-blue-800 text-sm mb-2">
                    Permit Responsibility
                  </h4>
                  <p className="text-xs text-blue-700 leading-tight">
                    Unless explicitly stated in the Work Order, the Client is
                    responsible for obtaining all necessary local building
                    permits.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="changes" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Hammer className="text-orange-500" /> 4. Change Orders
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any deviation from the original signed blueprint or material
                selection requires a <strong>Written Change Order</strong>.
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-600 italic">
                  "Verbal agreements for changes will not be honored. All
                  changes must be documented via the SMAIN Reality dashboard and
                  approved by both parties to adjust timelines and budgets."
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="payments" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Clock className="text-orange-500" /> 5. Payment Terms
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl border border-dashed border-gray-200">
                  <span className="font-medium">Deposit</span>
                  <span className="font-bold" style={{ color: colors.primary }}>
                    30% Upon Signing
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl border border-dashed border-gray-200">
                  <span className="font-medium">Milestone Payments</span>
                  <span className="font-bold" style={{ color: colors.primary }}>
                    As defined in Schedule
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl border border-dashed border-gray-200">
                  <span className="font-medium">Final Retention</span>
                  <span className="font-bold" style={{ color: colors.primary }}>
                    10% Upon Completion
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Late payments exceeding 7 business days will result in immediate
                suspension of all site activities.
              </p>
            </section>

            {/* Section 6 */}
            <section id="liability" className="mb-16 scroll-mt-24">
              <h2
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: colors.primary }}
              >
                <Scale className="text-orange-500" /> 6. Liability & Warranty
              </h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  <strong>Construction Warranty:</strong> SMAIN Reality provides
                  a 12-month structural warranty on all labor. Manufacturer
                  warranties apply to materials (appliances, fixtures, etc.).
                </p>
                <p>
                  <strong>Force Majeure:</strong> We are not liable for delays
                  caused by weather, labor strikes, or "Acts of God" that
                  prevent safe construction practices.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>

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

export default TermsOfService;
