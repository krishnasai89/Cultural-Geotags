"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function CommerceConsole({ item }) {
  const { addToCart, setIsCartOpen } = useApp();
  const [paymentStep, setPaymentStep] = useState("idle");
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleLocalAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!item) {
      console.error("Commerce Error: No valid item object found.");
      return;
    }
    console.log("Submitting custom payload allocation amount:", quantity);
    addToCart(item, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("complete");
    }, 2000);
  };

  return (
    <div className="border-t border-white/10 pt-6 mt-4 flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-baseline justify-between bg-slate-950/40 p-4 rounded-xl border border-white/5">
        <span className="text-slate-500 uppercase tracking-widest">
          Valuation Index
        </span>
        <span className="text-2xl font-bold text-emerald-400 tracking-tight">
          {item?.price || "Price on Request"}
        </span>
      </div>

      <div className="flex flex-col gap-2 bg-slate-950/20 p-4 rounded-xl border border-white/5">
        <div className="text-slate-500 uppercase tracking-widest text-[10px]">
          select Allocation Quantity:
        </div>

        <div className="flex items-center w-36 bg-slate-950 border border-white/10 rounded-xl overflow-hidden h-11">
          <button
            type="button"
            onClick={decrement}
            data-hover
            className="w-12 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.03] transition-colors border-r border-white/5 text-sm cursor-pointer select-none"
          >
            —
          </button>
          <div className="flex-1 text-center font-bold text-white text-sm select-none">
            {quantity}
          </div>
          <button
            type="button"
            onClick={increment}
            data-hover
            className="w-12 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.03] transition-colors border-l border-white/5 text-sm cursor-pointer select-none"
          >
            +
          </button>
        </div>
      </div>

      {paymentStep === "idle" && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button
            onClick={handleLocalAdd}
            data-hover
            className="w-full py-4 uppercase tracking-widest rounded-xl font-bold border border-white/10 bg-white/[0.02] text-slate-300 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            [ Add to Cart ]
          </button>
          <button
            onClick={handleBuyNow}
            data-hover
            className="w-full py-4 uppercase tracking-widest rounded-xl font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors cursor-pointer"
          >
            Instant Checkout →
          </button>
        </div>
      )}
      {paymentStep === "processing" && (
        <div className="w-full p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-center text-emerald-400">
          INITIALIZING GATEWAY CHANNEL SECURING TELEMETRY...
        </div>
      )}

      {paymentStep === "complete" && (
        <div className="w-full p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col gap-2">
          <div className="text-emerald-400 font-bold tracking-widest uppercase">
            ✓ TRANSACTION SECURED
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Acquisition complete for{" "}
            <span className="text-white font-medium">{item?.title}</span>. Your
            digital provenance certificate has been mapped onto the archive
            ledger.
          </p>
          <button
            onClick={() => setPaymentStep("idle")}
            className="text-left text-[10px] underline text-slate-500 hover:text-slate-300 mt-2"
          >
            Reset Terminal Core
          </button>
        </div>
      )}
    </div>
  );
}
