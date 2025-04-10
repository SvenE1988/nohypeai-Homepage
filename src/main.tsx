
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handler for uncaught JavaScript errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  // In production, could send to error tracking service
  
  // Prevent default browser error handling
  event.preventDefault();
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // In production, could send to error tracking service
  
  // Prevent default browser error handling
  event.preventDefault();
});

// Get the root element and ensure it exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. The app cannot be initialized.");
}

// Wrap initialization in try/catch for safety
try {
  // Create root and render app with StrictMode for better development experience
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log("Application successfully initialized");
} catch (error) {
  console.error("Failed to initialize the application:", error);
  
  // Show error message in the DOM if rendering fails
  rootElement.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px; font-family: system-ui, sans-serif;">
      <h1 style="color: #e11d48; margin-bottom: 16px;">Anwendungsfehler</h1>
      <p style="max-width: 500px; margin-bottom: 24px;">Es ist ein kritischer Fehler beim Laden der Anwendung aufgetreten. Bitte aktualisieren Sie die Seite oder versuchen Sie es später erneut.</p>
      <button onclick="window.location.reload()" style="background-color: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Seite neu laden</button>
    </div>
  `;
}
