
import { useState, useEffect, useRef } from 'react';
import { UltravoxSession } from 'ultravox-client';
import type { CallStatus, Transcript } from '@/types/voiceBot';
import { toast } from '@/components/ui/use-toast';

export const useVoiceBotSession = () => {
  const [session, setSession] = useState<UltravoxSession | null>(null);
  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  // Ref to track if event listeners are already set
  const listenersSetRef = useRef(false);
  // Ref to track the actual session object
  const sessionRef = useRef<UltravoxSession | null>(null);

  useEffect(() => {
    console.log("Initializing Ultravox session");
    
    // Only create a new session if one doesn't exist yet
    if (!sessionRef.current) {
      const newSession = new UltravoxSession({
        experimentalMessages: new Set(['debug'])
      });
      
      sessionRef.current = newSession;
      setSession(newSession);
      
      // Only set up event listeners once
      if (!listenersSetRef.current) {
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
        
        listenersSetRef.current = true;
      }
      
      setIsReady(true);
    }

    return () => {
      // Cleanup function should only disconnect the session, not destroy it
      // This prevents creating a new session on re-renders
      if (sessionRef.current) {
        // Leave call but don't reset sessionRef to allow reuse
        sessionRef.current.leaveCall().catch(console.error);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return {
    session: sessionRef.current,
    status,
    transcripts,
    isReady,
    isMicMuted: sessionRef.current ? sessionRef.current.isMicMuted : false,
    isSpeakerMuted: sessionRef.current ? sessionRef.current.isSpeakerMuted : false,
    muteMic: () => {
      if (sessionRef.current) sessionRef.current.muteMic();
    },
    unmuteMic: () => {
      if (sessionRef.current) sessionRef.current.unmuteMic();
    },
    muteSpeaker: () => {
      if (sessionRef.current) sessionRef.current.muteSpeaker();
    },
    unmuteSpeaker: () => {
      if (sessionRef.current) sessionRef.current.unmuteSpeaker();
    },
    joinCall: (joinUrl: string) => {
      if (!sessionRef.current) return Promise.reject(new Error("Session not initialized"));
      return sessionRef.current.joinCall(joinUrl);
    },
    leaveCall: () => {
      if (!sessionRef.current) return Promise.reject(new Error("Session not initialized"));
      return sessionRef.current.leaveCall();
    },
  };
};
