"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onHoverEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        borderColor: "#34d399",
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 0,
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

    window.addEventListener("mousemove", moveCursor);
    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-hover]",
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onHoverEnter);
        el.addEventListener("mouseleave", onHoverLeave);
      });
    };

    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-7 left-7 w-4 h-4 bg-emerald-400 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-7 left-7 w-10 h-10 border-2 border-emerald-400 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
