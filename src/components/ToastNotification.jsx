// src/components/ToastNotification.jsx
"use client";
import { useApp } from "@/context/AppContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ToastNotification() {
  const { toast } = useApp();
  const toastRef = useRef(null);

  useEffect(() => {
    if (toast) {
      gsap.fromTo(
        toastRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
      );
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999999] font-mono text-xs max-w-sm animate-fade-in">
      <div
        className={`p-4 rounded-xl border backdrop-blur-xl flex items-center gap-3 shadow-2xl ${
          toast.type === "error"
            ? "border-red-500/30 bg-red-950/20 text-red-400"
            : "border-emerald-500/30 bg-slate-900/80 text-emerald-400"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-400" : "bg-emerald-400 animate-pulse"}`}
        />
        <p className="leading-relaxed">{toast.message}</p>
      </div>
    </div>
  );
}
