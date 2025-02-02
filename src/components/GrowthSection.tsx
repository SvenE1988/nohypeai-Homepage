import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FeatureCard from "./FeatureCard";

const GrowthSection = () => {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Steigern Sie Ihr Wachstum
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Ohne Zusätzliches Personal
          </span>
        </h2>

        <Tabs defaultValue="sprachassistent" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 bg-[#1A1F35] p-1 rounded-full mb-12">
            <TabsTrigger
              value="sprachassistent"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400"
            >
              Sprachassistent
            </TabsTrigger>
            <TabsTrigger
              value="ablaufoptimierung"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400"
            >
              Ablaufoptimierung
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400"
            >
              Content & Marketing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sprachassistent" className="mt-8">
            <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Stellen Sie sich vor, Ihr Unternehmen hätte einen virtuellen Assistenten, der rund um die Uhr Kundenanfragen beantwortet, 
              Termine koordiniert und Verkaufsgespräche führt - ohne Ermüdung, ohne Urlaub und mit konstant hoher Qualität.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="KI-Kundenservice" 
                description="24/7 Verfügbarkeit für Kundenanfragen"
                benefit="90% schnellere Reaktionszeiten & konstant hohe Servicequalität"
              />
              <FeatureCard 
                title="Intelligente Terminplanung" 
                description="Automatische Kalenderverwaltung"
                benefit="80% Zeitersparnis bei der Terminkoordination"
              />
              <FeatureCard 
                title="Verkaufsgespräche" 
                description="KI-gestützte Verkaufsunterstützung"
                benefit="40% höhere Abschlussquote durch optimierte Gesprächsführung"
              />
              <FeatureCard 
                title="Lead-Qualifizierung" 
                description="Automatische Bewertung von Anfragen"
                benefit="60% effizientere Leadbearbeitung & höhere Conversion"
              />
              <FeatureCard 
                title="Nachverfolgung" 
                description="Automatisierte Follow-ups"
                benefit="75% mehr erfolgreiche Nachfassaktionen"
              />
              <FeatureCard 
                title="Bedarfsanalyse" 
                description="KI-gestützte Kundenbedürfnisermittlung"
                benefit="50% präzisere Angebotserstellung"
              />
            </div>
          </TabsContent>

          <TabsContent value="ablaufoptimierung" className="mt-8">
            <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Stellen Sie sich vor, Ihre Büroprozesse laufen vollautomatisch - von der Angebotserstellung bis zur Rechnungsstellung. 
              Keine verlorenen Dokumente mehr, keine Verzögerungen, keine Fehler. Ihre Mitarbeiter können sich auf das Wesentliche konzentrieren.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Angebotserstellung" 
                description="Automatisierte Dokumentenerstellung"
                benefit="70% schnellere Angebotserstellung mit höherer Qualität"
              />
              <FeatureCard 
                title="Rechnungsmanagement" 
                description="Automatische Rechnungsverarbeitung"
                benefit="85% Zeitersparnis im Rechnungswesen"
              />
              <FeatureCard 
                title="Dokumentenmanagement" 
                description="Intelligente Dokumentenorganisation"
                benefit="90% weniger Suchzeit für wichtige Unterlagen"
              />
              <FeatureCard 
                title="E-Mail-Management" 
                description="KI-basierte E-Mail-Sortierung"
                benefit="60% effizientere E-Mail-Bearbeitung"
              />
              <FeatureCard 
                title="Projektmanagement" 
                description="Automatisierte Projektverfolgung"
                benefit="45% bessere Projektübersicht & Termineinhaltung"
              />
              <FeatureCard 
                title="Qualitätssicherung" 
                description="KI-gestützte Dokumentenprüfung"
                benefit="95% weniger Fehler in wichtigen Dokumenten"
              />
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-8">
            <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Stellen Sie sich vor, Ihr Content-Marketing läuft wie ein gut geöltes Uhrwerk - mit KI-optimierten Texten, 
              perfekt getimten Social Media Posts und personalisierten Newsletter-Kampagnen, die Ihre Zielgruppe begeistern.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Content Erstellung" 
                description="KI-gestützte Texterstellung"
                benefit="80% schnellere Erstellung von SEO-optimierten Inhalten"
              />
              <FeatureCard 
                title="Social Media" 
                description="Automatisierte Beitragsplanung"
                benefit="65% mehr Engagement durch optimale Posting-Zeiten"
              />
              <FeatureCard 
                title="Newsletter" 
                description="Personalisierte E-Mail-Kampagnen"
                benefit="50% höhere Öffnungsraten durch KI-Optimierung"
              />
              <FeatureCard 
                title="SEO-Optimierung" 
                description="KI-basierte Keyword-Analyse"
                benefit="70% bessere Suchmaschinenplatzierungen"
              />
              <FeatureCard 
                title="Content-Strategie" 
                description="Datengesteuerte Themenplanung"
                benefit="55% höhere Content-Performance"
              />
              <FeatureCard 
                title="Marketing-Automation" 
                description="Automatisierte Kampagnen"
                benefit="40% höhere Conversion durch personalisierte Ansprache"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GrowthSection;
