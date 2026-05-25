"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { culturalItems } from "@/data/items";
import ThreeBackground from "@/component/ThreeBackground";
import TextRevealHeader from "@/component/TextRevealHeader";
import CategoryNav from "@/component/CategoryNav";
import ArtifactCard from "@/component/ArtifactCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const gridRef = useRef(null);

  // 1. Filter data array matrix based on category link selection
  const filteredItems = culturalItems.filter((item) => {
    if (activeCategory === "All Items") return true;
    return item.category === activeCategory;
  });

  // 2. Animate grid items when the active category shifts
  useEffect(() => {
    const cards = gridRef.current.querySelectorAll(".group");

    if (cards.length > 0) {
      // Clear out any stale styles and smoothly glide elements in
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }
  }, [activeCategory]); // Re-runs every single time a link is clicked!

  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12 selection:bg-emerald-500 selection:text-black">
      <ThreeBackground />

      <div className="relative z-10">
        <TextRevealHeader />

        {/* Pass down states directly to the real links navbar */}
        <CategoryNav
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* Grid container with reference binding */}
      <div
        ref={gridRef}
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px]"
      >
        {filteredItems.map((item) => (
          <ArtifactCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
