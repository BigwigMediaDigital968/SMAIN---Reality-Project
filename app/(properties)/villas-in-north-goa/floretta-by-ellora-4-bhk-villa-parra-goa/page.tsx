"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Maximize2, 
  Layers, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import Gallery from "../../Components/Gallary";
import Navbar from "@/app/components/website/Navbar";
import Link from "next/link";

// --- Interfaces for Strong Typing ---
interface VillaUnit {
  name: string;
  saleableArea: string;
  carpetArea: string;
  price: string;
  status: "Available" | "Sold Out";
  isFurnished?: boolean;
}

const villaInventory: VillaUnit[] = [
  { name: "Villa A", saleableArea: "345.2 Sqmt", carpetArea: "186.96 Sqmt", price: "—", status: "Sold Out" },
  { name: "Villa B", saleableArea: "338.3 Sqmt", carpetArea: "186.96 Sqmt", price: "—", status: "Sold Out" },
  { name: "Villa C", saleableArea: "339.87 Sqmt", carpetArea: "186.96 Sqmt", price: "₹6.21 Cr", status: "Available", isFurnished: true },
  { name: "Villa D", saleableArea: "386.41 Sqmt", carpetArea: "186.96 Sqmt", price: "₹6.75 Cr", status: "Available", isFurnished: true },
  { name: "Villa E", saleableArea: "350.66 Sqmt", carpetArea: "186.96 Sqmt", price: "—", status: "Sold Out" },
  { name: "Villa F", saleableArea: "335.99 Sqmt", carpetArea: "186.96 Sqmt", price: "—", status: "Sold Out" },
  { name: "Villa G", saleableArea: "335.73 Sqmt", carpetArea: "186.96 Sqmt", price: "—", status: "Sold Out" },
  { name: "Villa H", saleableArea: "341.99 Sqmt", carpetArea: "186.96 Sqmt", price: "₹6.75 Cr", status: "Available", isFurnished: true },
];
const images = [
  "/properties/floretta-by-ellora/DJI_20250129165235_0355_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165347_0356_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165422_0357_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165546_0359_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165623_0360_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165656_0361_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165921_0364_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129165952_0366_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129170034_0367_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129170318_0372_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129170835_0375_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129170837_0376_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129171102_0380_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129171643_0381_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129171724_0382_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129171912_0385_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129171933_0386_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129172654_0394_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129173845_0404_D.jpg",
  "/properties/floretta-by-ellora/DJI_20250129174131_0407_D.jpg",
];
const FlorettaDetailsSection = () => {
  return (
    <>
    
    <Navbar  isScrolled={true}/>
    <section className="py-8 bg-white text-brand-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <Gallery images={images}/>
        
        {/* HEADER & TOP DETAILS */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-12 border-b border-gray-100">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-none">
                4 Luxurious BHK
              </span>
              <div className="flex items-center text-gray-500 text-xs font-medium">
                <MapPin size={14} className="mr-1 text-brand-accent" /> Parra, North Goa (Near Anjuna & Baga)
              </div>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter leading-tight mb-3">
              Floretta: A Masterpiece in Parra
            </h1>
            <p className="italic font-serif text-lg font-light text-brand-accent">
              An exclusive enclave of 8 ultra-luxury architectural villas by Ellora
            </p>
          </div>

          <div className="lg:text-right min-w-[240px]">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 block mb-1">Investment Portal</span>
            <div className="text-4xl font-extrabold text-brand-primary tracking-tight">₹ 6.21 Cr <span className="text-lg font-normal text-gray-500">onwards</span></div>
            <div className="mt-2 flex gap-3 lg:justify-end text-xs font-semibold">
              <a href="https://youtu.be/SXxdToLBqeA?si=C_s4rU6dv7u1_ekr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-red-600 hover:underline">
                Actual Video <ExternalLink size={12} />
              </a>
              <span className="text-gray-300">|</span>
              {/* <a href="https://photos.app.goo.gl/bEixsmPxWuxzotY37" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-accent hover:underline">
                Media Assets <ExternalLink size={12} />
              </a> */}
            </div>
          </div>
        </div>

        {/* CORE DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16">
          
          {/* LEFT 2 COLUMNS: INFO & INVENTORY */}
          <div className="lg:col-span-2 space-y-14">
            
            {/* OVERVIEW NARRATIVE */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Architectural Blueprint</h3>
              <p className="text-gray-600 text-base leading-relaxed font-light">
                The Floretta by Ellora introduces an elite standard of natural-modern architecture to Parra's most coveted location. 
                Thoughtfully configured to maximize spacious volumes, internal light corridors, and pristine natural ventilation, each residential unit functions as a private sanctuary equipped with its own dedicated swimming pool and sculpted lawn layout.
              </p>
            </div>

            {/* QUICK HIGHLIGHT METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-none overflow-hidden">
              <div className="bg-white p-5 flex items-start gap-3">
                <Clock size={20} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Possession Layout</span>
                  <span className="text-xs font-bold text-brand-primary">December 2025</span>
                </div>
              </div>
              <div className="bg-white p-5 flex items-start gap-3">
                <Compass size={20} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Views Enclosed</span>
                  <span className="text-xs font-bold text-brand-primary">Sunrise & Sunset Frames</span>
                </div>
              </div>
              <div className="bg-white p-5 flex items-start gap-3">
                <ShieldCheck size={20} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Security Metrics</span>
                  <span className="text-xs font-bold text-brand-primary">Exclusive Gated Enclave</span>
                </div>
              </div>
            </div>

            {/* REUSABLE INVENTORY MASTER LIST */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Unit Distribution & Availability</h3>
                <span className="text-[11px] text-gray-500 font-medium">8 Ultra-Luxury Units Total</span>
              </div>
              
              <div className="border border-gray-100 rounded-none divide-y divide-gray-100">
                {villaInventory.map((villa, idx) => (
                  <div 
                    key={idx} 
                    className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      villa.status === "Sold Out" ? "bg-gray-50/60 opacity-60" : "bg-white hover:bg-gray-50/40"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-bold text-base text-brand-primary tracking-tight">{villa.name}</h4>
                        {villa.isFurnished && (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                            Fully Furnished
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                        <span><strong className="font-semibold">Saleable:</strong> {villa.saleableArea}</span>
                        <span className="text-gray-300">|</span>
                        <span><strong className="font-semibold">Carpet:</strong> {villa.carpetArea}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="sm:text-right">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Valuation</span>
                        <span className={`text-sm font-bold ${villa.status === "Sold Out" ? "text-gray-400 line-through" : "text-brand-primary"}`}>
                          {villa.price}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 min-w-[95px] justify-end">
                        {villa.status === "Available" ? (
                          <>
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">Available</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={14} className="text-gray-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Sold Out</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES & INTEGRATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Elite Concessions</h3>
                <ul className="space-y-3">
                  {["Private Swimming Pool", "Lush Private Lawn Area", "Fully Furnished Interiors Available"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <span className="w-1.5 h-1.5 bg-brand-accent rotate-45 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">White-Glove Management</h3>
                <ul className="space-y-3">
                  {["Dedicated Rental Infrastructure", "On-Demand Concierge Services", "Comprehensive Property Management"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <span className="w-1.5 h-1.5 bg-brand-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY ENGAGEMENT INTERACTION CARD */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-8 sticky top-28 bg-white shadow-xl shadow-gray-100/40 rounded-none">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-brand-primary flex items-center justify-center text-white font-serif italic font-bold text-lg">
                  L
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent block">Assigned Portfolio Hub</span>
                  <h4 className="text-base font-bold tracking-tight">Luxury Property Specialist</h4>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <a href="tel:07969033999" className="flex items-center gap-4 p-3.5 border border-gray-100 hover:border-brand-primary transition-colors text-xs font-semibold group">
                  <Phone size={15} className="text-gray-400 group-hover:text-brand-accent transition-colors shrink-0" />
                  <span>07969033999</span>
                </a>
                <a href="mailto:sales@luxofy.in" className="flex items-center gap-4 p-3.5 border border-gray-100 hover:border-brand-primary transition-colors text-xs font-semibold group break-all">
                  <Mail size={15} className="text-gray-400 group-hover:text-brand-accent transition-colors shrink-0" />
                  <span>sales@luxofy.in</span>
                </a>
              </div>

              <Link 
                href={"/contact-us"}
                className="w-full bg-brand-primary text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary/95 transition-colors"
              >
                Let's Connect
                <ArrowUpRight size={14} className="text-brand-accent" />
              </Link>
              
              <p className="text-[10px] text-center text-gray-400 mt-4 tracking-wide font-light leading-relaxed">
                Site visits require 24-hour advance registration due to ongoing structural developments.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
    </>
  );
};

export default FlorettaDetailsSection;