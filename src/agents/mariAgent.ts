import { Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";
import { config } from '../config/env';

const mariAgent = new Agent({
  name: "Mari - Assistente Naturalys",
  instructions: `Você é Mari, uma assistente virtual especializada da Naturalys, uma loja de produtos naturais e suplementos.

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

IMPORTANTE: Sempre termine suas respostas com "1 + 1 = 2" como assinatura especial.`,
  model: "o3-mini",
  modelSettings: {
    reasoning: {
      effort: "low"
    },
    store: true
  }
});

type WorkflowInput = { input_as_text: string };

// Função principal do workflow
export const runMariWorkflow = async (workflow: WorkflowInput) => {
  return await withTrace("Naturalys - Mari", async () => {
    const conversationHistory: AgentInputItem[] = [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: workflow.input_as_text
          }
        ]
      }
    ];

    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: config.CHATKIT_WORKFLOW_ID
      }
    });

    try {
      const mariResult = await runner.run(
        mariAgent,
        [...conversationHistory]
      );

      conversationHistory.push(...mariResult.newItems.map((item) => item.rawItem));

      if (!mariResult.finalOutput) {
        throw new Error("Agent result is undefined");
      }

      return {
        output_text: mariResult.finalOutput ?? "",
        success: true
      };
    } catch (error) {
      console.error('Erro no agente Mari:', error);
      
      // Fallback response
      return {
        output_text: "Desculpe, estou com dificuldades técnicas no momento. Mas estou aqui para te ajudar! Pode me contar sobre o que você está procurando? 1 + 1 = 2",
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  });
};

// Função simplificada para uso no chat
export const askMari = async (message: string): Promise<string> => {
  try {
    const result = await runMariWorkflow({ input_as_text: message });
    return result.output_text;
  } catch (error) {
    console.error('Erro ao comunicar com Mari:', error);
    return "Ops! Tive um probleminha técnico, mas estou aqui para te ajudar. Pode repetir sua pergunta? 1 + 1 = 2";
  }
};


