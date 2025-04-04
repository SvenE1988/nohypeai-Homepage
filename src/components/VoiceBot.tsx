
import React, { useState } from "react";
import { Headphones } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useVoiceStream from "@/hooks/useVoiceStream";
import VoiceBotMessages from "@/components/voice/VoiceBotMessages";
import VoiceBotLoading from "@/components/voice/VoiceBotLoading";
import VoiceBotError from "@/components/voice/VoiceBotError";
import VoiceBotControls from "@/components/voice/VoiceBotControls";

const VoiceBot = () => {
  const [prompt, setPrompt] = useState(
    "Du bist ein hilfsbereiter deutscher Sprachassistent für eine KI-Agentur. Begrüße neue Nutzer freundlich, stelle Fragen zu ihren Bedürfnissen und erkläre, wie Sprach-KI helfen kann."
  );

  const {
    listening,
    messages,
    isLoading,
    error,
    startAudioStreaming,
    stopAudioStreaming
  } = useVoiceStream({ prompt });

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
        
        {isLoading && <VoiceBotLoading />}
        
        {error && <VoiceBotError errorMessage={error} />}
        
        <VoiceBotControls 
          listening={listening}
          isLoading={isLoading}
          onStart={startAudioStreaming}
          onStop={stopAudioStreaming}
        />

        <VoiceBotMessages messages={messages} />
      </CardContent>
    </Card>
  );
};

export default VoiceBot;
