
import React from "react";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Info, CheckCircle } from "lucide-react";
import type { CallMessage } from "@/types/voiceBot";

interface VoiceBotMessagesProps {
  messages: CallMessage[];
}

const VoiceBotMessages = ({ messages }: VoiceBotMessagesProps) => {
  if (messages.length === 0) {
    return null;
  }

  const getMessageIcon = (type: CallMessage['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="mt-4">
      <Separator className="mb-3 bg-gray-700" />
      <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 p-2 rounded-lg ${
              msg.type === 'error' 
                ? 'bg-red-950/30 border border-red-900/50' 
                : 'bg-gray-800/30'
            }`}
          >
            {getMessageIcon(msg.type)}
            <div className="flex-1">
              <p className="text-sm text-white">{msg.text}</p>
              <span className="text-xs text-gray-400">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBotMessages;
