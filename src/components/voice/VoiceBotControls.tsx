
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Loader2 } from "lucide-react";
import type { CallStatus } from "@/types/voiceBot";

interface VoiceBotControlsProps {
  listening: boolean;
  isLoading: boolean;
  callStatus: CallStatus;
  onStart: () => void;
  onStop: () => void;
}

const VoiceBotControls = ({ 
  listening, 
  isLoading, 
  callStatus,
  onStart, 
  onStop 
}: VoiceBotControlsProps) => {
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Verbindung wird aufgebaut...
        </span>
      );
    }
    
    if (listening) {
      return (
        <span className="flex items-center gap-2">
          <StopCircle className="animate-pulse" /> Sprachdialog beenden
        </span>
      );
    }
    
    return (
      <span className="flex items-center gap-2">
        <Mic /> Sprachdialog starten
      </span>
    );
  };

  return (
    <Button
      onClick={listening ? onStop : onStart}
      disabled={isLoading}
      className={`w-full py-6 ${
        listening 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-primary hover:bg-primary/90'
      } text-white disabled:bg-gray-700 disabled:text-gray-300`}
    >
      {getButtonContent()}
    </Button>
  );
};

export default VoiceBotControls;
