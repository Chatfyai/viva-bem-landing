import MaisVendidosSection from "@/components/MaisVendidosSection";
import LocalizacaoSection from "@/components/LocalizacaoSection";
import PorQueEscolherSection from "@/components/PorQueEscolherSection";
import DepoimentosSection from "@/components/DepoimentosSection";
import SplitText from "@/components/SplitText";
import { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { askMariDirect } from '../agents/mariAgentSimple';

// Chave para armazenar no localStorage
const CHAT_STORAGE_KEY = 'mari_chat_history';

const Index = () => {
  // Tipo para as mensagens
  interface Message {
    id: number;
    text: string;
    sender: 'user' | 'mari';
    time: string;
    isTyping?: boolean;
  }

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou a Mari, sua assistente virtual da Naturalys. Como posso te ajudar hoje?",
      sender: 'mari',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Carregar histórico do localStorage ao montar o componente
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    }
  }, []);

  // Salvar mensagens no localStorage sempre que mudarem
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5584998561010&text=Olá&type=phone_number&app_absent=0', '_blank');
  };

  const handleMapsClick = () => {
    window.open('https://maps.app.goo.gl/v6StpsTBydrvGHBQ8', '_blank');
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const handleChatWithMari = () => {
    console.log('Iniciando chat com Mari...');
    setShowChat(true);
  };

  const handleBackFromChat = () => {
    console.log('Voltando da Mari...');
    setShowChat(false);
  };

  const handleClearHistory = () => {
    const confirmClear = window.confirm('Deseja realmente limpar o histórico da conversa?');
    if (confirmClear) {
      const initialMessage: Message[] = [{
        id: 1,
        text: "Olá! Sou a Mari, sua assistente virtual da Naturalys. Como posso te ajudar hoje?",
        sender: 'mari',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }];
      setMessages(initialMessage);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(initialMessage));
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
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
    const typingMessage: Message = {
      id: Date.now() + 1,
      text: "Mari está digitando...",
      sender: 'mari',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Pegar apenas mensagens normais (sem indicador de digitação) para contexto
      const contextMessages = messages.filter(msg => !msg.isTyping);
      
      console.log('Enviando mensagem para Mari:', userInput);
      const mariResponse = await askMariDirect(userInput, contextMessages);
      console.log('Resposta recebida da Mari:', mariResponse);
      
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: Date.now() + 2,
          text: mariResponse,
          sender: 'mari' as const,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }] as Message[];
      });
    } catch (error: any) {
      console.error('Erro ao obter resposta da Mari:', error);
      
      let errorMessage = "Desculpe, estou com dificuldades técnicas no momento. Mas estou aqui para te ajudar! Pode me contar sobre o que você está procurando?";
      
      // Mensagem de erro mais específica se for problema de configuração
      if (error?.message?.includes('VITE_OPENAI_API_KEY') || error?.message?.includes('configurada')) {
        errorMessage = "⚠️ Erro de configuração: A chave da API OpenAI não está configurada. Configure VITE_OPENAI_API_KEY na Vercel.";
      }
      
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: Date.now() + 2,
          text: errorMessage,
          sender: 'mari' as const,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }] as Message[];
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

  // Função para transformar URLs em links clicáveis
  const renderMessageText = (text: string) => {
    // Regex para detectar URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return (
      <>
        {parts.map((part, index) => {
          if (urlRegex.test(part)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green underline hover:text-brand-green/80 break-all font-medium"
              >
                {part}
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className="font-montserrat">
      {/* Hero Section - Mari AI Assistant */}
      <div className="min-h-screen relative">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Gradiente animado de fundo */}
          <div className="absolute inset-0 bg-gradient-animated opacity-20" />
          <div className="relative z-10 flex flex-col h-full bg-white">
            {/* Header */}
            <header className={`absolute top-0 left-0 right-0 flex items-center ${showChat ? 'justify-between' : 'justify-end'} p-5 h-[64px] z-20`}>
              {showChat && (
                <button 
                  onClick={handleBackFromChat}
                  className="text-text-primary flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Voltar"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <div className={showChat ? 'flex-1 flex justify-center' : ''}>
                {showChat && (
                  <div className="flex flex-col items-center">
                    <h1 className="text-text-primary text-[20px] font-medium leading-tight">Mari</h1>
                    <p className="text-brand-green text-[12px] font-normal leading-tight">Online</p>
                  </div>
                )}
              </div>
              {showChat && (
                <button 
                  onClick={handleClearHistory}
                  className="text-text-primary flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Limpar histórico"
                  title="Limpar histórico"
                >
                  <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                </button>
              )}
              {!showChat && (
                <button 
                  className="text-text-primary flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => window.location.reload()}
                  aria-label="Atualizar"
                >
                  <span className="material-symbols-outlined text-[24px]">refresh</span>
                </button>
              )}
            </header>

            {/* Main Content Area - Alterna entre tela inicial e chat */}
            <main className="flex-1 overflow-hidden relative">
              {/* Tela Inicial - Texto e Botões */}
              <div className={`absolute inset-0 flex flex-col justify-center items-center px-4 transition-all duration-500 ease-in-out ${
                showChat ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}>
                <div className="flex flex-col items-center w-full">
                  <div className="relative flex items-center gap-2 mb-[12px]">
                    <SplitText
                      text="Oi, sou a Mari"
                      className="text-brand-green text-[36px] font-light tracking-[0.5px] font-poppins"
                      tag="h1"
                      delay={80}
                      duration={0.8}
                      ease="power2.out"
                      from={{ opacity: 0, y: 20, scale: 0.8 }}
                      to={{ opacity: 1, y: 0, scale: 1 }}
                      onLetterAnimationComplete={handleAnimationComplete}
                    />
                    <span 
                      className="material-symbols-outlined text-brand-green text-[32px] absolute -top-4 -right-8 opacity-0"
                      style={{
                        animation: 'fadeInStar 0.6s ease-out 1.5s forwards, pulse 2s infinite 2.1s'
                      }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <p className="text-text-secondary text-[15px] font-normal tracking-[0.3px] mb-[48px] font-poppins">
                    Inteligencia Artificial da Naturalys
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex w-[88%] max-w-[480px] flex-col items-stretch gap-[14px]">
                  <button 
                    className="group relative flex min-w-[84px] cursor-pointer items-center overflow-hidden rounded-[16px] h-[58px] px-5 bg-white text-text-primary shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    onClick={handleWhatsAppClick}
                  >
                    <span className="material-symbols-outlined text-brand-green text-[22px] absolute left-5">sms</span>
                    <span className="truncate text-[17px] font-medium pl-[40px] text-left w-full font-poppins">
                      Whatsapp
                    </span>
                  </button>

                  <button 
                    className="group relative flex min-w-[84px] cursor-pointer items-center overflow-hidden rounded-[16px] h-[58px] px-5 bg-white text-text-primary shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    onClick={handleMapsClick}
                  >
                    <span className="material-symbols-outlined text-brand-green text-[22px] absolute left-5">location_on</span>
                    <span className="truncate text-[17px] font-medium pl-[40px] text-left w-full font-poppins">
                      Nossa localização
                    </span>
                  </button>

                  <button 
                    className="group relative flex min-w-[84px] cursor-pointer items-center overflow-hidden rounded-[16px] h-[58px] px-5 bg-white text-text-primary shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    onClick={() => document.querySelector('#depoimentos')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="material-symbols-outlined text-brand-green text-[22px] absolute left-5">star</span>
                    <span className="truncate text-[17px] font-medium pl-[40px] text-left w-full font-poppins">
                      Depoimentos
                    </span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className={`absolute inset-0 overflow-y-auto px-4 pt-6 pb-20 bg-gray-50 transition-all duration-500 ease-in-out flex flex-col ${
                showChat ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}>
                <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-auto pt-4">
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
                          ) : message.sender === 'user' ? (
                            message.text
                          ) : (
                            renderMessageText(message.text)
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
              </div>
            </main>

            {/* Footer with Input */}
            <footer className="absolute bottom-0 left-0 right-0 p-5 pb-[24px] bg-transparent">
              <label className="relative flex items-center h-[54px] w-[88%] mx-auto max-w-[600px]">
                <span className="material-symbols-outlined text-brand-green absolute left-4">auto_awesome</span>
                <input 
                  className="w-full h-full rounded-full text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green border-none bg-white shadow-input placeholder:text-placeholder-gray pl-12 pr-12 text-base font-normal leading-normal font-poppins"
                  placeholder="Faça uma pergunta..."
                  type="text"
                  value={showChat ? inputValue : ''}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={showChat ? handleKeyPress : (e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        handleChatWithMari();
                      }
                    }
                  }}
                  onFocus={!showChat ? handleChatWithMari : undefined}
                />
                <button 
                  className="absolute right-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-brand-green text-white hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={showChat ? handleSendMessage : handleChatWithMari}
                  disabled={showChat && (!inputValue.trim() || isLoading)}
                  aria-label="Enviar pergunta"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                  )}
                </button>
              </label>
            </footer>
          </div>
        </div>
      </div>

      {/* Mais Vendidos Section */}
      {!showChat && (
        <>
          <MaisVendidosSection />
          
          {/* Por que escolher a Naturalys Section */}
          <PorQueEscolherSection />
          
          {/* Depoimentos Section */}
          <DepoimentosSection />
          
          {/* Localização Section */}
          <LocalizacaoSection />
        </>
      )}
    </div>
  );
};

export default Index;
