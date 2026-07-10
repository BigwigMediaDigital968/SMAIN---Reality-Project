"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Maximize2,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";

type GalleryProps = {
    images: string[];
    alt?: string;
};

export default function Gallery({ images, alt = "property view" }: GalleryProps) {
    const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

    return (
        <>
            <section className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
                {/* Changed mobile height to h-auto and enabled a 2-column layout on small screens 
                  before expanding to the exact original 4-column layout on desktop.
                */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[65vh] min-h-[350px] md:min-h-[500px]">
                    
                    {/* Main Showcase (Spans full width on mobile, 2 cols / 2 rows on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => setActiveImageIdx(0)}
                        className="col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer bg-gray-100 aspect-[4/3] md:aspect-auto"
                    >
                        <img src={images[0]} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                        <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm">View Primary Frame</span>
                    </motion.div>

                    {/* Grid Sub-Images (Visible on mobile as standard grid cells, layout matches exact desktop view) */}
                    {images.slice(1, 5).map((img, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            key={index}
                            onClick={() => setActiveImageIdx(index + 1)}
                            className="relative group overflow-hidden cursor-pointer bg-gray-100 aspect-square md:aspect-auto"
                        >
                            <img src={img} alt={`Gallery frame ${index + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* Overlay for more items if count exceeds standard grid layout */}
                            {index === 3 && images.length > 5 && (
                                <div className="absolute inset-0 bg-brand-primary/80 flex flex-col items-center justify-center text-white p-2 text-center">
                                    <Maximize2 size={20} className="mb-1 md:mb-2 text-brand-accent shrink-0" />
                                    <span className="text-[9px] md:text-xs uppercase font-bold tracking-widest">+{images.length - 5} More Media</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>
            
            {activeImageIdx !== null && (
                <div className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-between p-2 md:p-12">
                    <button onClick={() => setActiveImageIdx(null)} className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white z-50 p-2">
                        <X size={24} className="md:w-7 md:h-7" />
                    </button>

                    <button
                        disabled={activeImageIdx === 0}
                        onClick={() => setActiveImageIdx(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
                        className="text-white/50 hover:text-white disabled:opacity-20 transition-opacity p-2 z-10 shrink-0"
                    >
                        <ChevronLeft size={28} className="md:w-9 md:h-9" />
                    </button>

                    <div className="max-w-5xl max-h-[80vh] flex flex-col items-center px-2 w-full">
                        <img
                            src={images[activeImageIdx]}
                            alt={`Asset Presentation Screen ${activeImageIdx + 1}`}
                            className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain select-none"
                        />
                        <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mt-4 text-center">
                            Asset Showcase Frame {activeImageIdx + 1} of {images.length}
                        </span>
                    </div>

                    <button
                        disabled={activeImageIdx === images.length - 1}
                        onClick={() => setActiveImageIdx(prev => prev !== null && prev < images.length - 1 ? prev + 1 : prev)}
                        className="text-white/50 hover:text-white disabled:opacity-20 transition-opacity p-2 z-10 shrink-0"
                    >
                        <ChevronRight size={28} className="md:w-9 md:h-9" />
                    </button>
                </div>
            )}
        </>
    );
}