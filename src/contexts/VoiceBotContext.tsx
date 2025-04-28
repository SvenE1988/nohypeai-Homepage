import React, { createContext, useContext, useState, useRef } from 'react';
import { useVoiceBotSession } from '@/hooks/useVoiceBotSession';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import type { CallStatus, Transcript } from '@/types/voiceBot';

interface EdgeFunctionResponse {
  joinUrl: string;
  error?: string;
}

interface VoiceBotContextType {
  useCase: string;
  setUseCase: (value: string) => void;
  isActive: boolean;
  showEmailDialog: boolean;
  setShowEmailDialog: (show: boolean) => void;
  errorMessage: string;
  sessionEmail: string;
  status: CallStatus;
  transcripts: Transcript[];
  isReady: boolean;
  isMicMuted: boolean;
  isSpeakerMuted: boolean;
  handleStartClick: () => void;
  handleStartCall: (email: string) => Promise<void>;
  handleStop: () => Promise<void>;
  muteMic: () => void;
  unmuteMic: () => void;
  muteSpeaker: () => void;
  unmuteSpeaker: () => void;
}

const VoiceBotContext = createContext<VoiceBotContextType | undefined>(undefined);

export const useVoiceBot = () => {
  const context = useContext(VoiceBotContext);
  if (!context) {
    throw new Error('useVoiceBot must be used within a VoiceBotProvider');
  }
  return context;
};

export const VoiceBotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const value = {
    useCase,
    setUseCase,
    isActive,
    showEmailDialog,
    setShowEmailDialog,
    errorMessage,
    sessionEmail,
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
  };

  return (
    <VoiceBotContext.Provider value={value}>
      {children}
    </VoiceBotContext.Provider>
  );
};
