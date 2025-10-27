import MaisVendidosSection from "@/components/MaisVendidosSection";
import LocalizacaoSection from "@/components/LocalizacaoSection";
import PorQueEscolherSection from "@/components/PorQueEscolherSection";
import DepoimentosSection from "@/components/DepoimentosSection";
import SplitText from "@/components/SplitText";
import MariChat from "@/components/MariChat";
import TestChat from "@/components/TestChat";
import { useState } from "react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0', '_blank');
  };

  const handleMapsClick = () => {
    window.open('https://maps.app.goo.gl/v6StpsTBydrvGHBQ8', '_blank');
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const handleChatWithMari = () => {
    console.log('Iniciando chat com Mari...');
    setShowChat(true);
  };

  const handleBackFromChat = () => {
    console.log('Voltando da Mari...');
    setShowChat(false);
  };

  // Mostrar chat se ativo
  if (showChat) {
    return (
      <div className="font-montserrat">
        <MariChat onBack={handleBackFromChat} />
      </div>
    );
  }

  return (
    <div className="font-montserrat">
      {/* Hero Section - Mari AI Assistant */}
      <div className="min-h-screen relative">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Gradiente animado de fundo */}
          <div className="absolute inset-0 bg-gradient-animated opacity-20" />
          <div className="relative z-10 flex flex-col h-full bg-white">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-end p-5 h-[64px]">
              <button 
                className="text-text-primary flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => window.location.reload()}
                aria-label="Atualizar"
              >
                <span className="material-symbols-outlined text-[24px]">refresh</span>
              </button>
            </header>

            {/* Main Content */}
            <main className="flex flex-col flex-1 justify-center items-center px-4 w-full">
              <div className="flex flex-col items-center w-full">
                <div className="relative flex items-center gap-2 mb-[12px]">
                  <SplitText
                    text="Oi, sou a Mari"
                    className="text-brand-green text-[36px] font-light tracking-[0.5px] font-poppins"
                    tag="h1"
                    delay={80}
                    duration={0.8}
                    ease="power2.out"
                    from={{ opacity: 0, y: 20, scale: 0.8 }}
                    to={{ opacity: 1, y: 0, scale: 1 }}
                    onLetterAnimationComplete={handleAnimationComplete}
                  />
                  <span 
                    className="material-symbols-outlined text-brand-green text-[32px] absolute -top-4 -right-8 opacity-0"
                    style={{
                      animation: 'fadeInStar 0.6s ease-out 1.5s forwards, pulse 2s infinite 2.1s'
                    }}
                  >
                    auto_awesome
                  </span>
                </div>
                <p className="text-text-secondary text-[15px] font-normal tracking-[0.3px] mb-[48px] font-poppins">
                  Faça uma pergunta para mim
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex w-[88%] max-w-[480px] flex-col items-stretch gap-[14px]">
                <button 
                  className="group relative flex min-w-[84px] cursor-pointer items-center overflow-hidden rounded-[16px] h-[58px] px-5 bg-white text-text-primary shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  onClick={handleWhatsAppClick}
                >
                  <span className="material-symbols-outlined text-brand-green text-[22px] absolute left-5">sms</span>
                  <span className="truncate text-[17px] font-medium pl-[40px] text-left w-full font-poppins">
                    Whatsapp
                  </span>
                </button>

                <button 
                  className="group relative flex min-w-[84px] cursor-pointer items-center overflow-hidden rounded-[16px] h-[58px] px-5 bg-white text-text-primary shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  onClick={handleMapsClick}
                >
                  <span className="material-symbols-outlined text-brand-green text-[22px] absolute left-5">location_on</span>
                  <span className="truncate text-[17px] font-medium pl-[40px] text-left w-full font-poppins">
                    Nossa localização
                  </span>
                </button>

                <button 
                  className="group relative flex min-w-[84px] cursor-pointer items-center overflow-hidden rounded-[16px] h-[58px] px-5 bg-white text-text-primary shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  onClick={() => document.querySelector('#depoimentos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="material-symbols-outlined text-brand-green text-[22px] absolute left-5">star</span>
                  <span className="truncate text-[17px] font-medium pl-[40px] text-left w-full font-poppins">
                    Depoimentos
                  </span>
                </button>
              </div>
            </main>

            {/* Footer with Input */}
            <footer className="absolute bottom-0 left-0 right-0 p-5 pb-[24px] bg-transparent">
              <label className="relative flex items-center h-[54px] w-[88%] mx-auto max-w-[600px]">
                <span className="material-symbols-outlined text-brand-green absolute left-4">auto_awesome</span>
                <input 
                  className="w-full h-full rounded-full text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green border-none bg-white shadow-input placeholder:text-placeholder-gray pl-12 pr-12 text-base font-normal leading-normal font-poppins"
                  placeholder="Faça uma pergunta..."
                  type="text"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        // Iniciar chat com Mari
                        handleChatWithMari();
                      }
                    }
                  }}
                  onFocus={handleChatWithMari}
                />
                <button 
                  className="absolute right-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-brand-green text-white hover:bg-brand-green/90 transition-colors"
                  onClick={handleChatWithMari}
                  aria-label="Enviar pergunta"
                >
                  <span className="material-symbols-outlined text-xl">arrow_upward</span>
                </button>
              </label>
            </footer>
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
