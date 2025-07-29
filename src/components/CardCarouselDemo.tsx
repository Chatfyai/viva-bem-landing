import React from "react"

import { CardCarousel } from "./ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    { 
      src: "/imagem/10.png", 
      alt: "Produto 1"
    },
    { 
      src: "/imagem/STEVIA-COLOR-20g.png", 
      alt: "Stevia Color - Adoçante Natural 20g"
    },
    { 
      src: "/imagem/13.png", 
      alt: "Produto 3"
    },
    { 
      src: "/imagem/17.png", 
      alt: "Produto 4"
    },
    { 
      src: "/imagem/23.png", 
      alt: "Produto 5"
    },
    { 
      src: "/imagem/30.png", 
      alt: "Produto 6"
    },
  ]

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo 