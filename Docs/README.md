# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/69fb3e76-b370-41eb-8ab7-a6686c479f18

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/69fb3e76-b370-41eb-8ab7-a6686c479f18) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy na Vercel

⚠️ **IMPORTANTE**: Para conectar a IA da OpenAI, você precisa configurar as variáveis de ambiente na Vercel.

**📖 Guia Completo**: Veja o arquivo [VERCEL_SETUP.md](./VERCEL_SETUP.md) para instruções detalhadas.

**Resumo rápido:**
1. Acesse [Vercel](https://vercel.com) e importe este repositório
2. Configure as seguintes **variáveis de ambiente** no painel da Vercel:
   - `VITE_OPENAI_API_KEY`: Sua chave da API OpenAI (obrigatório)
   - `VITE_CHATKIT_WORKFLOW_ID`: ID do workflow do Chatkit (opcional)
3. **⚠️ IMPORTANTE**: Faça um **Redeploy** após adicionar as variáveis
4. Pronto! A IA deve funcionar

### Deploy via Lovable

Simply open [Lovable](https://lovable.dev/projects/69fb3e76-b370-41eb-8ab7-a6686c479f18) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
