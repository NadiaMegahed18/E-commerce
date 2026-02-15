"use client"
import Link from 'next/link'
import React from 'react'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function HeroSection() {
    return (
        <div className="relative overflow-hidden bg-slate-50 min-h-[600px] flex items-center rounded-3xl mt-2 mx-2 border border-slate-100 shadow-sm">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-teal-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="md:w-1/2 space-y-6 text-center md:text-left">
                    <div className="animate-fade-in-up">
                        <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-4 border border-emerald-200">
                            New Collection 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                            Discover Your <br />
                            <span className="text-gradient">Unique Style</span>
                        </h1>
                    </div>

                    <p
                        className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        Explore our curated selection of premium products designed to elevate your lifestyle. Shop the latest trends with confidence.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2 animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <Link
                            href="/products"
                            className="group bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center gap-2"
                        >
                            Shop Now <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                        </Link>
                        <Link
                            href="/categories"
                            className="text-gray-700 font-semibold px-8 py-4 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all flex items-center gap-2 group"
                        >
                            Explore Categories <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 justify-center md:justify-start pt-8 opacity-80 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">50k+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Products</p>
                        </div>
                        <div className="w-px h-10 bg-gray-200"></div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">24/7</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Support</p>
                        </div>
                        <div className="w-px h-10 bg-gray-200"></div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">Fast</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Shipping</p>
                        </div>
                    </div>
                </div>

                {/* Image/Visual Content */}
                <div className="md:w-1/2 relative">
                    <div
                        className="relative z-10 animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                        {/* Replace with a real hero image or a nice composition */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[3rem] rotate-3 opacity-20 blur-lg"></div>
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                                alt="Fashion Model"
                                className="rounded-[2.5rem] shadow-2xl border-4 border-white/50 object-cover w-full max-h-[600px] relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                            />

                            {/* Floating Card 1 */}
                            <div className="absolute top-12 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3 animate-pulse-slow z-20">
                                <span className="text-2xl">🔥</span>
                                <div>
                                    <p className="font-bold text-sm text-gray-800">Hot Trend</p>
                                    <p className="text-xs text-gray-500">Summer Collection</p>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute bottom-12 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 z-20">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />)}
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">4.9/5</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Customer Reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
