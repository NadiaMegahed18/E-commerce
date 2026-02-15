"use client"

import React, { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { ProductType } from '@/app/_types/product.type'
import { Search } from 'lucide-react'

interface ProductsContainerProps {
    allProducts: ProductType[]
}

export default function ProductsContainer({ allProducts }: ProductsContainerProps) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <section className="pt-8 pb-20 bg-linear-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="text-center mb-12 space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 inline-block drop-shadow-sm tracking-tight">
                        Recent Collections
                    </h2>
                    <p className="text-gray-400 text-base max-w-xl mx-auto font-medium">
                        Explore our latest arrivals featuring top-tier quality and exclusive designs.
                    </p>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full opacity-30"></div>
                </div>

                {/* Search Bar Container */}
                <div className="max-w-4xl mx-auto mb-16 relative group">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search our premium collection..."
                        className="w-full pl-14 pr-32 py-3 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 text-lg font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-lg hover:shadow-xl placeholder:text-gray-400"
                    />
                    <div className="absolute inset-y-1 right-1">
                        <button className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 rounded-full font-bold transition-all shadow-md flex items-center gap-2 hover:scale-105 active:scale-95">
                            Search
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
                        <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4">
                            <Search className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found for "{searchQuery}"</h3>
                        <p className="text-gray-500">Try searching for something else or browse our categories.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-6 px-8 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
