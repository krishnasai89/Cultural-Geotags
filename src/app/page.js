// src/app/page.js
import ArtifactCard from "@/component/ArtifactCard";
import { culturalItems } from "@/data/items";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 selection:bg-emerald-500 selection:text-black">
      {/* Editorial Header Section */}
      <header className="max-w-7xl mx-auto mb-16 border-b border-white/10 pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400">
          Cultural Archive Engine v1.0
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mt-2 uppercase">
          Spatial Geotags
        </h1>
      </header>

      {/* Asymmetric Spatial Layout Grid mapping component items */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px]">
        {culturalItems.map((item) => (
          <ArtifactCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
