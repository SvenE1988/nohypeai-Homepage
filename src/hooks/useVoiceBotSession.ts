
import { useState, useEffect } from 'react';
import { UltravoxSession } from 'ultravox-client';
import type { CallStatus, Transcript } from '@/types/voiceBot';

export const useVoiceBotSession = () => {
  const [session, setSession] = useState<UltravoxSession | null>(null);
  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize session with debug messages
    console.log("Initializing Ultravox session");
    const newSession = new UltravoxSession({
      experimentalMessages: new Set(['debug'])
    });

    // Set up event listeners
    newSession.addEventListener('status', () => {
      console.log("Status changed:", newSession.status);
      setStatus(newSession.status as CallStatus);
      if (newSession.status === 'idle') {
        setIsReady(true);
      }
    });

    newSession.addEventListener('transcripts', () => {
      console.log("Transcripts updated:", newSession.transcripts);
      setTranscripts(newSession.transcripts as Transcript[]);
    });

    newSession.addEventListener('experimental_message', (msg) => {
      console.log('Debug message:', JSON.stringify(msg));
    });

    setSession(newSession);
    setIsReady(true); // Mark as ready immediately to show the start button

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
    muteMic: () => session?.muteMic(),
    unmuteMic: () => session?.unmuteMic(),
    muteSpeaker: () => session?.muteSpeaker(),
    unmuteSpeaker: () => session?.unmuteSpeaker(),
    joinCall: (joinUrl: string) => {
      console.log("Joining call with URL:", joinUrl);
      return session?.joinCall(joinUrl);
    },
    leaveCall: () => session?.leaveCall(),
  };
};
