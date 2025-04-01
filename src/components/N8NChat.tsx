
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8NChat = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/087c4d6d-9ff6-4abe-8f73-191e36d6ece3/chat'
    });
  }, []);

  return null; // This component doesn't render any UI elements itself
};

export default N8NChat;
