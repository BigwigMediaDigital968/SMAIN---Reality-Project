"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminFetch } from "@/app/lib/admin-fetch";
import { 
  ArrowLeft, Loader2, Home, MapPin, Building2, Ruler, 
  Bath, BedDouble, FileText, Video, HelpCircle, Globe, 
  CheckCircle2, AlertCircle, Sparkles, Tag
} from "lucide-react";

interface IPropertyFAQ {
  question: string;
  answer: string;
}

interface Property {
  _id: string;
  propertyName: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: string;
  location?: string;
  price: string;
  bedroom?: string;
  bathroom?: string | null;
  sizeSqft: string;
  address: string;
  subArea?: string;
  googleMapUrl?: string | null;
  developerName: string;
  propertyImages: string[];
  propertyBrochure?: string | null;
  videoLink?: string | null;
  propertyDetails: string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];
  extraInfo: string[];
  status: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  faqs: IPropertyFAQ[];
  createdAt: string;
  updatedAt: string;
}

type TabType = "details" | "features" | "faqs" | "seo";

export default function ViewPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProperty() {
      try {
        const id = params.id as string;
        const res = await adminFetch(`/api/admin/properties?id=${id}`);
        if (!res.ok) throw new Error("Failed to load property");

        const data = await res.json();
        if (data.properties?.[0]) {
          setProperty(data.properties[0]);
          if (data.properties[0].propertyImages?.length > 0) {
            setActiveImage(data.properties[0].propertyImages[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProperty();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-10 flex items-center justify-center bg-[#09090B]">
        <div className="flex flex-col items-center gap-3 bg-[#18181B] border border-[#27272A] px-8 py-6 rounded-2xl shadow-xl">
          <Loader2 size={28} className="animate-spin text-[#6366F1]" />
          <p className="text-sm font-medium text-[#A1A1AA]">Fetching listing data...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen p-6 lg:p-10 flex items-center justify-center bg-[#09090B]">
        <div className="text-center bg-[#18181B] border border-[#27272A] max-w-md p-8 rounded-2xl shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Property Not Found</h3>
          <p className="text-sm text-[#9A9A9E] mb-6">The requested document structural ID does not exist or has been removed.</p>
          <button 
            onClick={() => router.push("/admin/properties")} 
            className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all"
          >
            Return to Properties List
          </button>
        </div>
      </div>
    );
  }

  const renderBulletList = (items: string[], emptyMessage: string) => {
    if (!items || items.length === 0) {
      return <p className="text-sm italic text-[#52525B]">{emptyMessage}</p>;
    }
    return (
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-[#D4D4D8] bg-[#14141B] p-3 rounded-xl border border-[#27272A]/40">
            <CheckCircle2 size={16} className="text-[#6366F1] mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white p-4 lg:p-10 selection:bg-[#6366F1]/30">
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button 
            onClick={() => router.push("/admin/properties")} 
            className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#A1A1AA] hover:text-white transition-all group mb-2"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Registry
          </button>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            {property.propertyName}
          </h1>
          <p className="text-xs text-[#71717A] font-mono mt-1">ID: {property._id || property._id}</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border ${
            property.listingType === "sale" 
              ? "bg-[#6366F1]/10 border-[#6366F1]/30 text-[#818CF8]" 
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          }`}>
            For {property.listingType}
          </span>
          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border ${
            property.status 
              ? "bg-teal-500/10 border-teal-500/30 text-teal-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            {property.status ? "● Operational" : "○ Static / Draft"}
          </span>
        </div>
      </div>

      {/* Main Grid Dashboard Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Media Gallery & Primary Core Specifications */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Media Interactive Section */}
          <div className="bg-[#121217] rounded-2xl border border-[#22222B] p-4 shadow-xl">
            {activeImage ? (
              <div className="space-y-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#1C1C24] border border-[#272732]">
                  <img src={activeImage} alt="Main view" className="w-full h-full object-cover" />
                </div>
                {property.propertyImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
                    {property.propertyImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          activeImage === img ? "border-[#6366F1] scale-95" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video w-full flex flex-col items-center justify-center bg-[#1C1C24] rounded-xl border border-dashed border-[#3F3F46] text-[#71717A]">
                <Home size={32} className="mb-2 text-[#3F3F46]" />
                <p className="text-sm">No asset documentation images found.</p>
              </div>
            )}
          </div>

          {/* Core Architecture Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#121217] border border-[#22222B] p-4 rounded-xl flex items-center gap-3.5 shadow-md">
              <div className="p-2.5 rounded-lg bg-[#6366F1]/15 text-[#818CF8]"><Building2 size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Type</p>
                <p className="text-sm font-semibold text-zinc-100">{property.propertyType}</p>
              </div>
            </div>
            <div className="bg-[#121217] border border-[#22222B] p-4 rounded-xl flex items-center gap-3.5 shadow-md">
              <div className="p-2.5 rounded-lg bg-[#E11D48]/15 text-[#FB7185]"><BedDouble size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Bedrooms</p>
                <p className="text-sm font-semibold text-zinc-100">{property.bedroom || "N/A"}</p>
              </div>
            </div>
            <div className="bg-[#121217] border border-[#22222B] p-4 rounded-xl flex items-center gap-3.5 shadow-md">
              <div className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-400"><Bath size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Bathrooms</p>
                <p className="text-sm font-semibold text-zinc-100">{property.bathroom || "N/A"}</p>
              </div>
            </div>
            <div className="bg-[#121217] border border-[#22222B] p-4 rounded-xl flex items-center gap-3.5 shadow-md">
              <div className="p-2.5 rounded-lg bg-amber-500/15 text-amber-400"><Ruler size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Area Dimension</p>
                <p className="text-sm font-semibold text-zinc-100">{property.sizeSqft ? `${property.sizeSqft} Sq.Ft` : "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Subnavigation Segment Tabs */}
          <div className="bg-[#121217] rounded-2xl border border-[#22222B] overflow-hidden shadow-xl">
            <div className="flex border-b border-[#22222B] bg-[#0E0E12] overflow-x-auto">
              {(["details", "features", "faqs", "seo"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold capitalize tracking-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                    activeTab === tab 
                      ? "border-[#6366F1] text-white bg-[#121217]" 
                      : "border-transparent text-[#71717A] hover:text-zinc-200"
                  }`}
                >
                  {tab === "seo" ? "SEO Matrix" : tab === "faqs" ? "FAQ Arrays" : tab}
                </button>
              ))}
            </div>

            <div className="p-6 lg:p-8">
              {/* TAB 1: HTML Content Description */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#71717A] mb-3">Rich Text Property Details</h3>
                    <div 
                      className="text-sm leading-8 text-[#D4D4D8] prose prose-invert max-w-none 
                      bg-[#18181F] p-5 rounded-xl border border-[#272732] max-h-96 overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: property.propertyDetails || "<p className='italic text-zinc-600'>No HTML content injected.</p>" }} 
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Custom List Metadata Elements */}
              {activeTab === "features" && (
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-extrabold tracking-widest text-[#818CF8] uppercase mb-3 flex items-center gap-2">
                      <Sparkles size={14} /> Highlights
                    </h4>
                    {renderBulletList(property.highlights, "No primary highlights mapped.")}
                  </div>
                  <hr className="border-[#22222B]" />
                  <div>
                    <h4 className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase mb-3 flex items-center gap-2">
                      <Home size={14} /> Features & Amenities
                    </h4>
                    {renderBulletList(property.featuresAmenities, "No explicit amenities verified.")}
                  </div>
                  <hr className="border-[#22222B]" />
                  <div>
                    <h4 className="text-xs font-extrabold tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
                      <MapPin size={14} /> Nearby Infrastructure
                    </h4>
                    {renderBulletList(property.nearby, "No nearby points of interest mapped.")}
                  </div>
                  <hr className="border-[#22222B]" />
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-extrabold tracking-widest text-zinc-400 uppercase mb-3">Extra Highlights</h4>
                      {renderBulletList(property.extraHighlights, "Empty list.")}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold tracking-widest text-zinc-400 uppercase mb-3">Extra Info</h4>
                      {renderBulletList(property.extraInfo, "Empty list.")}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Accordion FAQs */}
              {activeTab === "faqs" && (
                <div className="space-y-4">
                  {property.faqs && property.faqs.length > 0 ? (
                    property.faqs.map((faq, index) => (
                      <div key={index} className="bg-[#181822] border border-[#2A2A38] p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <HelpCircle size={18} className="text-[#6366F1] mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1.5">{faq.question}</h4>
                            <p className="text-xs leading-6 text-[#A1A1AA]">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-[#52525B] italic text-sm">
                      No structural FAQ nodes initialized on this object listing.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Search Engine Optimization Fields */}
              {activeTab === "seo" && (
                <div className="space-y-5">
                  <div className="bg-[#14141A] border border-[#22222B] p-4 rounded-xl">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] block mb-1">Meta Title Tag</label>
                    <p className="text-sm text-zinc-100 font-mono select-all">{property.metaTitle || "[Not configured]"}</p>
                  </div>
                  <div className="bg-[#14141A] border border-[#22222B] p-4 rounded-xl">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] block mb-1">Meta Keywords Schema</label>
                    <p className="text-sm text-zinc-100 font-mono select-all">{property.metaKeywords || "[Not configured]"}</p>
                  </div>
                  <div className="bg-[#14141A] border border-[#22222B] p-4 rounded-xl">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] block mb-1">Meta Description String</label>
                    <p className="text-xs leading-5 text-[#A1A1AA]">{property.metaDescription || "[Not configured]"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Entity Relationships & Verification Actions */}
        <div className="space-y-8">
          
          {/* Financial Overview Panel */}
          <div className="bg-gradient-to-br from-[#1E1B4B]/40 to-[#121217] rounded-2xl border border-[#312E81]/40 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-[#6366F1] pointer-events-none">
              <Tag size={120} />
            </div>
            <p className="text-[11px] uppercase tracking-widest font-bold text-[#A5B4FC]/70">Valuation Parameter</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">₹{property.price || "Price Unset"}</span>
            </div>
            
            <hr className="my-4 border-[#27273A]" />
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#71717A]">Target Sub-Region:</span>
                <span className="font-semibold text-zinc-200 capitalize">{property.location?.replace("-", " ") || "North Goa"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#71717A]">Developer Anchor:</span>
                <span className="font-semibold text-zinc-200">{property.developerName}</span>
              </div>
            </div>
          </div>

          {/* Geographical Mapping & Routes Container */}
          <div className="bg-[#121217] rounded-2xl border border-[#22222B] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#6366F1]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Location Index</h3>
            </div>
            <div>
              <p className="text-xs text-[#71717A] font-semibold mb-1 uppercase tracking-wider text-[10px]">Physical Address</p>
              <p className="text-sm text-[#D4D4D8] leading-6 bg-[#181822] p-3 rounded-xl border border-[#2A2A38]">{property.address}</p>
            </div>
            {property.subArea && (
              <div>
                <p className="text-xs text-[#71717A] font-semibold mb-1 uppercase tracking-wider text-[10px]">Sub Area Section</p>
                <p className="text-sm text-zinc-300 font-medium">{property.subArea}</p>
              </div>
            )}
            
            {property.googleMapUrl ? (
              <a 
                href={property.googleMapUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="block text-center w-full px-4 py-2.5 rounded-xl border border-[#6366F1]/30 hover:border-[#6366F1] text-xs font-semibold text-[#818CF8] bg-[#6366F1]/5 transition-all"
              >
                Launch External Google Maps Routing
              </a>
            ) : (
              <div className="text-xs text-[#52525B] italic bg-[#181822]/40 p-3 rounded-xl text-center border border-dashed border-[#272732]">
                No hyperlinked geospatial navigation mapping provided.
              </div>
            )}
          </div>

          {/* Connected Assets & External Hyperlinks */}
          <div className="bg-[#121217] rounded-2xl border border-[#22222B] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#6366F1]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Digital Documentation</h3>
            </div>

            {/* Document Brochure Anchor */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-2">Brochure File Attachment</p>
              {property.propertyBrochure ? (
                <a 
                  href={property.propertyBrochure} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#181822] border border-[#272735] hover:border-[#3F3F56] transition-all group"
                >
                  <div className="p-2 bg-[#6366F1]/10 rounded-lg text-[#818CF8]"><FileText size={16} /></div>
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white truncate">Review PDF Brochure Asset</span>
                </a>
              ) : (
                <div className="text-xs italic text-[#52525B] bg-[#141419]/40 p-3 rounded-lg border border-dashed border-[#22222B]">
                  No brochure file linked.
                </div>
              )}
            </div>

            {/* Video Material Anchor */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-2">Video Presentation Stream</p>
              {property.videoLink ? (
                <a 
                  href={property.videoLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#181822] border border-[#272735] hover:border-[#3F3F56] transition-all group"
                >
                  <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400"><Video size={16} /></div>
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white truncate">Stream Media Presentation</span>
                </a>
              ) : (
                <div className="text-xs italic text-[#52525B] bg-[#141419]/40 p-3 rounded-lg border border-dashed border-[#22222B]">
                  No multimedia link linked.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}