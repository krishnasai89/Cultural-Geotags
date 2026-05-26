// src/components/PatternMatrix.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PatternMatrix({ item }) {
  const [activeTab, setActiveTab] = useState("chronicle");
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeTab]);

  return (
    <div className="border-t border-white/10 pt-6 mt-2">
      {/* Dynamic Selector Navigation Rails */}
      <div className="flex flex-wrap gap-4 mb-4 border-b border-white/5 pb-2 text-xs font-mono">
        {["chronicle", "weaving", "design"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-hover
            className={`pb-2 transition-colors uppercase tracking-wider ${
              activeTab === tab
                ? "text-emerald-400 border-b border-emerald-400 font-bold"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {"//"} {tab}
          </button>
        ))}
      </div>

      {/* Narrative Matrix Render Engine */}
      <div ref={panelRef} className="min-h-[150px]">
        <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
          {item[activeTab] || item.history || "Telemetry profile empty."}
        </p>

        {/* Render Price tag conditionally beneath the content */}
        {item.price && activeTab === "chronicle" && (
          <div className="mt-4 inline-block bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-400">
            VALUATION INDEX: {item.price}
          </div>
        )}
      </div>
    </div>
  );
}
