import React from "react"
import CardCarouselDemo from "./CardCarouselDemo"
import { Button } from "./ui/button"
import { Flag } from "lucide-react"

const MaisVendidosSection = () => {
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mais <span className="text-brand-green">Vendidos</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Produtos em alta esse mês
          </p>
        </div>

        {/* Carrossel de produtos */}
        <div className="mb-12">
          <CardCarouselDemo />
        </div>

        {/* Texto sobre envio e botão */}
        <div className="text-center space-y-4">
          <p className="text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
            <Flag className="w-5 h-5 text-brand-green" />
            Enviamos para todo Brasil
          </p>
          <Button 
            className="bg-brand-green hover:bg-brand-green/90"
            onClick={handleWhatsAppClick}
          >
            Pedir Produto no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MaisVendidosSection 