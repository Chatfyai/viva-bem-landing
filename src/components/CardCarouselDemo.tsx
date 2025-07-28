import React from "react"

import { CardCarousel } from "./ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    { 
      src: "/imagem/STEVIA-COLOR-20g.png", 
      alt: "Stevia Color - Adoçante Natural 20g"
    },
    { 
      src: "/imagem/10.png", 
      alt: "Produto Natural"
    },
    { 
      src: "/imagem/13.png", 
      alt: "Produto Natural"
    },
    { 
      src: "/imagem/17.png", 
      alt: "Produto Natural"
    },
    { 
      src: "/imagem/23.png", 
      alt: "Produto Natural"
    },
    { 
      src: "/imagem/30.png", 
      alt: "Produto Natural"
    }
  ]

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={3000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo 