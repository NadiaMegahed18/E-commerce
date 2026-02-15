"use client"
import React, { useState, useEffect } from 'react'
import { ProductCardPropsType } from './ProductCard.types'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartBtn from './AddToCartBtn'
import { Star, Eye, Heart } from 'lucide-react'
import { addToWishlist, removeFromWishlist, getWishlist } from '../../_services/_action/wishlist.action'
import { toast } from 'sonner'

export default function ProductCard({ item }: ProductCardPropsType) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)


  const productId = item.id || (item as any)._id;

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

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = getCookie("token-user");
    setToken(t);
  }, []);

  useEffect(() => {
    if (!token || !productId) return;

    let isMounted = true;
    async function checkWishlist() {
      if (!token) return;
      try {
        const res = await getWishlist(token);
        if (isMounted && res && res.status === "success") {
          const exists = res.data.some((p: any) => p.id === productId || p._id === productId);
          setIsInWishlist(exists);
        }
      } catch (err) {
        console.warn("Wishlist fetch failed");
      }
    }
    checkWishlist();
    return () => { isMounted = false; };
  }, [productId, token]);

  async function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to manage your wishlist");
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        const res = await removeFromWishlist(productId, token);
        if (res && res.status === "success") {
          setIsInWishlist(false);
          toast.success("Removed from wishlist");
        }
      } else {
        const res = await addToWishlist(productId, token);
        if (res && res.status === "success") {
          setIsInWishlist(true);
          toast.success("Added to wishlist ❤️");
        }
      }
    } catch (err) {
      toast.error("Process failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(6,78,59,0.3)] hover:scale-[1.02] border border-gray-100 hover:border-emerald-800/50'>

      {/* Wishlist Heart */}
      <button
        onClick={handleWishlistToggle}
        disabled={loading}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-md transition-all duration-300 ${isInWishlist ? 'bg-red-500 text-white rotate-[15deg]' : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
      >
        <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} strokeWidth={isInWishlist ? 0 : 2} />
      </button>

      {/* Quick View (Eye) Icon */}
      <Link
        href={`/products/${productId}`}
        className="absolute top-16 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm text-gray-400 hover:text-emerald-600 hover:bg-white rounded-full shadow-md transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75"
        title="View Details"
      >
        <Eye size={18} strokeWidth={2} />
      </Link>

      {/* Discount Badge */}
      {/* Discount Badge - Smaller */}
      {item.priceAfterDiscount && (
        <span className='absolute top-2 left-2 z-10 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm'>
          -{((item.price - item.priceAfterDiscount) / item.price * 100).toFixed(0)}%
        </span>
      )}

      {/* Image Container - Even more side padding for white space effect */}
      <div className='relative h-[340px] w-full bg-white px-16 py-8 overflow-hidden'>
        <Image
          src={item.imageCover}
          fill
          alt={item.title}
          className='object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500'
        />

        {/* Quick View Button - Optional, keeping implies "details" */}
        <Link href={`/products/${productId}`} className="absolute inset-0 z-0" aria-label="View Details"></Link>
      </div>

      {/* Content */}
      <div className="p-5 pb-20 space-y-3 bg-white relative z-10 h-full">
        <div className="flex items-center justify-between">
          <span className='text-emerald-600 text-[10px] font-bold uppercase tracking-widest'>{item.category.name}</span>
          <div className="flex items-center gap-1">
            <Star size={12} fill="#f59e0b" className="text-amber-500" />
            <span className="text-xs font-bold text-gray-700">{item.ratingsAverage}</span>
          </div>
        </div>

        <Link href={`/products/${productId}`}>
          <h2 className="font-bold text-gray-800 line-clamp-1 hover:text-emerald-600 transition-colors text-base" title={item.title}>
            {item.title}
          </h2>
        </Link>

        <div className='flex items-end gap-2'>
          {item.priceAfterDiscount ? (
            <>
              <span className="text-xl font-black text-gray-900">${item.priceAfterDiscount}</span>
              <span className="text-xs text-gray-400 line-through mb-1">${item.price}</span>
            </>
          ) : (
            <span className="text-xl font-black text-gray-900">${item.price}</span>
          )}
        </div>
      </div>

      {/* Add To Cart Button - Slides up from bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 bg-gradient-to-t from-white via-white to-transparent pt-8">
        <AddToCartBtn productId={productId} />
      </div>
    </div>
  )
}

