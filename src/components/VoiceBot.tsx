
import React from "react";
import { Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import VoiceBotLoading from "./voice/VoiceBotLoading";
import VoiceBotError from "./voice/VoiceBotError";
import VoiceBotMessages from "./voice/VoiceBotMessages";
import VoiceBotControls from "./voice/VoiceBotControls";
import VoiceBotSettings from "./voice/VoiceBotSettings";
import VoiceBotInfo from "./voice/VoiceBotInfo";
import { useVoiceBot } from "@/hooks/useVoiceBot";
import { AudioHandler } from "@/utils/audioHandler";
import { supabase } from "@/integrations/supabase/client";

const VoiceBot = () => {
  const {
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
  } = useVoiceBot();

  const getMicrophonePermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);
      addMessage("Mikrofonzugriff erfolgreich");
      return true;
    } catch (error) {
      console.error("Mikrofonzugriff fehlgeschlagen:", error);
      setErrorMessage("Bitte erlauben Sie den Zugriff auf Ihr Mikrofon.");
      addMessage("Mikrofonzugriff fehlgeschlagen", "error");
      toast({
        title: "Fehler",
        description: "Mikrofonzugriff wurde verweigert.",
        variant: "destructive",
      });
      return false;
    }
  };

  const encodeAudioForAPI = (float32Array: Float32Array): string => {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    const uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    const chunkSize = 0x8000;
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
  };

  const setupWebSocket = (joinUrl: string) => {
    if (!stream) return;

    try {
      wsRef.current = new WebSocket(joinUrl);
      
      wsRef.current.onopen = () => {
        setCallStatus("active");
        addMessage("WebSocket-Verbindung hergestellt");
        
        audioHandlerRef.current = new AudioHandler((audioData) => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            const base64Audio = encodeAudioForAPI(audioData);
            wsRef.current.send(JSON.stringify({
              type: 'input_audio_buffer.append',
              audio: base64Audio
            }));
          }
        });
        
        audioHandlerRef.current.start();
      };

      wsRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'response.audio.delta') {
          const binary = atob(data.delta);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          await audioQueueRef.current?.addToQueue(bytes);
        } else if (data.type === 'response.audio_transcript.delta') {
          addMessage(data.delta, 'info');
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket Fehler:", error);
        setErrorMessage("Verbindungsfehler aufgetreten");
        addMessage("WebSocket-Verbindungsfehler", "error");
      };

      wsRef.current.onclose = () => {
        setCallStatus("completed");
        addMessage("Verbindung beendet");
      };

    } catch (error) {
      console.error("WebSocket Setup Fehler:", error);
      setErrorMessage("Fehler beim Verbindungsaufbau");
      setCallStatus("error");
    }
  };

  const startVoiceTest = async (selectedUseCase: string) => {
    setIsActive(true);
    setIsLoading(true);
    setCallStatus("connecting");
    setErrorMessage("");
    addMessage("Verbindung wird aufgebaut...");

    const hasMicPermission = await getMicrophonePermission();
    if (!hasMicPermission) {
      setIsLoading(false);
      setCallStatus("error");
      return;
    }

    try {
      console.log("Calling voice-bot Edge Function with params:", { useCase: selectedUseCase, voice });
      
      const { data, error } = await supabase.functions.invoke('voice-bot', {
        body: { useCase: selectedUseCase, voice }
      });

      if (error) {
        console.error("Edge Function error:", error);
        throw new Error(`Edge Function error: ${error.message}`);
      }

      if (!data) {
        throw new Error("No data received from Edge Function");
      }

      console.log("Edge function response:", data);
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const streamElement = xmlDoc.querySelector("Stream");
      const streamUrl = streamElement?.getAttribute("url");

      if (!streamUrl) {
        throw new Error("Keine Stream-URL in der Antwort gefunden");
      }

      console.log("✅ Edge Function ausgelöst, Stream URL erhalten:", streamUrl);
      addMessage("Edge Function erfolgreich ausgelöst");
      
      setupWebSocket(streamUrl);

      toast({
        title: "Verbindung hergestellt",
        description: "Der Sprachassistent ist jetzt aktiv.",
      });
    } catch (error) {
      console.error("❌ Fehler beim Aufruf:", error);
      setErrorMessage(`Es gab ein Problem beim Starten des Sprachdialogs: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
      setCallStatus("error");
      addMessage(`Fehler beim Verbindungsaufbau: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`, "error");
      toast({
        title: "Fehler",
        description: "Verbindung konnte nicht hergestellt werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopVoiceTest = () => {
    cleanup();
    setIsActive(false);
    setCallStatus("completed");
    setErrorMessage("");
    addMessage("Sprachdialog beendet");
  };

  return (
    <div className="relative">
      <div className="max-w-sm mx-auto">
        <div className="relative border-[14px] border-gray-900 rounded-[3rem] shadow-xl bg-black overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-xl" />
          <Card className="border-0 bg-gradient-to-b from-[#1A1F35] to-black min-h-[600px]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
                <Headphones className="w-5 h-5 text-primary" />
                KI-Sprachassistent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <VoiceBotSettings 
                useCase={useCase}
                setUseCase={setUseCase}
                voice={voice}
                setVoice={setVoice}
                isActive={isActive}
              />
              <VoiceBotInfo />
              {isLoading && <VoiceBotLoading />}
              {errorMessage && <VoiceBotError errorMessage={errorMessage} />}
              <VoiceBotMessages messages={messages} />
              <VoiceBotControls 
                listening={isActive} 
                isLoading={isLoading}
                callStatus={callStatus} 
                onStart={() => startVoiceTest(useCase)} 
                onStop={stopVoiceTest} 
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-32 h-1.5 bg-gray-900 mx-auto mt-4 rounded-full" />
      </div>
    </div>
  );
};

export default VoiceBot;
