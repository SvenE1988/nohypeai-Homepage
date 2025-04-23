
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

  const setupSessionListeners = (session: UltravoxSession) => {
    // Status listener with proper state handling
    session.addEventListener('status', (event) => {
      const status = session.status;
      console.log('Session status changed:', status);
      
      switch(status) {
        case 'connecting':
          addMessage('Verbindung wird hergestellt...', 'info');
          break;
        case 'idle':
          addMessage('Bereit für den Sprachdialog', 'info');
          break;
        case 'listening':
          addMessage('Höre zu...', 'info');
          setIsLoading(false); // Connection is fully established
          break;
        case 'thinking':
          addMessage('Verarbeite Eingabe...', 'info');
          break;
        case 'speaking':
          addMessage('KI spricht...', 'info');
          break;
        case 'disconnected':
          addMessage('Verbindung getrennt', 'info');
          setIsLoading(false);
          break;
      }
    });

    // Transcript listener
    session.addEventListener('transcripts', () => {
      if (session) {
        console.log('Neue Transkripte verfügbar:', session.transcripts);
      }
    });

    // Debug message listener for better troubleshooting
    session.addEventListener('experimental_message', (msg) => {
      console.log('Debug message:', JSON.stringify(msg));
    });
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

  const startVoiceTest = async (useCase: string, email: string, session: UltravoxSession | null) => {
    setIsLoading(true);
    setErrorMessage('');
    addMessage("Initialisiere Sprachdialog...");

    if (!session) {
      setErrorMessage("Keine Session initialisiert");
      setIsLoading(false);
      return;
    }

    const hasMicPermission = await getMicrophonePermission();
    if (!hasMicPermission) {
      setIsLoading(false);
      return;
    }

    try {
      // Set up event listeners before making the webhook call
      setupSessionListeners(session);
      
      // Single webhook call to get the join URL
      const { data, error } = await supabase.functions.invoke('voice-bot', {
        body: { useCase, email }
      });

      if (error) {
        throw new Error(`Edge Function error: ${error.message}`);
      }

      const responseData = Array.isArray(data) ? data[0] : data;
      if (!responseData?.joinUrl) {
        throw new Error('Keine gültige Join URL erhalten');
      }

      // Join call with the received URL
      console.log("✅ Join URL erfolgreich erhalten:", responseData.joinUrl);
      addMessage("Join URL erfolgreich empfangen");
      
      session.joinCall(responseData.joinUrl);
      addMessage("Dem Sprachdialog beigetreten");

      toast({
        title: "Verbindung wird hergestellt",
        description: "Sprachassistent wird initialisiert...",
      });
    } catch (error) {
      console.error("❌ Fehler beim Aufruf:", error);
      setErrorMessage(`Es gab ein Problem beim Starten des Sprachdialogs: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
      addMessage(`Fehler beim Verbindungsaufbau: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`, "error");
      setIsLoading(false);
      
      toast({
        title: "Fehler",
        description: "Verbindung konnte nicht hergestellt werden.",
        variant: "destructive",
      });
    }
  };

  const stopVoiceTest = async (session: UltravoxSession | null) => {
    if (session) {
      try {
        session.muteMic();
        console.log("Mikrofon deaktiviert");
        
        await session.leaveCall();
        console.log("Sprachdialog beendet");
        
        addMessage("Sprachdialog beendet");
        setErrorMessage('');
        setIsLoading(false);
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
