
import React from "react";

interface VoiceBotErrorProps {
  errorMessage: string;
}

const VoiceBotError = ({ errorMessage }: VoiceBotErrorProps) => {
  return (
    <div className="p-4 bg-red-600/30 border border-red-500 text-white rounded-lg text-sm font-medium">
      <p>{errorMessage}</p>
    </div>
  );
};

export default VoiceBotError;
