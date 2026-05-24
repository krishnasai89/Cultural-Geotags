// src/components/ArtifactCard.jsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ArtifactCard({ item }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // Subtle float entry animation using GSAP
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl max-w-sm transition-shadow duration-300 hover:shadow-2xl/30"
    >
      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
        📍 {item.geotag || "Unknown Origin"}
      </span>

      <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
      <p className="text-sm text-gray-300 mt-1">{item.category}</p>

      {/* Conditional rendering for history/patterns */}
      {item.history ? (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-xs font-semibold uppercase text-gray-400">
            History &amp; Patterns
          </h4>
          <p className="text-sm text-gray-200 mt-1 line-clamp-3">
            {item.history}
          </p>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t border-white/10 italic text-xs text-gray-500">
          Historical record pending documentation...
        </div>
      )}
    </div>
  );
}
