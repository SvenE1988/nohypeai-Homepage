
import React from "react";

interface StatusMessageProps {
  isGeneratingPDF: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ isGeneratingPDF }) => {
  return (
    <>
      {isGeneratingPDF ? (
        <p className="text-center text-sm text-gray-400 mt-4 print:hidden animate-pulse">
          PDF wird generiert...
        </p>
      ) : (
        <p className="text-center text-sm text-gray-400 mt-4 print:hidden print-instructions">
          Klicken Sie auf den "Exportieren" Button in der oberen Leiste, um das Angebot als PDF zu speichern oder zu drucken.
        </p>
      )}
    </>
  );
};
