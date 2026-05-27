// src/components/ZoomableCanvas.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ZoomableCanvas({ src, alt, geotag }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const handleToggleZoom = () => {
    const nextZoomState = !isZoomed;
    setIsZoomed(nextZoomState);

    // If zooming out, reset image placement immediately back to origin coordinates
    if (!nextZoomState) {
      gsap.to(imgRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const container = containerRef.current;
    const img = imgRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();

    // Determine percentage placement relative to center coordinates
    const mouseX = (e.clientX - left) / width;
    const mouseY = (e.clientY - top) / height;

    // Calculate maximum pan offsets (Based on a 2x zoom dimension threshold)
    const moveX = (mouseX - 0.5) * -width;
    const moveY = (mouseY - 0.5) * -height;

    gsap.to(img, {
      scale: 2, // 200% scaling index for deep textile diagnostics
      x: moveX,
      y: moveY,
      duration: 0.2, // Tiny inertia lag to simulate weight
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleToggleZoom}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isZoomed && handleToggleZoom()} // Auto-safeguard reset on exit
      data-hover
      className={`flex-1 relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 h-full shadow-2xl transition-all duration-300 ${
        isZoomed ? "cursor-zoom-out border-emerald-500/30" : "cursor-zoom-in"
      }`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform origin-center"
      />

      {/* Absolute Badges */}
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-950/70 backdrop-blur-md text-[9px] font-mono tracking-wider uppercase text-emerald-400 pointer-events-none">
        📍 {geotag}
      </div>

      {/* <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1.5 rounded-lg border border-white/5 bg-slate-950/40 backdrop-blur-md text-[8px] font-mono tracking-widest uppercase text-slate-400 pointer-events-none">
        {isZoomed ? "[ CLICK TO COLLAPSE ]" : "[ CLICK TO MAGNIFY ]"}
      </div> */}
    </div>
  );
}
