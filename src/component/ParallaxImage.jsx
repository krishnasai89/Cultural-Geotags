"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;

    // Animate the image position from top to bottom based on scroll progress
    gsap.fromTo(
      img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom", // Starts when the container enters the bottom of the screen
          end: "bottom top", // Ends when the container leaves the top of the screen
          scrub: true, // Smoothly links the animation to the scrollbar movement
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 aspect-[4/5] bg-slate-900 shadow-2xl"
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        // scale-120 gives the image extra room to move inside the hidden wrapper boundaries
        className="w-full h-[120%] object-cover absolute top-0 left-0 scale-120 will-change-transform"
      />
    </div>
  );
}
