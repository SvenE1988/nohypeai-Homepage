import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { useDialog } from './providers/DialogProvider';
import { Message } from './chat/ChatMessage';
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';
import { sendChatMessage, addSystemMessage } from '../services/chatService';

const CustomChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    setCalendarDialogOpen
  } = useDialog();

  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    const newSessionId = storedSessionId || uuidv4();
    if (!storedSessionId) {
      localStorage.setItem('chatSessionId', newSessionId);
    }
    setSessionId(newSessionId);

    if (!storedSessionId) {
      const initialMessages: Message[] = [addSystemMessage("👋 Hallo! Ich bin dein Assistent."), {
        id: uuidv4(),
        text: "Du kannst direkt einen Termin buchen oder mir eine Frage stellen!",
        sender: 'bot',
        timestamp: new Date(Date.now() + 100)
      }];
      setMessages(initialMessages);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    await sendChatMessage(text, sessionId, setMessages, setIsLoading);
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleVoiceChat = () => {
    console.log("Sprachchat");
    const voiceMessage = addSystemMessage("Sprachchat ist aktuell noch in Entwicklung. Bitte versuche es später erneut.");
    setMessages(prev => [...prev, voiceMessage]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return <>
      {!isOpen && <button onClick={toggleChat} className="fixed bottom-6 right-6 z-50 bg-primary/20 backdrop-blur-lg text-white rounded-full px-4 py-3 shadow-lg hover:bg-primary/30 transition-all duration-300 flex items-center gap-2" aria-label="Open chat">
          <span className="text-sm font-medium">Chatbot</span>
          <MessageCircle className="w-5 h-5" />
        </button>}

      {isOpen && <div ref={chatContainerRef} className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-black/95 border border-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300" style={{
      backdropFilter: 'blur(10px)'
    }}>
          <ChatHeader handleVoiceChat={handleVoiceChat} toggleChat={toggleChat} />
          
          <Separator />
          
          <ChatMessages messages={messages} isLoading={isLoading} />
          
          <Separator />
          
          <ChatInput inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} isLoading={isLoading} />
        </div>}
    </>;
};

export default CustomChat;
