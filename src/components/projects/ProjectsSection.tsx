
import { Badge } from "../ui/badge";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback, memo, useMemo } from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectCard from "./ProjectCard";
import { Project } from "./types";
import { projectsData } from "./ProjectsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProjectsCarousel } from "./useProjectsCarousel";

/**
 * Section container for the Projects carousel feature.
 */
const ProjectsSection = memo(() => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { activeIndex, setApi, getIndicatorProps, indicatorsCount } = useProjectsCarousel();

  // Memoized handler for viewing details
  const handleViewDetails = useCallback((project: Project) => {
    setCurrentProject(project);
    setIsDetailsOpen(true);
  }, []);

  // Memoize the indicators to prevent unnecessary re-renders
  const indicators = useMemo(() => {
    return Array.from({ length: indicatorsCount }).map((_, index) => {
      const { isActive, onClick, ariaLabel } = getIndicatorProps(index);
      return (
        <button
          key={index}
          onClick={onClick}
          className={`
            w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300
            ${isActive ? "bg-primary scale-125" : "bg-gray-600 hover:bg-primary/50"}
            focus:outline-none focus:ring-2 focus:ring-primary/70
            mx-1 sm:mx-0
          `}
          aria-label={ariaLabel}
          style={{ touchAction: "manipulation" }}
        />
      );
    });
  }, [indicatorsCount, getIndicatorProps]);

  return (
    <section id="projekte" className="w-full py-12 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-0"></div>
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
          <Badge variant="outline" className="text-primary border-primary">
            Case Studies
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-16">
          Erfolgsgeschichten aus der Praxis
        </h2>
        <div className="w-full max-w-2xl sm:max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "center",
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="py-4 sm:py-8">
              {projectsData.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:pl-4 basis-full sm:basis-3/5 md:basis-2/5 transition-opacity duration-500 ease-out"
                >
                  <div
                    className={`h-full transition-all duration-500 ease-out transform ${
                      activeIndex === index
                        ? "scale-100 opacity-100 z-10"
                        : "scale-[0.92] sm:scale-[0.85] opacity-60 z-0"
                    }`}
                    style={{ 
                      willChange: activeIndex === index || activeIndex === index-1 || activeIndex === index+1 
                        ? "transform, opacity" 
                        : "auto" 
                    }}
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
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <CarouselPrevious className="h-10 w-10 rounded-full border border-primary/50 bg-black/60 backdrop-blur-sm text-primary hover:bg-primary/20 static">
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <div className="flex gap-1 sm:gap-2">{indicators}</div>
              <CarouselNext className="h-10 w-10 rounded-full border border-primary/50 bg-black/60 backdrop-blur-sm text-primary hover:bg-primary/20 static">
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
});
ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
