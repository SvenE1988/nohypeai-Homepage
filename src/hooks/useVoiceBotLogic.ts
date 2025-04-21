
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UltravoxSession } from 'ultravox-client';
import type { CallMessage } from '@/types/voiceBot';

export const useVoiceBotLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState<CallMessage[]>([]);

  const addMessage = (text: string, type: 'error' | 'status' | 'info' = 'status') => {
    setMessages(prev => [...prev, { 
      text, 
      type, 
      timestamp: new Date() 
    }]);
  };

  const getMicrophonePermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      addMessage("Mikrofonzugriff erfolgreich");
      return true;
    } catch (error) {
      console.error("Mikrofonzugriff fehlgeschlagen:", error);
      setErrorMessage("Bitte erlauben Sie den Zugriff auf Ihr Mikrofon.");
      addMessage("Mikrofonzugriff fehlgeschlagen", "error");
      toast({
        title: "Fehler",
        description: "Mikrofonzugriff wurde verweigert.",
        variant: "destructive",
      });
      return false;
    }
  };

  const startVoiceTest = async (selectedUseCase: string, voice: string, session: UltravoxSession | null) => {
    setIsLoading(true);
    setErrorMessage('');
    addMessage("Verbindung wird aufgebaut...");

    const hasMicPermission = await getMicrophonePermission();
    if (!hasMicPermission) {
      setIsLoading(false);
      return;
    }

    try {
      console.log("Calling voice-bot Edge Function with params:", { useCase: selectedUseCase, voice });

      const { data, error } = await supabase.functions.invoke('voice-bot', {
        body: { useCase: selectedUseCase, voice }
      });

      if (error) {
        throw new Error(`Edge Function error: ${error.message}`);
      }

      if (!data || !session) {
        throw new Error("No data received from Edge Function or session not initialized");
      }

      const joinUrl = data?.joinUrl;

      if (!joinUrl) {
        throw new Error("Keine joinUrl in der Antwort enthalten.");
      }

      console.log("✅ Edge Function ausgelöst, Join URL erhalten:", joinUrl);
      addMessage("Edge Function erfolgreich ausgelöst");

      // Add session status listener
      session.addEventListener('status', (event) => {
        console.log('Session status changed:', session.status);
        addMessage(`Session Status: ${session.status}`, 'info');
      });

      // Add transcript listener
      session.addEventListener('transcripts', () => {
        if (session) {
          console.log('Neue Transkripte verfügbar:', session.transcripts);
        }
      });

      // Add debug message listener
      session.addEventListener('experimental_message', (msg) => {
        console.log('Debug message:', JSON.stringify(msg));
      });

      session.joinCall(joinUrl);

      toast({
        title: "Verbindung hergestellt",
        description: "Der Sprachassistent ist jetzt aktiv.",
      });
    } catch (error) {
      console.error("❌ Fehler beim Aufruf:", error);
      setErrorMessage(`Es gab ein Problem beim Starten des Sprachdialogs: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
      addMessage(`Fehler beim Verbindungsaufbau: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`, "error");
      toast({
        title: "Fehler",
        description: "Verbindung konnte nicht hergestellt werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopVoiceTest = async (session: UltravoxSession | null) => {
    if (session) {
      try {
        // Mute microphone before leaving
        session.muteMic();
        console.log("Mikrofon deaktiviert");
        
        // Leave the call
        await session.leaveCall();
        console.log("Sprachdialog beendet");
        
        addMessage("Sprachdialog beendet");
        setErrorMessage('');
      } catch (error) {
        console.error("Fehler beim Beenden des Sprachdialogs:", error);
        addMessage("Fehler beim Beenden des Sprachdialogs", "error");
      }
    }
  };

  return {
    isLoading,
    errorMessage,
    messages,
    addMessage,
    startVoiceTest,
    stopVoiceTest,
    setErrorMessage
  };
};
