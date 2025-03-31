
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

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
      industry: "Gesundheitswesen",
      title: "Digitale Rezeptanforderung",
      overview:
        "Transformation der Rezeptanforderung in einer Arztpraxis durch KI-gestützte Sprachverarbeitung. Die bisherige manuelle Abarbeitung von Sprachnachrichten wurde durch ein intelligentes System ersetzt, das Anfragen automatisch verarbeitet und strukturiert.",
      challenge:
        "Zeitaufwändiges manuelles Abhören eines Anrufbeantworters für Rezeptanfragen, was zu hoher Arbeitsbelastung des Praxispersonals und möglichen Verzögerungen führte.",
      solution:
        "Implementation eines KI-Sprachbots, der Patientenanfragen automatisch entgegennimmt, analysiert und in einer übersichtlichen digitalen Form für das Praxisteam aufbereitet.",
      result:
        "Signifikante Entlastung des Praxispersonals, schnellere Bearbeitung von Rezeptanfragen und höhere Patientenzufriedenheit durch effizientere Prozesse.",
    },
  ];

  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setCurrentProject(project);
    setIsDetailsOpen(true);
  };

  return (
    <section id="projekte" className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-primary border-primary">
            Projekte
          </Badge>
        </div>
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Erfolgsgeschichten unserer Kunden
        </h2>

        {/* Carousel for Project Cards */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="h-full">
                  <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-[#1A1A1A] hover:border-primary/30 transition-all duration-300 h-full overflow-hidden group">
                    <div className="p-5 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-md bg-[#1A1F35] flex items-center justify-center text-primary border border-primary/40 group-hover:border-primary transition-all duration-300 shrink-0">
                          {project.year}
                        </div>
                        <div className="text-sm text-gray-400">{project.industry}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-4 mb-4 flex-grow">
                        {project.overview}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="mt-auto self-start group-hover:text-primary hover:bg-primary/10 transition-all duration-300"
                        onClick={() => handleViewDetails(project)}
                      >
                        Details anzeigen
                        <ExternalLink size={16} className="ml-1" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20" />
            <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20" />
          </div>
        </Carousel>

        {/* Project Details Modal */}
        {isDetailsOpen && currentProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDetailsOpen(false)}
          >
            <motion.div 
              className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-primary/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#1A1F35] flex items-center justify-center text-primary border border-primary shrink-0">
                    {currentProject.year}
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{currentProject.industry}</div>
                    <h3 className="text-2xl font-bold text-primary">
                      {currentProject.title}
                    </h3>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-primary/10 text-primary"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-white mb-3">Überblick</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">{currentProject.overview}</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-white mb-2">Challenge</h4>
                    <p className="text-gray-300 leading-relaxed">{currentProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Solution</h4>
                    <p className="text-gray-300 leading-relaxed">{currentProject.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Result</h4>
                    <p className="text-gray-300 leading-relaxed">{currentProject.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
