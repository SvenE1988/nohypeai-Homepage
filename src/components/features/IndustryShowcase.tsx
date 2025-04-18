
import { useMemo, useState } from 'react';
import { Building, Hotel, Stethoscope, Key, Sun, DoorOpen, Receipt, Briefcase, Building2, GraduationCap, ShoppingBag, UtensilsCrossed, Car, Scale } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import IndustryCard from './IndustryCard';

const industries = [
  {
    icon: Building,
    title: "Hausverwaltungen & Immobilienverwalter",
    problem: "Mieter rufen ständig an – von „Glühbirne kaputt" bis „Rohrbruch".",
    pain: "Keine Priorisierung, Erreichbarkeit rund um die Uhr nicht machbar",
    solutions: [
      "Survey Bot filtert Anliegen automatisch & leitet echte Notfälle weiter",
      "Voice Agent kann Rückrufe übernehmen",
      "Chatbot klärt häufige Fragen wie Betriebskosten, Hausordnung usw."
    ],
    category: "service"
  },
  {
    icon: Key,
    title: "Handwerker & Notdienste",
    problem: "Ständige Anrufe – aber nicht jeder ist ein Notfall.",
    pain: "Nachts erreichbar sein kostet Geld & Nerven",
    solutions: [
      "Survey Bot erkennt echte Notfälle und filtert unwichtige Fälle raus",
      "Voice Agent ruft Interessenten zurück & vereinbart Termine"
    ],
    category: "service"
  },
  {
    icon: Stethoscope,
    title: "Arztpraxen & Kliniken",
    problem: "Überlastung am Empfang – Patienten stehen, Telefon klingelt, Chaos.",
    pain: "Viele Fragen sind immer gleich, keine Zeit für echte Anliegen",
    solutions: [
      "Chatbot für Terminvergabe, Rezeptanfragen, Absagen",
      "Voice Agent ruft neue Patienten zurück",
      "Survey Bot nimmt Anliegen strukturiert auf & erstellt Tickets"
    ],
    category: "healthcare"
  },
  // Add more industries following the same pattern...
];

const categories = [
  { value: "all", label: "Alle Branchen" },
  { value: "service", label: "Dienstleistungen" },
  { value: "healthcare", label: "Gesundheitswesen" },
  { value: "sales", label: "Vertrieb" },
  { value: "consulting", label: "Beratung" },
  { value: "retail", label: "Handel" }
];

export default function IndustryShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndustries = useMemo(() => {
    return industries.filter(industry => {
      const matchesCategory = activeCategory === "all" || industry.category === activeCategory;
      const matchesSearch = industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          industry.problem.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Branchen-Beispiele
        </h2>
        
        <div className="flex flex-col items-center space-y-6 mb-12">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-black/40 border border-gray-800">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="data-[state=active]:bg-primary/20"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Input
            type="search"
            placeholder="Suche nach Branchen oder Problemen..."
            className="max-w-md bg-black/40 border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry, index) => (
            <IndustryCard key={index} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
