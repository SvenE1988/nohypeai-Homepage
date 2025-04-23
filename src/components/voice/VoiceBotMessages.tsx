
import React from "react";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Info, CheckCircle } from "lucide-react";
import type { Transcript } from "@/types/voiceBot";

interface VoiceBotMessagesProps {
  transcripts: Transcript[];
}

const VoiceBotMessages = ({ transcripts }: VoiceBotMessagesProps) => {
  if (transcripts.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <Separator className="mb-3 bg-gray-700" />
      <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
        {transcripts.map((transcript, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 p-2 rounded-lg ${
              transcript.speaker === 'agent' 
                ? 'bg-blue-950/30 border border-blue-900/50' 
                : 'bg-gray-800/30'
            }`}
          >
            {transcript.speaker === 'agent' ? (
              <Info className="w-4 h-4 text-blue-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            <div className="flex-1">
              <p className="text-sm text-white">{transcript.text}</p>
              <span className="text-xs text-gray-400">
                {transcript.speaker} {transcript.isFinal ? '(final)' : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBotMessages;
