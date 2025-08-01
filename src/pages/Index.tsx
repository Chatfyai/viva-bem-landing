import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, MoveDown } from "lucide-react";
import MaisVendidosSection from "@/components/MaisVendidosSection";
import LocalizacaoSection from "@/components/LocalizacaoSection";
import PorQueEscolherSection from "@/components/PorQueEscolherSection";
import DepoimentosSection from "@/components/DepoimentosSection";
import RotatingText from "@/components/RotatingText";
import { useState, useEffect } from "react";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
      const hour = now.getHours();
      
      // Segunda a Sexta (1-5) entre 07h e 18h
      const isWeekday = day >= 1 && day <= 5;
      const isOpenHours = hour >= 7 && hour < 18;
      
      setIsOpen(isWeekday && isOpenHours);
    };

    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0', '_blank');
  };

  const handleMapsClick = () => {
    window.open('https://maps.app.goo.gl/v6StpsTBydrvGHBQ8', '_blank');
  };

  return (
    <div className="font-montserrat">
      {/* Hero Section */}
      <div className="min-h-screen relative">
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
        {isOpen && (
          <div className="bg-[#101010] text-white py-3 px-4 text-center w-full">
            <p className="font-medium">Estamos abertos, te esperando!</p>
          </div>
        )}
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 max-w-4xl">
              <div>
                A sua vida{" "}
                <RotatingText
                  texts={['saudável', 'feliz', 'ativa', 'vibrante']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-brand-green text-brand-green-foreground overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
                {" "}começa aqui
              </div>
            </h1>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green/90 text-brand-green-foreground px-8 py-6 text-lg"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
                          <Button 
              size="lg" 
              variant="outline"
              className="border-brand-green text-brand-green bg-transparent hover:bg-brand-green hover:text-brand-green-foreground px-8 py-6 text-lg"
              onClick={handleMapsClick}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Nossa localização
            </Button>
            </div>
            
          </div>
          
          {/* Seta animada */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <MoveDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Mais Vendidos Section */}
      <MaisVendidosSection />
      
      {/* Por que escolher a Naturalys Section */}
      <PorQueEscolherSection />
      
      {/* Depoimentos Section */}
      <DepoimentosSection />
      
      {/* Localização Section */}
      <LocalizacaoSection />
    </div>
  );
};

export default Index;
