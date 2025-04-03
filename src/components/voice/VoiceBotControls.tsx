
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";

interface VoiceBotControlsProps {
  listening: boolean;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
}

const VoiceBotControls = ({ 
  listening, 
  isLoading, 
  onStart, 
  onStop 
}: VoiceBotControlsProps) => {
  return (
    <>
      {listening ? (
        <Button
          onClick={onStop}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
        >
          <span className="flex items-center gap-2">
            <StopCircle className="animate-pulse" /> Sprachdialog beenden
          </span>
        </Button>
      ) : (
        <Button
          onClick={onStart}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 disabled:bg-gray-700 disabled:text-gray-300"
        >
          <span className="flex items-center gap-2">
            <Mic /> Sprachdialog starten
          </span>
        </Button>
      )}
    </>
  );
};

export default VoiceBotControls;
