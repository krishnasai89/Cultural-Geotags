"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TextSplitReveal({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    // Select all the character spans we created below
    const chars = el.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.03, // The "secret sauce" for the letter-by-letter look
        delay: 0.2,
      },
    );
  }, [text]);

  return (
    <h1
      ref={containerRef}
      className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none flex flex-wrap"
    >
      {text.split("").map((char, index) => (
        <span key={index} className="overflow-hidden inline-block py-1">
          <span
            className="char inline-block will-change-transform"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </h1>
  );
}
