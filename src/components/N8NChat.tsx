
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { useCallToAction } from '@/hooks/useCallToAction';

const N8NChat = () => {
  const { openCalendarBooking } = useCallToAction();

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
      
      /* Benutzerdefinierte Klassen für Chat-UI-Komponenten */
      .n8n-booking-button {
        display: block;
        width: 100%;
        margin-top: 10px;
        padding: 8px 12px;
        background-color: #FF0099;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.2s;
        text-decoration: none;
      }
      
      .n8n-booking-button:hover {
        background-color: #e6008a;
      }
      
      /* X-Button zum Schließen verbessern */
      /* Das ist der tatsächliche Selektor für den Schließen-Button */
      .n8n-chat-window__header button:not(.n8n-booking-button) {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        padding: 0;
        transition: background-color 0.2s;
      }
      
      .n8n-chat-window__header button:hover:not(.n8n-booking-button) {
        background: rgba(255, 255, 255, 0.2);
      }
    `;
    document.head.appendChild(styleElement);

    // Benutzerdefiniertes JavaScript für UI-Anpassungen
    const script = document.createElement('script');
    script.textContent = `
      // Diese Funktion fügt den Termin-Button hinzu
      function addBookingButton() {
        // Den richtigen Header-Selektor verwenden
        const chatHeader = document.querySelector('.n8n-chat-window__header');
        if (!chatHeader) return;
        
        // Prüfen, ob der Button bereits existiert
        if (chatHeader.querySelector('.n8n-booking-button')) return;
        
        // Termin-Button erstellen
        const bookingButton = document.createElement('button');
        bookingButton.className = 'n8n-booking-button';
        bookingButton.textContent = 'Termin vereinbaren';
        bookingButton.onclick = function() {
          // Cal.com öffnen, wenn vorhanden
          if (window.Cal?.ns?.erstanalyse) {
            window.Cal.ns.erstanalyse("modal", {
              calLink: "nohypeai/erstanalyse",
              layout: "month_view",
              styles: { branding: { brandColor: "#FF0099" } }
            });
          } else {
            // Fallback: Link direkt öffnen
            window.open("https://nohypeai.com/booking", "_blank");
          }
        };
        
        // Button zum Header hinzufügen
        chatHeader.appendChild(bookingButton);
      }

      // MutationObserver verwenden, um auf DOM-Änderungen zu reagieren
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            // Prüfen, ob der Chat geöffnet wurde
            if (document.querySelector('.n8n-chat-window__header')) {
              setTimeout(addBookingButton, 100); // Kurze Verzögerung für stabilere Ausführung
            }
          }
        }
      });
      
      // Beobachtung des gesamten body starten
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Wenn die Seite bereits den Chat anzeigt, Button sofort hinzufügen
      setTimeout(() => {
        if (document.querySelector('.n8n-chat-window__header')) {
          addBookingButton();
        }
      }, 500);
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
