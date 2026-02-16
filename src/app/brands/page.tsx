"use client"
import React, { useEffect, useState } from 'react'
import { getAllBrands } from '../_services/_action/brands.action'
import { useRouter } from 'next/navigation'
import { Loader2, X, Sparkles, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

export default function BrandsPage() {
    const router = useRouter()
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

    useEffect(() => {
        let mounted = true;
        async function fetchBrands() {
            try {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
                const data = await res.json();

                if (mounted) {
                    if (res.ok && data.data) {
                        setBrands(data.data)
                    } else {
                        setError("Failed to load brands")
                    }
                }
            } catch (error) {
                if (mounted) setError("An unexpected error occurred")
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchBrands()
        return () => { mounted = false }
    }, [])

    const openModal = (brand: Brand) => {
        setSelectedBrand(brand)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setSelectedBrand(null)
        document.body.style.overflow = 'unset'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-emerald-600" size={48} />
                    <p className="text-slate-500 font-medium">Loading brands...</p>
                </div>
            </div>
        )
    }

    if (error || !brands || brands.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-4 bg-slate-50">
                <div className="bg-red-50 p-6 rounded-full">
                    <AlertCircle className="text-red-500" size={64} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-800">Unable to load brands</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        We couldn't fetch the brands. Please check your internet connection and try again.
                    </p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:-translate-y-1"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 py-16 px-4">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-full border-2 border-emerald-200">
                            <Sparkles className="text-emerald-600" size={24} />
                            <h1 className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tight">
                                Top Brands
                            </h1>
                        </div>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                            Discover products from the world's most trusted brands
                        </p>
                    </div>

                    {/* Brands Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {brands.map((brand, index) => (
                            <div
                                key={brand._id}
                                onClick={() => openModal(brand)}
                                style={{ animationDelay: `${index * 30}ms` }}
                                className="group cursor-pointer bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
                            >
                                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50">
                                    <Image
                                        src={brand.image}
                                        fill
                                        alt={brand.name}
                                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-center mt-4 font-black text-slate-700 group-hover:text-emerald-600 transition-colors truncate">
                                    {brand.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Brand Modal */}
            {selectedBrand && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-[3rem] max-w-md w-full shadow-[0_50px_100px_rgba(0,0,0,0.2)] animate-scale-in overflow-hidden border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 opacity-50"></div>

                        {/* Close Icon Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-sm hover:bg-red-500 text-slate-400 hover:text-white p-2.5 rounded-2xl transition-all duration-300 hover:rotate-90 shadow-lg border border-slate-100/50 group/close"
                            title="Close"
                        >
                            <X size={20} className="transition-transform group-active/close:scale-90" />
                        </button>

                        <div className="p-10 text-center relative z-10">
                            {/* Premium Brand Image Container */}
                            <div className="relative w-32 h-32 mx-auto mb-8 group">
                                <div className="absolute inset-0 bg-emerald-50 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                                <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-xl border border-slate-50 flex items-center justify-center overflow-hidden p-6 relative">
                                    <Image
                                        src={selectedBrand.image}
                                        fill
                                        alt={selectedBrand.name}
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Brand Typography */}
                            <div className="space-y-2 mb-10">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="h-px w-8 bg-slate-100"></span>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Official Brand</p>
                                    <span className="h-px w-8 bg-slate-100"></span>
                                </div>
                                <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter">
                                    {selectedBrand.name}<span className="text-emerald-500">.</span>
                                </h2>
                                <p className="text-slate-400 text-sm font-medium italic">Discover premium collection</p>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={closeModal}
                                className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Close Modal <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scale-in {
                    from { 
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out backwards;
                }
            `}</style>
        </>
    )
}
