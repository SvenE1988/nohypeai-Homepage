import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface Project {
  year: string;
  industry: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      year: "2024",
      industry: "Erneuerbare Energien",
      title: "KI-gestützte Lead-Qualifizierung",
      overview:
        "Revolutionierung der Lead-Qualifizierung im Photovoltaik- und Wärmepumpenbereich durch KI-gesteuerte Sprachkommunikation. Mit über 500 Stunden Sprechzeit und spezifischem Finetuning erreichten wir eine beispiellose Effizienz in der Kundenvorqualifizierung.",
      challenge:
        "Manuelle Lead-Qualifizierung band wertvolle Vertriebsressourcen und führte zu langen Reaktionszeiten, wodurch potenzielle Kunden verloren gingen.",
      solution:
        "Implementierung eines KI-gestützten Sprachsystems, das eingehende und ausgehende Gespräche automatisch führt, qualifiziert und priorisiert - rund um die Uhr verfügbar.",
      result:
        "Reaktionszeit auf neue Leads von Stunden auf Minuten reduziert, Qualifizierungsrate um 300% gesteigert und Vertriebsteam kann sich auf hochwertige, vorqualifizierte Leads konzentrieren.",
    },
    {
      year: "2024",
      industry: "Vertrieb & Marketing",
      title: "Automatisierte Angebotserstellung",
      overview:
        "Transformation des Angebotsprozesses durch vollautomatische Erstellung komplexer Angebote. Was früher 20 Minuten manuelle Arbeit erforderte, geschieht nun in unter einer Minute - bei gleichzeitig höherer Präzision.",
      challenge:
        "Zeitaufwändige manuelle Angebotserstellung führte zu Verzögerungen im Verkaufsprozess und band wichtige Personalressourcen.",
      solution:
        "Entwicklung einer KI-gestützten Automatisierungslösung, die alle relevanten Daten analysiert und daraus maßgeschneiderte Angebote erstellt.",
      result:
        "95% Zeitersparnis bei der Angebotserstellung, signifikant reduzierte Fehlerquote und deutlich schnellere Reaktionszeiten im Vertriebsprozess.",
    },
    {
      year: "2024",
      industry: "Finanzdienstleistungen",
      title: "Automatisierte Baufinanzierung",
      overview:
        "Digitalisierung und Automatisierung des Baufinanzierungsprozesses, wodurch die Bearbeitungszeit pro Kunde von 90 Minuten auf nur 15 Minuten reduziert wurde - bei gleichzeitiger Steigerung der Genauigkeit.",
      challenge:
        "Komplexe manuelle Prozesse in der Baufinanzierung führten zu langen Bearbeitungszeiten und hohem Personalaufwand.",
      solution:
        "Integration einer KI-gestützten Prozessautomatisierung, die 90% der Finanzierungsstrecke selbstständig abwickelt und wichtige Entscheidungen vorbereitet.",
      result:
        "83% Zeitersparnis pro Kunde, höhere Kundenzufriedenheit durch schnellere Bearbeitung und signifikante Kosteneinsparungen im Prozess.",
    },
    {
      year: "2024",
      industry: "Versicherungswesen",
      title: "Intelligente Schadensfallbearbeitung",
      overview:
        "Entwicklung einer KI-gestützten Lösung zur automatischen Schadensfallbearbeitung, die den gesamten Prozess von der Erstmeldung bis zur Auszahlung revolutioniert.",
      challenge:
        "Traditionelle Schadensfallbearbeitung war zeitaufwändig, fehleranfällig und führte oft zu Kundenunzufriedenheit durch lange Bearbeitungszeiten.",
      solution:
        "Implementation einer KI-Plattform, die Schadensmeldungen automatisch kategorisiert, bewertet und den Großteil der Fälle selbstständig abwickelt.",
      result:
        "Bearbeitungszeit um 75% reduziert, Kundenzufriedenheit um 60% gesteigert und deutliche Kosteneinsparungen bei gleichzeitiger Qualitätsverbesserung.",
    },
  ];

  return (
    <section className="w-full bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-primary border-primary">
            Projekte
          </Badge>
        </div>
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Erfolgsgeschichten unserer Kunden
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-[#0A0A0A] border-[#1A1A1A] overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#1A1F35] flex items-center justify-center text-primary border border-primary">
                        {project.year}
                      </div>
                      <div className="text-gray-400">{project.industry}</div>
                    </div>
                    <h3 className="text-2xl font-semibold text-primary">
                      {project.title}
                    </h3>
                    <div className="text-gray-400">
                      <h4 className="font-medium mb-2">Overview:</h4>
                      <p className="leading-relaxed">{project.overview}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Challenge:</h4>
                      <p className="text-gray-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Solution:</h4>
                      <p className="text-gray-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Result:</h4>
                      <p className="text-gray-400 leading-relaxed">
                        {project.result}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;