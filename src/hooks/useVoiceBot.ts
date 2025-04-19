
import { useState, useRef, useEffect } from 'react';
import { AudioHandler } from '@/utils/audioHandler';
import { AudioQueue } from '@/utils/audioQueueManager';
import { toast } from '@/components/ui/use-toast';
import type { CallStatus, CallMessage } from '@/types/voiceBot';

export const useVoiceBot = () => {
  const [useCase, setUseCase] = useState("immobilienmakler");
  const [voice, setVoice] = useState("pia");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState<CallMessage[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const audioHandlerRef = useRef<AudioHandler | null>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);

  const addMessage = (text: string, type: CallMessage['type'] = 'status') => {
    setMessages(prev => [...prev, {
      text,
      timestamp: new Date(),
      type
    }]);
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (audioHandlerRef.current) {
      audioHandlerRef.current.stop();
      audioHandlerRef.current = null;
    }
    if (audioQueueRef.current) {
      audioQueueRef.current.clear();
    }
  };

  useEffect(() => {
    audioQueueRef.current = new AudioQueue();
    return () => cleanup();
  }, []);

  return {
    useCase,
    setUseCase,
    voice,
    setVoice,
    isActive,
    setIsActive,
    isLoading,
    setIsLoading,
    callStatus,
    setCallStatus,
    errorMessage,
    setErrorMessage,
    messages,
    setMessages,
    stream,
    setStream,
    wsRef,
    audioHandlerRef,
    audioQueueRef,
    addMessage,
    cleanup
  };
};
