
import { useState, useEffect, useRef, useCallback } from 'react';
import { UltravoxSession } from 'ultravox-client';
import type { CallStatus, Transcript } from '@/types/voiceBot';
import { toast } from '@/components/ui/use-toast';

export const useVoiceBotSession = () => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  
  const sessionRef = useRef<UltravoxSession | null>(null);
  const isInitializedRef = useRef(false);

  const cleanupSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.removeEventListener('status', handleStatusEvent);
      sessionRef.current.removeEventListener('transcripts', handleTranscriptsEvent);
      sessionRef.current.removeEventListener('experimental_message', handleDebugEvent);
      
      if (status !== 'disconnected' && status !== 'idle') {
        sessionRef.current.leaveCall().catch(console.error);
      }
    }
    setIsMicMuted(false);
    setIsSpeakerMuted(false);
  }, [status]);

  const updateMuteStates = useCallback(() => {
    if (sessionRef.current) {
      setIsMicMuted(sessionRef.current.isMicMuted());
      setIsSpeakerMuted(sessionRef.current.isSpeakerMuted());
    }
  }, []);

  const handleStatusEvent = useCallback(() => {
    if (sessionRef.current) {
      const currentStatus = sessionRef.current.status as CallStatus;
      setStatus(currentStatus);
      updateMuteStates();
      
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
    }
  }, [updateMuteStates]);

  const handleTranscriptsEvent = useCallback(() => {
    if (sessionRef.current) {
      const newTranscripts = sessionRef.current.transcripts as Transcript[];
      setTranscripts(newTranscripts);
    }
  }, []);

  const handleDebugEvent = useCallback((msg) => {
    console.log('Debug message:', JSON.stringify(msg));
  }, []);

  useEffect(() => {
    if (!isInitializedRef.current) {
      console.log("Initializing Ultravox session");
      
      const session = new UltravoxSession({
        experimentalMessages: new Set(['debug'])
      });
      
      sessionRef.current = session;
      isInitializedRef.current = true;

      session.addEventListener('status', handleStatusEvent);
      session.addEventListener('transcripts', handleTranscriptsEvent);
      session.addEventListener('experimental_message', handleDebugEvent);

      setIsReady(true);
    }

    return () => {
      cleanupSession();
      isInitializedRef.current = false;
    };
  }, []); 

  const muteMic = useCallback(() => {
    if (sessionRef.current) {
      console.log('Muting microphone');
      sessionRef.current.muteMic();
      setIsMicMuted(true);
    }
  }, []);

  const unmuteMic = useCallback(() => {
    if (sessionRef.current) {
      console.log('Unmuting microphone');
      sessionRef.current.unmuteMic();
      setIsMicMuted(false);
    }
  }, []);

  const muteSpeaker = useCallback(() => {
    if (sessionRef.current) {
      console.log('Muting speaker');
      sessionRef.current.muteSpeaker();
      setIsSpeakerMuted(true);
    }
  }, []);

  const unmuteSpeaker = useCallback(() => {
    if (sessionRef.current) {
      console.log('Unmuting speaker');
      sessionRef.current.unmuteSpeaker();
      setIsSpeakerMuted(false);
    }
  }, []);

  const joinCall = async (joinUrl: string) => {
    if (!sessionRef.current) return Promise.reject(new Error("Session not initialized"));
    
    await cleanupSession();
    
    try {
      await sessionRef.current.joinCall(joinUrl);
      updateMuteStates();
      return Promise.resolve();
    } catch (error) {
      console.error('Error joining call:', error);
      throw error;
    }
  };

  const leaveCall = async () => {
    if (!sessionRef.current) return Promise.reject(new Error("Session not initialized"));
    try {
      await sessionRef.current.leaveCall();
      setIsMicMuted(false);
      setIsSpeakerMuted(false);
      return Promise.resolve();
    } catch (error) {
      console.error('Error leaving call:', error);
      throw error;
    }
  };

  return {
    session: sessionRef.current,
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
    leaveCall,
  };
};
