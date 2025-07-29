import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Star } from 'lucide-react';

interface Depoimento {
  nome: string;
  texto: string;
  avaliacoes?: number;
}

const depoimentosPrincipais: Depoimento[] = [
  {
    nome: "Valéria",
    texto: "Lugar agradável com um atendimento especial, profissional que sabe sugerir produtos de acordo com suas necessidades. Maravilhoso!!!",
  },
  {
    nome: "Lucia de fatima de souza Lucinha",
    texto: "Atendente muito educado, altamente preparado para responder as dúvidas dos clientes. Estão de parabéns",
    avaliacoes: 1,
  },
  {
    nome: "Johnny García",
    texto: "Ótimo atendimento, loja moderna. Os gestores são pessoas de uma energia positiva , maravilhosos e na real, os produtos curam de verdade.",
    avaliacoes: 1,
  },
];

const depoimentosExtras: Depoimento[] = [
  {
    nome: "Maria ivonete Da silva",
    texto: "Ótimo atendimento feito por Mariana... Ágil, atenta e humanizada. Pretendo procurá-los em breve... Podem procurá-los sem medo.",
    avaliacoes: 1,
  },
  {
    nome: "Maria Clara",
    texto: "Atendimento impecável, sem contar na rapidez em responder os clientes. Comprarei mais vezes, com certeza!",
    avaliacoes: 1,
  },
  {
    nome: "Maria Jarluce",
    texto: "Atendimento atencioso e eficaz, me sentir acolhida e satisfeita.",
    avaliacoes: 1,
  },
  {
    nome: "Francisca Vitorino",
    texto: "A atendente Mariana foi muito prestativa, atenciosa e eficiente, senti-me bem acolhida.",
    avaliacoes: 1,
  },
];

const DepoimentoCard = ({ depoimento }: { depoimento: Depoimento }) => (
  <Card className="w-full h-full bg-white shadow-lg hover:shadow-xl transition-shadow">
    <CardContent className="p-6">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 text-lg">{depoimento.texto}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">{depoimento.nome}</p>
          {depoimento.avaliacoes && (
            <p className="text-sm text-gray-500">{depoimento.avaliacoes} avaliação</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const DepoimentosSection = () => {
  const [mostrarMais, setMostrarMais] = useState(false);

  return (
    <section className="py-12 md:py-20 bg-white" data-section="depoimentos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que falam sobre a{' '}
            <span className="text-brand-green">Naturalys</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre sua experiência conosco
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {depoimentosPrincipais.map((depoimento, index) => (
            <DepoimentoCard key={index} depoimento={depoimento} />
          ))}
        </div>

        {mostrarMais && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {depoimentosExtras.map((depoimento, index) => (
              <DepoimentoCard key={index} depoimento={depoimento} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setMostrarMais(!mostrarMais)}
            className="bg-brand-green text-white hover:bg-brand-green/90"
          >
            {mostrarMais ? 'Ver menos' : 'Ver mais depoimentos'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DepoimentosSection; 