// src/app/item/[id]/page.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { gsap } from "gsap";
import { culturalItems } from "@/data/items";
import ThreeBackground from "@/component/ThreeBackground";
import MagneticWrapper from "@/component/MagneticWrapper";
import TextSplitReveal from "@/component/TextSplitReveal";
import PatternMatrix from "@/component/PatternMatrix";
import CommerceConsole from "@/component/CommerceConsole";
import ZoomableCanvas from "@/component/ZoomableCanvas";

export default function ItemPage() {
  const params = useParams();
  const itemId = parseInt(params.id, 10);
  const item = culturalItems.find((p) => p.id === itemId);

  // Fallback if data point index is invalid
  if (!item) notFound();

  // Handle active preview images dynamically
  const [activeImage, setActiveImage] = useState(item.image);
  const mainImageRef = useRef(null);

  // Combined list of assets (Main display asset + internal pattern closeups)
  const allImages = [item.image, ...(item.patterns || [])];

  const handleThumbnailClick = (newImg) => {
    if (newImg === activeImage) return;

    // Trigger a sleek creative cross-fade transition using GSAP
    gsap.fromTo(
      mainImageRef.current,
      { opacity: 0.3, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
    );
    setActiveImage(newImg);
  };

  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12">
      <ThreeBackground />

      <div className="relative z-10 max-w-6xl mx-auto mt-8">
        {/* Back Link Layer Wrapper */}
        <MagneticWrapper>
          <Link
            href="/"
            data-hover
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300 p-4 transition-colors mb-4 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>{" "}
            Back to Archive Map
          </Link>
        </MagneticWrapper>

        {/* Core Media Grid Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* SIDEBAR VIEWPORT & MAIN CANVAS: Takes up 7 column units */}
          {/* CORE MEDIA LAYOUT FRAMEWORK: Dynamically scales from stacked on mobile to side-by-side on desktop */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 h-full w-full">
            {/* Left Thumbnail Ribbon: Horizontal list on mobile, turns into a vertical bar on lg screens */}
            <div className="w-full sm:w-20 flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto pb-2 sm:pb-0 pr-0 sm:pr-2 h-auto sm:h-full scrollbar-none scroll-smooth shrink-0">
              {allImages.map((imgUrl, index) => {
                const isSelected = imgUrl === activeImage;
                return (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(imgUrl)}
                    // data-hover ensures your custom cursor expands even on touch taps
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
            <ZoomableCanvas
              src={activeImage}
              alt={item.title}
              geotag={item.geotag}
            />
          </div>

          <div className="lg:col-span-5 p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                {item.category}
              </span>
              <TextSplitReveal text={item.title} />
            </div>
            <PatternMatrix item={item} />
            <CommerceConsole price={item.price} itemTitle={item.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
