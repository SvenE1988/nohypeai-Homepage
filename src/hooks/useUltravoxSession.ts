
import { useState, useEffect, useRef } from 'react';
import { UltravoxSession } from 'ultravox-client';

export const useUltravoxSession = () => {
  const sessionRef = useRef<UltravoxSession | null>(null);
  const [status, setStatus] = useState<string>('disconnected');
  const [transcripts, setTranscripts] = useState<any[]>([]);

  useEffect(() => {
    // Initialize session with debug messages enabled
    sessionRef.current = new UltravoxSession({ 
      experimentalMessages: new Set(["debug"]) 
    });

    // Listen for status changes
    sessionRef.current.addEventListener('status', (event) => {
      setStatus(sessionRef.current?.status || 'disconnected');
    });

    // Listen for transcripts
    sessionRef.current.addEventListener('transcripts', () => {
      if (sessionRef.current) {
        setTranscripts(sessionRef.current.transcripts);
      }
    });

    // Debug messages for development
    sessionRef.current.addEventListener('experimental_message', (msg) => {
      console.log('Debug message:', JSON.stringify(msg));
    });

    return () => {
      if (sessionRef.current) {
        sessionRef.current.leaveCall().catch(console.error);
      }
    };
  }, []);

  return {
    session: sessionRef.current,
    status,
    transcripts
  };
};
