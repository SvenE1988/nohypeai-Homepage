
import React, { useState, useEffect } from "react";
import { Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useVoiceStream from "@/hooks/useVoiceStream";
import VoiceBotMessages from "@/components/voice/VoiceBotMessages";
import VoiceBotLoading from "@/components/voice/VoiceBotLoading";
import VoiceBotError from "@/components/voice/VoiceBotError";
import VoiceBotControls from "@/components/voice/VoiceBotControls";
import VoiceBotAgentSelector, { AGENT_OPTIONS } from "@/components/voice/VoiceBotAgentSelector";

const VoiceBot = () => {
  const [selectedAgentId, setSelectedAgentId] = useState("default");
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  
  // Finde den ausgewählten Agenten aus den Optionen
  const selectedAgent = AGENT_OPTIONS.find(agent => agent.id === selectedAgentId);
  
  // Verwende entweder den benutzerdefinierten Prompt oder den des ausgewählten Agenten
  const prompt = showCustomPrompt ? customPrompt : (selectedAgent?.prompt || "");

  // Effekt zum Setzen des benutzerdefinierten Prompts, wenn der Agent wechselt
  useEffect(() => {
    if (selectedAgent && !showCustomPrompt) {
      setCustomPrompt(selectedAgent.prompt);
    }
  }, [selectedAgentId, selectedAgent, showCustomPrompt]);

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
        {/* Agent-Auswahl Dropdown */}
        <VoiceBotAgentSelector 
          selectedAgentId={selectedAgentId}
          onAgentChange={(agentId) => {
            setSelectedAgentId(agentId);
            setShowCustomPrompt(false);
          }}
          disabled={listening}
        />
        
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
