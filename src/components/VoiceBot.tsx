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
import { supabase } from "@/integrations/supabase/client";
import { useUltravoxSession } from "@/hooks/useUltravoxSession";

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
    addMessage,
    cleanup
  } = useVoiceBot();

  const { session, status } = useUltravoxSession();

  const getMicrophonePermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      
      // Call the edge function to create the call
      const { data, error } = await supabase.functions.invoke('voice-bot', {
        body: { useCase: selectedUseCase, voice }
      });

      if (error) {
        throw new Error(`Edge Function error: ${error.message}`);
      }

      if (!data || !session) {
        throw new Error("No data received from Edge Function or session not initialized");
      }

      // Parse the joinUrl from the response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const streamElement = xmlDoc.querySelector("Stream");
      const joinUrl = streamElement?.getAttribute("url");

      if (!joinUrl) {
        throw new Error("Keine Stream-URL in der Antwort gefunden");
      }

      console.log("✅ Edge Function ausgelöst, Join URL erhalten:", joinUrl);
      addMessage("Edge Function erfolgreich ausgelöst");

      // Join the call using the Ultravox SDK
      session.joinCall(joinUrl);
      setCallStatus("active");

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

  const stopVoiceTest = async () => {
    if (session) {
      await session.leaveCall();
    }
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
