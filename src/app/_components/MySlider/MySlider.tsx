"use client"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import { Swiper, SwiperSlide } from 'swiper/react';



type MySliderPropsType = {
  imagesList: string[],
  slidesPerView?: number,
  spaceBetween?: number
}

export default function MySlider({ imagesList, slidesPerView = 1, spaceBetween = 0 }: MySliderPropsType) {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      modules={[Pagination, Autoplay]}
      navigation={false}
      pagination={{ clickable: true }}
    
      loop={true}
      className="pb-12" // Add padding for dots
    >

      {imagesList.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[300px] w-full group cursor-pointer">
            <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`category-${index}`} />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              {/* Overlay removed as requested */}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}