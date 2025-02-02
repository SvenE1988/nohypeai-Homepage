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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <FeatureCard 
                title="Personalisierte Lead-Pflege" 
                benefit="40% höhere Conversion durch automatisierte Nachverfolgung"
                description="Intelligentes Lead Nurturing"
              />
              <FeatureCard 
                title="Onboarding Automatisierung" 
                benefit="60% schnelleres Onboarding neuer Kunden"
                description="Nahtlose Kundenintegration"
              />
              <FeatureCard 
                title="Angebotserstellung" 
                benefit="75% Zeitersparnis bei der Angebotserstellung"
                description="Automatisierte Angebotsprozesse"
              />
            </div>
          </TabsContent>

          <TabsContent value="outbound" className="mt-12">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <FeatureCard 
                title="Lead-Scraping Systeme" 
                benefit="300% mehr qualifizierte Leads durch KI-gestützte Recherche"
                description="Automatisierte Lead-Generierung"
              />
              <FeatureCard 
                title="Outbound E-Mail-System" 
                benefit="5x höhere Antwortrate durch personalisierte Kampagnen"
                description="Personalisierte E-Mail-Kampagnen"
              />
              <FeatureCard 
                title="LinkedIn Outreach" 
                benefit="8x mehr Conversions durch automatisierte LinkedIn-Strategien"
                description="Automatisierte LinkedIn-Kommunikation"
              />
            </div>
            <div className="grid grid-cols-3 gap-8">
              <FeatureCard 
                title="Multi-Kanal-Outreach" 
                benefit="250% mehr Touchpoints pro Lead"
                description="Kanalübergreifende Kommunikation"
              />
              <FeatureCard 
                title="Outbound Sprach-Agenten" 
                benefit="4x mehr erfolgreiche Erstkontakte"
                description="KI-gestützte Erstkontakte"
              />
              <FeatureCard 
                title="Performance Tracking" 
                benefit="100% Transparenz über alle Outbound-Aktivitäten"
                description="Umfassendes Performance-Monitoring"
              />
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-12">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <FeatureCard 
                title="Social Media Content" 
                benefit="70% Zeitersparnis bei Content-Erstellung"
                description="Effiziente Content-Produktion"
              />
              <FeatureCard 
                title="Markengerechte Content KI" 
                benefit="100% markenkonformer Content in Sekunden"
                description="KI-gestützte Markenanpassung"
              />
              <FeatureCard 
                title="Content-Verwertung" 
                benefit="5x mehr Content aus bestehenden Materialien"
                description="Optimierte Content-Nutzung"
              />
            </div>
            <div className="grid grid-cols-3 gap-8">
              <FeatureCard 
                title="KI Lead Magnete" 
                benefit="3x mehr Lead-Generierung durch KI-optimierte Inhalte"
                description="KI-optimierte Lead-Generierung"
              />
              <FeatureCard 
                title="LinkedIn Content" 
                benefit="400% mehr organische Reichweite"
                description="LinkedIn Content-Optimierung"
              />
              <FeatureCard 
                title="Content Performance" 
                benefit="90% bessere Content-Performance durch KI-Optimierung"
                description="KI-gestützte Performance-Analyse"
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
  description: string;
}

const FeatureCard = ({ title, benefit, description }: FeatureCardProps) => {
  return (
    <div className="relative w-full h-48 perspective group">
      <motion.div
        className="w-full h-full absolute preserve-3d"
        initial={false}
        animate={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front side */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Button
            variant="ghost"
            className="h-full w-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/20 hover:to-secondary/20 border border-gray-800 hover:border-primary/50 transition-all duration-300"
            neon={true}
          >
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-white">{title}</p>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </Button>
        </div>
        
        {/* Back side */}
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 flex items-center justify-center backface-hidden"
          style={{ 
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden"
          }}
        >
          <p className="text-white text-center font-medium">{benefit}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GrowthSection;