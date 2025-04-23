
import { useState, useEffect } from 'react';
import { UltravoxSession } from 'ultravox-client';
import type { CallStatus, Transcript } from '@/types/voiceBot';
import { toast } from '@/components/ui/use-toast';

export const useVoiceBotSession = () => {
  const [session, setSession] = useState<UltravoxSession | null>(null);
  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("Initializing Ultravox session");
    const newSession = new UltravoxSession({
      experimentalMessages: new Set(['debug'])
    });

    // Status event listener with proper state handling
    newSession.addEventListener('status', () => {
      const currentStatus = newSession.status as CallStatus;
      setStatus(currentStatus);
      
      // Show appropriate toast messages based on status
      switch(currentStatus) {
        case 'connecting':
          toast({ description: "Verbindung wird hergestellt..." });
          break;
        case 'idle':
          setIsReady(true);
          break;
        case 'listening':
          toast({ description: "Ich höre zu..." });
          break;
        case 'thinking':
          toast({ description: "Verarbeite Eingabe..." });
          break;
        case 'speaking':
          toast({ description: "KI spricht..." });
          break;
        case 'disconnected':
          toast({ description: "Verbindung getrennt" });
          break;
      }
    });

    // Transcript event listener
    newSession.addEventListener('transcripts', () => {
      const newTranscripts = newSession.transcripts as Transcript[];
      setTranscripts(newTranscripts);
    });

    // Debug event listener
    newSession.addEventListener('experimental_message', (msg) => {
      console.log('Debug message:', JSON.stringify(msg));
    });

    setSession(newSession);
    setIsReady(true);

    return () => {
      if (newSession) {
        newSession.leaveCall().catch(console.error);
      }
    };
  }, []);

  return {
    session,
    status,
    transcripts,
    isReady,
    isMicMuted: session ? session.isMicMuted : false,
    isSpeakerMuted: session ? session.isSpeakerMuted : false,
    muteMic: () => {
      if (session) session.muteMic();
    },
    unmuteMic: () => {
      if (session) session.unmuteMic();
    },
    muteSpeaker: () => {
      if (session) session.muteSpeaker();
    },
    unmuteSpeaker: () => {
      if (session) session.unmuteSpeaker();
    },
    joinCall: (joinUrl: string) => {
      if (!session) return Promise.reject(new Error("Session not initialized"));
      return session.joinCall(joinUrl);
    },
    leaveCall: () => {
      if (!session) return Promise.reject(new Error("Session not initialized"));
      return session.leaveCall();
    },
  };
};
