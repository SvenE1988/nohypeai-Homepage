
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UltravoxSession } from 'ultravox-client';
import type { CallMessage } from '@/types/voiceBot';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

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
    // Status listener
    session.addEventListener('status', (event) => {
      const status = session.status;
      console.log('Session status changed:', status);
      addMessage(`Session Status: ${status}`, 'info');
      
      // Spezifische Status-Meldungen
      switch(status) {
        case 'connecting':
          addMessage('Verbindung wird hergestellt...', 'info');
          break;
        case 'idle':
          addMessage('Bereit für den Sprachdialog', 'info');
          break;
        case 'listening':
          addMessage('Höre zu...', 'info');
          break;
        case 'thinking':
          addMessage('Verarbeite Eingabe...', 'info');
          break;
        case 'speaking':
          addMessage('KI spricht...', 'info');
          break;
      }
    });

    // Transcript listener
    session.addEventListener('transcripts', () => {
      if (session) {
        console.log('Neue Transkripte verfügbar:', session.transcripts);
      }
    });

    // Debug message listener
    session.addEventListener('experimental_message', (msg) => {
      console.log('Debug message:', JSON.stringify(msg));
    });
  };

  const waitForJoinUrl = async (
    retryCount: number,
    useCase: string,
    email: string
  ): Promise<string> => {
    try {
      console.log(`Versuch ${retryCount + 1} von ${MAX_RETRIES}, Edge Function wird aufgerufen...`);
      
      const { data, error } = await supabase.functions.invoke('voice-bot', {
        body: { useCase, email }
      });

      if (error) {
        throw new Error(`Edge Function error: ${error.message}`);
      }

      if (!data?.joinUrl) {
        if (retryCount < MAX_RETRIES - 1) {
          console.log(`Keine joinUrl erhalten, warte ${RETRY_DELAY/1000} Sekunden...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return waitForJoinUrl(retryCount + 1, useCase, email);
        }
        throw new Error('Keine joinUrl nach maximalen Versuchen erhalten');
      }

      return data.joinUrl;
    } catch (error) {
      if (retryCount < MAX_RETRIES - 1) {
        console.log(`Fehler beim Versuch ${retryCount + 1}, neuer Versuch in ${RETRY_DELAY/1000} Sekunden...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return waitForJoinUrl(retryCount + 1, useCase, email);
      }
      throw error;
    }
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
    addMessage("Verbindung wird aufgebaut...");

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
      // Event Listener VOR dem Edge Function Call registrieren
      setupSessionListeners(session);
      
      // Retry-Mechanismus für Join URL
      const joinUrl = await waitForJoinUrl(0, useCase, email);
      console.log("✅ Join URL erfolgreich erhalten:", joinUrl);
      addMessage("Join URL erfolgreich empfangen");

      // Call beitreten
      session.joinCall(joinUrl);
      addMessage("Dem Sprachdialog beigetreten");

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
        session.muteMic();
        console.log("Mikrofon deaktiviert");
        
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
