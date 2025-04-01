
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
    
    // Kurze Verzögerung, um sicherzustellen, dass andere UI-Elemente bereits gerendert sind
    setTimeout(() => {
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
        },
        // Anpassung des Styles, um Z-Index-Probleme zu beheben
        styles: {
          button: {
            size: 60,
            iconSize: 24,
            horizontalDistance: 20,
            verticalDistance: 20,
            zIndex: 99999, // Höherer z-index, um Überlagerungen zu vermeiden
            position: 'bottom-right', // Explizite Position festlegen
          },
          chat: {
            zIndex: 99999, // Höherer z-index für das Chat-Fenster
            height: '70vh',
            maxHeight: '800px',
            width: '380px'
          }
        }
      });
      
      // Mark as initialized
      chatInitialized.current = true;
    }, 500); // 500ms Verzögerung
  }, []);

  // Style-Element hinzufügen, um sicherzustellen, dass der N8N-Chat Button über anderen Elementen angezeigt wird
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #n8n-chat-button {
        z-index: 99999 !important;
      }
      .n8n-chat-window-container {
        z-index: 99999 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render any UI elements
};

export default N8NChat;
