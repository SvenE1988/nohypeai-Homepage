import NavHeader from "@/components/blocks/nav-header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/features/FeatureCard";
import IndustryShowcase from "@/components/features/IndustryShowcase";

const featureData = [
  {
    title: "LeadBooster",
    subtitle: "Nie mehr Leads verpassen: Sofortige Quali & Booking in einem Schritt",
    benefits: [
      "Blitzschnelle Erstreaktion < 2 Min.",
      "Automatisches Quali-Skript (Budget, Bedarf, Timing)",
      "Direkte Terminbuchung in Google/Outlook/CRM",
      "Deutlich höhere Conversion-Rate durch sofortiges Follow-up"
    ],
    targetAudience: "Photovoltaik- und Wärmepumpen-Vertrieb, Versicherungsagenturen, Online-Bildung, Door-to-Door-Sales"
  },
  {
    title: "SurveyBot",
    subtitle: "Dein 24/7-Agent für First-Level-Support & saubere Tickets",
    benefits: [
      "Rund-um-die-Uhr FAQs beantworten, Schein-Anfragen filtern",
      "DSGVO-konforme Transkription aller Gespräche",
      "Intelligentes Routing: nur echte Fälle an Dein Team",
      "Insights-Dashboards: Peak-Zeiten, Themen-Clustering, Ticket-Stats"
    ],
    targetAudience: "Schlüsseldienste & Notfalldienste, Hausverwaltungen, Fahrradläden, KMU mit hohem Call-Volumen"
  },
  {
    title: "OfficePilot",
    subtitle: "Back-Office auf Autopilot: Transkripte, Reports & Playbooks",
    benefits: [
      "Automatische Transkripte & Summaries von Zoom/Teams",
      "Angebots-Generator statt Word-Vorlagen-Basteln",
      "Research-Playbooks: Firmeninfos + E-Mail-Templates on demand",
      "KPI-Dashboards: Zeiteinsparung, Reporting, Batch-Transkription"
    ],
    targetAudience: "Berater & Solo-Selbständige, Marketing-/Projekt-Teams, Agenturen und Professional Services"
  }
];

const Features = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Unsere Features</h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Entdecken Sie unsere innovativen Lösungen für verschiedene Geschäftsbereiche
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureData.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
      
      <IndustryShowcase />
      <Footer />
    </main>
  );
};

export default Features;
