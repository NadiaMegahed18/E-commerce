"use client"
import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

type HeroSliderPropsType = {
    imagesList: string[]
}

export default function HeroSlider({ imagesList }: HeroSliderPropsType) {
    return (
        <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden group">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                effect="fade"
                speed={1000}
                navigation={false}
                pagination={{
                    clickable: true,
                    renderBullet: function (index: number, className: string) {
                        return '<span class="' + className + ' !bg-white !w-12 !h-1 !rounded-full !opacity-40 hover:!opacity-100 transition-all duration-300 !mx-1"></span>';
                    }
                }}
                // autoplay={{ delay: 5000, disableOnInteraction: false }} // Disabled as requested
                loop={true}
                className="w-full h-full"
            >

                {imagesList.map((img, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                        <div className="relative w-full h-full">
                            {/* Background Image with Zoom Effect */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={img}
                                    className="w-full h-full object-cover animate-ken-burns"
                                    alt={`Hero Slide ${index + 1}`}
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-center items-start container mx-auto px-6 md:px-12 z-20">
                                <div className="max-w-3xl space-y-8 animate-fade-in-up">
                                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-emerald-300 font-bold tracking-wider text-sm uppercase">
                                        New Collection 2026
                                    </span>

                                    <h1 className="text-white text-6xl md:text-8xl font-black leading-tight drop-shadow-2xl">
                                        Refine Your <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                                            Lifestyle
                                        </span>
                                    </h1>

                                    <p className="text-gray-200 text-lg md:text-2xl font-light max-w-xl border-l-4 border-emerald-500 pl-6">
                                        Experience the perfect blend of modern aesthetics and premium quality.
                                    </p>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Link href="/products" className="group bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-3">
                                            Shop Now
                                        </Link>
                                        <Link href="/categories" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-bold text-lg transition-all hover:-translate-y-1 flex items-center gap-3">
                                            Explore
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 right-10 z-20 hidden md:block animate-pulse-slow">
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm text-white font-bold text-center text-xs leading-tight">
                    SCROLL<br />DOWN
                </div>
            </div>
        </div>
    );
}
