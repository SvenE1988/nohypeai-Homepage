
import React from "react";
import { Proposal } from "../types";

interface CoverPageInfoProps {
  proposal: Proposal;
}

export const CoverPageInfo: React.FC<CoverPageInfoProps> = ({ proposal }) => {
  const { title, clientName } = proposal;

  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
      <h3 className="text-white font-medium mb-4">Deckblatt</h3>
      <p className="text-white/70 text-sm mb-6">
        Das Deckblatt wird automatisch generiert und enthält das Logo, den Titel des Angebots und den Namen des Kunden.
      </p>

      {/* Cover page preview */}
      <div className="cover-page-preview bg-black/50 rounded-lg p-6 border border-white/10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
              alt="NoHype Logo" 
              className="w-28"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-3 text-white">Angebot</h1>
          
          <div className="text-xl mb-2 text-white/90">
            {title || "Titel des Angebots"}
          </div>
          
          {clientName && (
            <div className="text-lg text-white/80">
              für {clientName}
            </div>
          )}
          
          <div className="mt-4 text-sm text-white/70">
            {new Date().toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
