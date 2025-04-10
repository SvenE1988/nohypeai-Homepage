
import React from "react";

export const CoverPageInfo: React.FC = () => {
  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
      <h3 className="text-white font-medium mb-4">Deckblatt</h3>
      <p className="text-white/70 text-sm">
        Das Deckblatt wird automatisch generiert und enthält das Logo und den Titel des Angebots.
      </p>
    </div>
  );
};
