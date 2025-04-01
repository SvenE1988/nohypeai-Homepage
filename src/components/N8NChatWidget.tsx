
import { useEffect, useRef } from 'react';
import { createChat } from '@n8n/chat';

/**
 * Initialisiert das Chat-Widget beim ersten Rendern.
 * Das Widget wird "unsichtbar" geladen (return null).
 */
const N8NChatWidget = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    createChat({
      webhookUrl: 'https://automatisierung.seserver.nohype-ai.de/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
      mode: 'window',
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hallo 👋 Ich bin dein digitaler Assistent von nohype-ai.de.',
        '👉 <a href="https://cal.com/nohypeai/erstanalyse" target="_blank">Hier kostenloses Erstgespräch buchen</a>',
        'Oder stelle mir deine Frage direkt im Chat!'
      ],
      i18n: {
        en: {
          title: 'nohype-ai.de Assistent',
          subtitle: 'Dein smarter Assistent – 24/7 erreichbar',
          footer: '',
          getStarted: 'Neue Unterhaltung starten',
          inputPlaceholder: 'Was möchtest du wissen?',
          closeButtonTooltip: 'Fenster schließen'
        }
      },
      metadata: {
        source: 'website',
        page: window.location.pathname
      }
    });

    initialized.current = true;
  }, []);

  return null;
};

export default N8NChatWidget;
