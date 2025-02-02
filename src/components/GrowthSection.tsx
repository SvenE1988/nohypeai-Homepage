import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check } from "lucide-react";

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

        <Tabs defaultValue="inbound" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 bg-[#1A1F35] p-1 rounded-full">
            <TabsTrigger
              value="inbound"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400"
            >
              Eingehende Verkäufe
            </TabsTrigger>
            <TabsTrigger
              value="outbound"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400"
            >
              Ausgehende Verkäufe
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400"
            >
              Content & Marketing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbound" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white">KI-gestützte Inbound-Verkaufsautomatisierung</h3>
                <p className="text-gray-300 text-lg">
                  KI-Lösungen für besseren Lead-Flow, 24/7 Erreichbarkeit, schnellere Qualifizierung und ein fokussiertes Verkaufsteam.
                </p>
                <div className="space-y-4">
                  <BenefitItem>
                    <strong>Lead-Konvertierung steigern:</strong> Recherchieren, qualifizieren und bewerten Sie Leads automatisch.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Zeit und Ressourcen sparen:</strong> Automatisieren Sie wiederkehrende Aufgaben, damit sich Ihr Team auf Abschlüsse konzentrieren kann.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Kundenerlebnis verbessern:</strong> Sofortige & personalisierte Antworten über alle eingehenden Kanäle.
                  </BenefitItem>
                </div>
              </div>

              <div className="bg-[#E5F6FF] p-8 rounded-3xl">
                <div className="grid grid-cols-3 gap-4">
                  <FeatureCard title="Automatisierte Lead-Recherche & Anreicherung" />
                  <FeatureCard title="Automatisierte Lead-Qualifizierung & Bewertung" />
                  <FeatureCard title="Inbound Terminvereinbarung & Chatbots" />
                  <FeatureCard title="Inbound Sprach-Agenten" />
                  <FeatureCard title="Inbound Antwort-Agenten" />
                  <FeatureCard title="Personalisierte Lead-Pflege" />
                  <FeatureCard title="Automatisierte Angebotserstellung" />
                  <FeatureCard title="Onboarding-Automatisierungssysteme" />
                  <FeatureCard title="Individuelle Projekte" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="outbound" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white">KI-gestützte Outbound-Verkaufslösungen</h3>
                <p className="text-gray-300 text-lg">
                  KI-Lösungen für Lead-Generierung, Anreicherung & personalisierte Multi-Kanal-Kontaktaufnahme.
                </p>
                <div className="space-y-4">
                  <BenefitItem>
                    <strong>Lead-Generierung verbessern:</strong> KI-Scraping-Systeme zur Erschließung neuer Lead-Quellen für Ihr Unternehmen.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>KI-Lead-Anreicherung:</strong> Automatische Recherche und Qualifizierung potenzieller Interessenten.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Personalisierte Multi-Kanal-Kontaktaufnahme:</strong> Personalisierte Ansprache über E-Mail, LinkedIn und Telefon, um mehr Leads zu erreichen.
                  </BenefitItem>
                </div>
              </div>

              <div className="bg-[#B8E6F3] p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard title="Lead-Scraping Automatisierung" />
                  <FeatureCard title="Outbound E-Mail-System Einrichtung" />
                  <FeatureCard title="Personalisierte Kontaktaufnahme-Automatisierung" />
                  <FeatureCard title="LinkedIn Outreach Systeme" />
                  <FeatureCard title="Outbound Sprach-Agenten" />
                  <FeatureCard title="Individuelle Projekte" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white">KI Content & Marketing Systeme</h3>
                <p className="text-gray-300 text-lg">
                  KI-Lösungen für konsistente Social-Media-Beiträge, persona-orientierte Content-Erstellung und effiziente Multi-Kanal-Verwertung.
                </p>
                <div className="space-y-4">
                  <BenefitItem>
                    <strong>Human-in-the-Loop Content-Systeme:</strong> Geben Sie jedem Teammitglied ein persönliches Content-System für konsistente Ergebnisse.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Effektive Mehrfachverwertung:</strong> Erstellen Sie KI-Systeme, um bestehende Inhalte optimal zu nutzen.
                  </BenefitItem>
                  <BenefitItem>
                    <strong>Post-Interaktionen in Abschlüsse umwandeln:</strong> Nutzen Sie Content-Interaktionen durch Social-Media-Scraping & personalisierte Kontaktaufnahme für Abschlüsse.
                  </BenefitItem>
                </div>
              </div>

              <div className="bg-[#E2F5E2] p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard title="Social Media Content Systeme" />
                  <FeatureCard title="Markengerechte Fine-tuned Content KI-Modelle" />
                  <FeatureCard title="Content-Verwertungssysteme" />
                  <FeatureCard title="KI Lead Magnet Automatisierung" />
                  <FeatureCard title="LinkedIn Content & Outreach Systeme" />
                  <FeatureCard title="Individuelle Projekte" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const BenefitItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <Check className="w-6 h-6 text-primary flex-shrink-0" />
      <p className="text-gray-600">{children}</p>
    </div>
  );
};

const FeatureCard = ({ title }: { title: string }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-sm font-medium text-center">{title}</p>
    </div>
  );
};

export default GrowthSection;
