
import React from "react";

const Divider = () => (
  <div className="flex w-full justify-center py-2">
    <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full opacity-70" />
  </div>
);

// Bildpfade für die Kacheln
const OBSTACLE_IMG = "/lovable-uploads/012c5469-041d-42fd-b912-3c8314d1e178.png";
const JUMP_FORWARD_IMG = "/lovable-uploads/867ea91a-ecb7-4b90-aa07-c6674b5acc7f.png";

const DigitalizationComparison = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-transparent" id="digital-comparison">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-5">
          Wo stehst du auf dem Weg zur Digitalisierung?
        </h2>
        <Divider />
        <p className="text-gray-400 text-base sm:text-lg mb-2">
          Spürst du, wie die Konkurrenz immer mehr interne Abläufe automatisiert, Entscheidungen auf Basis von Daten trifft und Künstliche Intelligenz nutzt, um schneller und effizienter zu agieren? Während andere bereits auf smarte Technologien setzen, kann es passieren, dass du den Anschluss verlierst – und das spürbar in Umsatz und Kundenbindung.
        </p>
        <Divider />

        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Linke Kachel: Das Hindernis */}
          <div className="bg-black/60 border border-gray-700 rounded-xl p-6 md:p-8 flex flex-col shadow-xl">
            <img
              src={OBSTACLE_IMG}
              alt="Visualisierung von Hindernissen für die Digitalisierung"
              className="w-full rounded-xl mb-5 object-cover max-h-56 border border-gray-800"
              loading="lazy"
              style={{ aspectRatio: "4/3" }}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2">
              Das Hindernis
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              In kleinen Unternehmen türmen sich Anrufe und E‑Mail‑Anfragen, während Dein Team mit manuellen Routinen kämpft: Leads bleiben unbeantwortet, Standardfragen (Öffnungszeiten, Preise etc.) binden täglich Stunden, und Gesprächsnotizen liegen verstreut in Excel‑Listen oder Zetteln. Proaktive Betreuung bleibt so auf der Strecke und akute Probleme sorgen für Stress und unzufriedene Kunden.
            </p>
          </div>
          {/* Rechte Kachel: Zum Ziel mit Sprachbots & OfficePiloten */}
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary rounded-xl p-6 md:p-8 flex flex-col shadow-xl">
            <img
              src={JUMP_FORWARD_IMG}
              alt="Ein Mensch schreitet energisch ins Licht – symbolisch für den KI-Sprung"
              className="w-full rounded-xl mb-5 object-cover max-h-56 border border-primary/30"
              loading="lazy"
              style={{ aspectRatio: "4/3" }}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Zum Ziel mit Sprachbots &amp; OfficePiloten
            </h3>
            <p className="text-gray-100 text-base sm:text-lg">
              Sprachbots nehmen 24/7 jeden Anruf an, qualifizieren Leads in wenigen Minuten und filtern Routinefragen automatisch heraus. Dein OfficePilot erstellt per Knopfdruck Angebote, fasst Meetings in klaren Summaries mit Action‑Items zusammen und liefert kompakte Research‑Guides. So sparst Du Stunden manueller Nacharbeit, sorgst für konsistente Abläufe und machst jeden Kundenkontakt zum Erfolgserlebnis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalizationComparison;
