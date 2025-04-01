
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat'
    });
  }, []);

  return null; // Die Chat-Komponente fügt sich selbst dem DOM hinzu, daher ist hier kein JSX erforderlich
};

export default ChatWidget;
