import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, Star } from 'lucide-react';
import { useVoiceBotSession } from '@/hooks/useVoiceBotSession';
import VoiceBotSettings from './voice/VoiceBotSettings';
import VoiceBotControls from './voice/VoiceBotControls';
import VoiceBotMessages from './voice/VoiceBotMessages';
import VoiceBotEmailDialog from './voice/VoiceBotEmailDialog';
import VoiceBotError from './voice/VoiceBotError';
import VoiceBotLoading from './voice/VoiceBotLoading';
import VoiceBotInfo from './voice/VoiceBotInfo';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Iphone15Pro } from '@/components/ui/iphone-15-pro';
import { motion } from 'framer-motion';

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
    session,
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

  useEffect(() => {
    return () => {
      initRef.current = false;
    };
  }, []);

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
        console.error("Supabase function error:", error);
        throw new Error(error?.message || 'Fehler beim Aufrufen der Funktion');
      }
      
      if (!data.joinUrl) {
        console.error("No joinUrl in response:", data);
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
      <motion.div 
        className="absolute -left-16 top-0 z-10 hidden lg:block"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Button
          className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          size="sm"
          onClick={handleStartClick}
        >
          <Star className="w-4 h-4 mr-2 animate-pulse" />
          Jetzt KI testen!
        </Button>
      </motion.div>

      <div className="max-w-md mx-auto">
        <Iphone15Pro className="w-full h-auto">
          <Card className="border-0 bg-gradient-to-b from-[#1A1F35] to-black h-full px-4 py-6 space-y-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
                <Headphones className="w-5 h-5 text-primary" />
                KI-Sprachassistent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
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
            </CardContent>
          </Card>
        </Iphone15Pro>
      </div>
      
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
