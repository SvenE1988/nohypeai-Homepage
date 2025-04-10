
import { MessageCircle } from 'lucide-react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
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

export default ChatMessage;
