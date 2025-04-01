
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8NChat = () => {
  useEffect(() => {
    // Benutzerdefinierte CSS für den Chat hinzufügen
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      :root {
        /* Farben an nohype-ai Design anpassen */
        --chat--color-primary: #FF0099; /* Pink als Primärfarbe */
        --chat--color-primary-shade-50: #e6008a;
        --chat--color-primary-shade-100: #cc007a;
        --chat--color-secondary: #6B46C1; /* Lila als Sekundärfarbe für Benutzernachrichten */
        --chat--color-secondary-shade-50: #5f3daf;
        --chat--color-white: #ffffff;
        --chat--color-light: #f2f4f8;
        --chat--color-light-shade-50: #e6e9f1;
        --chat--color-light-shade-100: #c2c5cc;
        --chat--color-medium: #d2d4d9;
        --chat--color-dark: #1A1F35; /* Dunklere Farbe passend zum Website-Hintergrund */
        --chat--color-disabled: #777980;
        --chat--color-typing: #404040;

        /* Spacing und Borders */
        --chat--spacing: 1rem;
        --chat--border-radius: 0.5rem; /* Abgerundete Ecken wie andere UI-Elemente */
        --chat--transition-duration: 0.15s;

        /* Fenstergröße */
        --chat--window--width: 375px;
        --chat--window--height: 600px;

        /* Header Style */
        --chat--header-height: auto;
        --chat--header--padding: var(--chat--spacing);
        --chat--header--background: #1A1F35; /* Dunklere Farbe passend zum Website-Hintergrund */
        --chat--header--color: var(--chat--color-white);
        --chat--header--border-top: none;
        --chat--header--border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        --chat--heading--font-size: 1.5em;
        --chat--subtitle--font-size: 0.9em;
        --chat--subtitle--line-height: 1.5;

        /* Textarea (Eingabefeld) */
        --chat--textarea--height: 50px;

        /* Message Styling */
        --chat--message--font-size: 0.95rem;
        --chat--message--padding: var(--chat--spacing);
        --chat--message--border-radius: 1rem;
        --chat--message-line-height: 1.6;
        --chat--message--bot--background: rgba(255, 255, 255, 0.95);
        --chat--message--bot--color: #1A1F35;
        --chat--message--bot--border: none;
        --chat--message--user--background: #6B46C1; /* Lila für Benutzernachrichten */
        --chat--message--user--color: var(--chat--color-white);
        --chat--message--user--border: none;
        --chat--message--pre--background: rgba(0, 0, 0, 0.05);

        /* Toggle Button Styling */
        --chat--toggle--background: #FF0099; /* Pink wie Primärfarbe */
        --chat--toggle--hover--background: #e6008a;
        --chat--toggle--active--background: #cc007a;
        --chat--toggle--color: var(--chat--color-white);
        --chat--toggle--size: 60px;
      }
      
      /* Zusätzliches Styling für einen "Termin buchen" Button im Header */
      .n8n-chat-header-booking-button {
        background-color: #FF0099;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 14px;
        cursor: pointer;
        margin-top: 10px;
        transition: background-color 0.2s;
        display: block;
        width: 100%;
        text-align: center;
        text-decoration: none;
      }
      
      .n8n-chat-header-booking-button:hover {
        background-color: #e6008a;
      }

      /* Styling für den X-Button zum Schließen */
      .n8n-chat-close-button {
        position: absolute;
        top: 15px;
        right: 15px;
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transition: background-color 0.2s;
      }
      
      .n8n-chat-close-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(styleElement);

    // Benutzerdefiniertes JavaScript für UI-Anpassungen hinzufügen
    const script = document.createElement('script');
    script.textContent = `
      // Funktion zum Hinzufügen eines Termin-Buttons in den Header und zur Verbesserung des Schließen-Buttons
      function enhanceChatUI() {
        // Chat-Header finden
        const chatHeader = document.querySelector('.n8n-chat-header');
        if (!chatHeader) return;
        
        // Schließen-Button verbessern (X)
        const closeButton = document.querySelector('.n8n-chat-header button');
        if (closeButton) {
          closeButton.classList.add('n8n-chat-close-button');
          closeButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        }
        
        // Termin-Button erstellen und zum Header hinzufügen
        const bookingButton = document.createElement('a');
        bookingButton.href = "https://nohypeai.com/booking";
        bookingButton.target = "_blank";
        bookingButton.className = 'n8n-chat-header-booking-button';
        bookingButton.textContent = 'Termin vereinbaren';
        chatHeader.appendChild(bookingButton);
      }
      
      // Beobachter einrichten, um auf DOM-Änderungen zu reagieren und die UI zu verbessern
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            // Prüfen, ob der Chat-Header hinzugefügt wurde
            if (document.querySelector('.n8n-chat-header')) {
              enhanceChatUI();
              // Nur einmal ausführen
              observer.disconnect();
              
              // Erneut beobachten, falls der Chat geschlossen und wieder geöffnet wird
              setTimeout(() => {
                observer.observe(document.body, { childList: true, subtree: true });
              }, 1000);
            }
          }
        }
      });
      
      // Beobachtung starten
      observer.observe(document.body, { childList: true, subtree: true });
    `;
    document.head.appendChild(script);

    // Chat initalisieren mit angepassten Optionen
    createChat({
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
    });
  }, []);

  return null; // Diese Komponente rendert keine eigenen UI-Elemente
};

export default N8NChat;
