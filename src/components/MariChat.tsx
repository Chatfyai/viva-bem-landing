import { useState } from 'react';
import { ArrowLeft, MoreVertical, Send } from 'lucide-react';
import { askMariDirect } from '../agents/mariAgentSimple';

interface MariChatProps {
  onBack: () => void;
}

const MariChat = ({ onBack }: MariChatProps) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Sou a Mari, sua assistente virtual da Naturalys. Como posso te ajudar hoje?",
      sender: 'mari',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const userInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Adicionar indicador de digitação
    const typingMessage = {
      id: Date.now() + 1,
      text: "Mari está digitando...",
      sender: 'mari',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Usar o agente Mari real via API direta
      const mariResponse = await askMariDirect(userInput);
      
      // Remover indicador de digitação e adicionar resposta real
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: Date.now() + 2,
          text: mariResponse,
          sender: 'mari',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }];
      });
    } catch (error) {
      console.error('Erro ao obter resposta da Mari:', error);
      
      // Resposta de fallback em caso de erro
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: Date.now() + 2,
          text: "Desculpe, estou com dificuldades técnicas no momento. Mas estou aqui para te ajudar! Pode me contar sobre o que você está procurando?",
          sender: 'mari',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="relative flex flex-col w-full h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-4 h-[72px] bg-white shadow-sm border-b border-gray-100">
        <button 
          onClick={onBack}
          className="text-gray-700 flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <h1 className="text-gray-900 text-[20px] font-medium leading-tight">Mari</h1>
          <p className="text-brand-green text-[12px] font-normal leading-tight">Online</p>
        </div>
        
        <button className="text-gray-700 flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors">
          <MoreVertical className="w-6 h-6" />
        </button>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-20 bg-gray-50">
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 max-w-[80%] ${
                message.sender === 'user' ? 'self-end' : 'self-start'
              }`}
            >
              <div
                className={`p-3 shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-brand-green text-white rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px]'
                    : message.isTyping
                    ? 'bg-gray-100 text-gray-600 rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px] border border-gray-200 animate-pulse'
                    : 'bg-white text-gray-800 rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px] border border-gray-200'
                }`}
              >
                <p className="text-sm leading-relaxed">
                  {message.isTyping ? (
                    <span className="flex items-center gap-1">
                      {message.text}
                      <span className="flex gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      </span>
                    </span>
                  ) : (
                    message.text
                  )}
                </p>
                {!message.isTyping && (
                  <p className={`text-right text-[11px] mt-1.5 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {message.time}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="p-4 pt-3 max-w-2xl mx-auto">
          <div className="relative flex items-center h-[54px] w-full">
            <input
              className="w-full h-full rounded-[28px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-green border border-gray-200 bg-white placeholder:text-gray-400 pl-5 pr-14 text-base font-normal leading-normal"
              placeholder="Digite sua mensagem..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 flex items-center justify-center w-10 h-10 rounded-full bg-brand-green text-white hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MariChat;