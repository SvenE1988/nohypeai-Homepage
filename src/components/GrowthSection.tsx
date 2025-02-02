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

        <Tabs defaultValue="inbound" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 bg-[#1A1F35] p-1 rounded-full mb-12">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Lead-Recherche & Anreicherung" 
                benefit="Automatische Identifizierung und Qualifizierung von Leads mit 90% Zeitersparnis"
                description="Intelligente Lead-Qualifizierung"
              />
              <FeatureCard 
                title="Inbound Terminvereinbarung" 
                benefit="24/7 automatische Terminvereinbarung mit 80% weniger Aufwand"
                description="Effiziente Terminkoordination"
              />
              <FeatureCard 
                title="Inbound Sprach-Agenten" 
                benefit="Sofortige Kundenantworten mit 95% Kundenzufriedenheit"
                description="KI-gestützte Kommunikation"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GrowthSection;