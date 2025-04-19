
import React from 'react';
import { Info } from 'lucide-react';

const VoiceBotInfo = () => {
  return (
    <div className="p-3 bg-black/50 rounded-lg border border-gray-800">
      <div className="flex items-start gap-2 text-xs text-gray-400">
        <Info className="w-4 h-4 text-primary mt-0.5" />
        <p>
          🔒 Ihre Spracheingabe wird zur Verarbeitung an unsere Server übermittelt. 
          Es findet keine dauerhafte Speicherung statt.
        </p>
      </div>
    </div>
  );
};

export default VoiceBotInfo;
