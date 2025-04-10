
import React from "react";
import { Info } from "lucide-react";

interface StatusMessageProps {
  isGeneratingPDF: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ isGeneratingPDF }) => {
  return (
    <>
      {isGeneratingPDF ? (
        <div className="flex items-center justify-center gap-2 text-center text-sm text-gray-400 mt-4 print:hidden animate-pulse">
          <div className="h-4 w-4 rounded-full bg-primary/20 animate-ping"></div>
          PDF wird generiert...
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 text-center text-sm text-gray-400 mt-4 print:hidden print-instructions">
          <Info className="h-4 w-4 text-gray-400" />
          Klicken Sie auf den "Exportieren" Button, um das Angebot als PDF zu speichern oder zu drucken.
        </div>
      )}
    </>
  );
};
