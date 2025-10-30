// Configuração usando variáveis de ambiente
export const config = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  CHATKIT_WORKFLOW_ID: import.meta.env.VITE_CHATKIT_WORKFLOW_ID || ''
};

// Validação das variáveis de ambiente
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!config.OPENAI_API_KEY) {
    errors.push('VITE_OPENAI_API_KEY não está configurada');
  }
  
  if (!config.CHATKIT_WORKFLOW_ID) {
    errors.push('VITE_CHATKIT_WORKFLOW_ID não está configurada');
  }
  
  if (errors.length > 0) {
    console.error('⚠️ Variáveis de ambiente faltando:', errors);
    console.error('📝 Configure as variáveis de ambiente na Vercel:');
    console.error('   - Settings > Environment Variables');
    console.error('   - Adicione: VITE_OPENAI_API_KEY');
    console.error('   - Adicione: VITE_CHATKIT_WORKFLOW_ID');
  }
  
  return errors.length === 0;
};

// Validar ao carregar (apenas em desenvolvimento para ajudar no debug)
if (import.meta.env.DEV) {
  validateConfig();
}

