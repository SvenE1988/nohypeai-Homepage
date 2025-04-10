
import React from "react";
import { Separator } from "@/components/ui/separator";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface VoiceBotMessagesProps {
  messages: Message[];
}

const VoiceBotMessages = ({ messages }: VoiceBotMessagesProps) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <Separator className="mb-3 bg-gray-700" />
      <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-black/30 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.sender === "user" 
                ? "bg-gray-800/70 self-start mr-auto" 
                : "bg-primary/20 self-end ml-auto"
            }`}
          >
            <div className="text-xs mb-1 text-gray-400">
              {msg.sender === "user" ? "Du" : "KI-Assistent"}:
            </div>
            <div className="text-white">{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBotMessages;
