import { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Building, Key, Stethoscope, Hotel, Sun, DoorOpen, Receipt, Briefcase, Building2, GraduationCap, ShoppingBag, UtensilsCrossed, Car, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import IndustryCard from './IndustryCard';
const industries = [{
  icon: Building,
  title: "Hausverwaltungen & Immobilienverwalter",
  problem: "Mieter rufen ständig an – von Glühbirne kaputt bis Rohrbruch.",
  pain: "Keine Priorisierung, Erreichbarkeit rund um die Uhr nicht machbar",
  solutions: ["Survey Bot filtert Anliegen automatisch & leitet echte Notfälle weiter", "Voice Agent kann Rückrufe übernehmen", "Chatbot klärt häufige Fragen wie Betriebskosten, Hausordnung usw."],
  category: "service"
}, {
  icon: Key,
  title: "Handwerker & Notdienste",
  problem: "Ständige Anrufe – aber nicht jeder ist ein Notfall.",
  pain: "Nachts erreichbar sein kostet Geld & Nerven",
  solutions: ["Survey Bot erkennt echte Notfälle und filtert unwichtige Fälle raus", "Voice Agent ruft Interessenten zurück & vereinbart Termine"],
  category: "service"
}, {
  icon: Stethoscope,
  title: "Arztpraxen & Kliniken",
  problem: "Überlastung am Empfang – Patienten stehen, Telefon klingelt, Chaos.",
  pain: "Viele Fragen sind immer gleich, keine Zeit für echte Anliegen",
  solutions: ["Chatbot für Terminvergabe, Rezeptanfragen, Absagen", "Voice Agent ruft neue Patienten zurück", "Survey Bot nimmt Anliegen strukturiert auf & erstellt Tickets"],
  category: "healthcare"
}, {
  icon: Hotel,
  title: "Hotels, Ferienwohnungen, Hostels",
  problem: "Buchungsanfragen kommen per Mail, Call, Online – keiner hat Zeit zu antworten.",
  pain: "Kunden springen ab, weil keine schnelle Reaktion",
  solutions: ["Chatbot klärt Verfügbarkeiten & Infos", "Voice Agent (Lead-Booster) ruft sofort zurück & bucht direkt", "Survey Bot nimmt Sonderwünsche oder Beschwerden auf"],
  category: "service"
}, {
  icon: Sun,
  title: "Photovoltaik-Vertrieb & Energieberatung",
  problem: "Tausende Leads – aber zu wenig Kapazitäten zur Nachqualifizierung",
  pain: "Teure Leads versickern, Vertrieb überlastet, falsche Priorisierung",
  solutions: ["Voice Agent (Lead-Booster) ruft jeden Lead sofort an & qualifiziert", "Office Pilot erstellt Gesprächsprotokolle für das CRM", "Survey Bot übernimmt Rückläufer & Fragen"],
  category: "sales"
}, {
  icon: DoorOpen,
  title: "Door-to-Door-Vertrieb & Strukturvertriebe",
  problem: "Hohe Terminfrequenz → keine Zeit für CRM",
  pain: "Gespräche werden nicht sauber dokumentiert, keine Nachverfolgung",
  solutions: ["Office Pilot erstellt kontextbasierte Gesprächsprotokolle", "Voice Agent übernimmt Nachfass-Calls", "Chatbot als QR-Code-Anlaufstelle z. B. auf Flyern"],
  category: "sales"
}, {
  icon: Receipt,
  title: "Versicherungen / Finanzberater / Steuerberater",
  problem: "Immer gleiche Fragen, viel Zeitverlust, langsamer Leadprozess",
  pain: "Manuelle Angebotserstellung, hohe Absprungrate",
  solutions: ["Chatbot beantwortet Standardfragen & filtert Leads", "Voice Agent ruft Interessenten direkt zurück", "Office Pilot erstellt personalisierte Angebote automatisch"],
  category: "consulting"
}, {
  icon: Briefcase,
  title: "Kleine Agenturen / Freelancer / Berater",
  problem: "Termine im 30-Minuten-Takt → keine Zeit zum Mitschreiben",
  pain: "Gesprächsinhalte gehen verloren, CRM bleibt leer",
  solutions: ["Office Pilot hört mit und erstellt präzise, kontextbasierte Gesprächsnotizen", "Voice Agent übernimmt Follow-up-Calls oder Erinnerungen"],
  category: "consulting"
}, {
  icon: Building2,
  title: "SaaS-Firmen & Softwareunternehmen",
  problem: "Viele Demo-Anfragen, aber Sales-Team ist überfordert",
  pain: "Inbound Leads nicht sauber nachverfolgt",
  solutions: ["Voice Agent ruft Leads direkt an & vereinbart Demo", "Office Pilot fasst Demos zusammen & schreibt E-Mails automatisch", "Survey Bot übernimmt 1st-Level-Support rund um die Uhr"],
  category: "sales"
}, {
  icon: GraduationCap,
  title: "Coaches / Online-Akademien / Weiterbildung",
  problem: "Viele Kursinteressenten, aber keine Kapazität für Einzelkontakt",
  pain: "Niedrige Conversion trotz hoher Nachfrage",
  solutions: ["Voice Agent ruft Interessenten zurück & qualifiziert", "Chatbot klärt Kurswahl, Anmeldung & FAQs", "Office Pilot versendet individuelle Info-Mails"],
  category: "consulting"
}, {
  icon: ShoppingBag,
  title: "E-Commerce & Online-Shops",
  problem: "Viele Kundenanfragen – aber kein 24/7 Support",
  pain: "Rückfragen zu Versand, Rückgabe, Produkte blockieren den Support",
  solutions: ["Chatbot übernimmt alle Standardfragen", "Voice Agent ruft bei Reklamationen direkt an", "Survey Bot erkennt wiederkehrende Probleme frühzeitig"],
  category: "retail"
}, {
  icon: UtensilsCrossed,
  title: "Event-Catering / Gastronomie / Restaurants",
  problem: "Reservierungen, Sonderwünsche, Eventplanung – alles kommt rein, keiner sortiert's",
  pain: "Personal am Limit, Gäste unzufrieden",
  solutions: ["Chatbot übernimmt Reservierung & Standard-FAQ", "Voice Agent ruft bei Event-Anfragen zurück", "Survey Bot fragt Zufriedenheit & Sonderwünsche ab"],
  category: "service"
}, {
  icon: Car,
  title: "Werkstätten / Autohäuser",
  problem: "Anfragen zu Probefahrt, Reparatur, Verfügbarkeit",
  pain: "Verkäufer überfordert, Termine gehen verloren",
  solutions: ["Chatbot klärt Verfügbarkeit & Preise", "Voice Agent ruft sofort bei Angebotsanfragen an", "Office Pilot erstellt automatisch Angebote + CRM-Einträge"],
  category: "service"
}, {
  icon: Scale,
  title: "Rechtsanwälte / Kanzleien",
  problem: "Viele Anfragen, aber oft nicht relevant oder noch nicht entscheidungsreif",
  pain: "Keine Zeit zur Vorauswahl",
  solutions: ["Chatbot filtert neue Mandatsanfragen", "Voice Agent kontaktiert relevante Fälle", "Office Pilot dokumentiert Gespräche + erstellt Beratungszusammenfassungen"],
  category: "consulting"
}];
const categories = [{
  value: "all",
  label: "Alle Branchen"
}, {
  value: "service",
  label: "Dienstleistungen"
}, {
  value: "healthcare",
  label: "Gesundheitswesen"
}, {
  value: "sales",
  label: "Vertrieb"
}, {
  value: "consulting",
  label: "Beratung"
}, {
  value: "retail",
  label: "Handel"
}];
export default function IndustryShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const filteredIndustries = useMemo(() => {
    return industries.filter(industry => {
      const matchesCategory = activeCategory === "all" || industry.category === activeCategory;
      const matchesSearch = industry.title.toLowerCase().includes(searchQuery.toLowerCase()) || industry.problem.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);
  const visibleIndustries = showAll ? filteredIndustries : filteredIndustries.slice(0, 6);
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Erkennst du dich wieder ?</h2>
        
        <div className="flex flex-col items-center space-y-6 mb-12">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-black/40 border border-gray-800">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value} 
                  className="text-white data-[state=active]:bg-primary/20"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Input 
            type="search" 
            placeholder="Suche nach Branchen oder Problemen..." 
            className="max-w-md bg-black/40 border-gray-800 text-white placeholder-gray-400" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleIndustries.map((industry, index) => <IndustryCard key={index} {...industry} />)}
        </div>

        {filteredIndustries.length > 6 && <Button variant="ghost" onClick={() => setShowAll(!showAll)} className="w-full mt-8 border border-gray-800 hover:bg-primary/10 text-primary">
            {showAll ? <>
                Weniger anzeigen
                <ChevronUp className="ml-2 h-4 w-4" />
              </> : <>
                Mehr Branchen anzeigen
                <ChevronDown className="ml-2 h-4 w-4" />
              </>}
          </Button>}
      </div>
    </section>;
}
