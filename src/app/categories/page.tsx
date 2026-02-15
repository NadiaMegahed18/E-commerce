"use client"
import React, { useEffect, useState } from 'react'
import { getAllCategories, getSubCategories } from '../_services/_action/category.action'
import { ArrowRight, Layers, Sparkles, AlertCircle } from 'lucide-react'
import PremiumLoader from '../_components/PremiumLoader/PremiumLoader'

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [subCategories, setSubCategories] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [subLoading, setSubLoading] = useState(false)
    const [debugInfo, setDebugInfo] = useState<any>(null)

    useEffect(() => {
        let mounted = true;
        async function fetchCategories() {
            try {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
                const data = await res.json();

                if (mounted) {
                    if (res.ok && data.data) {
                        setCategories(data.data)
                    } else {
                        setError("Failed to load categories")
                    }
                }
            } catch (error) {
                if (mounted) setError("An unexpected error occurred")
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCategories()
        return () => { mounted = false }
    }, [])

    async function handleCategoryClick(categoryId: string, categoryName: string) {
        // Scroll to bottom safely
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

        setSelectedCategory(categoryName)
        setSubLoading(true)
        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
            const data = await res.json();

            if (res.ok && data.data) {
                setSubCategories(data.data)
            } else {
                setSubCategories([])
            }
        } catch (error) {
            setSubCategories([])
        } finally {
            setSubLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfb]">
                <PremiumLoader />
            </div>
        )
    }

    if (error || !categories || categories.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-4 bg-slate-50">
                <div className="bg-red-50 p-6 rounded-full">
                    <AlertCircle className="text-red-500" size={64} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-800">Unable to load categories</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        We couldn't fetch the categories. Please check your internet connection and try again.
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
        <div className="min-h-screen bg-[#fcfcfb] py-12 px-4 mt-8 pb-32">
            <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-1 bg-[#A67B5B] rounded-full opacity-30"></div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-[1000] text-gray-900 tracking-tighter leading-none">
                        Collections<span className="text-[#A67B5B]">.</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs">
                        Curated Categories & Refined Selections
                    </p>
                </div>

                {/* Categories Grid - Side Glow Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <div
                            key={cat._id}
                            onClick={() => handleCategoryClick(cat._id, cat.name)}
                            className="group relative cursor-pointer"
                        >
                            {/* Side Glow & Border Effects */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#4A6B6B]/20 via-transparent to-[#A67B5B]/20 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                            <div className="relative bg-white rounded-[2.8rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(74,107,107,0.03)] group-hover:shadow-[20px_0_100px_rgba(74,107,107,0.12)] group-hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                                {/* Side Accent Borders */}
                                <div className="absolute inset-y-0 left-0 w-1.5 bg-[#4A6B6B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-y-0 right-0 w-1.5 bg-[#A67B5B] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative h-64 w-full bg-gray-50/50 p-8 transition-colors group-hover:bg-white flex items-center justify-center">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>

                                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-2">
                                    <h3 className="text-2xl font-[1000] text-gray-900 group-hover:text-[#4A6B6B] tracking-tight leading-none transition-colors">
                                        {cat.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[#A67B5B] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        View Treasures <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subcategories Section */}
                {selectedCategory && (
                    <div id="subcategories" className="mt-32 pt-24 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <div className="flex flex-col items-center text-center space-y-4 mb-20">
                            <div className="relative">
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-gray-100 font-black text-7xl select-none uppercase tracking-widest opacity-50 whitespace-nowrap">Explore More</span>
                                <h2 className="relative text-4xl md:text-5xl font-[1000] text-gray-900 tracking-tighter">
                                    {selectedCategory}<span className="text-[#A67B5B]">.</span>
                                </h2>
                            </div>
                            <p className="text-gray-400 font-medium italic text-lg max-w-xl">
                                Refine your selection with our curated sub-collections
                            </p>
                        </div>

                        {subLoading ? (
                            <div className="flex flex-col items-center justify-center py-24">
                                <PremiumLoader />
                            </div>
                        ) : subCategories.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {subCategories.map((sub, index) => (
                                    <div
                                        key={sub._id}
                                        className="group relative bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-gray-100 text-center transition-all hover:bg-white hover:shadow-[0_30px_60px_rgba(74,107,107,0.08)] hover:-translate-y-1 cursor-pointer"
                                    >
                                        <div className="absolute top-0 inset-x-0 h-1 bg-[#4A6B6B] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"></div>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-lg font-black text-gray-700 tracking-tight group-hover:text-[#4A6B6B] transition-colors">{sub.name}</span>
                                            <ArrowRight
                                                size={18}
                                                className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 text-[#A67B5B]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[4rem] border border-gray-100 shadow-sm space-y-6">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full">
                                    <Layers size={40} className="text-gray-300" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-[1000] text-gray-900 tracking-tight">Vault Entry Reserved</h3>
                                    <p className="text-gray-400 font-medium max-w-md mx-auto italic">
                                        No specific sub-collections found. Try exploring another main category.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
