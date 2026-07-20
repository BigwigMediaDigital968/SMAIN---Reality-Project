"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Layers,
    MapPin,
    Info,
    ShieldCheck,
    Phone,
    Mail,
    Sparkles,
    Home,
    BedDouble,
    Bath,
    Tag,
    Building2,
    FileText,
    Video,
    PlusCircle,
    HelpCircle,
    ChevronDown
} from "lucide-react";
import Link from "next/link";
import Gallery from "../../Components/Gallary";
import Navbar from "@/app/components/website/Navbar";

// Explicitly type out our component props to match your Mongoose Schema structure cleanly
interface FAQItem {
    question: string;
    answer: string;
}

interface PropertyData {
    propertyName: string;
    slug: string;
    listingType: "sale" | "rent";
    propertyType: string;
    location: string;
    description: string;
    price: string | null;
    bedroom?: string;
    bathroom?: string;
    sizeSqft: string | null;
    address: string;
    subArea?: string;
    googleMapUrl?: string | null;
    developerName?: string | null;
    propertyImages: string[];
    propertyBrochure?: string | null;
    videoLink?: string | null;
    propertyDetails: string;
    highlights: string[];
    featuresAmenities: string[];
    nearby: string[];
    extraHighlights: string[];
    extraInfo: string[];
    faqs: FAQItem[];
}

const PropertyDetailsClient = ({ property }: { property: PropertyData }) => {
    const p = property;

    // Manage dynamic accordion states for the FAQs section
    const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

    // Build out the dynamic specs array map matching all parameters present within your schema
    const specs = [
        p.sizeSqft && {
            label: "Area",
            value: p.sizeSqft,
            icon: <Layers size={18} />,
        },
        p.location && {
            label: "Region",
            value: p.location.split("-").join(" "),
            icon: <Info size={18} />,
        },
        {
            label: "Price Status",
            value: p.price && p.price !== "0" ? `₹${p.price}` : "On Request",
            icon: <Sparkles size={18} />,
        },
        p.propertyType && {
            label: "Property Type",
            value: p.propertyType,
            icon: <Home size={18} />,
        },
        p.listingType && {
            label: "Listing Segment",
            value: `For ${p.listingType}`,
            icon: <Tag size={18} />,
        },
        p.bedroom && {
            label: "Bedrooms",
            value: p.bedroom,
            icon: <BedDouble size={18} />,
        },
        p.bathroom && {
            label: "Bathrooms",
            value: p.bathroom,
            icon: <Bath size={18} />,
        },
        p.developerName && {
            label: "Developer",
            value: p.developerName,
            icon: <Building2 size={18} />,
        },
    ].filter(Boolean) as { label: string; value: string; icon: React.ReactNode }[];

    return (
        <>
            <Navbar isScrolled={true} />

            <main className="bg-white min-h-screen text-brand-primary">

                {/* 1. HERO ARCHITECTURAL GALLERY SECTION */}
                <Gallery images={p.propertyImages} />

                {/* 2. CORE DETAILS HEADLINE & VALUATION */}
                <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center text-gray-500 text-xs font-medium capitalize">
                                    <MapPin size={14} className="mr-1 text-brand-accent" />
                                    {p.address} {p.subArea ? `(${p.subArea})` : ""}
                                </div>
                                {p.googleMapUrl && (
                                    <a
                                        href={p.googleMapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-brand-accent underline flex items-center gap-0.5 hover:text-brand-primary transition-colors"
                                    >
                                        View Map
                                    </a>
                                )}
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter leading-tight mb-2">
                                {p.propertyName}
                            </h1>
                            {/* Falling back cleanly onto static internal details text if no tagline string exists */}
                            <p className="italic font-serif text-lg font-light text-brand-accent">
                                {p.description || "Premium Real Estate Opportunity"}
                            </p>
                        </div>

                        <div className="lg:text-right bg-gray-50 lg:bg-transparent p-6 lg:p-0 rounded-lg lg:rounded-none min-w-[280px]">
                            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Investment Capital</span>
                            <div className="text-4xl font-extrabold text-brand-primary tracking-tight mb-2">
                                {p.price && p.price !== "0" ? `₹${p.price}` : "On Request"}
                            </div>
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
                                {specs.map((spec, idx) => (
                                    <div key={idx} className="bg-white p-4 flex items-start gap-4">
                                        <div className="p-2.5 bg-gray-50 text-brand-accent border border-gray-100">
                                            {spec.icon}
                                        </div>
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-gray-400 block mb-0.5">
                                                {spec.label}
                                            </span>
                                            <span className="text-sm font-semibold text-brand-primary capitalize">
                                                {spec.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Narrative Content */}
                        {p.propertyDetails && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Property Overview</h3>
                                <div
                                    className="prose max-w-none text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: p.propertyDetails }}
                                />                            
                            </div>
                        )}

                        {/* --- PROPERTY HIGHLIGHTS, AMENITIES, & SURROUNDINGS BLOCK --- */}
                        <div className="space-y-12">

                            {/* A. Amenities (Mapped using your correct model signature: featuresAmenities) */}
                            {p.featuresAmenities && p.featuresAmenities.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                                        Premium Amenities
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {p.featuresAmenities.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                                                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full shrink-0" />
                                                <span className="text-sm font-medium text-gray-700 capitalize">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* B. Core Highlights & Adaptation Grid */}
                            {(p.highlights?.length > 0 || p.extraHighlights?.length > 0) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4 border-y border-gray-100 py-8">
                                    {/* Left Sub-Column: Highlights */}
                                    {p.highlights && p.highlights.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                                                Property Highlights
                                            </h3>
                                            <ul className="space-y-4">
                                                {p.highlights.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                                        <span className="w-1.5 h-1.5 bg-brand-accent rotate-45 shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Right Sub-Column: Ideal Adaptation */}
                                    {p.extraHighlights && p.extraHighlights.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                                                Ideal For
                                            </h3>
                                            <ul className="space-y-4">
                                                {p.extraHighlights.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                                        <span className="w-1.5 h-1.5 bg-brand-primary shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* C. Extra Information (Conditional List Grid) */}
                            {p.extraInfo && p.extraInfo.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                                        Additional Insights
                                    </h3>
                                    <ul className="space-y-3">
                                        {p.extraInfo.map((info, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm font-light text-gray-600">
                                                <PlusCircle size={14} className="text-brand-accent mt-0.5 shrink-0" />
                                                <span>{info}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* D. Nearby Infrastructure */}
                            {p.nearby && p.nearby.length > 0 && (
                                <div className="pt-4">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                                        Proximity & Neighborhood Landmarks
                                    </h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                                        {p.nearby.map((place, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm font-medium text-gray-600">
                                                <span className="text-brand-accent text-xs font-bold mt-0.5">▪</span>
                                                <span className="leading-tight">{place}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* E. Media attachments, Brochures, and Video Links */}
                            {(p.propertyBrochure || p.videoLink) && (
                                <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                                    {p.propertyBrochure && (
                                        <a
                                            href={p.propertyBrochure}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 border border-brand-primary/20 hover:border-brand-primary px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors text-brand-primary"
                                        >
                                            <FileText size={16} className="text-brand-accent" />
                                            Download Brochure
                                        </a>
                                    )}
                                    {p.videoLink && (
                                        <a
                                            href={p.videoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 border border-brand-primary/20 hover:border-brand-primary px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors text-brand-primary"
                                        >
                                            <Video size={16} className="text-brand-accent" />
                                            Watch Property Tour
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* F. Dynamic FAQs Dropdown Accordion Section */}
                            {p.faqs && p.faqs.length > 0 && (
                                <div className="pt-8 border-t border-gray-100">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-3">
                                        {p.faqs.map((faq, idx) => {
                                            const isOpen = openFaqIdx === idx;
                                            return (
                                                <div key={idx} className="border border-gray-100 rounded-sm overflow-hidden">
                                                    <button
                                                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                                                        className="w-full flex items-center justify-between gap-4 p-4 bg-gray-50 text-left text-sm font-semibold text-brand-primary hover:bg-gray-100/60 transition-colors"
                                                    >
                                                        <span className="flex items-center gap-2.5">
                                                            <HelpCircle size={16} className="text-brand-accent shrink-0" />
                                                            {faq.question}
                                                        </span>
                                                        <ChevronDown
                                                            size={16}
                                                            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                                        />
                                                    </button>
                                                    {isOpen && (
                                                        <div className="p-4 bg-white text-sm font-light text-gray-600 leading-relaxed border-t border-gray-100">
                                                            {faq.answer}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Column: Interaction Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 p-8 sticky top-28 bg-white shadow-xl shadow-gray-100/50 rounded-sm">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-12 h-12 bg-brand-primary flex items-center justify-center text-white font-serif italic font-bold text-xl rounded-none">
                                    {"S"}
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent block">Smain</span>
                  <h4 className="text-base font-bold tracking-tight">Luxury Property Specialist</h4>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <a href={`tel:+919158506555`} className="flex items-center gap-4 p-3.5 border border-gray-100 hover:border-brand-primary transition-colors text-sm font-semibold group">
                                    <Phone size={16} className="text-gray-400 group-hover:text-brand-accent transition-colors" />
                                    <span>{"+91 9158506555"}</span>
                                </a>
                                <a href={`mailto:smainrealty@gmail.com`} className="flex items-center gap-4 p-3.5 border border-gray-100 hover:border-brand-primary transition-colors text-sm font-semibold group break-all">
                                    <Mail size={16} className="text-gray-400 group-hover:text-brand-accent transition-colors" />
                                    <span>{"smainrealty@gmail.com"}</span>
                                </a>
                            </div>

                            <Link
                                href={"/contact-us"}
                                className="w-full bg-brand-primary text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-colors"
                            >
                                Let's Connect
                                <ArrowUpRight size={14} className="text-brand-accent" />
                            </Link>
                            <p className="text-[10px] text-center text-gray-400 mt-4 tracking-wide font-light">
                                Compliance Checked & Title Clear Documentation available upon verification.
                            </p>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default PropertyDetailsClient;