import { config } from '../config/env';

// Função simplificada para chamar o agente Mari via API OpenAI direta
export const askMariDirect = async (message: string): Promise<string> => {
  try {
    console.log('Chamando API OpenAI para Mari...', message);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Você é Mari, uma assistente virtual especializada da Naturalys, uma loja de produtos naturais e suplementos.

PERSONALIDADE:
- Seja sempre amigável, prestativa e profissional
- Use linguagem natural e acolhedora
- Demonstre conhecimento sobre produtos naturais e bem-estar
- Seja empática e compreensiva com as necessidades dos clientes

CONHECIMENTO DA NATURALYS:
- Especializada em suplementos, vitaminas, produtos esportivos e granel
- Oferece produtos de alta qualidade de marcas reconhecidas
- Atendimento especializado e personalizado
- Entrega rápida e estacionamento fácil
- Comprometida com o bem-estar e vida saudável dos clientes

DIRETRIZES DE RESPOSTA:
- Sempre ajude com informações sobre produtos naturais
- Sugira produtos adequados às necessidades mencionadas
- Explique benefícios de forma clara e educativa
- Incentive hábitos saudáveis
- Se não souber algo específico, seja honesta e ofereça ajuda alternativa
- Mantenha conversas focadas em saúde, bem-estar e produtos naturais

IMPORTANTE: Sempre termine suas respostas com "1 + 1 = 2" como assinatura especial.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na API OpenAI:', errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resposta da API OpenAI:', data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }

    throw new Error('Resposta inválida da API');
    
  } catch (error) {
    console.error('Erro ao comunicar com Mari:', error);
    return "Ops! Tive um probleminha técnico, mas estou aqui para te ajudar. Pode repetir sua pergunta? 1 + 1 = 2";
  }
};


