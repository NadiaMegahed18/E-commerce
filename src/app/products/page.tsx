"use client"
import React, { useState, useEffect } from 'react'
import { getAllproducts } from '../_services/products.service'
import { ProductType } from '../_types/product.type'
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react'
import ProductCard from '../_components/ProductCard/ProductCard'
import PremiumLoader from '../_components/PremiumLoader/PremiumLoader'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ProductsContent() {
    const searchParams = useSearchParams()
    const brandParam = searchParams.get('brand')

    const [products, setProducts] = useState<ProductType[]>([])
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
    const [searchTerm, setSearchTerm] = useState(brandParam || "")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        let mounted = true;
        async function fetchProducts() {
            try {
                const data = await getAllproducts()
                if (mounted) {
                    if (data && Array.isArray(data)) {
                        setProducts(data)
                        setFilteredProducts(data)
                    } else {
                        setError(true)
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error)
                if (mounted) setError(true)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchProducts()
        return () => { mounted = false }
    }, [])

    useEffect(() => {
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredProducts(filtered)
    }, [searchTerm, products])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfb]">
                <PremiumLoader />
            </div>
        )
    }

    if (error && products.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-4 bg-slate-50">
                <div className="bg-red-50 p-6 rounded-full">
                    <AlertCircle className="text-red-500" size={64} />
                </div>
                <h2 className="text-2xl font-black text-slate-800">Unable to load products</h2>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:-translate-y-1"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50/30 py-12 px-4">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Search Header */}
                <div className="flex flex-col items-center gap-8 mb-16">
                    <div className="relative w-full max-w-4xl group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Search className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 py-5 pl-16 pr-24 rounded-[2rem] shadow-xl shadow-slate-200/50 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 text-xl font-medium placeholder:text-slate-300 transition-all"
                        />
                        <div className="absolute inset-y-2 right-2 flex items-center">
                            <button className="bg-slate-100 text-slate-600 p-4 rounded-[1.5rem] hover:bg-slate-200 transition-all flex items-center gap-2 font-bold">
                                <SlidersHorizontal size={20} />
                                Filters
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {['All', 'Electronics', 'Fashion'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSearchTerm(cat === 'All' ? '' : cat)}
                                className={`px-6 py-2 rounded-full border border-slate-100 font-bold transition-all shadow-sm ${(cat === 'All' && searchTerm === '') || searchTerm.toLowerCase() === cat.toLowerCase()
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
                    <h1 className="text-3xl font-black text-slate-800">
                        Our Products
                        <span className="ml-3 text-lg font-bold text-slate-400">({filteredProducts.length} items found)</span>
                    </h1>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                        <div className="bg-slate-100 p-8 rounded-full">
                            <Search size={64} className="text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-700">No products found matching "{searchTerm}"</h2>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="text-emerald-600 font-black hover:underline"
                        >
                            Clear search and see all products
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fcfcfb]"><PremiumLoader /></div>}>
            <ProductsContent />
        </Suspense>
    )
}
