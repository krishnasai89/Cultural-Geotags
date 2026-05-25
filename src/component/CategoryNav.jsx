"use client";

const categories = [
  "All Items",
  "Sarees",
  "Mens Clothes",
  "Womens Things",
  "Dolls & Crafts",
  "Designs",
];

// Provide empty fallback function definitions to prevent crashes
export default function CategoryNav({
  activeCategory = "All Items",
  setActiveCategory = () => {},
}) {
  return (
    <nav className="w-full max-w-7xl mx-auto mb-12 border-b border-white/5 pb-4 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-8 min-w-max px-2">
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory?.(cat)}
              data-hover
              className={`text-xs font-mono uppercase tracking-widest transition-all duration-300 relative pb-2 ${
                isActive
                  ? "text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
