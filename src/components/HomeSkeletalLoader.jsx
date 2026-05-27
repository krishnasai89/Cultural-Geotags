"use client";

export default function HomeSkeletalLoader() {
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px] animate-pulse">
      {placeholders.map((_, idx) => {
        let dimensionClasses = "col-span-1 row-span-1";
        if (idx === 1) dimensionClasses = "col-span-1 row-span-2";
        if (idx === 3) dimensionClasses = "md:col-span-2 row-span-1";

        return (
          <div
            key={idx}
            className={`${dimensionClasses} w-full h-full rounded-2xl border border-white/5 bg-slate-900/30 p-6 flex flex-col justify-end gap-3 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="h-3 w-1/3 bg-white/5 rounded-md font-mono text-[9px] text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              LOADING_LOC...
            </div>
            <div className="h-2 w-1/4 bg-white/5 rounded-sm" />
            <div className="h-5 w-3/4 bg-white/5 rounded-md" />
          </div>
        );
      })}
    </div>
  );
}
