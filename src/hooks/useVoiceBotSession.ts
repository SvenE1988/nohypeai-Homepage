
import { useState, useEffect, useRef, useCallback } from 'react';
import { UltravoxSession } from 'ultravox-client';
import type { CallStatus, Transcript } from '@/types/voiceBot';
import { toast } from '@/components/ui/use-toast';

export const useVoiceBotSession = () => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  // Use refs to maintain instance references
  const sessionRef = useRef<UltravoxSession | null>(null);
  const isInitializedRef = useRef(false);

  // Cleanup function to properly remove event listeners
  const cleanupSession = useCallback(() => {
    if (sessionRef.current) {
      // Remove all event listeners
      sessionRef.current.removeAllEventListeners();
      
      // Leave call if active
      if (status !== 'disconnected' && status !== 'idle') {
        sessionRef.current.leaveCall().catch(console.error);
      }
    }
  }, [status]);

  useEffect(() => {
    // Only initialize once
    if (!isInitializedRef.current) {
      console.log("Initializing Ultravox session");
      
      const session = new UltravoxSession({
        experimentalMessages: new Set(['debug'])
      });
      
      sessionRef.current = session;
      isInitializedRef.current = true;

      // Status event listener
      session.addEventListener('status', () => {
        const currentStatus = session.status as CallStatus;
        setStatus(currentStatus);
        
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
            setIsReady(true);
            break;
        }
      });

      // Transcript event listener
      session.addEventListener('transcripts', () => {
        if (sessionRef.current) {
          const newTranscripts = sessionRef.current.transcripts as Transcript[];
          setTranscripts(newTranscripts);
        }
      });

      // Debug event listener
      session.addEventListener('experimental_message', (msg) => {
        console.log('Debug message:', JSON.stringify(msg));
      });

      setIsReady(true);
    }

    // Cleanup on unmount
    return () => {
      cleanupSession();
    };
  }, []); // Empty dependency array ensures this runs only once

  // Return session controls and state
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
    joinCall: async (joinUrl: string) => {
      if (!sessionRef.current) return Promise.reject(new Error("Session not initialized"));
      
      // Clean up any existing call first
      await cleanupSession();
      
      // Join new call
      return sessionRef.current.joinCall(joinUrl);
    },
    leaveCall: async () => {
      if (!sessionRef.current) return Promise.reject(new Error("Session not initialized"));
      return sessionRef.current.leaveCall();
    },
  };
};
