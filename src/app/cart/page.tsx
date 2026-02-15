"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getCart, updateQuantity, removeItem, clearCart } from '../_services/_action/cart.action';
import { CartResponse } from '../_types/cart.type';
import CartSkeleton from './_components/CartSkeleton';
import { ShoppingCart, Trash2, CreditCard, Plus, Minus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCookie = (name: string) => {
    if (typeof window === "undefined") return "";
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
  };

  const loadCart = useCallback(async () => {
    const token = getCookie("token-user");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getCart(token);

      if (res && (res.status === "success" || res.status === "Success")) {
        setCartData(res);
      } else {
        setCartData(null);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
      // If 404/not found, it means cart is empty for this user
      setCartData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleAction = async (actionFn: (t: string) => Promise<any>, successMsg?: string) => {
    const token = getCookie("token-user");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await actionFn(token);
      await loadCart();
      if (successMsg) toast.success(successMsg);
    } catch (error) {
      toast.error("Action failed");
    }
  };

  if (loading && !cartData) {
    return <CartSkeleton />;
  }

  // Doctor's style for empty cart or not logged in
  if (!cartData || cartData.numOfCartItems === 0) {
    return (
      <div className="min-h-screen bg-[#fcfcfb] py-12 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(74,107,107,0.1)] border border-gray-100/50 text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white p-10 rounded-full shadow-2xl border border-gray-50">
              <ShoppingCart size={80} className="text-[#4A6B6B]" strokeWidth={1} />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-[1000] text-gray-900 tracking-tighter">Your cart is empty<span className="text-[#A67B5B]">.</span></h1>
            <p className="text-gray-400 font-medium italic text-lg">Looks like you haven't added anything to your collection yet.</p>
          </div>

          <div className="pt-4">
            <Link href="/" className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl hover:-translate-y-1 active:scale-95">
              Start Shopping <ArrowLeft className="rotate-180" size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfb] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 text-[#4A6B6B] hover:text-[#A67B5B] transition-all font-bold text-xs uppercase tracking-widest opacity-60">
              <ArrowLeft size={14} /> Back to collections
            </Link>
            <h1 className="text-5xl md:text-6xl font-[1000] text-gray-900 tracking-tighter leading-none">
              Your Selection<span className="text-[#A67B5B]">.</span>
            </h1>
          </div>

          <div className="bg-white/50 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl flex items-center gap-8 min-w-[300px] justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Estimated Total</p>
              <p className="text-3xl font-[1000] text-[#1a2e2e] tracking-tighter">${cartData.data.totalCartPrice}</p>
            </div>
            <Link href="/checkout" className="bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-emerald-900/20 hover:-translate-y-1 active:scale-95">
              Checkout
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Product Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cartData.data.products.map((item) => (
              <div key={item.product._id} className="group relative bg-white rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(74,107,107,0.05)] border border-gray-100/50 flex flex-col sm:flex-row items-center gap-8 transition-all hover:shadow-[0_40px_100px_rgba(74,107,107,0.1)] hover:-translate-y-1">
                <div className="relative w-40 h-40 flex-shrink-0 bg-[#fcfcfb] rounded-[1.5rem] p-4 flex items-center justify-center overflow-hidden border border-gray-50/50">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#A67B5B] uppercase tracking-[0.2em]">{item.product.category?.name || "Premium Collection"}</p>
                    <h3 className="font-black text-gray-900 text-2xl leading-none tracking-tight">
                      {item.product.title.split(' ').slice(0, 6).join(' ')}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                    <p className="text-xl font-black text-[#4A6B6B] tracking-tighter">${item.price} <span className="text-[10px] text-gray-400 font-bold ml-1 uppercase">EGP</span></p>
                    <div className="h-4 w-[1px] bg-gray-100 hidden sm:block"></div>
                    <button
                      onClick={() => handleAction((t) => removeItem(item.product._id, t), "Item removed")}
                      className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center bg-[#fcfcfb] border border-gray-100 rounded-2xl p-1 gap-2">
                  <button
                    onClick={() => handleAction((t) => updateQuantity(item.product._id, item.count - 1, t))}
                    disabled={item.count <= 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-400 hover:text-red-500 hover:shadow-sm disabled:opacity-20 transition-all border border-transparent hover:border-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-black text-gray-900 text-base">{item.count}</span>
                  <button
                    onClick={() => handleAction((t) => updateQuantity(item.product._id, item.count + 1, t))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#4A6B6B] hover:text-[#A67B5B] hover:shadow-sm transition-all border border-transparent hover:border-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-[0_40px_100px_rgba(0,0,0,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

              <h2 className="text-2xl font-black tracking-tighter mb-8">Summary</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-xs font-bold uppercase tracking-widest">Total Items</span>
                  <span className="font-black">{cartData.numOfCartItems}</span>
                </div>
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-xs font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="font-black">${cartData.data.totalCartPrice}</span>
                </div>
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-xs font-bold uppercase tracking-widest">Shipping</span>
                  <span className="font-black italic">Calculated at checkout</span>
                </div>

                <div className="h-[1px] bg-white/10 my-4"></div>

                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest pb-1 opacity-60">Total</span>
                  <span className="text-4xl font-[1000] tracking-tighter">${cartData.data.totalCartPrice}</span>
                </div>
              </div>

              <div className="pt-10 space-y-4">
                <Link href="/checkout" className="w-full flex items-center justify-center py-5 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.98] shadow-2xl">
                  Process to Checkout <CreditCard className="ml-2 w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to empty your cart?")) {
                      handleAction((t) => clearCart(t), "Cart cleared")
                    }
                  }}
                  className="w-full text-center text-[10px] font-black text-white/40 hover:text-red-400 uppercase tracking-widest py-2 transition-colors uppercase tracking-[0.2em]"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShoppingCart size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Secure Payment</p>
                <p className="text-emerald-600/60 text-xs font-medium italic">SSL Encrypted Checkout</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
