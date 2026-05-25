"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    // Set initial off-screen positions to avoid sudden pop-ins
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      // The inner dot moves instantly with zero lag
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // The outer ring trails behind with a smooth elastic duration
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Hover effect functions
    const onHoverEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        backgroundColor: "rgba(52, 211, 153, 0.1)", // alpha emerald-400
        borderColor: "#34d399",
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 0, // hide dot while ring expands
        duration: 0.2,
      });
    };

    const onHoverLeave = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      });
    };

    // Attach global mouse movement tracking
    window.addEventListener("mousemove", moveCursor);

    // Dynamic listener helper for custom interactive hovers
    const attachHoverListeners = () => {
      // Targets standard links, buttons, and custom attribute tags
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-hover]",
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onHoverEnter);
        el.addEventListener("mouseleave", onHoverLeave);
      });
    };

    // Run listeners immediately and watch out for framework routing changes
    attachHoverListeners();

    // Setup an observer to catch newly mounted structural components
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hidden completely on mobile touch interfaces via tailwind hidden md:block */}
      <div
        ref={dotRef}
        className="fixed top-1/12 left-1/12 w-4 h-4 bg-emerald-400 rounded-full pointer-events-none z-[99999] -translate-x-1/12 -translate-y-1/12"
      />
      <div
        ref={ringRef}
        className="fixed top-1/12 left-1/12 w-10 h-10 border-2 border-emerald-400 rounded-full pointer-events-none z-[99998] -translate-x-1/12 -translate-y-1/12"
      />
    </>
  );
}
