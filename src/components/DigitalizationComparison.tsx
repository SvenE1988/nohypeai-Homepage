
import React from "react";

const Divider = () => (
  <div className="flex w-full justify-center py-2">
    <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full opacity-70" />
  </div>
);

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
        <p className="text-gray-400 text-base sm:text-lg mb-2">
          In einer Welt, die sich immer schneller digitalisiert, entscheidet deine technologische Schlagkraft über Erfolg oder Stillstand. Wenn dein Betrieb weiterhin auf manuelle Abläufe und alte Systeme setzt, riskierst du nicht nur, im Tagesgeschäft kostbare Zeit zu verlieren, sondern auch, deine Kunden nicht mehr zufriedenstellen zu können. Sie erwarten heute sofortige Reaktionen, individuell zugeschnittene Services und einen reibungslosen Prozess.
        </p>
        <Divider />

        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-black/60 border border-gray-700 rounded-xl p-6 md:p-8 flex flex-col shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2">Das Hindernis</h3>
            <p className="text-gray-300 text-base sm:text-lg">
              Viele Betriebe stecken in langsamen, veralteten Prozessen fest, die Personal und Budget binden. Jeder manuelle Schritt erhöht das Risiko für Fehler, führt zu Frust im Team und sorgt für unzufriedene Kunden, weil Entscheidungen ohne valide Daten getroffen werden. Obwohl viele glauben, digital gut aufgestellt zu sein, merken sie oft zu spät, dass ihre Systeme den Fortschritt ausbremsen und sie den Takt am Markt nicht halten können.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary rounded-xl p-6 md:p-8 flex flex-col shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Dein Sprung nach vorn mit KI</h3>
            <p className="text-gray-100 text-base sm:text-lg">
              Künstliche Intelligenz eröffnet dir Wege zu völlig neuen Arbeitsweisen. Routinetätigkeiten werden automatisiert, Abläufe beschleunigt und Fehlerquellen minimiert. Dank datenbasierter Analysen triffst du Entscheidungen mit sicherem Blick – und verschaffst dir so einen nachhaltigen Wettbewerbsvorteil. Personalisiere dein Angebot, steigere die Servicequalität und schaffe Erlebnisse, die deine Kunden begeistern.<br /><br />
              Mit dem richtigen KI‑Partner machst du dein Unternehmen agiler, effektiver und bereit für die kommenden Herausforderungen. So hebst du dein volles Potenzial, sicherst dir Marktanteile und gestaltest die Zukunft aktiv mit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalizationComparison;
