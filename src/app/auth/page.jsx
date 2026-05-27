"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import ThreeBackground from "@/components/ThreeBackground";

export default function AuthPage() {
  const { user, login, logout, register, isMounted } = useApp();
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === "login") {
      login(email, password);
    } else {
      const res = register(email, password, name);
      if (res.success) setAuthMode("login");
    }
  };

  if (!isMounted) return null;

  return (
    <main className="relative min-h-screen text-slate-100 p-6 md:p-12 flex items-center justify-center font-mono text-xs">
      <ThreeBackground />

      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
        {/* CASE A: USER RECOGNIZED & AUTHORIZED PANEL */}
        {user ? (
          <div className="flex flex-col gap-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-emerald-400 font-bold tracking-widest uppercase">
                SECURE INTERFACE ACTIVE
              </span>
            </div>

            <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl space-y-2">
              <div>
                <span className="text-slate-500">OPERATOR:</span>{" "}
                <span className="text-white font-bold">{user.name}</span>
              </div>
              <div>
                <span className="text-slate-500">ROUTING_EMAIL:</span>{" "}
                <span className="text-slate-300">{user.email}</span>
              </div>
              <div>
                <span className="text-slate-500">SECURITY_CLEARANCE:</span>{" "}
                <span className="text-emerald-400 font-bold uppercase">
                  {user.role} ({user.clearance || "level_1"})
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your terminal link is securely synchronized with the spatial
              ledger networks. All catalog queries, structural cart allocations,
              and data provenance requests are authenticated.
            </p>

            <button
              onClick={logout}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors cursor-pointer mt-2"
            >
              [ Terminate Security Session ]
            </button>
          </div>
        ) : (
          /* CASE B: VISITOR UNAUTHENTICATED FORM INTERACTION GATE */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-emerald-400 font-bold tracking-widest uppercase">
                {authMode === "login"
                  ? "SYSTEM_SIGN_IN"
                  : "COLD_START_REGISTRATION"}
              </span>
              <div className="flex gap-2 text-[10px]">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`cursor-pointer ${authMode === "login" ? "text-white underline" : "text-slate-500 hover:text-slate-300"}`}
                >
                  LOGIN
                </button>
                <span className="text-slate-700">|</span>
                <button
                  onClick={() => setAuthMode("register")}
                  className={`cursor-pointer ${authMode === "register" ? "text-white underline" : "text-slate-500 hover:text-slate-300"}`}
                >
                  REGISTER
                </button>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
              {authMode === "register" && (
                <div className="space-y-1">
                  <label className="text-slate-500 block uppercase text-[10px]">
                    Operator Identity Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Alexander Smith"
                    className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-slate-500 block uppercase text-[10px]">
                  Network Node Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.spatial"
                  className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 block uppercase text-[10px]">
                  Access Core Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-400 text-slate-950 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-300 transition-colors cursor-pointer mt-2"
              >
                {authMode === "login"
                  ? "Execute Authentication →"
                  : "Generate Secure Account Node"}
              </button>
            </form>

            <div className="text-[10px] text-slate-500 border-t border-white/5 pt-3 leading-relaxed">
              <span className="text-emerald-400/70">💡 CORE ROUTING TIP:</span>{" "}
              Use <code className="text-white">admin@geotag.archive</code> /{" "}
              <code className="text-white">admin123</code> for curator
              clearance, or create a brand-new custom node profile instantly
              using the register link toggle.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
