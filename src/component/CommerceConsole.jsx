"use client";
import { useState } from "react";
import { gsap } from "gsap";
import MagneticWrapper from "./MagneticWrapper";

export default function CommerceConsole({ price, itemTitle }) {
  const [isAdded, setIsAdded] = useState(false);
  const [paymentStep, setPaymentStep] = useState("idle"); // idle, processing, complete

  const handleAddToCart = () => {
    setIsAdded(true);
    // Smooth micro-interaction flash
    gsap.fromTo(
      ".cart-status",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" },
    );
  };

  const handleBuyNow = () => {
    setPaymentStep("processing");

    // Simulate high-speed checkout authentication via Razorpay/Stripe network webhook
    setTimeout(() => {
      setPaymentStep("complete");
    }, 2000);
  };

  return (
    <div className="border-t border-white/10 pt-6 mt-4 flex flex-col gap-4 font-mono">
      {/* Price Display Field */}
      <div className="flex items-baseline justify-between bg-slate-950/40 p-4 rounded-xl border border-white/5">
        <span className="text-xs text-slate-500 uppercase tracking-widest">
          {"//"} Valuation Index
        </span>
        <span className="text-2xl font-bold text-emerald-400 tracking-tight">
          {price || "Price on Request"}
        </span>
      </div>

      {paymentStep === "idle" && (
        <div className="grid grid-cols-2 gap-4">
          {/* Add to Cart Trigger */}
          <button
            onClick={handleAddToCart}
            data-hover
            className={`w-full py-4 text-xs uppercase tracking-widest rounded-xl font-bold border transition-all duration-300 ${
              isAdded
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/[0.02] text-slate-300 hover:text-white hover:border-white/20"
            }`}
          >
            {isAdded ? "✓ Allocated to Cart" : "[ Add to Cart ]"}
          </button>

          {/* Buy Now Direct Route Trigger */}
          <button
            onClick={handleBuyNow}
            data-hover
            className="w-full py-4 text-xs uppercase tracking-widest rounded-xl font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors"
          >
            Instant Checkout →
          </button>
        </div>
      )}

      {/* Payment Processing Telemetry Animation State */}
      {paymentStep === "processing" && (
        <div className="w-full p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-xs text-center flex items-center justify-center gap-3 text-emerald-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>INITIALIZING GATEWAY CHANNEL // SECURING TELEMETRY...</span>
        </div>
      )}

      {/* Payment Completed Confirmed State Layout */}
      {paymentStep === "complete" && (
        <div className="w-full p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs flex flex-col gap-2">
          <div className="text-emerald-400 font-bold tracking-widest uppercase">
            ✓ TRANSACTION SECURED
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Acquisition complete for{" "}
            <span className="text-white font-medium">{itemTitle}</span>. Your
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

      {/* Security Gateway Badge Row */}
      <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-white/5 pt-4">
        <span>GATEWAY PROVIDER: [ RAZORPAY / NETWORK_SSL ]</span>
        <span className="text-emerald-500/60">● ENCRYPTED END_TO_END</span>
      </div>
    </div>
  );
}
