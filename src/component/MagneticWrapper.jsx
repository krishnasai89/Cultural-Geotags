"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MagneticWrapper({ children }) {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();

      // Calculate the absolute center coordinates of the button
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance between mouse pointer and element center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Move the element slightly toward the mouse (using 0.35 multiplier to scale intensity)
      gsap.to(el, {
        x: distanceX * 0.35,
        y: distanceY * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Snap the button cleanly back to its baseline position when the mouse moves away
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    // We add inline-block to prevent the magnetic bounding box from taking up 100% width
    <div ref={magneticRef} className="inline-block">
      {children}
    </div>
  );
}
