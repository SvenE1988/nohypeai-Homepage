
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Bot, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Transcript } from "@/types/voiceBot";

interface VoiceBotMessagesProps {
  transcripts: Transcript[];
  status: string;
}

const VoiceBotMessages = ({ transcripts, status }: VoiceBotMessagesProps) => {
  if (transcripts.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center h-32 bg-black/30 rounded-lg border border-gray-800">
        <p className="text-gray-400 text-sm">Noch keine Konversation gestartet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-300">Gesprächsverlauf</h3>
        {status === 'thinking' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Verarbeitet</span>
            <Progress value={50} className="w-24 h-1.5" />
          </div>
        )}
      </div>
      <Separator className="mb-3 bg-gray-700" />
      <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
        {transcripts.map((transcript, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-2.5 rounded-lg ${
              transcript.speaker === 'agent' 
                ? 'bg-blue-950/30 border border-blue-900/50' 
                : 'bg-gray-800/50 border border-gray-700/50'
            }`}
          >
            <div className={`rounded-full p-1.5 flex-shrink-0 ${
              transcript.speaker === 'agent' ? 'bg-blue-500/20' : 'bg-green-500/20'
            }`}>
              {transcript.speaker === 'agent' ? (
                <Bot className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-green-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white break-words">{transcript.text}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  {transcript.speaker === 'agent' ? 'KI-Assistent' : 'Du'}
                </span>
                {!transcript.isFinal && (
                  <span className="text-xs bg-yellow-600/30 text-yellow-300 px-1 py-0.5 rounded">
                    wird transkribiert...
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBotMessages;
