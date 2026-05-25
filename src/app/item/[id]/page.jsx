import MagneticWrapper from "@/component/MagneticWrapper";
import ParallaxImage from "@/component/ParallaxImage";
import PatternMatrix from "@/component/PatternMatrix";
import TextSplitReveal from "@/component/TextSplitReveal";
import ThreeBackground from "@/component/ThreeBackground";
import { culturalItems } from "@/data/items";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ItemPage({ params }) {
  const resolvedParams = await params;
  const itemId = parseInt(resolvedParams.id, 10);
  const item = culturalItems.find((p) => p.id === itemId);

  if (!item) notFound();

  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12">
      <ThreeBackground />

      <div className="relative z-10 max-w-5xl mx-auto mt-8">
        <MagneticWrapper>
          <Link
            href="/"
            data-hover
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300 p-4 transition-colors mb-4 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>{" "}
            Back to Archive Map
          </Link>
        </MagneticWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full">
            <ParallaxImage src={item.image} alt={item.title} />
            <div className="absolute top-4 left-4 z-20 p-3 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase text-emerald-400">
              📍 {item.geotag}
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                {item.category}
              </span>
              <TextSplitReveal text={item.title} />
            </div>

            {/* HIGH END INTERACTIVE CONDITIONAL MATRIX PANEL */}
            <PatternMatrix item={item} />
          </div>
        </div>
      </div>
    </main>
  );
}
