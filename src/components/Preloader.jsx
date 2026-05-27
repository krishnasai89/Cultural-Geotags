"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const bootLogs = [
  "// CONNECTING TO GEOTAG REPOSITORY CORE...",
  "// PARSING SPATIAL COORDINATE METADATA...",
  "// LOAD_INDEX: CULTURAL_ARTIFACT_CACHE_LOADED",
  "// ENCRYPTING SSL TERMINAL GATEWAY STACKS...",
  "// INTERFACE READY: STATUS_SECURE_LEVEL_3",
];

export default function Preloader() {
  const [logIndex, setLogIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const screenRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (logIndex < bootLogs.length - 1) {
      const timer = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const tl = gsap.timeline({
        onComplete: () => setComplete(true),
      });

      tl.to(barRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "power1.inOut",
      }).to(screenRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut",
        delay: 0.2,
      });
    }
  }, [logIndex]);

  if (complete) return null;

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[999999] bg-slate-950 font-mono text-xs flex flex-col justify-between p-8 select-none"
    >
      <div className="flex justify-between items-center text-slate-600 text-[10px]">
        <span>SYSTEM_BOOT_SEQUENCE // V16.2.6</span>
        <span>LOCATION_GATE: [ INDIA_WEST_NODE ]</span>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-sm mb-6 animate-pulse">
          GEOTAG.ARCHIVE // SYSTEM LOADING
        </div>

        <div className="space-y-1.5 min-h-[80px]">
          {bootLogs.slice(0, logIndex + 1).map((log, idx) => (
            <div
              key={idx}
              className={`${idx === logIndex ? "text-white" : "text-slate-500"} transition-colors duration-150`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between items-baseline text-[10px] text-slate-500">
          <span>ALLOCATING WORKSPACE RAM CANVAS...</span>
          <span className="text-emerald-500 font-bold">
            {Math.floor(((logIndex + 1) / bootLogs.length) * 100)}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-emerald-400 transition-all duration-300 shadow-[0_0_10px_#10b981]"
            style={{ width: `${((logIndex + 1) / bootLogs.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
