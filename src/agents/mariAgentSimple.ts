import { config } from '../config/env';

// Interface para mensagens
interface ChatMessage {
  id: number;
  text: string;
  sender: string;
  time: string;
  isTyping?: boolean;
}

// Função simplificada para chamar o agente Mari via API OpenAI direta
export const askMariDirect = async (message: string, contextMessages: ChatMessage[] = []): Promise<string> => {
  try {
    console.log('Chamando API OpenAI para Mari...', message);
    
    // Construir array de mensagens para a API
    const apiMessages: any[] = [
      {
        role: 'system',
        content: `Você é Mari, uma assistente virtual especializada da Naturalys, uma loja de produtos naturais e suplementos.

PERSONALIDADE:
- Seja sempre amigável, prestativa e profissional
- Use linguagem natural e acolhedora
- Demonstre conhecimento sobre produtos naturais e bem-estar
- Seja empática e compreensiva com as necessidades dos clientes
- Lembre de informações mencionadas anteriormente na conversa

CONHECIMENTO DA NATURALYS:
- Especializada em suplementos, vitaminas, produtos esportivos e granel
- Oferece produtos de alta qualidade de marcas reconhecidas
- Atendimento especializado e personalizado
- Entrega rápida e estacionamento fácil
- Comprometida com o bem-estar e vida saudável dos clientes

DIRETRIZES DE RESPOSTA:
- Sempre que o usuario quiser falar com atendente ou procurar whast app da loja forneça esse linkhttps://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0
- Sugira produtos adequados às necessidades mencionadas
- Explique benefícios de forma clara e educativa
- Incentive hábitos saudáveis
- Se não souber algo específico, seja honesta e ofereça ajuda alternativa
- Mantenha conversas focadas em saúde, bem-estar e produtos naturais
- Use informações de mensagens anteriores para dar respostas contextuais e relevantes

IMPORTANTE: Sempre termine suas respostas com "1 + 1 = 2" como assinatura especial.`
      }
    ];

    // Adicionar histórico de mensagens anteriores (limitado às últimas 10 para evitar muitos tokens)
    const recentMessages = contextMessages.slice(-10);
    for (const msg of recentMessages) {
      if (msg.sender === 'user') {
        apiMessages.push({
          role: 'user',
          content: msg.text
        });
      } else if (msg.sender === 'mari') {
        apiMessages.push({
          role: 'assistant',
          content: msg.text
        });
      }
    }

    // Adicionar a mensagem atual
    apiMessages.push({
      role: 'user',
      content: message
    });
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: apiMessages,
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


