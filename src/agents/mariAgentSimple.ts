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
    // Validar se a chave da API está configurada
    if (!config.OPENAI_API_KEY || config.OPENAI_API_KEY.trim() === '') {
      console.error('❌ VITE_OPENAI_API_KEY não está configurada!');
      console.error('📝 Configure na Vercel: Settings > Environment Variables > Add VITE_OPENAI_API_KEY');
      return "Desculpe, estou com problemas de configuração. Por favor, entre em contato com nosso suporte pelo WhatsApp: https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0";
    }

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
- SEMPRE vendemos os melhores produtos de alta qualidade de marcas reconhecidas
- Atendimento especializado e personalizado
- Entrega rápida e estacionamento fácil
- Comprometida com o bem-estar e vida saudável dos clientes

DIRETRIZES DE RESPOSTA ESPECÍFICAS:

1. PERGUNTAS SOBRE "PARA QUE SERVE X" OU INFORMAÇÕES ESPECÍFICAS DE PRODUTOS:
   - Sempre que o usuário perguntar "para que serve [nome do produto]" ou "o que é [produto]" ou "informações sobre [produto]", você deve:
   - Fornecer uma resposta breve e direta sobre o produto
   - IMEDIATAMENTE direcionar para contato com atendente especializado
   - Enviar este link do WhatsApp: https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0
   - Exemplo: "A creatina é ótima para performance muscular! Para informações mais detalhadas sobre dosagem e indicações, entre em contato com nosso time especializado: https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0"

2. PERGUNTAS SOBRE LOCALIZAÇÃO:
   - Sempre que o usuário perguntar sobre endereço, localização, onde fica a loja, como chegar:
   - Forneça o link do Google Maps: https://www.google.com/maps/place/Loja+de+Produtos+Naturais+e+Suplementos+-+Naturalys/@-6.2645893,-36.5161382,17z/data=!3m1!4b1!4m6!3m5!1s0x7b1d7e0c6e76a5f:0xb7bc319dbafae56c!8m2!3d-6.2645893!4d-36.5161382!16s%2Fg%2F11p_1chqjr?entry=tts&g_ep=EgoyMDI1MDcyMy4wIPu8ASoASAFQAw%3D%3D&skid=f6f316b1-7847-4c36-bbc0-10081b68822c
   - Exemplo: "Estamos localizados aqui: https://www.google.com/maps/place/Loja+de+Produtos+Naturais+e+Suplementos+-+Naturalys/@-6.2645893,-36.5161382,17z/data=!3m1!4b1!4m6!3m5!1s0x7b1d7e0c6e76a5f:0xb7bc319dbafae56c!8m2!3d-6.2645893!4d-36.5161382!16s%2Fg%2F11p_1chqjr?entry=tts&g_ep=EgoyMDI1MDcyMy4wIPu8ASoASAFQAw%3D%3D&skid=f6f316b1-7847-4c36-bbc0-10081b68822c"

3. CONTATO COM ATENDENTE:
   - Sempre que o usuário quiser falar com atendente ou procurar WhatsApp da loja, forneça este link: https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0

4. OUTRAS DIRETRIZES:
   - Sempre enfatize que vendemos os MELHORES produtos
   - Sugira produtos adequados às necessidades mencionadas
   - Explique benefícios de forma clara e educativa
   - Incentive hábitos saudáveis
   - Se não souber algo específico, direcione para o WhatsApp para atendimento especializado
   - Mantenha conversas focadas em saúde, bem-estar e produtos naturais
   - Use informações de mensagens anteriores para dar respostas contextuais e relevantes
   - Seja direta: apenas direcione a pessoa para onde ela procura (WhatsApp para produtos, Google Maps para localização)

IMPORTANTE: 
- NUNCA termine suas respostas com "1 + 1 = 2" ou qualquer variação dessa expressão
- NÃO use assinaturas ou fórmulas matemáticas ao final das respostas
- Encerre suas respostas de forma natural e profissional`
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
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Erro na API OpenAI:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // Mensagens de erro mais específicas
      if (response.status === 401) {
        return "Erro de autenticação com a API. Por favor, verifique se a chave VITE_OPENAI_API_KEY está configurada corretamente na Vercel.";
      } else if (response.status === 429) {
        return "Estou recebendo muitas solicitações no momento. Por favor, tente novamente em alguns instantes.";
      } else {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('Resposta da API OpenAI:', data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      let responseText = data.choices[0].message.content;
      
      // Remover a assinatura "1 + 1 = 2" e todas suas variações caso ainda apareça na resposta
      responseText = responseText.replace(/\s*1\s*[+\+]\s*1\s*[=]\s*2/gi, '').trim();
      responseText = responseText.replace(/\s*1\+1\s*=\s*2/gi, '').trim();
      responseText = responseText.replace(/\s*1\+1=2/gi, '').trim();
      responseText = responseText.replace(/\s*1\s*\+\s*1\s*=\s*2/gi, '').trim();
      
      return responseText;
    }

    throw new Error('Resposta inválida da API');
    
  } catch (error) {
    console.error('Erro ao comunicar com Mari:', error);
    return "Ops! Tive um probleminha técnico, mas estou aqui para te ajudar. Pode repetir sua pergunta?";
  }
};


