// src/app/item/[id]/page.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import { gsap } from "gsap";
import { culturalItems } from "@/data/items";
import { useApp } from "@/context/AppContext";

// Core Architectural Components
import ThreeBackground from "@/components/ThreeBackground";
import Breadcrumbs from "@/components/Breadcrumbs";
import SkeletalLoader from "@/components/SkeletalLoader";
import ZoomableCanvas from "@/components/ZoomableCanvas";
import PatternMatrix from "@/components/PatternMatrix";
import CommerceConsole from "@/components/CommerceConsole";
import TextSplitReveal from "@/components/TextSplitReveal";

export default function ItemPage() {
  const params = useParams();
  const itemId = parseInt(params.id, 10);
  const item = culturalItems.find((p) => p.id === itemId);

  if (!item) notFound();
  const { hasPermission } = useApp();
  // Combined State Machinery
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(item.image);
  const mainImageRef = useRef(null);

  const allImages = [item.image, ...(item.patterns || [])];

  useEffect(() => {
    // Mimic quick server telemetry sync data absorption delay
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleThumbnailClick = (newImg) => {
    if (newImg === activeImage) return;

    // Trigger a sleek creative cross-fade transition using GSAP
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0.3, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      );
    }
    setActiveImage(newImg);
  };

  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12">
      <ThreeBackground />

      <div className="relative z-10 max-w-6xl mx-auto mt-4">
        {/* Render Breadcrumbs instantly for navigational context tracking */}
        <Breadcrumbs itemTitle={item.title} category={item.category} />

        {loading ? (
          // Play pristine layout skeleton framing core
          <SkeletalLoader />
        ) : (
          // Transition real spatial node blocks cleanly into viewport
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
            {/* LEFT COLUMN - MEDIA CONTAINER LAYER (z-10) */}
            {/* Preserved your custom height of h-[800px] on desktop for grand scale presentation */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 h-[550px] sm:h-[850px] lg:h-[1000px] w-full relative z-10">
              {/* Swipeable responsive thumbnail ribbon */}
              <div className="w-full sm:w-20 flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto pb-2 sm:pb-0 pr-0 sm:pr-2 h-auto sm:h-full scrollbar-none scroll-smooth shrink-0">
                {allImages.map((imgUrl, index) => {
                  const isSelected = imgUrl === activeImage;
                  return (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(imgUrl)}
                      data-hover
                      className={`relative w-20 sm:w-full aspect-[3/4] rounded-lg overflow-hidden border transition-all duration-300 shrink-0 ${
                        isSelected
                          ? "border-emerald-400 ring-1 ring-emerald-400"
                          : "border-white/10 opacity-60 hover:opacity-90"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt="Thumbnail view"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Macro-Pan Lens Canvas */}
              <ZoomableCanvas
                ref={mainImageRef}
                src={activeImage}
                alt={item.title}
                geotag={item.geotag}
              />
            </div>

            {/* RIGHT COLUMN - TEXT & COMMERCE DATA PANEL LAYER (z-20) */}
            {/* Shield layer enabled to ensure buttons remain perfectly clickable */}
            <div className="lg:col-span-5 p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col gap-4 relative z-20">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {item.category}
                </span>
                <TextSplitReveal text={item.title} />
              </div>

              <PatternMatrix item={item} />

              {/* Fully connected reactive state commerce engine */}
              <CommerceConsole item={item} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
