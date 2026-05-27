// src/components/SkeletalLoader.jsx
export default function SkeletalLoader() {
  return (
    <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse font-mono text-xs text-slate-600">
      {/* Media Mock Blocks */}
      <div className="lg:col-span-7 flex gap-4 h-[550px] w-full">
        <div className="w-20 flex flex-col gap-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-full aspect-[3/4] rounded-lg bg-white/5 border border-white/5"
            />
          ))}
        </div>
        <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/10 relative flex items-center justify-center">
          <span>// BUFFERING IMAGE DATA CORE...</span>
        </div>
      </div>

      {/* Content Text Mock Blocks */}
      <div className="lg:col-span-5 p-8 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col gap-6">
        <div className="space-y-2">
          <div className="h-3 w-1/4 bg-white/5 rounded" />
          <div className="h-8 w-3/4 bg-white/5 rounded" />
        </div>
        <div className="space-y-3 border-t border-white/5 pt-6">
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-5/6 bg-white/5 rounded" />
          <div className="h-4 w-4/5 bg-white/5 rounded" />
        </div>
        <div className="h-24 w-full bg-white/[0.01] border border-white/5 rounded-xl" />
      </div>
    </div>
  );
}
