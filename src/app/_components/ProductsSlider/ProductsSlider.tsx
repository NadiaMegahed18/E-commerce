"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { ProductType } from '@/app/_types/product.type'; // Assuming this path based on usage in other files

type ProductsSliderProps = {
    products: ProductType[]
}

export default function ProductsSlider({ products }: ProductsSliderProps) {
    return (
        <div className="products-slider-container relative px-4">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                className="pb-16 pt-4 !overflow-visible"
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id} className="h-auto">
                        <ProductCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          color: #10b981; /* emerald-500 */
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: #ecfdf5; /* emerald-50 */
          transform: scale(1.1);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background-color: #10b981 !important;
        }
      `}</style>
        </div>
    )
}
