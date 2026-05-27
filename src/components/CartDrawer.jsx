"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import gsap from "gsap";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, clearCart } =
    useApp();
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isCartOpen) {
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
      );
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((acc, item) => {
    const rawPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
    return acc + rawPrice * (item.quantity || 1);
  }, 0);

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="flex-grow" onClick={() => setIsCartOpen(false)} />
      <div
        ref={drawerRef}
        className="w-full max-w-md h-full bg-slate-900 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl font-mono text-xs"
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <span className="text-sm font-bold tracking-widest">
              CART OPERATIONAL INDEX
            </span>
            <button
              onClick={() => setIsCartOpen(false)}
              data-hover
              className="text-slate-500 hover:text-white cursor-pointer"
            >
              [ CLOSE ]
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-slate-500 italic p-8 text-center border border-dashed border-white/5 rounded-xl my-8">
              Allocation log empty. No items registered.
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[65vh] pr-2 scrollbar-none">
              {cart.map((item, index) => {
                console.log(
                  "Cart Drawer Live Render Profile ->",
                  item.title,
                  "Qty:",
                  item.quantity,
                );

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-4 p-3 rounded-xl border border-white/5 bg-slate-950/40 items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-14 object-cover rounded-md border border-white/5"
                      />
                      <div>
                        <div className="text-white font-bold text-sm">
                          {item.title}
                        </div>
                        <div className="text-emerald-400 mt-0.5">
                          {item.price}
                        </div>

                        <div className="text-slate-500 text-[10px] mt-1 flex items-center gap-1">
                          <span>UNITS ALLOCATED:</span>
                          <span className="text-emerald-400 font-bold font-mono text-xs">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      data-hover
                      className="text-red-400/60 hover:text-red-400 transition-colors p-2 cursor-pointer"
                    >
                      [ DROP ]
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-4 flex flex-col gap-4 bg-slate-900">
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-slate-500">AGGREGATE TOTAL SUM:</span>
              <span className="text-emerald-400 font-bold text-lg">
                ₹ {totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => {
                alert(
                  `Redirecting to Razorpay Gateway.\nTotal Remittance: ₹${totalAmount.toLocaleString("en-IN")}`,
                );
                clearCart();
                setIsCartOpen(false);
              }}
              data-hover
              className="w-full bg-emerald-400 text-slate-950 py-4 font-bold rounded-xl text-center uppercase tracking-widest hover:bg-emerald-300 transition-all duration-300 cursor-pointer"
            >
              Execute Secure Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
