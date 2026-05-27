"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import { gsap } from "gsap";
import { culturalItems } from "@/data/items";
import CommerceConsole from "@/components/CommerceConsole";
import PatternMatrix from "@/components/PatternMatrix";
import TextSplitReveal from "@/components/TextSplitReveal";
import ZoomableCanvas from "@/components/ZoomableCanvas";
import SkeletalLoader from "@/components/SkeletalLoader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ThreeBackground from "@/components/ThreeBackground";
import MagneticWrapper from "@/components/MagneticWrapper";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ItemPage() {
  const params = useParams();
  const itemId = parseInt(params.id, 10);
  const item = culturalItems.find((p) => p.id === itemId);

  if (!item) notFound();
  const { hasPermission } = useApp();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(item.image);
  const mainImageRef = useRef(null);

  const allImages = [item.image, ...(item.patterns || [])];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleThumbnailClick = (newImg) => {
    if (newImg === activeImage) return;

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

        {loading ? (
          <SkeletalLoader />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 h-[850px]  w-full relative z-10">
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
              <ZoomableCanvas
                ref={mainImageRef}
                src={activeImage}
                alt={item.title}
                geotag={item.geotag}
              />
            </div>
            <div className="lg:col-span-5 p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col gap-4 relative z-20">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {item.category}
                </span>
                <TextSplitReveal text={item.title} />
              </div>
              <PatternMatrix item={item} />
              <CommerceConsole item={item} />
            </div>
          </div>
        )}
      </div>
      {hasPermission("admin") && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/10 text-xs font-mono text-red-400 mt-2">
          <div className="font-bold uppercase tracking-widest text-red-500 mb-1">
            ⚠️ ADMINISTRATIVE TERMINAL ACTIONS ACTIVE
          </div>
          <p className="text-[11px] text-slate-400 mb-2">
            You hold sufficient Level 3 security clearance to edit or deprecate
            this artifact asset entry from the global ledger database map.
          </p>
          <button
            onClick={() =>
              alert(
                "System Command Issued: Artifact marked for record modification.",
              )
            }
            className="bg-red-500/20 hover:bg-red-500/40 px-3 py-1.5 border border-red-500/40 rounded-lg text-red-200 font-bold transition-colors"
          >
            [ Alter Archive Entry ]
          </button>
        </div>
      )}
    </main>
  );
}
