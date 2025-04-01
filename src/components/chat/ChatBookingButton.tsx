
/**
 * This file contains functionality to add a booking button to the n8n chat
 */

export const setupChatBookingButton = () => {
  // Create and append a script element with booking button functionality
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
};
