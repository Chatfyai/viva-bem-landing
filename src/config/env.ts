// Configuração usando variáveis de ambiente
export const config = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  CHATKIT_WORKFLOW_ID: import.meta.env.VITE_CHATKIT_WORKFLOW_ID || ''
};

