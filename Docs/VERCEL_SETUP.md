# Guia de Configuração - Vercel

Este guia explica como configurar as variáveis de ambiente na Vercel para que a IA da OpenAI funcione corretamente.

## 📋 Passo a Passo

### 1. Acesse as Configurações do Projeto na Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto `viva-bem-landing`
3. Vá em **Settings** (Configurações)
4. Clique em **Environment Variables** (Variáveis de Ambiente)

### 2. Adicione as Variáveis de Ambiente

Adicione as seguintes variáveis:

#### Variável 1: `VITE_OPENAI_API_KEY`
- **Key**: `VITE_OPENAI_API_KEY`
- **Value**: Sua chave da API OpenAI (começa com `sk-proj-...`)
- **Environments**: Selecione todas (Production, Preview, Development)

#### Variável 2: `VITE_CHATKIT_WORKFLOW_ID`
- **Key**: `VITE_CHATKIT_WORKFLOW_ID`
- **Value**: `wf_68fe85decfcc81909935373882b42533063dc33f37cd476c`
- **Environments**: Selecione todas (Production, Preview, Development)

### 3. Importante: Redeploy Necessário ⚠️

**APÓS adicionar as variáveis de ambiente, você DEVE fazer um novo deploy:**

1. Vá para a aba **Deployments**
2. Clique nos três pontos (⋯) no último deployment
3. Selecione **Redeploy**
4. Ou faça um novo commit e push para o GitHub

**Por quê?** As variáveis de ambiente do Vite são embutidas no código durante o build. Se você adicionar as variáveis depois do build, elas não estarão disponíveis até fazer um novo build.

### 4. Verificar se Funcionou

1. Após o redeploy, acesse seu site na Vercel
2. Abra o console do navegador (F12)
3. Tente usar o chat da Mari
4. Verifique se não aparecem erros sobre variáveis de ambiente

## 🔍 Troubleshooting

### Erro: "VITE_OPENAI_API_KEY não está configurada"

**Solução:**
- Verifique se adicionou a variável exatamente com o nome `VITE_OPENAI_API_KEY` (com `VITE_` no início)
- Certifique-se de que fez um **redeploy** após adicionar a variável
- Verifique se a variável está ativa para o ambiente correto (Production/Preview)

### Erro: 401 Unauthorized

**Solução:**
- Verifique se a chave da API OpenAI está correta
- Certifique-se de que a chave não expirou
- Verifique se a chave tem permissões para usar a API de Chat Completions

### A IA não responde

**Solução:**
- Abra o console do navegador (F12) e verifique os erros
- Verifique os logs do deployment na Vercel
- Certifique-se de que fez o redeploy após adicionar as variáveis

## 📝 Notas Importantes

- ⚠️ **Nunca** commite as chaves de API no código
- ⚠️ **Sempre** use variáveis de ambiente para informações sensíveis
- ✅ As variáveis começam com `VITE_` porque são expostas ao cliente (necessário para Vite)
- ✅ O arquivo `.env` está no `.gitignore` e não será commitado

## 🔗 Links Úteis

- [Documentação Vercel - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentação Vite - Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [OpenAI API Keys](https://platform.openai.com/api-keys)

