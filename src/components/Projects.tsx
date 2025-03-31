import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    const onScroll = () => {
      const inView = [];
      const slides = emblaApi.slideNodes();
      
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const rect = slide.getBoundingClientRect();
        
        if (rect.left < window.innerWidth && rect.right > 0) {
          inView.push(i);
        }
      }
      
      setSlidesInView(inView);
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onSelect);
    
    onSelect();
    onScroll();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(() => {
        if (emblaApi) emblaApi.scrollNext();
      }, 5000);
    };
    
    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    
    startAutoplay();
    
    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('pointerUp', startAutoplay);
    
    return () => {
      stopAutoplay();
      if (emblaApi) {
        emblaApi.off('pointerDown', stopAutoplay);
        emblaApi.off('pointerUp', startAutoplay);
      }
    };
  }, [emblaApi]);

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

        <div className="w-full max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex py-8">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_40%] min-w-0 pl-4 transition-all duration-500 ease-out"
                >
                  <div 
                    className={cn(
                      "h-full transition-all duration-500 ease-out transform",
                      selectedIndex === index 
                        ? "scale-100 opacity-100 z-10" 
                        : slidesInView.includes(index) 
                          ? "scale-[0.85] opacity-60 z-0" 
                          : "scale-[0.75] opacity-30 z-0"
                    )}
                  >
                    <Card 
                      className={cn(
                        "bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border transition-all duration-300 h-full overflow-hidden group",
                        selectedIndex === index 
                          ? "border-primary/60 shadow-[0_0_15px_rgba(255,0,153,0.2)]" 
                          : "border-[#1A1A1A] hover:border-primary/30"
                      )}
                    >
                      <div className="p-5 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className={cn(
                              "w-12 h-12 rounded-md flex items-center justify-center text-primary border transition-all duration-300 shrink-0",
                              selectedIndex === index 
                                ? "bg-[#1A1F35]/80 border-primary" 
                                : "bg-[#1A1F35] border-primary/40 group-hover:border-primary"
                            )}
                          >
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
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <button 
              onClick={() => emblaApi?.scrollPrev()} 
              className="h-10 w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 inline-flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    selectedIndex === index 
                      ? "bg-primary scale-125" 
                      : "bg-gray-600 hover:bg-primary/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="h-10 w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 inline-flex items-center justify-center"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
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
                exit={{ scale: 0.9, opacity: 0 }}
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
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
