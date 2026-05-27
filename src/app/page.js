"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { culturalItems } from "@/data/items";
import ThreeBackground from "@/components/ThreeBackground";
import TextRevealHeader from "@/components/TextRevealHeader";
import CategoryNav from "@/components/CategoryNav";
import SearchMatrix from "@/components/SearchMatrix";
import ArtifactCard from "@/components/ArtifactCard";
import HomeSkeletalLoader from "@/components/HomeSkeletalLoader";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  const regionOptions = Array.from(
    new Set(culturalItems.map((item) => item.geotag).filter(Boolean)),
  ).slice(0, 8);

  const filteredItems = culturalItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All Items" || item.category === activeCategory;

    const matchesRegion =
      selectedRegion === "All Regions" || item.geotag === selectedRegion;

    const cleanQuery = searchQuery.toLowerCase().trim();
    const matchesSearch =
      cleanQuery === "" ||
      item.title?.toLowerCase().includes(cleanQuery) ||
      item.geotag?.toLowerCase().includes(cleanQuery) ||
      item.category?.toLowerCase().includes(cleanQuery);

    return matchesCategory && matchesRegion && matchesSearch;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    requestAnimationFrame(() => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".group");

      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      }
    });
  }, [
    activeCategory,
    searchQuery,
    selectedRegion,
    filteredItems.length,
    loading,
  ]);

  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12 selection:bg-emerald-500 selection:text-black">
      <ThreeBackground />

      <div className="relative z-10">
        <TextRevealHeader />

        <CategoryNav
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <SearchMatrix
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          regionOptions={regionOptions}
        />
      </div>

      {loading ? (
        <HomeSkeletalLoader />
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <div className="relative z-10 max-w-md mx-auto text-center border border-dashed border-white/10 p-12 rounded-2xl font-mono text-xs text-slate-500 mt-12 animate-fade-in">
              {"//"} NO ARTIFACT RECORDS MATCHING CURRENT TELEMETRY FILTERS.
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("All Regions");
                  setActiveCategory("All Items");
                }}
                className="block mx-auto mt-4 text-emerald-400 underline hover:text-emerald-300 cursor-pointer"
              >
                [ RESET ALL QUERY CRITERIA ]
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px] grid-flow-row-dense"
            >
              {filteredItems.map((item) => (
                <ArtifactCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
