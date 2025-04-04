
import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface UseVoiceStreamProps {
  prompt: string;
}

const useVoiceStream = ({ prompt }: UseVoiceStreamProps) => {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WebSocket and audio processing references
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup function for audio resources
  const cleanupAudioResources = () => {
    try {
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
        wsRef.current = null;
      }
    } catch (err) {
      console.error("Fehler beim Bereinigen der Audio-Ressourcen:", err);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupAudioResources();
    };
  }, []);

  const startAudioStreaming = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setListening(true);
      setMessages([]);

      // Get user microphone permission and setup audio context
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      // Create script processor for audio processing
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);

      // Setup WebSocket connection
      const ws = new WebSocket("wss://api.deepgram.com/v1/listen?model=aura-2-thalia-de&encoding=linear16&sample_rate=16000");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket verbunden, sende Konfiguration...");
        ws.send(
          JSON.stringify({
            type: "Configure",
            api_key: "ca56f058f600d2432e546bc000976a8da9a82d73",
            llm: {
              provider: "openai",
              model: "gpt-4o-mini"
            },
            agent: {
              prompt: prompt
            }
          })
        );
        setIsLoading(false);
      };

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          
          if (data.user_utterance) {
            setMessages((prev) => [...prev, { sender: "user", text: data.user_utterance }]);
          }
          
          if (data.text) {
            setMessages((prev) => [...prev, { sender: "bot", text: data.text }]);
            const utterance = new SpeechSynthesisUtterance(data.text);
            utterance.lang = "de-DE";
            speechSynthesis.speak(utterance);
          }
        } catch (err) {
          console.error("Fehler beim Verarbeiten der WebSocket-Nachricht:", err);
        }
      };

      processorRef.current.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const input = e.inputBuffer.getChannelData(0);
          const int16 = new Int16Array(input.length);
          for (let i = 0; i < input.length; i++) {
            int16[i] = input[i] * 32767;
          }
          ws.send(int16);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket geschlossen");
        setListening(false);
        cleanupAudioResources();
      };

      ws.onerror = (e) => {
        console.error("WebSocket Fehler:", e);
        setError("Verbindungsfehler mit Deepgram. Bitte versuche es später erneut.");
        setListening(false);
        cleanupAudioResources();
      };
    } catch (err) {
      console.error("Fehler beim Starten des Audio-Streamings:", err);
      setError(`Fehler beim Starten des Sprachassistenten: ${(err as Error).message || "Unbekannter Fehler"}`);
      setListening(false);
      setIsLoading(false);
      cleanupAudioResources();
    }
  };

  const stopAudioStreaming = () => {
    setListening(false);
    cleanupAudioResources();
  };

  return {
    listening,
    messages,
    isLoading,
    error,
    startAudioStreaming,
    stopAudioStreaming
  };
};

export default useVoiceStream;
