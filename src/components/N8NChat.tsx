
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { useCallToAction } from '@/hooks/useCallToAction';
import { applyChatStyles } from './chat/ChatStyles';
import { setupChatBookingButton } from './chat/ChatBookingButton';
import { getChatConfig } from './chat/ChatConfig';

const N8NChat = () => {
  const { openCalendarBooking } = useCallToAction();

  useEffect(() => {
    // Apply custom styles for the chat
    applyChatStyles();

    // Setup the booking button functionality
    setupChatBookingButton();

    // Initialize chat with custom options
    createChat(getChatConfig());
  }, []);

  return null; // This component doesn't render any UI elements
};

export default N8NChat;
