
/**
 * This file contains the configuration for the n8n chat
 */

export const getChatConfig = () => {
  return {
    webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
    webhookConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },
    showWelcomeScreen: true,
    defaultLanguage: 'en', // Nur 'en' wird unterstützt
    initialMessages: [
      'Hallo! 👋',
      'Ich bin der nohype-ai.de Assistent. Wie kann ich Ihnen heute helfen?',
      'Sie können auch direkt einen Termin vereinbaren, indem Sie auf den Button oben klicken.'
    ],
    i18n: {
      en: {
        title: 'nohype-ai.de Assistent',
        subtitle: 'Stellen Sie Ihre Fragen oder buchen Sie einen Termin.',
        footer: 'Powered by nohype-ai.de',
        getStarted: 'Neue Konversation',
        inputPlaceholder: 'Stellen Sie Ihre Frage...',
        closeButtonTooltip: 'Chat schließen'
      },
    },
    metadata: {
      source: 'website',
      page: window.location.pathname
    }
  };
};
