"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArtifactCard({ item }) {
  const cardRef = useRef(null);

  // 1. Maintain the premium asymmetric dimension layout mapping
  let sizeClasses = "col-span-1 row-span-1";
  if (item.size === "tall") sizeClasses = "col-span-1 row-span-2";
  if (item.size === "wide") sizeClasses = "md:col-span-2 row-span-1";

  useEffect(() => {
    const el = cardRef.current;

    // Clear animations to prevent timeline overlapping during filter actions
    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%", // Fires early when rendering dynamically onto screen view
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      // Complete cleanup across all standard animation streams
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [item]); // Forces recalculation smoothly when state arrays change colors/categories

  return (
    // Wrap card securely in the dynamic navigation routing layer
    <Link
      href={`/item/${item.id}`}
      className={`block h-full w-full ${sizeClasses}`}
    >
      <div
        ref={cardRef}
        className="group relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 opacity-0 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer"
      >
        {/* Immersive Image Canvas Backing */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Spatial Gradient Shadow Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Glassmorphic Technical Profile Overlay Content Card */}
        <div className="absolute inset-x-4 bottom-4 p-5 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-md flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-[-4px]">
          {/* Geotag Indicator */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-emerald-400 mb-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            📍 {item.geotag || "Unknown Origin"}
          </div>

          <span className="text-[11px] text-slate-400 uppercase tracking-widest">
            {item.category}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
            {item.title}
          </h3>

          {/* Conditional Layout Rendering for Histories/Patterns */}
          {item.history ? (
            <div className="mt-2 text-xs text-slate-300 leading-relaxed font-light opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[120px] transition-all duration-500 ease-in-out">
              <h4 className="text-[10px] font-mono uppercase text-slate-400 mb-1 border-t border-white/10 pt-2">
                History &amp; Patterns
              </h4>
              <p className="line-clamp-3">{item.history}</p>
            </div>
          ) : (
            <div className="mt-2 text-[11px] text-slate-500 italic font-mono opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[50px] transition-all duration-500 ease-in-out border-t border-white/5 pt-2">
              {"//"} Historical record archive empty
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
