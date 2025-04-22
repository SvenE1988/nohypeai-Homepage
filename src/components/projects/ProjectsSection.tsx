
import { Badge } from "../ui/badge";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback, memo } from "react";
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
  const { activeIndex, setApi, renderIndicators } = useProjectsCarousel();

  const handleViewDetails = useCallback((project: Project) => {
    setCurrentProject(project);
    setIsDetailsOpen(true);
  }, []);

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
                  <div
                    className={`h-full transition-all duration-500 ease-out transform ${
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
              <CarouselPrevious className="h-10 w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 static">
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <div className="flex gap-2">{renderIndicators()}</div>
              <CarouselNext className="h-10 w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 static">
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
