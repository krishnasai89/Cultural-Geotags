"use client";

export default function SearchMatrix({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  regionOptions,
}) {
  return (
    <div className="max-w-7xl mx-auto mb-10 font-mono text-xs space-y-4">
      <div className="relative bg-slate-950/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-emerald-500/40 transition-colors">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 uppercase text-[10px]">
          [ SEARCH_QUERY ]
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ENTER ARTIFACT NAME, SPECIFIC PLACE, OR REGIONAL GEOTAG METRIC..."
          className="w-full bg-transparent pl-32 pr-6 py-4 text-white focus:outline-none placeholder:text-slate-600 uppercase tracking-wide text-xs"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-slate-500 uppercase text-[10px] mr-2">
          FILTER_BY_REGION:
        </span>

        <button
          onClick={() => setSelectedRegion("All Regions")}
          className={`px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            selectedRegion === "All Regions"
              ? "bg-emerald-400 text-slate-950 border-emerald-400 font-bold"
              : "bg-white/[0.02] text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
          }`}
        >
          [ ALL_LOCATIONS ]
        </button>

        {regionOptions.map((region, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedRegion(region)}
            className={`px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              selectedRegion === region
                ? "bg-emerald-400 text-slate-950 border-emerald-400 font-bold"
                : "bg-white/[0.02] text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
            }`}
          >
            {region.split(",")[0]}{" "}
          </button>
        ))}
      </div>
    </div>
  );
}
