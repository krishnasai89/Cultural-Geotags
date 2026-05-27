"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) onClose();
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md font-mono text-xs p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <span className="text-emerald-400 font-bold tracking-widest">
            SECURE GATEWAY CHANNEL
          </span>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            [ X ]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1">
            <label className="text-slate-500 block uppercase text-[10px]">
              Security Node Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="explorer@dev.spatial or admin@geotag.archive"
              className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500/50"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 block uppercase text-[10px]">
              Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Any text (or 'admin123' for admin clearance)"
              className="w-full bg-slate-950 border border-white/5 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-slate-950 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-300 transition-colors mt-2"
          >
            Authenticate Token
          </button>
        </form>

        <div className="text-[10px] text-slate-500 border-t border-white/5 pt-3 leading-relaxed">
          <span className="text-emerald-400/70">💡 TECH PRO TIP:</span> Submit{" "}
          <code className="text-white">admin@geotag.archive</code> and{" "}
          <code className="text-white">admin123</code> to toggle structural
          admin access.
        </div>
      </div>
    </div>
  );
}
