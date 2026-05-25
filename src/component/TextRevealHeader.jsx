"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TextRevealHeader() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Step-by-step reveal timeline
    tl.to(".reveal-line", {
      y: 0,
      duration: 1.2,
      stagger: 0.2,
    }).fromTo(
      subRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6", // Overlaps slightly with the title animation for smoothness
    );
  }, []);

  return (
    <header
      ref={containerRef}
      className="max-w-7xl mx-auto mb-16 border-b border-white/10 pb-8"
    >
      <div className="overflow-hidden h-5 mb-1">
        <span
          ref={subRef}
          className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block"
        >
          Cultural Archive Engine v1.0
        </span>
      </div>

      {/* Title with hidden overflow masking lines */}
      <h1
        ref={titleRef}
        className="text-5xl md:text-7xl font-black tracking-tighter uppercase flex flex-col gap-1"
      >
        <div className="overflow-hidden py-1">
          <span className="reveal-line inline-block translate-y-[110%] will-change-transform">
            Spatial
          </span>
        </div>
        <div className="overflow-hidden py-1">
          <span className="reveal-line inline-block translate-y-[110%] will-change-transform text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-emerald-500">
            Geotags
          </span>
        </div>
      </h1>
    </header>
  );
}
