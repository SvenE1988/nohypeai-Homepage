
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { MessageCircle, Send, Calendar, Mic } from 'lucide-react';

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CustomChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
        {
          id: uuidv4(),
          text: "👋 Hallo! Ich bin dein Assistent.",
          sender: 'bot',
          timestamp: new Date()
        },
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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages to n8n
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://automatisierung.seserver.nohype-ai.de/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          chatInput: text,
          sessionId: sessionId,
          metadata: {
            source: 'website',
            page: window.location.pathname
          }
        })
      });
      
      const data = await response.json();
      
      if (data.output) {
        // Add bot response to chat
        const botMessage: Message = {
          id: uuidv4(),
          text: data.output,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        text: "Entschuldigung, es gab ein Problem bei der Verbindung. Bitte versuche es später erneut.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // Handle keyboard shortcut (Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    window.open('https://cal.com/nohypeai/erstanalyse', '_blank');
  };

  // Handle voice chat (placeholder)
  const handleVoiceChat = () => {
    console.log("Sprachchat");
    // Placeholder for voice chat functionality
    const voiceMessage: Message = {
      id: uuidv4(),
      text: "Sprachchat ist aktuell noch in Entwicklung. Bitte versuche es später erneut.",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, voiceMessage]);
  };

  // Render a message bubble
  const renderMessage = (message: Message) => {
    const isBot = message.sender === 'bot';
    
    return (
      <div 
        key={message.id} 
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      >
        <div 
          className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-md ${
            isBot 
              ? 'bg-secondary/10 text-gray-100' 
              : 'bg-primary/90 text-white'
          }`}
        >
          {message.text}
        </div>
      </div>
    );
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
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/80 to-primary/80">
            <div className="flex items-center space-x-2">
              <div className="text-white font-bold">AI Assistent</div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={handleBookAppointment}
                size="sm" 
                variant="outline"
                className="text-xs bg-black/20 text-white border-white/20 hover:bg-black/40"
              >
                <Calendar className="mr-1 h-3 w-3" /> Termin buchen
              </Button>
              <Button 
                onClick={handleVoiceChat}
                size="sm" 
                variant="outline"
                className="text-xs bg-black/20 text-white border-white/20 hover:bg-black/40"
              >
                <Mic className="mr-1 h-3 w-3" /> Sprachchat
              </Button>
              <Button 
                onClick={toggleChat} 
                variant="ghost"
                size="sm"
                className="text-white hover:bg-black/20 p-1"
              >
                ✕
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-black/60">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-secondary/10 text-gray-100 rounded-2xl px-4 py-2 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <Separator />
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 flex">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Was möchtest du wissen?"
              className="flex-1 bg-black/40 border-gray-700 text-white focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="ml-2" 
              disabled={isLoading || !inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default CustomChat;
