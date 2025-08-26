'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { heroCarouselImages } from '@/constants/carousel.constants';
import Link from 'next/link';

const HeroCarousel = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full aspect-square md:aspect-[19/6] bg-gray-200"
      >
        {heroCarouselImages.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.href} className="w-full h-full block">
              <picture>
                {/* Imagen para móvil */}
                <source media="(max-width: 767px)" srcSet={item.mobile} />
                {/* Imagen para escritorio */}
                <source media="(min-width: 768px)" srcSet={item.desktop} />
                {/* Fallback */}
                <img
                  src={item.desktop}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </picture>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;