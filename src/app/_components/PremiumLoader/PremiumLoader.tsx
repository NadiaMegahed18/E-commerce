"use client"
import React from 'react'

export default function PremiumLoader() {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative">
                {/* Main Pulsing Ring */}
                <div className="w-20 h-20 border-[3px] border-[#4A6B6B]/10 rounded-full"></div>

                {/* Animated Orbits */}
                <div className="absolute inset-0 w-20 h-20 border-[3px] border-t-[#4A6B6B] border-r-transparent border-b-[#A67B5B] border-l-transparent rounded-full animate-spin duration-[2000ms]"></div>

                {/* Inner Pulsing Core */}
                <div className="absolute inset-4 bg-gradient-to-br from-[#4A6B6B] to-[#A67B5B] rounded-full opacity-20 animate-pulse"></div>

                {/* Floating Particles/Glow */}
                <div className="absolute -inset-4 bg-[#4A6B6B]/5 blur-2xl rounded-full animate-pulse decoration-[3000ms]"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <p className="text-[#4A6B6B] font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">
                    Enhancing Your Experience
                </p>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
        </div>
    )
}
