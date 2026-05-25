// src/app/page.js
import ArtifactCard from "@/component/Artifact Card";
import TextRevealHeader from "@/component/TextRevealHeader";
import ThreeBackground from "@/component/ThreeBackground";
import { culturalItems } from "@/data/items";

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12 selection:bg-emerald-500 selection:text-black">
      {/* Immersive 3D Interactive WebGL Context */}
      <ThreeBackground />

      {/* Immersive Creative Text Reveal Header */}
      <div className="relative z-10">
        <TextRevealHeader />
      </div>

      {/* Asymmetric Spatial Layout Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px]">
        {culturalItems.map((item) => (
          <ArtifactCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
