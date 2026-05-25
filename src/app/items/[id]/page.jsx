import MagneticWrapper from "@/component/MagneticWrapper";
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
        {/* WRAP THE BACK LINK IN THE MAGNETIC FORCE FIELD LAYER */}
        <MagneticWrapper>
          <Link
            href="/"
            // We append data-hover so our custom cursor script automatically expands its ring bounds on hover!
            data-hover
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300 p-4 transition-colors mb-4 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>{" "}
            Back to Archive Map
          </Link>
        </MagneticWrapper>

        {/* ... Rest of your asymmetric structural layouts ... */}
      </div>
    </main>
  );
}
