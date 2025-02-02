import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/neon-button";

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
            <div className="grid grid-cols-3 gap-8 mb-8">
              <FeatureCard 
                title="Lead-Recherche & Anreicherung" 
                benefit="Automatische Identifizierung und Qualifizierung von Leads mit 90% Zeitersparnis"
              />
              <FeatureCard 
                title="Inbound Terminvereinbarung" 
                benefit="24/7 automatische Terminvereinbarung mit 80% weniger Aufwand"
              />
              <FeatureCard 
                title="Inbound Sprach-Agenten" 
                benefit="Sofortige Kundenantworten mit 95% Kundenzufriedenheit"
              />
            </div>
            <div className="grid grid-cols-3 gap-8">
              <FeatureCard 
                title="Personalisierte Lead-Pflege" 
                benefit="40% höhere Conversion durch automatisierte Nachverfolgung"
              />
              <FeatureCard 
                title="Onboarding Automatisierung" 
                benefit="60% schnelleres Onboarding neuer Kunden"
              />
              <FeatureCard 
                title="Angebotserstellung" 
                benefit="75% Zeitersparnis bei der Angebotserstellung"
              />
            </div>
          </TabsContent>

          <TabsContent value="outbound" className="mt-12">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <FeatureCard 
                title="Lead-Scraping Systeme" 
                benefit="300% mehr qualifizierte Leads durch KI-gestützte Recherche"
              />
              <FeatureCard 
                title="Outbound E-Mail-System" 
                benefit="5x höhere Antwortrate durch personalisierte Kampagnen"
              />
              <FeatureCard 
                title="LinkedIn Outreach" 
                benefit="8x mehr Conversions durch automatisierte LinkedIn-Strategien"
              />
            </div>
            <div className="grid grid-cols-3 gap-8">
              <FeatureCard 
                title="Multi-Kanal-Outreach" 
                benefit="250% mehr Touchpoints pro Lead"
              />
              <FeatureCard 
                title="Outbound Sprach-Agenten" 
                benefit="4x mehr erfolgreiche Erstkontakte"
              />
              <FeatureCard 
                title="Performance Tracking" 
                benefit="100% Transparenz über alle Outbound-Aktivitäten"
              />
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-12">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <FeatureCard 
                title="Social Media Content" 
                benefit="70% Zeitersparnis bei Content-Erstellung"
              />
              <FeatureCard 
                title="Markengerechte Content KI" 
                benefit="100% markenkonformer Content in Sekunden"
              />
              <FeatureCard 
                title="Content-Verwertung" 
                benefit="5x mehr Content aus bestehenden Materialien"
              />
            </div>
            <div className="grid grid-cols-3 gap-8">
              <FeatureCard 
                title="KI Lead Magnete" 
                benefit="3x mehr Lead-Generierung durch KI-optimierte Inhalte"
              />
              <FeatureCard 
                title="LinkedIn Content" 
                benefit="400% mehr organische Reichweite"
              />
              <FeatureCard 
                title="Content Performance" 
                benefit="90% bessere Content-Performance durch KI-Optimierung"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  benefit: string;
}

const FeatureCard = ({ title, benefit }: FeatureCardProps) => {
  return (
    <div className="relative w-full h-48 perspective">
      <motion.div
        className="w-full h-full"
        initial={false}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full">
          <Button
            variant="ghost"
            className="h-full w-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/20 hover:to-secondary/20 border border-gray-800 hover:border-primary/50 transition-all duration-300"
            neon={true}
          >
            <p className="text-lg font-medium text-white">{title}</p>
          </Button>
        </div>
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 flex items-center justify-center"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <p className="text-white text-center font-medium">{benefit}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GrowthSection;