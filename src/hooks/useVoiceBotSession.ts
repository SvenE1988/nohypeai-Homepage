
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

    // Enhanced status event listener with proper state handling
    newSession.addEventListener('status', () => {
      const currentStatus = newSession.status as CallStatus;
      console.log("Status changed:", currentStatus);
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

    // Enhanced transcript event listener
    newSession.addEventListener('transcripts', () => {
      console.log("Transcripts updated:", newSession.transcripts);
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
        console.log("Cleaning up session");
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
      console.log("Muting microphone");
      session?.muteMic();
    },
    unmuteMic: () => {
      console.log("Unmuting microphone");
      session?.unmuteMic();
    },
    muteSpeaker: () => {
      console.log("Muting speaker");
      session?.muteSpeaker();
    },
    unmuteSpeaker: () => {
      console.log("Unmuting speaker");
      session?.unmuteSpeaker();
    },
    joinCall: (joinUrl: string) => {
      console.log("Joining call with URL:", joinUrl);
      return session?.joinCall(joinUrl);
    },
    leaveCall: () => {
      console.log("Leaving call");
      return session?.leaveCall();
    },
  };
};
