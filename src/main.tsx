
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element and ensure it exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. The app cannot be initialized.");
}

// Create root and render app with StrictMode for better development experience
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
