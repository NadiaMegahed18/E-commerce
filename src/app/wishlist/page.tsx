"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { getWishlist, removeFromWishlist } from '../_services/_action/wishlist.action'
import { addItemToCart } from '../_services/_action/addtocart.action'
import { toast } from 'sonner'
import Link from 'next/link'
import { Trash2, ShoppingCart, Heart, ArrowRight, Eye } from 'lucide-react'
import CartSkeleton from '../cart/_components/CartSkeleton'

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)

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

    const loadWishlist = useCallback(async () => {
        const token = getCookie("token-user")
        if (!token) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const res = await getWishlist(token)
            if (res && res.status === "success") {
                setWishlist(res.data)
            } else {
                setWishlist([])
            }
        } catch (error) {
            toast.error("Failed to load wishlist")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadWishlist()
    }, [loadWishlist])

    async function handleRemove(id: string) {
        const token = getCookie("token-user")
        if (!token) return

        try {
            const res = await removeFromWishlist(id, token)
            if (res && res.status === "success") {
                toast.success("Removed from wishlist")
                loadWishlist()
            }
        } catch (error) {
            toast.error("Remove failed")
        }
    }

    async function handleAddToCart(productId: string) {
        const token = getCookie("token-user")
        if (!token) {
            toast.error("Please login first")
            return
        }

        try {
            const res = await addItemToCart(productId, token)
            if (res) {
                toast.success("Added to cart! 🛒")
                
                // Optional: Remove from wishlist after adding to cart
                // await handleRemove(productId)
            }
        } catch (error) {
            toast.error("Add to cart failed")
        }
    }

    if (loading) return <CartSkeleton />

    if (!wishlist || wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-[#fcfcfb] py-12 px-4 flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(74,107,107,0.1)] border border-gray-100/50 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-30"></div>
                        <div className="relative bg-white p-10 rounded-full shadow-2xl border border-gray-50">
                            <Heart size={80} className="text-[#A67B5B]" strokeWidth={1} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-[1000] text-gray-900 tracking-tighter">Your wishlist is quiet<span className="text-[#A67B5B]">.</span></h1>
                        <p className="text-gray-400 font-medium italic text-lg">Save the pieces you love and they will wait for you here.</p>
                    </div>

                    <div className="pt-4">
                        <Link href="/" className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl hover:-translate-y-1 active:scale-95">
                            Explore Collections <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfb] py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                {/* Header Section */}
                <div className="text-center md:text-left space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#4A6B6B] hover:text-[#A67B5B] transition-all font-bold text-xs uppercase tracking-widest opacity-60">
                        <ArrowRight className="rotate-180" size={14} /> Continue Shopping
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tighter leading-none">
                        Your Favorites<span className="text-[#A67B5B]">.</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] ml-1">Curated Treasures & Personal Picks</p>
                </div>

                {/* Wishlist Items List - One product per row */}
                <div className="space-y-6">
                    {wishlist.map((item) => {
                        const pid = item.id || item._id;
                        return (
                            <div key={pid} className="group relative bg-white rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(74,107,107,0.05)] border border-gray-100/50 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-[0_40px_100px_rgba(74,107,107,0.1)] hover:-translate-y-1">

                                {/* Image Container */}
                                <div className="relative w-full md:w-56 aspect-square bg-[#fcfcfb] rounded-[2rem] p-6 flex items-center justify-center overflow-hidden border border-gray-50/50 group-hover:border-[#A67B5B]/10 transition-colors">
                                    <img
                                        src={item.imageCover}
                                        alt={item.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000"
                                    />

                                    {/* Actions Overlay for Mobile/Row */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <Link
                                            href={`/products/${pid}`}
                                            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-[#4A6B6B] hover:text-[#A67B5B] hover:scale-110 transition-all active:scale-95"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Product Info - Horizontal Layout */}
                                <div className="flex-1 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left w-full">
                                    <div className="space-y-1 flex-1">
                                        <p className="text-[10px] font-black text-[#A67B5B] uppercase tracking-[0.25em]">{item.category?.name || "Premium Collection"}</p>
                                        <h3 className="font-black text-gray-900 text-2xl md:text-3xl leading-none tracking-tight">
                                            {item.title.split(' ').slice(0, 10).join(' ')}
                                        </h3>
                                        <p className="text-2xl font-[1000] text-[#4A6B6B] tracking-tighter pt-2">${item.price} <span className="text-[10px] text-gray-300 font-bold ml-1 uppercase">EGP</span></p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                                        <button
                                            onClick={() => handleRemove(pid)}
                                            className="flex items-center gap-2 text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors px-4 py-2"
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>

                                        <button
                                            onClick={() => handleAddToCart(pid)}
                                            className="w-full sm:w-auto bg-[#1a2e2e] hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#1a2e2e]/10 active:scale-[0.97] group/btn"
                                        >
                                            <ShoppingCart size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            Add to bag
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
