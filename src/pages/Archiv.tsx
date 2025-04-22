
import React from "react";
import Benefits from "../components/Benefits";
import GrowthSection from "../components/GrowthSection";
import FeatureCard from "@/components/features/FeatureCard";
import IndustryShowcase from "@/components/features/IndustryShowcase";
import SavingsCalculator from "../components/SavingsCalculator";
import FAQ from "../components/FAQ";

// Dummy-Daten für den FeatureCard (nur für die Ansicht im Archiv, falls benötigt)
const featureData = [{
  title: "LeadBooster",
  subtitle: "Nie mehr Leads verpassen: Sofortige Quali & Booking in einem Schritt",
  benefits: ["Blitzschnelle Erstreaktion < 2 Min.", "Automatisches Quali-Skript (Budget, Bedarf, Timing)", "Direkte Terminbuchung in Google/Outlook/CRM", "Deutlich höhere Conversion-Rate durch sofortiges Follow-up"],
  targetAudience: "Photovoltaik- und Wärmepumpen-Vertrieb, Versicherungsagenturen, Online-Bildung, Door-to-Door-Sales"
}, {
  title: "SurveyBot",
  subtitle: "Dein 24/7-Agent für First-Level-Support & saubere Tickets",
  benefits: ["Rund-um-die-Uhr FAQs beantworten, Schein-Anfragen filtern", "DSGVO-konforme Transkription aller Gespräche", "Intelligentes Routing: nur echte Fälle an Dein Team", "Insights-Dashboards: Peak-Zeiten, Themen-Clustering, Ticket-Stats"],
  targetAudience: "Schlüsseldienste & Notfalldienste, Hausverwaltungen, Fahrradläden, KMU mit hohem Call-Volumen"
}, {
  title: "OfficePilot",
  subtitle: "Back-Office auf Autopilot: Transkripte, Reports & Playbooks",
  benefits: ["Automatische Transkripte & Summaries von Zoom/Teams", "Angebots-Generator statt Word-Vorlagen-Basteln", "Research-Playbooks: Firmeninfos + E-Mail-Templates on demand", "KPI-Dashboards: Zeiteinsparung, Reporting, Batch-Transkription"],
  targetAudience: "Berater & Solo-Selbständige, Marketing-/Projekt-Teams, Agenturen und Professional Services"
}];

const Archiv: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <div className="max-w-4xl w-full border border-dashed border-primary rounded-xl p-8 bg-black/80 mt-16 shadow-xl">
        <h1 className="text-3xl mb-3 font-bold">⛔ Archiv</h1>
        <p className="mb-2 text-primary-foreground/80">
          Hier kannst du vorübergehend Komponenten/Blöcke ablegen, die aktuell nicht öffentlich sichtbar sein sollen.
        </p>
        <p className="text-muted-foreground text-sm">
          Wichtig: Diese Seite erscheint <strong>nicht</strong> im Menü und ist nur über <code className="bg-primary/10 text-primary px-1 rounded">/archiv</code> erreichbar.
        </p>
        <div className="mt-8 pt-8 border-t border-primary/30">
          {/* Benefits */}
          <Benefits />
          {/* Growth Section */}
          <GrowthSection />
          {/* Features Content */}
          <div className="container mx-auto px-2 sm:px-4 py-10 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Archiv: Unsere Lösungen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto">
              {featureData.map((feature, index) => <FeatureCard key={index} {...feature} />)}
            </div>
            {/* Branchenshowcase als Bonus im Archiv, falls gewünscht */}
            <IndustryShowcase />
          </div>
          {/* SavingsCalculator & FAQ als Beispiel auch hier archiviert */}
          <SavingsCalculator />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Archiv;
