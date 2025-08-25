import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { Award, Package, Truck, Users } from 'lucide-react';

const PorQueEscolherSection = () => {
  const handleStackComplete = () => {
    setTimeout(() => {
      // Encontra a próxima seção (DepoimentosSection)
      const nextSection = document.querySelector('[data-section="depoimentos"]') || 
                          document.querySelector('section:nth-of-type(4)') ||
                          document.querySelector('#depoimentos');
      
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback: rola para baixo usando scroll relativo
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    }, 2000); // 2 segundos de delay
  };

  return (
    <>
      {/* Seção do título */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Por que escolher a{' '}
              <span className="text-brand-green">Naturalys</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Nossos diferenciais que fazem da Naturalys sua melhor escolha para uma vida mais saudável
            </p>
          </div>
        </div>
      </section>

      {/* Seção do ScrollStack */}
      <section className="bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollStack
              itemDistance={80}
              itemScale={0.03}
              itemStackDistance={20}
              stackPosition="25%"
              scaleEndPosition="10%"
              baseScale={0.85}
              rotationAmount={1}
              blurAmount={0.5}
              className="h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
              onStackComplete={handleStackComplete}
            >
            <ScrollStackItem>
              <div className="bg-brand-green rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-4 md:mb-6">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    Qualidade Premium
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    Trabalhamos com as melhores marcas do mercado, garantindo produtos de alta qualidade e eficácia comprovada.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="bg-brand-green rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-4 md:mb-6">
                    <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    Variedade Completa
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    Suplementos, vitaminas, produtos esportivos e granel. Tudo que você precisa em um só lugar.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="bg-brand-green rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-4 md:mb-6">
                    <Truck className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    Entrega Rápida
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    Estacionamento fácil e entrega rápida. Sua comodidade é nossa prioridade.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="bg-brand-green rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-4 md:mb-6">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    Atendimento Especializado
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    Nossa equipe está pronta para te ajudar com conhecimento e dedicação.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col justify-center">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-green mb-3 md:mb-4">
                    Estamos sempre com você
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Comprometidos em ser seu parceiro na jornada para uma vida mais saudável e equilibrada.
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
          </div>
        </div>
      </section>
    </>
  );
};

export default PorQueEscolherSection; 