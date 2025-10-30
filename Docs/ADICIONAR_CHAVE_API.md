# 🔑 Como Adicionar a Chave da API OpenAI na Vercel

## ⚠️ IMPORTANTE - SEGURANÇA

**NUNCA** compartilhe ou commite sua chave da API no código! Sempre use variáveis de ambiente.

## 📝 Passo a Passo Rápido

### 1. Acesse o Dashboard da Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **viva-bem-landing**
3. Clique em **Settings** (Configurações)

### 2. Adicione a Variável de Ambiente

1. No menu lateral, clique em **Environment Variables**
2. Clique no botão **Add New**
3. Preencha:
   - **Key**: `VITE_OPENAI_API_KEY`
   - **Value**: Cole sua chave da API OpenAI (ex: `sk-proj-...`)
   - **Environments**: Selecione todas as opções:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
4. Clique em **Save**

### 3. ⚠️ FAÇA UM REDEPLOY (OBRIGATÓRIO)

**IMPORTANTE**: Após adicionar a variável, você DEVE fazer um redeploy:

**Opção 1: Redeploy via Dashboard**
1. Vá para a aba **Deployments**
2. Clique nos três pontos (⋯) no último deployment
3. Selecione **Redeploy**

**Opção 2: Novo Commit**
1. Faça qualquer alteração pequena no código
2. Commit e push para o GitHub
3. A Vercel fará o deploy automaticamente

### 4. Verificar se Funcionou

1. Após o redeploy, acesse seu site
2. Abra o Console do Navegador (F12 → Console)
3. Tente enviar uma mensagem no chat da Mari
4. Verifique se não aparecem erros sobre `VITE_OPENAI_API_KEY`

## ✅ Pronto!

Agora a IA deve funcionar corretamente. Se ainda tiver problemas:

1. Verifique se a chave está correta
2. Certifique-se de que fez o redeploy
3. Verifique os logs do deployment na Vercel
4. Consulte o guia completo: [VERCEL_SETUP.md](./VERCEL_SETUP.md)

## 🔒 Segurança

- ✅ Sua chave está segura nas variáveis de ambiente da Vercel
- ✅ Não será exposta no código
- ✅ Pode ser rotacionada a qualquer momento sem alterar o código

