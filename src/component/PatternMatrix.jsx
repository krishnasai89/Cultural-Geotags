"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PatternMatrix({ item }) {
  const [activeTab, setActiveTab] = useState("chronicle");
  const panelRef = useRef(null);

  useEffect(() => {
    // Smoothly fade-in component sections when the tab state shifts
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeTab]);

  return (
    <div className="border-t border-white/10 pt-6 mt-2">
      {/* Tab Selectors */}
      <div className="flex gap-4 mb-4 border-b border-white/5 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab("chronicle")}
          data-hover
          className={`pb-2 transition-colors uppercase tracking-wider ${
            activeTab === "chronicle"
              ? "text-emerald-400 border-b border-emerald-400"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {"//"} Chronicle
        </button>
        <button
          onClick={() => setActiveTab("geometry")}
          data-hover
          className={`pb-2 transition-colors uppercase tracking-wider ${
            activeTab === "geometry"
              ? "text-emerald-400 border-b border-emerald-400"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {"//"} Design Geometry
        </button>
      </div>

      {/* Dynamic Conditional Display Panel Wrapper */}
      <div ref={panelRef} className="min-h-[100px]">
        {activeTab === "chronicle" && (
          <div>
            {item.history ? (
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
                {item.history}
              </p>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-xs font-mono text-slate-500 italic">
                ⚠️ Archive Alert: No historical records found mapped to
                coordinates {item.geotag || "N/A"}. Documentation pending
                structural review.
              </div>
            )}
          </div>
        )}

        {activeTab === "geometry" && (
          <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-slate-600 block mb-1">GEOTAG NODE</span>
              <span className="text-emerald-400 font-bold">
                {item.geotag || "GLOBAL_ROOT"}
              </span>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-slate-600 block mb-1">PATTERN METRIC</span>
              <span className="text-white font-bold">
                {item.history ? "COMPLEX_WEAVE" : "NULL_SIGNATURE"}
              </span>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5 col-span-2">
              <span className="text-slate-600 block mb-1">
                ARCHIVE STATUS INDEX
              </span>
              <span className="text-slate-300">
                {item.history
                  ? "SYSTEM_VERIFIED // Secure entry access authorized."
                  : "DATA_GAP // Awaiting on-site telemetry ingestion."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
