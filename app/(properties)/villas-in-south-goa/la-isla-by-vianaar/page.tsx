"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CheckCircle2,
  Clock,
  Compass,
  ArrowUpRight,
  Sparkles,
  Droplet,
  Wind,
  ExternalLink
} from "lucide-react";
import Gallery from "../../Components/Gallary";
import Navbar from "@/app/components/website/Navbar";
import Link from "next/link";

// --- Interfaces for Reusability & Strong Typing ---
interface VillaUnit {
  name: string;
  configuration: string;
  description?: string;
  carpet:string;
  garden:string;
  builtUp: string;
  plot:string;
  status: "Available" | "Sold Out" | "Registration Open";
}

interface ProjectSpecification {
  label: string;
  value: string;
  icon: React.ReactNode;
}

// --- Dynamic Data Extraction from La Isla Blueprint ---
const projectSpecs: ProjectSpecification[] = [
  { label: "Design Blueprint", value: "Passive Climate-Responsive", icon: <Wind size={20} /> },
  { label: "Eco Integration", value: "Recycled Water & Composting", icon: <Droplet size={20} /> },
  { label: "Community Core", value: "Loom House Clubhouse", icon: <Sparkles size={20} /> },
];

const villaInventory: VillaUnit[] = [
  { 
    name: "Villas 34 to 42", 
    configuration: "4 BHK Premium Layout", 
    builtUp: "3550 Sqft", 
    carpet: "2270 to 2644 Sqft", 
    garden: "2200 to 2545 Sqft", 
    plot: "409 to 441 Sqmt", 
    status: "Registration Open" 
  },
  { 
    name: "Premium Dynamic Enclave", 
    configuration: "3 BHK Luxury Layout", 
    builtUp: "Tailored Floorplans", 
    carpet: "Seamless Flow Layouts", 
    garden: "Integrated Verandahs", 
    plot: "Optimized Footprints", 
    status: "Registration Open" 
  },
  { 
    name: "Compact Dynamic Enclave", 
    configuration: "2 BHK Efficiency Layout", 
    builtUp: "Geometric Blueprints", 
    carpet: "Cross-Ventilated Vectors", 
    garden: "Native Environments", 
    plot: "Eco Footprint Mapping", 
    status: "Registration Open" 
  },
];

const images = [
        "/properties/La-Isla/property-1 (1).jpeg",
        "/properties/La-Isla/property-1 (2).jpeg",
        "/properties/La-Isla/property-1 (3).jpeg",
        "/properties/La-Isla/property-1 (4).jpeg",
        "/properties/La-Isla/property-1 (5).jpeg",
];


const LaIslaDetailsSection = () => {
  return (
    <>
    
        <Navbar  isScrolled={true}/>
    <section className="py-20 bg-white text-brand-primary">
    <Gallery images={images}/>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* HEADER & TOP ECO PORTAL SUMMARY */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-12 border-b border-gray-100">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-none">
                Conscious Living Enclave
              </span>
              <a 
                href="https://maps.app.goo.gl/wdw46SDod7LDDo4y9?g_st=ipc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-500 text-xs font-medium hover:text-brand-accent transition-colors gap-1"
              >
                <MapPin size={14} className="text-brand-accent" /> Loliem, South Goa (4-min drive to the most tropical beach) <ExternalLink size={12} />
              </a>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter leading-tight mb-3">
              La Isla: A Timeless Step
            </h1>
            <p className="italic font-serif text-lg font-light text-brand-accent">
              A premium collection of 2, 3, and 4 BHK architectural villas guided by the land
            </p>
          </div>

          <div className="lg:text-right min-w-[240px]">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 block mb-1">Portfolio Entry</span>
            <div className="text-4xl font-extrabold text-brand-primary tracking-tight">₹ 6.00 Cr <span className="text-lg font-normal text-gray-500">onwards</span></div>
            <div className="mt-2 text-xs text-brand-accent tracking-wide font-medium">
              Vianaar Signature Care & Furnishing Modules Included
            </div>
          </div>
        </div>

        {/* CORE ARCHITECTURAL DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16">
          
          {/* LEFT 2 COLUMNS: BLUEPRINTS & INVENTORY SYSTEMS */}
          <div className="lg:col-span-2 space-y-14">
            
            {/* MINDFUL PHILOSOPHY NARRATIVE */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">The Design Intent</h3>
              <p className="text-gray-600 text-base leading-relaxed font-light">
                La Isla marks Vianaar’s initial, highly intentional expansion into South Goa's pristine Loliem territory. Designed to follow the natural, organic contours of the earth rather than forcing structural boxes upon it, the layout perfectly places a luxury resident clubhouse within a 4-minute drive from South Goa's most breathtaking tropical beach environment. Residences feature low-thermal-conductivity engineering to block radiant heat, while deep verandahs and shaded open thresholds capture incoming local breezes seamlessly.
              </p>
            </div>

            {/* SUSTAINABLE HIGHLIGHT PARAMETERS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-none overflow-hidden">
              {projectSpecs.map((spec, i) => (
                <div key={i} className="bg-white p-5 flex items-start gap-3">
                  <div className="text-brand-accent mt-0.5 shrink-0">
                    {spec.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">{spec.label}</span>
                    <span className="text-xs font-bold text-brand-primary">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* REUSABLE TYPOLOGY MASTER LIST */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Villa Typologies & Manifests</h3>
                <span className="text-[11px] text-gray-500 font-medium">Loliem Inventory Metrics</span>
              </div>
              
              <div className="border border-gray-100 rounded-none divide-y divide-gray-100">
                {villaInventory.map((villa, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white hover:bg-gray-50/40 transition-colors"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-bold text-base text-brand-primary tracking-tight">{villa.name}</h4>
                        <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                          {villa.configuration}
                        </span>
                      </div>
                      
                      {/* Metric Mapping Layout Grid */}
                      <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 font-light">
                        <span><strong className="font-semibold text-brand-primary">Built Up:</strong> {villa.builtUp}</span>
                        <span className="text-gray-200">|</span>
                        <span><strong className="font-semibold text-brand-primary">Carpet:</strong> {villa.carpet}</span>
                        <span className="text-gray-200">|</span>
                        <span><strong className="font-semibold text-brand-primary">Garden:</strong> {villa.garden}</span>
                        <span className="text-gray-200">|</span>
                        <span><strong className="font-semibold text-brand-primary">Plot size:</strong> {villa.plot}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 min-w-[120px] pt-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block sm:hidden">Allocation Status</span>
                      <div className="flex items-center gap-1.5 justify-end">
                        <CheckCircle2 size={14} className="text-brand-accent" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                          {villa.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONSCIOUS SYSTEMS & SOCIAL AMENITIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Circular Resource Loops</h3>
                <ul className="space-y-3">
                  {[
                    "Organic water aerators to control consumption flow",
                    "Automated precise landscape drip-irrigation networks",
                    "Pool systems redirecting backwash loops to native lawns",
                    "Active on-site composting of domestic organic waste"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700 leading-tight">
                      <span className="w-1.5 h-1.5 bg-brand-accent rotate-45 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Loom House & Leisure Infrastructure</h3>
                <ul className="space-y-3">
                  {[
                    "Classic timber-framed social clubhouse environment",
                    "Pristine pool deck paired with landscaped open lawns",
                    "Dedicated outdoor pétanque recreational court layout",
                    "Private lounge space equipped with full billiards matrix"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700 leading-tight">
                      <span className="w-1.5 h-1.5 bg-brand-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY CONSCIOUS ENGAGEMENT CARD */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-8 sticky top-28 bg-white shadow-xl shadow-gray-100/40">
  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
    <div className="w-12 h-12 bg-brand-primary flex items-center justify-center text-white font-serif italic font-bold text-lg">
      V
    </div>
    <div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent block">
        Luxury Property Consultant
      </span>
      <h4 className="text-base font-bold tracking-tight">
        Smain Relationship Desk
      </h4>
    </div>
  </div>

  <div className="mb-8">
    <h5 className="text-xl font-bold mb-3">
      Discover La Isla
    </h5>

    <p className="text-sm text-gray-600 leading-relaxed">
      Schedule a private consultation to learn more about floor plans,
      availability, pricing, investment potential, and the lifestyle
      experience at La Isla.
    </p>
  </div>

  <Link
    href={"contacct-us"}
    className="w-full bg-brand-primary text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary/95 transition-colors"
  >
    Request Call Back
    <ArrowUpRight size={14} className="text-brand-accent" />
  </Link>

  <p className="text-[11px] text-center text-gray-500 mt-4 leading-relaxed">
    Connect with our team for project details, site visits, pricing, and
    availability updates.
  </p>
</div>
          </div>

        </div>

      </div>
    </section>
        </>

  );
};

export default LaIslaDetailsSection;
