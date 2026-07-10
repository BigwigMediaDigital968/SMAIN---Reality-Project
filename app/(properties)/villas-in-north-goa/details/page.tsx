"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Maximize2,
    Layers,
    MapPin,
    DollarSign,
    Compass,
    Info,
    Calendar,
    ShieldCheck,
    Phone,
    Mail,
    User,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import Link from "next/link";

// --- Interfaces for Reusability ---
interface PropertyDetails {
    id: string;
    title: string;
    tagline: string;
    price: string;
    altPrice?: string;
    location: string;
    description: string;
    images: string[];
    specs: {
        label: string;
        value: string;
        icon: React.ReactNode;
    }[];
    features: string[];
    suitability: string[];
    agent: {
        name: string;
        phone: string;
        email: string;
    };
}

// --- Sample Data Mapping to Your Provided Content ---
const propertyData: PropertyDetails = {
    id: "VP290124-165804-4478",
    title: "The Azalea — 5 BHK Residential Independent House / Villa",
    tagline: "Exclusive Field-Facing Luxury Villas in Candolim",
    price: "₹9 Crores",
    altPrice: "Field View Villa variant available at ₹10.5 Crores",
    location: "Candolim, North Goa (Coastal Zone)",
    description: "Discover luxury living in Candolim, Goa, with our exclusive field-facing villas. Enjoy serene views and tranquil surroundings. Immerse yourself in the essence of nature while relishing modern comforts. Your dream home awaits in the heart of picturesque Candolim.",
    images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", // Hero
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
        // Can support 10+ images easily
    ],
    specs: [
        { label: "Ref No", value: "VP290124-165804-4478", icon: <Info size={18} /> },
        { label: "Furniture Status", value: "Fully Furnished", icon: <Sparkles size={18} /> },
        { label: "Saleable Area", value: "500 Sq.Meter (5380 Sqft)", icon: <Layers size={18} /> },
        { label: "Unique Feature", value: "Gated community, Title Clear", icon: <ShieldCheck size={18} /> },
        { label: "Possession Date", value: "June 2025", icon: <Calendar size={18} /> },
    ],
    features: [
        "5BHK Premium Layout",
        "Private Swimming Pool",
        "Steamers in Bathrooms",
        "Walking distance to Beach",
        "24/7 Security",
        "Rental and Property Management Services Available"
    ],
    suitability: [
        "Long-term investment",
        "Own purpose residence",
        "High-yield investment property",
        "Premium Second Home"
    ],
    agent: {
        name: "Poonam",
        phone: "+91 7888066999",
        email: "channelpartner.propertyhub@gmail.com"
    }
};

const PropertyDetailsPage = () => {
    const p = propertyData;
    const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

    return (
        <>
           


            <main className="bg-white min-h-screen text-brand-primary">

                {/* 1. HERO ARCHITECTURAL GALLERY SECTION */}
                <section className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[65vh] min-h-[500px]">
                        {/* Main Showcase (Spans 2 rows and 2 cols) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            onClick={() => setActiveImageIdx(0)}
                            className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer bg-gray-100"
                        >
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                            <span className="absolute bottom-6 left-6 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm">View Primary Frame</span>
                        </motion.div>

                        {/* Grid Sub-Images */}
                        {p.images.slice(1, 5).map((img, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                key={index}
                                onClick={() => setActiveImageIdx(index + 1)}
                                className="relative group overflow-hidden cursor-pointer bg-gray-100 hidden md:block"
                            >
                                <img src={img} alt={`Gallery frame ${index + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300" />

                                {/* Overlay for more items if count exceeds standard grid layout */}
                                {index === 3 && p.images.length > 5 && (
                                    <div className="absolute inset-0 bg-brand-primary/80 flex flex-col items-center justify-center text-white">
                                        <Maximize2 size={24} className="mb-2 text-brand-accent" />
                                        <span className="text-xs uppercase font-bold tracking-widest">+{p.images.length - 5} More Media</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 2. CORE DETAILS HEADLINE & VALUATION */}
                <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                                    Ref: {p.id}
                                </span>
                                <div className="flex items-center text-gray-500 text-xs font-medium">
                                    <MapPin size={14} className="mr-1 text-brand-accent" /> {p.location}
                                </div>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter leading-tight mb-2">
                                {p.title}
                            </h1>
                            <p className="italic font-serif text-lg font-light text-brand-accent">
                                {p.tagline}
                            </p>
                        </div>

                        <div className="lg:text-right bg-gray-50 lg:bg-transparent p-6 lg:p-0 rounded-lg lg:rounded-none min-w-[280px]">
                            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Investment Capital</span>
                            <div className="text-4xl font-extrabold text-brand-primary tracking-tight mb-2">{p.price}</div>
                            {p.altPrice && (
                                <span className="text-xs text-brand-accent bg-brand-accent/5 px-2.5 py-1 inline-block border border-brand-accent/10 rounded-sm">
                                    {p.altPrice}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* 3. MAIN SPECIFICATIONS & AGENT ENGAGEMENT WRAPPER */}
                <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Left 2 Columns: Infrastructure Info */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Key Parameters Table Grid */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Property Parameters</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden">
                                {p.specs.map((spec, idx) => (
                                    <div key={idx} className="bg-white p-5 flex items-start gap-4">
                                        <div className="p-2.5 bg-gray-50 text-brand-accent border border-gray-100">
                                            {spec.icon}
                                        </div>
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-gray-400 block mb-0.5">{spec.label}</span>
                                            <span className="text-sm font-semibold text-brand-primary">{spec.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Narrative Content */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Architectural Overview</h3>
                            <p className="text-gray-600 text-base leading-relaxed font-light">{p.description}</p>
                        </div>

                        {/* Core Features Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Internal & External Assets</h3>
                                <ul className="space-y-4">
                                    {p.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-brand-accent rotate-45 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Ideal Adaptation</h3>
                                <ul className="space-y-4">
                                    {p.suitability.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-brand-primary shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interaction Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 p-8 sticky top-28 bg-white shadow-xl shadow-gray-100/50 rounded-sm">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-12 h-12 bg-brand-primary flex items-center justify-center text-white font-serif italic font-bold text-xl rounded-none">
                                    {p.agent.name.charAt(0)}
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent block">Exclusive Consultant</span>
                                    <h4 className="text-lg font-bold tracking-tight">{p.agent.name}</h4>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <a href={`tel:${p.agent.phone}`} className="flex items-center gap-4 p-3.5 border border-gray-100 hover:border-brand-primary transition-colors text-sm font-semibold group">
                                    <Phone size={16} className="text-gray-400 group-hover:text-brand-accent transition-colors" />
                                    <span>{p.agent.phone}</span>
                                </a>
                                <a href={`mailto:${p.agent.email}`} className="flex items-center gap-4 p-3.5 border border-gray-100 hover:border-brand-primary transition-colors text-sm font-semibold group break-all">
                                    <Mail size={16} className="text-gray-400 group-hover:text-brand-accent transition-colors" />
                                    <span>{p.agent.email}</span>
                                </a>
                            </div>

                            <button
                                onClick={() => alert("Initiating Priority Private Tour Application...")}
                                className="w-full bg-brand-primary text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-colors"
                            >
                                Arrange Site Visit
                                <ArrowUpRight size={14} className="text-brand-accent" />
                            </button>
                            <p className="text-[10px] text-center text-gray-400 mt-4 tracking-wide font-light">
                                Compliance Checked & Title Clear Documentation available upon verification.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. MODAL SLIDESHOW BACKDROP OVERLAY (Handles 10+ High-Res Images cleanly) */}
                {activeImageIdx !== null && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-between p-4 md:p-12">
                        <button onClick={() => setActiveImageIdx(null)} className="absolute top-6 right-6 text-white/70 hover:text-white z-50">
                            <X size={28} />
                        </button>

                        <button
                            disabled={activeImageIdx === 0}
                            onClick={() => setActiveImageIdx(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
                            className="text-white/50 hover:text-white disabled:opacity-20 transition-opacity p-2"
                        >
                            <ChevronLeft size={36} />
                        </button>

                        <div className="max-w-5xl max-h-[80vh] flex flex-col items-center">
                            <img
                                src={p.images[activeImageIdx]}
                                alt={`Asset Presentation Screen ${activeImageIdx + 1}`}
                                className="max-w-full max-h-[75vh] object-contain select-none"
                            />
                            <span className="text-white/40 text-xs tracking-widest uppercase mt-4">
                                Asset Showcase Frame {activeImageIdx + 1} of {p.images.length}
                            </span>
                        </div>

                        <button
                            disabled={activeImageIdx === p.images.length - 1}
                            onClick={() => setActiveImageIdx(prev => prev !== null && prev < p.images.length - 1 ? prev + 1 : prev)}
                            className="text-white/50 hover:text-white disabled:opacity-20 transition-opacity p-2"
                        >
                            <ChevronRight size={36} />
                        </button>
                    </div>
                )}

            </main>
            
        </>
    );
};

export default PropertyDetailsPage;