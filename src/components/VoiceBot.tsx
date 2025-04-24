
import React from 'react';
import { VoiceBotProvider } from '@/contexts/VoiceBotContext';
import VoiceBotContent from './voice/VoiceBotContent';

const VoiceBot = () => {
  return (
    <VoiceBotProvider>
      <VoiceBotContent />
    </VoiceBotProvider>
  );
};

export default VoiceBot;
