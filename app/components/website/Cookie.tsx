"use client";

import React, { useState, useEffect } from "react";
import {
  Cookie,
  X,
  ShieldCheck,
  BarChart3,
  Info,
  Lock,
  Settings,
} from "lucide-react";

interface Preferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  experience: boolean;
}

const CookieContent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [preferences, setPreferences] = useState<Preferences>({
    essential: true,
    analytics: true,
    marketing: false,
    experience: true,
  });

  const colors = {
    primary: "#2d2926",
    primaryFg: "#f8f5f2",
    accent: "#ffb24e",
    accentSoft: "#e5d3b3",
    background: "#fff0dd",
    card: "#ffffff",
    border: "#e2e2e2",
  };

  useEffect(() => {
    const consent = localStorage.getItem("smain_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved = JSON.parse(consent) as Preferences;
        setPreferences(saved);
      } catch (e) {
        console.error("Failed to parse cookie consent", e);
      }
    }
  }, []);

  const handleAcceptAll = (): void => {
    const allAccepted: Preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      experience: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleSavePreferences = (): void => {
    saveConsent(preferences);
    setShowSettings(false);
  };

  const saveConsent = (prefs: Preferences): void => {
    localStorage.setItem("smain_cookie_consent", JSON.stringify(prefs));
    setIsVisible(false);
  };

  // Fixed indexing error by typing the key as keyof Preferences
  const togglePreference = (key: keyof Preferences): void => {
    if (key === "essential") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible && !showSettings) return null;

  return (
    <>
      {/* Banner */}
      {isVisible && !showSettings && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div
            className="bg-white border-2 rounded-3xl p-6 shadow-2xl overflow-hidden relative"
            style={{ borderColor: colors.accentSoft }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: colors.accent }}
            ></div>

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
                <Cookie size={24} />
              </div>
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: colors.primary }}
                >
                  Cookie Settings
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to improve your experience and analyze site
                  traffic for SMAIN Reality.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryFg,
                }}
              >
                Accept All
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 rounded-xl font-bold text-sm border-2 transition-all hover:bg-gray-50 active:scale-95"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                Customize
              </button>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Settings className="text-orange-500" />
                <h2
                  className="text-2xl font-black uppercase tracking-tight"
                  style={{ color: colors.primary }}
                >
                  Preferences
                </h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <p className="text-gray-600 mb-8">
                Manage how your data is used across our construction and real
                estate services.
              </p>

              {/* Essential */}
              <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 opacity-80">
                <Lock className="mt-1 text-gray-400" size={20} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold">Strictly Necessary</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-1 bg-gray-200 rounded-md text-gray-600">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Required for security, login, and project portal access.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${preferences.analytics ? "bg-orange-50/30 border-orange-200" : "border-gray-100"}`}
                onClick={() => togglePreference("analytics")}
              >
                <BarChart3
                  className={
                    preferences.analytics
                      ? "text-orange-500 mt-1"
                      : "text-gray-400 mt-1"
                  }
                  size={20}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold">Performance & Analytics</h4>
                    <div
                      className={`w-10 h-5 rounded-full relative transition-colors ${preferences.analytics ? "bg-orange-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${preferences.analytics ? "left-6" : "left-1"}`}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Helps us measure popular property designs and site traffic.
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${preferences.experience ? "bg-orange-50/30 border-orange-200" : "border-gray-100"}`}
                onClick={() => togglePreference("experience")}
              >
                <ShieldCheck
                  className={
                    preferences.experience
                      ? "text-orange-500 mt-1"
                      : "text-gray-400 mt-1"
                  }
                  size={20}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold">Functional & Experience</h4>
                    <div
                      className={`w-10 h-5 rounded-full relative transition-colors ${preferences.experience ? "bg-orange-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${preferences.experience ? "left-6" : "left-1"}`}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Remembers your filters and location settings.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 flex gap-3 items-center">
                <Info size={16} className="text-blue-500 flex-shrink-0" />
                <p className="text-[10px] text-blue-700 leading-tight">
                  Blocking some cookies may impact your experience. Read our{" "}
                  <a href="#" className="underline font-bold">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="p-8 border-t flex flex-col md:flex-row gap-4">
              <button
                onClick={handleAcceptAll}
                className="px-8 py-4 rounded-2xl font-bold text-sm bg-gray-100 text-gray-700 transition-all hover:bg-gray-200"
              >
                Accept All
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all hover:shadow-orange-200 hover:-translate-y-1 active:scale-95"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryFg,
                }}
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieContent;
