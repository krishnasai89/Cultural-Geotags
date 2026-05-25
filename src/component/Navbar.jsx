import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[50] w-full border-b border-white/5 bg-slate-950/40 backdrop-blur-md px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Branding Logo */}
        <MagneticWrapper>
          <Link
            href="/"
            data-hover
            className="text-sm font-mono font-bold tracking-[0.25em] uppercase text-white"
          >
            GEO<span className="text-emerald-400">TAG</span>.ARCHIVE
          </Link>
        </MagneticWrapper>

        {/* Global Navigation Triggers */}
        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest">
          <Link
            href="/"
            data-hover
            className="text-slate-400 hover:text-white transition-colors"
          >
            Map
          </Link>
          <a
            href="#footer"
            data-hover
            className="text-slate-400 hover:text-white transition-colors"
          >
            Index
          </a>
        </div>
      </div>
    </nav>
  );
}
