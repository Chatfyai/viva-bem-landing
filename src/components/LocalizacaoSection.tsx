import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocalizacaoSection = () => {
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0', '_blank');
  };

  const handleMapsClick = () => {
    window.open('https://maps.app.goo.gl/v6StpsTBydrvGHBQ8', '_blank');
  };

  return (
    <>
      {/* Linha de topo com degradê verde */}
      <div style={{height: '1px', width: '100%', background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'}} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Venha nos visitar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos bem pertinho de você
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Informações de Contato
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Endereço</h4>
                      <p className="text-gray-600">
                        Avenida Coronel Jose Bezerra, 93A<br />
                        Centro - Currais Novos - RN<br />
                        CEP: 59380-000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Horário de Funcionamento</h4>
                      <p className="text-gray-600">
                        Segunda a Sexta: 7h às 18h<br />
                        Sábado: 7h às 12h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Contato</h4>
                      <p className="text-gray-600">(84) 99856-1010</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Button 
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-brand-green-foreground"
                    size="lg"
                    onClick={handleMapsClick}
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Como Chegar
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-green-foreground"
                    size="lg"
                    onClick={handleWhatsAppClick}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Ligar Agora
                  </Button>
                </div>
              </div>

              {/* Mapa abaixo do card de informações */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9934596995186!2d-36.51613820000001!3d-6.2645893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b1d7e0c6e76a5f%3A0xb7bc319dbafae56c!2sLoja%20de%20Produtos%20Naturais%20e%20Suplementos%20-%20Naturalys!5e0!3m2!1spt-BR!2sbr!4v1753744883530!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocalizacaoSection; 