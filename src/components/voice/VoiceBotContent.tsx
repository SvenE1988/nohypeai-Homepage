
import React from 'react';
import { useVoiceBot } from '@/contexts/VoiceBotContext';
import VoiceBotSettings from './VoiceBotSettings';
import VoiceBotControls from './VoiceBotControls';
import VoiceBotMessages from './VoiceBotMessages';
import VoiceBotEmailDialog from './VoiceBotEmailDialog';
import VoiceBotError from './VoiceBotError';
import VoiceBotLoading from './VoiceBotLoading';
import VoiceBotInfo from './VoiceBotInfo';
import MobileVoiceCTA from './MobileVoiceCTA';
import VoiceBotFrame from './VoiceBotFrame';
import { Button } from '@/components/ui/button';
import type { CallStatus } from '@/types/voiceBot';

const VoiceBotContent = () => {
  const {
    useCase,
    setUseCase,
    isActive,
    showEmailDialog,
    setShowEmailDialog,
    errorMessage,
    status,
    transcripts,
    isReady,
    isMicMuted,
    isSpeakerMuted,
    handleStartClick,
    handleStartCall,
    handleStop,
    muteMic,
    unmuteMic,
    muteSpeaker,
    unmuteSpeaker,
  } = useVoiceBot();

  return (
    <div className="relative">
      <MobileVoiceCTA onClick={handleStartClick} />

      <VoiceBotFrame>
        <VoiceBotSettings 
          useCase={useCase}
          setUseCase={setUseCase}
          isActive={isActive}
        />
        
        {!isActive && isReady && (
          <Button 
            onClick={handleStartClick}
            className="w-full bg-gradient-to-r from-primary to-purple-700"
          >
            Sprachdialog starten
          </Button>
        )}
        
        <VoiceBotInfo />
        
        {status === 'connecting' && <VoiceBotLoading />}
        {errorMessage && <VoiceBotError errorMessage={errorMessage} />}
        
        {isActive && (
          <>
            <VoiceBotControls 
              status={status as CallStatus}
              isMicMuted={isMicMuted}
              isSpeakerMuted={isSpeakerMuted}
              onMicToggle={() => isMicMuted ? unmuteMic() : muteMic()}
              onSpeakerToggle={() => isSpeakerMuted ? unmuteSpeaker() : muteSpeaker()}
              onStop={handleStop}
            />
            
            <VoiceBotMessages transcripts={transcripts} status={status} />
          </>
        )}
      </VoiceBotFrame>
      
      <VoiceBotEmailDialog 
        isOpen={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        onStartCall={handleStartCall}
        isLoading={status === 'connecting'}
      />
    </div>
  );
};

export default VoiceBotContent;
