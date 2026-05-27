// src/components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full border-t border-white/10 bg-slate-950/80 mt-32 px-6 py-12 md:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono text-slate-500">
        {/* Identity block */}
        <div className="flex flex-col gap-2">
          <span className="text-slate-300 font-bold tracking-widest uppercase">
            GEOTAG ARCHIVE SYSTEM
          </span>
          <p className="leading-relaxed max-w-xs text-slate-500">
            Mapping cultural textile coordinates, regional artifacts, and
            ancient geometries onto modern spatial structures.
          </p>
        </div>

        {/* System telemetry metadata */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-400 uppercase tracking-wider mb-1">
            // Telemetry Metrics
          </span>
          <div>
            CORE ENG:{" "}
            <span className="text-slate-300">NEXT.JS // VANILLA JSX</span>
          </div>
          <div>
            RENDER LAYER: <span className="text-slate-300">WEBGL THREE.JS</span>
          </div>
          <div>
            ANIMATION HOOK:{" "}
            <span className="text-slate-300">GSAP TIMELINE</span>
          </div>
        </div>

        {/* Terminal operational timestamp */}
        <div className="flex flex-col md:items-end justify-between">
          <div className="text-right hidden md:block">
            <span className="text-emerald-400/70 animate-pulse">
              ● SYSTEM ACTIVE
            </span>
          </div>
          <span className="text-[11px] text-slate-600 mt-4 md:mt-0">
            © 2026 GEOTAG ARCHIVE. ALL RIGHTS RESERVED CULTURAL PROTOTYPE.
          </span>
        </div>
      </div>
    </footer>
  );
}
