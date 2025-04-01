
/**
 * This file contains the styling for the n8n chat component
 */

export const applyChatStyles = () => {
  // Create and append a style element with chat styling
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
    
    /* Verbessern des X-Buttons zum Schließen */
    .n8n-chat-window__header button:not(.n8n-booking-button) {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px !important; /* Größer machen */
      height: 30px !important; /* Größer machen */
      border-radius: 50%;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: white !important;
      background: rgba(255, 255, 255, 0.2) !important; /* Sichtbarer machen */
      border: none;
      padding: 0;
      transition: background-color 0.2s;
      opacity: 1 !important; /* Sicherstellen, dass es sichtbar ist */
      z-index: 9999;
    }
    
    .n8n-chat-window__header button:hover:not(.n8n-booking-button) {
      background: rgba(255, 255, 255, 0.4) !important;
    }
    
    /* Verstecken des n8n-Footers komplett */
    .n8n-chat-window__footer {
      display: none !important;
    }
  `;
  document.head.appendChild(styleElement);
};
