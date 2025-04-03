
import { Badge } from "./ui/badge";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import ProjectDetails from "./projects/ProjectDetails";
import ProjectCard from "./projects/ProjectCard";
import { Project } from "./projects/types";
import { projectsData } from "./projects/ProjectsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleViewDetails = useCallback((project: Project) => {
    setCurrentProject(project);
    setIsDetailsOpen(true);
  }, []);
  
  // Optimized autoplay logic
  useEffect(() => {
    if (!api) return;
    
    const startAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      
      autoplayIntervalRef.current = setInterval(() => {
        api.scrollNext();
      }, 5000);
    };
    
    const stopAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
    
    // Start autoplay
    startAutoplay();
    
    // Pause on user interaction
    const root = document.querySelector('#projekte');
    if (root) {
      root.addEventListener('pointerdown', stopAutoplay);
      root.addEventListener('pointerup', startAutoplay);
      root.addEventListener('touchstart', stopAutoplay);
      root.addEventListener('touchend', startAutoplay);
    }
    
    // Clean up on unmount
    return () => {
      stopAutoplay();
      if (root) {
        root.removeEventListener('pointerdown', stopAutoplay);
        root.removeEventListener('pointerup', startAutoplay);
        root.removeEventListener('touchstart', stopAutoplay);
        root.removeEventListener('touchend', startAutoplay);
      }
    };
  }, [api]);
  
  // Track active slide with memoized callback
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  return (
    <section id="projekte" className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-primary border-primary">
            Case Studies
          </Badge>
        </div>
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Erfolgsgeschichten aus der Praxis
        </h2>

        <div className="w-full max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "center",
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="py-8">
              {projectsData.map((project, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 basis-full sm:basis-3/5 md:basis-2/5 transition-opacity duration-500 ease-out"
                >
                  <div className={`h-full transition-all duration-500 ease-out transform ${
                    activeIndex === index 
                      ? "scale-100 opacity-100 z-10" 
                      : "scale-[0.85] opacity-60 z-0"
                    }`}
                  >
                    <ProjectCard
                      project={project}
                      isActive={activeIndex === index}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <CarouselPrevious 
                className="h-10 w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 static" 
              >
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <div className="flex gap-2">
                {projectsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? "bg-primary scale-125" 
                        : "bg-gray-600 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext 
                className="h-10 w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 static" 
              >
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        <AnimatePresence>
          {isDetailsOpen && currentProject && (
            <ProjectDetails 
              project={currentProject} 
              isOpen={isDetailsOpen} 
              onClose={() => setIsDetailsOpen(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
