
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hallo und Willkommen👋',
        'Ich bin Valentina. Wie kann ich dir helfen?'
      ],
      i18n: {
        en: {
          title: 'Hi there! 👋',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      },
    });
  }, []);

  return null; // Die Chat-Komponente fügt sich selbst dem DOM hinzu, daher ist hier kein JSX erforderlich
};

export default ChatWidget;
