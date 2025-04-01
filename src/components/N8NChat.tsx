
import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

// Vue Feature Flags - diese Zeilen helfen, die Vue-Warnungen zu vermeiden
if (typeof window !== 'undefined') {
  window.__VUE_OPTIONS_API__ = true;
  window.__VUE_PROD_DEVTOOLS__ = false;
  window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
}

const N8NChat = () => {
  const chatInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once to prevent the Vue warning about multiple mounts
    if (chatInitialized.current) return;
    
    // Initialize chat with simplified settings
    createChat({
      webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },
      mode: 'window',
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hallo! 👋',
        'Ich bin der nohype-ai.de Assistent. Wie kann ich Ihnen heute helfen?',
        'Sie können auch direkt einen Termin vereinbaren, indem Sie auf den Button oben klicken.'
      ],
      i18n: {
        en: {
          title: 'nohype-ai.de Assistent',
          subtitle: 'Stellen Sie Ihre Fragen oder buchen Sie einen Termin.',
          footer: '',
          getStarted: 'Neue Konversation',
          inputPlaceholder: 'Stellen Sie Ihre Frage...',
          closeButtonTooltip: 'Chat schließen'
        },
      },
      metadata: {
        source: 'website',
        page: window.location.pathname
      }
    });
    
    // Mark as initialized
    chatInitialized.current = true;
  }, []);

  return null; // This component doesn't render any UI elements
};

export default N8NChat;
