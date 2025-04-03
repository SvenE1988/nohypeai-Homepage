
import React, { useState, useRef, useEffect } from "react";
import { Mic, Headphones, RefreshCw, StopCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const VoiceBot = () => {
  const [prompt, setPrompt] = useState(
    "Du bist ein hilfsbereiter deutscher Sprachassistent für eine KI-Agentur. Begrüße neue Nutzer freundlich, stelle Fragen zu ihren Bedürfnissen und erkläre, wie Sprach-KI helfen kann."
  );
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
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

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
          <Headphones className="w-5 h-5 text-primary" />
          KI-Sprachassistent testen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">System-Prompt:</label>
          <Textarea
            className="w-full bg-black/30 border-gray-700 text-white"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="System-Prompt eingeben..."
            disabled={listening}
          />
        </div>
        
        {isLoading && (
          <div className="flex flex-col space-y-2 p-4 bg-black/30 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-700" />
              <p className="text-gray-300 text-sm">Verbindung wird hergestellt...</p>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/2 animate-pulse"></div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-600/30 border border-red-500 text-white rounded-lg text-sm font-medium">
            <p>{error}</p>
          </div>
        )}
        
        {listening ? (
          <Button
            onClick={stopAudioStreaming}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
          >
            <span className="flex items-center gap-2">
              <StopCircle className="animate-pulse" /> Sprachdialog beenden
            </span>
          </Button>
        ) : (
          <Button
            onClick={startAudioStreaming}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 disabled:bg-gray-700 disabled:text-gray-300"
          >
            <span className="flex items-center gap-2">
              <Mic /> Sprachdialog starten
            </span>
          </Button>
        )}

        {messages.length > 0 && (
          <div className="mt-4">
            <Separator className="mb-3 bg-gray-700" />
            <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.sender === "user" 
                      ? "bg-gray-800/70 self-start mr-auto" 
                      : "bg-primary/20 self-end ml-auto"
                  }`}
                >
                  <div className="text-xs mb-1 text-gray-400">
                    {msg.sender === "user" ? "Du" : "KI-Assistent"}:
                  </div>
                  <div className="text-white">{msg.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceBot;
