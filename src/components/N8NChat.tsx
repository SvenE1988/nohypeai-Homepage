
import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { useCallToAction } from '@/hooks/useCallToAction';
import { applyChatStyles } from './chat/ChatStyles';
import { setupChatBookingButton } from './chat/ChatBookingButton';
import { getChatConfig } from './chat/ChatConfig';

const N8NChat = () => {
  const { openCalendarBooking } = useCallToAction();
  const chatInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once to prevent the Vue warning about multiple mounts
    if (chatInitialized.current) return;
    
    // Apply custom styles for the chat
    applyChatStyles();

    // Setup the booking button functionality
    setupChatBookingButton();

    // Initialize chat with custom options
    createChat(getChatConfig());
    
    // Mark as initialized
    chatInitialized.current = true;
  }, []);

  return null; // This component doesn't render any UI elements
};

export default N8NChat;
