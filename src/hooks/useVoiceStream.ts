
import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface UseVoiceStreamProps {
  prompt: string;
}

// Prüfen, ob AudioWorklet unterstützt wird
const supportsAudioWorklet = 'AudioWorklet' in (typeof window !== 'undefined' ? window : {});

const useVoiceStream = ({ prompt }: UseVoiceStreamProps) => {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WebSocket und Audio-Verarbeitung Referenzen
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorNodeRef = useRef<ScriptProcessorNode | AudioWorkletNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Bereinigungsfunktion für Audio-Ressourcen
  const cleanupAudioResources = () => {
    try {
      // Verbindung zum WebSocket schließen
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
        wsRef.current = null;
      }

      // Audio-Knoten trennen und bereinigen
      if (processorNodeRef.current) {
        processorNodeRef.current.disconnect();
        processorNodeRef.current = null;
      }
      
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
          .catch(err => console.error("Fehler beim Schließen des AudioContext:", err));
        audioContextRef.current = null;
      }
      
      // Mikrofonzugriff beenden
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    } catch (err) {
      console.error("Fehler beim Bereinigen der Audio-Ressourcen:", err);
    }
  };

  // Bereinigung bei Komponenten-Unmount
  useEffect(() => {
    return () => {
      cleanupAudioResources();
    };
  }, []);

  // Audio-Processor-Setup - mit Fallback für Browser ohne AudioWorklet
  const setupAudioProcessing = async (
    stream: MediaStream, 
    audioContext: AudioContext,
    onAudioProcess: (audioData: Int16Array) => void
  ) => {
    const source = audioContext.createMediaStreamSource(stream);
    sourceNodeRef.current = source;

    if (supportsAudioWorklet) {
      try {
        // AudioWorklet verwenden (moderne Methode)
        const workletUrl = URL.createObjectURL(new Blob([`
          class AudioProcessor extends AudioWorkletProcessor {
            constructor() {
              super();
            }
            
            process(inputs, outputs) {
              // Audiodaten verarbeiten und ans Hauptthread senden
              if (inputs[0]?.[0]) {
                const input = inputs[0][0];
                const int16 = new Int16Array(input.length);
                for (let i = 0; i < input.length; i++) {
                  int16[i] = input[i] * 32767;
                }
                this.port.postMessage(int16);
              }
              return true; // Weiterlaufen
            }
          }
          
          registerProcessor('audio-processor', AudioProcessor);
        `], { type: 'application/javascript' }));
        
        await audioContext.audioWorklet.addModule(workletUrl);
        
        const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
        workletNode.port.onmessage = (event) => {
          onAudioProcess(event.data);
        };
        
        source.connect(workletNode);
        // AudioWorkletNode muss nicht mit destination verbunden werden
        
        processorNodeRef.current = workletNode;
        return;
      } catch (err) {
        console.warn("AudioWorklet wird nicht unterstützt oder konnte nicht initialisiert werden, Fallback auf ScriptProcessor:", err);
        // Fallback auf ScriptProcessor
      }
    }
    
    // ScriptProcessorNode als Fallback für ältere Browser
    console.warn("Verwende veralteten ScriptProcessorNode als Fallback");
    const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    scriptProcessor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const int16 = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        int16[i] = input[i] * 32767;
      }
      onAudioProcess(int16);
    };
    
    source.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination); // Nötig für ScriptProcessor
    
    processorNodeRef.current = scriptProcessor;
  };

  const startAudioStreaming = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setListening(true);
      setMessages([]);

      // Mikrofonzugriff anfordern
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // AudioContext initialisieren
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // WebSocket-Verbindung aufbauen
      const url = "wss://deepgram.se-server.nohype.ai.de/voice-agent";
      console.log(`Verbindung zum WebSocket wird aufgebaut: ${url}`);
      
      const ws = new WebSocket(url);
      wsRef.current = ws;

      // Timeout für die WebSocket-Verbindung setzen
      const connectionTimeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          setError("Verbindung zum Server konnte nicht hergestellt werden. Bitte prüfe, ob der Server läuft und erreichbar ist.");
          setIsLoading(false);
          setListening(false);
          cleanupAudioResources();
        }
      }, 5000); // 5 Sekunden Timeout

      ws.onopen = () => {
        console.log("WebSocket verbunden, sende Konfiguration...");
        clearTimeout(connectionTimeout);
        
        // Konfiguration an den Server senden
        ws.send(
          JSON.stringify({
            type: "Configure",
            prompt: prompt
          })
        );
        
        // Audio-Verarbeitung einrichten und Daten an WebSocket senden
        setupAudioProcessing(
          stream, 
          audioContextRef.current!, 
          (audioData: Int16Array) => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(audioData);
            }
          }
        ).catch(err => {
          console.error("Fehler beim Einrichten der Audio-Verarbeitung:", err);
          setError(`Fehler bei der Audio-Verarbeitung: ${err.message}`);
        });
        
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

      ws.onclose = (event) => {
        console.log("WebSocket geschlossen", event.code, event.reason);
        setListening(false);
        cleanupAudioResources();
        
        // Spezifische Fehlerbehandlung je nach Schließungscode
        if (!event.wasClean) {
          setError("Die Verbindung zum Server wurde unerwartet getrennt. Bitte versuche es später erneut.");
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket Fehler:", e);
        setError("Verbindungsfehler mit dem Server. Bitte prüfe, ob der Server läuft und erreichbar ist.");
        setListening(false);
        setIsLoading(false);
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
