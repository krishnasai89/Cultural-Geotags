"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { cart, user, logout, setIsCartOpen, isMounted } = useApp();

  const router = useRouter();

  const totalCartItems = isMounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <nav className="sticky top-0 z-[50] w-full border-b border-white/5 bg-slate-950/40 backdrop-blur-md px-6 py-4 md:px-12 font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.25em] uppercase text-white"
        >
          GEO<span className="text-emerald-400">TAG</span>.ARCHIVE
        </Link>

        <div className="flex items-center gap-6 text-xs uppercase tracking-widest">
          <button
            onClick={() => {
              if (user && isMounted) {
                logout();
              } else {
                router.push("/auth");
              }
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${user && isMounted ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`}
            />
            {user && isMounted
              ? `[ ${user.name} (${user.role}) // Exit ]`
              : "[ Account Auth ]"}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-emerald-400 font-bold bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            CART ({totalCartItems})
          </button>
        </div>
      </div>
    </nav>
  );
}
