// src/components/Breadcrumbs.jsx
"use client";
import Link from "next/link";

export default function Breadcrumbs({ itemTitle, category }) {
  return (
    <nav className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
      <Link href="/" className="hover:text-white transition-colors">
        [ ARCHIVE ]
      </Link>
      <span>/</span>
      <span className="text-slate-400">{category}</span>
      <span>/</span>
      <span className="text-emerald-400 font-bold">{itemTitle}</span>
    </nav>
  );
}
