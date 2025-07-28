import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin } from "lucide-react";
import CardCarouselDemo from "@/components/CardCarouselDemo";

const Index = () => {
  return (
    <div className="min-h-screen relative font-montserrat">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/e23c7dad-f439-406d-bc22-e6c9dd94f4e7.png')`
        }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Operating Hours Banner */}
        <div className="bg-brand-green text-brand-green-foreground py-3 px-4 text-center">
          <p className="font-medium">Horário de funcionamento: Segunda a Sexta 6h às 22h | Sábado 8h às 18h</p>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-4xl">
            A sua vida saudável começa aqui
          </h1>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              size="lg" 
              className="bg-brand-green hover:bg-brand-green/90 text-brand-green-foreground px-8 py-6 text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-brand-green text-brand-green bg-transparent hover:bg-brand-green hover:text-brand-green-foreground px-8 py-6 text-lg"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Localização
            </Button>
          </div>
        </div>
      </div>
      
      {/* Sections Below Hero */}
      <div className="bg-background py-16">
        {/* Mais Vendido Section */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mais Vendido
            </h2>
          </div>
          
          {/* Produto em Alta Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Produto em Alta
            </h3>
            
            {/* Card Carousel */}
            <div className="max-w-4xl mx-auto">
              <CardCarouselDemo />
            </div>
          </div>
          
          {/* Shipping Message */}
          <div className="text-center mt-16">
            <p className="text-lg font-light text-muted-foreground">
              Enviamos para todo Brasil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
