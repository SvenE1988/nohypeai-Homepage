
import React from "react";

/**
 * Archiv-Seite – hier kannst du Abschnitte oder Komponenten "parken".
 * Nicht verlinkt, nur direkt über /archiv erreichbar.
 */
const Archiv: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <div className="max-w-xl w-full border border-dashed border-primary rounded-xl p-8 bg-black/80 mt-16 shadow-xl">
        <h1 className="text-3xl mb-3 font-bold">⛔ Archiv</h1>
        <p className="mb-2 text-primary-foreground/80">
          Hier kannst du vorübergehend Komponenten/Blöcke ablegen, die aktuell nicht öffentlich sichtbar sein sollen.
        </p>
        <p className="text-muted-foreground text-sm">
          Wichtig: Diese Seite erscheint <strong>nicht</strong> im Menü und ist nur über <code className="bg-primary/10 text-primary px-1 rounded">/archiv</code> erreichbar.
        </p>
        <div className="mt-8 pt-8 border-t border-primary/30">
          {/* AB HIER KANNST DU DEINE "GEARCHIVIERTEN" BLÖCKE EINFÜGEN: */}
          {/* Beispiel:
              <MeinAlterBereich />
           */}
        </div>
      </div>
    </div>
  );
};

export default Archiv;
