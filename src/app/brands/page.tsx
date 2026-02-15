"use client"
import React, { useEffect, useState } from 'react'
import { getAllBrands } from '../_services/_action/brands.action'
import { Loader2, X, Sparkles, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

export default function BrandsPage() {
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

            {/* Simple Compact Modal */}
            {selectedBrand && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-3xl max-w-sm w-full shadow-2xl animate-scale-in overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-red-500 text-slate-600 hover:text-white p-2 rounded-full transition-all duration-300 hover:rotate-90 shadow-md"
                        >
                            <X size={18} />
                        </button>

                        {/* Compact Content */}
                        <div className="p-8 text-center">
                            {/* Small Brand Image */}
                            <div className="relative w-20 h-20 mx-auto mb-4 bg-slate-50 rounded-xl shadow-sm overflow-hidden">
                                <Image
                                    src={selectedBrand.image}
                                    fill
                                    alt={selectedBrand.name}
                                    className="object-contain p-2"
                                />
                            </div>

                            {/* Brand Name */}
                            <h2 className="text-xl font-black text-slate-800 mb-1">
                                {selectedBrand.name}
                            </h2>

                            <p className="text-slate-400 text-xs font-medium mb-6">
                                Premium Brand
                            </p>

                            {/* Single Action Button */}
                            <button
                                onClick={closeModal}
                                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                                View Products
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
