"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Loader2, Plus } from 'lucide-react'
import { addItemToCart } from '@/app/_services/_action/addtocart.action'
import { toast } from 'sonner'

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)


  const getCookie = (name: string) => {
    if (typeof window === "undefined") return "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
    return "";
  };

  async function addToCart() {

    const token = getCookie("token-user");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    setLoading(true)
    try {

      let data = await addItemToCart(productId, token)

      if (data && data.status === "success") {
        toast.success("Added to cart successfully", { position: "top-center" })
      } else {
        toast.error("Failed to add to cart", { position: "top-center" })
      }
    } catch (error) {
      console.error("Error in AddToCart button:", error);
      toast.error("Something went wrong", { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={addToCart}
      className='w-full cursor-pointer text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-white py-3 h-auto rounded-full shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 active:scale-95 transition-all group-hover:animate-pulse-once border border-white/10'
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
      Add to Cart
    </Button>
  )
}