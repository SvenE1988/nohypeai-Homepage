
import React, { useState, useRef } from 'react';
import { useVoiceBotSession } from '@/hooks/useVoiceBotSession';
import VoiceBotSettings from './voice/VoiceBotSettings';
import VoiceBotControls from './voice/VoiceBotControls';
import VoiceBotMessages from './voice/VoiceBotMessages';
import VoiceBotEmailDialog from './voice/VoiceBotEmailDialog';
import VoiceBotError from './voice/VoiceBotError';
import VoiceBotLoading from './voice/VoiceBotLoading';
import VoiceBotInfo from './voice/VoiceBotInfo';
import MobileVoiceCTA from './voice/MobileVoiceCTA';
import VoiceBotFrame from './voice/VoiceBotFrame';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EdgeFunctionResponse {
  joinUrl: string;
  error?: string;
}

const VoiceBot = () => {
  const [useCase, setUseCase] = useState('immobilienmakler');
  const [isActive, setIsActive] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const initRef = useRef(false);

  const {
    status,
    transcripts,
    isReady,
    isMicMuted,
    isSpeakerMuted,
    muteMic,
    unmuteMic,
    muteSpeaker,
    unmuteSpeaker,
    joinCall,
    leaveCall
  } = useVoiceBotSession();

  const handleStartClick = () => {
    if (isActive || initRef.current) return;
    if (sessionEmail) {
      handleStartCall(sessionEmail);
    } else {
      setShowEmailDialog(true);
    }
  };

  const handleStartCall = async (email: string) => {
    if (initRef.current) return;
    
    setShowEmailDialog(false);
    setIsActive(true);
    setErrorMessage('');
    setSessionEmail(email);
    initRef.current = true;

    try {
      const { data, error } = await supabase.functions.invoke<EdgeFunctionResponse>('voice-bot', {
        body: { useCase, email }
      });

      if (error || !data) {
        throw new Error(error?.message || 'Fehler beim Aufrufen der Funktion');
      }
      
      if (!data.joinUrl) {
        throw new Error('Keine gültige Join URL erhalten');
      }

      await joinCall(data.joinUrl);
      
      toast({
        title: "Verbindung wird hergestellt",
        description: "Sprachassistent wird initialisiert...",
      });
    } catch (error) {
      console.error("Error starting call:", error);
      setErrorMessage(error instanceof Error ? error.message : 'Unbekannter Fehler');
      setIsActive(false);
      initRef.current = false;
      
      toast({
        title: "Fehler",
        description: "Verbindung konnte nicht hergestellt werden.",
        variant: "destructive",
      });
    }
  };

  const handleStop = async () => {
    try {
      await leaveCall();
      setIsActive(false);
      initRef.current = false;
      toast({
        title: "Gespräch beendet",
        description: "Vielen Dank für das Testen unseres KI-Sprachassistenten.",
      });
    } catch (error) {
      console.error('Error stopping call:', error);
    }
  };

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
              status={status}
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

export default VoiceBot;
