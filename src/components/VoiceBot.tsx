
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones } from 'lucide-react';
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

const VoiceBot = () => {
  const [useCase, setUseCase] = useState('immobilienmakler');
  const [isActive, setIsActive] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
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

  const handleStartClick = () => {
    if (isActive) return;
    setShowEmailDialog(true);
  };

  const handleStartCall = async (email: string) => {
    setShowEmailDialog(false);
    setIsActive(true);
    setErrorMessage('');
    
    try {
      const { data, error } = await supabase.functions.invoke('voice-bot', {
        body: { useCase, email }
      });

      if (error) throw error;
      
      if (!data?.joinUrl) {
        throw new Error('Keine gültige Join URL erhalten');
      }

      joinCall(data.joinUrl);
      
      toast({
        title: "Verbindung wird hergestellt",
        description: "Sprachassistent wird initialisiert...",
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unbekannter Fehler');
      setIsActive(false);
      
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
      <div className="max-w-sm mx-auto">
        <div className="relative border-[14px] border-gray-900 rounded-[3rem] shadow-xl bg-black overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-xl" />
          <Card className="border-0 bg-gradient-to-b from-[#1A1F35] to-black min-h-[600px]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
                <Headphones className="w-5 h-5 text-primary" />
                KI-Sprachassistent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
        </div>
        <div className="w-32 h-1.5 bg-gray-900 mx-auto mt-4 rounded-full" />
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
