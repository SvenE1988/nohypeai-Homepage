
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../components/chat/ChatMessage';

export const sendChatMessage = async (
  text: string, 
  sessionId: string, 
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  if (!text.trim()) return;
  
  // Add user message to chat
  const userMessage: Message = {
    id: uuidv4(),
    text,
    sender: 'user',
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
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

export const addSystemMessage = (text: string): Message => {
  return {
    id: uuidv4(),
    text,
    sender: 'bot',
    timestamp: new Date()
  };
};
