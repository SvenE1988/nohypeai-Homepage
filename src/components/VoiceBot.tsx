
import React, { useState } from "react";
import { Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceBotLoading from "./voice/VoiceBotLoading";
import VoiceBotError from "./voice/VoiceBotError";
import VoiceBotMessages from "./voice/VoiceBotMessages";
import VoiceBotControls from "./voice/VoiceBotControls";
import VoiceBotSettings from "./voice/VoiceBotSettings";
import VoiceBotInfo from "./voice/VoiceBotInfo";
import { useVoiceBotLogic } from "@/hooks/useVoiceBotLogic";
import { useUltravoxSession } from "@/hooks/useUltravoxSession";

const VoiceBot = () => {
  const [useCase, setUseCase] = useState("immobilienmakler");
  const [voice, setVoice] = useState("pia");
  const [isActive, setIsActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'error' | 'completed'>('idle');

  const { session } = useUltravoxSession();
  const { 
    isLoading, 
    errorMessage, 
    messages, 
    startVoiceTest: startTest, 
    stopVoiceTest: stopTest 
  } = useVoiceBotLogic();

  const handleStart = async () => {
    setIsActive(true);
    setCallStatus('connecting');
    await startTest(useCase, voice, session);
    setCallStatus('active');
  };

  const handleStop = async () => {
    await stopTest(session);
    setIsActive(false);
    setCallStatus('completed');
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
                onStart={handleStart} 
                onStop={handleStop} 
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
