
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8NChat = () => {
  useEffect(() => {
    // Adding more configuration options based on the documentation
    createChat({
      webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/087c4d6d-9ff6-4abe-8f73-191e36d6ece3/chat',
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },
      showWelcomeScreen: true,
      defaultLanguage: 'de',
      initialMessages: [
        'Hallo! 👋',
        'Ich bin der nohype-ai.de Assistent. Wie kann ich Ihnen heute helfen?'
      ],
      i18n: {
        en: {
          title: 'nohype-ai.de Assistent',
          subtitle: 'Starten Sie einen Chat. Wir sind hier, um Ihnen zu helfen.',
          footer: 'Powered by nohype-ai.de',
          getStarted: 'Neue Konversation',
          inputPlaceholder: 'Stellen Sie Ihre Frage...',
        },
      },
      metadata: {
        source: 'website'
      }
    });
  }, []);

  return null; // This component doesn't render any UI elements itself
};

export default N8NChat;
