import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
}

interface CardCarouselProps {
  images: Image[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  images,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = true,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplayDelay > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplayDelay, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {showPagination && (
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentIndex === index ? "bg-brand-green" : "bg-muted-foreground/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};