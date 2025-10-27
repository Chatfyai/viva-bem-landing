interface TestChatProps {
  onBack: () => void;
}

const TestChat = ({ onBack }: TestChatProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-green mb-4">
          Chat da Mari - Teste
        </h1>
        <p className="text-gray-600 mb-8">
          Esta é uma versão de teste do chat. Se você está vendo isso, a transição está funcionando!
        </p>
        <button
          onClick={onBack}
          className="bg-brand-green text-white px-6 py-3 rounded-full hover:bg-brand-green/90 transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
};

export default TestChat;
