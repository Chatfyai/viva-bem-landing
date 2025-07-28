import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Card, CardContent } from "@/components/ui/card"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Custom styles for card carousel
import './card-carousel.css'

interface ImageItem {
  src: string
  alt: string
}

interface CardCarouselProps {
  images: ImageItem[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  images,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = false,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      centeredSlides={true}
      loop={true}
      navigation={false}
      pagination={showPagination ? { clickable: true } : false}
      autoplay={autoplayDelay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
      speed={800}
      grabCursor={true}
      allowTouchMove={true}
      touchRatio={1}
      touchAngle={45}
      shortSwipes={true}
      longSwipes={true}
      longSwipesRatio={0.5}
      longSwipesMs={300}
      followFinger={true}
      threshold={5}
      className="w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="transition-all duration-500 ease-in-out">
          <Card className="overflow-hidden border-0 shadow-none">
            <CardContent className="p-0">
              <div className="aspect-square w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain bg-white"
                  width={1080}
                  height={1080}
                />
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
} 