
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
  const { setCalendarDialogOpen } = useDialog();

  // Initialize session and chat
  useEffect(() => {
    // Try to get existing session ID from localStorage
    const storedSessionId = localStorage.getItem('chatSessionId');
    const newSessionId = storedSessionId || uuidv4();
    
    if (!storedSessionId) {
      localStorage.setItem('chatSessionId', newSessionId);
    }
    
    setSessionId(newSessionId);
    
    // Add initial bot messages if this is a new session
    if (!storedSessionId) {
      const initialMessages: Message[] = [
        addSystemMessage("👋 Hallo! Ich bin dein Assistent."),
        {
          id: uuidv4(),
          text: "Du kannst direkt einen Termin buchen oder mir eine Frage stellen!",
          sender: 'bot',
          timestamp: new Date(Date.now() + 100)
        }
      ];
      
      setMessages(initialMessages);
    }
  }, []);

  // Handle sending messages
  const handleSendMessage = async (text: string) => {
    await sendChatMessage(text, sessionId, setMessages, setIsLoading);
    setInputValue('');
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Handle keyboard shortcut (Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    setCalendarDialogOpen(true);
  };

  // Handle voice chat (placeholder)
  const handleVoiceChat = () => {
    console.log("Sprachchat");
    // Placeholder for voice chat functionality
    const voiceMessage = addSystemMessage("Sprachchat ist aktuell noch in Entwicklung. Bitte versuche es später erneut.");
    
    setMessages(prev => [...prev, voiceMessage]);
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all duration-300"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-black/95 border border-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          {/* Chat header */}
          <ChatHeader 
            handleBookAppointment={handleBookAppointment}
            handleVoiceChat={handleVoiceChat}
            toggleChat={toggleChat}
          />
          
          <Separator />
          
          {/* Messages container */}
          <ChatMessages messages={messages} isLoading={isLoading} />
          
          <Separator />
          
          {/* Chat input */}
          <ChatInput 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            handleKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default CustomChat;
