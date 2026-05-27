"use client";

const categories = [
  "All Items",
  "Sarees",
  "Mens Clothes",
  "Womens Things",
  "Dolls & Crafts",
  "Designs",
  "Jewellery",
];

export default function CategoryNav({
  activeCategory = "All Items",
  setActiveCategory = () => {},
}) {
  return (
    <nav className="w-full max-w-7xl mx-auto mb-12 border-b border-white/5 pb-6 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-3 min-w-max px-2">
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory?.(cat)}
              data-hover
              className={`text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 relative cursor-pointer ${
                isActive
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-2">
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span>{cat}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
