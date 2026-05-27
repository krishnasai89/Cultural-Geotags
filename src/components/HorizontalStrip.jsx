"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalStrip({ patterns = [] }) {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);

  useEffect(() => {
    if (!patterns.length) return;

    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;

    const scrollAmount = scrollSection.scrollWidth - window.innerWidth;

    if (scrollAmount > 0) {
      gsap.fromTo(
        scrollSection,
        { x: 0 },
        {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [patterns]);

  if (!patterns.length) return null;

  return (
    <div
      ref={containerRef}
      className="w-full bg-slate-950/20 overflow-hidden my-24"
    >
      <div className="h-screen w-full flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full px-6 md:px-12 mb-8 font-mono text-xs text-slate-500 uppercase tracking-widest">
          <span> Close-up Pattern Texture Diagnostics</span>
        </div>
        <div ref={scrollSectionRef} className="flex gap-12 px-6 md:px-12 w-max">
          {patterns.map((url, idx) => (
            <div
              key={idx}
              className="w-[300px] md:w-[450px] aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl relative group"
            >
              <img
                src={url}
                alt={`Pattern detail ${idx + 1}`}
                className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded border border-white/5 text-[10px] font-mono text-emerald-400">
                SAMPLE_ID_0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
